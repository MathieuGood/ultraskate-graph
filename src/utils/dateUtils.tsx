export const hoursToTime = (hours: number): string => {
	const hour = Math.floor(hours)
	const minutes = Math.round((hours - hour) * 60)
	return `${hour.toString().padStart(2, "0")}h${minutes.toString().padStart(2, "0")}min`
}
