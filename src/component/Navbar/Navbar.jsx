"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slice/userSlice";
import { persistor } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { delAuthToken } from "@/app/cookie";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user) || {};
  const { isAuthenticated } = userState;

  const handleLogout = () => {
    dispatch(logout());
    delAuthToken("auth_token");
    persistor.purge();
    router.push("/");
  };

  const navLinks = ["Home", "Doctor", "About", "Contact"];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="flex justify-between items-center py-5 px-6 md:px-12 max-w-[1300px] mx-auto w-full">
        {/* Logo */}
        <Link href="/">
          <Image src="/icons/logo.png" alt="nav-logo" height={50} width={70} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-full gap-8 py-2 px-6">
          {navLinks.map((item, idx) => (
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
              <button
                onClick={handleLogout}
                className="border border-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0067FF] transition"
              >
                Logout
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-[#0067FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform"
              >
                Dashboard
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="border border-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0067FF] transition">
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-[#0067FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            <Menu size={28} className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 h-screen w-3/4 max-w-xs bg-black/90 backdrop-blur-md px-6 py-6 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Sidebar Header with Logo */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image src="/icons/logo.png" alt="drawer-logo" width={60} height={45} />
          </Link>

          {/* Close button inside drawer except on landing page */}
          {pathname !== "/" && (
            <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
              <X size={28} className="text-white" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          {navLinks.map((item, idx) => {
            const path = `/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`;
            const isActive = pathname === path;
            return (
              <Link
                key={idx}
                href={path}
                onClick={() => setMenuOpen(false)}
                className={`text-white text-base font-medium px-4 py-2 rounded-md transition-colors ${isActive ? "bg-[#0067FF]" : "hover:bg-white/10"
                  }`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="border border-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0067FF] transition cursor-pointer"
              >
                Logout
              </button>
              <button
                onClick={() => {
                  router.push("/dashboard");
                  setMenuOpen(false);
                }}
                className="bg-[#0067FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform cursor-pointer"
              >
                Dashboard
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="border border-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0067FF] transition w-full cursor-pointer"
                >
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#0067FF] text-white px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition-transform w-full cursor-pointer"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
