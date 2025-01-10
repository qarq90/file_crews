import React from "react";

const Label = ({ children, ...props }) => {
  return (
    <span {...props} className="text-left text-xl">
      {children}
    </span>
  );
};

export default Label;
