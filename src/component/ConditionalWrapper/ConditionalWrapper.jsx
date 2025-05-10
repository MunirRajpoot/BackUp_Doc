"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function ConditionalWrapper({ children }) {
  const pathname = usePathname();

  const hideNavbarRoutes = [
    "404",
    "login",
    "register",
    "forgot-password",
    "reset-password",
    "dashboard",
    "thankyou",
    "chat-system"
  ];

  const hideFooterRoutes = [...hideNavbarRoutes];

  const showNavbar = !hideNavbarRoutes.includes(pathname.split("/")[1]);
  const showFooter = !hideFooterRoutes.includes(pathname.split("/")[1]);

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
