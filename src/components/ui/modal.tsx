import React, { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-background bg-opacity-75"
        onClick={onClose}
      ></div>

      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 pl-12 pr-16 py-10">
        <div className="relative w-full max-w-md rounded-lg">
          {onClose && (
            <FaTimes
              aria-label="Close modal"
              onClick={onClose}
              className="absolute right-1 bg-foreground cursor-pointer top-1 p-1 text-2xl text-background rounded-full focus:outline-none"
            />
          )}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
