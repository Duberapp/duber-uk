import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  MainLayout,
  DropdownSelector,
} from "../../../components/CustomerDashboard_Components";
import DashboardLayout from "../../../components/CustomerDashboard_Components/DashboardLayout";
import OrderCard from "../../../components/CustomerDashboard_Components/Dashboard/OrderCard";
import { useUser } from "@supabase/auth-helpers-react";
import { fetchOrders } from "../../../config/supabaseFunctions";
import Link from "next/link";

// Filtering for Orders
const filterItems = [
  { id: 1, label: "Every Status" },
  { id: 2, label: "Live" },
  { id: 3, label: "Completed" },
];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState(filterItems[0]);
  const user = useUser();
  const [orders, setOrders] = useState([]);
  const [orders_glob, setOrders_glob] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Initialize Orders data
  useEffect(() => {
    const initializeData = async () => {
      if (!user) return;
      try {
        setLoading(true);

        const { data: ordersData, error: ordersErr } = await fetchOrders({
          authUserId: user.id,
        });

        setOrders(ordersData);
        setOrders_glob(ordersData);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    initializeData();
  }, [user]);

  // Handle filter select
  useEffect(() => {
    if (activeFilter.label !== "Every Status") {
      let filtered_list = orders_glob.filter(
        (order) => order.status === activeFilter.label
      );
      setOrders(filtered_list);
    } else {
      setOrders(orders_glob);
    }
  }, [activeFilter]);

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
        <DashboardLayout title="Order History" parentLoading={loading}>
          <div className="w-full mt-3 bg-white rounded-md custom-shadow-sm py-3 px-4">
            <div className="w-full flex items-center gap-x-5">
              <p className="font-semibold text-navyBlue text-lg">Orders</p>
              <DropdownSelector
                filterItems={filterItems}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
            </div>

            {orders.length !== 0 ? (
              <div className="my-9 flex flex-col gap-y-5">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    data={order}
                    activeId={activeId}
                    setActiveId={setActiveId}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full flex items-center justify-center mt-5">
                <p className="text-gray-300 my-24">
                  No Orders to show <Link href={"/hire"}>Hire Now !</Link>{" "}
                </p>
              </div>
            )}
          </div>
        </DashboardLayout>
      </MainLayout>
    </div>
  );
};

export default Index;
