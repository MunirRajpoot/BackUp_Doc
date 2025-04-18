'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  return (
    <section className="min-h-screen w-full flex justify-center items-center px-5 py-10">
      <div className="w-full max-w-4xl mx-auto shadow-lg rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Info Section */}
          <div className="bg-gradient-to-br from-[#4b75a5] to-[#3f556d] text-white p-8 lg:p-12 lg:w-5/12 flex flex-col justify-between rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl">
            <div>
              <h4 className="text-xl font-extrabold mb-5">Sign Up</h4>
              <p className="text-base mb-6">
                Nakiese is your portal to discover and enjoy Africa’s hidden treasures.
                From finding the perfect accommodation to enjoying local cuisine, Nakiese
                makes life easy and joyful.
              </p>
            </div>
            <div className="bg-[#f5f5f5cf] text-black p-6 rounded-lg mt-8">
              <p className="mb-2">Already have an account?</p>
              <Link
                href="/login"
                className="font-semibold underline hover:text-[#4b75a5] transition-colors"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Right: Sign Up Form Section */}
          <div className="bg-white/10 p-8 lg:p-12 lg:w-7/12 text-dark rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl">
            <div className="mb-6">
              <Image
                src="/icons/backupdoc-logo.png"
                alt="Nakiese Logo"
                width={120}
                height={80}
                className="mb-6"
              />
              <h5 className="text-lg font-bold mb-5">Leave Everything for us!</h5>
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base mb-5 focus:outline-none focus:border-[#4b75a5] transition-all"
            />

            <button className="w-full bg-[#4b75a5] hover:bg-[#3b5c8c] text-white text-base font-medium py-3 rounded-md transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
