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
  useToast,
} from "ui";
import axios from "axios";
import { adminAPIBaseURL } from "../../utils/adminAPI_SDK";
import { set, subDays } from "date-fns";

const AdminDashboard = () => {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isDataFetching, setIsDataFetching] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [currentView, setCurrentView] = useState("sales");
  const { toast } = useToast();
  const [salesResponse, setSalesResponse] = useState({
    data: null,
    error: null,
  });
  const [bookingsResponse, setBookingsResponse] = useState({
    data: null,
    error: null,
  });
  const [deliverablesresponse, setDeliverablesResponse] = useState({
    data: null,
    error: null,
  });

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

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // load data
  async function loadSalesData(date_range) {
    const res = await axios({
      baseURL: adminAPIBaseURL,
      url: `/dashboard/sales`,
      params: { from: date_range.from, to: date_range.to },
    });
    return res.data;
  }

  async function loadBookingsData(date_range) {
    const res = await axios({
      baseURL: adminAPIBaseURL,
      url: `/dashboard/bookings`,
      params: { from: date_range.from, to: date_range.to },
    });
    return res.data;
  }

  async function loadDeliverablesData(date_range) {
    const res = await axios({
      baseURL: adminAPIBaseURL,
      url: `/dashboard/deliverables`,
    });
    return res.data;
  }

  async function fetchDashboardData() {
    try {
      setIsDataFetching(true);

      // Prepare date range
      const date_range = {
        from: dateRange?.from?.toLocaleDateString(),
        to: dateRange?.to?.toLocaleDateString(),
      };

      // Fetch sales data
      if (currentView === "sales") {
        const salesData = await loadSalesData(date_range);
        if (salesData.error) throw salesData.error;
        setSalesResponse(salesData);
      }

      // Fetch booking data
      if (currentView === "booking") {
        const bookingsData = await loadBookingsData(date_range);
        if (bookingsData.error) throw bookingsData.error;
        setBookingsResponse(bookingsData);
      }

      // Fetch deliverables data
      if (currentView === "deliverables") {
        const deliverablesData = await loadDeliverablesData(date_range);
        if (deliverablesData.error) throw deliverablesData.error;
        setDeliverablesResponse(deliverablesData);
      }

      setIsDataFetching(false);
    } catch (err) {
      toast({
        title: "Something Went Wrong !",
        description: err?.response?.data?.error || err.message,
        variant: "destructive",
      });
      setIsDataFetching(false);
    }
  }

  // Fetch data on initial load (2 sec. delay)
  useEffect(() => {
    let timeoutId;

    if (dateRange?.from && dateRange?.to) {
      if (
        salesResponse.data === null ||
        bookingsResponse.data === null ||
        deliverablesresponse.data === null
      ) {
        fetchDashboardData();
      } else {
        timeoutId = setTimeout(fetchDashboardData, 2000);
      }

      return () => clearTimeout(timeoutId);
    }
  }, [dateRange, currentView]);

  if (loading) {
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <Loading className={"w-5 h-5 text-black"} />
      <p className="text-xs text-black">Loading Admin Dashboard...</p>
    </div>;
  }

  return (
    <AdminLayoutProvider
      headerComponent={
        <h3 className="text-lg font-semibold text-duber-navyBlue">Dashboard</h3>
      }
    >
      <Tabs
        defaultValue="sales"
        className="w-full h-full rounded-sm"
        onValueChange={(e) => {
          setCurrentView(e);
        }}
      >
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
              fromDate={subDays(new Date(), 31)}
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
              <DashboardSalesView data={salesResponse.data} />
            </TabsContent>
            <TabsContent value="booking">
              <DashboardBookingView data={bookingsResponse.data} />
            </TabsContent>
            <TabsContent value="deliverables">
              <DashboardDeliverablesView data={deliverablesresponse.data} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </AdminLayoutProvider>
  );
};

export default AdminDashboard;
