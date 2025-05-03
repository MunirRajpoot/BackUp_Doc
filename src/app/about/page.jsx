import React from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import Link from 'next/link';
import teamData from '../staticData.js'; // Assuming you have a teamData.js file with the team member data


const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto mb-25">
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

            {/* Team Section */}
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-[#0067FF] mb-4">Meet Our Team</h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    A dedicated team of professionals driving innovation in web and frontend development.
                </p>
            </div>

            <div className="flex justify-center px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 max-w-2xl w-full justify-items-center">
                    {teamData.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white/10 rounded-2xl shadow-lg px-6 py-8 text-center flex flex-col items-center transition duration-300 transform hover:scale-105 hover:shadow-xl w-72"
                        >
                            <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-[#0067FF]">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                            <p className="text-[#0067FF] text-base font-medium">{member.profession}</p>
                        </div>
                    ))}
                </div>
            </div>




        </div>
    );
};

export default AboutPage;
