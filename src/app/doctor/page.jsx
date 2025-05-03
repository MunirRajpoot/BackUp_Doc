"use client";

import React, { useState } from "react";
import { FaComments } from "react-icons/fa";

const doctors = [
    {
        id: 1,
        name: "Dr. Munir Rasool",
        specialty: "Cardiologist",
        image: "/images/munir.jpeg",
        online: true,
    },
    {
        id: 2,
        name: "Dr. Ahmed Khan",
        specialty: "Dermatologist",
        image: "/images/naseer.png",
        online: false,
    },
    {
        id: 3,
        name: "Dr. Emily Zhao",
        specialty: "Pediatrician",
        image: "/images/image 6.png",
        online: true,
    },
    {
        id: 4,
        name: "Dr. Raj Mehta",
        specialty: "Neurologist",
        image: "/images/doc-img.png",
        online: true,
    },
    {
        id: 5,
        name: "Dr. Lisa Kim",
        specialty: "Gynecologist",
        image: "/images/doc-img.png",
        online: true,
    },
    {
        id: 6,
        name: "Dr. John Smith",
        specialty: "Orthopedic Surgeon",
        image: "/images/doc-img.png",
        online: true,
    },
    {
        id: 7,
        name: "Dr. John Smith",
        specialty: "Orthopedic Surgeon",
        image: "/images/doc-img.png",
        online: true,
    },
    {
        id: 8,
        name: "Dr. John Smith",
        specialty: "Orthopedic Surgeon",
        image: "/images/doc-img.png",
        online: true,
    },
    {
        id: 9,
        name: "Dr. John Smith",
        specialty: "Orthopedic Surgeon",
        image: "/images/doc-img.png",
        online: true,
    },
];

export default function DoctorListPage() {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedDoctor(null);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen py-10 px-4">
            <h1 className="text-3xl font-bold text-center text-white mb-10">Available Doctors</h1>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="bg-white/10 backdrop-blur-sm w-[300px] rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
                        >
                            <div className="flex justify-center items-center w-full h-52 overflow-hidden bg-white">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="h-full object-cover"
                                />
                            </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-lg font-semibold text-white">{doctor.name}</h2>
                                        {doctor.online && (
                                            <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                                                Online
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-blue-400 font-medium">{doctor.specialty}</p>
                                </div>

                                <div className="flex justify-between gap-2 mt-4">
                                    <button
                                        className="flex-1 bg-blue-600 text-white py-1.5 text-sm rounded-lg hover:bg-blue-700 transition"
                                        onClick={() => openModal(doctor)}
                                    >
                                        Book
                                    </button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-blue-600 text-white rounded-full hover:bg-blue-500 transition">
                                        <FaComments />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedDoctor && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
                    <div className="bg-white/10 w-full max-w-md rounded-xl shadow-2xl p-6 relative animate-fade-in">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-black"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-1 text-center text-blue-700">Book Appointment</h2>
                        <p className="text-center text-sm text-gray-500 mb-6">
                            with <strong>{selectedDoctor.name}</strong> ({selectedDoctor.specialty})
                        </p>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm text-white mb-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white mb-1">Appointment Date</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white mb-1">Time Slot</label>
                                <select
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                                    required
                                >
                                    <option className="text-black" value="">Select Time</option>
                                    <option className="text-black">10:00 AM</option>
                                    <option className="text-black">11:00 AM</option>
                                    <option className="text-black">2:00 PM</option>
                                    <option className="text-black">4:00 PM</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                            >
                                Confirm Appointment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
