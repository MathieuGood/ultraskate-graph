import {FormControl, FormHelperText, MenuItem, Select} from "@mui/material";
import {getFlagEmoji} from "../../utils/flagUtils.tsx";
import React from "react";
import {CategoryFilterSelectProps} from "../../interfaces/CategoryFilterSelectProps.tsx";


const CountrySelect: React.FC<CategoryFilterSelectProps> = ({data, filters, setFilters}) => {

    return (

        <FormControl>
            <Select
                id="countryFilter"
                value={filters.country}
                onChange={e =>
                    setFilters({...filters, country: e.target.value as string, names: []})
                }
                displayEmpty>
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                {[...new Set(data.map(rider => rider.country))].map(country => (
                    <MenuItem key={country} value={country}>
                        {getFlagEmoji(country)} {country}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Country</FormHelperText>
        </FormControl>


    )

};

export default CountrySelect;