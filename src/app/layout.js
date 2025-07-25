"use client";

import "./globals.css";
import clsx from "clsx";
import { useUIStore } from "@/stores/UIStore";
import { Sidebar } from "@/components/Sidebar";
import { AppWrapper } from "@/components/Wrapper";
import { FullLoader } from "@/components/loaders/Full";

export default function RootLayout({ children }) {
  const { isUseLoading } = useUIStore();
  return (
    <html lang="en">
      <body>
        <AppWrapper>
          <Sidebar />
          {children}
        </AppWrapper>
        <div
          className={clsx(
            "fixed left-0 top-0 z-[1000] h-screen w-screen bg-black transition-opacity duration-300",
            isUseLoading ? "visible opacity-40" : "invisible opacity-0",
          )}
        ></div>
        {isUseLoading && <FullLoader />}
      </body>
    </html>
  );
}
