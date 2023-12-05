import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setStripeState } from "../../redux/userBillingSlice";
import StripeConnectButton from "../UI/StripeConnectButton";

const NoAddressAlert = ({ setDisableAccept }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [emptyAlert_show, setEmptyAlert_show] = useState(false);
  const [createAlert_show, setCreateAlert_show] = useState(false);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const userBilling = useSelector((state) => state.userBilling.userBilling);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/account") {
        setShow(false);
      }
    }
  }, []);

  // Initialize Component
  useEffect(() => {
    const initializeState = async () => {
      try {
        let billingData;
        if (userBilling.length !== 0) {
          billingData = userBilling[0];
        } else {
          // Validate to show -> Empty data alert
          setEmptyAlert_show(true);
          dispatch(setStripeState("disabled"));
          setDisableAccept(true);

          throw new Error("Billing Data are empty");
        }

        // Validate to show -> Empty data alert
        if (!billingData.bankAccountNumber || !billingData.bankSortCode) {
          setEmptyAlert_show(true);
          dispatch(setStripeState("disabled"));
          setDisableAccept(true);
        }

        // Validate to show -> Stripe connect create alert
        if (
          billingData.bankAccountNumber &&
          billingData.bankSortCode &&
          !currentUser.stripe_connected_id
        ) {
          setCreateAlert_show(true);
          dispatch(setStripeState("create"));
          setDisableAccept(true);
        } else {
          dispatch(setStripeState("manage"));
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    if (Object.keys(currentUser).length !== 0) {
      initializeState();
    }
  }, [currentUser]);

  // --------------------

  if (!show) return <></>;

  if (!emptyAlert_show && !createAlert_show) return <></>;

  // Create stripe connected account alert
  if (!emptyAlert_show && createAlert_show)
    return (
      <div className="bg-red-400 p-4 pt-6 rounded-b-2xl">
        <p className="text-white font-semibold mb-2">Action Required !</p>

        <div className="flex sm:flex-row flex-col items-end justify-between gap-x-8">
          <p className="text-sm text-white">
            {`2. Create a Stripe payout account, in order to accept jobs and get paid.`}
          </p>

          <StripeConnectButton textSize={"text-sm"} />
        </div>
      </div>
    );

  // Fill billing details alerts
  return (
    <div className="bg-red-400 p-4 pt-6 rounded-b-2xl">
      <p className="text-white font-semibold mb-2">Action Required !</p>

      <div className="flex sm:flex-row flex-col items-end justify-between gap-x-8">
        <p className="text-sm text-white">
          {`Fill in your billing information in accounts settings`}
        </p>

        <button
          onClick={() => router.push("/dashboard/account")}
          className="sm:mt-0 mt-3 rounded-md text-xs bg-red-500 text-white py-2 px-3 min-w-fit"
        >
          Account Settings
        </button>
      </div>
    </div>
  );
};

export default NoAddressAlert;
