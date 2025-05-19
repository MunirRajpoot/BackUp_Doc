'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");       // For email string
  const [message, setMessage] = useState("");   // For message text
  const [messageType, setMessageType] = useState(""); // "error", "info", etc.
  const [isSubmit, setIsSubmit] = useState(true);


  const emailHandler = async (event) => {
    const inputEmail = event.target.value.trim();
    setEmail(inputEmail); // Update input field value

    // ✅ Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputEmail)) {
      setMessage('❌ Invalid email address.');
      setMessageType('error');
      setIsSubmit(true);
      return;
    }

    setMessage('🔍 Checking email...');
    setMessageType('info');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/email-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail }),
      });

      const data = await response.json();

      if (response.ok && !data.exists) {
        // Email does NOT exist – allow signup
        setMessage(`✔️ ${data.message || 'Account is available.'}`);
        setMessageType('success');
        setIsSubmit(false);
      } else {
        // Email exists – block signup
        setMessage(`⚠️ ${data.message || 'Email already exists.'}`);
        setMessageType('warning');
        setIsSubmit(true);
      }
    } catch (error) {
      console.error('API error:', error);
      setMessage('🚨 Server error. Please try again.');
      setMessageType('error');
      setIsSubmit(true);
    }
  };

  const handleSubmit = () => {
    if (!isSubmit) {
      router.push(`/register/process?m=${email}`); // redirect to next page
    }
  };

  return (
    <section className="min-h-screen w-full flex justify-center items-center px-5 py-10">
      <div className="w-full max-w-4xl mx-auto shadow-lg rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Info */}
          <div className="bg-gradient-to-br from-[#022b68] to-[#003E99] text-white p-8 lg:p-12 lg:w-5/12 flex flex-col justify-between rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl">
            <div>
              <h4 className="text-xl font-extrabold mb-5">Sign Up</h4>
              <p className="text-base mb-6">
                Nakiese is your portal to discover and enjoy Africa’s hidden treasures.
              </p>
            </div>
            <div className="bg-[#f5f5f5cf] text-black p-6 rounded-lg mt-8">
              <p className="mb-2">Already have an account?</p>
              <Link
                href="/login"
                className="font-semibold underline hover:text-[#4b75a5] transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-8 lg:p-12 lg:w-7/12 text-dark rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl">
            <div className="mb-6">
              <Image
                src="/icons/backupdoc-logo.png"
                alt="Nakiese Logo"
                width={120}
                height={80}
                className="mb-6"
              />
              <h5 className="text-lg font-bold mb-5 text-black">Leave Everything for us!</h5>
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={emailHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base mb-2 focus:outline-none focus:border-[#4b75a5] placeholder:text-gray-500 text-black"
            />

            {message && (
              <p
                className={`text-sm mb-4 ${messageType === 'success'
                  ? 'text-green-600'
                  : messageType === 'error'
                    ? 'text-red-500'
                    : messageType === 'warning'
                      ? 'text-yellow-600'
                      : 'text-blue-500'
                  }`}
              >
                {message}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmit}
              className={`w-full cursor-pointer ${isSubmit ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0067FF] hover:bg-[#003E99]'
                } text-white text-base font-medium py-3 rounded-md transition-colors`}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
