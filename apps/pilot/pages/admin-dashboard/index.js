import React, { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { getUserByEmail } from "../../config/supabaseFunctions";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/currentUser";
import AdminLayoutProvider from "../../components/AdminComponents_V2/AdminLayoutProvider";
import {
  Loading,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DatePickerWithRange,
  DashboardSalesView,
  DashboardBookingView,
  DashboardDeliverablesView,
} from "ui";

const AdminDashboard = () => {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isDataFetching, setIsDataFetching] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  // Fetch user
  useEffect(() => {
    // Get current user and save data as global state
    const getUserData = async () => {
      setLoading(true);

      const { data, error } = await getUserByEmail(user.email);
      if (error) return;

      dispatch(setCurrentUser(data[0]));

      setLoading(false);
    };

    if (user) getUserData();
  }, [user]);

  if (loading) {
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <Loading className={"w-5 h-5 text-black"} />
      <p className="text-xs text-black">Loading Admin Dashboard...</p>
    </div>;
  }

  // load data
  function fakeAsyncMethod() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Fake async operation completed");
      }, 1000); // simulating a 2-second delay
    });
  }

  async function fetchDashboardData() {
    try {
      setIsDataFetching(true);

      const result = await fakeAsyncMethod();
      console.log(result);

      setIsDataFetching(false);
    } catch (err) {
      console.log(err);
      setIsDataFetching(false);
    }
  }

  useEffect(() => {
    console.log(dateRange);

    fetchDashboardData();
  }, [dateRange]);

  return (
    <AdminLayoutProvider
      headerComponent={
        <h3 className="text-lg font-semibold text-duber-navyBlue">Dashboard</h3>
      }
    >
      <Tabs defaultValue="sales" className="w-full h-full rounded-sm">
        <div className="w-full flex items-center justify-between mb-5">
          <TabsList className="grid w-[400px] h-11 p-1 grid-cols-3">
            <TabsTrigger className="h-full font-semibold text-sm" value="sales">
              Sales
            </TabsTrigger>
            <TabsTrigger
              className="h-full font-semibold text-sm"
              value="booking"
            >
              Booking
            </TabsTrigger>
            <TabsTrigger
              className="h-full font-semibold text-sm"
              value="deliverables"
            >
              Deliverables
            </TabsTrigger>
          </TabsList>

          <div className="">
            <DatePickerWithRange
              className="h-11"
              fromDate={new Date()}
              toDate={new Date()}
              alignment="end"
              onChangeDateRange={(range) => setDateRange(range)}
            />
          </div>
        </div>

        {isDataFetching ? (
          <div className="w-full h-full flex items-center justify-center flex-1">
            <div className="mt-6 bg-slate-50 p-3 rounded-full shadow-lg">
              <Loading className="h-6 w-6 animate-spin text-duber-navyBlue" />
            </div>
          </div>
        ) : (
          <>
            <TabsContent value="sales">
              <DashboardSalesView />
            </TabsContent>
            <TabsContent value="booking">
              <DashboardBookingView />
            </TabsContent>
            <TabsContent value="deliverables">
              <DashboardDeliverablesView />
            </TabsContent>
          </>
        )}
      </Tabs>
    </AdminLayoutProvider>
  );
};

export default AdminDashboard;
