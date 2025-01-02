import React from "react"
import { UltraEvent } from "../interfaces/UltraEvent"
import { MenuItem, Select } from "@mui/material"

interface UltraSelectProps {
	selectedUltraIndex: number
	setSelectedUltraIndex: (index: number) => void
	events: UltraEvent[]
}

const UltraSelect: React.FC<UltraSelectProps> = ({
	selectedUltraIndex,
	setSelectedUltraIndex,
	events
}) => {
	return (
		<>
			<label htmlFor="ultraSelect">Event:</label>
			<Select
				labelId="ultraSelect-label"
				id="ultraSelect"
				value={selectedUltraIndex}
				onChange={e => setSelectedUltraIndex(parseInt(e.target.value as string))}>
				{events.map((event, index) => (
					<MenuItem key={event.event_id} value={index}>
						{event.event_name}
					</MenuItem>
				))}
			</Select>
		</>
	)
}

export default UltraSelect
