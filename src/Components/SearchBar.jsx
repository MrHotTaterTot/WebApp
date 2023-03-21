import { useState } from 'preact/hooks';

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(search);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a city..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
