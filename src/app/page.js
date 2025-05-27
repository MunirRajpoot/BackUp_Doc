'use client';

import {
  ScanLine,
  CalendarCheck,
  MessagesSquare,
  PlayCircle,
} from 'lucide-react';

import Image from 'next/image';
import MeshNetworkBackground from '@/component/MeshNetworkBackground/MeshNetworkBackground';
import ImageComparisonSlider from '@/component/ImageComparisonSlider/ImageComparisonSlider';
import TestimonialSection from '@/component/TestimonialSection/TestimonialSection';
import ChatModal from '@/component/ChatModal/ChatModal';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const userState = useSelector((state) => state.user) || {};
  const { isAuthenticated } = userState;

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative w-full h-screen overflow-hidden">
        <MeshNetworkBackground />

        <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 lg:mt-[150px]">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
              Get precise results <br />
              <span className="block mt-1">effortlessly with</span>
            </h1>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#0067FF] to-[#A5C9FF] text-transparent bg-clip-text mt-4">
              BackUpDoc
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-white mt-4 leading-relaxed whitespace-pre-line">
              Empowering dentists to provide trustworthy care, enhance patient understanding, <br className="hidden sm:inline" />
              and increase retention through AI-supported diagnostics.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href={isAuthenticated ? '/dashboard' : '/signup'}>
                <button className="cursor-pointer bg-[#0067FF] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:scale-105 transition-transform">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* APPOINTMENT SECTION */}
      <div className="w-full px-4 sm:px-6 lg:px-16 py-10 md:py-20 mb-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Image */}
        <div className="relative w-full lg:w-1/2 flex justify-center items-center">
          <Image
            src="/images/app_img.png"
            alt="Doctor Team"
            width={400}
            height={400}
            priority
            className="rounded-xl w-[80%] sm:w-[70%] md:w-[400px] h-auto z-20"
          />

          <div className="hidden md:block absolute -bottom-16 left-6 w-20 sm:w-24 lg:w-28">
            <Image
              src="/images/pyramid.png"
              alt="Decorative Pyramid"
              width={300}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full lg:w-1/2 px-2 sm:px-4 text-white mt-10 lg:mt-0 text-center lg:text-start">
          <p className="text-xs sm:text-sm font-medium">Appointment</p>

          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#0067FF] py-3 sm:py-5 leading-tight">
            Meet Our Specialist
            <span className="block">This Doctor Meeting</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-200 max-w-full sm:max-w-[90%] mb-5 mx-auto lg:mx-0">
            Book your appointment today with one of our experienced medical specialists. Whether it’s routine care or a specific concern, we’re here to help with professional, compassionate service.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Link href="/doctor" className="inline-block">
              <button className="bg-[#0067FF] hover:bg-blue-700 transition-colors duration-300 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-md font-medium cursor-pointer text-sm sm:text-base">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <section className="text-white py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h4 className="text-sm sm:text-base font-semibold mb-4 text-center lg:text-start">Choose Us</h4>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0067FF] mb-4 text-center lg:text-start">
                Why Choose Us?
              </h2>
              <p className="text-sm sm:text-base text-gray-200 mb-8 text-center lg:text-start">
                We are privileged to work with hundreds of future-thinking medical,
                including many of the world’s top hardware, software, and brands. Feel
                safe and comfortable in establishing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Teeth X-Ray Analysis', icon: <ScanLine className="w-5 h-5 me-2" /> },
                { label: 'Book Appointment', icon: <CalendarCheck className="w-5 h-5 me-2" /> },
                { label: 'Chat with Live Doctors', icon: <MessagesSquare className="w-5 h-5 me-2" /> },
                { label: 'See Demo', icon: <PlayCircle className="w-5 h-5 me-2" /> },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="h-32 rounded-xl bg-white/10 flex items-center justify-start px-4 py-6 text-gray-300 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  {feature.icon}
                  {feature.label}
                </div>
              ))}
            </div>
          </div>

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

      {/* IMAGE COMPARISON */}
      <div className="text-center px-4 sm:px-6 py-12">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-8">
          Get precise results effortlessly with
        </p>
        <ImageComparisonSlider />
      </div>

      {/* TESTIMONIALS */}
      <TestimonialSection />
    </>
  );
}
