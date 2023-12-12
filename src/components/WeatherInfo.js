import React from 'react';

const WeatherInfo = ({ destination, data }) => {

    if (!data || !data.list) {
        return <div>Loading forecast for {destination}...</div>;
    }

    const getSnowClass = (totalSnow) => {
        if (totalSnow > 12) return 'snow-high';
        if (totalSnow > 6) return 'snow-medium';
        return '';
    };

    const getWindClass = (avgWindSpeed) => {
        if (avgWindSpeed > 20) return 'wind-high';
        if (avgWindSpeed > 10) return 'wind-medium';
        return '';
    };

    const getTempClass = (avgTemp) => {
        if (avgTemp < 0) return 'temp-very-cold';
        if (avgTemp < 20) return 'temp-cold';
        return '';
    };

    const groupForecastsByDay = (forecasts) => {
        const days = {};
        forecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000).toDateString();
            if (!days[date]) {
                days[date] = [];
            }
            days[date].push(forecast);
        });
        return days;
    };
    
    const calculateDailySummaries = (dailyForecasts) => {
        return Object.keys(dailyForecasts).map(date => {
            const forecasts = dailyForecasts[date];
            const avgTemp = forecasts.reduce((sum, f) => sum + f.main.temp, 0) / forecasts.length;
            const avgWindSpeed = forecasts.reduce((sum, f) => sum + f.wind.speed, 0) / forecasts.length;
            const weatherConditions = forecasts.map(f => f.weather[0].main);
            const dominantWeather = weatherConditions.sort((a, b) =>
                weatherConditions.filter(v => v === a).length
                - weatherConditions.filter(v => v === b).length
            ).pop();

            // Calculate total snow volume for the day
            const totalSnow = forecasts.reduce((sum, f) => sum + (f.snow?.['3h'] || 0), 0);

            return { date, avgTemp, avgWindSpeed, dominantWeather, totalSnow };
        });
    };

    const dailyForecasts = groupForecastsByDay(data.list);
    const dailySummaries = calculateDailySummaries(dailyForecasts);
    const nextThreeDays = dailySummaries.slice(0, 3); // Get summaries for the next three days[]

    return (
        <div className="weather-info">
            <h2>{destination}</h2>
            {nextThreeDays.map(day => (
                <div key={day.date}>
                    <h3>{day.date}</h3>
                    <p>{day.dominantWeather}</p>
                    <h4 className={getTempClass(day.avgTemp)}>{day.avgTemp.toFixed(2)}&deg;F</h4>
                    <p className={getWindClass(day.avgWindSpeed)}>{day.avgWindSpeed.toFixed(2)} mph wind</p>
                    <p className={getSnowClass(day.totalSnow)}>Total Snow: {day.totalSnow.toFixed(2)} inches</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherInfo;
