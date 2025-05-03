'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setErrorMsg('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/account/reset-request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || 'Check your email for a reset link!');
                setEmail('');
            } else {
                setErrorMsg(data.detail || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setErrorMsg('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-start h-screen overflow-y-auto pt-8 bg-[#24282E]">
            <div className="flex flex-col items-center bg-white text-black w-full max-w-md p-8 rounded-xl shadow-md">
                <Image src="/icons/backupdoc-logo.png" alt="logo" width={100} height={100} />
                <h2 className="text-2xl font-semibold text-center mt-2 text-[#0067FF]">Forgot Password</h2>

                <form className="w-full space-y-4 mt-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium text-black">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#A0A0A0]"
                        />
                    </div>

                    {message && <p className="text-green-600 text-sm">{message}</p>}
                    {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all ${loading ? 'opacity-60 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>

                    <p className="text-sm text-center">
                        <span className="text-black">Remember your password? </span>
                        <Link href="/login" className="hover:underline text-[#0067FF]">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Page;
