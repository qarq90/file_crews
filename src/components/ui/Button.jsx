import React from "react";

const Button = ({ children, disabled, onClick, ...props }) => {
  return (
    <button
      className="flex flex-1 items-center justify-center gap-2 rounded-md bg-foreground px-4 pb-1 pt-2 text-xl text-background transition duration-200 ease-in-out hover:opacity-85 disabled:opacity-50"
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
