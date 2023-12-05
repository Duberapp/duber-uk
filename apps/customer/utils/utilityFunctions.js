import axios from "axios";
import { s3 } from "../config/aws";

export const getPolygonCenter = async (coordinates) => {
  const res = await axios({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    url: "/get-center",
    headers: {},
    data: {
      coordinates: coordinates,
    },
  });

  return res;
};

export const updateStripeCustomerPaymentMethod = async (paymentId) => {
  const res = await axios({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    url: "/stripe/update-customer-paymentMethod",
    headers: {},
    data: {
      paymentIntentId: paymentId,
    },
  });

  return res.data;
};

export const createSubscriptionPlan = async (customerId) => {
  const res = await axios({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    url: "/stripe/create-subscription",
    headers: {},
    data: {
      customerId: customerId,
    },
  });

  return res.data;
};

export const cancelSubscriptionPlan = async (subscriptionId) => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      url: "/stripe/cancel-subscription",
      headers: {},
      data: {
        subscriptionId: subscriptionId,
      },
    });

    // console.log(res.data);
    return res.data;
  } catch (err) {
    throw new Error("Failed to cancel subscription !");
  }
};

export const approveAffiliate = async ({
  id,
  firstName,
  referralLink,
  password,
  email,
  paypalAddress,
}) => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      url: "/client/approve-affiliate",
      headers: {},
      data: {
        id,
        firstName,
        referralLink,
        password,
        email,
        paypal_address: paypalAddress,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error("Failed to cancel subscription !");
  }
};

export const retrivePaymentIntentMethod = async (paymentId) => {
  const res = await axios({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    url: "/stripe/retrive-payment-intent-method",
    headers: {},
    data: {
      paymentIntentId: paymentId,
    },
  });

  return res.data;
};

export const retriveBillingData = async (postalCode) => {
  const res = await axios({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    url: "/get-address-from-zipcode",
    headers: {},
    data: {
      postalCode: postalCode,
    },
  });

  return res.data;
};

const isS3ObjectExists = async (s3_folder_name) => {
  const data = await s3
    .listObjectsV2({
      Bucket: "duber-order-assets",
      Prefix: `${s3_folder_name}`,
    })
    .promise();

  const objectExists = data.Contents.some(
    (obj) =>
      obj.Key === `${s3_folder_name}/DuberDeliverables-${s3_folder_name}.zip`
  );

  return objectExists;
};

export const handleDownloadZip = async (s3_folder_name) => {
  try {
    const isExists = await isS3ObjectExists(s3_folder_name);

    if (!isExists) throw new Error("Archived file not available");

    const url = s3.getSignedUrl("getObject", {
      Bucket: "duber-order-assets",
      Key: `${s3_folder_name}/DuberDeliverables-${s3_folder_name}.zip`,
      Expires: 3600000,
    });

    return {
      data: url,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err.message,
    };
  }
};

export const getS3Object_DownloadLink = async (bucketName, prefix) => {
  try {
    const data = await s3
      .listObjectsV2({
        Bucket: bucketName,
        Prefix: prefix,
      })
      .promise();

    const objectExists = data.Contents.some((obj) => obj.Key === prefix);

    if (objectExists) {
      const url = s3.getSignedUrl("getObject", {
        Bucket: bucketName,
        Key: prefix,
        Expires: 3600000,
      });

      return {
        data: url,
        error: null,
      };
    }
  } catch (err) {
    return {
      data: null,
      error: err,
    };
  }
};

export const sleep = (time) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, time);
  });

  return promise;
};
