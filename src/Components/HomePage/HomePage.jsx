import {useContext, useEffect, useState} from 'preact/hooks';
import WeatherDataContext from "../../WeatherDataContext";
import {WeatherCodeToIcon} from "../Icon/WeatherCodeToIcon";
import './HomePage.css'
import CurrentWeatherInfo from "./CurrentWeatherInfo.jsx";
import FutureWeatherInfo from "./FutureWeatherInfo.jsx";
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export function HomePage() {
    const { weather, city } = useContext(WeatherDataContext);

    // Initialize state with today's date and page number
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);

    // Add event listeners for swipe gestures
    let startX, startY;
    function handleTouchStart(e) {
        startX = e.touches[0].pageX || e.touches[0].clientX;
        startY = e.touches[0].pageY || e.touches[0].clientY;
    }
    function handleTouchMove(e) {
        if (!startX || !startY) {
            return;
        }
        const diffX = (e.touches[0].pageX || e.touches[0].clientX) - startX;
        const diffY = (e.touches[0].pageY || e.touches[0].clientY) - startY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                setCurrentDate(prevDate => new Date(prevDate.getTime() + 24 * 60 * 60 * 1000));
                setCurrentPage(prevPage => prevPage + 1);
            } else {
                setCurrentDate(prevDate => new Date(prevDate.getTime() - 24 * 60 * 60 * 1000));
                setCurrentPage(prevPage => prevPage - 1);
            }
        }
        startX = null;
        startY = null;
    }
    useEffect(() => {
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    // Calculate the start and end dates for the page numbers
    const startDay = new Date(currentDate.getTime() - (currentPage - 1) * 24 * 60 * 60 * 1000);
    const endDay = new Date(startDay.getTime() + 6 * 24 * 60 * 60 * 1000);

    // Generate an array of date strings for the page numbers
    const dateStrings = [];
    let currentDateIterator = new Date(startDay.getTime());
    while (currentDateIterator <= endDay) {
        dateStrings.push(currentDateIterator.toDateString());
        currentDateIterator.setDate(currentDateIterator.getDate() + 1);
    }

    const renderWeather = () => {
        if (!weather || !city) return <p>Loading</p>;

        // Determine the number of pages based on weather data length
        const pages = Math.ceil(weather.weatherData.temp.length / 24);

        // Calculate the current index based on the current page
        let currIndex = (currentPage - 1) * 24;

        // Clamp the index to be within the array bounds
        if (currIndex >= weather.weatherData.temp.length) {
            currIndex = weather.weatherData.temp.length - 1;
        }

        const curr = currIndex;

        // Calculate the end of the day for the current date
        const endOfDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1,
            0,
            0,
            0
        );

        // Determine the maximum number of hours to display for future days
        const maxHours = currentPage === 1 ? Math.floor((endOfDay - currentDate) / (1000 * 60 * 60)) : 24;

        const curr0 = (currentPage - 1) * 24;
        const endIndex0 = curr + 23 > weather.weatherData.temp.length - 1 ? weather.weatherData.temp.length - 1 : curr + 23;

        return (
            <>
                <CurrentWeatherInfo
                    city={city.cityName}
                    temperature={weather.weatherData.temp[curr]}
                    humidity={weather.weatherData.humidity[curr]}
                    weatherCode={weather.weatherData.weatherCode[curr]}
                    windSpeed={weather.weatherData.windSpeed[curr]}
                    windDirection={weather.weatherData.windDirection[curr]}
                    waveHeight={weather.weatherData.waveHeight[curr]}
                ></CurrentWeatherInfo>

                <h1 style={{textAlign: "center", color: "white"}}>{currentDate.toDateString()}</h1>

                <FutureWeatherInfo
                    from={curr0}
                    to={currentPage === 1 ? endIndex0 : curr + 24}
                    data={weather.weatherData}
                ></FutureWeatherInfo>

                <div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                        <Grid item style={{ marginLeft: "16px", marginRight: "16px" }}>
                            <Pagination
                                count={pages}
                                page={currentPage}
                                onChange={(e, page) => {
                                    setCurrentDate(
                                        new Date(startDay.getTime() + (page - 1) * 24 * 60 * 60 * 1000)
                                    );
                                    setCurrentPage(page);
                                }}
                                color="primary"
                                renderItem={(item) => (
                                    <PaginationItem
                                        {...item}
                                        label={dateStrings[item.page - 1]}
                                        onClick={() => {
                                            setCurrentDate(
                                                new Date(startDay.getTime() + (item.page - 1) * 24 * 60 * 60 * 1000)
                                            );
                                            setCurrentPage(item.page);
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </div>
                </div>
            </>
        );
    };



    return (
        <div className="homepage-container">
            {renderWeather()}
        </div>
    );
}

export default HomePage;