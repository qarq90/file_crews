"use client";

import Link from "next/link";
import Button from "./ui/Button";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { PiSunglassesFill } from "react-icons/pi";
import { MdGroupAdd } from "react-icons/md";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <Button
        className="absolute left-4 top-5 z-50 flex items-center justify-center rounded-md bg-hover p-3 text-foreground md:hidden"
        onClick={toggleSidebar}
      >
        {!isOpen ? <FaBars size={22} /> : <FaTimes size={22} />}
      </Button>

      <div
        className={`fixed left-0 top-0 z-40 flex h-full w-4/5 max-w-xs transform flex-col justify-between border-r-2 border-foreground bg-background p-3 pt-16 shadow-lg transition-transform duration-300 ease-in-out md:fixed md:w-1/6 md:translate-x-0 md:pt-2 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div
            className="bg-hover/50 mb-4 mt-5 flex h-16 items-center justify-start gap-3 rounded-md bg-foreground px-4 py-2 text-3xl text-background"
            onClick={closeSidebar}
            style={{ fontFamily: '"Josefin Sans", serif' }}
          >
            <PiSunglassesFill size={42} />
            <div className="pt-2">CrewVault</div>
          </div>
          <Link
            href="/crews"
            className="my-1 flex items-center justify-start gap-3 rounded-md px-4 py-2 text-xl hover:bg-hover hover:opacity-75"
            onClick={closeSidebar}
          >
            <MdGroups size={36} /> Crews
          </Link>
          <Link
            href="/create-crew"
            className="my-1 flex items-center justify-start gap-3 rounded-md px-4 py-2 text-xl hover:bg-hover hover:opacity-75"
            onClick={closeSidebar}
          >
            <MdGroupAdd size={36} /> Create Crew
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-20 opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};
