import React, { useEffect, useState } from "react"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts"
import { RiderStats } from "../interfaces/RiderStats"
import { ridersDataToChartData } from "../utils/graphUtils"

const RidersChart: React.FC<{ data: RiderStats[] }> = ({ data }) => {
	const [chartData, setChartData] = useState<
		{ hour: number; [riderName: string]: number | null }[]
	>([])

	const [numberOfRidersDisplayed, setNumberOfRidersDisplayed] = useState<number>(10)

	useEffect(() => {
		console.log("Riders Data", data)
		console.log("Chart Data", ridersDataToChartData(data))
		setChartData(ridersDataToChartData(data))
	}, [data])

	const applyAllFilters = (data: RiderStats[]) => {
		const filteredData = applyNumberOfRidersFilter(data)
		return filteredData
	}

	const applyNumberOfRidersFilter = (data: RiderStats[]) => {
		return data.slice(0, numberOfRidersDisplayed)
	}

	return (
		<>
			<div className="filters">
				<input
					type="range"
					min="1"
					max={data.length}
					step="1"
					value={numberOfRidersDisplayed}
					onChange={value => {
						console.log(value.target.value)
						setNumberOfRidersDisplayed(parseInt(value.target.value))
						data = data.slice(0, parseInt(value.target.value))
					}}
				/>
				<span>{numberOfRidersDisplayed} riders displayed</span>
			</div>
			<ResponsiveContainer width="100%" height={600}>
				<LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="hour"
						label={{ value: "Hours", position: "insideBottomRight", offset: -10 }}
						type="number"
						domain={[0, 24]}
						tickCount={25}
						unit={"h"}
					/>
					<YAxis label={{ value: "Miles", angle: -90, position: "insideLeft" }} />
					<Tooltip filterNull={false} />
					<Legend layout="vertical" verticalAlign="top" align="left" />
					{applyAllFilters(data).map(rider => (
						<Line
							key={rider.id}
							type="monotone"
							dataKey={rider.name}
							stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
							connectNulls={true}
							dot={false}
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
		</>
	)
}

export default RidersChart
