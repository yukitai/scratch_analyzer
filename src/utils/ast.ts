import { ScratchBlock, ScratchBlocks, ScratchField, ScratchInput, ScratchInputType, ScratchJson, ScratchTarget, ScratchValue } from "./sb3json"

export interface AstFile {
    targets: AstTarget[]
}

export interface AstTarget {
    name: string,
    vars: { [key: string]: Variable },
    lists: { [key: string]: List },
    broadcasts: { [key: string]: Broadcast },
    block_stacks: AstBlockStack[],
}

export type Variable = {
    name: string,
    value: ScratchValue,
}

export type List = {
    name: string,
    value: ScratchValue[]
}

export type Broadcast = {
    name: string,
}

export interface AstBlockStack {
    event: AstEvent,
    blocks: AstBlock[],
}

export interface AstBlocks {
    blocks: AstBlock[],
}

export interface AstEvent {
    opcode: string,
    inputs: { [key: string]: AstInput },
}

export interface AstBlock {
    isConst?: boolean,
    opcode: string,
    parent?: string | null,
    inputs: { [key: string]: AstInput },
}

export type AstInputType = "num_or_str" | "broadcast" |
    "boolean" | "block" | "variable" | "list" | "num"

export interface AstInput {
    isConst?: boolean,
    type: AstInputType,
    value: ScratchValue | AstBlocks,
}

export class AstBuilder {
    target?: ScratchTarget

    constructor() {}

    build_input(input: ScratchInput): AstInput {
        let value: ScratchInputType
        switch (input[0]) {
        case 1:
            value = input[1]
            break
        case 2:
            value = input[1]
            break
        case 3:
            value = input[1]
            break
        }
        if (typeof value === "string") {
            return {
                type: "block",
                value: this.build_blocks(this.target!.blocks[value]),
            }
        }
        if (!value) {
            return {
                type: "num_or_str",
                value: "",
            }
        }
        switch (value[0]) {
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            return {
                type: "num",
                value: value[1],
            }
        case 10:
            return {
                type: "num_or_str",
                value: value[1],
            }
        case 11:
            return {
                type: "broadcast",
                value: value[2],
            }
        case 12:
            return {
                type: "variable",
                value: value[2],
            }
        case 13:
            return {
                type: "list",
                value: value[2],
            }
        }
    }

    build_inputs(
        inputs: { [key: string]: ScratchInput },
        fields: { [key: string]: ScratchField },
    ): { [key: string]:  AstInput } {
        let result: { [key: string]: AstInput} = {}
        for (const k in inputs) {
            result[k] = this.build_input(inputs[k])
        }
        for (const k in fields) {
            result[k] = {
                type: "num_or_str",
                value: fields[k][1],
            }
        }
        return result
    }

    build_ev_block(block: ScratchBlock): AstEvent {
        return {
            opcode: block.opcode,
            inputs: this.build_inputs(block.inputs, block.fields),
        }
    }
    
    build_block(block: ScratchBlock): AstBlock {
        return {
            opcode: block.opcode,
            parent: block.parent,
            inputs: this.build_inputs(block.inputs, block.fields),
        }
    }
    
    build_blocks(block: ScratchBlock): AstBlocks {
        let p = block
        let blocks: AstBlock[] = [ this.build_block(block) ]
        while (p.next) {
            p = this.target!.blocks[p.next]
            blocks.push(this.build_block(p))
        }
        return { blocks }
    }
    
    build_block_stack(block: ScratchBlock): AstBlockStack {
        let p = block
        let blocks: AstBlock[] = []
        while (p.next) {
            p = this.target!.blocks[p.next]
            blocks.push(this.build_block(p))
        }
        return { event: this.build_ev_block(block), blocks }
    }
    
    build_block_stacks(blocks: ScratchBlocks): AstBlockStack[] {
        let block_stacks: AstBlockStack[] = []
        for (const block of Object.values(blocks)) {
            if (block.topLevel && block.next) {
                block_stacks.push(this.build_block_stack(block))
            }
        }
        return block_stacks
    }
    
    build_target(target: ScratchTarget): AstTarget {
        let vars: { [key: string]: Variable } = {}
        for (const k in target.variables) {
            const v = target.variables[k]
            vars[k] = {
                name: v[0],
                value: v[1],
            }
        }
        let lists: { [key: string]: List } = {}
        for (const k in target.lists) {
            const v = target.lists[k]
            lists[k] = {
                name: v[0],
                value: v[1],
            }
        }
        let broadcasts: { [key: string]: Broadcast } = {}
        for (const k in target.broadcasts) {
            const v = target.broadcasts[k]
            broadcasts[k] = {
                name: v,
            }
        }
        let block_stacks = this.build_block_stacks(target.blocks)
        return {
            name: target.name,
            vars, lists, broadcasts, block_stacks,
        }
    }
    
    build_ast(json: ScratchJson): AstFile {
        let targets: AstTarget[] = [];
        for (const target of json.targets) {
            this.target = target
            targets.push(this.build_target(target))
        }
        return { targets }
    }
}