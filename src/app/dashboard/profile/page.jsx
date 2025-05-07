"use client";
import React, { useRef, useState } from 'react';

const ProfilePage = () => {
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);

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

    return (
        <div className="h-screen overflow-y-auto flex justify-center items-start p-2 pt-[60px]">
            <div className="w-full max-w-lg rounded-xl shadow-md p-6 bg-white mb-6">
                <h2 className="text-gray-800 text-2xl font-semibold text-center mb-4">
                    Profile Settings
                </h2>

                <div className="flex flex-col items-center mb-4 relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover object-center" />
                        ) : (
                            'MR'
                        )}
                    </div>

                    <button
                        onClick={handleImageClick}
                        className="absolute bottom-0 right-[40%] w-6 h-6 bg-blue-600 text-white text-sm rounded-full border-2 border-white hover:bg-blue-700 cursor-pointer"
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

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Account Type</label>
                        <input
                            type="text"
                            placeholder="Enter account type"
                            className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition cursor-pointer"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
