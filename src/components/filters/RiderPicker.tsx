import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { RiderInfo } from "../../interfaces/RiderInfo"
import { getFlagEmoji } from "../../utils/flagUtils"
import { Filters } from "../../interfaces/Filters"
import { applyCategoryFilters, applyNamesFilter } from "../../utils/filtersUtils"

const RiderPicker: React.FC<{
	ridersList: RiderInfo[]
	filters: Filters
	setFilters: (filters: Filters) => void
}> = ({ ridersList, filters, setFilters }) => {
	const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
	const checkedIcon = <CheckBoxIcon fontSize="small" />
	return (
		<Autocomplete
			multiple
			id="rider-picker"
			options={ridersList}
			value={
				// If filters contains names, return the riders that match the names
				filters.names.length > 0 || filters.names[0] !== ""
					? applyNamesFilter(ridersList, filters)
					: applyCategoryFilters(ridersList, filters)
			}
			// If filters does not contain names, return the category filtered riders

			onChange={(_e, value) => {
				console.log("Autocomplete onChange", value)
				console.log(
					"Autocomplete setFilters",
					value.map(rider => rider.name)
				)
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

export default RiderPicker
