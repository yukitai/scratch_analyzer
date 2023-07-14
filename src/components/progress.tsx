type ProgressProps = {
    max?: number,
    now?: number,
}

export function Progress(props: ProgressProps) {
    let { max, now } = props

    max = max === -2 ? undefined : max
    now = now === -2 ? undefined : now

    console.log(max, now)

    return (
        <>
            {max === undefined || now === undefined ? (<progress
                class="transition" key="1">
            </progress>) : (<progress key="2"
                class="transition show_progress"
                max={max}
                value={now}></progress>)}
        </>
    )
}