import { useWeatherContext } from "../../WeatherDataContext.jsx"
import MetricComponent from "../MetricComponent.jsx"


import '../pageStyles.css'

function Swimming() {
    const WeatherCtx = useWeatherContext()

    const weather = WeatherCtx.weather.weatherData

    const requiredKeys = [
        'temp',
        'waveHeight',
        'precipitation'
    ]

    return (
        <div
            className="Page-Container"
        >
            <h1>Swimming Page</h1>
            <p>Welcome to the Swimming page!</p>
            {
                requiredKeys.map(key => {
                        return <MetricComponent
                            key={key}
                            metric={key}
                            value={weather[key][0]}
                        />
                    }
                )

            }
        </div>
    );
}

export default Swimming;
