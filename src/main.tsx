import { render } from 'preact'
import { App } from './app'

import { ArcElement, PointElement, BarElement, LinearScale, RadialLinearScale, CategoryScale, Chart, LineElement } from 'chart.js'

Chart.register(ArcElement)
Chart.register(RadialLinearScale)
Chart.register(LinearScale)
Chart.register(CategoryScale)
Chart.register(BarElement)
Chart.register(PointElement)
Chart.register(LineElement)

import 'uno.css'

render(<App />, document.getElementById('app')!)
