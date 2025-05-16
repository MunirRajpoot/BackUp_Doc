"use client";

import {
  LibraryBig,
  LayoutDashboard,
  Waypoints,
  UserRound,
  Clipboard,
  FileBarChart2Icon,
  UploadCloud,
  SendIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Activity, FileBarChart2, HomeIcon, User, Brain } from "lucide-react";
import { useSelector } from "react-redux";


export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector((state) => state.user) || {};
  const { user_type } = userState;

  const navItems = [
    { href: "/", icon: HomeIcon, label: "home" },           // Dashboard icon
    { href: "/dashboard", icon: LayoutDashboard, label: "Patients Management" },           // Dashboard icon
    { href: "/dashboard/analyze", icon: Brain, label: "Analyze" },               // Brain icon for analysis
    { href: "/dashboard/activity", icon: Activity, label: "Activity" },          // Activity icon
    { href: "/dashboard/chat", icon: SendIcon, label: "Chat" },                // User profile icon
    { href: "/dashboard/profile", icon: User, label: "Profile" },                // User profile icon
  ];


  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div className="group flex flex-col bg-[#1e2227] text-white transition-all duration-300 ease-in-out w-16 hover:w-54 z-10">
        <nav className="flex flex-col mt-4 space-y-2 px-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            // Skip "Patient Management" for patients
            if (user_type === "patient" && label === "Patients Management") {
              label = "Upload X-Ray";
              Icon = UploadCloud;
            }
            if (user_type === "patient" && label === "Chat") {
              return null; // Skip "Chat" for patients
            }
            if (user_type === "doctor" && label === "Analyze") {
              return null; // Skip "Chat" for patients
            }

            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 p-2 rounded-md transition-all duration-300 ease-in-out ${isActive
                  ? "bg-[#1976D2] text-white"
                  : "text-[#1976D2] hover:bg-[#2b3139]"
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span
                  className="whitespace-nowrap opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0 
        transition-all duration-300 ease-in-out"
                >
                  {label}
                </span>
              </Link>
            );
          })}

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-dark text-white ">
        {children}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0" }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[50vw] bg-white shadow-lg z-40 p-2"
          >
            <nav className="!mt-14 p-0">
              <ul className="p-0">
                {[
                  {
                    href: "/dashboard",
                    icon: LayoutDashboard,
                    label: "Dashboard",
                  },
                  {
                    href: "/dashboard/courses",
                    icon: LibraryBig,
                    label: "Courses",
                  },
                  {
                    href: "/dashboard/practice",
                    icon: Clipboard,
                    label: "Practice",
                  },
                  {
                    href: "/dashboard/activity",
                    icon: Waypoints,
                    label: "Activity",
                  },
                  {
                    href: "/dashboard/profile",
                    icon: UserRound,
                    label: "Profile",
                  },
                ].map(({ href, icon: Icon, label }, ind) => (
                  <li key={ind}>
                    <Link
                      href={href}
                      className={`flex items-center gap-3 !p-2.5 rounded-lg font-bold ${pathname === href
                        ? "bg-[#1976D2] text-white"
                        : "text-[#1976D2]"
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
