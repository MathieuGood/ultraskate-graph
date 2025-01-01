import "./App.css"
import RidersChart from "./components/RidersChart"
import ultraSkateData from "./data/ultraskateData.json"
import { useState } from "react"
import { UltraEvent } from "./interfaces/UltraEvent"
import UltraSelect from "./components/UltraSelect"

function App() {
	const events: UltraEvent[] = ultraSkateData
	const [selectedUltraIndex, setSelectedUltraIndex] = useState<number>(events.length - 1)

	return (
		<div className="w-full mx-4 p-4">
			<h1 className="text-2xl font-bold mb-1">Ultraskate Riders Graph</h1>
			<div className="flex">
				<div className="border rounded p-2 mb-1">
					<label htmlFor="ultraSelect">Event:</label>
					<UltraSelect
						selectedUltraIndex={selectedUltraIndex}
						setSelectedUltraIndex={setSelectedUltraIndex}
						events={events}
					/>
				</div>
			</div>
			<RidersChart data={events[selectedUltraIndex].riders} />
		</div>
	)
}

export default App
