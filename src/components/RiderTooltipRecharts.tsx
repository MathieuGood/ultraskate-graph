import { TooltipProps } from "recharts"
import { hoursToTime } from "../utils/dateUtils"

export const RiderTooltipRecharts = ({ payload }: TooltipProps<number, string>): JSX.Element | null => {
	if (!payload || payload.length === 0) return null
	const hour = payload[0].payload.hour
	const riders = payload.map(rider => ({
		name: rider.name,
		value: rider.value
	}))
	return (
		<div className="bg-white p-2 border rounded">
			<p className="font-bold">{hoursToTime(hour)}</p>
			<ul>
				{riders.map(rider => (
					<li key={rider.name}>
						{rider.name}:{" "}
						{typeof rider.value === "number" ? rider.value.toFixed(2) : rider.value}{" "}
						miles
					</li>
				))}
			</ul>
		</div>
	)
}
