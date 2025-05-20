"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slice/userSlice";
import { persistor } from "@/redux/store";
import { useRouter } from "next/navigation";
import { delAuthToken } from "@/app/cookie";


const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const userState = useSelector((state) => state.user) || {};
  const { isAuthenticated } = userState;
  const dispatch = useDispatch();


  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="flex justify-between items-center py-5 px-6 md:px-12 max-w-[1300px] mx-auto w-full">
        {/* Logo */}
        <Link href="/">
          <Image src="/icons/logo.png" alt="nav-logo" height={50} width={70} priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-full gap-8 py-2 px-6">
          {["Home", "Doctor", "About", "Contact"].map((item, idx) => (
            <Link
              key={idx}
              href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
              className="text-white text-md font-medium hover:text-[#0067FF] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          {isAuthenticated ? (
            <>
              <Link href="#" onClick={() => {
                dispatch(logout());
                delAuthToken("auth_token");
                persistor.purge(); // <- this clears persisted Redux state
                router.push("/"); 
              }}>
                <button className="cursor-pointer border border-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0067FF] transition">
                  Logout
                </button>
              </Link>
             
                <button onClick={()=>router.push('/dashboard')} className="cursor-pointer bg-[#0067FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform">
                  Dashboard
                </button>
          
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="cursor-pointer border border-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0067FF] transition">
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <button className="cursor-pointer bg-[#0067FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 w-full bg-black/90 backdrop-blur-md px-6 py-6 flex flex-col gap-4 z-40">
          {["Home", "Doctor", "About", "Contact us"].map((item, idx) => (
            <Link
              key={idx}
              href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
              onClick={() => setMenuOpen(false)}
              className="text-white text-base font-medium hover:text-[#0067FF] transition-colors"
            >
              {item}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/login">
              <button className="border border-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0067FF] transition w-full">
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-[#0067FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform w-full">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
