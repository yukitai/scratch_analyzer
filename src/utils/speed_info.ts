import { SpeedAnalyzeResultType } from "./speed_analyzer"

export function speed_info(result: SpeedAnalyzeResultType): string {
    let info = `total ${result.ticks.length} ticks cost: \n\n`

    let ticks: {[key: string]: number } = {}

    for (const tick of result.ticks) {
        for (const k in tick.fn_call) {
            ticks[k] = (ticks[k] ?? 0) + tick.fn_call[k]
        }
    }

    const sorted_k = Object.keys(result.fn_cost)
        .sort((a, b) => result.fn_cost[b] - result.fn_cost[a])

    for (const k of sorted_k) {
        info += `definition \`${k}\`(${ticks[k]}) cost ${result.fn_cost[k].toFixed(0)}ms\n`
    }

    info += `\neach tick costs:\n\n`

    let tkeys = Object.keys(result.ticks)

    let tcosts: number[] = [ 0 ]
    for (let i = 1; i < result.ticks.length - 1; ++i) {
        tcosts.push(result.ticks[i + 1].t - result.ticks[i].t)
    }
    tcosts.push(0)

    tkeys.sort((a, b) => tcosts[b as unknown as number] - tcosts[a as unknown as number])

    for (const k of tkeys) {
        const fc = Object.values(result.ticks[k as unknown as number].fn_call)
        const c = fc.reduce((p, c) => p + c, 0)
        const cost = tcosts[k as unknown as number]
        info += `tick ${k} costs ${cost.toFixed(0)}ms${cost > 4 ? `(avg. ${(1000 / cost).toFixed(0)} fps)` : ""}, runs ${c}(${fc.length}) definitions\n`
    }

    return info
}