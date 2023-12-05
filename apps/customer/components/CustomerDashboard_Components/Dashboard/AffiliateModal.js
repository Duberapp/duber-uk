import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { applyAffiliate } from "../../../config/supabaseFunctions";
import { LoadingSpinner } from "../../../components/CustomerDashboard_Components";
import {
  errorToast,
  successToast,
} from "../../../components/CustomerDashboard_Components/UI/Toast";

const AffiliateModal = ({ setModalShow, customerId, setAffiliateInfo }) => {
  const [loading, setLoading] = useState(false);
  const [paypalAddress, setPaypalAddress] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data, error } = await applyAffiliate(customerId, {
        status: "pending",
        paypal_address: paypalAddress,
        customer_id: customerId,
      });
      if (error) throw new Error("Failed to apply affililates");

      setLoading(false);
      setAffiliateInfo({
        state: "pending",
        referral_link: "",
      });
      setModalShow(false);
      successToast("You'r affiliate application submitted !");
    } catch (err) {
      console.log(err);
      successToast("Couldn't submit your application !");
      setLoading(false);
    }
  };

  return (
    <div className="sm:w-1/2 sm:mx-auto mx-2 w-full custom-shadow rounded-md bg-white p-5">
      {/* Row 1 */}
      <div className="flex items-center justify-between w-full">
        <p className="text-lg font-bold text-navyBlue">{`Referral Program Application`}</p>
        <XMarkIcon
          className="w-6 h-6 text-[#FB7B7B] cursor-pointer"
          strokeWidth={2}
          onClick={() => setModalShow(false)}
        />
      </div>

      {/* Row 2 */}
      <p className="mt-3 text-navyBlue text-sm">
        {`If you sign up, we will create your Affiliate Account within 5 business days. You will then receive your own, trackable link. Any orders that are made through that link will result in commission for you.`}
        <br />
        <br />
        <span className="font-semibold">{`Our Commission is 10%`}</span>
        <br />
        <span className="font-semibold">{`Our Cookie Window is 60 days`}</span>
        <br />
        <br />
        {`To renew your tracking link after 60 days you must email us to request for renewal, we will review the request and contact you directly with the status.`}
        <br />
        <br />
        <br />
        <span className="text-lg font-semibold">{`Payment Method`}</span>
        <br />
        <br />
        {`Any commission earned through the trackable link we be paid at the end
        of each month, you will be provided login details to our referral
        dashboard to see if any commission has been made.`}
        <br />
        <br />
        {`We pay the commission via PayPal to ensure safe and secure transactions,
        please provide you PayPal email below (If different to your Duber
        account email).`}
      </p>

      <div className="mt-5">
        <div className="h-12 bg-primaryBlueLight rounded-md flex items-center justify-between px-3">
          <input
            type="text"
            value={paypalAddress}
            onChange={(e) => setPaypalAddress(e.target.value)}
            className="text-sm text-primaryBlue w-full bg-transparent h-full outline-none placeholder:text-primaryBlue"
            placeholder="Enter your PayPal account email (if different to Duber account email)"
          />
          <Image src="/assets/paypal.png" alt="logo" width={82} height={22} />
        </div>
      </div>

      <div className="mt-3 w-full flex items-center justify-end">
        <button
          className="flex items-center justify-center h-12 w-32 bg-primaryTeal font-semibold text-white rounded-md"
          onClick={handleSubmit}
        >
          {!loading ? (
            "Submit"
          ) : (
            <LoadingSpinner width={5} height={5} color="white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AffiliateModal;
