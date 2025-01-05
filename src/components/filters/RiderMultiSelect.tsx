import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import Checkbox from "@mui/material/Checkbox"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { RiderInfo } from "../../interfaces/RiderInfo"
import { getFlagEmoji } from "../../utils/flagUtils"
import { Filters } from "../../interfaces/Filters"
import { applyCategoryFilters, applyNamesFilter } from "../../utils/filtersUtils"
import React from "react"

const RiderMultiSelect: React.FC<{
	ridersList: RiderInfo[]
	filters: Filters
	setFilters: (filters: Filters) => void
}> = ({ ridersList: fullRidersList, filters, setFilters }) => {
	const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
	const checkedIcon = <CheckBoxIcon fontSize="small" />
	return (
		<Autocomplete
			multiple
			id="rider-picker"
			options={fullRidersList}
			value={
				filters.age !== "" ||
				filters.country !== "" ||
				filters.discipline !== "" ||
				filters.division !== ""
					? (applyCategoryFilters(fullRidersList, filters) as RiderInfo[])
					: (applyNamesFilter(fullRidersList, filters) as RiderInfo[])
			}
			onChange={(_e, value) => {
				setFilters({
					country: "",
					discipline: "",
					division: "",
					age: "",
					names: value.map(rider => rider.name)
				})
			}}
			disableCloseOnSelect
			getOptionLabel={option => option.name}
			renderOption={(props, rider, { selected }) => {
				const { key, ...optionProps } = props
				return (
					<li key={key} {...optionProps}>
						<Checkbox
							icon={icon}
							checkedIcon={checkedIcon}
							style={{ marginRight: 8 }}
							checked={selected}
						/>
						{`${getFlagEmoji(rider.country)} ${rider.name} #${rider.rank}`}
					</li>
				)
			}}
			style={{ minWidth: 300, maxWidth: 600 }}
			renderInput={params => <TextField {...params} label="Select Riders [NON FUNCTIONAL]" />}
		/>
	)
}

export default RiderMultiSelect
