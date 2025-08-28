"use client";

import { clsx } from "clsx";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { PiSunglassesFill } from "react-icons/pi";
import { MdGroups, MdGroupAdd, MdHouse } from "react-icons/md";
import Link from "next/link";
import Button from "./ui/button";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const links = [
    {
      href: "/",
      label: "Home",
      icon: <MdHouse size={22} />,
    },
    { href: "/crews", label: "Crews", icon: <MdGroups size={22} /> },
    {
      href: "/crews/new",
      label: "Create Crew",
      icon: <MdGroupAdd size={22} />,
    },
  ];

  return (
    <nav>
      <Button
        className="absolute left-4 top-5 z-50 flex items-center justify-center bg-background p-3 transform-skew-content text-foreground md:hidden"
        onClick={toggleSidebar}
      >
        {!isOpen ? <FaBars size={20} /> : <FaTimes size={20} />}
      </Button>

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 transform border-r border-neutral-700 bg-sidebar px-4 py-6 text-foreground shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="mb-6 mt-16 flex flex-row items-center justify-start gap-3 px-2 md:mt-4">
          <PiSunglassesFill size={36} />
          <h1
            className="text-3xl tracking-wide"
          >
            CrewVault
          </h1>
        </div>

        <nav className="space-y-2">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={closeSidebar}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 text-base transition-colors hover:bg-foreground/10 hover:text-foreground",
                pathname === href && "bg-foreground/10",
              )}
            >
              {icon}
              <span className="mt-1">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </nav>
  );
};
