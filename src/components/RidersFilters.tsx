import { getFlagEmoji } from "../utils/flagUtils"
import { Filters } from "../interfaces/Filters"
import { RiderStats } from "../interfaces/RiderStats"
import { MenuItem, Select, Slider } from "@mui/material"
import RiderPicker from "./RiderPicker"
import { useEffect, useState } from "react"
import { getRidersList } from "../utils/filtersUtils"
import { RiderInfo } from "../interfaces/RiderInfo"

const RidersFilters: React.FC<{
	data: RiderStats[]
	filters: Filters
	setFilters: (filters: Filters) => void
}> = ({ data, filters, setFilters }) => {
	const [ridersList, setRidersList] = useState<RiderInfo[]>([])

	useEffect(() => {
		const ridersInfo = getRidersList(data)
		setRidersList(ridersInfo)
	}, [data])

	return (
		<div className="filters flex flex-wrap gap-2">
			<div className="border rounded p-2">
				<RiderPicker ridersList={ridersList} />
			</div>

			<div className="border rounded p-2">
				<label htmlFor="numberOfRiders">Riders to display:</label>{" "}
				<span>{filters.numberOfRiders}</span>
				<Slider
					id="numberOfRiders"
					min={1}
					max={data.length}
					step={1}
					value={filters.numberOfRiders}
					onChange={(_e, value) =>
						setFilters({ ...filters, numberOfRiders: value as number })
					}
					valueLabelDisplay="auto"
				/>
			</div>

			<div className="border rounded p-2">
				<label htmlFor="countryFilter">Country </label>
				<Select
					id="countryFilter"
					value={filters.country}
					onChange={e => setFilters({ ...filters, country: e.target.value as string })}
					displayEmpty>
					<MenuItem value="">
						<em>All</em>
					</MenuItem>
					{[...new Set(data.map(rider => rider.country))].map(country => (
						<MenuItem key={country} value={country}>
							{getFlagEmoji(country)} {country}
						</MenuItem>
					))}
				</Select>
			</div>
			<div className="border rounded p-2">
				<label htmlFor="disciplineFilter">Discipline </label>
				<Select
					id="disciplineFilter"
					value={filters.discipline}
					onChange={e => setFilters({ ...filters, discipline: e.target.value as string })}
					displayEmpty>
					<MenuItem value="">
						<em>All</em>
					</MenuItem>
					{[...new Set(data.map(rider => rider.discipline))].map(discipline => (
						<MenuItem key={discipline} value={discipline}>
							{discipline}
						</MenuItem>
					))}
				</Select>
			</div>
			<div className="border rounded p-2">
				<label htmlFor="divisionFilter">Division </label>
				<Select
					id="divisionFilter"
					value={filters.division}
					onChange={e => setFilters({ ...filters, division: e.target.value as string })}
					displayEmpty>
					<MenuItem value="">
						<em>All</em>
					</MenuItem>
					{[...new Set(data.map(rider => rider.division))].map(division => (
						<MenuItem key={division} value={division}>
							{division}
						</MenuItem>
					))}
				</Select>
			</div>
			<div className="border rounded p-2">
				<label htmlFor="ageFilter">Age </label>
				<Select
					id="ageFilter"
					value={filters.age}
					onChange={e => setFilters({ ...filters, age: e.target.value as string })}
					displayEmpty>
					<MenuItem value="">
						<em>All</em>
					</MenuItem>
					{[...new Set(data.map(rider => rider.age))].map(age => (
						<MenuItem key={age} value={age}>
							{age}
						</MenuItem>
					))}
				</Select>
			</div>
		</div>
	)
}

export default RidersFilters
