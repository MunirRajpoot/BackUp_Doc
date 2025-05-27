import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function PatientUpdateModel({ showModal, setShowModal, patientId, onPatientAdded, fetchPatients }) {
    const [animateModal, setAnimateModal] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        patient_email: "",
        age: "",
        gender: "Male",
        phone: "",
    });
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setAnimateModal(false);
        setTimeout(() => setShowModal(false), 300);
    };

    const fetchPatientData = async () => {
        try {
            const authToken = Cookies.get("auth_token");
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/patients/${patientId}/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const patient = res.data;

            setFormData({
                first_name: patient.first_name || "",
                last_name: patient.last_name || "",
                patient_email: patient.patient_email || "",
                age: patient.age || "",
                gender: patient.gender || "Male",
                // phone: patient.phone || "",
            });

        } catch (e) {
            console.error("Failed to fetch patient data", e);
        }
    };

    useEffect(() => {
        setAnimateModal(showModal);
        if (showModal && patientId) {
            fetchPatientData();
        }
    }, [showModal, patientId]);

    if (!showModal || !patientId) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const authToken = Cookies.get("auth_token");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/patients/${patientId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.detail || "Failed to update patient");
            }

            const updatedPatient = await response.json();
            if (onPatientAdded) onPatientAdded(updatedPatient);

            setFormData({
                first_name: "",
                last_name: "",
                patient_email: "",
                age: "",
                gender: "Male",
                // phone: "",
            });
            handleClose();
            fetchPatients();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className={`bg-[#0f172a] text-white rounded-lg shadow-lg p-6 w-full max-w-md transform transition-all duration-300 ease-out ${animateModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-blue-600">Update Existing Patient</h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm mb-1">First Name</label>
                            <input name="first_name" type="text" value={formData.first_name} onChange={handleChange} required className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Last Name</label>
                            <input name="last_name" type="text" value={formData.last_name} onChange={handleChange} required className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input name="patient_email" type="email" value={formData.patient_email} onChange={handleChange} required className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none" />
                    </div>

                    {/* <div>
                        <label className="block text-sm mb-1">Phone</label>
                        <input name="phone" type="text" value={formData.phone} onChange={handleChange} className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none" />
                    </div> */}

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Age</label>
                            <input name="age" type="number" value={formData.age} onChange={handleChange} required className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={handleClose} className="bg-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-600">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
                            {loading ? "Updating..." : "Update Patient"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
