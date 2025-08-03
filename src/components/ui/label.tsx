import React, { HTMLAttributes, ReactNode } from "react";

interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  htmlFor?: string
}

const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <span {...props} className="text-left text-xl">
      {children}
    </span>
  );
};

export default Label;