// @ts-nocheck

import { useRef, useState } from "preact/hooks"
import { SpeedAnalyzeResult } from "../utils/speed_analyzer"
import { Visibility } from "./visibility"

import { Bar } from 'react-chartjs-2'

type SpeedAnalyzeDisplayProps = {
    result: SpeedAnalyzeResult,
}

export function SpeedAnalyzeDisplay(props: SpeedAnalyzeDisplayProps) {
    const { result } = props.result

    const [ curr_tick, set_curr_tick ] = useState(0)

    const rangeRef = useRef<HTMLInputElement>(null)

    function get_tick_data(tid: number) {
        const fc = result!.ticks[tid].fn_call

        const labels = Object.keys(fc)
        let data = []

        labels.sort((a, b) => fc[b] - fc[a])

        for (const k of labels) {
            data.push(fc[k])
        }

        function get_color(percent: number): string {
            if (percent > 1000) {
                return "rgb(255, 99, 132)"
            } else if (percent > 400) {
                return "rgb(255, 205, 86)"
            } else {
                return "rgb(54, 162, 235)"
            }
        }

        const res = {
            labels,
            datasets: [
                {
                    label: `tick ${tid}`,
                    data,
                    backgroundColor: data.map(it => {
                        return get_color(it as number)
                    }),
                    hoverOffset: 4,
                },
            ],
        }

        return res
    }

    function get_total_data() {
        let fc: {[key: string]: number } = {}

        for (const tick of result!.ticks) {
            for (const k in tick.fn_call) {
                fc[k] = (fc[k] ?? 0) + tick.fn_call[k]
            }
        }

        const labels = Object.keys(fc)
        let data = []

        labels.sort((a, b) => fc[b] - fc[a])

        for (const k of labels) {
            data.push(fc[k])
        }

        function get_color(percent: number): string {
            if (percent > 1000) {
                return "rgb(255, 99, 132)"
            } else if (percent > 400) {
                return "rgb(255, 205, 86)"
            } else {
                return "rgb(54, 162, 235)"
            }
        }

        const res = {
            labels,
            datasets: [
                {
                    label: `total ${result!.ticks.length} ticks`,
                    data,
                    backgroundColor: data.map(it => {
                        return get_color(it as number)
                    }),
                    hoverOffset: 4,
                },
            ],
        }

        return res
    }

    function get_cost_data() {
        const fc = result!.fn_cost

        /*for (const k in fc) {
            if (fc[k] === 0) {
                fc[k] = 0.001
            }
        }*/

        const labels = Object.keys(fc)
        let data = []

        labels.sort((a, b) => fc[b] - fc[a])

        for (const k of labels) {
            data.push(fc[k])
        }

        // labels.push("other")
        // data.push(deleted.reduce((p, c) => (fc[p] as number) + (fc[c] as number)), 0)

        function get_color(percent: number): string {
            if (percent > 0.4) {
                return "rgb(255, 99, 132)"
            } else if (percent > 0.15) {
                return "rgb(255, 205, 86)"
            } else {
                return "rgb(54, 162, 235)"
            }
        }

        const total = data.reduce((p, c) => (p as number) + (c as number), 0)

        const res = {
            labels,
            datasets: [
                {
                    label: "definition cost",
                    data,
                    backgroundColor: data.map(it => {
                        return get_color((it as number) / (total as number))
                    }),
                    hoverOffset: 4,
                },
            ],
        }

        return res
    }

    return (
        <>
            <Visibility show={ result !== undefined }>
                <>
                    { result !== undefined && (<div>
                        <h2 class="font-thin">Definition Costs (ms)</h2>
                        <Bar width="500" height="400" data={get_cost_data()}
                            options={{
                                indexAxis: "y",
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: "right",
                                        labels: {
                                            color: 'rgb(255, 99, 132)'
                                        },
                                    }
                                }
                            }} />

                        <h2 class="font-thin">
                            Total
                        </h2>
                        <Bar width="500" height="400" data={get_total_data()}
                            options={{
                                indexAxis: "y",
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: "right",
                                        labels: {
                                            color: 'rgb(255, 99, 132)'
                                        },
                                    }
                                }
                            }} />

                        <h2 class="font-thin">
                            Tick {curr_tick} <input type="range" min="0" step="1"
                                onChange={e => set_curr_tick(parseInt(rangeRef.current?.value ?? "0"))}
                                max={result.ticks.length - 1} ref={rangeRef}
                                class="style-range" />
                        </h2>
                        <Bar width="500" height="400" data={get_tick_data(curr_tick)}
                            options={{
                                indexAxis: "y",
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: "right",
                                        labels: {
                                            color: 'rgb(255, 99, 132)'
                                        },
                                    }
                                }
                            }} />
                    </div>) }
                </>
            </Visibility>
        </>
    )
}