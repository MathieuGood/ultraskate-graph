export const interpolateData = (hours: number[], miles: number[]) => {
	const interpolated: [number, number][] = []
	const maxPoints = 50 // Increase for finer granularity
	const minHour = Math.min(...hours)
	const maxHour = Math.max(...hours)
	const step = (maxHour - minHour) / maxPoints

	for (let t = minHour; t <= maxHour; t += step) {
		const i = hours.findIndex(hour => hour >= t)
		if (i === 0 || i === -1) {
			interpolated.push([t, miles[0]])
		} else {
			const t0 = hours[i - 1]
			const t1 = hours[i]
			const m0 = miles[i - 1]
			const m1 = miles[i]
			const interpolatedMiles = m0 + ((m1 - m0) * (t - t0)) / (t1 - t0)
			interpolated.push([t, interpolatedMiles])
		}
	}
	return interpolated
}
