import React from "react";
import { LoadingSpinner } from "../index";

const Button = ({
  onClick,
  isLoading,
  width,
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${className} bg-primaryTeal ${
        width ? width : "w-32"
      } h-12 flex items-center justify-center uppercase text-color font-semibold text-white text-lg rounded-md`}
    >
      {isLoading ? (
        <LoadingSpinner width={5} height={5} color="white" />
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default Button;
