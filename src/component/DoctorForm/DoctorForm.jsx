"use client";
import DoctorPhase1 from './DoctorPhase1';
import DoctorPhase2 from './DoctorPhase2';
import DoctorPhase3 from './DoctorPhase3';
import React, { useEffect, useState } from 'react';

const DoctorForm = ({ email = "" }) => {
    console.log("DoctorForm email:", email);
    const [currentPhase, setCurrentPhase] = useState(1);

    // Global form data
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: email,
        password: "",
        confirm_password: "",
        terms: false,
        role: "doctor",
        // Phase 2 fields
        country: "",
        state: "",
        city: "",
        street_address: "",
        zip_code: "",
        med_reg_number: "",
        // Phase 3 fields
        specialization: "",
        degree_pdf: null,
    });

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };



    const handleSubmit = async (data) => {
        try {
            const formDataToSend = new FormData();
            for (const key in data) {
                formDataToSend.append(key, data[key]);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/register`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Submission failed:", errorData);
                alert("Submission failed: " + errorData.message);
                return;
            }

            const result = await response.json();
            alert("Doctor registration successful!");
            console.log("Server response:", result);
            // Optionally redirect or clear form here
        } catch (error) {
            console.error("An error occurred during submission:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };


    const nextPhase = () => setCurrentPhase(prev => prev + 1);
    const prevPhase = () => setCurrentPhase(prev => prev - 1);

    return (
        <div className="max-w-3xl mx-auto">
            {currentPhase === 1 && (
                <DoctorPhase1
                    onContinue={nextPhase}
                    formData={formData}
                    updateFormData={updateFormData}
                />
            )}
            {currentPhase === 2 && (
                <DoctorPhase2
                    onContinue={nextPhase}
                    onBack={prevPhase}
                    formData={formData}
                    updateFormData={updateFormData}
                />
            )}
            {currentPhase === 3 && (
                <DoctorPhase3
                    onBack={prevPhase}
                    formData={formData}
                    updateFormData={updateFormData}
                    onSubmit={handleSubmit}
                />

            )}
        </div>
    );
};

export default DoctorForm;
