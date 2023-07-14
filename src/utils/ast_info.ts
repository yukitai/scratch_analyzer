import { AstBlockStack, AstBlocks, AstFile, AstInput } from "./ast";

export function get_sprite_count(ast: AstFile): number {
    return ast.targets.length - 1
}

export function get_definion_count(ast: AstFile): number {
    let count = 0
    return count
}

export function get_block_stack_count(ast: AstFile): number {
    let count = 0
    for (const target of ast.targets) {
        count += target.block_stacks.length
    }
    return count
}

function get_block_count_of_input(input: AstInput): number {
    switch (input.type) {
    case "boolean":
    case "num_or_str":
    case "broadcast":
    case "num":
        return 0
    case "block":
        return get_block_count_of_blocks(input.value as AstBlocks)
    case "variable":
        return 1
    case "list":
        return 1
    }
}

function get_block_count_of_inputs(inputs: { [key: string]: AstInput }): number {
    let count = 0
    for (const input of Object.values(inputs)) {
        count += get_block_count_of_input(input)
    }
    return count
}

function get_block_count_of_block_stack(b: AstBlockStack): number {
    let count = 1
    for (const bl of b.blocks) {
        count += 1 + get_block_count_of_inputs(bl.inputs)
    }
    return count
}

function get_block_count_of_blocks(bs: AstBlocks): number {
    let count = 0
    for (const bl of bs.blocks) {
        count += 1 + get_block_count_of_inputs(bl.inputs)
    }
    return count
}

function get_block_count_of_block_stacks(bs: AstBlockStack[]): number {
    let count = 0
    for (const b of bs) {
        count += get_block_count_of_block_stack(b)
    }
    return count
}

export function get_active_block_count(ast: AstFile): number {
    let count = 0
    for (const target of ast.targets) {
        count += get_block_count_of_block_stacks(target.block_stacks)
    }
    return count
}