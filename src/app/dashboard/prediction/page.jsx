'use client';
import { useMemo, useState } from "react";
import { Switch } from "@headlessui/react";
import { RotateCcw, RotateCw, Minus, Plus, X, Loader } from "lucide-react";
import UploadXrayModal from "@/component/UploadXrayModel/UploadXrayModel";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from "react";
import axios from "axios";
import NotesEditor from "@/component/NotesEditor/NotesEditor";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Page = () => {
    const router = useRouter();
    const source = useSearchParams();
    const userState = useSelector((state) => state.user) || {};
    const { user_type } = userState;
    const [showAnalyzed, setShowAnalyzed] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [results, setResults] = useState([]);
    const [pending, setPending] = useState(true);

    const [activeIndex, setActiveIndex] = useState(0);

    const [imageStates, setImageStates] = useState([]);
    useEffect(() => {
        if (results.length > 0) {
            setImageStates(results.map(() => ({ zoom: 100, rotation: 0 })));
        }
    }, [results]);



    // Example image array - replace with real data
    const images = [
        "/images/xray3.png",
    ];
    const taskIds = useMemo(() => {
        const processParam = source.get('process');
        return processParam ? processParam.split(',') : [];
    }, [source]);

    const [pollingEnabled, setPollingEnabled] = useState(false);

    const updateImageState = (index, key, value) => {
        setImageStates(prev => {
            if (!prev[index]) return prev; // avoid crash
            const updated = [...prev];
            updated[index] = { ...updated[index], [key]: value };
            return updated;
        });
    };


    const resetCurrentImage = () => {
        setImageStates(prev => {
            const updated = [...prev];
            if (!updated[activeIndex]) return prev;
            updated[activeIndex] = { zoom: 100, rotation: 0 };
            return updated;
        });
    };
    const currentState = imageStates[activeIndex] || { zoom: 100, rotation: 0 };




    useEffect(() => {
        if (taskIds.length > 0) {
            setPollingEnabled(true);
        }
    }, [taskIds]);


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
        console.log("Data fetched:", data);

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

    const handleEmailSend = async (analysis_id) => {
    try {
        const authToken = Cookies.get("auth_token");
        await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/engine/analysis/email/${analysis_id}/`,
            {}, // empty body
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );

        toast.success('Email submitted successfully');
    } catch (err) {
        console.error(err);
        toast.error("Error submitting Email");
    }
};


    return (
        <div className="flex text-white h-screen bg-[#0f172a] overflow-hidden">
            {/* <PatientSidebar /> */}

            <div className="flex-1 bg-[#0B0F19] text-white px-6 py-8 overflow-y-auto">
                {/* Top Info Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">Usman Ali</h2>
                        <p className="text-sm text-gray-300">13 years · male · 18728977554</p>
                    </div>

                    {/* Image Navigation Arrows */}
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className={`px-3 bg-blue-700 py-2 rounded text-sm font-medium cursor-pointer`}
                        >
                            Add Patient
                        </button>
                        <button
                            onClick={() => handleEmailSend(results[activeIndex]?.analysis_id)}
                            className={`px-3 bg-green-700 py-2 rounded text-sm font-medium cursor-pointer`}
                        >
                            Email me
                        </button>
                        {images.length > 1 && (
                            <div className="flex gap-2 mt-4 md:mt-0">

                                <button
                                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                    disabled={currentIndex === 0}
                                    className={`px-3 py-1 rounded text-sm font-medium ${currentIndex === 0
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                                        }`}
                                >
                                    ← Prev
                                </button>

                                <button
                                    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))}
                                    disabled={currentIndex === images.length - 1}
                                    className={`px-3 py-1 rounded text-sm font-medium ${currentIndex === images.length - 1
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                                        }`}
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </div>

                </div>

                {/* Main Content */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Controls */}
                    <div className="col-span-3 bg-[#1E293B] rounded-xl p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Show Original</span>
                            <Switch
                                checked={showAnalyzed}
                                onChange={setShowAnalyzed}
                                className={`${showAnalyzed ? "bg-blue-600" : "bg-gray-600"
                                    } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer`}
                            >
                                <span
                                    className={`${showAnalyzed ? "translate-x-6" : "translate-x-1"
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                />
                            </Switch>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Bone Measurements</span>
                            <span className="text-xs text-gray-400">Soon</span>
                        </div>

                        {/* Zoom Controls */}
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <button
                                onClick={() =>
                                    updateImageState(
                                        activeIndex,
                                        'zoom',
                                        Math.max(10, imageStates[activeIndex].zoom - 10)
                                    )
                                }
                                className="bg-gray-700 p-2 rounded cursor-pointer hover:bg-gray-600 transition"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="text-white">{currentState.zoom}%</span>
                            <button
                                onClick={() =>
                                    updateImageState(
                                        activeIndex,
                                        'zoom',
                                        Math.min(300, imageStates[activeIndex].zoom + 10)
                                    )
                                }
                                className="bg-gray-700 p-2 rounded cursor-pointer hover:bg-gray-600 transition"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Rotation Controls */}
                        <div className="flex items-center justify-center gap-4 mt-2">
                            <button
                                onClick={() =>
                                    updateImageState(
                                        activeIndex,
                                        'rotation',
                                        (imageStates[activeIndex].rotation - 90) % 360
                                    )
                                }
                                className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition"
                            >
                                <RotateCcw size={16} />
                            </button>
                            <span className="text-white">{currentState.rotation}°</span>

                            <button
                                onClick={() =>
                                    updateImageState(
                                        activeIndex,
                                        'rotation',
                                        (imageStates[activeIndex].rotation + 90) % 360
                                    )
                                }
                                className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition"
                            >
                                <RotateCw size={16} />
                            </button>
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={resetCurrentImage}
                            className="w-full cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
                        >
                            Reset Analysis
                        </button>

                    </div>

                    {/* Image Viewer Container */}
                    <div className="col-span-6 bg-[#1E293B] rounded-xl p-4 flex justify-center items-center relative">
                        {pending ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                                <Loader width={80} height={80} />
                                <p className="text-white">X-Rays are processing... Please wait!</p>
                            </div>
                        ) : results.length === 1 ? (
                            <div className="w-full h-full flex justify-center items-center overflow-hidden">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${showAnalyzed ? results[activeIndex]?.image_url : results[activeIndex]?.file_path}`}
                                    alt="X-ray"
                                    style={{
                                        transform: `scale(${currentState.zoom / 100}) rotate(${currentState.rotation}deg)`,
                                        transition: 'transform 0.3s ease',
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                    }}
                                    className="object-contain"
                                />
                            </div>
                        ) : (
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                spaceBetween={20}
                                slidesPerView={1}
                                loop={false}
                                className="w-full h-96"
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            >
                                {results.map((result, index) => (
                                    <SwiperSlide key={index} className="flex justify-center items-center">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${showAnalyzed ? result?.file_path : result?.image_url}`}
                                            alt={`Result ${index}`}
                                            className="h-auto max-h-full rounded-xl object-contain shadow-md transition-transform duration-300"
                                            style={{
                                                transform: `scale(${imageStates[index]?.zoom / 100}) rotate(${imageStates[index]?.rotation}deg)`
                                            }}
                                            loading="lazy"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        )}
                    </div>


                    {/* Detection Results */}
                    <div className="col-span-3 bg-[#1E293B] rounded-xl p-4 flex flex-col gap-4">
                        <h3 className="text-sm font-semibold">Detection Results</h3>
                        {results[activeIndex]?.prediction_objs?.length > 0 && (
                            <div className="space-y-2">
                                {results[activeIndex].prediction_objs.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 bg-gray-700 rounded-lg">
                                        {/* <div className={`w-4 h-4 rounded ${color}`}></div> */}
                                        <span className="text-sm text-white">{item}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                            <p className="text-xs mb-2">Help Us Refine Our AI</p>
                            <div className="flex gap-2">
                                <button
                                    className="text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-700"
                                    onClick={() => handleFeedback(results[activeIndex]?.analysis_id, "no")}
                                >
                                    Incorrect Detection
                                </button>
                                <button
                                    className="text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-700"
                                    onClick={() => handleFeedback(results[activeIndex]?.analysis_id, "yes")}
                                >
                                    Missing Detection
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Notes Section */}
                <NotesEditor analysisId={results[activeIndex]?.analysis_id} />

                {/* Previous Analyses */}
                {/* <div className="mt-4 bg-[#1E293B] p-4 rounded-xl text-sm text-gray-400">
                    Previous Analyses
                </div> */}
            </div>
            <UploadXrayModal isOpen={openModal} onClose={() => setOpenModal(false)} />
        </div>
    )
}

export default Page
