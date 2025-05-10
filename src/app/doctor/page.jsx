"use client";

import React, { useState, useRef } from "react";

import { FaComments } from "react-icons/fa";
import { FaMapMarkerAlt, FaSearch, FaStar } from 'react-icons/fa';
import { Pencil, FileText, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";
import OnlineDoctors from "@/component/OnlineDoctors/OnlineDoctors";

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
    // {
    //     id: 7,
    //     name: "Dr. John Smith",
    //     specialty: "Orthopedic Surgeon",
    //     image: "/images/doc-img.png",
    //     online: true,
    // },
    // {
    //     id: 8,
    //     name: "Dr. John Smith",
    //     specialty: "Orthopedic Surgeon",
    //     image: "/images/doc-img.png",
    //     online: true,
    // },
    // {
    //     id: 9,
    //     name: "Dr. John Smith",
    //     specialty: "Orthopedic Surgeon",
    //     image: "/images/doc-img.png",
    //     online: true,
    // },
];

const onlineDoctors = [
    { id: 1, name: 'Dr. Ali', image: '/images/munir.jpeg', isOnline: true },
    { id: 2, name: 'Dr. Sara', image: '/images/munir.jpeg', isOnline: true },
    { id: 3, name: 'Dr. Ahmed', image: '/images/munir.jpeg', isOnline: true },
    { id: 4, name: 'Dr. Fatima', image: '/images/munir.jpeg', isOnline: true },
    { id: 5, name: 'Dr. Bilal', image: '/images/munir.jpeg', isOnline: true },
    { id: 6, name: 'Dr. Hina', image: '/images/munir.jpeg', isOnline: true },
];

const steps = [
    {
        step: 'Step 1',
        title: 'Fill Personal Information',
        description: 'Fill out a short form with your personal information to help us contact you.',
        icon: <Pencil size={28} color="white" />,
    },
    {
        step: 'Step 2',
        title: 'Briefly Describe Your Problem',
        description: 'Assistance Needed, Doctor: Could you please clarify the issue?',
        icon: <FileText size={28} color="white" />,
    },
    {
        step: 'Step 3',
        title: 'Book Your Appointment',
        description: 'Confirm your appointment with our dentists through a short procedure.',
        icon: <Calendar size={28} color="white" />,
    },
];







export default function DoctorListPage() {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
 

    const scrollRef = useRef();

    const patientFeedback = [
        {
            name: 'John Doe',
            role: 'Patient',
            image: '/images/munir.jpeg',
            rating: 5,
            message: 'Excellent service!',
        },
        {
            name: 'Jane Smith',
            role: 'Patient',
            image: '/default-avatar.png',
            rating: 4,
            message: 'Friendly staff!',
        },
        {
            name: 'Alex Johnson',
            role: 'Patient',
            image: '/default-avatar.png',
            rating: 5,
            message: 'Highly recommend!',
        },
        {
            name: 'Maria Garcia',
            role: 'Patient',
            image: '/default-avatar.png',
            rating: 5,
            message: 'Very clean!',
        },
        {
            name: 'Maria Garcia',
            role: 'Patient',
            image: '/default-avatar.png',
            rating: 5,
            message: 'Very clean!',
        },
        {
            name: 'Maria Garcia',
            role: 'Patient',
            image: '/default-avatar.png',
            rating: 5,
            message: 'Very clean!',
        },
    ];

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = 300;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };


    const openModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedDoctor(null);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen py-10 px-4 mt-[100px]">

            <div className="bg-gradient-to-r from-blue-500 to-blue-700 min-h-[300px] flex flex-col items-center justify-center px-4 py-10 space-y-8 rounded-xl shadow-lg">

                {/* Compact Search Box */}
                <div className="w-full max-w-md relative">
                    {/* Location Button */}
                    <button
                        className="absolute inset-y-0 left-0 flex items-center text-white pl-3 pr-3  rounded-l-full transition duration-300 shadow"
                    >
                        <FaMapMarkerAlt />
                    </button>

                    <input
                        type="text"
                        placeholder="Enter your city name..."
                        className="w-full pl-12 pr-10 py-3 rounded-2xl bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                    />

                    {/* Search Button */}
                    <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-white hover:text-blue-300 transition duration-300">
                        <FaSearch />
                    </button>
                </div>

                {/* Popular Cities */}
                <div className="text-white text-center">
                    <h2 className="text-2xl font-semibold mb-6 tracking-wide">Popular Cities</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Lahore', 'Faisalabad', 'Multan', 'Karachi', 'Bahawalpur'].map((city, index) => (
                            <button
                                key={index}
                                className=" bg-white text-black cursor-pointer px-6 py-2 rounded-full font-semibold transition-all duration-700 transform 
                  hover:scale-110 hover:-translate-y-1 hover:shadow-xl hover:bg-gradient-to-r from-blue-500 to-blue-700 hover:text-white"
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>

            </div>


            <OnlineDoctors/>

            <div className="py-10 px-4 md:px-16 mb-8 max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-bold text-start text-white mb-10">
                    Meet Our Specialists from - City Name
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-25">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="bg-white/10 backdrop-blur-sm w-full max-w-[300px] mx-auto rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
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
                                        className="flex-1 bg-blue-600 text-white py-1.5 text-sm rounded-lg hover:bg-blue-700 transition cursor-pointer"
                                        onClick={() => openModal(doctor)}
                                    >
                                        Book
                                    </button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-blue-600 text-white rounded-full hover:bg-blue-500 transition cursor-pointer">
                                        
                                        <FaComments />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-white min-h-screen py-16 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-gray-400 mb-2 uppercase">Reach Our Now!</p>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-12">Our Easy 3-Step Process</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 text-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 text-center"
                            >
                                <div className="bg-blue-600 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
                                    {step.icon}
                                </div>
                                <p className="text-blue-600 font-semibold text-sm mb-2">{step.step}</p>
                                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-700">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Patients Feedback */}


            <div className="text-white py-10 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
                        Patients Feedback
                    </h2>

                    <div className="relative">
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto space-x-6 px-12 no-scrollbar scroll-smooth"
                        >
                            {patientFeedback.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="min-w-[260px] bg-white/10 p-6 rounded-2xl shadow-lg flex-shrink-0"
                                >
                                    <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-blue-100 shadow-md mx-auto">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <h3 className="text-center text-lg font-semibold text-white">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-center text-white mb-2">{item.role}</p>
                                    <div className="flex justify-center mb-2">
                                        {Array.from({ length: 5 }).map((_, starIdx) => (
                                            <FaStar
                                                key={starIdx}
                                                className={`h-4 w-4 ${starIdx < item.rating ? 'text-yellow-400' : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-white text-sm italic text-center">
                                        “{item.message}”
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedDoctor && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative animate-fade-in">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-black"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-1 text-center text-blue-700">Book Appointment</h2>
                        <p className="text-center text-sm text-black mb-6">
                            with <strong>{selectedDoctor.name}</strong> ({selectedDoctor.specialty})
                        </p>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm text-black mb-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-black mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-black mb-1">Appointment Date</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-black mb-1">Time Slot</label>
                                <select
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
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
