import React from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { useRouter } from "next/router";
import GoogleMap from "../../../components/GoogleMap";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui/shadcn";
import { PilotOverviewTab, PilotCredentialsTab } from "ui/admin";
import { pilot_skills } from "global-constants";

const SinglePilot = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdminLayoutProvider
      headerComponent={
        <h3 className="text-lg font-semibold text-duber-pink">#{id}</h3>
      }
    >
      <div>
        <div className="flex flex-row gap-x-4">
          <div className="flex-1">
            <div className="bg-duber-navyBlue py-3 px-4 w-full rounded-xl">
              <p className="font-light text-white text-sm">Drone Pilot Name</p>
              <p className="font-semibold text-white text-lg">Jaime Harris</p>
            </div>

            <p className="mt-3 font-semibold text-duber-navyBlue">
              Drone Pilot Details
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

          {/* Map Component */}
          <div className="flex-1 relative rounded-xl overflow-hidden">
            <div className="absolute top-5 right-5 w-28 h-28 rounded-xl overflow-hidden z-[1000000]">
              <img
                // src={user.profilePic ? profilePic : "/assets/avatar.jpg"}
                src={`/assets/avatar.jpg`}
                className="w-full h-full"
              />
            </div>
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
            <TabsList className="grid w-[600px] h-11 p-1 grid-cols-3">
              <TabsTrigger
                className="h-full font-semibold text-sm"
                value="overview"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                className="h-full font-semibold text-sm"
                value="credentials"
              >
                Credentials
              </TabsTrigger>
              <TabsTrigger
                className="h-full font-semibold text-sm"
                value="settings"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <PilotOverviewTab
                rating={"4.3/5"}
                totalDeliverableSize={"20GB"}
                totalPayouts={"£1,750"}
                totalJobs={5}
              />
            </TabsContent>
            <TabsContent value="credentials">
              <PilotCredentialsTab
                flyerID={`134-232-3241`}
                operatorID={`343-243-343`}
                trainingProof="#"
                insuranceProof="#"
                pilotSkillList={pilot_skills}
                dronesList={[
                  "DJI, Mini Series",
                  "Parrot, ANAFI Work",
                  "Parrot, ANAFI Extended",
                ]}
                reviews={[
                  {
                    jobID: 133245,
                    ratingReason: "Deliverables Quality",
                    ratingScore: 2,
                  },
                  {
                    jobID: 133245,
                    ratingReason: "App Issue",
                    ratingScore: 5,
                  },
                  {
                    jobID: 133245,
                    ratingReason: "Late",
                    ratingScore: 3,
                  },
                  {
                    jobID: 133245,
                    ratingReason: "Professionalism",
                    ratingScore: 4,
                  },
                  {
                    jobID: 133245,
                    ratingReason: "Other",
                    ratingScore: 1,
                  },
                  {
                    jobID: 133245,
                    ratingReason: "Deliverables Quality",
                    ratingScore: 2,
                  },
                ]}
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

export default SinglePilot;
