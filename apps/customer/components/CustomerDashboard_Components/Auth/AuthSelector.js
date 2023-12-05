import React from "react";
import { useRouter } from "next/router";

const AuthSelector = ({ current }) => {
  const router = useRouter();

  return (
    <div className="w-full flex items-center h-12 bg-gray-200 rounded-lg">
      <button
        onClick={() => router.push(`/auth/login`)}
        className={`${
          current === "login" && "bg-primaryTeal"
        } h-12 flex-1 rounded-lg outline-none font-semibold text-navyBlue`}
      >
        Login
      </button>
      <button
        onClick={() => router.push(`/auth/register`)}
        className={`${
          current === "register" && "bg-primaryTeal"
        } h-12 flex-1 rounded-lg outline-none font-semibold text-navyBlue`}
      >
        Create an Account
      </button>
    </div>
  );
};

export default AuthSelector;
