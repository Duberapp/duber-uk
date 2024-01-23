import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeStep,
  setActiveStep,
  completeOptions,
  switchToUpdateMode,
  setStoragePlan,
  setPilotExpertise,
  setExtendedDurationHours,
  setTotalDurationHours,
  setCaptureFormatRedux,
} from "../../../redux/createOrderSlice";
import { MobilePriceBar, Button, ErrorMessage } from "../";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { expertisesList, expertisesList_mobile } from "../expertiseList";
import { plans } from "../storagePlans";
import { useRouter } from "next/router";
import { setPrice } from "../../../redux/mapSlice";
import { PilotExpertises, durationList } from "global-constants";
import { ExpertiseCard } from "ui";

// Sample Data
const capture_formats = [
  { id: 1, format: "Video" },
  { id: 2, format: "Photo" },
  { id: 3, format: "Both (Video/Photo)" },
];

const Options = ({ priceList, setPriceList }) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.createOrder);
  const mapState = useSelector((state) => state.map);

  const [flightDetail, setFlightDetail] = useState(orderState.customerNote);
  const [captureFormat, setCaptureFormat] = useState(orderState.captureFormat);
  const [expertise, setExpertise] = useState(orderState.expertise);
  const [storagePlanID, setStoragePlanID] = useState(
    Object.keys(orderState.storagePlan).length === 0
      ? null
      : orderState.storagePlan.id
  ); // Add context state later

  const [flightDetailLength, setFlightDetailLength] = useState(0);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [error, setError] = useState(null);

  const [selectedExpertise, setSelectedExpertise] = useState(null);
  const [durationsList, setDurationsList] = useState([
    { type: "included", hours: 2 },
  ]);

  const router = useRouter();

  const flightDetailsRef = useRef(null);
  const captureFormatRef = useRef(null);
  const expertiseBorderRef = useRef(null);
  const storagePlanRef = useRef(null);

  useEffect(() => {
    captureFormat && dispatch(setCaptureFormatRedux(captureFormat));
  }, [captureFormat]);

  useEffect(() => {
    if (durationsList.length !== 0) {
      let totalDurationHours = 0;

      durationsList.map((duration) => (totalDurationHours += duration.hours));

      dispatch(setTotalDurationHours(totalDurationHours));
    }
  }, [durationsList]);

  // Validation Function
  const validateData = () => {
    let validationError = false;
    const flightDetailsElem = flightDetailsRef.current;
    const captureFormatElem = captureFormatRef.current;
    const expertiseBorderElem = expertiseBorderRef.current;
    const storagePlanElem = storagePlanRef.current;

    // Flight Details
    if (!flightDetail) {
      console.log("Fligh details empty");
      flightDetailsElem.className =
        "sm:col-span-2 col-span-1 bg-primaryBlueLight rounded-md p-3 placeholder:text-red-400 border border-red-400";
      validationError = new Error("Flight Details are required");
    } else {
      flightDetailsElem.className =
        "sm:col-span-2 col-span-1 bg-primaryBlueLight rounded-md p-3";

      if (flightDetailLength > 200) {
        flightDetailsElem.className =
          "sm:col-span-2 col-span-1 bg-primaryBlueLight rounded-md p-3 placeholder:text-red-400 border border-red-400";
        validationError = new Error(
          "Flight Details must be less than 200 words"
        );
      } else
        flightDetailsElem.className =
          "sm:col-span-2 col-span-1 bg-primaryBlueLight rounded-md p-3";
    }

    // Capture format
    if (!captureFormat) {
      captureFormatElem.className =
        "relative bg-primaryBlueLight rounded-md p-3 flex items-center sm:justify-center justify-between cursor-pointer border border-red-400";
      validationError = new Error("Flight Capture Format is required");
    } else
      captureFormatElem.className =
        "relative bg-primaryBlueLight rounded-md p-3 flex items-center sm:justify-center justify-between cursor-pointer ";

    // Pilot Expertise
    if (!expertise) {
      expertiseBorderElem.className = "p-2 border border-red-500 rounded-md";
      validationError = new Error("Pilot Expertise is required");
    } else expertiseBorderElem.className = "";

    // Storage plan id
    if (!storagePlanID) {
      storagePlanElem.className = "p-2 border border-red-400 rounded-md";
      validationError = new Error("Please select a storage plan");
    } else storagePlanElem.className = "";

    // Check all
    if (!flightDetail && !captureFormat && !expertise && !storagePlanID) {
      validationError = new Error("Please fill all required fields");
    }

    return validationError;
  };

  const handleNext = (e) => {
    e.preventDefault();

    try {
      let isValidateError = validateData();
      if (isValidateError) throw isValidateError;

      setError(null);

      let currentStoragePlan = plans.filter(
        (plan) => plan.id === storagePlanID
      );

      dispatch(
        completeOptions({
          expertise,
          customerNote: flightDetail,
          captureFormat,
          storagePlan: {
            id: storagePlanID,
            text: currentStoragePlan[0].text,
          },
        })
      );

      if (
        orderState.step1_UpdateMode &&
        orderState.step2_UpdateMode &&
        orderState.step3_UpdateMode
      )
        return dispatch(setActiveStep(4));

      dispatch(completeStep(2));
      dispatch(setActiveStep(3));
      dispatch(switchToUpdateMode(2));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // console.log(orderState);
    setStoragePlanID(orderState.storagePlan.id);
  }, [orderState.storagePlan]);

  const onChangeDuration = (duration) => {
    // ----------------------- Handle Price change -----------------------
    let durationPrice = 0;

    // If duration price is 0, this following code will be reverted
    if (duration.price !== (0 || "free")) {
      durationPrice = duration.price;
    }

    // Change price
    const filteredPriceList = priceList.filter(
      (priceObj) => priceObj.priceType !== "extended-duration-cost"
    );

    setPriceList((prevList) => [
      ...filteredPriceList,
      { price: durationPrice, priceType: "extended-duration-cost" },
    ]);

    // ------------------- Handle redux state changes --------------------
    duration.type !== "included"
      ? dispatch(setExtendedDurationHours(duration.durationHours))
      : dispatch(setExtendedDurationHours(0));

    // Prevent single extended duration object inside durations array
    const filteredList = durationsList.filter(
      (durationObj) => durationObj.type !== "extend"
    );
    if (duration.type !== "included") {
      setDurationsList((prevDurations) => [
        ...filteredList,
        { type: duration.type, hours: duration.durationHours },
      ]);
    } else {
      setDurationsList((prevDurations) => [...filteredList]);
    }
  };

  return (
    <div className="sm:mt-4 mt-4">
      {error && (
        <ErrorMessage error={error} setError={setError} className="mb-6" />
      )}

      {/* Pilot Expertices */}
      <h2 className="font-semibold text-navyBlue text-lg">
        Preferred Pilot Expertise
      </h2>
      <div className="mt-3 flex gap-x-2">
        {PilotExpertises.map((expertise) => (
          <ExpertiseCard
            key={expertise.id}
            expertise={expertise.slug}
            className="min-h-full"
            selectedExpertise={orderState.expertise}
            setSelectedExpertise={(expertise) => {
              dispatch(setPilotExpertise(expertise.slug));
            }}
            timeSlot={orderState.timeSlot}
            timeOption={orderState.timeOption}
            onChangeDuration={onChangeDuration}
            extendedDurationHours={orderState.extendedDurationHours}
          />
        ))}
      </div>

      {/* Flight Details */}
      <h2 className="mt-4 font-semibold text-navyBlue text-lg">
        Flight Details
      </h2>
      <div className="mt-3 w-full grid sm:grid-cols-3 grid-cols-1 gap-x-3 gap-y-3 sm:h-fit  h-fit">
        <div
          ref={flightDetailsRef}
          className="sm:col-span-2 col-span-1 bg-primaryBlueLight rounded-md p-3"
        >
          <textarea
            className="sm:text-xs text-base resize-none text-primaryBlue w-full bg-transparent placeholder:text-primaryBlue outline-none"
            placeholder="In a frew words tell us why you need the drone flight. (i.e “To inspect a
              leaking roof” or “to take photos & videos at my wedding” )"
            value={flightDetail}
            onChange={(e) => {
              setFlightDetail(e.target.value);
              setFlightDetailLength(e.target.value.length);
            }}
          />
          <p
            className={`w-full text-right text-xs ${
              flightDetailLength < 30 ? "text-primaryTeal" : "text-red-500"
            }`}
          >
            {flightDetailLength}/30
          </p>
        </div>

        <div
          onClick={() => setShowFormatDropdown(!showFormatDropdown)}
          ref={captureFormatRef}
          className="relative bg-primaryBlueLight rounded-md p-3 flex items-center sm:justify-center justify-between cursor-pointer"
        >
          <p className="sm:text-sm text-base text-primaryBlue py-1">
            {captureFormat
              ? `Format: ${captureFormat}`
              : "Select Capture Format"}
          </p>
          <ChevronDownIcon className="sm:hidden flex w-5 h-5 text-primaryBlue" />
          {showFormatDropdown && (
            <div className="absolute sm:top-20 top-12 sm:left-auto left-0 sm:w-[90%] w-full p-2 bg-white shadow-lg rounded-md">
              {capture_formats.map((format) => (
                <p
                  key={format.id}
                  className="text-primaryBlue text-sm py-2 px-3 my-1 hover:bg-gray-200 rounded-md cursor-pointer"
                  onClick={() => setCaptureFormat(format.format)}
                >
                  {format.format}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Next button container */}
      <div className="sm:mt-8 mt-5 flex items-center">
        <MobilePriceBar />
        <Button className="" onClick={handleNext}>
          {orderState.step2_UpdateMode ? "Save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Options;
