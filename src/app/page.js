"use client";

import { CiPlay1 } from "react-icons/ci";
import Image from "next/image";
import "./main.css";

export default function Home() {
  return (
    <div className="container">
      <div className="content-wrapper">
        {/* Header Section */}
        <div className="text-box">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Get precise results <br />
            <span className="block mt-1">effortlessly with</span>
          </h1>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#0067FF] to-[#A5C9FF] text-transparent bg-clip-text mt-2">
            BackUpDoc
          </h1>

          <div className="text-description">
            <p className="text-white text-sm md:text-base">
              Empowering dentists to provide trustworthy care, enhance patient
              understanding, and increase retention through AI-supported
              diagnostics.
            </p>
          </div>

          <div className="button-wrapper">
            <button className="custom-button">Get Started</button>
            <button className="custom-button flex items-center gap-2">
              <CiPlay1 className="text-lg" /> See Demo
            </button>
          </div>
        </div>

        {/* Appointment Section */}
        <div className="appointment-box flex flex-col md:flex-row justify-center items-center w-full px-10 py-20 gap-10">
          {/* Image and overlapping card */}
          <div className="relative w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/app_img.png"
              alt="Appointment"
              width={400}
              height={400}
              priority
              className="rounded-xl"
            />

            {/* Overlapping card */}
            <div className="absolute -bottom-10 right-10 bg-white rounded-xl shadow-lg p-5 w-90">
              <h3 className="font-bold text-lg text-black">Lorem Ipsum</h3>
              <p className="text-sm text-black mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>

          {/* Text section */}
          <div className="w-full md:w-1/2 text-white mb-auto text-left">
            <p className="text-lg font-semibold">Appointment</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0067FF] py-5">
              Meet Our Specialist This 
              <span className="block">Doctor Meeting</span>
            </h2>
            <p className="pb-5 text-1xl text-gray-200 max-w-90">
              We are privileged to work with hundreds of future-thinking medical
              professionals, including many of the world’s top hardware and software brands.
              Feel safe and comfortable establishing care with us.
            </p>
            <button className="bg-[#0067FF] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition mt-4">
              Book Now
            </button>
          </div>
        </div>



        {/* Cards Section Placeholder */}
        <div className="cards-box mt-20 w-full">
          <div className="cards-wrapper">{/* Cards go here */}
            
          </div>
        </div>
      </div>
    </div>
  );
}
