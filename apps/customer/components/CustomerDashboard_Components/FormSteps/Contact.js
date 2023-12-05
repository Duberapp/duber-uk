import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeStep,
  completeContact,
  switchToUpdateMode,
  setActiveStep,
} from "../../../redux/createOrderSlice";
import { MobilePriceBar, Button, ErrorMessage, LoadingSpinner } from "../";
import { useRouter } from "next/router";
import AuthModal from "../Auth/AuthModal";
import {
  selectUser,
  createAuthUser_Contact,
  logoutUser,
} from "../../../config/supabaseFunctions";
import { setAuthUserId } from "../../../redux/createOrderSlice";
import { useUser } from "@supabase/auth-helpers-react";

const Contact = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.createOrder);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const sessionUser = useUser();

  // States
  const [title, setTitle] = useState(orderState.title);
  const [firstName, setFirstName] = useState(orderState.firstName);
  const [lastName, setLastName] = useState(orderState.lastName);
  const [email, setEmail] = useState(orderState.email);
  const [telNumber, setTelNumber] = useState(orderState.telNumber);
  const [company, setCompany] = useState(orderState.company);
  const [errorMessage, setErrorMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  // References
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const telNumberRef = useRef(null);
  const companyRef = useRef(null);
  const passwordRef = useRef(null);
  const [titleErr, setTitleErr] = useState(false);

  // Data validation
  const validateData = () => {
    let validationError = false;
    const firstNameElem = firstNameRef.current;
    const lastNameElem = lastNameRef.current;
    const emailElem = emailRef.current;
    const telNumElem = telNumberRef.current;
    const companyElem = companyRef.current;
    const passwordElem = passwordRef.current;
    const errorStyle =
      "w-full bg-primaryBlueLight text-[16px] text-primaryBlue h-12 rounded-md px-4 outline-none placeholder:text-red-400 border border-red-400";

    if (firstName === "") {
      firstNameElem.className = errorStyle;
      validationError = true;
      setErrorMessage("Please fill all required fields !");
    } else firstNameElem.className = "normal-input";

    if (lastName === "") {
      lastNameElem.className = errorStyle;
      validationError = true;
      setErrorMessage("Please fill all required fields !");
    } else lastNameElem.className = "normal-input";

    if (email === "") {
      emailElem.className = errorStyle;
      validationError = true;
      setErrorMessage("Please fill all required fields !");
    } else if (!email.match(re)) {
      // Validate is match to regex
      emailElem.className = `${errorStyle} text-red-500`;
      validationError = true;
      setErrorMessage("Email is not not valid");
    } else emailElem.className = "normal-input";

    if (telNumber === "") {
      telNumElem.className = errorStyle;
      validationError = true;
      setErrorMessage("Please fill all required fields !");
    } else telNumElem.className = "normal-input";

    if (title === "") {
      validationError = true;
      setTitleErr(true);
      setErrorMessage("Please select a title");
    } else setTitleErr(false);

    if (!sessionUser) {
      if (orderState.storagePlan.id === 2 && !password) {
        passwordElem.className = errorStyle;
        validationError = true;
        setErrorMessage(
          "The monthly subscription storage plan requires an account"
        );
      } else passwordElem.className = "normal-input";
    }

    if (!validationError) setErrorMessage(null);

    return validationError;
  };

  useEffect(() => {
    let screenWidth;
    // ----------- screen width -------------
    if (typeof window !== "undefined") {
      // Client-side-only code
      screenWidth = window.screen.width;
    }
    // ----------------------------------------

    if (screenWidth < 640) {
      setIsMobile(true);
    }
  }, []);

  // Get user registeration data
  useEffect(() => {
    const initializeRegisterData = async () => {
      try {
        setLoadingUserData(true);
        if (!sessionUser) return;
        console.log(sessionUser.id);

        const { data, error } = await selectUser(sessionUser.id);
        dispatch(setAuthUserId(sessionUser.id));

        if (error) return;

        if (data.length === 0) return;

        const userData = data[0];
        setTitle(userData.title);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPassword("");
        setTelNumber(userData.phoneNumber);
        setCompany(userData.companyName);

        setLoadingUserData(false);
      } catch (err) {
        setLoadingUserData(false);
        console.log(err);
      }
    };

    initializeRegisterData();
  }, [sessionUser]);

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let isValidateError = validateData();
      if (isValidateError) return;

      // If Password supplied -> Make a new Authenticated User
      // If email already exsits in Auth -> throw error
      if (password) {
        const { data, error } = await createAuthUser_Contact({
          email: email,
          password: password,
          accountData: {
            firstName: firstName,
            lastName: lastName,
            title: title,
            phoneNumber: telNumber,
            companyName: company,
          },
        });

        if (error) throw error;
      }
      // -----------------------------------------------------

      dispatch(
        completeContact({
          title,
          firstName,
          lastName,
          email,
          telNumber,
          company,
        })
      );

      if (
        orderState.step1_UpdateMode &&
        orderState.step2_UpdateMode &&
        orderState.step3_UpdateMode
      )
        return dispatch(setActiveStep(4));

      dispatch(completeStep(3));
      dispatch(switchToUpdateMode(3));

      setLoading(false);
      dispatch(setActiveStep(4));
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="sm:mt-16 mt-8">
      {showAuthModal && (
        <AuthModal
          className={"fixed z-50 top-0 left-0"}
          setShow={setShowAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      )}

      <p className="mb-5 sm:hidden block sm:text-xl text-lg font-semibold text-navyBlue">
        Contact Details
      </p>

      {/* Signup / User State Card */}
      <div className="mb-6 w-full min-h-14 bg-navyBlue rounded-lg p-2">
        {!sessionUser ? (
          <div className="flex items-center justify-between">
            <p className="ml-3 text-white sm:text-base text-sm">
              <span className="font-semibold">{`Have an account ?`}</span>
              {` Access and manage orders`}
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="h-11 w-28 rounded-lg font-semibold outline-none bg-primaryTeal text-navyBlue"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="h-11 flex items-center">
            {loadingUserData ? (
              <div className="ml-3">
                <LoadingSpinner width={5} height={5} color="white" />
              </div>
            ) : (
              <div className="flex items-center justify-between w-full px-3">
                <p className=" text-white sm:text-base text-sm">
                  <span className="font-semibold">{`Hey ${firstName},`}</span>
                  {` Welcome back !`}
                </p>
                <p
                  className="text-sm text-white underline cursor-pointer"
                  onClick={() => logoutUser()}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {errorMessage && (
        <ErrorMessage
          error={errorMessage}
          setError={setErrorMessage}
          className="mb-7"
        />
      )}

      {/* Form */}
      <div className=" grid sm:grid-rows-3 grid-rows-5 sm:gap-y-7 gap-y-5 ">
        {/* Row 1 - Desktop View */}
        <div className="h-12  grid sm:grid-cols-3 grid-cols-2 sm:gap-x-5 gap-x-2">
          <div className="flex justify-start">
            <button
              onClick={(e) => setTitle("Mr")}
              className={`${
                title !== "Mr"
                  ? "bg-primaryBlueLight text-primaryBlue"
                  : "bg-primaryTealLight text-primaryTeal"
              } ${
                titleErr && "border border-red-500 text-red-500"
              } title-button`}
            >
              Mr
            </button>
            <button
              onClick={(e) => setTitle("Ms")}
              className={`sm:mx-7 mx-3 ${
                title !== "Ms"
                  ? "bg-primaryBlueLight text-primaryBlue"
                  : "bg-primaryTealLight text-primaryTeal"
              } ${
                titleErr && "border border-red-500 text-red-500"
              } title-button`}
            >
              Ms
            </button>
            <button
              onClick={(e) => setTitle("Mrs")}
              className={`${
                title !== "Mrs"
                  ? "bg-primaryBlueLight text-primaryBlue"
                  : "bg-primaryTealLight text-primaryTeal"
              } ${
                titleErr && "border border-red-500 text-red-500"
              } title-button`}
            >
              Mrs
            </button>
          </div>

          <div>
            <input
              type="text"
              className="normal-input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              ref={firstNameRef}
            />
          </div>
          {!isMobile && (
            <div>
              <input
                type="text"
                className="normal-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                ref={lastNameRef}
              />
            </div>
          )}
        </div>
        {/* last name field - Render only for mobile */}
        {isMobile && (
          <div className="h-12 ">
            <input
              type="text"
              className="normal-input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              ref={lastNameRef}
            />
          </div>
        )}

        {/* Row 2 - Desktop View */}
        <div className="h-12 ">
          <input
            type="email"
            className="normal-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
          />
        </div>

        {/* Password field if not user and not mobile */}
        {!sessionUser && (
          <div className="h-12 grid sm:grid-cols-2 grid-cols-1 gap-x-5">
            <input
              type="password"
              ref={passwordRef}
              className="normal-input"
              placeholder={`Enter a Password ${
                Object.keys(orderState.storagePlan).length !== 0 &&
                orderState.storagePlan.id === 1
                  ? "(Optional)"
                  : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="sm:flex  h-12 w-full rounded-md bg-navyBlue hidden items-center justify-center">
              <p className="text-white text-xs">{`Create an account to manage all your orders.`}</p>
            </div>
          </div>
        )}

        {/* Row 3 - Desktop View */}
        <div className="h-12  grid sm:grid-cols-2 grid-cols-1 gap-x-5">
          <div>
            <input
              type="text"
              className="normal-input"
              placeholder="Telephone Number"
              value={telNumber}
              onChange={(e) => setTelNumber(e.target.value)}
              ref={telNumberRef}
            />
          </div>
          {!isMobile && (
            <div>
              <input
                type="text"
                className="normal-input"
                placeholder="Company (Optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                ref={companyRef}
              />
            </div>
          )}
        </div>
        {/* company field - Render only for mobile */}
        {isMobile && (
          <div className="h-12 ">
            <input
              type="text"
              className="normal-input"
              placeholder="Company (Optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              ref={companyRef}
            />
          </div>
        )}
      </div>

      <div className="mt-9 flex items-center">
        <MobilePriceBar />

        <Button className="" onClick={handleNext} isLoading={loading}>
          {orderState.step3_UpdateMode ? "Save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Contact;

// Email validation regex
const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
