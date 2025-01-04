import {RiderStats} from "./RiderStats.tsx";
import {Filters} from "./Filters.tsx";

export interface CategoryFilterSelectProps {
    data: RiderStats[];
    filters: Filters;
    setFilters: (filters: Filters) => void;
}