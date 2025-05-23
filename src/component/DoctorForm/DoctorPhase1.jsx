// components/DoctorPhase1.jsx
"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const DoctorPhase1 = ({ onContinue, formData, updateFormData }) => {
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        updateFormData({
            [id]: type === "checkbox" ? checked : value,
        });
    };

    const handleContinue = () => {
        const newErrors = {};

        if (!formData.first_name) newErrors.first_name = "First name is required";
        if (!formData.last_name) newErrors.last_name = "Last name is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.confirm_password) newErrors.confirm_password = "Confirm password is required";
        if (formData.password !== formData.confirm_password)
            newErrors.confirm_password = "Passwords do not match";
        if (!formData.terms) newErrors.terms = "You must agree to the terms";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onContinue(); // Proceed to Phase 2
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {/* First Name Field */}
            <div className="flex flex-col">
                <label htmlFor="first_name" className="text-sm font-medium text-gray-700 mb-1">
                    First Name
                </label>
                <input
                    id="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
            </div>

            {/* Last Name Field */}
            <div className="flex flex-col">
                <label htmlFor="last_name" className="text-sm font-medium text-gray-700 mb-1">
                    Last Name
                </label>
                <input
                    id="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
            </div>

            {/* Password Field */}
            <div className="flex flex-col md:col-span-2 relative">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
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

            {/* Confirm Password Field */}
            <div className="flex flex-col md:col-span-2 relative">
                <label htmlFor="confirm_password" className="text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                </label>
                <input
                    id="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black pr-10"
                />
                <div
                    className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </div>
                {errors.confirm_password && (
                    <span className="text-red-500 text-sm">{errors.confirm_password}</span>
                )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start md:col-span-2 space-x-2">
                <input
                    id="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        terms and conditions
                    </a>
                </label>
            </div>
            {errors.terms && <span className="text-red-500 text-sm md:col-span-2">{errors.terms}</span>}

            {/* Submit Button */}
            <div className="flex items-center justify-center md:col-span-2">
                <button
                    type="button"
                    onClick={handleContinue}
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                    Save and Continue
                </button>
            </div>
        </div>
    );
};

export default DoctorPhase1;
