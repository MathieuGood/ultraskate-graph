import { RiderStats } from "./RiderStats"

export interface UltraEvent {
	event_id: string
	event_name: string
	duration: number
	riders: RiderStats[]
	utc_start_time: string
	utc_end_time: string
	started: boolean
	finished: boolean
	elapsed_time: number
}
