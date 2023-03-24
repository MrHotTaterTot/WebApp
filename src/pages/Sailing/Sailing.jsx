import { useWeatherContext } from "../../WeatherDataContext"


import '../pageStyles.css'
import MetricComponent from "../MetricComponent.jsx";

function Sailing() {
    const WeatherCtx = useWeatherContext()

    const weather = WeatherCtx.weather.weatherData

    console.log(weather)

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
        <div
            class="Page-Container"
        >
            <h1>Sailing Page</h1>
            <p>Welcome to the Sailing page!</p>
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

export default Sailing;
