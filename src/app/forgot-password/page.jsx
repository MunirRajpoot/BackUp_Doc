'use client';

import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
    return (
        <div className="flex justify-center align-items-center items-start h-screen overflow-y-auto pt-8">
            <div className="flex flex-col items-center bg-white text-black w-full max-w-md p-8 rounded-xl shadow-md">
                <div className="text-center mb-3">
                    <h2>Forgot Password</h2>
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
                    <button type="submit" className="w-full mb-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all">
                        Submit
                    </button>

                    <p className="text-sm text-center">
                        <span className=''>Remember you Password?{' '}</span>
                        <Link href="/login" className="text-blue-600 hover:underline ">login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Page;
