"use client";
import {
    Bell,
    LibraryBig,
    Clipboard,
    LayoutDashboard,
    Waypoints,
    UserRound,
    Menu,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import AdminMenu from "@/component/AdminMenu/AdminMenu";
import { useSelector } from "react-redux";
// import Link from "next/link";
export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    //   const { isAdmin } = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="group md:w-[4rem] hover:md:w-[11vw] bg-dark w-0 shadow-xl md:block hidden z-50 transition-all duration-300 ease-in-out overflow-hidden">
                

                <nav className="text-dark lg:!p-2 !p-1">
                    <ul className="text-[#1976D2] p-0">
                        {[
                            {
                                href: "/dashboard",
                                icon: LayoutDashboard,
                                label: "Dashboard",
                            },
                            {
                                href: "/dashboard/analyze",
                                icon: LibraryBig,
                                label: "Analyze",
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
                        ].map(({ href, icon: Icon, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold transition-all duration-300 ease-in-out
                            ${pathname === href ? "rounded text-white" : ""}`}
                                >
                                    <Icon
                                        className={`flex-shrink-0 mx-auto 
                                        ${pathname === href ? "text-white" : "text-[#1976D2]"} 
                                        w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8`}
                                    />

                                    <span
                                        className="transition-all duration-300 ease-in-out overflow-hidden max-w-0 group-hover:max-w-[8vw] opacity-0 group-hover:opacity-100 whitespace-nowrap 
                            2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px]"
                                    >
                                        {label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0" }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-0  right-0 h-full w-[50vw] bg-white shadow-lg z-40 p-2"
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

            {/* Main Content */}
            <main className="flex-1 bg-dark overflow-y-auto md:w-[89vw] w-full" style={{ color: "black" }}>
                
                <div
               
                >
                    {children}


                </div>
            </main>
        </div>
    );
}
