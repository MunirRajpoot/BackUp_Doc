'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";

const Page = () => {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Redux Dispatcher
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({ email, password }),

      });

      const data = await response.json();


      if (!response.ok) {
        setErrorMsg(data.detail || 'Login failed. Please try again.');
      } else {

        Cookies.set('auth_token', data.token, {
          secure: true,
          sameSite: 'Strict',
          expires: 7,
        });

        // ✅ Update Redux state
        dispatch(setUser({
          user: data?.user,
          user_type: data?.user_type || null,
        }));

        router.push(`/`);
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-8 z-20 overflow-y-auto bg-[#24282E]">
      <div className="flex flex-col items-center bg-white text-black w-[95%] max-w-sm p-6 sm:p-8 rounded-xl shadow-md">
        <Image src="/icons/backupdoc-logo.png" alt="logo" width={120} height={120} />
        <h3 className="text-2xl font-semibold mt-4 text-[#0067FF]">
          Welcome Back
        </h3>

        <form className="w-full mt-8" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-black">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="font-medium text-black">
                Password
              </label>
              <Link href="/forgot-password" className="text-[#0067FF] hover:underline text-sm">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm mb-4">{errorMsg}</p>
          )}

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-black">
              Don't have an account?{' '}
              <Link href="/register" className="text-[#0067FF] hover:underline">
                Sign Up
              </Link>
            </p>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer flex items-center gap-2"
            >
              {loading ? 'Signing In...' : (
                <>
                  <Image src="/icons/angle-right.svg" alt="arrow" width={10} height={10} />
                  Sign In
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
