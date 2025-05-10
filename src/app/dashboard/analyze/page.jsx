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

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const taskIds = source.get('process')?.split(',') || [];

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
            <div className='overflow-y-auto h-full'>
                <XrayGrid />
            </div>
        </div>
    );

    const renderPatientView = () => (
        <div className="p-6 flex flex-col md:flex-row gap-6 pt-[100px]">
            {/* Left: Results / Upload Section */}
            <div className="flex-1 bg-white/10 rounded-2xl p-5 shadow-sm flex items-center justify-center">
                {pending ? (
                    <p className="text-white text-center">Processing images... Please wait.</p>
                ) : results.length === 1 ? (
                    <div className="w-full flex justify-center items-center h-96">
                        <img
                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${results[0].image_url}`}
                            alt="Analyzed Result"
                            className="max-w-100 h-auto rounded-xl object-contain shadow-lg"
                        />
                    </div>
                ) : (
                    <div className="flex overflow-x-auto gap-4 w-full h-96 pb-2">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className=" flex-shrink-0"
                            >
                                <img
                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${result.image_url}`}
                                    alt={`Result ${index}`}
                                    className="h-auto rounded-xl object-contain shadow-md"
                                    width={400}
                                    height={400}
                                    loading='lazy'
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right: Sidebar */}
            <div className="w-full md:w-[350px] rounded-lg flex flex-col justify-between">
                <div className='bg-white/10 rounded-2xl p-6 border shadow-sm'>
                    <h2 className="text-lg font-semibold mb-4 text-white">
                        Hi! <span className="font-bold">Usman Tahir</span>
                    </h2>

                    <div className='my-9'>
                        <button className="bg-blue-600 text-white font-medium py-2 rounded-lg w-full hover:bg-blue-500 transition cursor-pointer">
                            Consult Dentist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return user_type === "patient" ? renderPatientView() : renderDoctorView();
};

export default Page;
