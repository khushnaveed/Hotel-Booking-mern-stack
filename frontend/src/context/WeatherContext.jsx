
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchWeather } from '../utils/fetchWeather';

const WeatherContext = createContext();

export const useWeather = () => {
    return useContext(WeatherContext);
};

export const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState(null);
    const [showWeather, setShowWeather] = useState(false);

    // Fetch weather data when the component mounts
    useEffect(() => {
        fetchWeather('Basel')
            .then((data) => setWeather(data))
            .catch((error) => console.error(error));
    }, []);

    const getWeather = () => {
        setShowWeather(!showWeather);
    };

    return (
        <WeatherContext.Provider value={{ weather, showWeather, getWeather }}>
            {children}
        </WeatherContext.Provider>
    );
};
