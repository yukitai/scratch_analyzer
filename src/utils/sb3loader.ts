import JSZip from "jszip"
import { ScratchJson } from "./sb3json"

export async function loadsb3(file: File): Promise<[ScratchJson, JSZip]> {
    return new Promise((resolve, reject) => {
        const jszip = new JSZip()
        JSZip.loadAsync(file).then(async zip => {
            const projf = zip.files["project.json"]
            if (!projf) {
                alert("invailed sb3 file format: missing `project.json`")
            }
            const projc = zip.file(projf.name)!.async("string")
            return [ await projc, zip ]
        }).then(([ jstr, zip ]) => {
            const json = JSON.parse(jstr as string)
            resolve([json as ScratchJson, zip as JSZip])
        }).catch(reject)
    })
}