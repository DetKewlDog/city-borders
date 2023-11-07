import { useState } from 'react';
import Config from './components/Config.jsx'
import MapDisplay from './components/MapDisplay.jsx'
import "./index.css";

function App() {
	var [city, setCity] = useState('תל אביב-יפו');
	var [online, setOnline] = useState(false);

	const start = () => {
        const city = document.querySelector('#inCity').value;
		if (city === '') return;
		setCity(city);
        setCommunication(true);
	}

	const setCommunication = (state) => {
        if (online !== state) setOnline(state);
	}

	function updateCity(city) {
		document.querySelector('#inCity').value = city;
	}

	return (
		<>
			<div className="header">
				<span className="title">City Border Viewer</span>
				<span className="author"><a href="https://detkewldog.netlify.app" target="_blank">By DetKewlDog</a></span>
			</div>
			<div className="body">
				<Config
					start={start}
					setCity={updateCity}
					city={city}
					isOnline={online}
				/>
				<MapDisplay
					city={city}
					isOnline={online}
				/>
			</div>
		</>
    );
}

export default App;
