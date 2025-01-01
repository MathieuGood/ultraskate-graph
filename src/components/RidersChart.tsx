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
		numberOfRiders: 15,
		country: "",
		discipline: "",
		division: "",
		age: ""
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
			.filter(rider => applyDivisionFilter(rider))
			.filter(rider => applyAgeFilter(rider))
			.slice(0, filters.numberOfRiders)
	}

	const applyCountryFilter = (rider: RiderStats) => {
		return filters.country ? rider.country === filters.country : true
	}

	const applyDisciplineFilter = (rider: RiderStats) => {
		return filters.discipline ? rider.discipline === filters.discipline : true
	}

	const applyDivisionFilter = (rider: RiderStats) => {
		return filters.division ? rider.division === filters.division : true
	}

	const applyAgeFilter = (rider: RiderStats) => {
		return filters.age ? rider.age === filters.age : true
	}

	return (
		<>
			<div className="filters flex flex-wrap gap-2">
			<div className="border rounded p-2">
					<label htmlFor="numberOfRiders">Riders to display:</label>
					<span>{filters.numberOfRiders}</span>
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
				</div>
				<div className="border rounded p-2">
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
				<div className="border rounded p-2">
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
				<div className="border rounded p-2">
					<label htmlFor="divisionFilter">Division:</label>
					<select
						id="divisionFilter"
						value={filters.division}
						onChange={e => setFilters({ ...filters, division: e.target.value })}>
						<option value="">All</option>
						{[...new Set(data.map(rider => rider.division))].map(division => (
							<option key={division} value={division}>
								{division}
							</option>
						))}
					</select>
				</div>
				<div className="border rounded p-2">
					<label htmlFor="ageFilter">Age category:</label>
					<select
						id="ageFilter"
						value={filters.age}
						onChange={e => setFilters({ ...filters, age: e.target.value })}>
						<option value="">All</option>
						{[...new Set(data.map(rider => rider.age))].map(age => (
							<option key={age} value={age}>
								{age}
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
					<Tooltip />
					<Legend layout="horizontal" verticalAlign="top" align="left" />
					{applyAllFilters(data).map(rider => (
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
		</>
	)
}

export default RidersChart
