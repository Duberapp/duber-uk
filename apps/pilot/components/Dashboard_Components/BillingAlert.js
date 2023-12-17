import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setStripeState } from "../../redux/userBillingSlice";
import StripeConnectButton from "../UI/StripeConnectButton";
import { FillDetailsAlert, CreateStripeAlert } from "ui";

const NoAddressAlert = ({ setDisableAccept, children, isHome, isMyJobs }) => {
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

  const handleNavigateAccountSettings = () => {
    router.push("/dashboard/account#billing_section");
  };

  // --------------------

  if (!show) return <></>;

  if (!emptyAlert_show && !createAlert_show) return <></>;

  // Create stripe connected account alert
  if (!emptyAlert_show && createAlert_show)
    return (
      <div className="relative">
        {/* Blur overlay */}
        {(isHome || isMyJobs) && <div className="blur-sm">{children}</div>}

        {(isHome || isMyJobs) && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <CreateStripeAlert StripeButton={<StripeConnectButton />} />
          </div>
        )}
      </div>
    );

  // Fill billing details alerts
  return (
    <div className="relative">
      {/* Blur overlay */}
      {(isHome || isMyJobs) && <div className="blur-sm	">{children}</div>}

      {(isHome || isMyJobs) && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <FillDetailsAlert onAction={handleNavigateAccountSettings} />
        </div>
      )}
    </div>
  );
};

export default NoAddressAlert;
