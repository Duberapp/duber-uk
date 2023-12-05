import React, { useEffect } from "react";
import { atcb_init } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";

const AddToCalender = ({ data }) => {
  let { address, id, customerNotes, date, arrivalTime } = data;

  // Format the date using the Date object and toISOString()
  const formattedDate = new Date(date).toISOString().split("T")[0];

  useEffect(() => {
    atcb_init();
  }, []);

  return (
    <div>
      <div className="atcb">
        {"{"}
        {`
            "label": "Add to Calendar",
            "options": ["Apple", "Google", "iCal| Calender"],
            "iCalFileName": "Duber Drone Pilot Hire - Reminder",
            "name": "Duber - Drone Flight - ${address}",
            "description": "#${id} Address: ${address} Flight Details: ${customerNotes}",
            "startDate": "${formattedDate}",
            "endDate": "${formattedDate}",
            "startTime": "${getStartTime(arrivalTime)}",
            "endTime": "${getEndTime(arrivalTime)}",
            "location": "${address}",
            "timeZone": "Europe/London"
        `}
        {"}"}
      </div>
    </div>
  );
};

export default AddToCalender;

const getEndTime = (arrivalTime) => {
  switch (arrivalTime) {
    case "8:00am":
      return "11:00";

    case "9:00am":
      return "12:00";

    case "10:00am":
      return "13:00";

    case "11:00am":
      return "14:00";

    case "12:00pm":
      return "15:00";

    case "1:00pm":
      return "16:00";

    case "2:00pm":
      return "17:00";

    case "3:00pm":
      return "18:00";

    case "4:00pm":
      return "19:00";

    default:
      break;
  }
};

const getStartTime = (arrivalTime) => {
  switch (arrivalTime) {
    case "8:00am":
      return "08:00";

    case "9:00am":
      return "09:00";

    case "10:00am":
      return "10:00";

    case "11:00am":
      return "11:00";

    case "12:00pm":
      return "12:00";

    case "1:00pm":
      return "13:00";

    case "2:00pm":
      return "14:00";

    case "3:00pm":
      return "15:00";

    case "4:00pm":
      return "16:00";

    default:
      break;
  }
};
