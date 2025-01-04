import React from "react";
import {CategoryFilterSelectProps} from "../../interfaces/CategoryFilterSelectProps.tsx";
import {FormControl, FormHelperText, MenuItem, Select} from "@mui/material";

const AgeSelect: React.FC<CategoryFilterSelectProps> = ({data, filters, setFilters}) => {
    return (

        <FormControl>
            <Select
                id="ageFilter"
                value={filters.age}
                onChange={e =>
                    setFilters({...filters, age: e.target.value as string, names: []})
                }
                displayEmpty>
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                {[...new Set(data.map(rider => rider.age))].map(age => (
                    <MenuItem key={age} value={age}>
                        {age}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Age</FormHelperText>
        </FormControl>


    )
}


export default AgeSelect