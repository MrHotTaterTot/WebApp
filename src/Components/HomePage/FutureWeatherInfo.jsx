import { makeStyles } from '@material-ui/core/styles';
import {WeatherCodeToIcon} from "../Icon/WeatherCodeToIcon.jsx";
import {List, ListItem, Paper, Typography} from '@material-ui/core';
import './FutureWeatherInfo.css'
import {useWeatherContext} from "../../WeatherDataContext.jsx";
import {formatTemp} from "../../utils.js";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: theme.spacing(1),
    },
    futureWeatherInfo: {
        display: 'flex',
        justifyContent: 'center',
    },
    futureWeatherPaper: {
        backgroundColor: '#000',
        color: '#fff',
        overflow: 'auto',
        border: '2px solid #0077b6',
        borderRadius: 5,
        width: '65vw',
        height: '30vh',
    },
    futureWeatherItem: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontSize: '3vw',
    },
    futureWeatherListItem: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontSize: '5vw',
        borderBottom: '1px solid #0077b6',
    },
    weatherIconSmall: {
        width: '3vw',
        minWidth: 25,
        marginRight: '4vw',
        marginLeft: '5vw',
    },
    futureWeatherItemHour: {
        marginRight: '4vw',
        flexBasis: '10%',
    },
    futureWeatherItemTemp: {
        marginRight: '4vw',
        flexBasis: '15%',
    },
    futureWeatherItemWind: {
        marginRight: '4vw',
        flexBasis: '20%',
    },
    Text: {
        fontSize: '8vw',
        marginRight: '1vw',
    },
}));

function FutureWeatherInfo({ from, to, data }) {

    const WeatherCtx = useWeatherContext()

    const items = [];

    const now = new Date();

    const classes = useStyles();

    for (let i = from; i <= to; i++) {
        const hour = new Date(now.getTime() + i * 60 * 60 * 1000);
        const hourString = hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        items.push(
            <div className={classes.futureWeatherItem} key={i}>
                <div className={classes.futureWeatherItemHour}>
                    {hourString}
                </div>
                <div className={classes.futureWeatherItemTemp}>
                    {
                        formatTemp(
                            data.temp[i],
                            WeatherCtx.units.get
                        )
                    }
                </div>
            </div>
        );
    }

    return (
        <div className={classes.futureWeatherInfo}>
            <Paper className={classes.futureWeatherPaper}>
                <List>
                    {items.map((item, index) => (
                            <ListItem className={classes.futureWeatherListItem} key={index}>
                                <div className={classes.weatherIconSmall}>
                                    <WeatherCodeToIcon
                                        weatherCode={data.weatherCode[index]}
                                        width={'8px'}
                                    />
                                </div>
                                <Typography className={classes.futureWeatherListItemText}>
                                    {item}
                                </Typography>
                                <svg
                                    viewBox="0 0 24 24"
                                    width={24}
                                    height={24}
                                    style={{ transform: `rotate(${data.windDirection[index]}deg)` }}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M5.414 10H18a1 1 0 0 1 0 2H5.414l4.293 4.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L5.414 10z"
                                    />
                                </svg>
                            </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
}

export default FutureWeatherInfo;
