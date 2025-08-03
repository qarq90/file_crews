import React, { InputHTMLAttributes, useRef } from "react";
import Button from "./button";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "file";
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ type = "text", disabled = false, ...props }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {(type === "text" || type === "password") && (
        <div className="flex w-full transform-skew skew-x-[-30deg] items-center justify-between pt-3 pl-5 bg-neutral-800 px-4 py-2 text-xl outline-none placeholder:opacity-50">
          <input
            type={type}
            disabled={disabled}
            className="placeholder:#ccc text-md w-full transform-skew-content skew-x-[30deg] rounded-md bg-neutral-800 outline-none placeholder:opacity-30"
            {...props}
          />
        </div>
      )}

      {type === "file" && (
        <>
          <div className="flex w-full">
            <Button type="button" onClick={handleFileSelect}>
              Choose Image
            </Button>
          </div>
          <div className="flex w-full">
            <input
              type="file"
              ref={fileInputRef}
              disabled={disabled}
              className="hidden"
              {...props}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Input;