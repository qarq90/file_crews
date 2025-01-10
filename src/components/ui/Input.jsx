import React from "react";

const Input = ({ type = "text", disabled = false, ...props }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-md border border-foreground bg-background px-4 py-2 text-xl outline-none placeholder:opacity-50">
      <input
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        type={type}
        onChange={props.onChange}
        disabled={disabled}
        className="placeholder:#ccc text-md w-full rounded-md bg-background outline-none placeholder:opacity-30"
        {...props}
      />
    </div>
  );
};

export default Input;
