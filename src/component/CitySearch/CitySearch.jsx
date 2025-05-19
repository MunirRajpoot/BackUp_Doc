import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const CitySearch = ({ onCitySelect }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchCities = async () => {
            if (query.trim().length < 2) return setResults([]);

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/cities?search=${query}`
                );
                const data = await response.json();
                setResults(data);
                setShowDropdown(true);
            } catch (error) {
                console.error("Error fetching cities:", error);
                setResults([]);
                setShowDropdown(false);
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
            handleSelect(results[activeIndex]);
        }
    };

    const handleSelect = (city) => {
        const cityLabel = city.city_name;
        setQuery(cityLabel);
        setResults([]);
        setShowDropdown(false);
        onCitySelect?.(cityLabel);
    };

    const handleBlur = () => {
        setTimeout(() => setShowDropdown(false), 100); // Allow onMouseDown to run first
    };

    return (
        <div className="w-full max-w-md relative">
            <button
                type="button"
                className="absolute inset-y-0 left-0 flex items-center text-white pl-3 pr-3 rounded-l-full"
            >
                <FaMapMarkerAlt />
            </button>

            <input
                type="text"
                placeholder="Enter your city name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => results.length && setShowDropdown(true)}
                onBlur={handleBlur}
                ref={inputRef}
                className="w-full pl-12 pr-10 py-3 rounded-2xl bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
            />

            <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-white"
            >
                <FaSearch />
            </button>

            {showDropdown && results.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
                    {results.map((city, index) => (
                        <li
                            key={city.city_id}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                activeIndex === index ? "bg-gray-100" : ""
                            }`}
                            onMouseDown={() => handleSelect(city)} // ✅ Fix applied here
                        >
                            <span className="text-gray-900 font-semibold">{city.city_name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CitySearch;
