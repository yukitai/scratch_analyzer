import { StateUpdater } from "preact/hooks"
import { ScratchJson } from "./sb3json"

type SpeedAnalyzeResult = {
    result?: SpeedAnalyzeResultType,
    progress?: number | null,
    total?: number | null,
}

type SpeedAnalyzeResultType = {
    ticks: Ticks,
    fn_cost: FnCosts,
}

type Ticks = {
    t: number,
    fn_call: { [key: string]: number },
}[]

type FnCosts = { [key: string]: number }

type SpeedRawData = (string | number)[]

export class SpeedAnalyzer {
    json: ScratchJson
    data: SpeedRawData
    result: SpeedAnalyzeResult
    setResult: StateUpdater<SpeedAnalyzeResult>

    constructor(json: ScratchJson, data: SpeedRawData, result: SpeedAnalyzeResult,
        setResult: StateUpdater<SpeedAnalyzeResult>) {
        this.json = json
        this.data = data
        this.result = result
        this.setResult = setResult
    }

    async analyze() {
        let ticks: Ticks = [{ t: 0, fn_call: {} }]
        let fn_cost: FnCosts = {}
        let call_stack = []
        let i = 0

        const update = () => {
            this.setResult({
                progress: i, total: this.data.length,
            })
        }
        const updater = setInterval(update, 100)

        for (; i < this.data.length; i += 3) {
            const n = this.data[i + 1]
            switch (this.data[i]) {
            case "start":
                call_stack.push({ n: n as string, t: this.data[i + 2] as number })
                break
            case "end":
                for (let j = call_stack.length - 1; j >= 0 ; --j) {
                    if (call_stack[j].n === n) {
                        let fc = ticks[ticks.length - 1].fn_call
                        fc[n] = (fc[n] ?? 0) + 1
                        fn_cost[n] = (fn_cost[n] ?? 0) +
                            86400000 * (this.data[i + 2] as number - call_stack[j].t)
                        call_stack.splice(j, 1)
                        break
                    }
                }
                break
            case "tick":
                ticks.push({ t: 86400000 * (n as number), fn_call: {} })
                break
            default:
                break
            }
        }

        clearInterval(updater)

        this.setResult(prev => { return {
            result: { ticks, fn_cost },
            progress: -1,
            total: -1,
        } })
    }
}

export type {
    SpeedAnalyzeResult,
    SpeedAnalyzeResultType,
    SpeedRawData,
}