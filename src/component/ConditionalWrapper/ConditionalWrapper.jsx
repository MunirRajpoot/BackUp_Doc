"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import userNotify from "@/hooks/notify";
import { use, useEffect } from "react";



export default function ConditionalWrapper({ children }) {
  const pathname = usePathname();

  const { connectWebSocket, disconnectWebSocket } = userNotify();

  const hideNavbarRoutes = [
    "404",
    "login",
    "register",
    "forgot-password",
    "reset-password",
    "dashboard",
    "thankyou",
    "chat"
  ];

  const hideFooterRoutes = [...hideNavbarRoutes];

  const showNavbar = !hideNavbarRoutes.includes(pathname.split("/")[1]);
  const showFooter = !hideFooterRoutes.includes(pathname.split("/")[1]);

  useEffect(() => {
    console.log("Connecting to WebSocket for notifications...");
    connectWebSocket(true);
  }, [connectWebSocket]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {showNavbar && <Navbar />}


        <main className="flex-grow">
          {children}
          {/* {showNavbar && showFooter && <CookieTooltip />} */}
        </main>

        {showFooter && <Footer />}
      </div>

    </>
  );
}
