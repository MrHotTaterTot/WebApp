import { makeStyles } from '@material-ui/core/styles';
import {WeatherCodeToIcon} from "../Icon/WeatherCodeToIcon.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: theme.spacing(1),
    },
}));

function WeatherInfo({ city, temperature, humidity, weatherCode, windSpeed, windDirection, waveHeight }) {
    const classes = useStyles();

    const activity = "A good day for activity"; // TODO: change

    return (
        <div className="weather-info">
            <WeatherCodeToIcon weatherCode={weatherCode} />

            <div>
                <p>City: {city}</p>
                <p>Temp: {temperature}</p>
                <p>Humidity: {humidity}</p>
                <div className="wind">
                    Wind Speed: {windSpeed}
                    <svg viewBox="0 0 24 24" width={24} height={24} style={{ transform: `rotate(${windDirection}deg)` }}>
                        <path fill="currentColor" d="M5.414 10H18a1 1 0 0 1 0 2H5.414l4.293 4.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L5.414 10z" />
                    </svg>
                </div>
                <p>Wave Height: {waveHeight}</p>
            </div>
        </div>
    );
}

export default WeatherInfo;
