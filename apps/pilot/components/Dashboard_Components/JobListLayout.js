import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import JobCard from "./JobCard";
import DropdownSelector from "./DropdownSelector";
import { useSelector, useDispatch } from "react-redux";
import { setActiveJob } from "../../redux/activeJobSlice";
import { setCurrentUser } from "../../redux/currentUser";
import { useUser } from "@supabase/auth-helpers-react";
import {
  getUserByEmail,
  selectPaymentData,
} from "../../config/supabaseFunctions";
import { BillingAlert } from "../../components";

const JobListLayout = ({ data, disableAccept, setDisableAccept }) => {
  const router = useRouter();
  const user = useUser();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const isHome = router.pathname === "/dashboard";
  const isMyJobs = router.pathname === "/dashboard/myJobs";

  const [myJobsList_glob, setMyJobsList__glob] = useState([]); // this used as a constant array for filtering
  const [myJobsList, setMyJobsList] = useState([]);
  const [availableList, setAvailableList] = useState([]);
  const [liveCount, setLiveCount] = useState(0);
  const [complteCount, setCompleteCount] = useState(0);

  const [showJobList, setShowJobList] = useState(true);
  const [loading, setLoading] = useState(false);

  // Filtering for My Jobs section
  const filterItems = [
    { id: 1, label: "Every Status" },
    { id: 2, label: "Live" },
    { id: 3, label: "Completed" },
  ];
  const [activeFilter, setActiveFilter] = useState(filterItems[0]);
  const [transferRate, setTransferRate] = useState("");

  // Handle data initialization
  useEffect(() => {
    const getPaymentData = async () => {
      try {
        const { data, error } = await selectPaymentData();

        if (error) throw error;

        setTransferRate(data.length > 0 ? data[0].transferAmount_rate : 40);
      } catch (err) {
        console.log(err);
      }
    };

    getPaymentData();
  }, []);

  // Handle filter select
  useEffect(() => {
    if (activeFilter.label !== "Every Status") {
      let filtered_list = myJobsList_glob.filter(
        (job) => job.status === activeFilter.label
      );
      setMyJobsList(filtered_list);
    } else {
      setMyJobsList(myJobsList_glob);
    }
  }, [activeFilter]);

  // Handle sort out dataset
  useEffect(() => {
    let myLiveJobsList = [];
    let myCompleteJobsList = [];

    let availableList_data = data.filter((item) => item.status === "Available");
    setAvailableList(availableList_data);

    let myJobsList_data = data.filter(
      (item) => item.pilotID === currentUser.id
    );
    setMyJobsList(myJobsList_data);
    setMyJobsList__glob(myJobsList_data);

    myLiveJobsList = myJobsList_data.filter((item) => item.status === "Live");
    myCompleteJobsList = myJobsList_data.filter(
      (item) => item.status === "Completed"
    );

    setLiveCount(myLiveJobsList.length);
    setCompleteCount(myCompleteJobsList.length);

    // ------------------------------------------------------------
    if (isHome) {
      if (availableList_data.length === 0) {
        setShowJobList(false);
      } else setShowJobList(true);
    }
    if (isMyJobs) {
      if (myJobsList_data.length === 0) {
        setShowJobList(false);
      } else setShowJobList(true);
    }
  }, [currentUser]);

  // Handle user initialize
  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);
        const { data, error } = await getUserByEmail(user.email);
        if (error) return;

        dispatch(setCurrentUser(data[0]));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (Object.keys(currentUser).length === 0 && user !== null) {
      initializeUser();
    }
  }, [user]);

  return (
    <>
      <div className="w-full flex flex-row h-full">
        {/* Job List Area */}
        <div className="flex-1 mx-4 py-7">
          {/* Head */}
          <div className=" flex flex-row w-full justify-between items-center">
            <div className="flex flex-row gap-3 items-center">
              <p className="text-black font-bold">
                {isHome && "Available Jobs"} {isMyJobs && "My Jobs"}
              </p>
              <div className="sm:block hidden">
                {isMyJobs && (
                  <DropdownSelector
                    filterItems={filterItems}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                  />
                )}
              </div>
            </div>

            <div>
              {isHome && (
                <div className="flex items-center gap-2">
                  <Link href="/dashboard/myJobs" legacyBehavior>
                    <a
                      onClick={() => dispatch(setActiveJob(null))}
                      className="font-medium text-xs text-gray-400"
                    >
                      Go to My Jobs
                    </a>
                  </Link>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                </div>
              )}
              {isMyJobs && (
                <div className="flex items-center gap-2">
                  <Link href="/dashboard" legacyBehavior>
                    <a
                      onClick={() => dispatch(setActiveJob(null))}
                      className="font-medium text-xs text-gray-400"
                    >
                      Go to Job Listing
                    </a>
                  </Link>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                </div>
              )}

              <div className="sm:hidden block mt-3">
                {isMyJobs && (
                  <DropdownSelector
                    filterItems={filterItems}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                  />
                )}
              </div>
            </div>
          </div>

          <BillingAlert
            setDisableAccept={setDisableAccept}
            isHome={isHome}
            isMyJobs={isMyJobs}
          >
            {/* Area */}
            {showJobList ? (
              <div className="my-4 bg-white rounded-lg w-full min-h-[70vh] mb-5 sm:p-5 p-3 flex flex-col gap-6">
                {/* Available List for Homepage */}
                {isHome &&
                  availableList.length !== 0 &&
                  availableList.map((item) => (
                    <JobCard
                      data={item}
                      key={item.JobID}
                      transferRate={transferRate}
                    />
                  ))}

                {/* My Jobs list for /myJobs page */}
                {isMyJobs &&
                  myJobsList.length !== 0 &&
                  myJobsList.map((item) => (
                    <JobCard
                      data={item}
                      key={item.JobID}
                      transferRate={transferRate}
                    />
                  ))}
              </div>
            ) : (
              <div className="w-full min-h-[80vh] bg-white rounded-md my-4 flex items-center justify-center">
                <p className="font-semibold text-gray-300">
                  {isHome && "Available"} {isMyJobs && "Your"} jobs show here
                </p>
              </div>
            )}
          </BillingAlert>
        </div>
      </div>
    </>
  );
};

export default JobListLayout;
