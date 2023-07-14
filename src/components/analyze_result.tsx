import { AnalyzeResult } from "../utils/analyzer"
import { get_active_block_count, get_block_stack_count, get_definion_count, get_sprite_count } from "../utils/ast_info"
import { Visibility } from "./visibility"

type AnalyzeDisplayProps = {
    result: AnalyzeResult,
}

export function AnalyzeDisplay(props: AnalyzeDisplayProps) {
    const { definions, events, warnings,
        notes, helps, ast } = props.result
    return (
        <>
            <Visibility show={ast !== undefined}>
                <div>
                    {ast && (<>
                        <h2 class="font-thin">AST Informations</h2>
                        <div class="grid gap-4 grid-cols-2 style-code">
                            <div>
                                <span>Sprites</span>: <span>
                                    {get_sprite_count(ast!)}
                                </span> + 1
                            </div>
                            <div class="line-through">
                                <span>Definions</span>: <span>
                                    {get_definion_count(ast!)}
                                </span>
                            </div>
                            <div>
                                <span>BlockStacks</span>: <span>
                                    {get_block_stack_count(ast!)}
                                </span>
                            </div>
                            <div>
                                <span>ActiveBlocks</span>: <span>
                                    {get_active_block_count(ast!)}
                                </span>
                            </div>
                        </div>
                    </>)}
                </div>
            </Visibility>
            <Visibility show={definions.length > 0}>
                <div class="hidden">
                    <h2 class="font-thin">Definions</h2>
                    { definions.map(item => (
                        <div></div>
                    )) }
                </div>
            </Visibility>
            <Visibility show={events.length > 0}>
                <div class="hidden">
                    <h2 class="font-thin">Events</h2>
                    { events.map(item => (
                        <div></div>
                    )) }
                </div>
            </Visibility>
            <Visibility show={warnings.length > 0}>
                <div>
                    <h2 class="font-thin">Warnings</h2>
                    { warnings.map(item => (
                        <div class="style-code mt-2">
                            <span class="text-amber-300">
                                { item.msg }
                            </span> {item.loc && (<>
                                at <span class="text-gray-500">
                                    { item.loc }
                                </span>
                            </>)}
                        </div>
                    )) }
                </div>
            </Visibility>
            <Visibility show={notes.length > 0}>
                <div class="">
                    <h2 class="font-thin">Notes</h2>
                    { notes.map(item => (
                        <div class="style-code mt-2">
                            <span class="text-gray-100">
                                { item.msg }
                            </span> {item.loc && (<>
                                at <span class="text-gray-500">
                                    { item.loc }
                                </span>
                            </>)}
                        </div>
                    )) }
                </div>
            </Visibility>
            <Visibility show={helps.length > 0}>
                <div class="">
                    <h2 class="font-thin">Helps</h2>
                    { helps.map(item => (
                        <div class="style-code mt-2">
                            <span class="text-green-400">
                                { item.msg }
                            </span> {item.loc && (<>
                                at <span class="text-gray-500">
                                    { item.loc }
                                </span>
                            </>)}
                        </div>
                    )) }
                </div>
            </Visibility>
        </>
    )
}