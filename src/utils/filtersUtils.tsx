import { Filters } from "../interfaces/Filters"
import { RiderInfo } from "../interfaces/RiderInfo"
import { RiderStats } from "../interfaces/RiderStats"

export const applyCategoryFilters = (data: RiderStats[] | RiderInfo[], filters: Filters) => {
	const filteredRiders = data
		.filter(rider => countryFilter(rider, filters))
		.filter(rider => disciplineFilter(rider, filters))
		.filter(rider => divisionFilter(rider, filters))
		.filter(rider => ageFilter(rider, filters))
	console.log(" >>> filters", filters)
	console.log(" >>> filteredRiders", filteredRiders)
	return filteredRiders
}

export const applyNamesFilter = (data: RiderStats[] | RiderInfo[], filters: Filters) => {
	const filteredRiders = data.filter(rider => namesFilter(rider, filters))
	console.log(" >>> filters", filters)
	console.log(" >>> filteredRiders", filteredRiders)
	return filteredRiders
}

const countryFilter = (rider: RiderStats | RiderInfo, filters: Filters) => {
	return filters.country ? rider.country === filters.country : true
}

const disciplineFilter = (rider: RiderStats | RiderInfo, filters: Filters) => {
	return filters.discipline ? rider.discipline === filters.discipline : true
}

const divisionFilter = (rider: RiderStats | RiderInfo, filters: Filters) => {
	return filters.division ? rider.division === filters.division : true
}

const ageFilter = (rider: RiderStats | RiderInfo, filters: Filters) => {
	return filters.age ? rider.age === filters.age : true
}

const namesFilter = (rider: RiderStats | RiderInfo, filters: Filters) => {
	return filters.names ? filters.names.some(name => rider.name.includes(name)) : true
}

export const allRidersFilter = {
	country: "",
	discipline: "",
	division: "",
	age: "",
	names: [""]
}

export const top10RidersFilter = (data: RiderStats[]) => {
	return {
		country: "",
		discipline: "",
		division: "",
		age: "",
		names: data.slice(0, 10).map(rider => rider.name)
	}
}

export const getRidersList = (data: RiderStats[], filters: Filters): RiderInfo[] => {
	const filteredData = applyCategoryFilters(data, {
		...filters,
		names: []
	})

	return data.map((rider, index) => ({
		rank: index + 1,
		name: rider.name,
		country: rider.country,
		division: rider.division,
		discipline: rider.discipline,
		age: rider.age,
		selected: filteredData.some(r => r.name === rider.name)
	}))
}
