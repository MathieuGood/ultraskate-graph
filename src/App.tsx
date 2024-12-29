import Chart from "react-google-charts"
import "./App.css"
import raceData from "./data/miami_2024.json"
import { useEffect, useState } from "react"
import { interpolateData } from "./utils/graphUtils"

interface Rider {
	id: string
	name: string
	division: string
	laps: number
	discipline: string
	country: string
	hours: number[]
	miles: number[]
}

function App() {
	const chartOptions = {
		title: "Ultraskate Riders Data",
		hAxis: { title: "Hours" },
		vAxis: { title: "Miles" },
		curveType: "function", // Smooth interpolation
		legend: { position: "bottom" }
	}

	// Select the top 5 riders for the chart
	const { riders } = raceData.riders.reduce<{ riders: Rider[] }>(
		(acc, rider, index) => {
			if (index < 5) {
				acc.riders.push(rider)
			}
			return acc
		},
		{ riders: [] }
	)

	const [chartData, setChartData] = useState<(string | number)[][]>([])

	useEffect(() => {
		// Interpolate data for smoother transitions

		// Prepare data for the chart
		const preparedData: (string | number)[][] = [["Hours", ...riders.map(r => r.name)]]

		// Interpolate data for each rider
		const interpolatedRidersData = riders.map(rider =>
			interpolateData(rider.hours, rider.miles)
		)
		const maxPoints = Math.max(...interpolatedRidersData.map(data => data.length))

		// Combine interpolated data into chart rows
		for (let i = 0; i < maxPoints; i++) {
			const row: (string | number)[] = []
			row.push(interpolatedRidersData[0][i]?.[0].toFixed(2) ?? 0) // Push time
			interpolatedRidersData.forEach(data => {
				row.push(data[i]?.[1] ?? 0) // Push miles
			})
			preparedData.push(row)
		}

		setChartData(preparedData)
	}, [riders])

	return (
		<>
			<Chart
				chartType="LineChart"
				width="100%"
				height="800px"
				data={chartData}
				options={chartOptions}
			/>
		</>
	)
}

export default App
