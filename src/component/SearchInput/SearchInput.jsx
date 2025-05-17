"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// 🔍 Search Input Component
export default function SearchInput({ onResults }) {
    const [query, setQuery] = useState("");

    // 🔁 Debounced search
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchPatients(query);
        }, 500); // ⏱ Debounce input by 500ms

        return () => clearTimeout(delayDebounce);
    }, [query]);

    // 📡 Fetch patients from API
    const fetchPatients = async (searchTerm) => {
        const auth_token = Cookies.get('auth_token');
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/search`, {
                params: { q: searchTerm },
                headers: {
                    Authorization: `Bearer ${auth_token}`,
                },
            });
            onResults(response.data);
        } catch (error) {
            console.error("Failed to fetch patients:", error);
        }
    };

    return (
        <div className="flex items-center bg-gray-800 border mt-4 border-white/20 rounded-md px-3 py-2 w-full mb-4">
            {/* 🔍 Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white/70 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
            </svg>

            {/* 🧑 Search Input */}
            <input
                type="text"
                placeholder="Search Patient..."
                className="bg-transparent text-white placeholder-white/60 focus:outline-none w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
