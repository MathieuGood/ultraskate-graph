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
import {
	ridersDataToChartData as ridersDataToRechartsData,
	ridersDataToGoogleChartData
} from "../utils/graphUtils"
import { Filters } from "../interfaces/Filters"
import RidersFilters from "./RidersFilters"
import { applyAllFilters } from "../utils/filtersUtils"
import { RiderTooltip } from "./RiderTooltip"
import Chart from "react-google-charts"

interface GoogleChartData extends Array<string | number | null> {
	hour?: number
}
interface RechartsData {
	[key: string]: number | string
}

const RidersChart: React.FC<{ data: RiderStats[]; lib: string }> = ({ data, lib }) => {
	const [chartData, setChartData] = useState<GoogleChartData[] | RechartsData[]>([])

	const [filters, setFilters] = useState<Filters>({
		numberOfRiders: 10,
		country: "",
		discipline: "",
		division: "",
		age: ""
	})

	useEffect(() => {
		const filteredData = applyAllFilters(data, filters)

		if (lib === "recharts") {
			const rechartsData = ridersDataToRechartsData(filteredData)
			setChartData(rechartsData)
		}
		if (lib === "google-charts") {
			const googleChartData = ridersDataToGoogleChartData(filteredData)
			setChartData(googleChartData)
		}
	}, [filters, data, lib])

	return (
		<>
			<RidersFilters data={data} filters={filters} setFilters={setFilters} />

			{lib === "google-charts" && (
				<Chart
					chartType="LineChart"
					width={"100%"}
					height={"600px"}
					data={chartData}
					options={{
						title: "Riders Stats",
						interpolateNulls: true
					}}
					legendToggle
				/>
			)}

			{lib === "recharts" && (
				<ResponsiveContainer width="100%" height={600}>
					<LineChart
						data={chartData}
						margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
						{chartData.length === 0 && (
							<text
								x="50%"
								y="50%"
								textAnchor="middle"
								dominantBaseline="middle"
								style={{ fontSize: "16px", fill: "#999" }}>
								No data available for the selected filters
							</text>
						)}

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
						<Tooltip content={RiderTooltip} />
						<Legend
							layout="horizontal"
							verticalAlign="top"
							align="left"
							wrapperStyle={{ paddingBottom: "20px" }}
						/>
						{applyAllFilters(data, filters).map(rider => (
							<Line
								onMouseEnter={() => console.log(`focus on line ${rider.name}`)}
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
			)}
		</>
	)
}

export default RidersChart
