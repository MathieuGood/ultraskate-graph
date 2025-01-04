import React from "react";
import {FormControl, FormHelperText, MenuItem, Select} from "@mui/material";
import {getDisciplineEmoji} from "../utils/disciplineUtils.tsx";
import {CategoryFilterSelectProps} from "../interfaces/CategoryFilterSelectProps.tsx";


const DisciplineSelect: React.FC<CategoryFilterSelectProps> = ({data, filters, setFilters}) => {
    return (
        <FormControl>
            <Select
                id="disciplineFilter"
                value={filters.discipline}
                onChange={e =>
                    setFilters({...filters, discipline: e.target.value as string, names: []})
                }
                displayEmpty>
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                {[...new Set(data.map(rider => rider.discipline))].map(discipline => (
                    <MenuItem key={discipline} value={discipline}>
                        {`${getDisciplineEmoji(discipline)} ${discipline}`}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Discipline</FormHelperText>
        </FormControl>)
}

export default DisciplineSelect;