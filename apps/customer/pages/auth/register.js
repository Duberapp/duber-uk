import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  MainLayout,
  LogoLoading,
  AuthSelector,
  RegisterForm,
} from "../../components/CustomerDashboard_Components";
import {
  errorToast,
  successToast,
} from "../../components/CustomerDashboard_Components/UI/Toast";
import {
  registerUser,
  getSession,
  createUser,
} from "../../config/supabaseFunctions";
import { useRouter } from "next/router";
import { EncryptPassword } from "../../utils/securePassword";

const Register = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  // Redirect if auth
  useEffect(() => {
    const getSessionAvailable = async () => {
      try {
        const { data } = await getSession();
        // console.log(data.session);
        if (data.session) router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    };

    getSessionAvailable();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (email === "" || password === "" || confirmPassword === "")
        throw new Error("Please fill all fields");
      if (password !== confirmPassword)
        throw new Error("Password not matching !");

      const { data: signupData, error: signupErr } = await registerUser({
        email,
        password,
      });
      if (signupErr) throw new Error("Register Failed !");

      const { data: createUserRes, error: createUserErr } = await createUser({
        firstName: firstname,
        lastName: lastname,
        title: title,
        email: email,
        phoneNumber: phone,
        companyName: company,
        user_id: signupData.user.id,
        encrypted_password: EncryptPassword(password),
      });
      if (createUserErr) throw new Error("Signed up, Create user failed !");

      setLoading(false);
      successToast("Register Successfully !");

      router.push("/dashboard");
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
          <AuthSelector current={"register"} />

          <RegisterForm
            onSubmit={handleRegister}
            loading={loading}
            className={"max-w-96 mt-9"}
            title={title}
            setTitle={setTitle}
            firstname={firstname}
            setFirstname={setFirstname}
            lastname={lastname}
            setLastname={setLastname}
            company={company}
            setCompany={setCompany}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
