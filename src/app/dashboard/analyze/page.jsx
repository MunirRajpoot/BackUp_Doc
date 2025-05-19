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

const Page = () => {
    const router = useRouter();
    const source = useSearchParams();
    const userState = useSelector((state) => state.user) || {};
    const { user_type } = userState;

    const taskIds = source.get('process')?.split(',') || [];
    const patient = user_type === "doctor" ? source.get('patient') || null : null;

    const [pollingEnabled, setPollingEnabled] = useState(taskIds.length > 0);
    const [results, setResults] = useState([]);
    const [pending, setPending] = useState(true);

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

    const renderDoctorView = () => (
        <div className="flex text-white h-screen bg-[#0f172a]">
            <PatientSidebar />
            <div className="overflow-y-auto h-full w-full">
                <XrayGrid patient_id={patient} />
            </div>
        </div>
    );

    const renderPatientView = () => (
        <div className="px-4 md:px-6 py-6 flex flex-col lg:flex-row gap-6 pt-[100px] text-white max-w-screen">
            {/* Left: Results Section */}
            <div className="w-full lg:flex-1 bg-white/10 rounded-2xl p-4 md:p-6 shadow-xl backdrop-blur-lg">
                <div className="w-full flex justify-center items-center">
                    <div className="w-full max-w-full md:max-w-3xl">
                        {pending ? (
                            <div className="flex justify-center items-center h-64 md:h-96">
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
                        Hi! <span className="font-bold">Usman Tahir</span>
                    </h2>
                    <p className="text-sm text-gray-300 mb-6">
                        Your AI results are ready. You can now download or share them.
                    </p>

                    <Link href="/doctor">
                        <button className="bg-blue-600 text-white font-medium py-2 rounded-lg w-full hover:bg-blue-500 transition mb-4 flex items-center justify-center gap-2">
                            <FaUserMd />
                            Consult Dentist
                        </button>
                    </Link>

                    {results.length > 0 && (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() =>
                                    results.forEach(r =>
                                        window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}${r.image_url}`, '_blank')
                                    )
                                }
                                className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition flex items-center justify-center gap-2"
                            >
                                <FaDownload />
                                Download
                            </button>

                            {typeof navigator.share !== 'undefined' && (
                                <button
                                    onClick={() =>
                                        navigator.share({
                                            title: 'X-ray Result',
                                            url: `${process.env.NEXT_PUBLIC_SERVER_URL}${results[0].image_url}`,
                                        })
                                    }
                                    className="bg-green-600 hover:bg-green-500 text-white py-2 rounded-md transition flex items-center justify-center gap-2"
                                >
                                    <FaShareAlt />
                                    Share
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );

    return user_type === "patient" ? renderPatientView() : renderDoctorView();
};

export default Page;
