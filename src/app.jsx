import { useState, useEffect } from 'preact/hooks';
import axios from "axios";
import WeatherDataContext from "./WeatherDataContext";

import { Router, Route } from 'preact-router';
import Surfing from "./pages/Surfing/Surfing.jsx";
import Sailing from "./pages/Sailing/Sailing.jsx";
import Jetskiing from "./pages/Jetskiing/Jetskiing.jsx";
import Swimming from "./pages/Swimming/Swimming.jsx";
import HomePage from "./Components/HomePage/HomePage.jsx";
import SearchBar from "./Components/SearchBar/SearchBar.jsx";
import TopBar from "./Components/TopBar/TopBar.jsx";

function App() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // fetchWeatherandCity function should be moved from HomePage.jsx to App.jsx
        fetchWeatherandCity();
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

    const addCityToHistory = (cityName) => {
        sideBarRef.current.addCityToHistory(cityName);
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

    return (
        <WeatherDataContext.Provider value={{ weather, setWeather, city, setCity, setErrorMessage }}>
            <TopBar></TopBar>

            <div className="content-container">
                <Router>
                    <HomePage path="/" />
                    <Surfing path="/surfing" />
                    <Sailing path="/sailing" />
                    <Jetskiing path="/jetskiing" />
                    <Swimming path="/swimming" />
                </Router>
            </div>
        </WeatherDataContext.Provider>
    );
}

export default App;

