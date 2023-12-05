import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  MainLayout,
  LoadingSpinner,
  Button,
  FaqSection,
  AffiliateCard,
  AffiliateModal,
} from "../../components/CustomerDashboard_Components";
import DashboardLayout from "../../components/CustomerDashboard_Components/DashboardLayout";
import {
  fetchOrders,
  selectUser,
  selectAffiliateData,
} from "../../config/supabaseFunctions";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import OrderCard from "../../components/CustomerDashboard_Components/Dashboard/OrderCard";

const Index = ({ initialSession }) => {
  const router = useRouter();
  const session = useSession();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [liveOrdersCount, setLiveOrdersCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [affiliateInfo, setAffiliateInfo] = useState({
    state: "", // registered, not-registered or pending
    referral_link: "",
  });
  const [customerId, setCustomerId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  // Intialize Data and Auth
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);

        // Handle route
        if (!session) return router.push("/auth/login");

        // Get user orders
        const { data: ordersData, error: ordersDataErr } = await fetchOrders({
          authUserId: user.id,
        });

        if (ordersDataErr) throw new Error("Cannot fetch orders !");
        setOrders(ordersData.slice(0, 3));
        // ============================

        // Get Other order data
        const liveOrders = ordersData.filter(
          (order) => order.status === "Live" || order.status === "Available"
        );
        setLiveOrdersCount(liveOrders.length);
        const completedOrders = ordersData.filter(
          (order) => order.status === "Completed"
        );
        setCompletedOrdersCount(completedOrders.length);
        // ============================

        // Get affiliate informations
        const { data: userData, error: userDataErr } = await selectUser(
          user.id
        );
        setCustomerId(userData[0].id);

        const { data: affiliateData, error: affiliateDataErr } =
          await selectAffiliateData({ customer_id: userData[0].id });

        if (affiliateData.length !== 0) {
          setAffiliateInfo({
            state: affiliateData[0].status,
            referral_link: affiliateData[0].referral_link,
          });
        } else {
          setAffiliateInfo({
            state: "not-registered",
            referral_link: "",
          });
        }

        // ============================

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    initializeData();
  }, [session]);

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
        <Toaster position="top-right" />
        <DashboardLayout title="Dashboard" parentLoading={loading}>
          {/* ============= Card 1 ============= */}
          <div className="mt-3 p-3 rounded-lg bg-white custom-shadow flex items-center justify-between gap-x-4">
            <div className="">
              <p className="sm:text-sm text-xs text-navyBlue">{`We've got you covered`}</p>
              <p className="mt-1 sm:text-lg text-base font-semibold text-navyBlue whitespace-nowrap">{`Hire a drone pilot now`}</p>
            </div>

            <Button
              onClick={() => router.push("/hire")}
              width={"w-48"}
              className="text-sm capitalize font-medium"
            >
              Book Now
            </Button>
          </div>

          {/* ============= Card 2 ============= */}
          <div className="mt-9 rounded-lg px-3 py-5 bg-white custom-shadow-sm">
            <p className="text-base text-navyBlue font-semibold">
              Order History
            </p>
            {orders.length !== 0 ? (
              <div className="mt-4 flex flex-col gap-y-4">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    data={order}
                    activeId={activeId}
                    setActiveId={setActiveId}
                  />
                ))}

                <div className="w-full flex items-center justify-center">
                  <button
                    onClick={() => router.push("/dashboard/order-history")}
                    className="mt-2 text-sm bg-navyBlue text-white rounded-md px-6 py-2"
                  >
                    View More
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-gray-400">
                No previous orders to show{" "}
                <Link href="/hire" className="ml-2 text-primaryTeal underline">
                  Place order
                </Link>
              </p>
            )}
          </div>

          {/* ============= Card 3 ============= */}
          <div className="mt-7 flex items-center justify-between gap-x-7">
            <div className="w-full min-h-[160px] rounded-lg px-3 bg-white custom-shadow-sm flex flex-col items-center justify-center">
              <div className="rounded-md w-12 h-12 flex items-center justify-center bg-red-100">
                <p className="text-red-500">{liveOrdersCount}</p>
              </div>

              <p className="mt-3 font-semibold text-navyBlue">Live Orders</p>
            </div>

            <div className="w-full min-h-[160px] rounded-lg px-3 bg-white custom-shadow-sm flex flex-col items-center justify-center">
              <div className="rounded-md w-12 h-12 flex items-center justify-center bg-teal-100">
                <p className="text-teal-500">{completedOrdersCount}</p>
              </div>

              <p className="mt-3 font-semibold text-navyBlue whitespace-nowrap">
                Completed Orders
              </p>
            </div>
          </div>

          {/* ===================== Affiliate Card =====================  */}
          {/* Join affiliates modal */}
          {modalShow && (
            <div className="fixed transition-all duration-150 w-full h-full flex items-center justify-center top-0 left-0 bg-[#ffffff4b] z-[10000]">
              <AffiliateModal
                setModalShow={setModalShow}
                customerId={customerId}
                setAffiliateInfo={setAffiliateInfo}
              />
            </div>
          )}

          <div className="mt-7">
            <AffiliateCard
              setModalShow={setModalShow}
              status={affiliateInfo.state}
              referralLink={affiliateInfo.referral_link}
            />
          </div>
          {/* ========================================================== */}

          <div className="mt-7">
            <FaqSection />
          </div>
        </DashboardLayout>
      </MainLayout>
    </div>
  );
};

export default Index;

function formatDate(inputDate) {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year}`;
}
