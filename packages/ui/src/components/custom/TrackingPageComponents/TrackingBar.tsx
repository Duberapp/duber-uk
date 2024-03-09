import React, { useState, useEffect } from 'react'
import Lottie from "lottie-react";
import barAnimation from '../../../../public/assets/bar-animation.json'

export type TrackingStatus = "Available" | "Live" | "Completed" | "Uploaded"

type TrackingBarProps = {
  className: string,
  status?: TrackingStatus,
  deliverables?: any
}

type ElementState = 'completed' | 'active' | ""

export default function TrackingBar({ className, deliverables, status }: TrackingBarProps) {
  if (status === "Completed" && deliverables !== null) {
    status = "Uploaded";
  }

  // ----------- Configure tracking bar -----------
  const [dot1State, setDot1State] = useState<ElementState>("");
  const [dot2State, setDot2State] = useState<ElementState>("");
  const [dot3State, setDot3State] = useState<ElementState>("");
  const [dot4State, setDot4State] = useState<ElementState>("");
  const [bar1State, setBar1State] = useState<ElementState>("");
  const [bar2State, setBar2State] = useState<ElementState>("");
  const [bar3State, setBar3State] = useState<ElementState>("");

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

  return (
    <div className={`${className} p-2.5 sm:pb-8 pb-4 w-full bg-duber-navyBlue rounded-xl shadow-md`}>
      <h2 className='text-white font-semibold text-xl'>Track Booking</h2>

      {/* Desktop Tracking Progress Bar */}
      <div className="sm:flex hidden w-full mt-2">
        <div
          className={`h-10 sm:px-12 px-2 w-full flex items-center justify-around gap-x-1`}
        >
          <Dot text={"Booked"} state={dot1State} />

          <Bar state={bar1State} />

          <Dot text={"Assign Pilot & Arrival Time"} state={dot2State} />

          <Bar state={bar2State} />

          <Dot text={"Carring Out Flight"} state={dot3State} />

          <Bar state={bar3State} />

          <Dot text={"Uploading Files"} state={dot4State} />
        </div>
      </div>

      {/* Mobile Tracking Progress Bar */}
      <div className="sm:hidden flex mt-4 items-center justify-between px-1">
        {status === 'Available' && (
          <>
            <p className="text-xs text-gray-100 font-light">Booked</p>
            <p className="text-xs text-gray-100 font-light">Assign Pilot & Arrival Time</p>
          </>
        )}
        {status === 'Live' && (
          <>
            <p className="text-xs text-gray-100 font-light">Assign Pilot & Arrival Time</p>
            <p className="text-xs text-gray-100 font-light">Carring Out Flight</p>
          </>
        )}
        {(status === 'Completed' || status === 'Uploaded') && (
          <>
            <p className="text-xs text-gray-100 font-light">Carring Out Flight</p>
            <p className="text-xs text-gray-100 font-light">Uploading Files</p>
          </>
        )}
      </div>

      <div className="sm:hidden flex w-full">
        <div
          className={`h-10 sm:px-12 px-1 w-full flex items-center justify-around gap-x-1`}
        >

          {status === 'Available' && (
            <>
              <Dot text={"Booked"} state={dot1State} />

              <Bar state={bar1State} />

              <Dot text={"Assign Pilot & Arrival Time"} state={dot2State} />
            </>
          )}

          {status === 'Live' && (
            <>
              <Dot text={"Assign Pilot & Arrival Time"} state={dot2State} />

              <Bar state={bar2State} />

              <Dot text={"Carring Out Flight"} state={dot3State} />
            </>
          )}

          {(status === 'Completed' || status === 'Uploaded') && (
            <>
              <Dot text={"Carring Out Flight"} state={dot3State} />

              <Bar state={bar3State} />

              <Dot text={"Uploading Files"} state={dot4State} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const Dot = ({ text, state }: { text: string, state: ElementState }) => {
  return (
    <div className={`tracking-dot ${state === "completed" && "completed"}`}>
      <p className="sm:flex hidden flex-1 absolute text-[10px] whitespace-nowrap text-center text-white sm:top-8 -top-5">
        {text}
      </p>
    </div>
  );
};

const Bar = ({ state }: { state: ElementState }) => {
  switch (state) {
    case "active":
      return (
        <div className="flex-1">
          <Lottie className='' animationData={barAnimation} loop={true} />
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
