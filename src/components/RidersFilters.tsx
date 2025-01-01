import { getFlagEmoji } from "../utils/flagUtils"
import { Filters } from "../interfaces/Filters"
import { RiderStats } from "../interfaces/RiderStats"

const RidersFilters: React.FC<{
	data: RiderStats[]
	filters: Filters
	setFilters: (filters: Filters) => void
}> = ({ data, filters, setFilters }) => {
	return (
		<div className="filters flex flex-wrap gap-2">
			<div className="border rounded p-2">
				<label htmlFor="numberOfRiders">Riders to display:</label>{" "}
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
	)
}

export default RidersFilters
