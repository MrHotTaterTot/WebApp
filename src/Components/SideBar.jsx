// SideBar.jsx
import './CSS/SideBar.css';
import {forwardRef, useImperativeHandle} from "preact/compat";
import {useState} from "preact/hooks";

const SideBar = forwardRef(({ onCitySelect, addCityToHistory }, ref) => {
    const [searchHistory, setSearchHistory] = useState([]);

    useImperativeHandle(ref, () => ({
        addCityToHistory(cityName) {
            if (!searchHistory.includes(cityName)) {
                setSearchHistory([...searchHistory, cityName]);
            }
        },
    }));

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
});

export default SideBar;
