import { useWeatherContext } from "../../WeatherDataContext.jsx";
import MetricComponent from "../MetricComponent.jsx";

import '../pageStyles.css'

function Jetskiing() {
    const WeatherCtx = useWeatherContext()

    const weather = WeatherCtx.weather.weatherData

    const requiredKeys = [
        'temp',
        'windGusts',
        'waveHeight',
        'windSpeed',
        'windDirection',
        'visibility',
        'precipitation',
        'precipitationProbability',
    ]

    if (!requiredKeys.every(key => key in weather)) {
        return <div>Weather data not loaded</div>
    }


    return (
        <div class="Page-Container">
            <h1>Jetskiing Page</h1>
            <p>Welcome to the Jetskiing page!</p>
            {
                requiredKeys.map(key => {
                    return <MetricComponent key={key} metric={key}
                                            value={weather[key][0]}
                    />
                })
            }
        </div>
    );
}
export default Jetskiing;
