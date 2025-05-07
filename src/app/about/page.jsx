import React from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import Link from 'next/link';
import teamData from '../staticData.js'; // Assuming you have a teamData.js file with the team member data
import Image from 'next/image';

const AboutPage = () => {
    return (
        <>
            <section className="relative bg-dark-200 mt-[50px] pb-32">
                {/* White wave bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        className="w-full h-auto"
                        viewBox="0 0 1440 320"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#1037ff"
                            fillOpacity="1"
                            d="M0,224L80,192C160,160,320,96,480,101.3C640,107,800,181,960,197.3C1120,213,1280,171,1360,149.3L1440,128V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
                        ></path>
                    </svg>
                </div>

                {/* Main Content */}
                <div className="relative z-10 max-w-2xl mx-auto text-center px-4 pt-20">
                    {/* Circular Image */}
                    <div className="flex justify-center mb-6">
                        <div className="rounded-full border-4 border-blue-500 p-1 w-28 h-28 flex items-center justify-center overflow-hidden">
                            <Image
                                src="/icons/logo.png" // make sure the image is in /public/images
                                alt="Engineer"
                                width={80}
                                height={80}
                                className="rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-4 text-white">About Company</h2>

                    {/* Description */}
                    <p className="text-white text-base leading-relaxed mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at lacusat augue aliquet
                        posuere. Aliquam fringilla elementum varius. Nunclobortis nisl in nibh commodo, quis
                        placerat nisi feugiat.
                    </p>

                    

                    {/* Buttons */}
                    <div className="mt-10 flex justify-center gap-4">
                        <button className="px-5 py-2 cursor-pointer border border-white-500 text-dark rounded-full hover:bg-white hover:text-black transition">
                            See Demo
                        </button>
                        <button className="px-5 py-2 cursor-pointer flex item-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                            Learn More
                            <MdKeyboardDoubleArrowDown className='mt-1 ms-2'/>
                        </button>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-4 py-20">
                {/* Header Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto mb-25">
                    <div>
                       
                    </div>
                    <div>
                    <h1 className="text-4xl mb-5 md:text-5xl font-bold text-white leading-tight">
                            Join The Future of <br />
                            <span className="text-[#0067FF]">Dental Diagnostics</span>
                        </h1>
                        <p className="text-lg text-white mb-6">
                            Backupdoc AI meets Dentistry to streamline the process of second opinions for dental radiographs.
                        </p>
                        <button className="bg-[#0067FF] hover:bg-[#003E99] text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-300 flex gap-1 cursor-pointer">
                            Sign Up
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
        </>
    );
};

export default AboutPage;
