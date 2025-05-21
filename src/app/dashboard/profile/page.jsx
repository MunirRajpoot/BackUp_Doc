"use client";
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import AddSlotModal from '@/component/AddSlotModal/AddSlotModal';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const userState = useSelector((state) => state.user) || {};
    const { user_type } = userState;
    const [profileImage, setProfileImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [timeSlots, setTimeSlots] = useState({});
    const [openDay, setOpenDay] = useState(null);
    const [dataslots, setDataSlots] = useState([]);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        city: '',
        state: '',
        street_address: '',
        zip_code: '',
    });


    const handleAddSlot = async (newSlot) => {
        const { day, startTime, endTime } = newSlot;
        const slotString = `${startTime} - ${endTime}`;

        // ✅ Update local timeSlots and ensure dataslots are unique
        setTimeSlots((prev) => ({
            ...prev,
            [day]: [...(prev[day] || []), slotString],
        }));

        setDataSlots((prev) => {
            // Only add the day if it's not already in the list
            return prev.includes(day) ? prev : [...prev, day];
        });

        // ✅ Send to backend
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/add-time-slots`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('auth_token')}`,
                },
                body: JSON.stringify({
                    days: day,
                    start_time: startTime,
                    end_time: endTime,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save slot");
            }

            toast.success("Slot added successfully!");

            // ✅ Optional: Refresh full slots from backend (to stay in sync)
            fetchDoctorSlots();

        } catch (error) {
            console.error("Error saving slot:", error);
        }
    };


    const handleDeleteSlot = (day, index) => {
        const updatedSlots = [...timeSlots[day]];
        updatedSlots.splice(index, 1);
        setTimeSlots({
            ...timeSlots,
            [day]: updatedSlots,
        });
        console.log(timeSlots);
    };

    const toggleDay = (day) => {
        setOpenDay(prev => (prev === day ? null : day));
    };


    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];


    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = Cookies.get("auth_token");
        const form = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                form.append(key, formData[key]);
            }
        });

        if (fileInputRef.current && fileInputRef.current.files[0]) {
            form.append('profile', fileInputRef.current.files[0]);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/user/update-profile/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: form,
            });

            const result = await response.json();
            if (response.ok) {
                dispatch(setUser({
                    user: result?.user,
                    user_type: result?.user_type || null,
                }));
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    city: '',
                    state: '',
                    street_address: '',
                    zip_code: '',
                });
                toast.success("Profile Updated Successfully");
            } else {
                toast.error("An error occurred while updating your profile.");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const fetchDoctorSlots = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/add-time-slots`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Cookies.get('auth_token')}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch slots");
            }

            const data = await response.json();

            // Group by unique 'days'
            const grouped = {};
            data.forEach(slot => {
                const day = slot.days;
                if (!grouped[day]) grouped[day] = [];
                grouped[day].push(`${slot.start_time} - ${slot.end_time}`);
            });

            setTimeSlots(grouped); // Save full mapping { Monday: [...], Tuesday: [...] }
            setDataSlots(Object.keys(grouped)); // Ensures unique day names

        } catch (error) {
            console.error("Error fetching slots:", error);
        }
    };

    useEffect(() => {
        fetchDoctorSlots();
    }, [])


    return (
        <div className="h-screen overflow-y-auto flex justify-center items-start p-2 pt-[60px]">
            <div className={`w-full  ${user_type === 'doctor' ? "max-w-5xl" : "max-w-2/5"} rounded-xl shadow-md p-6 bg-white mb-6`}>
                <h2 className="text-gray-800 text-2xl font-semibold text-center mb-4">
                    Profile Settings
                </h2>

                {user_type === 'doctor' ? (
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Side - Profile and Basic Info */}
                        <div className="md:w-1/3 flex flex-col items-center border rounded-xl p-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-xl font-bold relative mb-3">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile Preview" className="w-full h-full object-cover object-center" />
                                ) : userState.user?.profile_url ? (
                                    <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}${userState.user.profile_url}`} alt="Profile" className="w-full h-full object-cover object-center" />
                                ) : (
                                    'DR'
                                )}
                                <button
                                    onClick={handleImageClick}
                                    className="absolute bottom-2 z-50 right-2 w-6 h-6 bg-blue-600 text-white text-sm rounded-full border-2 border-white hover:bg-blue-700 cursor-pointer"
                                    title="Upload Profile Picture"
                                >
                                    +
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-lg font-medium text-gray-800">{formData.first_name || userState.user?.first_name} {formData.last_name || userState.user?.last_name}</p>

                            <div className="mt-6 w-full mb-4 space-y-4 text-left max-w-md mx-auto">
                                {dataslots.map((day, index) => (
                                    <div key={index} className="border rounded-md shadow">
                                        <button
                                            onClick={() => toggleDay(day)}
                                            className="w-full text-left px-4 py-2 bg-blue-700 hover:bg-blue-600 font-medium capitalize flex justify-between items-center"
                                        >
                                            {day}
                                            <span>{openDay === day ? "▲" : "▼"}</span>
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${openDay === day ? "max-h-40 py-2 px-4" : "max-h-0 px-4"}`}
                                        >
                                            {timeSlots[day] && timeSlots[day].length > 0 ? (
                                                timeSlots[day].map((slot, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex justify-between items-center text-sm bg-blue-500 px-3 py-1 my-1 rounded-md"
                                                    >
                                                        <span>{slot}</span>
                                                        <button
                                                            onClick={() => handleDeleteSlot(day, index)}
                                                            className="text-red-400 hover:text-red-500"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-400">No slots available</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="bg-green-500 w-full cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                onClick={() => setModalOpen(true)}
                            >
                                ➕ Add Slot
                            </button>
                        </div>

                        {/* Right Side - Form */}
                        <div className="md:w-2/3">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            placeholder={userState.user?.first_name || "Enter your First name"}
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            placeholder={userState.user?.last_name || "Enter your Last name"}
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Enter your state"
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-400 focus:outline-none text-gray-700"
                                        >
                                            <option value="">Select City</option>
                                            {['Faisalabad', 'Lahore', 'Bahawalpur', 'Sindh', 'Multan'].map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                        <input
                                            type="text"
                                            name="street_address"
                                            value={formData.street_address}
                                            onChange={handleChange}
                                            placeholder="Enter your street address"
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                        <input
                                            type="text"
                                            name="zip_code"
                                            value={formData.zip_code}
                                            onChange={handleChange}
                                            placeholder="Enter your zip code"
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 ease-in-out"
                                >
                                    Save Changes
                                </button>
                            </form>


                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center flex-col'>
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-xl font-bold relative mb-3">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile Preview" className="w-full h-full object-cover object-center" />
                            ) : userState.user?.profile_url ? (
                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}${userState.user.profile_url}`} alt="Profile" className="w-full h-full object-cover object-center" />
                            ) : (
                                'DR'
                            )}
                            <button
                                onClick={handleImageClick}
                                className="absolute bottom-2 z-50 right-2 w-6 h-6 bg-blue-600 text-white text-sm rounded-full border-2 border-white hover:bg-blue-700 cursor-pointer"
                                title="Upload Profile Picture"
                            >
                                +
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder={userState.user?.first_name || "Enter your First name"}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder={userState.user?.last_name || "Enter your Last name"}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Enter your state"
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-400 focus:outline-none text-gray-700"
                                    >
                                        <option value="">Select City</option>
                                        {['Faisalabad', 'Lahore', 'Bahawalpur', 'Sindh', 'Multan'].map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                    <input
                                        type="text"
                                        name="street_address"
                                        value={formData.street_address}
                                        onChange={handleChange}
                                        placeholder="Enter your street address"
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zip_code"
                                        value={formData.zip_code}
                                        onChange={handleChange}
                                        placeholder="Enter your zip code"
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 focus:ring-blue-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 ease-in-out"
                            >
                                Save Changes
                            </button>
                        </form>

                    </div>
                )}
            </div>
            <AddSlotModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddSlot}
            />
        </div>

    );
};

export default ProfilePage;
