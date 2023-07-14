import { render } from 'preact'
import { App } from './app'

import { ArcElement, BarElement, LinearScale, RadialLinearScale, CategoryScale, Chart } from 'chart.js'

Chart.register(ArcElement)
Chart.register(RadialLinearScale)
Chart.register(LinearScale)
Chart.register(CategoryScale)
Chart.register(BarElement)

import 'uno.css'

render(<App />, document.getElementById('app')!)
