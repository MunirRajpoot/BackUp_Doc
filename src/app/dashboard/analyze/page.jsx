"use client";

import PatientSidebar from '@/component/PatientSidebar/PatientSidebar';
import UploadXrayModal from '@/component/UploadXrayModel/UploadXrayModel';
import React, { useRef, useState } from 'react';
import { IoCloudUpload } from "react-icons/io5";

const xrayImages = [
    // Replace with your actual image URLs or objects
    ...Array(20).fill("/images/image 8.png"), // example placeholders
];
const Page = () => {
    const [openModal, setOpenModal] = useState(false);


    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const xraysPerPage = 15;
    const totalPages = Math.ceil(xrayImages.length / xraysPerPage);

    const currentXrays = xrayImages.slice(
        (currentPage - 1) * xraysPerPage,
        currentPage * xraysPerPage
    );

    return (
        <div className="flex text-white h-screen bg-[#0f172a] overflow-hidden">
            <PatientSidebar />

            <div className="flex-1 bg-[#0B0F19] text-white px-6 py-8 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#111827] p-6 rounded-2xl shadow-lg mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Usman Ali</h1>
                        <p className="text-sm text-gray-400 mt-1">
                            13 years • male • 18728977554
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
                        >
                            Upload X-Ray
                        </button>
                    </div>
                </div>

                {/* Main Content (X-ray display area) */}
                <div className="bg-[#111827] rounded-2xl h-[60vh] md:h-[70vh] w-full mb-6">

                    {/* Grid of X-rays */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {currentXrays.map((img, idx) => (
                            <div
                                key={idx}
                                className="relative bg-[#1F2937] rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow"
                            >
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    className="absolute top-2 left-2 w-5 h-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                                    value={idx}
                                // onChange={...} // Optional: Add selection logic
                                />

                                {/* X-ray Image */}
                                <img
                                    src={img}
                                    alt={`X-ray ${idx + 1}`}
                                    className="w-full h-32 object-cover"
                                />
                            </div>
                        ))}
                    </div>

                </div>

                {/* Footer: Pagination + Analyze Button */}

                <div className="flex justify-end items-center space-x-4">
                    <div className="flex justify-end  space-x-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-md ${currentPage === i + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-[#1F2937] text-gray-300 hover:bg-[#374151]"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold">
                        Analyze
                    </button>
                </div>

            </div>
            <UploadXrayModal isOpen={openModal} onClose={() => setOpenModal(false)} />
        </div>

    );
};

export default Page;
