import React from "react";
import { useRouter } from "next/router";

export const LoginButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/auth/login")}
      className="h-10 sm:h-11 rounded-xl bg-primaryPurple text-white text-sm font-medium px-3 sm:px-4"
    >
      Login
    </button>
  );
};

export const SignupButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/auth/register")}
      className="h-10 sm:h-11 rounded-xl bg-primaryPink text-white text-sm font-medium px-3 sm:px-4"
    >
      Signup
    </button>
  );
};

export const DashboardButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="h-10 sm:h-11 rounded-xl bg-navyBlue text-white text-sm font-medium px-4"
    >
      My Account
    </button>
  );
};
