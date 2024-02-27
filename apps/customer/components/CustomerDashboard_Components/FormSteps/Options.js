import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeStep,
  setActiveStep,
  completeOptions,
  switchToUpdateMode,
  setPilotExpertise,
  setExtendedDurationHours,
  setTotalDurationHours,
  setCaptureFormatRedux,
} from "../../../redux/createOrderSlice";
import { MobilePriceBar, Button, ErrorMessage } from "../";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PilotExpertises } from "global-constants";
import {
  ExpertiseCard,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "ui";

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
  const expertise = orderState.expertise;

  const [flightDetail, setFlightDetail] = useState(orderState.customerNote);
  const [captureFormat, setCaptureFormat] = useState(orderState.captureFormat);

  const [flightDetailLength, setFlightDetailLength] = useState(0);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [error, setError] = useState(null);

  const [durationsList, setDurationsList] = useState([
    { type: "included", hours: 2 },
  ]);

  const flightDetailsRef = useRef(null);
  const captureFormatRef = useRef(null);
  const expertiseBorderRef = useRef(null);

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

    // Flight Details
    if (!flightDetail) {
      console.log("Fligh details empty");
      flightDetailsElem.className =
        "sm:col-span-2 col-span-1 bg-primaryBlueLight rounded-md p-3 placeholder:text-red-400 border border-red-400";
      validationError = new Error("Flight Details are required");
    } else {
      flightDetailsElem.className =
        "sm:col-span-2 col-span-1 bg-primaryBlueLight rounded-md p-3";

      if (flightDetailLength > 30) {
        flightDetailsElem.className =
          "sm:col-span-2 col-span-1 bg-primaryBlueLight rounded-md p-3 placeholder:text-red-400 border border-red-400";
        validationError = new Error(
          "Flight Details must be less than 30 words"
        );
      } else {
        flightDetailsElem.className =
          "sm:col-span-2 col-span-1 bg-primaryBlueLight rounded-md p-3";
      }
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
      expertiseBorderElem.className =
        "p-2 mt-3 border border-red-500 rounded-md flex gap-x-2";
      validationError = new Error("Pilot Expertise is required");
    } else expertiseBorderElem.className = "mt-3 flex gap-x-2";

    // Check all
    if (!flightDetail && !captureFormat && !expertise) {
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

      dispatch(
        completeOptions({
          expertise,
          customerNote: flightDetail,
          captureFormat,
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
      <div className="">
        <div ref={expertiseBorderRef} className="sm:flex hidden mt-3 gap-x-2">
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

        <div className="sm:hidden flex mt-3">
          <Carousel className="w-full">
            <CarouselContent>
              {PilotExpertises.map((expertise) => (
                <CarouselItem key={expertise.id}>
                  <ExpertiseCard
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
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
          className="sm:flex hidden relative bg-primaryBlueLight rounded-md p-3 items-center sm:justify-center justify-between cursor-pointer"
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

        {/* Mobile - Format Selector */}
        <div className="sm:hidden flex items-center justify-between gap-x-3">
          {capture_formats.map((format) => (
            <div
              key={format.id}
              className={`
                ${
                  orderState.captureFormat === format.format
                    ? "bg-duber-teal-light text-duber-teal"
                    : "bg-duber-skyBlue-light text-duber-skyBlue"
                } 
                h-12 rounded-lg flex items-center justify-center w-full`}
              onClick={() => setCaptureFormat(format.format)}
            >
              {format.id === 3 ? "Both" : format.format}
            </div>
          ))}
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
