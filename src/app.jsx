import { useState } from 'preact/hooks'
import './app.css'
import WeatherData from './WeatherData'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WeatherData />
    </>
  )
}
