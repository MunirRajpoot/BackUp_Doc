// components/DoctorPhase1.jsx
"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const DoctorPhase1 = ({ onContinue }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        terms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === "checkbox" ? checked : value
        });
    };

    const handleContinue = () => {
        const newErrors = {};

        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (!formData.terms) newErrors.terms = "You must agree to the terms";

        if (Object.keys(newErrors).length === 0) {
            onContinue();
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
            </div>

            <div className="flex flex-col md:col-span-2 relative">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black pr-10"
                />
                <div
                    className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            <div className="flex flex-col md:col-span-2 relative">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black pr-10"
                />
                <div
                    className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowConfirm(!showConfirm)}
                >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                </div>
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>

            <div className="flex items-start md:col-span-2 space-x-2">
                <input id="terms" type="checkbox" checked={formData.terms} onChange={handleChange} className="mt-1" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                </label>
            </div>
            {errors.terms && <span className="text-red-500 text-sm md:col-span-2">{errors.terms}</span>}

            <div className="flex items-center justify-center md:col-span-2">
                <button
                    type="button"
                    onClick={handleContinue}
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer"
                >
                    Save and Continue
                </button>
            </div>
        </div>
    );
};

export default DoctorPhase1;
