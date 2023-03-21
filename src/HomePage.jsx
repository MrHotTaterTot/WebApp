
import { useEffect, useState } from 'preact/hooks';
import { createRef } from 'preact/compat';
import axios from 'axios';
import { WeatherCodeToIcon } from "./WeatherCodeToIcon";
import SearchBar from "./Components/SearchBar.jsx";
import SideBar from './Components/SideBar.jsx';



export function HomePage() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const sideBarRef = createRef();

    useEffect(() => {
        fetchWeatherandCity() // Fetch weather and city on page load

    }, []);






    const fetchWeatherandCity = async () => {
        try {
            const position = await getCurrentPosition();
            const { latitude, longitude } = position.coords;

            const weatherData = await getWeather(latitude, longitude);
            const cityName = await getCityName(latitude, longitude);

            setWeather({ weatherData });
            setCity({ cityName });

            if (sideBarRef.current) {
                sideBarRef.current.addCityToHistory(cityName);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const getCityCoordinates = async (search) => {
        const apiKey = '7eda583d5e1f44839ca8a8e651e66eec';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            search
        )}&key=${apiKey}`;

        const response = await axios.get(url);

        // Check if there are any results, otherwise throw an error
        if (response.data.results.length === 0) {
            throw new Error('No results found for the provided city name.');
        }

        const { lat, lng } = response.data.results[0].geometry;
        return { latitude: lat, longitude: lng };
    };

    const addCityToHistory = (cityName) => {
        sideBarRef.current.addCityToHistory(cityName);
    };

    const searchCity = async (search) => {
        try {
            const { latitude, longitude } = await getCityCoordinates(search);
            const weatherData = await getWeather(latitude, longitude);
            const cityName = await getCityName(latitude, longitude);

            setWeather({ weatherData });
            setCity({ cityName });
            setErrorMessage(""); // Clear any previous error messages

            if (sideBarRef.current) {
                sideBarRef.current.addCityToHistory(cityName);
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.log(error);
        }
    };



    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            });
        });
    };

    const getWeather = async (latitude, longitude) => {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,visibility,windspeed_10m,winddirection_10m,windgusts_10m&windspeed_unit=mph&forecast_days=3`;
        const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height`;

        let weatherResponse, marineResponse, marineData;
        try {
            weatherResponse = await axios.get(weatherUrl);
        }
        catch (error) {
            console.log(error);
        }

        try {
            marineResponse = await axios.get(marineUrl);
        }
        catch (error) {

            if (error.response.data.reason === "No data is available for this location") {
                marineData = { hourly: { wave_height: [0] } };
            }
        }



        const weatherData = weatherResponse.data;
        if (!marineData) {
            marineData = marineResponse.data;
        }

        return {
            ...weatherData,
            marine: marineData,
        };
    };

    const getCityName = async (latitude, longitude) => {
        const apiKey = '7eda583d5e1f44839ca8a8e651e66eec';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        const response = await axios.get(url);

        // Check if there are any results, otherwise throw an error
        if (response.data.results.length === 0) {
            throw new Error('No results found for the provided coordinates.');
        }

        return response.data.results[0].components.city || response.data.results[0].components.town || response.data.results[0].components.village;
    };





    const renderWeather = () => {
        if (!weather || !city) return <p>Loading</p>

        const _data = weather.weatherData;
        const _city = city.cityName;
        const _temp = _data.hourly.temperature_2m[0];
        const _humidity = _data.hourly.relativehumidity_2m[0];
        const _apparentTemp = _data.hourly.apparent_temperature[0];
        const _precipitationProbability = _data.hourly.precipitation_probability[0];
        const _precipitation = _data.hourly.precipitation[0];
        const _weatherCode = _data.hourly.weathercode[0];
        const _visibility = _data.hourly.visibility[0];
        const _windSpeed = _data.hourly.windspeed_10m[0];
        const _windDirection = _data.hourly.winddirection_10m[0];
        const _windGusts = _data.hourly.windgusts_10m[0];
        const _waveHeight = _data.marine.hourly.wave_height[0];

        return (
            <div className="weather-container">
                <h1>{_city}</h1>
                <div className="weather-info">
                    <p>Temperature: {_temp}°C</p>
                    <p>Humidity: {_humidity}%</p>
                    <p>Feels like: {_apparentTemp}°C</p>
                    <p>Precipitation Probability: {_precipitationProbability}%</p>
                    <p>Precipitation: {_precipitation} mm</p>
                    <div className="icon-container">
                        <WeatherCodeToIcon weatherCode={_weatherCode} />
                    </div>
                    <p>Visibility: {_visibility} m</p>
                    <p>Wind Speed: {_windSpeed} mph</p>
                    <p>Wind Direction: {_windDirection}°</p>
                    <p>Wind Gusts: {_windGusts} mph</p>
                    <p>Wave Height: {_waveHeight} m</p>
                </div>
            </div>
        );

    }


    return (
        <div className="app-container">
            <SideBar ref={sideBarRef} onCitySelect={(cityName) => searchCity(cityName)} addCityToHistory={addCityToHistory} />
            <div className="content-container">
                <div className="weather-search-container">
                    <SearchBar onSearch={(search) => searchCity(search)} />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                {renderWeather()}
            </div>
        </div>
    );

}

export default HomePage