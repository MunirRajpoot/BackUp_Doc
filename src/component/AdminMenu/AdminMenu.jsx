"use client";
import {
  Scale,
  ChartColumnStacked,
  List,
  BookText,
  Bookmark,
  FileQuestion,
  Database,
  User,
  LayoutDashboard,
  PackageOpen,
  ChevronDown,
  LibraryBig,
  Monitor,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

function AdminMenu({ pathname }) {
  const [isPackageSubMenuOpen, setIsPackageSubMenuOpen] = useState(false);
  return (
    <nav className="text-white lg:!p-2 !p-1">
      <ul className="text-[#1976D2] p-0">
        <li>
          <Link
            href="/dashboard/admin"
            className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${
              pathname === "/dashboard/admin" ? "bg-[#1976D2] rounded text-white" : ""
            }`}
          >
            <LayoutDashboard className="2xl:!w-5 2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4" />
            <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
              Dashboard
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/authority"
            className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${
              pathname === "/dashboard/admin/authority"
                ? "bg-[#1976D2] rounded text-white"
                : ""
            }`}
          >
            <Scale className="2xl:!w-5 2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4" />
            <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
              Authority
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/category"
            className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${
              pathname === "/dashboard/admin/category"
                ? "bg-[#1976D2] rounded text-white"
                : ""
            }`}
          >
            <ChartColumnStacked className="2xl:!w-5 2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4" />
            <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
              Category
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/type"
            className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${
              pathname === "/dashboard/admin/type"
                ? "bg-[#1976D2] rounded text-white"
                : ""
            }`}
          >
            <List
              className="2xl:!w-5
              2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4"
            />
            <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
              Type
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/subject"
            className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${
              pathname === "/dashboard/admin/subject"
                ? "bg-[#1976D2] rounded text-white"
                : ""
            }`}
          >
            <BookText
              className="2xl:!w-5
              2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4"
            />
            <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
              Subject
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/topic"
            className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${
              pathname === "/dashboard/admin/topic"
                ? "bg-[#1976D2] rounded text-white"
                : ""
            }`}
          >
            <Bookmark
              className="2xl:!w-5
              2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4"
            />
            <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
              Topic
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/question"
            className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${
              pathname === "/dashboard/admin/question"
                ? "bg-[#1976D2] rounded text-white"
                : ""
            }`}
          >
            <FileQuestion
              className="2xl:!w-5
              2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4"
            />
            <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
              Question
            </span>
          </Link>
        </li>
        <li>
          {/* Menu Item */}
          <span
            onClick={() => setIsPackageSubMenuOpen((prev) => !prev)}
            className="cursor-pointer flex items-center gap-2 my-2 lg:p-2 p-1 font-bold"
          >
            <PackageOpen className="w-5 h-5" />
            Packages
            <motion.div
              animate={{ rotate: isPackageSubMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </span>

          {/* Submenu */}
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isPackageSubMenuOpen ? "auto" : 0,
              opacity: isPackageSubMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-[#1976D2] ps-3 overflow-hidden"
          >
            <li>
              <Link
                href="/dashboard/admin/package/individual"
                className={`flex items-center gap-2 my-2 lg:p-2 p-1 font-bold ${
                  pathname === "/dashboard/admin/package/individual"
                    ? "bg-[#1976D2] rounded text-white"
                    : ""
                }`}
              >
                <BookText className="w-5 h-5" />
                <span>Individual</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/package/display"
                className={`flex items-center gap-2 my-2 lg:p-2 p-1 font-bold ${
                  pathname === "/dashboard/admin/package/display"
                    ? "bg-[#1976D2] rounded text-white"
                    : ""
                }`}
              >
                <Monitor className="w-5 h-5" />
                <span>Display</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/package/bulk"
                className={`flex items-center gap-2 my-2 lg:p-2 p-1 font-bold ${
                  pathname === "/dashboard/admin/package/bulk"
                    ? "bg-[#1976D2] rounded text-white"
                    : ""
                }`}
              >
                <LibraryBig className="w-5 h-5" />
                <span>Bulk</span>
              </Link>
            </li>
          </motion.ul>
        </li>
        <li>
          <Link
            href="/dashboard/admin/database"
            className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${
              pathname === "/dashboard/admin/database"
                ? "bg-[#1976D2] rounded text-white"
                : ""
            }`}
          >
            <Database
              className="2xl:!w-5
              2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4"
            />
            <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
              Database
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/user"
            className={`flex items-center gap-2 my-2 lg:!p-2 !p-1 font-bold ${
              pathname === "/dashboard/admin/user"
                ? "bg-[#1976D2] rounded text-white"
                : ""
            }`}
          >
            <User
              className="2xl:!w-5
              2xl:!h-5 xl:!w-4 xl:!h-4 lg:!w-3 lg:!h-3 md:!w-3 md:!h-3 !w-4 !h-4"
            />
            <span className="2xl:!text-[16px] xl:!text-[13px] lg:!text-[10px] md:!text-[9px] !text-[6px] !hidden md:!block">
              User
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminMenu;
