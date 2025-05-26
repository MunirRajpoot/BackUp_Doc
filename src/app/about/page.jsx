'use client';

import React, { useState } from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { CiVideoOn } from 'react-icons/ci';
import Link from 'next/link';
import Image from 'next/image';
import teamData from '../staticData.js';

const AboutPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleScrollToSection = () => {
        const section = document.getElementById('join-future');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-dark-200 mt-[50px] pb-32 text-center px-4">
                {/* SVG Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-auto" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="#1037ff"
                            fillOpacity="1"
                            d="M0,224L80,192C160,160,320,96,480,101.3C640,107,800,181,960,197.3C1120,213,1280,171,1360,149.3L1440,128V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
                        ></path>
                    </svg>
                </div>

                {/* Main Content */}
                <div className="relative z-10 max-w-2xl mx-auto pt-20">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="rounded-full border-4 border-blue-500 p-1 w-28 h-28 flex items-center justify-center overflow-hidden">
                            <Image
                                src="/icons/logo.png"
                                alt="Engineer"
                                width={80}
                                height={80}
                                className="rounded-full object-cover"
                            />
                        </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                        About Backupdoc
                    </h2>

                    <p className="text-sm sm:text-base text-white leading-relaxed mb-4">
                        Backupdoc AI is a cutting-edge platform revolutionizing radiographic analysis for dental professionals and patients. Our advanced AI ensures accurate, reliable assessments for better decision-making and understanding.
                    </p>

                    <div className="mt-10 flex justify-center gap-4 flex-wrap">
                        <button
                            onClick={() => setShowModal(true)}
                            className="group px-5 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 cursor-pointer"
                        >
                            See Demo
                            <span className="group-hover:translate-x-1 transition-transform">
                                <CiVideoOn />
                            </span>
                        </button>

                        <button
                            onClick={handleScrollToSection}
                            className="group px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 flex items-center gap-2 cursor-pointer"
                        >
                            Learn More
                            <span className="group-hover:translate-x-1 transition-transform">
                                <MdKeyboardDoubleArrowDown />
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4">
                    <div className="relative w-full max-w-4xl h-[80vh]">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-0 bg-white text-black text-lg rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition duration-300 z-50 cursor-pointer"
                        >
                            ✕
                        </button>
                        <iframe
                            className="w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/NgjERPTaC4Y?autoplay=1"
                            title="Demo Video"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Join the Future Section */}
            <section id="join-future" className="container mx-auto px-4 py-20">
                <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto mb-24">
                    {/* Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <Image
                            src="/images/about-img.png"
                            alt="Dental Diagnostics"
                            width={500}
                            height={500}
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain"
                        />
                    </div>

                    {/* Text */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                            Join The Future of <br />
                            <span className="text-[#0067FF]">Dental Diagnostics</span>
                        </h1>
                        <p className="text-base sm:text-lg text-white mb-6">
                            Backupdoc AI meets Dentistry to streamline the process of second opinions for dental radiographs.
                        </p>
                        <Link href="/register">
                            <button className="bg-[#0067FF] hover:bg-[#003E99] text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-300 cursor-pointer">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0067FF] mb-4">
                        Meet Our Team
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                        A dedicated team of professionals driving innovation in web and frontend development.
                    </p>
                </div>

                <div className="flex justify-center px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl w-full justify-items-center">
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
                                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-[#0067FF] text-base font-medium">{member.profession}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutPage;
