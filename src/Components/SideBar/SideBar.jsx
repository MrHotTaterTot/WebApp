// SideBar.jsx
import './SideBar.css';
import {forwardRef, useImperativeHandle} from "preact/compat";
import {useState} from "preact/hooks";
import {Link} from "preact-router";

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
            <h2>Water Sports</h2>
            <ul>
                <li>
                    <Link activeClassName="active" href="/surfing">Surfing</Link>
                </li>
                <li>
                    <Link activeClassName="active" href="/sailing">Sailing</Link>
                </li>
                <li>
                    <Link activeClassName="active" href="/Users/smich/WebstormProjects/WebApp/src/pages/Jetskiing/Jetskiing">Jetskiing</Link>
                </li>
            </ul>
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
