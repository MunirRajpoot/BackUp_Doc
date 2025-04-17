"use client";

import { CiPlay1 } from "react-icons/ci";
import Image from "next/image";
import "./main.css";

import ImageComparisonSlider from "@/component/ImageComparisonSlider/ImageComparisonSlider";
import TestimonialSection from "@/component/TestimonialSection/TestimonialSection";

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
        <div className="w-full py-16 px-4 flex justify-center items-center">
          <div className="bg-[#383B3F] rounded-2xl p-8 w-full max-w-6xl h-70">
            <div className="flex flex-wrap justify-between items-center gap-6">
              {[
                "/icons/image 2.svg",
                "/icons/image 3.svg",
                "/icons/image 4.svg",
                "/icons/image 5.svg",
              ].map((src, index) => (
                <div
                  key={index}
                  className="bg-white rounded-full h-16 w-16 flex justify-center items-center shadow-md mx-auto"
                >
                  <Image src={src} height={40} width={40} alt={`icon-${index}`} />
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Choose Us */}

        <section className="text-white py-16 px-4 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Text Section */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h4 className="text-lg font-semibold mb-5 text-start">Chose Us</h4>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0067FF] mb-5 text-start">Why Choose Us?</h2>
                <p className="text-1xl text-gray-200 mb-10 text-start">
                  We are privileged to work with hundreds of future-thinking medical,
                  including many of the world’s top hardware, software, and brands. Feel
                  safe and comfortable in establishing.
                </p>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-35 rounded-xl bg-gray-700 flex items-center justify-center text-gray-300 text-lg font-medium shadow-md hover:shadow-lg transition-shadow"
                  >
                    Feature {idx + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="flex justify-center items-center h-full mt-4">
              <Image
                src="/images/image 6.png"
                alt="Doctors Group"
                className="max-w-full h-auto object-contain"
                width={500}
                height={550}
                priority
              />
            </div>
          </div>
        </section>


        <div className="text-center px-4 py-12">
          <p className="text-3xl font-bold mb-8">Get precise results effortlessly with</p>

          <ImageComparisonSlider />
        </div>

        {/* Testimonial Section */}
        <TestimonialSection/>

      </div>
    </div>
  );
}
