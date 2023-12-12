import React, { useState } from 'react';

const DestinationInput = ({ onSubmit }) => {
    const [destination, setDestination] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(destination);
        setDestination('');
    };

    return (
        <div className="destination-input">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default DestinationInput;
