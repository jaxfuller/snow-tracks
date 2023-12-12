const apiKey = '3fc96fec7169f2cd4904ac43ac2ddb40';
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

const fetchWeatherData = async (destination) => {
    const url = `${baseUrl}?q=${destination},US&appid=${apiKey}&units=imperial`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export { fetchWeatherData };
