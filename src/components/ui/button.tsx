import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, onClick, ...props }) => {
  return (
    <button
      className="flex flex-1 items-center justify-center gap-2 text-xl text-background 
                 transition duration-200 ease-in-out hover:opacity-50 disabled:opacity-50 
                 bg-foreground px-6 pb-1 pt-1.5 cursor-pointer border-none 
                 transform-skew shadow-md"
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <span className="transform-skew-content">{children}</span>
    </button>
  );
};


export default Button;