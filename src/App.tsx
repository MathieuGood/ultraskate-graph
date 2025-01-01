import "./App.css"
import { RiderStats } from "./interfaces/RiderStats"
import RidersChart from "./components/RidersChart"
import { riders } from "./data/miami_2024.json"

function App() {
	// const ridersData: RiderStats[] = riders.slice(0, 30)
	const ridersData: RiderStats[] = riders

	return (
		<>
			<h1>Ultraskate Riders Data</h1>
			<RidersChart data={ridersData} />
		</>
	)
}

export default App
