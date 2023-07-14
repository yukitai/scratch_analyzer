import { inject_call_mark, inject_call_unmark, injection_json, injection_list_delc, injection_stage } from "./injections";
import { ScratchJson } from "./sb3json";

export function inject(src: ScratchJson): ScratchJson {
    // inject list
    for (const k of Object.keys(injection_list_delc)) {
        src.targets[0].lists[k] = injection_list_delc[k]
    }
    // inject our marks definion into targets
    let i = 0

    function get_id(): string {
        return `$$scratch_analyzer_injected_i${i++}`
    }

    for (const target of src.targets) {
        // now let's mark it!
        for (const k of Object.keys(target.blocks)) {
            let block = target.blocks[k]
            if (block.opcode === "procedures_definition") {
                const proto = target.blocks[block.inputs["custom_block"][1] as string]
                const name = `${target.name}@${k}\$\$${(proto as any).mutation.proccode}`
                const id = get_id()
                const inject_block = inject_call_mark(name, k, block.next)
                if (block.next) {
                    target.blocks[block.next].parent = id
                }
                block.next = id
                target.blocks[id] = inject_block
                while (block.next) {
                    block = target.blocks[block.next]
                }
                const last_bid = target.blocks[block.parent!].next
                const id2 = get_id()
                const inject_block2 =
                    inject_call_unmark(name, last_bid, null)
                block.next = id2
                target.blocks[id2] = inject_block2
            }
        }
        for (const k of Object.keys(injection_json.blocks)) {
            target.blocks[k] = injection_json.blocks[k]
        }
        if (target.isStage) {
            for (const k of Object.keys(injection_stage.blocks)) {
                target.blocks[k] = injection_stage.blocks[k]
            }
        }
    }
    return src
}