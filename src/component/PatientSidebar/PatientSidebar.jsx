'use client';
import React, { useState, useEffect } from 'react'
import PatientModal from '@/component/PatientModel/PatientModel';
import Link from "next/link";
import Image from "next/image";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const PatientSidebar = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);


    const fetchPatients = async () => {
     
        const authToken = Cookies.get("auth_token");
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/patients/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,  // JWT or session token
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch patients");
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error("Error fetching patients:", error);
            });
    }
    useEffect(() => {
        fetchPatients();
    }, []);

    const handlePatientDelete = (patientId) => {
        const authToken = Cookies.get("auth_token");
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/patients/${patientId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to delete patient");

                // If there's no content (204), don't try to parse JSON
                if (res.status === 204) return;
                return res.json();
            })
            .then(() => {
                setData(data.filter(patient => patient.id !== patientId));
                fetchPatients(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error("Error deleting patient:", error);
            });
    };


    const handlePatientClick = (patientId) => {
        // Redirect to the analyze page with the selected patient ID
        router.push(`/dashboard/analyze?patient=${patientId}`);
    }

    return (
        <div
            className="bg-[#1E1E2F] h-screen text-white p-3 pt-6 w-full md:w-[18rem]"
        >
            <div className="flex items-center justify-center gap-3 mb-5">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/icons/logo.png"
                        alt="Logo"
                        width={160}
                        height={80}
                        className="w-16 h-10"
                    />
                </Link>
                <p className="text-white text-lg font-semibold">BACKUPDOC</p>
            </div>

            {/* Search Input */}
            <div className="flex items-center bg-gray-800 border mt-4 border-white/20 rounded-md px-3 py-2 w-full mb-4">
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
                <input
                    type="text"
                    placeholder="Search Patient..."
                    className="bg-transparent text-white placeholder-white/60 focus:outline-none w-full"
                />
            </div>


            {/* Button to open modal */}
            <div className="mb-4 w-full mb-5">
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="text-white cursor-pointer w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Add Patient
                </button>
            </div>
            {/* Patient List */}
            <h6 className="text-sm font-semibold mb-3 text-white/80">Patients</h6>

            <div
                className="space-y-3 max-h-[330px] overflow-y-auto pr-1"
                style={{
                    scrollbarWidth: "none",         // Firefox
                    msOverflowStyle: "none"         // Internet Explorer 10+
                }}
            >
                <style jsx>{`
    div::-webkit-scrollbar {
      display: none;                // Chrome, Safari, Opera
    }
  `}</style>

                {data.map((patient, index) => (
                    <div
                        key={index}
                        className="flex cursor-pointer items-center justify-between bg-gray-800 border border-white/10 rounded-md px-3 py-2"
                        onClick={() => handlePatientClick(patient._id)}
                    >
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-medium">{patient.first_name}{patient.last_name}</span>
                            <span className="text-white/70 text-xs">
                                Age: {patient.age} | Gender: {patient.gender}
                            </span>
                        </div>
                        <button className="text-red-400 hover:text-red-600 transition cursor-pointer"
                        onClick={() => handlePatientDelete(patient._id)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>


            <PatientModal showModal={showModal} setShowModal={setShowModal} fetchPatients={fetchPatients} />
        </div>
    )
}

export default PatientSidebar
