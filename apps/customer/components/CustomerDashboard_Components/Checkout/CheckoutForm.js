import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { Button, ErrorMessage } from "../";

export default function CheckoutForm({
  orderID,
  reciptEmail,
  price,
  firstName,
  storagePlanID,
  basePrice,
  vat,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  // console.log(storagePlanID);

  // Initialize
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });

    // Payment Request Code
    // const pr = stripe.paymentRequest({
    //   country: "UK",
    //   currency: "gbp",
    //   total: {
    //     label: "Pay for your Order",
    //     amount: price,
    //   },
    //   requestPayerName: true,
    //   requestPayerEmail: true,
    // });

    // pr.canMakePayment().then((result) => {
    //   if (result) {
    //     setPaymentRequest(pr);
    //   }
    // });
  }, [stripe]);

  // Handle payment submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/hire/checkout/validate-order?orderID=${orderID}&email=${reciptEmail}&firstName=${firstName}&price=${price}&storagePlanId=${storagePlanID}`,
        receipt_email: reciptEmail,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  // console.log({
  //   basePrice,
  //   vat,
  //   calculated: basePrice + basePrice * (vat / 100),
  // });

  // Handle Payment Request On Trigger

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {message && (
        <ErrorMessage
          className={"mb-3"}
          id="payment-message"
          error={message}
          setError={setMessage}
        />
      )}
      <PaymentElement id="payment-element" />
      <Button
        isLoading={isLoading}
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className={"mt-6"}
        width={"w-full"}
      >
        {`Pay now (£${basePrice + basePrice * (vat / 100)}`}{" "}
        <span className="text-sm capitalize font-normal">{`inc VAT`}</span>{" "}
        {`)`}
      </Button>
      {/* Show any error or success messages */}
    </form>
  );
}
