import {useEffect, useState} from 'preact/hooks'
import axios from 'axios'
import {WeatherCodeToIcon} from "./WeatherCodeToIcon";

export function WeatherData() {
    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState(null)

    useEffect(() => {
        fetchWeatherandCity()

    }, []);

    const fetchWeatherandCity = async () => {
        try {
            const position = await getCurrentPosition();
            const { latitude, longitude } = position.coords;

            const weatherData = await getWeather(latitude, longitude);
            // I want to add additional data to the weatherData object

            const cityName = await getCityName(latitude, longitude);

            setWeather({ weatherData });
            setCity({ cityName });
        }
        catch (error) {
            console.log(error);
        }
    }
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
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=ece5ab85e7f54fd5a4ad04ac45f23d6d`;

        const response = await axios.get(url);
        const cityName = response.data.features[0].properties.city;
        return cityName;
    }



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
            <>
                <h1>{_city}</h1>
                <p>Temperature: {_temp}</p>
                <p>Humidity: {_humidity}</p>
                <p>Feels like: {_apparentTemp}</p>
                <p>Precipitation Probability: {_precipitationProbability}</p>
                <p>Precipitation: {_precipitation}</p>
                <WeatherCodeToIcon weatherCode={_weatherCode} />
                <p>Visibility: {_visibility}</p>
                <p>Wind Speed: {_windSpeed}</p>
                <p>Wind Direction: {_windDirection}</p>
                <p>Wind Gusts: {_windGusts}</p>
                <p>Wave Height: {_waveHeight}</p>
            </>


        )

    }


    return (
        <div>
            {renderWeather()}
        </div>
    )

}

export default WeatherData