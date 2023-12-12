import React from 'react';
import WeatherInfo from './WeatherInfo';

const DestinationList = ({ destinations, weatherData, onRemove }) => {
    return (
        <ul className="destination-list">
            {destinations.map((dest) => (
                <li key={dest} className="destination-item">
                    <WeatherInfo destination={dest} data={weatherData[dest]} />
                    <button className="remove-button" onClick={() => onRemove(dest)}>Remove</button>
                </li>
            ))}
        </ul>
    );
};

export default DestinationList;
