'use client';

import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex justify-center items-start h-screen overflow-y-auto pt-8">
      <div className="flex flex-col items-center bg-white text-black w-full max-w-md p-8 rounded-xl shadow-md">
        <Image src="/icons/logo.png" alt="logo" width={100} height={100} className="mb-4" />
        <h3 className="text-xl font-semibold mb-4">
          Welcome <span className="text-[#0067FF]">Back</span>
        </h3>

        <button className="w-full flex justify-center items-center border border-gray-400 bg-blue-50 py-2 rounded mb-4">
          <Image src="/icons/google.png" height={24} width={24} alt="google-logo" />
        </button>

        <div className="flex items-center w-full my-4">
          <div className="flex-1 border-b border-black"></div>
          <span className="px-3 text-sm text-gray-500">Or</span>
          <div className="flex-1 border-b border-black"></div>
        </div>

        <form className="w-full space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all">
            Sign In
          </button>

          <p className="text-sm text-center">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
