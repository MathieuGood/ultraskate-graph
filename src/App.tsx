import "./App.css"
import RidersChart from "./components/RidersChart"
import ultraSkateData from "./data/ultraskateData.json"
import { useState } from "react"
import { UltraEvent } from "./interfaces/UltraEvent"
import UltraSelect from "./components/UltraSelect"

function App() {
	const events: UltraEvent[] = ultraSkateData
	const [selectedUltraIndex, setSelectedUltraIndex] = useState<number>(events.length - 3)
	const [selectedLib, setSelectedLib] = useState<string>("google-charts")

	return (
		<div className="w-full p-4">
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
				<div className="border rounded p-2 mb-1">
					<label htmlFor="libSelect">Library:</label>
					<select
						id="libSelect"
						value={selectedLib}
						onChange={e => setSelectedLib(e.target.value)}>
						<option key="google-charts" value={"google-charts"}>
							google-charts
						</option>
						<option key="recharts" value={"recharts"}>
							recharts
						</option>
					</select>
				</div>
			</div>
			<RidersChart data={events[selectedUltraIndex].riders} lib={selectedLib} />
		</div>
	)
}

export default App
