import React, { useState } from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui/shadcn";
import { ContentManagementView } from "ui/admin";

const Settings = () => {
  return (
    <AdminLayoutProvider
      headerComponent={
        <h3 className="text-lg font-semibold text-duber-navyBlue">
          App Settings
        </h3>
      }
    >
      <div className="">
        <Tabs
          defaultChecked
          value="customer-app"
          defaultValue="customer-app"
          className="w-full h-full rounded-sm"
        >
          <TabsList className="grid w-60 h-11 p-1 grid-cols-1">
            <TabsTrigger
              className="h-full font-semibold text-sm"
              value="customer-app"
            >
              Customer App
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customer-app">
            <CustomerApp />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayoutProvider>
  );
};

export default Settings;

function CustomerApp() {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState("/assets/marketing.mp4");

  return (
    <div className="mt-3">
      <Tabs
        defaultChecked
        defaultValue="content-management"
        className="w-full h-full rounded-sm"
      >
        <TabsList className="grid w-[600px] h-11 p-1 grid-cols-3">
          <TabsTrigger
            className="h-full font-semibold text-sm"
            value="content-management"
          >
            Content Management
          </TabsTrigger>
          <TabsTrigger
            className="h-full font-semibold text-sm"
            value="referrals"
          >
            Referrals
          </TabsTrigger>
          <TabsTrigger className="h-full font-semibold text-sm" value="pricing">
            Pricing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content-management">
          <ContentManagementView
            pilotExpertiseProps={{
              optionsMedia: {
                image: image,
                setImage: setImage,
                video: video,
                setVideo: setVideo,
              },
            }}
          />
        </TabsContent>
        <TabsContent value="referrals">
          <h2>Referrals</h2>
        </TabsContent>
        <TabsContent value="pricing">
          <h2>Pricing</h2>
        </TabsContent>
      </Tabs>
    </div>
  );
}
