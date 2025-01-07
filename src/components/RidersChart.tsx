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
	ridersDataToRechartsData,
	ridersDataToGoogleChartsData,
	ridersDataToPlotlyData
} from "../utils/graphUtils"
import { Filters } from "../interfaces/Filters"
import RidersFilters from "./filters/RidersFilters"
import { applyCategoryFilters, applyNamesFilter, top10RidersFilter } from "../utils/filtersUtils"
import { RiderTooltipRecharts } from "./RiderTooltipRecharts"
import Chart from "react-google-charts"
import Plot from "react-plotly.js"
import { GoogleChartData, PlotlyData, RechartsData } from "../interfaces/ChartData"

const RidersChart: React.FC<{ data: RiderStats[]; lib: string }> = ({ data, lib }) => {
	const [chartData, setChartData] = useState<GoogleChartData[] | RechartsData[] | PlotlyData[]>(
		[]
	)

	const [filters, setFilters] = useState<Filters>(top10RidersFilter(data))

	useEffect(() => {
		setFilters(top10RidersFilter(data))
	}, [data])

	useEffect(() => {
		const filteredData =
			filters.names.length === 0 || filters.names[0] === ""
				? (console.log("applyCategoryFilters in useEffect"),
				  applyCategoryFilters(data, filters))
				: (console.log("applyNamesFilters in useEffect"), applyNamesFilter(data, filters))

		if (lib === "recharts") {
			const rechartsData = ridersDataToRechartsData(filteredData as RiderStats[])
			console.log("rechartsData", rechartsData)
			setChartData(rechartsData)
		}
		if (lib === "plotly") {
			const plotlyData = ridersDataToPlotlyData(filteredData as RiderStats[])
			console.log("plotlyData", plotlyData)
			setChartData(plotlyData)
		}
		if (lib === "google-charts") {
			const googleChartData = ridersDataToGoogleChartsData(filteredData as RiderStats[])
			console.log("googleChartData", googleChartData)
			setChartData(googleChartData)
		}
	}, [filters, data, lib])

	return (
		<div className="mt-4">
			<RidersFilters data={data} filters={filters} setFilters={setFilters} />

			{lib === "plotly" && (
				<Plot
					data={chartData as PlotlyData[]}
					layout={{
						title: "Riders Stats",
						width: 800,
						height: 600,
						xaxis: {
							title: "Hours",
							tickvals: Array.from({ length: 25 }, (_, i) => i),
							ticktext: Array.from({ length: 25 }, (_, i) => i + "h")
						},
						yaxis: {
							title: "Miles"
						},
						legend: {
							x: 0,
							y: 1,
							xanchor: "left",
							yanchor: "bottom"
						}
					}}
				/>
			)}

			{lib === "google-charts" && (
				<Chart
					loader={<div>Loading Chart...</div>}
					chartType="LineChart"
					width={"100%"}
					height={"600px"}
					data={chartData}
					legendToggle
					options={{
						title: "Riders Stats",
						interpolateNulls: true,
						tooltip: { isHtml: true },
						chartArea: { width: "80%", height: "85%" },
						legend: { position: "top" },
						hAxis: {
							title: "Hours",
							format: "#h",
							ticks: Array.from({ length: 25 }, (_, i) => i)
						},
						vAxis: {
							title: "Miles",
							format: "# miles"
						},
						explorer: {
							actions: ["dragToZoom", "rightClickToReset"],
							axis: "horizontal",
							keepInBounds: true,
							maxZoomIn: 10.0
						}
					}}
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
						<Tooltip content={RiderTooltipRecharts} />
						<Legend
							layout="horizontal"
							verticalAlign="top"
							align="left"
							wrapperStyle={{ paddingBottom: "20px" }}
						/>
						{applyCategoryFilters(data, filters).map(rider => (
							<Line
								key={rider.name}
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
		</div>
	)
}

export default RidersChart
