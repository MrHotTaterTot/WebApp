import { makeStyles } from '@material-ui/core/styles';
import {WeatherCodeToIcon} from "../Icon/WeatherCodeToIcon.jsx";
import { List, ListItem, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: theme.spacing(1),
    },
}));

function FutureWeatherInfo({ from, to, data }) {
    const items = [];

    const now = new Date();

    for(let i = from; i <= to; i++) {
        const hour = new Date(now.getTime() + i * 60 * 60 * 1000);
        const hourString = hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        items.push(`${hourString} ${data.temp[i]}°C ${data.windSpeed[i]} kts`)
    }


    return (
        <div className="future-weather-info">
            <Paper style={{ maxHeight: 200, minWidth: 350, overflow: 'auto' }}>
                <List>
                    {items.map((item, index) => (
                        <ListItem key={index}>
                            <div style={{width: "25px"}}>
                                <WeatherCodeToIcon weatherCode={data.weatherCode[index]} width={"8px"} />
                            </div>
                            {item}
                            <svg viewBox="0 0 24 24" width={24} height={24} style={{ transform: `rotate(${data.windDirection[index]}deg)` }}>
                                <path fill="currentColor" d="M5.414 10H18a1 1 0 0 1 0 2H5.414l4.293 4.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L5.414 10z" />
                            </svg>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
}

export default FutureWeatherInfo;
