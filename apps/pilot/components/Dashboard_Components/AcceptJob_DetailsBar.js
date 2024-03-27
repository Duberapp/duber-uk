import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "ui";
import { TimeOptions } from "../../../../packages/global-constants/src";
import successToast from "../UI/Toast/successToast";
import errorToast from "../UI/Toast/errorToast";

const AcceptJob_DetailsBar = ({
  jobID,
  customerEmail,
  customerFirstName,
  disableAccept,
  jobDate,
  includedDuration,
  extendedDuration,
  timeOption,
  arrivalTime,
}) => {
  const router = useRouter();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL;
  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("expoPushToken") : null
  );
  const [selectedArrivalTime, setSelectedArrivalTime] = useState("");

  const availableTimeSlots = generateTimeSlots({
    extendedDuration: extendedDuration,
    includedDuration: includedDuration,
    timeOption: timeOption,
    arrivalTime: arrivalTime,
  });

  const [chooseTimePanel, setChooseTimePanel] = useState("");

  const handleAccept = () => {
    setChooseTimePanel(!chooseTimePanel);
  };

  const handleChooseTimeAndAcceptJob = async (time_slot) => {
    try {
      setLoading(true);

      const { data } = await axios({
        method: "POST",
        baseURL: serverBaseUrl,
        url: "/pilots/accept-job",
        headers: {},
        data: {
          jobID: jobID,
          arrivalTime: time_slot,
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
      if (data.success) {
        successToast(`Job #${jobID} Accepted`);

        router.push(
          {
            pathname: `/dashboard/myJobs/${jobID}`,
            query: {
              isNew: true,
            },
          },
          `/dashboard/myJobs/${jobID}`
        );
      }
    } catch (err) {
      errorToast(`Job accept failed !`);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Button
        onClick={handleAccept}
        variant={chooseTimePanel ? "pink" : "skyBlue"}
        size={"lg"}
        className="w-full text-base sm:h-11 h-14"
        isLoading={loading}
        loadingText="Accepting Job..."
      >
        {chooseTimePanel ? "Choose start time" : "Accept Job"}
      </Button>

      {chooseTimePanel && (
        <div className="mt-2 grid grid-cols-3 grid-rows-3 gap-2">
          {availableTimeSlots.map((slot, index) => (
            <Button
              key={index}
              variant={selectedArrivalTime === slot ? "pink" : "skyBlue"}
              className={
                availableTimeSlots.length === 1 && "col-span-3 row-span-3 h-24"
              }
              disabled={loading}
              onClick={() => {
                setSelectedArrivalTime(slot);
                handleChooseTimeAndAcceptJob(slot);
              }}
            >
              {slot}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcceptJob_DetailsBar;

const generateTimeSlots = ({
  includedDuration,
  extendedDuration,
  timeOption,
  arrivalTime,
}) => {
  const timeSlotList = TimeOptions.filter((opt) => opt.slug === "choose")[0]
    .times;

  const totalDuration = includedDuration + extendedDuration;
  const timeOptionData = TimeOptions.filter(
    (opt) => opt.name === timeOption
  )[0];

  function convertTo12HourTime(integer) {
    // Ensure the input is within the valid range (1 to 24)
    if (integer < 1 || integer > 24) {
      return "Invalid input";
    }

    // Convert 24 to 12 for midnight
    if (integer === 24) {
      return "12am";
    }

    // Calculate the hour for other values
    const hour12 = integer <= 12 ? integer : integer - 12;
    // Determine if it's AM or PM
    const period = integer < 12 ? "am" : "pm";

    return hour12 + period;
  }

  function convertTo24HourTime(time) {
    // Extract hour and period (am/pm) from the time string
    const hour = parseInt(time);
    const period = time.slice(-2);

    // Convert 12am to 0 and handle 12pm as a special case
    if (period === "am") {
      if (hour === 12) {
        return 0;
      } else {
        return hour;
      }
    } else {
      // Handle pm
      if (hour === 12) {
        return 12;
      } else {
        return hour + 12;
      }
    }
  }

  let availableTimeSlots = [];

  if (timeOption !== "Choose a time slot") {
    const endTime = convertTo12HourTime(timeOptionData.meta.to);
    const timeSlotIndex = timeSlotList.indexOf(endTime);

    // filteredTimeSlots_raw -> based on time option, not on duration
    const filteredTimeSlots_raw = timeSlotList.slice(0, timeSlotIndex + 1);

    // filteredTimeSlots -> based on time option and duration
    let filteredTimeSlots = [];

    filteredTimeSlots_raw.forEach((filteredSlotItem) => {
      const filteredSlotIn24 = convertTo24HourTime(filteredSlotItem);

      // finalTime -> stands for final time slot added order duration
      const finalTime = filteredSlotIn24 + totalDuration;

      if (finalTime < 18) {
        filteredTimeSlots.push(filteredSlotItem);
      }
    });

    availableTimeSlots = filteredTimeSlots;
  } else {
    availableTimeSlots.push(arrivalTime);
  }

  return availableTimeSlots;
};
