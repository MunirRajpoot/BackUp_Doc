'use client';
import React, { useState } from 'react'
import PatientModal from '@/component/PatientModel/PatientModel';
import Link from "next/link";
import Image from "next/image";
const PatientSidebar = () => {
    const [showModal, setShowModal] = useState(false);
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

                {[
                    { name: "John Doe", age: 45, gender: "Male" },
                    { name: "Jane Smith", age: 38, gender: "Female" },
                    { name: "Ali Khan", age: 52, gender: "Male" },
                    { name: "Sara Malik", age: 29, gender: "Female" },
                    { name: "Umer Riaz", age: 41, gender: "Male" },
                    { name: "Umer Riaz", age: 41, gender: "Male" },
                    { name: "Umer Riaz", age: 41, gender: "Male" },
                    { name: "Umer Riaz", age: 41, gender: "Male" },
                    { name: "Umer Riaz", age: 41, gender: "Male" },
                ].map((patient, index) => (
                    <div
                        key={index}
                        className="flex cursor-pointer items-center justify-between bg-gray-800 border border-white/10 rounded-md px-3 py-2"
                    >
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-medium">{patient.name}</span>
                            <span className="text-white/70 text-xs">
                                Age: {patient.age} | Gender: {patient.gender}
                            </span>
                        </div>
                        <button className="text-red-400 hover:text-red-600 transition cursor-pointer">
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


            <PatientModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default PatientSidebar
