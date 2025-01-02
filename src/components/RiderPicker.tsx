import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { RiderInfo } from "../interfaces/RiderInfo"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const RiderPicker: React.FC<{ ridersList: RiderInfo[] }> = ({ ridersList }) => {
	return (
		<Autocomplete
			multiple
			id="rider-picker"
			options={ridersList}
			disableCloseOnSelect
			getOptionLabel={option => option.name}
			renderOption={(props, option, { selected }) => {
				const { key, ...optionProps } = props
				return (
					<li key={key} {...optionProps}>
						<Checkbox
							icon={icon}
							checkedIcon={checkedIcon}
							style={{ marginRight: 8 }}
							checked={selected}
						/>
						{option.name}
					</li>
				)
			}}
			style={{ width: 500 }}
			renderInput={params => (
				<TextField {...params} label="Checkboxes TEST" placeholder="Favorites" />
			)}
		/>
	)
}

export default RiderPicker
