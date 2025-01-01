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
import { getFlagEmoji } from "../utils/flagUtils"

const RidersChart: React.FC<{ data: RiderStats[] }> = ({ data }) => {
	const [chartData, setChartData] = useState<
		{ hour: number; [riderName: string]: number | null }[]
	>([])
	const [filters, setFilters] = useState({
		numberOfRiders: 5,
		country: "",
		discipline: ""
	})

	useEffect(() => {
		const filteredData = applyAllFilters(data)
		setChartData(ridersDataToChartData(filteredData))
		console.log("Data updated", filteredData)
	}, [filters, data])

	const applyAllFilters = (data: RiderStats[]) => {
		return data
			.filter(rider => applyCountryFilter(rider))
			.filter(rider => applyDisciplineFilter(rider))
			.slice(0, filters.numberOfRiders)
	}

	const applyCountryFilter = (rider: RiderStats) => {
		return filters.country ? rider.country === filters.country : true
	}

	const applyDisciplineFilter = (rider: RiderStats) => {
		return filters.discipline ? rider.discipline === filters.discipline : true
	}

	return (
		<>
			<div className="filters">
				<div>
					<label htmlFor="numberOfRiders">Number of Riders:</label>
					<input
						id="numberOfRiders"
						type="range"
						min="1"
						max={data.length}
						step="1"
						value={filters.numberOfRiders}
						onChange={e =>
							setFilters({ ...filters, numberOfRiders: parseInt(e.target.value) })
						}
					/>
					<span>{filters.numberOfRiders} riders displayed</span>
				</div>
				<div>
					<label htmlFor="countryFilter">Country:</label>
					<select
						id="countryFilter"
						value={filters.country}
						onChange={e => setFilters({ ...filters, country: e.target.value })}>
						<option value="">All</option>
						{[...new Set(data.map(rider => rider.country))].map(country => (
							<option key={country} value={country}>
								{getFlagEmoji(country)} {country}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="disciplineFilter">Discipline:</label>
					<select
						id="disciplineFilter"
						value={filters.discipline}
						onChange={e => setFilters({ ...filters, discipline: e.target.value })}>
						<option value="">All</option>
						{[...new Set(data.map(rider => rider.discipline))].map(discipline => (
							<option key={discipline} value={discipline}>
								{discipline}
							</option>
						))}
					</select>
				</div>
			</div>
			<ResponsiveContainer width="100%" height={600}>
				<LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
