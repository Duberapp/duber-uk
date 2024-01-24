import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoginForm from "./LoginForm";
import { loginUser } from "../../../config/supabaseFunctions";
import { useRouter } from "next/router";

const AuthModal = ({ className, setShow, setShowAuthModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (email === "" || password === "")
        throw new Error("Please fill all fields");

      const { data, error } = await loginUser({ email, password });
      if (error) throw new Error("Logging Failed !");

      // setSessionUser(data.user);

      setLoginError("");
      setLoading(false);
      setShowAuthModal(false);
    } catch (err) {
      setLoginError(err.message);
      setLoading(false);
    }
  };

  return (
    <div
      className={`${className} w-[100vw] h-[100vh] flex items-center justify-center bg-[#00000020]`}
    >
      <div className="sm:w-[490px] w-[396px] bg-white min-h-48 rounded-xl shadow-xl shadow-gray-400">
        <div className="w-full pr-2 pt-2 flex items-center justify-end">
          <XMarkIcon
            width={23}
            height={23}
            color="text-black"
            className="cursor-pointer"
            onClick={() => setShow(false)}
          />
        </div>

        <div className="my-3 sm:px-14 px-7">
          <p className="text-navyBlue text-lg font-semibold mb-5">{`Nice to see you again`}</p>

          {loginError && (
            <div className="my-2 bg-red-100 text-red-500 px-3 py-3 rounded-lg text-sm">
              {loginError}
            </div>
          )}

          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />

          {/* <div className="border-t border-gray-200 my-7" /> */}
          <div className="mb-14" />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
