import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  signinUser,
  getSession,
  handlePasswordReset,
} from "../../config/supabaseFunctions";
import { LoadingSpinner } from "../../components";
import { Toaster } from "react-hot-toast";
import { successToast, errorToast } from "../../components/UI/Toast";
import { Button } from "ui";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailToPassword, setEmailToPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forgotPasswordView, setForgotPasswordView] = useState(false);
  const [sendingResetLink, setSendingResetLink] = useState(false);

  // Redirect if auth
  useEffect(() => {
    const getSessionAvailable = async () => {
      try {
        const { data } = await getSession();
        // console.log(data.session)
        if (data.session) router.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    getSessionAvailable();
  }, []);

  const handleSubmit = () => {
    const handleSignIn = async () => {
      try {
        setLoading(true);
        let { data, error } = await signinUser({
          email,
          password,
        });

        if (error) throw error;

        setLoading(false);

        if (data) router.push("/");
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    handleSignIn();
  };

  // Forgot password functions
  const sendPasswordResetLink = async () => {
    try {
      setSendingResetLink(true);
      const timestamp = new Date();

      const { data, error } = await handlePasswordReset(
        emailToPassword,
        timestamp
      );
      if (error) throw error;

      setSendingResetLink(false);
      successToast(data);
    } catch (err) {
      setSendingResetLink(false);
      errorToast(err);
    }
  };

  // ---------------------------------------------

  return (
    <div className="w-screen h-screen bg-[url('/assets/authBG.jpg')] bg-cover bg-fixed sm:px-14 px-3 sm:py-10 py-6">
      <Toaster position="top-right" />
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-full">
        <div className="flex items-center justify-center sm:px-12 px-8 bg-navyBlue rounded-3xl">
          {!forgotPasswordView ? (
            <form className="w-full">
              {/* <h2 className='text-logoText font-light'><span className="font-bold">Onthefly</span> DronePilots</h2> */}
              <div className="flex items-center gap-x-3">
                <img src="/assets/Duber Icon.svg" className="w-8 h-8" />
                <p className="font-bold text-white text-xl tracking-widest">
                  Duber
                </p>
              </div>

              <h2 className="mt-12 mb-5 text-xl text-white font-semibold">
                Nice to see you again
              </h2>

              {error && (
                <p className="mb-5 text-xs py-2 px-3 rounded-lg bg-red-200 text-red-500">
                  {error}
                </p>
              )}
              <InputItem
                label={"Username"}
                inputType="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Phone number"
                value={email}
              />
              <InputItem
                label={"Password"}
                inputType="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-5"
                value={password}
              />

              <div className="w-full flex items-center flex-nowrap justify-between mt-6 mb-8">
                <ToggleButton />

                <p
                  className="text-duber-pink text-xs font-semibold cursor-pointer mr-1"
                  onClick={() => setForgotPasswordView(true)}
                >
                  Forgot Password ?
                </p>
              </div>

              <Button
                variant={"teal"}
                isLoading={loading}
                onClick={handleSubmit}
                className="w-full h-10"
              >
                Sign in
              </Button>

              <div className="border-t border-gray-200 my-9" />

              <p className="text-center text-xs text-white">
                Dont have an account?{" "}
                <Link href="/auth/register">
                  <a className="text-duber-pink font-semibold ml-1">
                    Sign up now
                  </a>
                </Link>
              </p>
            </form>
          ) : (
            <div className="w-full ">
              <h2 className="mt-12 mb-5 text-xl text-duber-pink font-bold">
                Forgot Password
              </h2>
              <InputItem
                label={"Email"}
                inputType="email"
                className="mt-3"
                id="email"
                placeholder="Email Address"
                value={emailToPassword}
                onChange={(e) => setEmailToPassword(e.target.value)}
              />

              <div className="mt-4 flex items-center justify-between w-full">
                <Button
                  onClick={sendPasswordResetLink}
                  variant={"skyBlue"}
                  isLoading={sendingResetLink}
                >
                  Send Password Reset Link
                </Button>

                <h2
                  className="text-xs cursor-pointer text-gray-400 hover:text-primaryBlue"
                  onClick={() => setForgotPasswordView(false)}
                >
                  Back to Login
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
      <label htmlFor={props?.id} className="text-xs ml-1 mb-2 text-white">
        {label}
      </label>
      <div className="flex items-center p-3 px-4 bg-[#eeeeee] border-1-gray-600 rounded-md">
        <input
          type={inputType}
          onChange={props?.onChange}
          placeholder={props?.placeholder}
          className={
            "flex-1 text-base placeholder:text-gray-600 placeholder:font-light bg-transparent outline-none"
          }
          value={props?.value}
        />
        {leftComponent}
      </div>
    </div>
  );
};

const ToggleButton = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
          {/* <!-- toggle --> */}
          <div className="relative">
            {/* <!-- input --> */}
            <input type="checkbox" id="toggleB" className="sr-only" />
            {/* <!-- line --> */}
            <div className="block bg-[#e7e7e7] w-12 h-6 rounded-full"></div>
            {/* <!-- dot --> */}
            <div className="dot absolute left-1 top-1 bg-gray-400 shadow-lg w-4 h-4 rounded-full transition"></div>
          </div>
          {/* <!-- label --> */}
          <div className="ml-3 text-xs text-white font-normal">Remember Me</div>
        </label>
      </div>
    </div>
  );
};

export default Login;
