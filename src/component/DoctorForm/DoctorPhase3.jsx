// components/DoctorPhase3.jsx
"use client";
import { useState } from "react";

const DoctorPhase3 = ({ onBack, formData, updateFormData, onSubmit }) => {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, files, type, value } = e.target;
        if (type === "file") {
            updateFormData({ [id]: files[0] }); // Store the File object
        } else {
            updateFormData({ [id]: value });
        }
    };


    const validate = () => {
        const newErrors = {};
        console.log("Validating formData:", formData); // <-- Add this line

        if (!formData.degree) newErrors.degree = "Degree PDF is required";
        // if (!formData.university) newErrors.university = "University name is required";
        if (!formData.specialization) newErrors.specialization = "Specialization is required";
        if (!formData.med_reg_number) newErrors.registration = "Medical registration number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        console.log("I'm here")
        if (validate()) {

            console.log("I'm here 2")
            onSubmit(formData);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div className="flex flex-col md:col-span-2">
                <label htmlFor="degree" className="text-sm font-medium text-gray-700 mb-1">
                    Degree PDF
                </label>
                <input
                    id="degree"
                    type="file"
                    accept="application/pdf"
                    onChange={handleChange}
                    className="w-full py-2 rounded-md focus:outline-none focus:border-blue-600 text-black file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                {errors.degree && <span className="text-red-500 text-sm mt-1">{errors.degree}</span>}
            </div>


            <div className="flex flex-col">

                <label htmlFor="med_reg_number" className="text-sm font-medium text-gray-700 mb-1">
                    Doctor Registration Number
                </label>
                <input
                    id="med_reg_number"
                    type="text"
                    value={formData.med_reg_number}
                    onChange={handleChange}
                    placeholder="Medical Registration Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.registration && <span className="text-red-500 text-sm mt-1">{errors.registration}</span>}


            </div>

            <div className="flex flex-col md:col-span-2">
                <label htmlFor="specialization" className="text-sm font-medium text-gray-700 mb-1">
                    Specialization
                </label>
                <input
                    id="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Specialization"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                />
                {errors.specialization && <span className="text-red-500 text-sm mt-1">{errors.specialization}</span>}
            </div>

            <div className="flex justify-between md:col-span-2 mt-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition cursor-pointer"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default DoctorPhase3;
