import React from "react";

const Title = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="font-serif text-4xl"
      style={{ fontFamily: '"Josefin Sans", serif' }}
    >
      {children}
    </span>
  );
};

export default Title;
