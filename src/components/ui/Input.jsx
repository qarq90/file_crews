import React, { useRef } from "react";
import Button from "./Button";

const Input = ({ type = "text", disabled = false, ...props }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {type === "text" && (
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
              id={props.id}
              name={props.name}
              type="file"
              ref={fileInputRef}
              onChange={props.onChange}
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
