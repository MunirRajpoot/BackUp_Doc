import React from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import Link from 'next/link';
import teamData from '../staticData.js'; // Assuming you have a teamData.js file with the team member data
import Image from 'next/image';


const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            {/* <div className="h-auto lg:h-[250px] mt-[50px] bg-gradient-to-r from-[#0067FF] to-black rounded-2xl text-white mb-[30px]">
                <div className="flex flex-col justify-center h-full p-10  max-w-5xl  text-left">
                    <h1 className="text-2xl lg:text-2xl font-bold mb-4">About Us</h1>
                    <p className="text-base lg:text-md mb-6 leading-relaxed text-white">
                        We are a passionate team dedicated to building innovative solutions that solve real-world problems.
                        Our mission is to deliver top-notch experiences through design, technology, and creativity.
                        With a focus on user-centric development and a love for innovation, we strive to make a lasting impact.
                    </p>
                    <button className="w-fit cursor-pointer bg-white  text-black font-semibold py-3 px-6 rounded-lg shadow transition duration-300 flex items-center gap-2">
                        Learn more
                        <MdKeyboardDoubleArrowDown className="text-xl" />
                    </button>
                </div>
            </div> */}

            {/* Header Section */}
            <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto mb-25">
                <div>
                    <Image
                        src={'/images/image 6.png'}
                        alt="About Us"
                        height={500}
                        width={500}
                    />
                </div>
                <div className='mt-10'>
                    <h1 className="text-4xl md:text-5xl mb-5 font-bold text-white leading-tight">
                        Join The Future of <br />
                        <span className="text-[#0067FF]">Dental Diagnostics</span>
                    </h1>
                    <p className="text-lg text-white mb-6">
                        Backupdoc AI meets Dentistry to streamline the process of second opinions for dental radiographs.
                    </p>
                    <button className="w-fit cursor-pointer bg-white  text-black font-semibold py-3 px-6 rounded-lg shadow transition duration-300 flex items-center gap-2">
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
    );
};

export default AboutPage;
