import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Checkout/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const appearance = {
  theme: "stripe",
};

const Checkout = ({ clientSecret, checkoutData }) => {
  const { orderState, orderData, orderEmail, mapState, basePrice, vat } =
    checkoutData;

  const options = {
    clientSecret,
    appearance,
  };

  console.log(basePrice, vat);

  return (
    <main className="">
      <div className="lg:w-[50vw] md:w-[70vw] mx-auto w-full mb-6">
        <div className="w-full rounded-md bg-primaryBlueLight px-4 py-5">
          <h2 className="w-full text-base text-primaryBlue mb-2">
            Order Summary
          </h2>

          {/* For large screens */}
          <div className="lg:flex hidden w-full items-center justify-between mb-2">
            <div className="flex items-center gap-x-2">
              <p className="text-primaryBlue text-xs">
                {mapState.address.slice(0, 23)}..,
              </p>
              <p className="text-primaryBlue text-xs">
                {mapState.area} m<sup>2</sup>,
              </p>
              <p className="text-primaryBlue text-xs">
                {orderState.startDate},
              </p>
              <p className="text-primaryBlue text-xs">{orderState.expertise}</p>
            </div>
            <p className="text-primaryBlue text-xs font-semibold">
              {`Total: £${orderData.price}`}{" "}
              <span className="text-[0.6rem] font-normal">{`(ex VAT)`}</span>
            </p>
          </div>

          {/* For Medium and Small Screens */}
          <div className="lg:hidden flex items-center justify-between flex-wrap gap-y-2 mb-3">
            <div className="">
              <p className="text-primaryBlue text-xs">
                {mapState.address.slice(0, 23)}..,
              </p>
              <p className="text-primaryBlue text-xs">
                {mapState.area} m<sup>2</sup>,
              </p>
            </div>
            <p className="text-primaryBlue text-xs">{orderState.startDate},</p>
            <p className="text-primaryBlue text-xs">{orderState.expertise}</p>
            <p className="text-primaryBlue text-xs font-semibold">
              {`TOTAL: £${orderData.price}`}
            </p>
          </div>

          <div className="w-full flex items-center mb-2">
            <p className="text-primaryBlue text-sm">
              {`Scheduled Payment: £${orderData.price - basePrice}`}{" "}
              <span className="text-xs">{`(ex VAT £${
                (orderData.price - basePrice) * (vat / 100)
              })`}</span>
            </p>
          </div>
          <div className="w-full flex items-center">
            <p className="text-primaryBlue text-sm font-semibold">
              {`DUE NOW: £${basePrice}`}{" "}
              <span className="text-xs font-normal">{`(${
                orderState.storagePlan.id == 2
                  ? "includes subscription fee"
                  : ""
              } ex VAT)`}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-[50vw] md:w-[70vw] w-full sm:px-16 px-5 pt-7 pb-14 mx-auto border border-gray-300 rounded-md">
        {clientSecret !== "" && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              orderID={orderData.id}
              reciptEmail={orderEmail}
              price={orderData.price}
              firstName={orderState.firstName}
              storagePlanID={orderState.storagePlan.id}
              basePrice={basePrice}
              vat={vat}
            />
          </Elements>
        )}
      </div>
    </main>
  );
};

export default Checkout;
