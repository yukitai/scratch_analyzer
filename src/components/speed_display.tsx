// @ts-nocheck

import { useRef, useState } from "preact/hooks"
import { SpeedAnalyzeResult } from "../utils/speed_analyzer"
import { Visibility } from "./visibility"
import { Progress } from "./progress"

import { Bar, Line } from 'react-chartjs-2'
import { speed_info } from "../utils/speed_info"
import { get_chart_width, get_chart_height } from "../utils/chart"

type SpeedAnalyzeDisplayProps = {
    result: SpeedAnalyzeResult,
}

export function SpeedAnalyzeDisplay(props: SpeedAnalyzeDisplayProps) {
    const { result, progress, total } = props.result

    const [ curr_tick, set_curr_tick ] = useState(0)

    const [ raw, set_raw ] = useState("")

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

    function get_total_tcost_data() {
        const labels = Object.keys(result!.ticks)

        let data = [ 0, 0 ]
        for (let i = 2; i < result.ticks.length; ++i) {
            data.push(result.ticks[i].t - result.ticks[i - 1].t)
        }

        const res = {
            labels,
            datasets: [
                {
                    label: "tick cost",
                    data,
                    fill: false,
                    borderColor: '#fefefe',
                    tension: 0,
                },
            ],
        }

        return res
    }

    return (
        <>
            {raw !== "" && (
                <dialog open class="dialog">
                    <div class="exit-btn" onClick={e => set_raw("")}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="circle-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-circle-xmark">
                            <g class="fa-duotone-group">
                                <path fill="currentColor" d="M209 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47z" class="fa-primary"></path>
                            </g>
                        </svg>
                    </div>
                    <div class="dialog-container">
                        <pre class="style-code">{raw}</pre>
                    </div>
                </dialog>
            )}
            <Visibility show={ total !== -1 }>
                <>
                    <Progress max={total} now={progress} />
                </>
            </Visibility>
            <Visibility show={ result !== undefined }>
                <>
                    { result !== undefined && (<div>
                        <h2 class="font-thin">
                            <span>Definition Costs (ms)</span>
                            <button class="float-right transition text-white hover:text-gray-900
                                border-solid border-1.5 border-pink-200 outline-none rounded-lg
                                px-2.5 py-1.5 text-xs bg-transparent hover:bg-pink-200 shadow-2xl
                                hover:shadow-3xl shadow-pink-200 hover:cursor-pointer"
                                onClick={e => {
                                    set_raw(speed_info(result))
                                }}>View Raw</button>
                        </h2>
                        <Bar width={get_chart_width()} height={get_chart_height()} data={get_cost_data()}
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
                        <Bar width={get_chart_width()} height={get_chart_height()} data={get_total_data()}
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
                            Tick Costs
                        </h2>
                        <Line width={get_chart_width()} height={get_chart_height()} data={get_total_tcost_data()}
                            options={{
                                // indexAxis: "y",
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
                            <span>
                                Tick {curr_tick}
                            </span>
                            <input type="range" min="0" step="1" value={curr_tick}
                                onChange={e => set_curr_tick(parseInt(rangeRef.current?.value ?? "0"))}
                                max={result.ticks.length - 1} ref={rangeRef}
                                class="style-range w-sm float-right mt-2" />
                        </h2>
                        <Bar width={get_chart_width()} height={get_chart_height()} data={get_tick_data(curr_tick)}
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