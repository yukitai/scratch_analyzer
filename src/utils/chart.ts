export function get_chart_width(): number {
    return Math.min(document.getElementById("app")!.scrollWidth, 800)
}

export function get_chart_height(): number {
    return get_chart_width() * 3 / 4
}