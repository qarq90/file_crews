import React, { HTMLAttributes, ReactNode } from "react";

interface TitleProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="text-4xl"
    >
      {children}
    </span>
  );
};

export default Title;