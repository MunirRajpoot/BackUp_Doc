'use client';
import { useMemo, useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { RotateCcw, RotateCw, Minus, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import UploadXrayModal from "@/component/UploadXrayModel/UploadXrayModel";
import Carousel from "@/component/Carousel/Carousel.js"; // ✅ Carousel component

const Page = () => {
    const router = useRouter();
    const source = useSearchParams();
    const userState = useSelector((state) => state.user) || {};
    const { user_type } = userState;

    const [showAnalyzed, setShowAnalyzed] = useState(false);
    const [zoom, setZoom] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [results, setResults] = useState([]);
    const [pending, setPending] = useState(true);
    const [pollingEnabled, setPollingEnabled] = useState(false);

    const taskIds = useMemo(() => {
        const processParam = source.get('process');
        return processParam ? processParam.split(',') : [];
    }, [source]);

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

    const { data } = useQuery({
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

    return (
        <div className="flex text-white h-screen bg-[#0f172a] overflow-hidden">
            <div className="flex-1 bg-[#0B0F19] text-white px-6 py-8 overflow-y-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">Usman Ali</h2>
                        <p className="text-sm text-gray-300">13 years · male · 18728977554</p>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="px-3 bg-blue-700 py-2 rounded text-sm font-medium cursor-pointer"
                        >
                            Add Patient
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar Controls */}
                    <div className="col-span-3 bg-[#1E293B] rounded-xl p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Show Original</span>
                            <Switch
                                checked={showAnalyzed}
                                onChange={setShowAnalyzed}
                                className={`${showAnalyzed ? "bg-blue-600" : "bg-gray-600"} relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer`}
                            >
                                <span
                                    className={`${showAnalyzed ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                />
                            </Switch>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Bone Measurements</span>
                            <span className="text-xs text-gray-400">Soon</span>
                        </div>

                        {/* Zoom */}
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <button onClick={() => setZoom(prev => Math.max(10, prev - 10))} className="bg-gray-700 p-2 rounded hover:bg-gray-600">
                                <Minus size={16} />
                            </button>
                            <span className="text-white">{zoom}%</span>
                            <button onClick={() => setZoom(prev => Math.min(300, prev + 10))} className="bg-gray-700 p-2 rounded hover:bg-gray-600">
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Rotation */}
                        <div className="flex items-center justify-center gap-4 mt-2">
                            <button onClick={() => setRotation(prev => (prev - 90 + 360) % 360)} className="bg-gray-700 p-2 rounded hover:bg-gray-600">
                                <RotateCcw size={16} />
                            </button>
                            <span className="text-white">{rotation}°</span>
                            <button onClick={() => setRotation(prev => (prev + 90) % 360)} className="bg-gray-700 p-2 rounded hover:bg-gray-600">
                                <RotateCw size={16} />
                            </button>
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={() => {
                                setZoom(100);
                                setRotation(0);
                            }}
                            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
                        >
                            Reset Analysis
                        </button>
                    </div>

                    {/* X-ray Image Area */}
                    <div className="col-span-6 bg-[#1E293B] rounded-xl p-4 flex justify-center items-center relative">
                        {pending ? (
                            <p className="text-white text-center">Processing images... Please wait.</p>
                        ) : results.length === 1 ? (
                            <div className="w-full flex justify-center items-center h-96">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${showAnalyzed ? results[0]?.file_path : results[0]?.image_url}`}
                                    alt="X-ray"
                                    className="max-w-100 h-auto rounded-xl object-contain shadow-lg transition-transform duration-300"
                                    style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)` }}
                                />  
                            </div>
                        ) : (
                            <Carousel
                                results={results}
                                showAnalyzed={showAnalyzed}
                                zoom={zoom}
                                rotation={rotation}
                            />
                        )}
                    </div>

                    {/* Detection Output */}
                    <div className="col-span-3 bg-[#1E293B] rounded-xl p-4 flex flex-col gap-4">
                        <h3 className="text-sm font-semibold">Detection Results</h3>
                        {results?.[0]?.prediction_objs && (
                            <div className="space-y-2">
                                {results[0].prediction_objs.map((label, index) => (
                                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-700 rounded-lg">
                                        <span className="text-sm text-white">{label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                            <p className="text-xs mb-2">Help Us Refine Our AI</p>
                            <div className="flex gap-2">
                                <button className="text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-700">
                                    Incorrect Detection
                                </button>
                                <button className="text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-700">
                                    Missing Detection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="mt-6 bg-[#1E293B] p-4 rounded-xl">
                    <h4 className="text-sm font-semibold mb-1">Notes</h4>
                    <p className="text-sm text-gray-400">No notes added yet</p>
                </div>
            </div>

            {/* Upload Modal */}
            <UploadXrayModal isOpen={openModal} onClose={() => setOpenModal(false)} />
        </div>
    );
};

export default Page;
