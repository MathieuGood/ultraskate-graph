import React from "react"
import { UltraEvent } from "../interfaces/UltraEvent"

interface UltraSelectProps {
	selectedUltraIndex: number
	setSelectedUltraIndex: (index: number) => void
	events: UltraEvent[]
}

const UltraSelect: React.FC<UltraSelectProps> = ({ selectedUltraIndex, setSelectedUltraIndex, events }) => {
	return (
		<select
			id="ultraSelect"
			value={selectedUltraIndex}
			onChange={e => setSelectedUltraIndex(parseInt(e.target.value))}>
			{events.map((event, index) => (
				<option key={event.event_id} value={index}>
					{event.event_name}
				</option>
			))}
		</select>
	)
}

export default UltraSelect 