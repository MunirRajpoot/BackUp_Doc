'use client';

import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
    return (
        <div className="flex justify-center align-items-center items-start h-screen overflow-y-auto pt-8">
            <div className="flex flex-col items-center bg-white text-black w-full max-w-md p-8 rounded-xl shadow-md">
                <div className="text-center mb-3">
                    <h2>Reset Password</h2>
                </div>

                <form className="w-full space-y-4">
                    <div>
                        <label htmlFor="nPassword" className="block mb-1 font-medium">New Password</label>
                        <input
                            type="password"
                            id="nPassword"
                            placeholder="Create a new password"
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Confirm Password</label>
                        <input
                            type="cPassword"
                            id="cPassword"
                            placeholder="Confirm your password"
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full mb-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all">
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Page;
