import React, { useEffect, useState } from "react";
import { createStripeConnectedAccount } from "../../config/utilityFunctions";
import { useSelector } from "react-redux";
import { errorToast } from "./Toast";
import { StripeButton } from "ui";

const StripeConnectButton = () => {
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
    <StripeButton
      state={type}
      disabled={disabled}
      onClick={handleCreate}
      loading={loading}
      logo_url="/assets/stripe-1.png"
    />
  );
};

export default StripeConnectButton;
