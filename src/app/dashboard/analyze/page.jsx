    import React from 'react';
    import { IoCloudUpload } from "react-icons/io5";
    const Page = () => {
        return (
            <div className="p-4 flex flex-col md:flex-row gap-6">
                {/* Left: Upload Section */}
                <div className="flex-1 min-h-[350px] rounded-lg border border-gray-300 flex items-center justify-center p-6 bg-white shadow-sm">
                    <div className="text-center">
                        <div className="text-5xl mb-4 flex justify-center items-center"><IoCloudUpload /></div>
                        <p className="text-sm mb-2">
                            Drag and drop an image here or{' '}
                            <span className="text-blue-600 font-semibold cursor-pointer">click to upload</span>
                        </p>
                        <p className="text-blue-600 font-semibold">Or</p>
                        <p className="italic text-sm mt-1 text-gray-500">
                            Copy and Paste an Image<br />
                            <span className="text-gray-400">Press C + V</span>
                        </p>
                    </div>
                </div>

                {/* Right: Sidebar */}
                <div className="w-full md:w-[350px] min-h-[200px] bg-white rounded-lg p-6 flex flex-col justify-between border border-gray-300 shadow-sm">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">
                            Hi! <span className="font-bold">Usman Tahir</span>
                        </h2>
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Analyze X-Ray</p>
                            <button className="bg-blue-600 text-white font-medium py-2 rounded-lg w-full hover:bg-blue-500 transition">
                                Start Process
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Page;
