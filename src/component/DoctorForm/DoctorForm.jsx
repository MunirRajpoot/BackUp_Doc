"use client";
import { toast } from 'react-toastify';
import DoctorPhase1 from './DoctorPhase1';
import DoctorPhase2 from './DoctorPhase2';
import DoctorPhase3 from './DoctorPhase3';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";


const DoctorForm = ({ email = "" }) => {
    const [currentPhase, setCurrentPhase] = useState(1);
    const router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: email,
        password: "",
        confirm_password: "",
        terms: false,
        role: "doctor",
        country: "",
        state: "",
        city: "",
        street_address: "",
        zip_code: "",
        med_reg_number: "",
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

            Cookies.set('auth_token', result.token, {
                secure: true,
                sameSite: 'Strict',
                expires: 7,
            });

            dispatch(setUser({
                user: result?.user,
                user_type: result?.user_type || null,
                user_id: result?.user_id || null,
            }));

            toast.success("Form submitted successfully!");

            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);

        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form.");
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
