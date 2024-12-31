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

	useEffect(() => {
		console.log("Riders Data", data)
		console.log("Chart Data", ridersDataToChartData(data))
		setChartData(ridersDataToChartData(data))
	}, [data])

	return (
		<ResponsiveContainer width="100%" height={600}>
			<LineChart
				width={800}
				height={400}
				data={chartData}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="hour"
					label={{ value: "Hours", position: "insideBottomRight", offset: -10 }}
					type="number"
					domain={[0, 24]}
					tickCount={25} // Force the domain to be from 0 to 24
					unit={"h"}
				/>
				<YAxis label={{ value: "Miles", angle: -90, position: "insideLeft" }} />
				<Tooltip />
				<Legend />
				{data.map(rider => (
					<Line
						key={rider.id}
						type="monotone"
						dataKey={rider.name}
						stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
						connectNulls={true}
						dot={false}
					/>
				))}
			</LineChart>
		</ResponsiveContainer>
	)
}

export default RidersChart
