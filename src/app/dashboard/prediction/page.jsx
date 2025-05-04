'use client';
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { RotateCcw, RotateCw, Minus, Plus, X } from "lucide-react";
import PatientSidebar from '@/component/PatientSidebar/PatientSidebar'
import UploadXrayModal from "@/component/UploadXrayModel/UploadXrayModel";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [showAnalyzed, setShowAnalyzed] = useState(true);
    const [zoom, setZoom] = useState(100);
    const [openModal, setOpenModal] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Example image array - replace with real data
    const images = [
        // "/images/xray1.png",
        // "/images/xray2.png",
        "/images/xray3.png",
    ];

    // Use currentIndex to show current image
    {/* <img
  src={images[currentIndex]}
  alt={`X-ray ${currentIndex + 1}`}
  className="w-full rounded-lg"
/> */}

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
                            <span>Show Analyzed</span>
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

                        <div className="flex items-center justify-center gap-4">
                            <button onClick={() => setZoom(zoom - 10)} className="bg-gray-700 p-2 rounded cursor-pointer">
                                <Minus size={16} />
                            </button>
                            <span>{zoom}%</span>
                            <button onClick={() => setZoom(zoom + 10)} className="bg-gray-700 p-2 rounded cursor-pointer">
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            <button className="bg-gray-700 p-2 rounded">
                                <RotateCcw size={16} />
                            </button>
                            <span>0°</span>
                            <button className="bg-gray-700 p-2 rounded">
                                <RotateCw size={16} />
                            </button>
                        </div>

                        <button className="w-full cursor-pointer mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium">
                            Reset Analysis
                        </button>
                    </div>

                    {/* Image Viewer */}
                    <div className="col-span-6 bg-[#1E293B] rounded-xl p-4 flex justify-center items-center">
                        <img
                            src="/images/image 8.png"
                            alt="X-ray analysis"
                            className="rounded-xl max-w-full h-auto object-contain"
                        />
                    </div>

                    {/* Detection Results */}
                    <div className="col-span-3 bg-[#1E293B] rounded-xl p-4 flex flex-col gap-4">
                        <h3 className="text-sm font-semibold">Detection Results</h3>
                        <div className="space-y-2">
                            {[
                                ["Crown Prosthesis", "bg-gray-700"],
                                ["Maxillary Molar", "bg-blue-700"],
                                ["Obturated Canal", "bg-yellow-800"],
                                ["Enamel", "bg-pink-400"],
                                ["Maxillary Tooth", "bg-red-500"],
                                ["Periapical Pathology", "bg-purple-800"],
                                ["Caries", "bg-teal-600"]
                            ].map(([label, color]) => (
                                <div key={label} className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded ${color}`}></div>
                                    <span className="text-sm text-white">{label}</span>
                                </div>
                            ))}
                        </div>

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

                {/* Notes Section */}
                <div className="mt-6 bg-[#1E293B] p-4 rounded-xl">
                    <h4 className="text-sm font-semibold mb-1">Notes</h4>
                    <p className="text-sm text-gray-400">No notes added yet</p>
                </div>

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
