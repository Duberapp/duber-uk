import React, { useState, useEffect } from "react";
import { updateForgotPassword } from "../../config/supabaseFunctions";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { LoadingSpinner } from "../../components";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "../../components/UI/Toast";

const ForgotPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      let { token, timestamp } = router.query;
      setToken(token.replace(" ", "+"));
      setTimestamp(timestamp.replace(" ", "+"));
    }
  }, [router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (password !== confirmPassword) {
        throw new Error("Password not matched !");
      }

      const { data, error } = await updateForgotPassword(
        token,
        timestamp,
        password
      );
      if (error) throw error;

      successToast(data);
      setLoading(false);
    } catch (err) {
      errorToast(err.message || err);
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white sm:w-[35vw] w-full flex flex-col items-center justify-center rounded-md py-6 px-12"
      >
        <img src="/assets/Duber logo.svg" className="w-32" />
        <h2 className="mt-6 mb-1 text-xl text-black font-bold">
          Reset your password
        </h2>
        <p className="text-gray-500 text-xs mb-9">
          Update your forgotten password,
        </p>

        <InputItem
          label={"New Password"}
          inputType="password"
          className="w-full mb-6"
          id="new_password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputItem
          label={"Confirm New Password"}
          inputType="password"
          className="w-full mb-5"
          id="confirm_password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-primaryBlue text-white h-12 flex items-center justify-center rounded-md"
        >
          {!loading ? (
            "Update"
          ) : (
            <LoadingSpinner width={5} height={5} color="white" />
          )}
        </button>

        <div className="border-t border-gray-400 my-5" />

        <p className="text-gray-400">
          Back to{" "}
          <span
            className="cursor-pointer text-primaryBlue"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;

const InputItem = ({ label, leftComponent, inputType, ...props }) => {
  const [passwordShow, setPasswordShow] = useState(false);

  if (inputType == "password") {
    // Set show/hide function
    inputType = passwordShow ? "text" : "password";

    // Set left Component
    leftComponent = passwordShow ? (
      <div onClick={() => setPasswordShow(false)} className="cursor-pointer">
        <EyeSlashIcon width={18} height={18} className="text-gray-600" />
      </div>
    ) : (
      <div onClick={() => setPasswordShow(true)} className="cursor-pointer">
        <EyeIcon width={18} height={18} className="text-gray-600" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${props?.className}`}>
      <label htmlFor={props?.id} className="text-xs ml-3 mb-2">
        {label}
      </label>
      <div className="flex items-center p-3 px-4 bg-[#eeeeee] border-1-gray-600 rounded-md">
        <input
          type={inputType}
          onChange={props?.onChange}
          placeholder={props?.placeholder}
          className={
            "flex-1 text-sm placeholder:text-gray-600 placeholder:font-light bg-transparent outline-none"
          }
          value={props?.value}
        />
        {leftComponent}
      </div>
    </div>
  );
};
