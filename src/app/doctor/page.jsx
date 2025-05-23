"use client";

import React, { useState, useRef, useEffect } from "react";

import { FaComments } from "react-icons/fa";
import { FaMapMarkerAlt, FaSearch, FaStar } from 'react-icons/fa';
import { Pencil, FileText, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";

import CitySearch from "@/component/CitySearch/CitySearch";
import ChatModal from "@/component/ChatModal/ChatModal";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";


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
    const [activeItemx, setActiveItem] = useState('Faisalabad');
    const [chatOpen, setChatOpen] = useState(false);
    const [roomName, setRoomName] = useState(null);
    const [doctorData, setDoctorData] = useState([]);

    const [appointmentForm, setappointmentForm] = useState({
        full_name: "",
        email: "",
        date: "",
        slot: "",  // fixed key name to match backend expectations

    })


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

    const handleCityClick = async (city) => {
        setActiveItem(city);
        const authToken = Cookies.get("auth_token");

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/by-city?city=${city}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (res.status === 200) {
                setDoctorData(res.data); // ✅ correct usage
            } else {
                console.error("Failed to fetch filtered doctors:", res.status);
            }
        } catch (error) {
            console.log("I'm here for error: ", error);
        }
    };

    useEffect(() => {
        const fetchDoctors = async () => {

            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/all-doctors`);

                if (res.status === 200) {
                    setDoctorData(res.data);
                } else {
                    console.error("Failed to fetch doctors:", res.status);
                }

            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    const handleBookAppointment = async (e) => {
        e.preventDefault();

        const auth_token = Cookies.get("auth_token");

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/appointments/create/`,
                {
                    full_name: appointmentForm.full_name,
                    email: appointmentForm.email,
                    date: appointmentForm.date,
                    slot: appointmentForm.slot,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth_token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 401) {
                toast.error("Unauthorized. Please log in again.");
                return;
            }

            closeModal(); // Close modal after success
            toast.success("Appointment request sent successfully!");
        } catch (error) {

            if (error?.response?.status === 401) {
                toast.error(
                    <div>
                        Unauthorized. Please <a href="/" style={{ textDecoration: 'underline' }}>log in</a> again.
                    </div>
                );
                return;
            }


            if (error?.response?.status === 400) {
                toast.error("Something went wrong. Please try again later.");
                return;
            }
            if (error?.response?.status === 403) {
                toast.error("You are not allowed to book an appointment.");
                return;
            }
            if (error?.response?.status === 500) {
                toast.error("Internal server error. Please try again later.");
                return;
            }
        }

    };


    return (
        <div className="min-h-screen py-10 px-4 mt-[100px]">
            <ToastContainer />

            <div className="bg-gradient-to-r from-blue-500 to-blue-700 min-h-[300px] flex flex-col items-center justify-center px-4 py-10 space-y-8 rounded-xl shadow-lg">

                <CitySearch onCitySelect={handleCityClick} />

                {/* Popular Cities */}
                <div className="text-white text-center">
                    <h2 className="text-2xl font-semibold mb-6 tracking-wide">Popular Cities</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Lahore', 'Faisalabad', 'Multan', 'Karachi', 'Bahawalpur'].map((city, index) => (
                            <button
                                key={index}
                                onClick={() => handleCityClick(city)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-700 transform cursor-pointer
            ${activeItemx === city
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-xl scale-110'
                                        : 'bg-white text-black hover:scale-110 hover:-translate-y-1 hover:shadow-xl hover:bg-gradient-to-r from-blue-500 to-blue-700 hover:text-white'
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>

                </div>

            </div>



            <div className="py-10 px-4 md:px-16 mb-8 max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-bold text-start text-white mb-10">
                    Meet Our Specialists from - {activeItemx}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-25">
                    {doctorData.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="bg-white/10 backdrop-blur-sm w-full max-w-[300px] mx-auto rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
                        >
                            <div className="flex justify-center items-center w-full h-52 overflow-hidden bg-white">
                                <img
                                    src={`${doctor.profile_url ? `${process.env.NEXT_PUBLIC_SERVER_URL}${doctor.profile_url}` : `/images/images.jpg`}`}
                                    // src={`${process.env.NEXT_PUBLIC_SERVER_URL}${doctor.profile_url}`}
                                    alt={doctor.first_name}
                                    className="h-full object-cover"
                                />
                            </div>

                            <div className="p-4 flex flex-col justify-between flex-1">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-lg font-semibold text-white">{doctor.first_name} {doctor.last_name}</h2>
                                        {doctor.online && (
                                            <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                                                Online
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-blue-400 font-medium">{doctor.specialization}</p>
                                </div>

                                <div className="flex justify-between gap-2 mt-4">
                                    <button
                                        className="flex-1 bg-blue-600 text-white py-1.5 text-sm rounded-lg hover:bg-blue-700 transition cursor-pointer"
                                        onClick={() => openModal(doctor)}
                                    >
                                        Request Appointment
                                    </button>
                                    {/*<button
                                        className="flex items-center justify-center w-10 h-10 border border-blue-600 text-white rounded-full hover:bg-blue-500 transition cursor-pointer"
                                        onClick={() => { setChatOpen(true); setRoomName(doctor.id) }}
                                    >
                                        <FaComments />
                                    </button>*/}
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

            {isModalOpen && selectedDoctor && (
                <div className="fixed inset-0 bg-black/85 bg-opacity-40 flex items-center justify-center z-50 px-4">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative animate-fade-in">
                        <button
                            onClick={closeModal}
                            className="absolute cursor-pointer top-2 right-3 text-gray-500 text-2xl hover:text-black"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-1 text-center text-blue-700">Book Appointment</h2>
                        <p className="text-center text-sm text-black mb-6">
                            with <strong>{selectedDoctor.first_name} {selectedDoctor.last_name}</strong> ({selectedDoctor.specialization || 'No specialization'})
                        </p>
                        <form className="space-y-4" onSubmit={handleBookAppointment}>
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm text-black mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={appointmentForm.full_name}
                                    placeholder="Enter your full name"
                                    onChange={(e) =>
                                        setappointmentForm({ ...appointmentForm, full_name: e.target.value })
                                    }
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 text-black"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm text-black mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={appointmentForm.email}
                                    onChange={(e) =>
                                        setappointmentForm({ ...appointmentForm, email: e.target.value })
                                    }
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 text-black"
                                    required
                                />
                            </div>

                            {/* Appointment Date */}
                            <div>
                                <label className="block text-sm text-black mb-1">Appointment Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    min={new Date().toISOString().split("T")[0]}
                                    value={appointmentForm.date}
                                    onChange={(e) => {
                                        const date = e.target.value;
                                        const day = new Date(date)
                                            .toLocaleDateString('en-US', { weekday: 'long' })
                                            .toLowerCase(); // ✅ Normalize to lowercase
                                        setappointmentForm({ ...appointmentForm, date, day });
                                    }}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                                    required
                                />
                            </div>

                            {/* Slots */}
                            {appointmentForm.date && (
                                <div>
                                    <label className="block text-sm text-black mb-1">Select Slot</label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedDoctor.slotes
                                            .filter((slot) => slot.days === appointmentForm.day)
                                            .map((slot) => {
                                                const formatTime = (timeStr) => {
                                                    const [hour, minute] = timeStr.split(':');
                                                    const h = parseInt(hour, 10);
                                                    const ampm = h >= 12 ? 'PM' : 'AM';
                                                    const hour12 = h % 12 === 0 ? 12 : h % 12;
                                                    return `${hour12}:${minute} ${ampm}`;
                                                };

                                                return (
                                                    <button
                                                        key={slot.id}
                                                        type="button"
                                                        disabled={slot.is_booked}
                                                        onClick={() =>
                                                            !slot.is_booked &&
                                                            setappointmentForm({
                                                                ...appointmentForm,
                                                                slot: slot.id,
                                                            })
                                                        }
                                                        className={`px-4 py-2 text-sm rounded-md font-medium transition ${slot.is_booked
                                                            ? 'bg-red-500 text-white cursor-not-allowed'
                                                            : appointmentForm.slot === slot.id
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-green-200 text-green-800 hover:bg-green-300'
                                                            }`}
                                                    >
                                                        {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                                    </button>
                                                );
                                            })}

                                        {/* Message if no slots for selected day */}
                                        {selectedDoctor.slotes.filter((slot) => slot.days === appointmentForm.day).length === 0 && (
                                            <p className="text-gray-500 italic text-sm">
                                                No slots available for selected day.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!appointmentForm.slot}
                                className={`w-full py-2 rounded-md font-semibold transition ${appointmentForm.slot
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                Send Request
                            </button>
                        </form>


                    </div>
                </div>
            )}

            <ChatModal isChatOpen={chatOpen} onClose={() => setChatOpen(false)} roomName={roomName} />
        </div>
    );
}
