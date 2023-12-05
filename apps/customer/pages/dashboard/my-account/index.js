import React, { useState } from "react";
import Head from "next/head";
import { MainLayout } from "../../../components/CustomerDashboard_Components";
import DashboardLayout from "../../../components/CustomerDashboard_Components/DashboardLayout";
import PersonalDetailsCard from "../../../components/CustomerDashboard_Components/Dashboard/PersonalDetailsCard";
import AccountCredentialsCard from "../../../components/CustomerDashboard_Components/Dashboard/AccountCredentialsCard";
import SubscriptionModal from "../../../components/CustomerDashboard_Components/Dashboard/SubscriptionModal";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const [userData, setUserData] = useState({});
  const [subscriptionModalShow, setSubscriptionModalShow] = useState(false);

  return (
    <div className="relative">
      <Head>
        <title>Duber Drone Pilot Hire</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>

      <Toaster position="top-right" />
      <MainLayout>
        <DashboardLayout title="My Account" setData={setUserData}>
          {/* ============== ROW 1 ============== */}
          <div className="mt-3 w-full flex sm:flex-row flex-col items-center gap-x-7 gap-y-7 justify-between">
            {/* ============= COL 1 ============= */}
            <div className="flex-1 w-full bg-white rounded-lg py-5 px-5 custom-shadow-sm">
              <PersonalDetailsCard userData={userData} />
            </div>

            {/* ============= COL 2 ============= */}
            <div className="flex-1 w-full bg-white rounded-lg py-5 px-5 custom-shadow-sm">
              <AccountCredentialsCard userData={userData} />
            </div>
          </div>

          {/* ============= Row 2 ============= */}
          {subscriptionModalShow && (
            <SubscriptionModal
              setModalShow={setSubscriptionModalShow}
              userData={userData}
            />
          )}
          <div className="mt-7 flex-1 w-full bg-white rounded-lg py-5 px-5 custom-shadow-sm">
            <p className="mb-3 font-semibold text-navyBlue text-lg">
              Storage Plan Subscriptions
            </p>
            <div className="flex sm:flex-row flex-col items-end justify-between gap-x-24">
              <p className="text-sm text-navyBlue">{`
                  If you cancel any storage plan subscriptions, the files will be deleted at the end of the monthly on which we received the last subscription payment.
                `}</p>
              <button
                className="bg-navyBlue text-white min-w-fit text-sm px-9 py-2 rounded-md"
                onClick={() => setSubscriptionModalShow(true)}
              >
                Manage
              </button>
            </div>
          </div>

          {/* ============= Row 3 ============= */}
          <div className="mt-7 flex-1 w-full bg-white rounded-lg py-5 px-5 custom-shadow-sm">
            <p className="mb-3 font-semibold text-navyBlue text-lg">
              Danger Zone
            </p>
            <div className="flex sm:flex-row flex-col items-end justify-between gap-x-4">
              <p className="text-sm text-navyBlue">{`
                  If you delete this account, all account details associated with it will be permanently deleted. This includes any footages, images, or photos that were associated with orders placed using this account. Once the account is deleted, This information cannot be recovered. So it is important to make sure that you want permanently delete the account before proceeding.
                `}</p>
              <button className="bg-red-100 text-red-500 min-w-fit px-5 py-3 rounded-md">
                Delete Account
              </button>
            </div>
          </div>
        </DashboardLayout>
      </MainLayout>
    </div>
  );
};

export default Index;
