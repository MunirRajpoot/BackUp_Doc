import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const CitySearch = ({ onCitySelect }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchCities = async () => {
            if (query.length < 2) return setResults([]);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/cities?search=${query}`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Error fetching cities:", error);
                setResults([]);
            }
        };

        const timeoutId = setTimeout(fetchCities, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setActiveIndex((prev) => (prev + 1) % results.length);
        } else if (e.key === "ArrowUp") {
            setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
        } else if (e.key === "Enter" && activeIndex !== -1) {
            const selected = results[activeIndex];
            setQuery(`${selected.city_name}, ${selected.country}`);
            setResults([]);
            onCitySelect?.(selected);  // Notify parent
        }
    };

    const handleSelect = (city) => {
        setQuery(`${city.city_name}, ${city.country}`);
        setResults([]);
        onCitySelect?.(city);  // Notify parent
    };

    return (
        <div className="w-full max-w-md relative">
            <button className="absolute inset-y-0 left-0 flex items-center text-white pl-3 pr-3 rounded-l-full">
                <FaMapMarkerAlt />
            </button>

            <input
                type="text"
                placeholder="Enter your city name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-10 py-3 rounded-2xl bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
            />

            <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                <FaSearch />
            </button>

            {results.length > 0 && (
                <ul
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
                >
                    {results.map((city, index) => (
                        <li
                            key={city.city_id}
                            className={`flex flex-col px-4 py-2 cursor-pointer hover:bg-gray-100 ${activeIndex === index ? "bg-gray-100" : ""}`}
                            onMouseDown={() => handleSelect(city)}
                        >
                            <span className="font-semibold text-gray-900">{city.city_name}</span>
                            <span className="text-sm text-gray-500">{city.country}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CitySearch;
