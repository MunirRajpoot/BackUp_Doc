'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen pt-8 z-20 overflow-y-auto bg-#24282E">
      <div className="flex flex-col items-center bg-white/10 text-black w-[95%] max-w-sm p-6 sm:p-8 rounded-xl shadow-md">
        <Image src="/icons/backupdoc-logo.png" alt="logo" width={120} height={120} />
        <h3 className="text-2xl font-semibold mt-4 bg-gradient-to-r from-[#0067FF] via-[#95BDF8] to-[#F4F4F4] bg-clip-text text-transparent">
          Welcome Back
        </h3>

        <form className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-white">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/50"
              placeholder="Enter your email address"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="font-medium text-white">
                Password
              </label>
              <Link href="/forgot-password" className="text-[#A5C9FF] hover:underline text-sm">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/50"
              placeholder="Enter your password"
            />
          </div>



          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-white">
              Don't have an account?{' '}
              <Link href="/register" className="text-[#A5C9FF] hover:underline">
                Sign Up
              </Link>
            </p>
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              <Image src="/icons/angle-right.svg" alt="arrow" width={10} height={10} className="inline-block mr-1 mb-0.5" />
              Sign In
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Page;
