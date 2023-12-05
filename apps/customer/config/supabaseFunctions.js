import {
  supabaseCustomerClient,
  supabaseEmployeeClient,
} from "./supabaseClient";
import axios from "axios";
import { EncryptPassword } from "../utils/securePassword";

// Auth
export const registerUser = async (body) => {
  const res = await supabaseCustomerClient.auth.signUp({
    email: body.email,
    password: body.password,
  });
  return res;
};

export const loginUser = async (body) => {
  const res = await supabaseCustomerClient.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  return res;
};

export const getSession = async () => {
  const res = await supabaseCustomerClient.auth.getSession();

  return res;
};

export const logoutUser = async () => {
  const res = await supabaseCustomerClient.auth.signOut();

  return res;
};

//Orders
export const createCustomer = async (body) => {
  const res = await supabaseCustomerClient
    .from("Customers")
    .insert(body)
    .select();

  return res;
};

export const createOrder = async (body) => {
  const res = await supabaseCustomerClient.from("Orders").insert(body).select();

  return res;
};

export const updateOrder = async (body, id) => {
  const res = await supabaseCustomerClient
    .from("Orders")
    .update(body)
    .eq("id", id)
    .select();

  return res;
};

export const fetchOrder = async (orderId) => {
  const res = await supabaseCustomerClient
    .from("Orders")
    .select("*")
    .eq("id", orderId);

  return res;
};

export const fetchOrders = async (query) => {
  // "5741691d-db7f-4269-8c1f-10c24658adbb"
  const res = await supabaseCustomerClient
    .from("Orders")
    .select("*")
    .match(query)
    .not("status", "is", null)
    .not("paymentID", "is", null);

  return res;
};

export const updateEmployeeJobs = async (body) => {
  const res = await supabaseEmployeeClient.from("Jobs").insert(body);

  return res;
};

export const getPilotData = async (id) => {
  const res = await supabaseEmployeeClient
    .from("Employees")
    .select(
      "firstName, lastName, telNumber, email, userSkills, userDrones, profilePic"
    )
    .eq("id", id);

  return res;
};

export const sendOrderConfirmEmail = async (orderId, email, firstName) => {
  const res = await axios({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    url: "/client/email/place-order",
    headers: {},
    data: {
      clientEmail: email,
      params: {
        orderId: orderId,
        trackingLink: `https://duber.uk/hire/track-order/${orderId}`,
        email,
        firstName,
      },
    },
  });

  return res;
};

// Payments
export const createPaymentIntent = async (data) => {
  const res = await axios({
    method: "POST",
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    url: "/client/create-payment-intent",
    headers: {},
    data,
  });

  return res;
};

// All Drone Pilot Details
export const allDronePilots = async () => {
  try {
    let dataSet = [];

    // Get Pilot details
    const { data: pilotDetails, error: pilotDetailsError } =
      await supabaseEmployeeClient
        .from("Employees")
        .select()
        .eq("approved", true);
    if (pilotDetailsError) throw new Error("Get all pilots fetching failed");

    // Get each pilot billing details and order details
    await Promise.all(
      pilotDetails.map(async (pilot) => {
        // Fetching billing address
        const { data: billingData, error: billingDataError } =
          await supabaseEmployeeClient
            .from("EmployeeBilling")
            .select()
            .eq("userId", pilot.id);

        if (billingDataError) throw new Error("Get billing data error");

        // Fetching Orders
        const { data: jobsData, error: jobsError } =
          await supabaseEmployeeClient
            .from("Jobs")
            .select()
            .eq("pilotID", pilot.id);

        if (jobsError) throw new Error("Get jobs data error");

        dataSet.push({ pilot, billing: billingData[0], jobs: jobsData });
      })
    );

    return {
      data: dataSet,
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};

// GetPilotLocations
export const getEachPilotLocation = async (pilotList) => {
  let coordinateList = [];

  await Promise.all(
    pilotList.map(async (pilot) => {
      if (pilot.billing !== undefined) {
        if (pilot.billing.street !== "") {
          let address_text = `${
            pilot.billing.home_street || pilot.billing.billing_street
          }, ${pilot.billing.home_city || pilot.billing.billing_city}, ${
            pilot.billing.home_country || pilot.billing.billing_country
          }`;

          const location_res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${address_text}.json?access_token=${process.env.NEXT_MAPBOX_TOKEN}&country=gb`
          );
          const location_data = await location_res.json();

          coordinateList.push({
            pilot: `${pilot.pilot.firstName} ${pilot.pilot.lastName}`,
            location: location_data?.features[0],
          });
        }
      }
    })
  );

  return coordinateList;
};

// Users Table
export const createAuthUser_Contact = async ({
  email,
  password,
  accountData,
}) => {
  try {
    // Get is already exsits
    const { data: selectUserData, error: selectUserErr } =
      await supabaseCustomerClient.from("Users").select().eq("email", email);

    if (selectUserErr) throw selectUserErr;

    // Throw, if users records found
    if (selectUserData.length !== 0) {
      throw new Error("User already have an account.! Please login.");
    }

    // Register new user on Auth
    const { data: registerData, error: registerErr } = await registerUser({
      email: email,
      password: password,
    });
    if (registerErr) throw registerErr;

    // Save user data on Users table
    const { data: createUserRes, error: createUserErr } = await createUser({
      ...accountData,
      email: email,
      user_id: registerData.user.id,
      encrypted_password: EncryptPassword(password),
    });
    if (createUserErr) throw new Error("Register success, Save info failed !");

    return { data: "success", error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

export const createUser = async (data) => {
  const res = await supabaseCustomerClient.from("Users").insert(data).select();

  return res;
};

export const selectUser = async (id) => {
  if (id) {
    const res = await supabaseCustomerClient
      .from("Users")
      .select()
      .eq("user_id", id);
    return res;
  } else {
    const res = await supabaseCustomerClient.from("Users").select();
    return res;
  }
};

export const updateUser = async (data, query) => {
  const res = await supabaseCustomerClient
    .from("Users")
    .update(data)
    .match(query);

  return res;
};

export const updateAuthPassword = async (newPassword, userEmail) => {
  const res = await supabaseCustomerClient.auth.updateUser({
    password: newPassword,
  });

  if (!res.error) {
    await supabaseCustomerClient
      .from("Users")
      .update({ encrypted_password: EncryptPassword(newPassword) })
      .eq("email", userEmail);
  }

  return res;
};

// Affiliate Database Related
export const selectAffiliateData = async (query) => {
  const res = await supabaseCustomerClient
    .from("Affiliates")
    .select("*")
    .match(query);

  return res;
};

export const selectAllAffiliates = async (query) => {
  const res = await supabaseCustomerClient
    .from("Affiliates")
    .select(
      `
      id,
      password,
      paypal_address,
      referral_link,
      status,
      customer_id (
        firstName,
        lastName,
        email,
        phoneNumber,
        companyName
      )
    `
    )
    .match(query);

  return res;
};

export const applyAffiliate = async (customerId, query) => {
  const res = await supabaseCustomerClient.from("Affiliates").insert(query);

  return res;
};

// Payment data table
export const selectPaymentData = async () => {
  const res = await supabaseCustomerClient.from("PaymentData").select();

  return res;
};

export const updatePaymentData = async (query) => {
  const res = await supabaseCustomerClient
    .from("PaymentData")
    .update(query)
    .eq("id", 1);

  return res;
};

// Customers data table
export const selectCustomer = async (id) => {
  const res = await supabaseCustomerClient
    .from("Customers")
    .select("*")
    .eq("id", id);

  return res;
};
