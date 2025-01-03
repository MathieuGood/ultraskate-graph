import "./App.css"
import RidersChart from "./components/RidersChart"
import ultraSkateData from "./data/ultraskateData.json"
import { useState } from "react"
import { UltraEvent } from "./interfaces/UltraEvent"
import UltraSelect from "./components/filters/UltraSelect"
import LibSelect from "./components/filters/LibSelect"
import { Divider } from "@mui/material"

function App() {
	const events: UltraEvent[] = ultraSkateData
	const [selectedUltraIndex, setSelectedUltraIndex] = useState<number>(events.length - 1)
	const [selectedLib, setSelectedLib] = useState<string>("google-charts")

	return (
		<div className="w-full p-4">
			<div className="flex gap-2 items-center pb-2">
				<h1 className="text-2xl font-bold pb-4">Ultraskate Riders Graph</h1>
				<UltraSelect
					selectedUltraIndex={selectedUltraIndex}
					setSelectedUltraIndex={setSelectedUltraIndex}
					events={events}
				/>
				<LibSelect selectedLib={selectedLib} setSelectedLib={setSelectedLib} />
			</div>
			<Divider />
			<RidersChart data={events[selectedUltraIndex].riders} lib={selectedLib} />
		</div>
	)
}

export default App
