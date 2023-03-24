import { useState } from 'preact/hooks';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(search);
        setSearch(''); // Clear the input field after search
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <input
                    className="search-input"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a city..."
                />
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
