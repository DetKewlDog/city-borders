import { useState, useEffect } from 'react';
import "../index.css";
import APIAccess from '../services/APIAccess.js';
import { MapContainer, TileLayer, LayersControl, LayerGroup, Polygon, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapLayer({ name, url, subdomains, checked=false }) {
    return (
        <LayersControl.BaseLayer name={name} checked={checked}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={url} subdomains={subdomains || ['a', 'b', 'c']} />
        </LayersControl.BaseLayer>
    );
}

function MapDisplay({ city, isOnline }) {
    var [geometries, setGeometries] = useState([]);
    const [map, setMap] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!isOnline) return;
            map.flyTo([32.1352172, 34.8125006], 7);
            const geometry = await APIAccess.fetchCityGeometry(city);
            console.log(geometry)
            setGeometries(geometry);
        }
        document.querySelectorAll('.output').forEach(x => x.addEventListener('wheel', preventScroll, { passive: false }));

        function preventScroll(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        fetchData();
    }, [city, isOnline]);

    return (
        <div className="output">
            <MapContainer center={[32.1352172,34.8125006]} zoom={7} ref={setMap} style={{ height: "100%", width: "100%" }}>

                <LayersControl position="topright">
                    <MapLayer name="Default" checked
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' />

                    <MapLayer name="Leaflet"
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

                    <MapLayer name="Terrain"
                        subdomains={['mt0', 'mt1','mt2','mt3']}
                        url='https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' />

                    <MapLayer name="Satellite"
                        subdomains={['mt0', 'mt1','mt2','mt3']}
                        url='https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' />

                    <LayersControl.Overlay name='Dark Mode'>
                        <LayerGroup></LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>

                {geometries.map((geom, index) => (
                    <Polygon positions={geom} key={index} pathOptions={ { color: 'red' } } />
                ))}
            </MapContainer>
        </div>
    );
}

export default MapDisplay;