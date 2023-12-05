import React, { useState } from "react";
import { ToggleButton, LoadingSpinner } from "../index";

const LoginForm = ({
  className,
  loading,
  onSubmit,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="">
        <p className="text-xs text-gray-500">Login</p>
        <input
          type={"text"}
          placeholder={"Email or Phone number"}
          className="mt-2 h-12 w-full px-3 rounded-md bg-gray-100 text-sm outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <p className="text-xs text-gray-500">Password</p>
        <input
          type={"password"}
          placeholder={"Enter password"}
          className="mt-2 h-12 w-full px-3 rounded-md bg-gray-100 text-sm outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <ToggleButton />

        <p className="font-semibold text-xs text-skyBlue">{`Forgot Password ?`}</p>
      </div>

      <button className="mt-9 flex items-center justify-center w-full h-12 bg-skyBlue outline-none rounded-md text-white font-semibold">
        {loading ? (
          <LoadingSpinner width={5} height={5} color="white" />
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
