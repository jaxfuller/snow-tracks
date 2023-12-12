import React, { useState, useEffect } from 'react';
import defaultDestinations from './DefaultDestinations';
import DestinationInput from './DestinationInput';
import DestinationList from './DestinationList';
import { fetchWeatherData } from './WeatherService';

const SnowWrapper = () => {
    const [userDestinations, setUserDestinations] = useState([]);
    const [weatherData, setWeatherData] = useState({});
    const combinedDestinations = [...new Set([...defaultDestinations, ...userDestinations])];

    useEffect(() => {
        const savedDestinations = JSON.parse(localStorage.getItem('userDestinations')) || [];
        setUserDestinations(savedDestinations);
    }, []);

    useEffect(() => {
        const fetchAllWeatherData = async () => {
            const weatherPromises = combinedDestinations.map(dest =>
                fetchWeatherData(dest).catch(error => console.error(`Error fetching weather for ${dest}:`, error))
            );
            const results = await Promise.all(weatherPromises);
            const newWeatherData = results.reduce((acc, data, index) => {
                if (data) acc[combinedDestinations[index]] = data;
                return acc;
            }, {});
            setWeatherData(newWeatherData);
        };

        fetchAllWeatherData();
    }, [combinedDestinations]);
    
    const addDestination = (newDestination) => {
        if (!userDestinations.includes(newDestination) && !defaultDestinations.includes(newDestination)) {
            const updatedDestinations = [...userDestinations, newDestination];
            setUserDestinations(updatedDestinations);
            localStorage.setItem('userDestinations', JSON.stringify(updatedDestinations));
        }
    };

    const removeDestination = (destinationToRemove) => {
        const updatedDestinations = userDestinations.filter(dest => dest !== destinationToRemove);
        setUserDestinations(updatedDestinations);
        localStorage.setItem('userDestinations', JSON.stringify(updatedDestinations));
    };

    return (
        <div>
            <DestinationInput onSubmit={addDestination} />
            <DestinationList destinations={combinedDestinations} weatherData={weatherData} onRemove={removeDestination} />
        </div>
    );
};

export default SnowWrapper;
