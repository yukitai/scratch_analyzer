import { useState } from 'preact/hooks'

import { saveAs } from 'file-saver'

import { UploadFile } from "./components/upload_file"
import { loadsb3 } from "./utils/sb3loader"
import { AnalyzeDisplay } from './components/analyze_result'
import { AnalyzeResult, Analyzer } from './utils/analyzer'
import { SpeedAnalyzeResult, SpeedAnalyzer, SpeedRawData } from './utils/speed_analyzer'
import { inject } from './utils/inject_sb3'
import { SpeedAnalyzeDisplay } from './components/speed_display'

export function App() {
    const [ analyzeResult, setAnalyzeResult ] = useState({
        definions: [],
        events: [],
        warnings: [],
        notes: [],
        helps: [],
    } as AnalyzeResult)

    const [ speedAnalyzeResult, setSpeedAnalyzeResult ] = useState({

    } as SpeedAnalyzeResult)

    return (
        <div class="flex flex-col items-center">
            <div class="flex flex-col items-center my-16">
                <h1 class="font-thin text-4xl mb-4">
                    Scratch Analyzer
                </h1>
                <span class="text-gray-700">
                    analyze your project and give some advices to improve
                </span>
            </div>
            <div>
                <UploadFile title="Upload Source" id="src-file" accept=".sb3, .zip"
                    onLoad={(files: FileList) => {
                        if (files.length === 0) { return }
                        const file = files[0]

                        setAnalyzeResult(prev => { return {
                            definions: [],
                            events: [],
                            warnings: [],
                            notes: [],
                            helps: [],
                        } })

                        loadsb3(file).then(([json, zip]) => {
                            const injected = inject(json)
                            console.log(injected)
                            zip.file("project.json", JSON.stringify(injected))
                            zip.generateAsync({type:"blob"})
                                .then(function(content) {
                                    saveAs(content, "injected.sb3");
                                });
                            const analyzer = new Analyzer(json, analyzeResult,
                                setAnalyzeResult)
                            return analyzer.analyze()
                        }).then().catch(console.error)
                    }} />

                <div class="inline-block mx-4"></div>

                <UploadFile title="Upload Marked" id="-file" accept=".sb3, .zip"
                    onLoad={(files: FileList) => {
                        if (files.length === 0) { return }
                        const file = files[0]

                        loadsb3(file).then(([json]) => {
                            const data = json.targets[0].lists["wVRq*^~#2T`usdQf9C;/"][1]
                            const speed_analyzer = new SpeedAnalyzer(json,
                                data as SpeedRawData, speedAnalyzeResult,
                                setSpeedAnalyzeResult)
                            return speed_analyzer.analyze()
                        }).catch(console.error)
                    }} />
            </div>

            <SpeedAnalyzeDisplay result={speedAnalyzeResult}/>
            <AnalyzeDisplay result={analyzeResult} />
        </div>
    )
}
