import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import LoadingSpinner from "../UI/LoadingSpinner";

const AcceptJob_DetailsBar = ({
  jobID,
  customerEmail,
  customerFirstName,
  disableAccept,
  jobDate,
}) => {
  const router = useRouter();
  const [arrivalTime, setArrivalTime] = useState(null);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL;
  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("expoPushToken") : null
  );

  const handleAccept = async () => {
    try {
      setLoading(true);

      const { data } = await axios({
        method: "POST",
        baseURL: serverBaseUrl,
        url: "/pilots/accept-job",
        headers: {},
        data: {
          jobID: jobID,
          arrivalTime: arrivalTime,
          pilotID: currentUser.id,
          clientEmail: customerEmail,
          clientName: customerFirstName,
        },
      });

      // Schedule push notification request
      axios({
        method: "POST",
        baseURL: "https://scheduler-service.duber.uk",
        url: "/add-reminder-notification",
        headers: {},
        data: {
          jobId: jobID.toString(),
          arrivalDate: jobDate,
          arrivalTime: arrivalTime,
          expoPushToken: expoPushToken,
        },
      })
        .then((shedulerData) => console.log(shedulerData))
        .catch((err) => console.log(err.message));

      setLoading(false);
      if (data.success)
        router.push(
          {
            pathname: `/dashboard/myJobs/${jobID}`,
            query: {
              isNew: true,
            },
          },
          `/dashboard/myJobs/${jobID}`
        );
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-3 grid-rows-3 gap-x-5 gap-y-5">
        {arrivalTimesList.map((time) => (
          <button
            key={time.id}
            onClick={() => setArrivalTime(time.text)}
            className={`${
              arrivalTime === time.text ? "bg-primaryTeal" : "bg-primaryBlue"
            } outline-none text-white h-12 rounded-md text-sm`}
          >
            {time.text}
          </button>
        ))}
      </div>

      {disableAccept && (
        <p className="mt-4 text-xs text-red-500">
          Please fill billing informations
        </p>
      )}

      <button
        className={`mt-5 ${
          arrivalTime && !disableAccept
            ? "bg-primaryTeal cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        } rounded-md w-full md:w-fit lg:w-full h-16 md:px-3 flex items-center justify-center`}
        onClick={handleAccept}
        disabled={!arrivalTime || loading || disableAccept}
      >
        {/* Accept Job */}
        <p className="text-2xl text-center text-white uppercase font-medium">
          {!loading ? (
            "Accept Job"
          ) : (
            <LoadingSpinner width={5} height={5} color="white" />
          )}
        </p>
      </button>
    </div>
  );
};

export default AcceptJob_DetailsBar;

const arrivalTimesList = [
  { id: 1, text: "8:00am" },
  { id: 2, text: "9:00am" },
  { id: 3, text: "10:00am" },
  { id: 4, text: "11:00am" },
  { id: 5, text: "12:00pm" },
  { id: 6, text: "1:00pm" },
  { id: 7, text: "2:00pm" },
  { id: 8, text: "3:00pm" },
  { id: 9, text: "4:00pm" },
];
