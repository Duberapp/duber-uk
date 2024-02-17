import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Comp1_animation from "../../../public/assets/Comp1_animation.json";
import payment_animation from "../../../public/assets/payment_animation.json";
import { useSelector } from "react-redux";
import {
  createCustomer,
  createOrder,
  createPaymentIntent,
  selectPaymentData,
} from "../../../config/supabaseFunctions";
import Checkout from "./Checkout";

const Validating = () => {
  const orderState = useSelector((state) => state.createOrder);
  const mapState = useSelector((state) => state.map);

  const [animationStatus, setAnimationStatus] = useState(false);
  const [validationStatus, setValidationStatus] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const [showCheckout, setShowCheckout] = useState(false);

  // ===================== METHODS =====================
  const [orderData, setOrderData] = useState({ price: null, id: null });
  const [orderEmail, setOrderEmail] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [basePrice, setBasePrice] = useState(100);
  const [scheduledPaymentData, setScheduledPaymentData] = useState();
  const [vat, setVat] = useState(20);
  const [stripeClientSecret, setStripeClientSecret] = useState(null);

  const handleSubmitOrder = async () => {
    let email;

    const storeCustomer = async () => {
      const { data, error } = await createCustomer({
        title: orderState.title,
        firstName: orderState.firstName,
        lastName: orderState.lastName,
        email: orderState.email,
        phoneNumber: orderState.telNumber,
        companyName: orderState.company,
      });
      if (error) throw new Error("Create customer failed");

      email = data[0].email;
      setOrderEmail(email);
      return data[0].id;
    };

    const customerID = await storeCustomer();

    const includedDuration =
      orderState.totalDuration - orderState.extendedDurationHours;
    const extendDuration = orderState.extendedDurationHours;

    const __createOrder = async () => {
      const { data, error } = await createOrder({
        id: Math.floor(Math.random() * 10000000),
        address: mapState.address,
        area: mapState.area,
        date: orderState.startDate,
        captureFormat: orderState.captureFormat,
        pilotExpertize: orderState.expertise,
        customerNote: orderState.customerNote,
        mapData: {
          center: mapState.center,
          zoom: mapState.zoom,
          polygon: mapState.polygons[0],
        },
        amount: mapState.price,
        customerID: customerID,
        authUserId: orderState.authUserId,
        environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
        storagePlan: orderState.storagePlan,
        app_version: "v2",
        includedDuration,
        extendDuration,
      });

      if (error) throw new Error("Create order failed");

      return data[0];
    };

    const orderData = await __createOrder();

    setOrderData({
      price: orderData.amount,
      id: orderData.id,
    });

    return orderData;
  };

  const getPaymentData = async () => {
    const { data: _paymentData, erro: paymentDataErr } =
      await selectPaymentData();

    setPaymentData(_paymentData[0]);
    return _paymentData[0];
  };

  const preparePrices = async (payment_data, order_data) => {
    if (payment_data) {
      setVat(payment_data.VAT);

      if (order_data.storagePlan.slug === "premium") {
        // set base price
        setBasePrice(payment_data.deposit.with_subscription);
      } else if (order_data.storagePlan.slug === "basic") {
        // set base price
        setBasePrice(payment_data.deposit.without_subscription);
      }

      // set scheduled price
      let scheduled_price_payload = {
        orderPrice: order_data.amount,
        deposit: payment_data.deposit.without_subscription,
        exVat: order_data.amount - payment_data.deposit.without_subscription,
        Vat:
          (order_data.amount - payment_data.deposit.without_subscription) *
          (payment_data.VAT / 100),
        incVat:
          order_data.amount -
          payment_data.deposit.without_subscription +
          (order_data.amount - payment_data.deposit.without_subscription) *
            (payment_data.VAT / 100),
      };

      setScheduledPaymentData(scheduled_price_payload);
    }
  };

  const initializePaymentIntent = async (order_data) => {
    const { data: _paymentData, erro: paymentDataErr } =
      await selectPaymentData();

    setPaymentData(_paymentData[0]);

    // Create PaymentIntent as soon as the page loads
    const { data, error } = await createPaymentIntent({
      customerData: {
        email: orderState.email,
        name: `${order_data.firstName} ${order_data.lastName}`,
        phone: order_data.telNumber,
      },
      basePrice:
        order_data.storagePlanId == 2
          ? _paymentData[0].deposit.with_subscription // MARKED_AS_CHANGED -> removed -10;
          : _paymentData[0].deposit.without_subscription,
      order_id: order_data.id,
      vat: _paymentData[0].VAT,
    });

    if (error) throw new Error("Create payment intent failed !");

    setStripeClientSecret(data.data.client_secret);
  };

  useEffect(() => {
    let ignoreEffect = false;

    /**
     * Validating Process
     *
     * Step 01 : Handle Create initial Order
     * Step 02 : Fetch payment data
     * Step 03 : Prepare Base Price + VAT of order
     * Step 04 : Initialize payment intent
     */
    const validationProcess = async () => {
      try {
        const _orderDataAll = await handleSubmitOrder();

        const __paymentData = await getPaymentData();

        await preparePrices(__paymentData, _orderDataAll);

        await initializePaymentIntent(_orderDataAll);

        setValidationStatus(true);
      } catch (err) {
        setValidationStatus(false);
        setValidationError(err.message);
      }
    };

    if (!ignoreEffect) {
      validationProcess();
    }

    return () => {
      ignoreEffect = true;
    };
  }, []);

  useEffect(() => {
    if (animationStatus && validationStatus) {
      // Navigate to Checkout
      setShowCheckout(true);
    }
  }, [animationStatus, validationStatus]);

  return (
    <>
      {!showCheckout ? (
        <main className="w-full sm:h-[80vh] h-[80vh] flex items-center justify-center flex-col">
          <div className="sm:w-72 w-60">
            <Lottie animationData={payment_animation} loop={true} />
          </div>

          <div className="-mt-8">
            {!validationError ? (
              <Lottie
                style={{
                  height: 79,
                }}
                animationData={Comp1_animation}
                loop={false}
                onComplete={() => setAnimationStatus(true)}
              />
            ) : (
              <p className="mt-8 text-sm text-gray-500">{`Error: ${validationError}`}</p>
            )}
          </div>
        </main>
      ) : (
        <Checkout
          clientSecret={stripeClientSecret}
          checkoutData={{
            orderState,
            orderData,
            orderEmail,
            mapState,
            basePrice,
            vat,
            scheduledPaymentData,
          }}
        />
      )}
    </>
  );
};

export default Validating;
