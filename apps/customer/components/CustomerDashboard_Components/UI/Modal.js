import React from "react";

const Modal = ({ children, className }) => {
  return (
    <div
      className={`fixed ${className} w-full h-screen z-[2000] bg-white top-0 left-0`}
    >
      {children}
    </div>
  );
};

export default Modal;
