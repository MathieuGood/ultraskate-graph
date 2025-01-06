import {Filters} from "../../interfaces/Filters"
import {RiderStats} from "../../interfaces/RiderStats"
import RiderMultiSelect from "./RiderMultiSelect"
import React, {useEffect, useState} from "react"
import {getRidersList} from "../../utils/filtersUtils"
import {RiderInfo} from "../../interfaces/RiderInfo"
import CountrySelect from "./CountrySelect.tsx";
import DisciplineSelect from "./DisciplineSelect.tsx";
import DivisionSelect from "./DivisionSelect.tsx";
import AgeSelect from "./AgeSelect.tsx";

const RidersFilters: React.FC<{
    data: RiderStats[]
    filters: Filters
    setFilters: (filters: Filters) => void
}> = ({data, filters, setFilters}) => {
    const [ridersList, setRidersList] = useState<RiderInfo[]>([])

    useEffect(() => {
        const ridersInfo = getRidersList(data, filters)
        console.log("ridersInfo", ridersInfo)
        setRidersList(ridersInfo)
    }, [data, filters])

    return (
        <div className="filters flex flex-wrap gap-2">

            <RiderMultiSelect ridersList={ridersList} filters={filters} setFilters={setFilters}/>

            <CountrySelect data={data} filters={filters} setFilters={setFilters}/>

            <DisciplineSelect data={data} filters={filters} setFilters={setFilters}/>

            <DivisionSelect data={data} filters={filters} setFilters={setFilters}/>

            <AgeSelect data={data} filters={filters} setFilters={setFilters}/>

        </div>
    )
}

export default RidersFilters
