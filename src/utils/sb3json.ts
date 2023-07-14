export type ScratchValue = number | boolean | string

export interface ScratchJson {
    targets: ScratchTarget[],
}

export type ScratchBlocks = { [key: string]: ScratchBlock }

export interface ScratchTarget {
    isStage: boolean,
    name: string,
    blocks: ScratchBlocks,
    variables: { [key: string]: ScratchVariable },
    lists: { [key: string]: ScratchList },
    broadcasts: { [key: string]: string },
}

export type ScratchVariable = [string, ScratchValue]
export type ScratchList = [string, ScratchValue[]]

export interface ScratchBlock {
    opcode: string,
    next?: string | null,
    parent?: string | null,
    shadow: boolean,
    topLevel: boolean,
    inputs: { [key: string]: ScratchInput },
    fields: { [key: string]: ScratchField },
}

export type ScratchNumberInput = [4 | 5 | 6 | 7, number]
export type ScratchColorInput = [9, string]
export type ScratchStringInput = [10, string]
export type ScratchBroardcastInput = [11, string, string]
export type ScratchVariableInput = [12, string, string, number, number]
export type ScratchListInput = [13, string, string, number, number]
export type ScratchAngleInput = [8, number]
export type ScratchBlockInput = string

export type ScratchInputType = ScratchNumberInput |
    ScratchColorInput | ScratchStringInput |
    ScratchBroardcastInput | ScratchVariableInput |
    ScratchListInput | ScratchAngleInput |
    ScratchBlockInput

export type ScratchNoShadow = [2, ScratchInputType]
export type ScratchShadow = [1, ScratchInputType]
export type ScratchCoveredShadow = [3, ScratchInputType, ScratchInputType]

export type ScratchShadowType = ScratchNoShadow |
    ScratchShadow | ScratchCoveredShadow

export type ScratchInput = ScratchShadowType

export type ScratchField = [string, string]