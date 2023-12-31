import React, { useEffect, useState } from "react";
import {
  AdminProvider,
  DashboardLayout,
  LoadingSpinner,
  DronePilotCard,
  DronePilotsMap,
} from "../../../../components";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { allDronePilots } from "../../../../config/supabaseFunctions";
import { Toaster } from "react-hot-toast";
import { errorToast } from "../../../../components/UI/Toast";
import { useRouter } from "next/router";

const Index = () => {
  const [pilotData_Solid, setPilotData_Solid] = useState([]);
  const [pilotData, setPilotData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePilot, setActivePilot] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Intialize pilot data
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const { data, error } = await allDronePilots();
        if (error) throw error;

        setPilotData(data);
        setPilotData_Solid(data);
        setLoading(false);
      } catch (err) {
        errorToast(err.message);
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm !== "") {
      let filteredList = searchFilter(searchTerm, pilotData_Solid);

      setPilotData(filteredList);
    } else {
      setPilotData(pilotData_Solid);
    }
  }, [searchTerm]);

  // Handle click
  const handleOnClick = (pilot) => {
    setActivePilot(pilot);
    router.push(`/dashboard/admin/drone-pilots/${pilot.pilot.id}`);
  };

  return (
    <AdminProvider>
      <DashboardLayout>
        <Toaster position="top-center" />
        <div className="w-full flex flex-col py-8 px-3">
          {loading ? (
            <div className="w-full h-screen flex items-center justify-center">
              <LoadingSpinner width={9} height={9} color="teal-400" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-4">
                {/* ============================= Col 1 ============================= */}
                <div className="">
                  {/* Top Bar Content */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="font-semibold text-lg mr-3">Drone Pilots</p>

                      {/* ------------ Seach bar ------------  */}
                      <input
                        type="text"
                        className="text-xs bg-transparent text-gray-500 outline-none"
                        placeholder="Search Pilot Name or ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {/* ------------------------------------ */}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href="/dashboard/admin/applications" legacyBehavior>
                        <a className="font-medium text-xs text-gray-400">
                          Go to applications
                        </a>
                      </Link>
                      <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Drone Pilots List */}
                  <div className="mt-3 min-h-screen">
                    <div className=" w-full flex flex-col gap-y-5 bg-white rounded-lg p-5">
                      {pilotData.map((pilot) => (
                        <DronePilotCard
                          key={pilot.pilot.id}
                          data={pilot}
                          activePilot={activePilot}
                          setActivePilot={setActivePilot}
                          onClick={(e) => {
                            e.preventDefault();
                            handleOnClick(pilot);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ============================= Col 2 ============================= */}
                <div className="w-[33rem] fixed right-2">
                  <div className="w-full h-screen">
                    <DronePilotsMap
                      center={[-2.369669, 54.237933]}
                      zoom={5.3}
                      pilots={pilotData}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DashboardLayout>
    </AdminProvider>
  );
};

export default Index;

const searchFilter = (term, solidList) => {
  let filteredList = [];

  filteredList = solidList.filter(
    (item) =>
      item.pilot.firstName.toUpperCase().startsWith(term.toUpperCase()) ||
      item.pilot.lastName.toUpperCase().startsWith(term.toUpperCase()) ||
      item.pilot.id.toString().startsWith(term)
  );

  return filteredList;
};
