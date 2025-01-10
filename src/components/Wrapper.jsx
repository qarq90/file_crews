import React from "react";

export function AppWrapper({ children }) {
  return <div className="flex">{children}</div>;
}

export function BodyWrapper({ children }) {
  return (
    <div className="mt-16 w-screen px-4 pb-3 md:ml-64 md:mt-5 md:px-12">
      {children}
    </div>
  );
}

export function AuthWrapper({ children }) {
  return (
    <div className="m-4 mt-[-16] flex h-screen w-full justify-center md:m-0 md:ml-96 md:mt-0 md:w-[65%]">
      {children}
    </div>
  );
}
