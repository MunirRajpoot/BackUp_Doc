"use client";

import PatientSidebar from '@/component/PatientSidebar/PatientSidebar';
import XrayGrid from '@/component/XrayGrid/XrayGrid';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { FaShareAlt, FaUserMd } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react';
;

const Page = () => {
    const router = useRouter();
    const source = useSearchParams();
    const userState = useSelector((state) => state.user) || {};
    const { user_type } = userState;

    const taskIds = source.get('process')?.split(',') || [];
    const patient = user_type === "doctor" ? source.get('patient') || null : null;

    const [pollingEnabled, setPollingEnabled] = useState(taskIds.length > 0);
    const [results, setResults] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [pending, setPending] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [generating, setGenerating] = useState(false);

    const handleGenerateReport = async (analysis_id) => {
        try {
            setGenerating(true);
            const authToken = Cookies.get("auth_token");
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/engine/report/`,
                {
                    analysis_id: analysis_id || results[activeIndex]?.analysis_id,
                    lang: selectedLanguage,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${response.data.file}`);
            const blob = await result.blob();
            const objectURL = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = objectURL;
            link.download = 'report.pdf';
            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(objectURL);

        } catch (error) {
            console.error("Failed to generate report:", error);
            alert("Failed to generate report. Please try again.");
        } finally {
            setGenerating(false);
        }
    };


    const fetchResults = async () => {
        const responses = await Promise.all(taskIds.map(async (taskId) => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/engine/result/${taskId}`);
            return { taskId, status: res.status, data: res.data };
        }));
        return responses;
    };

    const { data } = useQuery({
        queryKey: ['results', taskIds],
        queryFn: fetchResults,
        refetchInterval: pollingEnabled ? 3000 : false,
        enabled: pollingEnabled,
    });

    useEffect(() => {
        if (!data) return;

        const allDone = data.every(r => (r.status === 200 && r.data.image_url) || r.status === 500);

        if (allDone) {
            setPending(false);
            setPollingEnabled(false);
            const filtered = data
                .filter(r => r.status === 200 && r.data.image_url)
                .map(r => r.data);
            setResults(filtered);
        }
    }, [data]);
    const downloadFile = async (url, filename) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = objectURL;
            link.download = filename || 'image.jpg';
            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(objectURL);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const handleDownload = () => {
        results.forEach((r, index) => {
            const url = `${process.env.NEXT_PUBLIC_SERVER_URL}${r.image_url}`;
            const filename = `image_${index + 1}${r.image_url.split('.').pop() ? '.' + r.image_url.split('.').pop() : '.jpg'}`;
            downloadFile(url, filename);
        });
    };
    const handleFeedback = async (analysis_id, correctionType) => {
        try {
            const authToken = Cookies.get("auth_token");

            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/engine/analysis/${analysis_id}/`,
                { is_corrected: correctionType },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            toast.success('Your opinion has been submitted successfully');
        } catch (err) {
            console.error(err);
            toast.error("Error submitting feedback");
        }

    };


    const renderDoctorView = () => (
        <div className="flex text-white h-screen bg-[#0f172a]">
            {/* Toggle button for tablet and mobile */}
            <button
                className="md:hidden absolute top-4 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <MoveLeftIcon className="w-3" /> : <MoveRightIcon className="w-3" />}
            </button>

            {/* Sidebar: visible on desktop or conditionally shown on small screens */}
            <div
                className={`fixed z-40 top-0 left-0 h-full transition-transform duration-300
                        w-full md:w-[18rem] 
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        md:translate-x-0 md:relative md:block`}
            >
                <PatientSidebar />
            </div>

            <div className="overflow-y-auto h-full w-full">
                <XrayGrid patient_id={patient} />
            </div>
        </div>
    );

    const renderPatientView = () => (
        <div className="px-4 md:px-6 py-6 pt-[50px] text-white max-w-screen-xl mx-auto min-h-screen flex flex-col lg:flex-row gap-6">
            {/* Left: Results Section */}
            <div className="w-full lg:flex-1 bg-white/10 rounded-2xl p-4 md:p-4 shadow-xl backdrop-blur-lg">
                <div className="w-full flex justify-center items-center">
                    <div className="w-full max-w-full md:max-w-2xl">
                        {pending ? (
                            <div className="flex flex-col justify-center items-center h-64 md:h-96 gap-4">
                                {/* Spinner */}
                                <svg
                                    className="animate-spin h-10 w-10 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    ></path>
                                </svg>
                                <p className="text-white text-lg font-medium text-center">
                                    Processing images... Please wait.
                                </p>
                            </div>
                        ) : (
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                spaceBetween={20}
                                slidesPerView={1}
                                loop={false}
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                className="w-full"
                            >
                                {results.map((result, index) => (
                                    <SwiperSlide key={index} className="flex justify-center items-center">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${result.image_url}`}
                                            alt={`Result ${index + 1}`}
                                            className="w-full max-w-[95vw] md:max-w-[600px] max-h-[70vh] object-contain rounded-xl shadow-md transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>


            {/* Right: Sidebar */}
            <div className="w-full lg:w-[350px] bg-white/10 rounded-2xl shadow-xl backdrop-blur-lg p-4 md:p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-3">
                        Hi! <span className="font-bold">{userState.user.first_name} {userState.user.last_name}</span>
                    </h2>
                    <p className="text-sm text-gray-300 mb-6">
                        Your AI results are ready. You can now download, generate a report, or share them.
                    </p>

                    <Link href="/doctor">
                        <button
                            className="bg-blue-600 text-white font-medium py-2 rounded-lg w-full hover:bg-blue-500 transition mb-4 flex items-center justify-center gap-2  cursor-pointer"
                            aria-label="Consult a Dentist"
                        >
                            <FaUserMd />
                            Consult Dentist
                        </button>
                    </Link>

                    {results.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                onClick={handleDownload}
                                className="bg-blue-600 text-sm hover:bg-blue-500 text-white py-2 px-4 rounded-md transition flex items-center justify-center gap-2  cursor-pointer"
                                aria-label="Download Images"
                            >
                                <FaDownload />
                                Download {results.length > 1 ? 'All' : ''}
                            </button>

                            {typeof navigator.share !== 'undefined' && (
                                <button
                                    onClick={() =>
                                        navigator.share({
                                            title: 'X-ray Result',
                                            url: `${process.env.NEXT_PUBLIC_SERVER_URL}${results[0].image_url}`,
                                        })
                                    }
                                    className="bg-green-600 hover:bg-green-500 text-white py-2 rounded-md transition flex items-center justify-center gap-2 cursot-pointer"
                                    aria-label="Share Result"
                                >
                                    <FaShareAlt />
                                    Share
                                </button>
                            )}
                        </div>
                    )}

                    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                        <p className="text-sm text-white mb-3">Get your report in your preferred language</p>

                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="bg-gray-700 text-white text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                aria-label="Select Language"
                            >
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Urdu">Urdu</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Arabic">Arabic</option>
                            </select>

                            <button
                                onClick={() => handleGenerateReport(results[activeIndex]?.analysis_id)}
                                className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-md transition flex items-center justify-center gap-2 cursor-pointer"
                                aria-label="Generate Report"
                                disabled={generating}
                            >
                                {generating && (
                                    <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        ></path>
                                    </svg>
                                )}
                                Generate Report
                            </button>

                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                        <p className="text-xs mb-2">Help Us Refine Our AI</p>
                        <div className="flex gap-2">
                            <button
                                className="text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleFeedback(results[activeIndex]?.analysis_id, "no")}
                                aria-label="Mark as Incorrect Detection"
                            >
                                Incorrect Detection
                            </button>
                            <button
                                className="text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleFeedback(results[activeIndex]?.analysis_id, "yes")}
                                aria-label="Mark as Missing Detection"
                            >
                                Missing Detection
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


    return user_type === "patient" ? renderPatientView() : renderDoctorView();
};

export default Page;
