import { createContext } from 'preact';
import {useContext, useState} from "preact/hooks";

const WeatherDataContext = createContext(null);

export function useWeatherContext(){

    const ctx = useContext(WeatherDataContext)
    if (!ctx){
        throw new Error("useWeatherData must be used within a WeatherDataProvider")
    }
    return ctx
}


export default WeatherDataContext;
