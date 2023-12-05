import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { createStripeConnectedAccount } from "../../config/utilityFunctions";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { errorToast } from "./Toast";

const StripeConnectButton = ({ withLogo, height, width, textSize }) => {
  const userBilling = useSelector((state) => state.userBilling);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [type, setType] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch the stripe state
  useEffect(() => {
    setType(userBilling.stripeState);
    if (userBilling.stripeState === "disabled") {
      setType("manage");
      setDisabled(true);
    } else setDisabled(false);
  }, [userBilling.stripeState]);

  // Handle on click
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const requestData = {
        type: "express",
        country: "GB",
        email: currentUser.email,
        business_type: "individual",
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },
        },
        external_account: {
          object: "bank_account",
          country: "GB",
          currency: "gbp",
          account_holder_name: `${currentUser.firstName} ${currentUser.lastName}`,
          account_holder_type: "individual",
          routing_number: userBilling.userBilling[0].bankSortCode,
          account_number: userBilling.userBilling[0].bankAccountNumber,
        },
        business_profile: {
          url: "https://pilot.duber.uk",
        },
      };

      const { data, error } = await createStripeConnectedAccount(requestData);
      if (error) throw error;

      // Redirect to onboarding page
      window.location = data.data.data.url;

      setLoading(false);
    } catch (err) {
      console.log(err);
      errorToast("Something went wrong !");
      setLoading(false);
    }
  };

  if (!type) return <></>;

  return (
    <Wrapper type={type} disabled={disabled} onClick={handleCreate}>
      <Toaster position="top-right" />
      <div
        className={`
        ${
          disabled
            ? "bg-gray-200 cursor-not-allowed"
            : "button-gradient cursor-pointer"
        } 
        ${width ? width : "w-48"} 
        ${height ? height : "h-10"} 
        flex items-center justify-center  rounded-lg relative`}
      >
        {!loading ? (
          <p className={`${textSize} font-semibold text-black`}>
            {type === "create" && "Create Stripe Account"}
            {type === "manage" && "Manage Payouts"}
          </p>
        ) : (
          <LoadingSpinner width={5} height={5} color="black" />
        )}

        {withLogo && (
          <img
            src="/assets/stripe-1.png"
            alt=""
            className="absolute right-1 bottom-1"
          />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = ({ type, disabled, onClick, children }) => {
  switch (type) {
    case "create":
      return (
        <button disabled={disabled} onClick={onClick}>
          {children}
        </button>
      );

    case "manage":
      if (disabled) {
        return <div>{children}</div>;
      } else {
        return (
          <a
            target="_blank"
            href="https://connect.stripe.com/express_login"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }

    default:
      return <></>;
  }
};

export default StripeConnectButton;
