import "./App.css"
import { RiderStats } from "./interfaces/RiderStats"
import RidersChart from "./components/RidersChart"
import { riders } from "./data/miami_2024.json"

function App() {
	const ridersData: RiderStats[] = riders

	return (
		<div className="w-full mx-4 p-4">
			<h1 className="text-2xl font-bold mb-1">Ultraskate Riders Graph</h1>
			<RidersChart data={ridersData} />
		</div>
	)
}

export default App
