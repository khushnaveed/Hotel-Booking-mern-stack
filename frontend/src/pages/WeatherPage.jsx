
import 'leaflet/dist/leaflet.css';
import React from "react";
import { useWeather } from "../context/WeatherContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";



const WeatherPage = () => {
    const { weather } = useWeather();

    if (!weather) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500 text-center">Loading weather...</p>
            </div>
        );
    }

    const position = [weather.coord.lat, weather.coord.lon];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-[150px]">
            <div className="bg-white shadow-xl  p-6 w-full max-w-3xl">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
                    Weather in {weather.name}
                </h1>

                <div className="space-y-3 text-sm sm:text-base sm:text-left text-center mb-6">
                    <p>
                        <strong>Description:</strong> {weather.weather[0].description}
                    </p>
                    <p>
                        <strong>Temperature:</strong> {Math.round(weather.main.temp)}°C
                    </p>
                    <p>
                        <strong>Humidity:</strong> {weather.main.humidity}%
                    </p>
                    <p>
                        <strong>Wind Speed:</strong> {weather.wind.speed} m/s
                    </p>
                </div>


                <div className="h-64 sm:h-72 w-full overflow-hidden" style={{ paddingTop: '70px' }}>

                    <MapContainer
                        center={position}
                        zoom={12}
                        scrollWheelZoom={false}
                        className="h-full w-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>Weather location: {weather.name}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default WeatherPage;
