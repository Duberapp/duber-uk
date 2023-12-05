import pilotClient from "./supabaseClient";
import customerClient from "./customerClient";
import axios from "axios";

export const getHomeBillingAddress = async (userId) => {
  const { data, error } = await pilotClient
    .from("EmployeeBilling")
    .select("*")
    .eq("userId", userId);

  let homeAddress;
  let billingAddress;

  if (!error) {
    data = data[0];
    homeAddress =
      data?.home_street ||
      data?.home_city ||
      data?.home_postCode ||
      data?.home_country;

    billingAddress =
      data?.billing_street ||
      data?.billing_city ||
      data?.billing_postCode ||
      data?.billing_country;

    return { data: { homeAddress, billingAddress }, error: null };
  } else {
    return { data: null, error };
  }
};

export const getBankInformation = async (userId) => {
  const { data, error } = await pilotClient
    .from("EmployeeBilling")
    .select("*")
    .eq("userId", userId);

  return { data, error };
};

export const getPolygonCenter = async (coordinates) => {
  const res = await axios({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASEURL,
    url: "/get-center",
    headers: {},
    data: {
      coordinates: coordinates,
    },
  });

  return res;
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
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASEURL,
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

// Payment Functions
export const createStripeConnectedAccount = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASEURL,
      url: "/stripe/connect/create-account",
      headers: {},
      data,
    });

    return { data: res, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

// get S3 presigned url
export const getPresignedUrl = async (file, folderName) => {
  const { data: signedURLRes } = await axios.get(
    `/api/fileUpload?fileName=${file.name}&fileType=${file.type}&folderName=${folderName}`
  );

  return signedURLRes;
};
