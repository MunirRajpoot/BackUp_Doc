// components/XrayGrid.jsx
'use client';

import React, { useEffect, useState } from 'react';
import UploadXrayModal from '../UploadXrayModel/UploadXrayModel';
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import axios from 'axios';

// The XrayGrid component displays paginated X-ray images with the ability to upload new ones
const XrayGrid = () => {
    const [openModal, setOpenModal] = useState(false); // Controls the upload modal
    const [data, setData] = useState([]); // Stores X-ray image data
    const [selectedImages, setSelectedImages] = useState([]);

    // Retrieve the user state from Redux store
    const userState = useSelector((state) => state.user) || {};
    const { user_type } = userState;

    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
    const xraysPerPage = 12; // Number of X-rays per page

    // Updated fetchPatientsXrays with page parameter
    const fetchPatientsXrays = async (page = 1) => {
        try {
            const authToken = Cookies.get("auth_token");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/images/?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setData(response.data);
        } catch (error) {
            console.error('Error fetching patients x-rays:', error);
        }
    };

    // Fetch data when user_type is available and when currentPage changes
    useEffect(() => {
        if (user_type === "patient") {
            fetchPatientsXrays(currentPage);
        }
    }, [user_type, currentPage]);


    // Calculate total number of pages safely
    const totalPages = Math.ceil((data?.count || 0) / xraysPerPage);
    const validTotalPages = Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 0;

    // Extract the subset of X-rays for the current page
    const currentXrays = Array.isArray(data?.results) ? data.results : [];

    // Toggle checkbox selection
    const handleSelect = (imageId) => {
        if (selectedImages.includes(imageId)) {
            setSelectedImages(prev => prev.filter(id => id !== imageId));
        } else {
            if (selectedImages.length < 5) {
                setSelectedImages(prev => [...prev, imageId]);
            }
        }
    };


    // Send selected image IDs to the /annotate/ endpoint
    const handleAnalyze = async () => {
        if (selectedImages.length === 0) return;

        try {
            const authToken = Cookies.get("auth_token");
            const formData = new FormData();

            selectedImages.forEach(id => {
                formData.append('image_ids', id); // Django expects a list of keys named 'image_ids'
            });

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/engine/annotate/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                router.push(`/dashboard/analyze/?process=${response.data?.task_id}`); // Redirect to the annotation page
            }
        } catch (error) {
            console.error("Error sending selected image IDs:", error);
        }
    };


    return (
        <div className="flex-1 bg-[#0B0F19] h-auto text-white px-6 py-8">
            {/* Header Section: User name and Upload button */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#111827] p-6 rounded-2xl shadow-lg mb-6">
                {/* User Name */}
                <div>
                    <h1 className="text-2xl font-bold">
                        {`${userState.user.first_name} ${userState.user.last_name}`}
                    </h1>
                </div>

                {/* Upload Button */}
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
                    >
                        Upload X-Ray
                    </button>
                </div>
            </div>

            {/* X-ray Display Grid Section */}
            <div className="bg-[#111827] rounded-2xl h-auto  w-full mb-6 p-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {currentXrays.map((img, idx) => (
                        <div
                            key={idx}
                            className="relative bg-[#1F2937] rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow"
                        >
                            {/* Checkbox for selecting the image */}
                            <input
                                type="checkbox"
                                className="absolute top-2 left-2 w-5 h-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                                checked={selectedImages.includes(img._id)}
                                onChange={() => handleSelect(img._id)}
                                disabled={
                                    !selectedImages.includes(img._id) && selectedImages.length >= 5
                                }
                            />


                            {/* Display the X-ray image */}
                            <img
                                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${img.image}`}
                                alt={`X-ray ${idx + 1}`}
                                className="w-full h-32 object-cover"
                                loading='lazy'
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Section: Pagination and Analyze button */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                {/* Pagination Buttons */}
                <div className="flex flex-wrap justify-center md:justify-end items-center mt-4 space-x-1">
                    {/* Previous Button */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${currentPage === 1
                            ? "bg-[#1F2937] text-gray-500 cursor-not-allowed"
                            : "bg-[#1F2937] text-white hover:bg-[#374151]"}`}
                    >
                        &laquo;
                    </button>

                    {/* Show only a few surrounding pages */}
                    {Array.from({ length: validTotalPages }, (_, i) => i + 1)
                        .filter((page) =>
                            page === 1 ||
                            page === validTotalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                        )
                        .map((page, idx, arr) => (
                            <React.Fragment key={page}>
                                {idx > 0 && page - arr[idx - 1] > 1 && (
                                    <span className="text-gray-400 px-2">...</span>
                                )}
                                <button
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded-md ${currentPage === page
                                        ? "bg-blue-600 text-white"
                                        : "bg-[#1F2937] text-gray-300 hover:bg-[#374151]"}`}
                                >
                                    {page}
                                </button>
                            </React.Fragment>
                        ))}

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, validTotalPages))}
                        disabled={currentPage === validTotalPages}
                        className={`px-3 py-1 rounded-md ${currentPage === validTotalPages
                            ? "bg-[#1F2937] text-gray-500 cursor-not-allowed"
                            : "bg-[#1F2937] text-white hover:bg-[#374151]"}`}
                    >
                        &raquo;
                    </button>
                </div>


                {/* Analyze Button */}
                <button
                    className={`px-4 py-2 cursor-pointer rounded-xl font-semibold ${selectedImages.length === 0
                        ? "bg-gray-500 text-white cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    disabled={selectedImages.length === 0}
                    onClick={handleAnalyze} // ✅ FIXED
                >
                    Analyze
                </button>

            </div>

            {/* Upload Modal Component */}
            <UploadXrayModal isOpen={openModal} onClose={() => setOpenModal(false)} />
        </div>
    );
};

export default XrayGrid;
