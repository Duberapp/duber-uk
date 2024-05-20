import React, { useState } from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import GoogleMaps from "../../../components/GoogleMap";
import { PilotCard, FilterDropdown } from "ui";
import { PilotExpertiseValues } from "global-constants";
import { useRouter } from "next/router";

const Pilots = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("");

  const handleViewCustomer = (pilotID) => {
    router.push(`/admin-dashboard/pilots/${pilotID}`);
  };

  return (
    <AdminLayoutProvider
      headerComponent={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <h3 className="text-lg font-semibold text-duber-navyBlue">
              Drone Pilots
            </h3>

            <input
              type="text"
              placeholder="Search Pilots Name, ID"
              className="placeholder:text-slate-400 placeholder:font-medium placeholder:text-sm text-slate-700 bg-transparent w-96 outline-none text-sm font-semibold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="">
            <FilterDropdown
              placeholder="Filter by User Type"
              dropdownLabel="Select type to filter customers"
              items={PilotExpertiseValues}
              value={expertiseFilter}
              setValue={setExpertiseFilter}
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-y-4">
        <div className="w-full rounded-xl overflow-hidden h-96">
          <GoogleMaps
            markerMap={true}
            markers={[
              { lat: 50.851163, lng: -1.082433 },
              { lat: 50.850897, lng: -1.082414 },
            ]}
            mapState={"static"}
            location={{ lat: 52.6671929, lng: -2.1114839 }}
            zoom={7}
            staticMapType={"roadmap"}
            preventZoom
          />
        </div>

        <div className="flex flex-col gap-y-5 pb-4">
          <PilotCard
            name="Jamie Harris"
            company="None"
            totalJob="5"
            pilotID="2342354"
            onView={() => handleViewCustomer("2342354")}
          />
          <PilotCard
            name="Jamie Harris"
            company="None"
            totalJob="5"
            pilotID="2342354"
            onView={() => handleViewCustomer("2342354")}
          />
          <PilotCard
            name="Jamie Harris"
            company="None"
            totalJob="5"
            pilotID="2342354"
            onView={() => handleViewCustomer("2342354")}
          />
          <PilotCard
            name="Jamie Harris"
            company="None"
            totalJob="5"
            pilotID="2342354"
            onView={() => handleViewCustomer("2342354")}
          />
        </div>
      </div>
    </AdminLayoutProvider>
  );
};

export default Pilots;
