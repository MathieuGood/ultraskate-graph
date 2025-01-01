import "./App.css"
import RidersChart from "./components/RidersChart"
import ultraSkateData from "./data/ultraskateData.json"
import { useState } from "react"
import { UltraEvent } from "./interfaces/UltraEvent"

function App() {
	const events: UltraEvent[] = ultraSkateData
	const [selectedUltraIndex, setSelectedUltraIndex] = useState<number>(events.length - 1)

	return (
		<div className="w-full mx-4 p-4">
			<h1 className="text-2xl font-bold mb-1">Ultraskate Riders Graph</h1>
			<select
				id="ultraSelect"
				value={selectedUltraIndex}
				onChange={e => setSelectedUltraIndex(parseInt(e.target.value))}>
				{events.map((event, index) => (
					<option key={event.event_id} value={index}>
						{event.event_name}
					</option>
				))}
			</select>
			<RidersChart data={events[selectedUltraIndex].riders} />
		</div>
	)
}

export default App
