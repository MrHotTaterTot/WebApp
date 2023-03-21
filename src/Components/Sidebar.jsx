import { useState } from 'preact/hooks';
import './CSS/SideBar.css';

export function SideBar({ onCitySelect }) {
    const [searchHistory, setSearchHistory] = useState([]);

    const addCityToHistory = (cityName) => {
        if (!searchHistory.includes(cityName)) {
            setSearchHistory([...searchHistory, cityName]);
        }
    };

    const selectCityFromHistory = (cityName) => {
        onCitySelect(cityName);
    };

    return (
        <div className="sidebar">
            <h2>Search History</h2>
            <ul>
                {searchHistory.map((cityName, index) => (
                    <li key={index} onClick={() => selectCityFromHistory(cityName)}>
                        {cityName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;
