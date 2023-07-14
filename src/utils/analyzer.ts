import { StateUpdater } from "preact/hooks"

import { AstFile, AstBuilder, AstBlock, AstInput, AstBlockStack, AstBlocks, AstTarget } from "./ast"
import { ScratchJson } from "./sb3json"
import { no_side_effect_opcode } from "./side_effect"

type Sb3Location = string

type AnalyzeDefinion = {
    proccode: string,
    id: string,
}
type AnalyzeEvent = {
    opcode: string,
    id: string,
}
type AnalyzeWarning = {
    msg: string,
    loc?: Sb3Location,
}
type AnalyzeNote = {
    msg: string,
    loc?: Sb3Location,
}
type AnalyzeHelp = {
    msg: string,
    loc?: Sb3Location,
}

type AnalyzeResult = {
    definions: AnalyzeDefinion[],
    events: AnalyzeEvent[],
    warnings: AnalyzeWarning[],
    notes: AnalyzeNote[],
    helps: AnalyzeHelp[],
    ast?: AstFile,
}

export const num_regex =
    /^(#[0-9a-fA-F]+)|(-?((0o?[0-7]+)|(0x[0-9a-fA-F]+)|((([0-9]*\.[0-9]+)|([0-9]+))(e[\+\-][0-9]+)?)))$/

export class Analyzer {
    json: ScratchJson
    ast?: AstFile
    result: AnalyzeResult
    setResult: StateUpdater<AnalyzeResult>

    constructor(json: ScratchJson, result: AnalyzeResult,
        setResult: StateUpdater<AnalyzeResult>) {
        this.json = json
        this.result = result
        this.setResult = setResult
    }

    private warn(item: AnalyzeWarning) {
        this.setResult(prev => { return {
            definions: prev.definions,
            events: prev.events,
            warnings: [
                ...prev.warnings,
                item,
            ],
            notes: prev.notes,
            helps: prev.helps,
            ast: prev.ast,
        } })
    }

    private note(item: AnalyzeNote) {
        this.setResult(prev => { return {
            definions: prev.definions,
            events: prev.events,
            warnings: prev.warnings,
            notes: [
                ...prev.notes,
                item,
            ],
            helps: prev.helps,
            ast: prev.ast,
        } })
    }

    private help(item: AnalyzeHelp) {
        this.setResult(prev => { return {
            definions: prev.definions,
            events: prev.events,
            warnings: prev.warnings,
            notes: prev.notes,
            helps: [
                ...prev.helps,
                item,
            ],
            ast: prev.ast,
        } })
    }

    _is_input_const(input: AstInput): boolean {
        switch (input.type) {
        case "num":
        case "boolean":
        case "broadcast":
        case "num_or_str":
            return true
        case "block":
            return this.is_bs_const(input.value as AstBlocks)
        case "variable":
            return false
        case "list":
            return false
        }
    }

    is_bs_const(bs: AstBlocks): boolean {
        if (bs.blocks.length > 1 || bs.blocks.length === 0) { return false }
        for (const block of bs.blocks) {
            this.is_const(block)
        }
        return this.is_const(bs.blocks[0])
    }

    is_const(block: AstBlock): boolean {
        if (block.isConst) { return block.isConst }
        if (!no_side_effect_opcode.includes(block.opcode)) {
            block.isConst = false
            return false
        }
        for (const k of Object.keys(block.inputs)) {
            const input = block.inputs[k]
            if (!k.startsWith("SUBSTACK") && !this._is_input_const(input)) {
                block.isConst = false
                return false
            }
        }
        block.isConst = true
        return true
    }

    async build_ast() {
        const builder = new AstBuilder()
        this.ast = builder.build_ast(this.json)
        this.setResult(prev => { return {
            definions: prev.definions,
            events: prev.events,
            warnings: prev.warnings,
            notes: prev.notes,
            helps: prev.helps,
            ast: this.ast,
        } })
    }

    private _find_input_unused(input: AstInput,
        vars: string[], lists: string[]) {
        let idx
        switch (input.type) {
        case "variable":
            idx = vars.indexOf(input.value as string)
            if (idx !== -1) {
                vars[idx] = ""
            }
            break
        case "list":
            idx = lists.indexOf(input.value as string)
            if (idx !== -1) {
                lists[idx] = ""
            }
            break
        case "block":
            this._find_blocks_unused(input.value as AstBlocks,
                vars, lists)
            break
        default:
            break
        }
    }

    private _find_block_unused(block: AstBlock,
        vars: string[], lists: string[]) {
        let idx
        switch (block.opcode) {
        case "data_itemoflist":
        case "data_itemnumoflist":
        case "data_lengthoflist":
        case "data_listcontainsitem":
            idx = lists.indexOf(block.inputs["LIST"].value as string)
            if (idx !== -1) {
                lists[idx] = ""
            }
            break
        }
        for (const input of Object.values(block.inputs)) {
            this._find_input_unused(input, vars, lists)
        }
    }

    private _find_blocks_unused(blocks: AstBlocks,
        vars: string[], lists: string[]) {
        for (const block of blocks.blocks) {
            this._find_block_unused(block, vars, lists)
        }
    }

    async find_unused() {
        for (const idx in this.ast!.targets) {
            const target = this.ast!.targets[idx]
            const jtarget = this.json.targets[idx]
            if (jtarget.isStage) { continue }
            const vars = Object.keys(jtarget.variables)
            const lists = Object.keys(jtarget.lists)
            for (const bs of target.block_stacks) {
                this._find_blocks_unused(bs as AstBlocks, vars, lists)
            }
            for (const vname of vars) {
                if (vname === "") { return }
                this.warn({
                    msg: `unused variable \`${jtarget.variables[vname][0]}\``,
                    loc: `??? in \`${target.name}\``,
                })
            }
            for (const vname of lists) {
                if (vname === "") { return }
                this.warn({
                    msg: `unused list \`${jtarget.lists[vname][0]}\``,
                    loc: `??? in \`${target.name}\``,
                })
            }
        }
    }

    private _find_input_unnecessary(target: AstTarget, input: AstInput) {
        switch (input.type) {
        case "block":
            this._find_blocks_unnecessary(target, input.value as AstBlocks)
            break
        default:
            break
        }
    }

    private _find_block_unnecessary(target: AstTarget, block: AstBlock) {
        let cond
        switch (block.opcode) {
        case "control_if":
        case "control_if_else":
            cond = block.inputs["CONDITION"]
            if (!cond || this._is_input_const(cond)) {
                this.warn({
                    msg: `unnecessary condition block`,
                    loc: `\`${block.opcode}\` in \`${target.name}\``
                })
            }
            break
        default:
            break
        }
        for (const input of Object.values(block.inputs)) {
            this._find_input_unnecessary(target, input)
        }
    }

    private _find_blocks_unnecessary(target: AstTarget, blocks: AstBlocks) {
        for (const block of blocks.blocks) {
            this._find_block_unnecessary(target, block)
        }
    }

    async find_unnecessary() {
        for (const target of this.ast!.targets) {
            for (const bs of target.block_stacks) {
                this._find_blocks_unnecessary(target, bs as AstBlocks)
            }
        }
    }

    private _find_input_inv_type(target: AstTarget, parent: AstBlock, input: AstInput) {
        switch (input.type) {
        case "num":
            if (!num_regex.test(input.value as string)) {
                this.warn({
                    msg: `mismatched input type (\`${
                        input.value
                    }\` cannot be convert to a number)`,
                    loc: `\`${parent.opcode}\` in \`${target.name}\``
                })
            }
            break
        case "block":
            this._find_blocks_inv_type(target, input.value as AstBlocks)
            break
        default:
            break
        }
    }

    private _find_block_inv_type(target: AstTarget, block: AstBlock) {
        for (const input of Object.values(block.inputs)) {
            this._find_input_inv_type(target, block, input)
        }
    }

    private _find_blocks_inv_type(target: AstTarget, blocks: AstBlocks) {
        for (const block of blocks.blocks) {
            this._find_block_inv_type(target, block)
        }
    }

    async find_invailed_type() {
        for (const target of this.ast!.targets) {
            for (const bs of target.block_stacks) {
                this._find_blocks_inv_type(target, bs as AstBlocks)
            }
        }
    }

    private _find_input_const(target: AstTarget, input: AstInput) {
        switch (input.type) {
        case "block":
            if (this.is_bs_const(input.value as AstBlocks)) {
                this.warn({
                    msg: `constant block`,
                    loc: `\`${
                        (input.value as AstBlocks).blocks[0].opcode
                    }\` in \`${target.name}\``
                })
                return
            }
            this._find_blocks_const(target, input.value as AstBlocks)
            break
        default:
            break
        }
    }

    private _find_block_const(target: AstTarget, block: AstBlock) {
        if (block.isConst) {
            this.warn({
                msg: `constant block`,
                loc: `\`${block.opcode}\` in \`${target.name}\``
            })
            return
        }
        for (const input of Object.values(block.inputs)) {
            this._find_input_const(target, input)
        }
    }

    private _find_blocks_const(target: AstTarget, blocks: AstBlocks) {
        for (const block of blocks.blocks) {
            this._find_block_const(target, block)
        }
    }

    async find_replacable() {
        for (const target of this.ast!.targets) {
            for (const bs of target.block_stacks) {
                if (this.is_bs_const(bs as AstBlocks)) {
                    this.warn({
                        msg: `meaningless constant block stack`,
                        loc: `\`${bs.event.opcode}\` in \`${target.name}\``
                    })
                }
                this._find_blocks_const(target, bs as AstBlocks)
            }
        }
    }

    async analyze() {
        const start = Date.now()

        console.log(this.json)

        await this.build_ast()
        console.log(this.ast!)
        this.note({ msg: "analyzing replacable constant" })
        await this.find_replacable()
        this.note({ msg: "analyzing unnecessary block" })
        await this.find_unnecessary()
        this.note({ msg: "analyzing unused" })
        await this.find_unused()
        this.note({ msg: "analyzing invailed argument" })
        await this.find_invailed_type()

        const end = Date.now()
        this.note({ msg: `done in ${(end - start).toFixed(0)}ms` })
    }
}

export type {
    AnalyzeDefinion,
    AnalyzeEvent,
    AnalyzeHelp,
    AnalyzeNote,
    AnalyzeResult,
    AnalyzeWarning,
}