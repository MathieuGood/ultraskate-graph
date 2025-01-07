import { RiderStats } from "../interfaces/RiderStats"

const getUniqueHours = (riders: RiderStats[]): number[] => {
	const allHours = riders.flatMap(rider => rider.hours)
	const uniqueSortedHours = Array.from(new Set(allHours)).sort((a, b) => a - b)
	return uniqueSortedHours
}

export const ridersDataToRechartsData = (riders: RiderStats[]) => {
	const uniqueHours = getUniqueHours(riders)

	return uniqueHours.map(uniqueHour => {
		return {
			hour: uniqueHour,
			...riders.reduce((acc: { [key: string]: number | null }, rider) => {
				const indexOfHour = rider.hours.indexOf(uniqueHour)
				if (indexOfHour !== -1) {
					acc[rider.name] = rider.miles[indexOfHour]
				} else {
					acc[rider.name] = null
				}
				return acc
			}, {})
		}
	})
}

export const ridersDataToGoogleChartsData = (riders: RiderStats[]) => {
	const uniqueHours = getUniqueHours(riders)

	const googleChartData = uniqueHours.map(uniqueHour => {
		const row: (number | string | null)[] = [uniqueHour]
		riders.forEach(rider => {
			const indexOfHour = rider.hours.indexOf(uniqueHour)
			if (indexOfHour !== -1) {
				row.push(rider.miles[indexOfHour])
			} else {
				row.push(null)
			}
		})
		return row
	})

	const ridersNames = riders.map(rider => rider.name)
	googleChartData.unshift(["Hour", ...ridersNames])

	return googleChartData
}

export const ridersDataToPlotlyData = (riders: RiderStats[]) => {
	const uniqueHours = getUniqueHours(riders)

	const plotlyData = riders.map(rider => {
		const yValues = uniqueHours.map(hour => {
			const indexOfHour = rider.hours.indexOf(hour)
			return indexOfHour !== -1 ? rider.miles[indexOfHour] : null
		})
		return {
			x: uniqueHours,
			y: yValues,
			name: rider.name,
			type: "scatter",
			mode: "lines+markers",
			connectgaps: true
		}
	})

	return plotlyData
}
