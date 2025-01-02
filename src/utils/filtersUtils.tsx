import { Filters } from "../interfaces/Filters"
import { RiderInfo } from "../interfaces/RiderInfo"
import { RiderStats } from "../interfaces/RiderStats"

export const applyAllFilters = (data: RiderStats[], filters: Filters) => {
	return data
		.filter(rider => applyCountryFilter(rider, filters))
		.filter(rider => applyDisciplineFilter(rider, filters))
		.filter(rider => applyDivisionFilter(rider, filters))
		.filter(rider => applyAgeFilter(rider, filters))
		.slice(0, filters.numberOfRiders)
}

const applyCountryFilter = (rider: RiderStats, filters: Filters) => {
	return filters.country ? rider.country === filters.country : true
}

const applyDisciplineFilter = (rider: RiderStats, filters: Filters) => {
	return filters.discipline ? rider.discipline === filters.discipline : true
}

const applyDivisionFilter = (rider: RiderStats, filters: Filters) => {
	return filters.division ? rider.division === filters.division : true
}

const applyAgeFilter = (rider: RiderStats, filters: Filters) => {
	return filters.age ? rider.age === filters.age : true
}

export const getRidersList = (data: RiderStats[]): RiderInfo[] => {
	return data.map((rider, index) => {
		return {
			rank: index + 1,
			name: rider.name,
			country: rider.country,
			division: rider.division,
			discipline: rider.discipline,
			age: rider.age
		}
	})
}
