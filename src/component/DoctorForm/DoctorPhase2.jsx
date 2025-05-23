// components/DoctorPhase2.jsx
"use client";
import React, { useState } from "react";

const DoctorPhase2 = ({ onBack, onContinue, formData, updateFormData }) => {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        updateFormData({ [id]: value });
    };
    const handleContinue = () => {
        const newErrors = {};
        const requiredFields = ["country", "state", "city", "zip_code", "street_address"];

        requiredFields.forEach((key) => {
            if (!formData[key] || formData[key].trim() === '') {
                newErrors[key] = `${key.replace(/_/g, ' ')} is required`;
            }
        });

        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            onContinue(); // ✅ only called if no errors
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
                <label htmlFor="zip_code" className="text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                    id="zip_code"
                    type="text"
                    value={formData.zip_code}
                    onChange={handleChange}
                    placeholder="ZIP Code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.zip_code && <span className="text-red-500 text-sm">{errors.zip_code}</span>}
            </div>

            <div className="flex flex-col md:col-span-2">
                <label htmlFor="street_address" className="text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                    id="street_address"
                    type="text"
                    value={formData.street_address}
                    onChange={handleChange}
                    placeholder="Street Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.street_address && <span className="text-red-500 text-sm">{errors.street_address}</span>}
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
