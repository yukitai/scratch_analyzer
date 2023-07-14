import { JSX } from "preact"

type VisibilityProps = {
    show: boolean,
    children: JSX.Element,
}

export function Visibility(props: VisibilityProps) {
    const { show, children } = props
    return (
        <>
            <div class={"transition-500 " +
                (show ? "opacity-100 mt-8" : "m-0 p-0 h-0 opacity-0 translate-y-8")}>
                    { children }
            </div>
        </>
    )
}