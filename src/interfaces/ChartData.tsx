export interface GoogleChartData extends Array<string | number | null> {
	hour?: number
}

export interface RechartsData {
	[key: string]: number | string
}
