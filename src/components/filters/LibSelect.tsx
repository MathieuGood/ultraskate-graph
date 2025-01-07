import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material"
import React from "react"

interface LibSelectProps {
	selectedLib: string
	setSelectedLib: (index: string) => void
}

const LibSelect: React.FC<LibSelectProps> = ({ selectedLib, setSelectedLib }) => {
	return (
		<FormControl>
			<Select
				labelId="libSelect-label"
				id="libSelect"
				value={selectedLib}
				onChange={e => setSelectedLib(e.target.value)}>
				<MenuItem value={"google-charts"}>google-charts</MenuItem>
				<MenuItem value={"recharts"}>recharts</MenuItem>
				<MenuItem value={"plotly"}>plotly</MenuItem>
			</Select>
			<FormHelperText>Chart Library</FormHelperText>
		</FormControl>
	)
}

export default LibSelect
