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
  ];

  const hideFooterRoutes = [...hideNavbarRoutes];

  const showNavbar = !hideNavbarRoutes.includes(pathname.split("/")[1]);
  const showFooter = !hideFooterRoutes.includes(pathname.split("/")[1]);

  return (
    <>
      {showNavbar && <Navbar />}

      <main>
        {children}
        {/* {showNavbar && showFooter && <CookieTooltip />} */}
      </main>

      {showFooter && <Footer />}

    </>
  );
}
