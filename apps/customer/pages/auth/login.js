import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  Input,
  Button,
  MainLayout,
  LogoLoading,
  AuthSelector,
  LoginForm,
} from "../../components/CustomerDashboard_Components";
import {
  errorToast,
  successToast,
} from "../../components/CustomerDashboard_Components/UI/Toast";
import { loginUser, getSession } from "../../config/supabaseFunctions";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // Redirect if auth
  useEffect(() => {
    const getSessionAvailable = async () => {
      try {
        setPageLoading(true);
        const { data } = await getSession();
        // console.log(data.session);
        if (data.session) router.push("/dashboard");
        setPageLoading(false);
      } catch (err) {
        setPageLoading(false);
        console.log(err);
      }
    };

    getSessionAvailable();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (email === "" || password === "")
        throw new Error("Please fill all fields");

      const { data, error } = await loginUser({ email, password });
      if (error) throw new Error("Logging Failed !");

      router.push("/dashboard");

      setLoading(false);
      // successToast("Logging Success !");
    } catch (err) {
      setLoading(false);
      errorToast(err.message);
    }
  };

  if (pageLoading) <LogoLoading />;

  return (
    <MainLayout>
      {/* Toaster */}
      <Toaster position="top-right" />
      {/* ------------------------ */}

      <div className="flex md:h-[50vh] flex-col md:flex-row space-x-0 md:space-x-8 lg:space-x-52 justify-center text-navyBlue">
        <div className="w-80 my-auto pb-8 md:pb-0">
          <h1 className="font-semibold text-4xl pb-8">
            Login <span className="text-primaryPink">or</span> Sign up{" "}
            <span className="text-primaryPink">to</span> unlock special
            features.
          </h1>
          <div className="space-y-5 text-base">
            <p>Track your orders and view your order history.</p>
            <p>Get access and download your images and photos.</p>
            <p>Produce building inspection reports using AI.</p>
          </div>
        </div>
        <div className="flex flex-col my-auto">
          <AuthSelector current={"login"} />

          <LoginForm
            className={"w-96 mt-9"}
            onSubmit={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
