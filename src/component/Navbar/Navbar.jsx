"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // You can also use Heroicons if preferred
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="text-white  w-full">
      <div className="flex justify-between items-center py-6 px-6 md:px-12 max-w-[1300px] mx-auto w-full">
        {/* Logo */}
        <Image src="/icons/logo.png" alt="nav-logo" height={50} width={70} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center bg-white/10 rounded-full gap-8 py-2 px-6">
          <Link href="/" className="text-white text-sm font-medium hover:text-[#0067FF] transition-colors">Home</Link>
          <Link href="/doctor" className="text-white text-sm font-medium hover:text-[#0067FF] transition-colors">Doctor</Link>
          <Link href="/about" className="text-white text-sm font-medium hover:text-[#0067FF] transition-colors">About</Link>
          <Link href="/contact" className="text-white text-sm font-medium hover:text-[#0067FF] transition-colors">Contact us</Link>
          <Link href="/started">
            <button className="bg-[#0067FF] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform w-28 cursor-pointer">
              Get Started
            </button>
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link href="/login">
            <button className="border border-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0067FF] transition cursor-pointer">
              Sign In
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-[#0067FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 flex flex-col gap-4 animate-slideDown">
          <Link href="/" className="text-white text-sm font-medium hover:text-[#0067FF] transition-colors">Home</Link>
          <Link href="/doctor" className="text-white text-sm font-medium hover:text-[#0067FF] transition-colors">Doctor</Link>
          <Link href="/about" className="text-white text-sm font-medium hover:text-[#0067FF] transition-colors">About</Link>
          <Link href="/contact" className="text-white text-sm font-medium hover:text-[#0067FF] transition-colors">Contact us</Link>
          <Link href="/started">
            <button className="bg-[#0067FF] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform w-full">
              Get Started
            </button>
          </Link>
          <div className="flex flex-col gap-2 mt-4">
            <button className="border border-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0067FF] transition">Sign In</button>
            <button className="bg-[#0067FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform">Sign Up</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
