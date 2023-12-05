import React, { useState, useEffect } from "react";
import Head from "next/head";
import { MainLayout } from "../../../components/CustomerDashboard_Components";
import DashboardLayout from "../../../components/CustomerDashboard_Components/DashboardLayout";
import { LoadingSpinner } from "../../../components/CustomerDashboard_Components";
import { selectAllAffiliates } from "../../../config/supabaseFunctions";
import { approveAffiliate } from "../../../utils/utilityFunctions";

const Index = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approveLoadingValues, setApproveLoadingValues] = useState([]);
  const [referralLinkValues, setReferralLinkValues] = useState([]);
  const [passwordValues, setPasswordValues] = useState([]);

  const initializeData = async () => {
    try {
      setLoading(true);

      const { data, error } = await selectAllAffiliates({
        status: "pending",
      });
      if (error) throw new Error("Cannot fetch affiliate requests !");

      setRequests(data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // initializeData on component loaded
  useEffect(() => {
    initializeData();
  }, []);

  // Handle approve request
  const handleApprove = async (id, firstName, email, paypalAddress) => {
    try {
      // Handle Loader -> Activate
      const newLoadingValues_activate = [...approveLoadingValues];
      newLoadingValues_activate[id] = true;
      setApproveLoadingValues(newLoadingValues_activate);
      // =================================================

      const res = await approveAffiliate({
        firstName: firstName,
        referralLink: referralLinkValues[id],
        email: email,
        password: passwordValues[id],
        id: id,
        paypalAddress,
      });
      console.log(res);

      // =================================================
      // Handle Loader -> Deactivate
      const newLoadingValues_deactivate = [...approveLoadingValues];
      newLoadingValues_deactivate[id] = false;
      setApproveLoadingValues(newLoadingValues_deactivate);

      // Initialize data again
      initializeData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative">
      <Head>
        <title>Duber Drone Pilot Hire</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <MainLayout>
        <DashboardLayout title="Referral Requests" parentLoading={loading}>
          <div className="w-full p-3 pb-8 mt-3 custom-shadow rounded-md">
            <h2 className="font-semibold text-navyBlue">Requests</h2>

            <div className="mt-5 mx-2 flex flex-col gap-y-4">
              {requests.length > 0 &&
                requests.map((request) => (
                  <div
                    key={request.id}
                    className="w-full bg-white rounded-md custom-shadow-sm p-4"
                  >
                    <p className="font-semibold">
                      {request.customer_id.firstName}{" "}
                      {request.customer_id.lastName}
                    </p>

                    <div className="flex items-center gap-x-3">
                      <p className="text-sm text-gray-400">
                        {request.customer_id.email}
                      </p>
                      {request.paypal_address && (
                        <p className="text-sm text-gray-400">
                          {request.paypal_address}
                        </p>
                      )}
                      <p className="text-sm text-gray-400">
                        {request.customer_id.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-400">
                        {request.customer_id.companyName}
                      </p>
                    </div>

                    <div className="mt-5 flex items-end">
                      <div className="flex-1 flex-col pr-5">
                        <input
                          value={referralLinkValues[request.id] || ""}
                          onChange={(e) => {
                            const newLinkValues = [...referralLinkValues];
                            newLinkValues[request.id] = e.target.value;
                            setReferralLinkValues(newLinkValues);
                          }}
                          type="text"
                          className="w-full h-12 rounded-md bg-primaryBlueLight text-primaryBlue text-sm outline-none px-3 placeholder:text-primaryBlue"
                          placeholder="Enter Referral Link"
                        />
                        <input
                          value={passwordValues[request.id] || ""}
                          onChange={(e) => {
                            const newPasswordValues = [...passwordValues];
                            newPasswordValues[request.id] = e.target.value;
                            setPasswordValues(newPasswordValues);
                          }}
                          type="text"
                          className="mt-3 w-72 h-12 rounded-md bg-primaryBlueLight text-primaryBlue text-sm outline-none px-3 placeholder:text-primaryBlue"
                          placeholder="Password"
                        />
                      </div>

                      <button
                        onClick={() =>
                          handleApprove(
                            request.id,
                            request.customer_id.firstName,
                            request.customer_id.email,
                            request.paypal_address
                          )
                        }
                        className="flex items-center justify-center w-24 text-sm font-semibold bg-primaryTeal text-navyBlue outline-none h-12 rounded-md"
                      >
                        {approveLoadingValues[request.id] === true ? (
                          <LoadingSpinner
                            width={5}
                            height={5}
                            color="navyBlue"
                          />
                        ) : (
                          "Approve"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </DashboardLayout>
      </MainLayout>
    </div>
  );
};

export default Index;
