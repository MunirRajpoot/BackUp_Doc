'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex justify-center items-start min-h-screen pt-8 overflow-y-auto bg-gray-100">
      <div className="flex flex-col items-center bg-white text-black w-full max-w-sm p-8 rounded-xl shadow-md">
        <Image src="/icons/logo.png" alt="logo" width={100} height={100} />
        <h3 className="text-2xl font-semibold mt-4">
          Welcome <span className="text-blue-600">Back</span>
        </h3>

        <button className="w-full flex justify-center items-center mt-6 p-2 border border-gray-400 bg-blue-50 rounded-md hover:bg-blue-100 transition">
          <Image src="/icons/google.png" height={30} width={30} alt="google-logo" />
        </button>

        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-black mr-3" />
          <span className="text-sm font-medium text-gray-600">Or</span>
          <div className="flex-1 h-px bg-black ml-3" />
        </div>

        <form className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email address"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between mb-4 text-sm">
            <label htmlFor="remember" className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id="remember"
                className="form-checkbox text-blue-600"
              />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
