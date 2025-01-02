import "./App.css"
import RidersChart from "./components/RidersChart"
import ultraSkateData from "./data/ultraskateData.json"
import { useState } from "react"
import { UltraEvent } from "./interfaces/UltraEvent"
import UltraSelect from "./components/UltraSelect"
import LibSelect from "./components/filters/LibSelect"

function App() {
	const events: UltraEvent[] = ultraSkateData
	const [selectedUltraIndex, setSelectedUltraIndex] = useState<number>(events.length - 3)
	const [selectedLib, setSelectedLib] = useState<string>("google-charts")

	return (
		<div className="w-full p-4">
			<h1 className="text-2xl font-bold mb-1">Ultraskate Riders Graph</h1>
			<div className="flex">
				<div className="border rounded p-2 mb-1">
					<UltraSelect
						selectedUltraIndex={selectedUltraIndex}
						setSelectedUltraIndex={setSelectedUltraIndex}
						events={events}
					/>
				</div>
				<div className="border rounded p-2 mb-1">
					<LibSelect selectedLib={selectedLib} setSelectedLib={setSelectedLib} />
				</div>
			</div>
			<RidersChart data={events[selectedUltraIndex].riders} lib={selectedLib} />
		</div>
	)
}

export default App
