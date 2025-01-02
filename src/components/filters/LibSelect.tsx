import { MenuItem, Select } from "@mui/material"
import React from "react"

interface LibSelectProps {
	selectedLib: string
	setSelectedLib: (index: string) => void
}

const LibSelect: React.FC<LibSelectProps> = ({ selectedLib, setSelectedLib }) => {
	return (
		<>
			<label htmlFor="libSelect">Library:</label>
			<Select
				labelId="libSelect-label"
				id="libSelect"
				value={selectedLib}
				onChange={e => setSelectedLib(e.target.value)}>
				<MenuItem value={"google-charts"}>google-charts</MenuItem>
				<MenuItem value={"recharts"}>recharts</MenuItem>
			</Select>
		</>
	)
}

export default LibSelect
