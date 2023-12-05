import React from "react";
import { LoadingSpinner } from "../index";

const RegisterForm = ({
  onSubmit,
  loading,
  className,
  title,
  setTitle,
  email,
  setEmail,
  company,
  setCompany,
  phone,
  setPhone,
  firstname,
  setFirstname,
  lastname,
  setLastname,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {/* ============ Row 1 ============ */}
      <div className="flex items-center gap-x-3">
        {/* Row 1 -> Col 1 */}
        <div className="">
          <p className="text-xs text-gray-500">Title</p>
          <div className="mt-2 flex items-center gap-x-3">
            <button
              type="button"
              onClick={() => setTitle("Mr")}
              className={`h-12 w-12 rounded-md ${
                title === "Mr"
                  ? "bg-primaryTealLight text-primaryTeal"
                  : "bg-gray-100 text-gray-500"
              } text-sm`}
            >
              Mr
            </button>
            <button
              type="button"
              onClick={() => setTitle("Ms")}
              className={`h-12 w-12 rounded-md ${
                title === "Ms"
                  ? "bg-primaryTealLight text-primaryTeal"
                  : "bg-gray-100 text-gray-500"
              } text-sm`}
            >
              Ms
            </button>
            <button
              type="button"
              onClick={() => setTitle("Mrs")}
              className={`h-12 w-12 rounded-md ${
                title === "Mrs"
                  ? "bg-primaryTealLight text-primaryTeal"
                  : "bg-gray-100 text-gray-500"
              } text-sm`}
            >
              Mrs
            </button>
          </div>
        </div>

        {/* Row 1 -> Col 2 */}
        <div className="flex-1">
          <p className="text-xs text-gray-500">First Name</p>
          <input
            type="text"
            className="w-full mt-2 h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
      </div>

      {/* ============ Row 2 ============ */}
      <div className="mt-4 flex sm:flex-row flex-col items-center gap-x-3 gap-y-3">
        {/* Row 2 -> Col 1 */}
        <div className="flex-1 w-full">
          <p className="text-xs text-gray-500">Last Name</p>
          <input
            type="text"
            className="mt-2 h-12 sm:w-fit w-full bg-gray-100 px-4 rounded-md outline-none text-sm"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        {/* Row 2 -> Col 2 */}
        <div className="flex-1 w-full">
          <p className="text-xs text-gray-500">Company Name</p>
          <input
            type="text"
            className="mt-2 h-12 sm:w-fit w-full bg-gray-100 px-4 rounded-md outline-none text-sm"
            placeholder="Optional"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      {/* ============ Row 3 ============ */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">Phone Number</p>
        <input
          type="text"
          className="mt-2 w-full h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* ============ Row 4 ============ */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">Email</p>
        <input
          type="email"
          className="mt-2 w-full h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* ============ Row 5 ============ */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">Password</p>
        <input
          type="password"
          className="mt-2 w-full h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* ============ Row 6 ============ */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">Confirm Password</p>
        <input
          type="password"
          className="mt-2 w-full h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button className="mt-9 mb-12 w-full h-12 flex items-center justify-center bg-skyBlue outline-none rounded-md text-white font-semibold">
        {loading ? (
          <LoadingSpinner width={5} height={5} color="white" />
        ) : (
          "Register Account"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
