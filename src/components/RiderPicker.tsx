import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { RiderInfo } from "../interfaces/RiderInfo"
import { getFlagEmoji } from "../utils/flagUtils"

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
						{`${getFlagEmoji(option.country)} ${option.name} #${option.rank}`}
					</li>
				)
			}}
			style={{ width: 500 }}
			renderInput={params => (
				<TextField
					{...params}
					label="Select Riders [NON FUNCTIONAL]"
					placeholder="Select Riders [NON FUNCTIONAL]"
				/>
			)}
		/>
	)
}

export default RiderPicker
