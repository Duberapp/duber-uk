import React from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui/shadcn";
import {
  CustomersOverviewTab,
  CustomersSalesTab,
  CustomersDeliverablesTab,
} from "ui/admin";
import GoogleMap from "../../../components/GoogleMap";

const SingleCustomer = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdminLayoutProvider
      headerComponent={
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-duber-pink">#{id}</h3>

          <div
            className="flex items-center gap-x-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="text-slate-400 w-5 h-5" />
            <p className="text-sm text-slate-400">Back to Customers</p>
          </div>
        </div>
      }
    >
      <div className="">
        <div className="flex flex-row gap-x-4">
          <div className="flex-1">
            <div className="bg-duber-navyBlue py-3 px-4 w-full rounded-lg">
              <p className="font-light text-white text-sm">Customer Name</p>
              <p className="font-semibold text-white text-lg">Jaime Harris</p>
            </div>

            <p className="mt-3 font-semibold text-duber-navyBlue">
              Customer Details
            </p>

            <div className="flex flex-col gap-y-3">
              <div className="">
                <p className="text-sm text-slate-400">Title</p>
                <p className="text-duber-navyBlue">Mr</p>
              </div>
              <div className="">
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-duber-navyBlue">jaime@premierseal.co.uk</p>
              </div>
              <div className="">
                <p className="text-sm text-slate-400">Phone Number</p>
                <p className="text-duber-navyBlue">07840774043</p>
              </div>
              <div className="">
                <p className="text-sm text-slate-400">Company</p>
                <p className="text-duber-navyBlue">Premierseal</p>
              </div>
              <div className="">
                <p className="text-sm text-slate-400">User Type</p>
                <p className="text-duber-navyBlue">Guest</p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="flex-1 bg-slate-200 rounded-xl overflow-hidden">
            <GoogleMap
              markerMap={true}
              markers={[
                { lat: 50.851163, lng: -1.082433 },
                { lat: 50.850897, lng: -1.082414 },
              ]}
              mapState={"static"}
              location={{
                lat: 54.5319222,
                lng: -4.4985882,
              }}
              zoom={5}
              staticMapType={"roadmap"}
              preventZoom
            />
          </div>
        </div>

        {/* Views */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full h-full rounded-sm">
            <TabsList className="grid w-[600px] h-11 p-1 grid-cols-4">
              <TabsTrigger
                className="h-full font-semibold text-sm"
                value="overview"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                className="h-full font-semibold text-sm"
                value="sales"
              >
                Sales
              </TabsTrigger>
              <TabsTrigger
                className="h-full font-semibold text-sm"
                value="deliverables"
              >
                Deliverables
              </TabsTrigger>
              <TabsTrigger
                className="h-full font-semibold text-sm"
                value="settings"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <CustomersOverviewTab
                totalBookings={"5"}
                totalSales={"1,750"}
                totalDeliverableSize={"20GB"}
                subscriptions={0}
              />
            </TabsContent>
            <TabsContent value="sales">
              <CustomersSalesTab
                refunds={0}
                topSales={"1,750"}
                totalPilotPayouts={750}
                totalProfit={"1,000"}
              />
            </TabsContent>
            <TabsContent value="deliverables">
              <CustomersDeliverablesTab
                photos={1240}
                totalDeliverablesSize={"20GB"}
                totalFiles={1472}
                videos={232}
              />
            </TabsContent>
            <TabsContent value="settings">
              <h1>settings</h1>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayoutProvider>
  );
};

export default SingleCustomer;
