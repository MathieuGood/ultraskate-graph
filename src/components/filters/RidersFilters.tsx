import { getFlagEmoji } from "../../utils/flagUtils"
import { Filters } from "../../interfaces/Filters"
import { RiderStats } from "../../interfaces/RiderStats"
import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material"
import RiderPicker from "./RiderPicker"
import { useEffect, useState } from "react"
import { getRidersList } from "../../utils/filtersUtils"
import { RiderInfo } from "../../interfaces/RiderInfo"
import { getDisciplineEmoji } from "../../utils/disciplineUtils"

const RidersFilters: React.FC<{
	data: RiderStats[]
	filters: Filters
	setFilters: (filters: Filters) => void
}> = ({ data, filters, setFilters }) => {
	const [ridersList, setRidersList] = useState<RiderInfo[]>([])

	useEffect(() => {
		const ridersInfo = getRidersList(data, filters)
		console.log("ridersInfo", ridersInfo)
		setRidersList(ridersInfo)
	}, [data, filters])

	return (
		<div className="filters flex flex-wrap gap-2">
			<RiderPicker ridersList={ridersList} filters={filters} setFilters={setFilters} />

			<FormControl>
				<Select
					id="countryFilter"
					value={filters.country}
					onChange={e =>
						setFilters({ ...filters, country: e.target.value as string, names: [] })
					}
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
				<FormHelperText>Country</FormHelperText>
			</FormControl>

			<FormControl>
				<Select
					id="disciplineFilter"
					value={filters.discipline}
					onChange={e =>
						setFilters({ ...filters, discipline: e.target.value as string, names: [] })
					}
					displayEmpty>
					<MenuItem value="">
						<em>All</em>
					</MenuItem>
					{[...new Set(data.map(rider => rider.discipline))].map(discipline => (
						<MenuItem key={discipline} value={discipline}>
							{`${getDisciplineEmoji(discipline)} ${discipline}`}
						</MenuItem>
					))}
				</Select>
				<FormHelperText>Discipline</FormHelperText>
			</FormControl>

			<FormControl>
				<Select
					id="divisionFilter"
					value={filters.division}
					onChange={e =>
						setFilters({ ...filters, division: e.target.value as string, names: [] })
					}
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
				<FormHelperText>Division</FormHelperText>
			</FormControl>

			<FormControl>
				<Select
					id="ageFilter"
					value={filters.age}
					onChange={e =>
						setFilters({ ...filters, age: e.target.value as string, names: [] })
					}
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
				<FormHelperText>Age</FormHelperText>
			</FormControl>
		</div>
	)
}

export default RidersFilters
