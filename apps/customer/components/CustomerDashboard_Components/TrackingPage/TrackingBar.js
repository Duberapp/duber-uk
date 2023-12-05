import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import barAnimation from "../../../public/assets/bar-animation.json";

const TrackingBar = ({ className, status, deliverables }) => {
  if (status === "Completed" && deliverables) {
    status = "Uploaded";
  }

  // ----------- Configure tracking bar -----------
  const [dot1State, setDot1State] = useState("");
  const [dot2State, setDot2State] = useState("");
  const [dot3State, setDot3State] = useState("");
  const [dot4State, setDot4State] = useState("");
  const [bar1State, setBar1State] = useState("");
  const [bar2State, setBar2State] = useState("");
  const [bar3State, setBar3State] = useState("");

  useEffect(() => {
    switch (status) {
      case "Available":
        setDot1State("completed");
        setBar1State("active");
        break;

      case "Live":
        setDot1State("completed");
        setBar1State("completed");
        setDot2State("completed");
        setBar2State("active");
        break;

      case "Completed":
        setDot1State("completed");
        setBar1State("completed");
        setDot2State("completed");
        setBar2State("completed");
        setDot3State("completed");
        setBar3State("active");
        break;

      case "Uploaded":
        setDot1State("completed");
        setBar1State("completed");
        setDot2State("completed");
        setBar2State("completed");
        setDot3State("completed");
        setBar3State("completed");
        setDot4State("completed");
        break;

      default:
        break;
    }
  }, []);
  // ----------------------------------------------

  return (
    <div
      className={`${className} sm:px-12 px-2 w-full h-2 flex items-center justify-around gap-x-1`}
    >
      <Dot text={"Flight Has Been Booked"} state={dot1State} />

      <Bar state={bar1State} />

      <Dot text={"Assign Pilot & Arrival Time"} state={dot2State} />

      <Bar state={bar2State} />

      <Dot text={"Carring Out Flight"} state={dot3State} />

      <Bar state={bar3State} />

      <Dot text={"Uploading Files"} state={dot4State} />
    </div>
  );
};

export default TrackingBar;

const Dot = ({ text, state }) => {
  return (
    <div className={`tracking-dot ${state === "completed" && "completed"}`}>
      <p className="flex-1 absolute text-xs sm:whitespace-nowrap whitespace-normal text-center text-navyBlue sm:top-8 top-4">
        {text}
      </p>
    </div>
  );
};

const Bar = ({ state }) => {
  switch (state) {
    case "active":
      return (
        <div className="flex-1">
          <Lottie animationData={barAnimation} loop={true} />
        </div>
      );

    default:
      return (
        <div
          className={`tracking-bar ${state === "completed" && "completed"}`}
        />
      );
  }
};
