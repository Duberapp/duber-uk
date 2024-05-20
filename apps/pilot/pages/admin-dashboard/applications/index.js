import React, { useState } from "react";
import AdminLayoutProvider from "../../../components/AdminComponents_V2/AdminLayoutProvider";
import { FilterDropdown } from "ui";
import { ApplicationCard } from "ui/admin";
import { ApplicationsFilterValues } from "global-constants";

const Applications = () => {
  const [activeApplication, setActiveApplication] = useState(null);
  const [filter, setFilter] = useState(null);

  return (
    <AdminLayoutProvider
      headerComponent={
        <div className="flex items-center gap-x-3">
          <h3 className="text-lg font-semibold text-duber-navyBlue">
            Applications
          </h3>

          <FilterDropdown
            value={filter}
            setValue={setFilter}
            items={ApplicationsFilterValues}
            dropdownLabel="Select status to filter"
            placeholder="Filter by Status"
          />
        </div>
      }
      isApplicationView
      activeApplication={activeApplication}
    >
      <div className="flex flex-col gap-y-3">
        <ApplicationCard
          pilotID="#12345"
          pilotName="Jaime Harris"
          createdAt={new Date().toLocaleString().split(",")[0]}
          isApproved={true}
          handleView={(pilotID) => setActiveApplication(pilotID)}
          activeID={activeApplication}
        />
        <ApplicationCard
          pilotID="#456789"
          pilotName="Jaime Harris"
          createdAt={new Date().toLocaleString().split(",")[0]}
          isApproved={false}
          handleView={(pilotID) => setActiveApplication(pilotID)}
          activeID={activeApplication}
        />
        <ApplicationCard
          pilotID="#101112"
          pilotName="Jaime Harris"
          createdAt={new Date().toLocaleString().split(",")[0]}
          isDeclined
          handleView={(pilotID) => setActiveApplication(pilotID)}
          activeID={activeApplication}
        />
      </div>
    </AdminLayoutProvider>
  );
};

export default Applications;
