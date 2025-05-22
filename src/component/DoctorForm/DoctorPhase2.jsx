// components/DoctorPhase2.jsx
"use client";
import React, { useState } from "react";

const DoctorPhase2 = ({ onContinue, onBack }) => {
    const [formData, setFormData] = useState({
        country: "",
        state: "",
        city: "",
        street: "",
        zip: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleContinue = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = `${key} is required`;
            }
        });

        if (Object.keys(newErrors).length === 0) {
            onContinue();
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="flex flex-col">
                <label htmlFor="country" className="text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="state" className="text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                    id="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="street" className="text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                    id="street"
                    type="text"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Street Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.street && <span className="text-red-500 text-sm">{errors.street}</span>}
            </div>

            <div className="flex flex-col md:col-span-2">
                <label htmlFor="zip" className="text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                    id="zip"
                    type="text"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="ZIP Code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.zip && <span className="text-red-500 text-sm">{errors.zip}</span>}
            </div>

            <div className="flex justify-between md:col-span-2 mt-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 transition cursor-pointer"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleContinue}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer"
                >
                    Save and Continue
                </button>
            </div>
        </div>
    );
};

export default DoctorPhase2;
