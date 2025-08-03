import React from 'react';

interface WrapperProps {
    children: React.ReactNode
}

export function AppWrapper({ children }: WrapperProps) {
    return (
        <div className="relative flex">{children}</div>
    );
}

export function BodyWrapper({ children }: WrapperProps) {
    return (
        <div className="relative mt-20 w-screen px-7 pb-3 md:ml-64 md:mt-9 md:px-12">
            {children}
        </div>
    );
}

export function AuthWrapper({ children }: WrapperProps) {
    return (
        <div className="relative m-4 mt-[-16] md:m-0 md:ml-96 md:mt-0 md:w-[65%] flex h-screen w-full flex-col items-center justify-center gap-8">
            {children}
        </div>
    );
}



