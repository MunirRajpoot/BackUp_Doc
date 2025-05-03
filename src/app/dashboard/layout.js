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
            <div className="md:w-[11vw] bg-dark w-0 shadow-xl md:block hidden z-50">
                <div className="h-[8vw] max-h-24 flex items-center">
                    <Link href="/" style={{ display: "contents" }}>
                        <Image
                            src="/icons/logo.png"
                            alt="Logo"
                            width={140}
                            height={80}
                            className="m-auto 
                                        w-12 h-8
                                        md:w-16 md:h-10
                                        lg:w-18 lg:h-10
                                        xl:w-20 xl:h-12
                                        2xl:w-24 2xl:h-14"
                        />
                    </Link>
                </div>


                <nav className="text-dark lg:!p-2 !p-1">
                    <ul className="text-[#1976D2] p-0">
                        <li>
                            <Link
                                href="/dashboard"
                                className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${pathname === "/dashboard"
                                    ? "bg-[#1976D2] rounded text-white"
                                    : ""
                                    }`}
                            >
                                <LayoutDashboard
                                    className={`${pathname === "/dashboard"
                                        ? "text-white"
                                        : "text-[#1976D2]"
                                        } 
                  2xl:!w-5 2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4`}
                                />
                                <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/courses"
                                className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${pathname === "/dashboard/courses"
                                    ? "bg-[#1976D2] rounded text-white"
                                    : ""
                                    }`}
                            >
                                <LibraryBig className="2xl:!w-5 2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4" />
                                <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
                                    Analyze
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/dashboard/activity"
                                className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${pathname === "/dashboard/activity"
                                    ? "bg-[#1976D2] rounded text-white"
                                    : ""
                                    }`}
                            >
                                <Waypoints className="2xl:!w-5 2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4" />
                                <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
                                    Activity
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/profile"
                                className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${pathname === "/dashboard/profile"
                                    ? "bg-[#1976D2] rounded text-white"
                                    : ""
                                    }`}
                            >
                                <UserRound className="2xl:!w-5 2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4" />
                                <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
                                    Profile
                                </span>
                            </Link>
                        </li>
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
            <main className="flex-1 bg-gray-100 overflow-y-auto md:w-[89vw] w-full" style={{ color: "black" }}>
                <nav className="fixed top-0 right-0 md:w-[89vw] w-full flex items-center justify-between !h-[6vw] max-h-24 shadow-md md:p-4 px-2 py-4 z-40" style={{ backgroundColor: "black" }}>
                    <div>
                        <Image
                            src="/Images/logo.svg"
                            alt="Logo"
                            width={180}
                            height={180}
                            className="mx-auto 2xl:!w-40 2xl:!h-20 xl:!w-35 xl:!h-15 lg:!w-26 lg:!h-13 md:!w-22 md:!h-10 !w-19 !h-8 md:hidden block"
                        />
                    </div>
                    <div className="md:flex items-center gap-2 hidden">
                        {/* <Bell className="cursor-pointer 2xl:!w-8 2xl:!h-8 xl:!w-6 xl:!h-6 lg:!w-5 lg:!h-5 w-4 h-4" /> */}
                        <Image
                            src="/Images/dashUser.png"
                            alt="Avatar"
                            width={40}
                            height={40}
                            className="cursor-pointer 2xl:!w-10 2xl:!h-10 xl:!w-8 xl:!h-8 lg:!w-7 lg:!h-7 w-6 h-6"
                        />
                    </div>
                    <div className="block md:hidden">
                        {isOpen ? (
                            <X
                                onClick={() => setIsOpen(false)}
                                className="cursor-pointer !text-gray-800"
                            />
                        ) : (
                            <Menu
                                onClick={() => setIsOpen(true)}
                                className="cursor-pointer !text-gray-800"
                            />
                        )}
                    </div>
                </nav>
                <div
                    style={{ marginTop: "min(10vw, 140px)" }}
                    className="xl:px-4 px-3 overflow-y-auto md:!pt-0 sm:!pt-6 !pt-10"
                >
                    {children}


                </div>
            </main>
        </div>
    );
}
