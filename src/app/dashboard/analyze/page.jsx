"use client";

import PatientSidebar from '@/component/PatientSidebar/PatientSidebar';
import XrayGrid from '@/component/XrayGrid/XrayGrid';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Page = () => {
    const router = useRouter();
    const source = useSearchParams();
    const userState = useSelector((state) => state.user) || {};
    const { user_type } = userState;


    const taskIds = source.get('process')?.split(',') || [];
    let patient = null;
    if (user_type === "doctor") {
        patient = source.get('patient') || null;
    }


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

    const { data, isLoading } = useQuery({
        queryKey: ['results', taskIds],
        queryFn: fetchResults,
        refetchInterval: pollingEnabled ? 3000 : false,
        enabled: pollingEnabled,
    });

    useEffect(() => {
        if (!data) return;

        const allDone = data.every(r =>
            (r.status === 200 && r.data.image_url) || r.status === 500
        );

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
            <div className='overflow-y-auto h-full w-full'>
                <XrayGrid patient_id={patient} />
            </div>
        </div>
    );

    const renderPatientView = () => (
        <div className="p-6 flex flex-col md:flex-row gap-6 pt-[100px] text-white">
            {/* Left: Results Section */}
            <div className="flex-1 bg-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-lg">
                {pending ? (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-white text-lg font-medium">Processing images... Please wait.</p>
                    </div>
                ) : results.length === 1 ? (
                    <div className="w-full flex flex-col justify-center items-center space-y-4">
                        <div className="max-w-sm md:max-w-md">
                            <img
                                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${results[0].image_url}`}
                                alt="Analyzed Result"
                                className="w-full h-auto rounded-xl object-contain shadow-lg"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className="w-[250px] bg-white/5 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center"
                            >
                                <img
                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${result.image_url}`}
                                    alt={`Result ${index}`}
                                    className="w-full h-auto rounded-lg object-contain shadow-sm mb-3"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right: Sidebar */}
            <div className="w-full md:w-[350px] rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-3">Hi! <span className="font-bold">Usman Tahir</span></h2>
                    <p className="text-sm text-gray-300 mb-6">Your AI results are ready. You can now download or share them.</p>
                    <button className="bg-blue-600 text-white font-medium py-2 rounded-lg w-full hover:bg-blue-500 transition mb-4">
                        Consult Dentist
                    </button>

                    {/* Download and Share Buttons */}
                    {results.length > 0 && (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() =>
                                    results.forEach(r =>
                                        window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}${r.image_url}`, '_blank')
                                    )
                                }
                                className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition"
                            >
                                Download All
                            </button>
                            {typeof navigator.share !== 'undefined' && (
                                <button
                                    onClick={() =>
                                        navigator.share({
                                            title: 'X-ray Result',
                                            url: `${process.env.NEXT_PUBLIC_SERVER_URL}${results[0].image_url}`,
                                        })
                                    }
                                    className="bg-green-600 hover:bg-green-500 text-white py-2 rounded-md transition"
                                >
                                    Share First Result
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
