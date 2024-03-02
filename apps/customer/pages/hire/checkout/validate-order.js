import React from "react";
import {
  updateOrder,
  updateEmployeeJobs,
  sendOrderConfirmEmail,
} from "../../../config/supabaseFunctions";
import {
  updateStripeCustomerPaymentMethod,
  createSubscriptionPlan,
  retrivePaymentIntentMethod,
  retriveBillingData,
} from "../../../utils/utilityFunctions";

const ValidateOrder = () => {
  return <div>ValidateOrder</div>;
};

export default ValidateOrder;

export const getServerSideProps = async ({ query }) => {
  try {
    if (
      !query.orderID ||
      !query.payment_intent ||
      !query.payment_intent_client_secret ||
      !query.redirect_status ||
      !query.storagePlanId
    )
      throw new Error("Something went wrong !");

    const invoiceURL = `http://duber.uk/hire/invoice/${query.orderID}?paymentId=${query.payment_intent}`;

    // Update Stripe customer object's default payment method according to payment intent ID
    const { data: updateData, error: updateError } =
      await updateStripeCustomerPaymentMethod(query.payment_intent);

    // If storagePlanId is 2, Create Subscription, unless do nothing
    let subscriptionId = null;
    if (query.storagePlanId == 2) {
      let customerID = updateData.id;

      const { data: subscriptionData, error: subscriptionError } =
        await createSubscriptionPlan(customerID);

      subscriptionId = subscriptionData.id;
    }

    // -------------- Fetch Billing Address to Update Order Data --------------
    const { data: paymentIntentMethod, error: paymentIntentMethodErr } =
      await retrivePaymentIntentMethod(query.payment_intent);

    let billingData = null;
    if (!paymentIntentMethodErr) {
      try {
        const billingDataRes = await retriveBillingData(
          paymentIntentMethod?.paymentMethod?.billing_details?.address
            ?.postal_code
        );

        billingData = billingDataRes;
      } catch (err) {
        billingData = null;
        console.log(err);
      }
    }
    // ------------------------------------------------------------------------

    // Update order details
    const { data, error } = await updateOrder(
      {
        paymentID: query.payment_intent,
        datePaid: new Date(),
        invoiceURL,
        status: "Available",
        subscriptionId: subscriptionId,
        billing_address: billingData,
      },
      query.orderID
    );

    const { error: err } = await updateEmployeeJobs({
      JobID: data[0].id,
      date: data[0].date,
      status: "Available",
      area: data[0].area,
      capability: data[0].pilotExpertize,
      address: data[0].address,
      price: query.price,
      environment: data[0].environment,
      app_version: "v2",
      extendDuration: data[0].extendDuration,
      time_option: data[0].time_option,
      arrivalTime: data[0].arrivalTime,
    });

    // send email to customer
    const emailRes = await sendOrderConfirmEmail(
      query.orderID,
      query.email,
      query.firstName
    );

    return {
      redirect: {
        destination: `/hire/track-order/${query.orderID}`,
        permanent: false,
      },
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/hire",
        permanent: false,
      },
    };
  }
};
