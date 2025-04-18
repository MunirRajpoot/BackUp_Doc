import React from 'react'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
const page = () => {
    return (
        <>
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Join The Future of <br />
                            <span className="text-[#0067FF]">Dental Diagnostics</span>
                        </h1>
                    </div>
                    <div>
                        <p className="text-lg text-white mb-6">
                            Backupdoc AI meets Dentistry to streamline the process of second opinions for dental radiographs.
                        </p>
                        <button className="bg-[#0067FF] hover:bg-[#003E99] text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-300 flex gap-1 cursor-pointer">
                            Learn more
                            <MdKeyboardDoubleArrowDown className='mt-1' />
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default page
