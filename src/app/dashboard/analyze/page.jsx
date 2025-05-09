"use client";

import PatientSidebar from '@/component/PatientSidebar/PatientSidebar';
import XrayGrid from '@/component/XrayGrid/XrayGrid';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { Image } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const userState = useSelector((state) => state.user) || {};
    const { user_type } = userState;

    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        for (let item of items) {
            if (item.type.indexOf("image") !== -1) {
                const file = item.getAsFile();
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
                break;
            }
        }
    };

    useEffect(() => {
        document.addEventListener("paste", handlePaste);
        return () => {
            document.removeEventListener("paste", handlePaste);
        };
    }, []);

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
            {/* Left: Upload Section */}
            <div className="flex-1 bg-white/10  rounded-2xl min-h-[400px] shadow-sm flex items-center justify-center p-6">
                <div className="text-center">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Uploaded" className="max-h-90 mx-auto rounded-lg" />
                    ) : (
                        <>
                            <div
                                className="text-5xl mb-4 flex justify-center items-center text-blue-600 cursor-pointer"
                                onClick={handleClick}
                            >
                                <Image className='w-20 h-20'/>
                            </div>
                            <p className="text-sm mb-2">
                                You can select multiple images or single image from your {' '}
                                <span
                                    className="text-blue-600 font-semibold cursor-pointer"
                                    onClick={()=>router.push('/dashboard')}
                                >
                                    upload space
                                </span>
                            </p>
                           
                        </>
                    )}
                </div>
            </div>

            {/* Right: Sidebar */}
            <div className="w-full md:w-[350px] rounded-lg flex flex-col justify-between">
                <div className='bg-white/10 rounded-2xl p-6 min-h-[50px] border shadow-sm'>
                    <h2 className="text-lg font-semibold mb-4">
                        Hi! <span className="font-bold">Usman Tahir</span>
                    </h2>
                    <div>
                        <p className="text-sm text-white mb-2">Analyze X-Ray</p>
                        <button className="bg-blue-600 text-white font-medium py-2 rounded-lg w-full hover:bg-blue-500 transition cursor-pointer">
                            Start Process
                        </button>
                    </div>
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
