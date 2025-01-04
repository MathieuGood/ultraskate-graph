import React from "react";
import {CategoryFilterSelectProps} from "../../interfaces/CategoryFilterSelectProps.tsx";
import {FormControl, FormHelperText, MenuItem, Select} from "@mui/material";

const DivisionSelect: React.FC<CategoryFilterSelectProps> = ({data, filters, setFilters}) => {
    return (
        <FormControl>
            <Select
                id="divisionFilter"
                value={filters.division}
                onChange={e =>
                    setFilters({...filters, division: e.target.value as string, names: []})
                }
                displayEmpty>
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                {[...new Set(data.map(rider => rider.division))].map(division => (
                    <MenuItem key={division} value={division}>
                        {division}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Division</FormHelperText>
        </FormControl>

    )

}

export default DivisionSelect