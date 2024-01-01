import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  completeStep,
  setActiveStep,
  switchToUpdateMode,
} from "../../../redux/createOrderSlice";
import {
  Loading,
  Button,
  Input,
  Autocomplete,
  DatePicker_Desktop,
  DatePicker_Mobile,
  Modal,
  MobilePriceBar,
  ErrorMessage,
} from "../";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon, MapIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { mapTheme } from "../../CustomerDashboard_Components/UI/Map/mapStyles";
import { setStyleIndex } from "../../../redux/mapSlice";
import useLongPress from "../../../hooks/useLongPress";
import GoogleAutocomplete from "../UI/GoogleAutocomplete";

const DynamicMap = dynamic(() => import("../UI/Map/DynamicMap"), {
  loading: () => <Loading className={"h-[45vh]"} />,
  ssr: false,
});

const StaticMap = dynamic(() => import("../UI/Map/StaticMap"), {
  loading: () => <Loading className={"h-[45vh]"} />,
  ssr: false,
});

const LocationDate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const orderState = useSelector((state) => state.createOrder);
  const mapState = useSelector((state) => state.map);
  const [mapStyle, setMapStyle] = useState(mapTheme[mapState.styleIndex]);

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileModel, setShowMobileModel] = useState(false);

  const [error, setError] = useState(null);

  // This used to capture the address search value for prevent the handle next
  const [searchCapture, setSearchCapture] = useState(mapState.address);

  // This state used to toggle show state of map
  const [showMap, setShowMap] = useState(false);
  const [showOverlayMap, setShowOverlayMap] = useState(mapState.address !== "");

  // ======================== LONG PRESS SETUP ========================
  const onLongPress = () => {
    return;
  };

  const onClick = () => {
    setShowMap(true);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  // ===================================================================

  useEffect(() => {
    // ----------- screen width -------------
    let screenWidth;
    if (typeof window !== "undefined") {
      // Client-side-only code
      screenWidth = window.screen.width;
    }
    // ----------------------------------------

    if (screenWidth < 640) {
      setIsMobile(true);
    }
  }, []);

  const handleClickDatePicker = (e) => {
    if (isMobile) {
      setShowMobileModel(true);
    }
  };

  const handleMapStyle = () => {
    if (mapStyle.sattelite == true) {
      setMapStyle(mapTheme[0]);
      dispatch(setStyleIndex(0));
    } else {
      setMapStyle(mapTheme[1]);
      dispatch(setStyleIndex(1));
    }
  };

  // -------------------------------------
  // Validating Fields
  const validateFields = () => {
    try {
      if (mapState.address === "") throw new Error("Address is required");
      if (searchCapture === "") throw new Error("Address is required");
      if (orderState.startDate === null) throw new Error("Date is required");
      if (mapState.polygon === undefined)
        throw new Error("Please mark the area on map");

      setError(null);
      return false;
    } catch (err) {
      setError(err.message);
      return true;
    }
  };

  // -------------------------------------
  // SUBMIT FORM
  const handleNext = (e) => {
    e.preventDefault();

    try {
      let validationErr = validateFields();
      if (validationErr) throw new Error("Validation failed");

      // Go to next step if validating pass
      dispatch(completeStep(1));

      if (
        orderState.step1_UpdateMode &&
        orderState.step2_UpdateMode &&
        orderState.step3_UpdateMode
      )
        return dispatch(setActiveStep(4));

      dispatch(setActiveStep(2));
      dispatch(switchToUpdateMode(1));
    } catch (err) {
      console.log(err);
    }
  };
  // -------------------------------------

  const handleAreaSave = () => {
    setShowMap(false);
    setShowOverlayMap(true);
  };

  return (
    <div>
      <h2 className="sm:hidden block font-semibold text-navyBlue text-lg sm:mt-8 mt-6">
        Location &amp; Date
      </h2>
      <div className="sm:mb-16 mb-5" />

      {/* Error message */}
      {error && <ErrorMessage error={error} setError={setError} />}
      {/* ---------------------- */}

      <div className="grid sm:grid-cols-5 grid-cols-1 sm:h-12 h-32 gap-x-5 sm:gap-y-5 gap-y-2">
        <div className={`sm:col-span-3 grid-cols-1 relative`}>
          <Input>
            <GoogleAutocomplete
              searchCapture={searchCapture}
              setSearchCapture={setSearchCapture}
            />
          </Input>
          {/* <Input>
            <Autocomplete
              searchCapture={searchCapture}
              setSearchCapture={setSearchCapture}
            />
          </Input> */}
        </div>

        <div className={`sm:col-span-2 grid-cols-1`}>
          <Input onClick={handleClickDatePicker}>
            <div className="w-full  flex items-center justify-between">
              {!isMobile ? (
                <DatePicker_Desktop />
              ) : (
                orderState.startDate || "Select a Date"
              )}
              <CalendarIcon className="text-primaryBlue w-5 h-5" />
            </div>
          </Input>
        </div>
      </div>

      {/* ============================================================================ */}
      {/* MAP COMPONENT */}
      {/* ============================================================================ */}
      {!showOverlayMap && (
        <div
          className={`w-full sm:h-[45vh] h-[35vh] rounded-md bg-primaryBlueLight sm:mt-8 mt-3 ${
            mapState.address ? "cursor-pointer" : "cursor-not-allowed"
          } flex items-center justify-center flex-col`}
          onClick={(e) => {
            e.preventDefault();
            if (mapState.address) {
              setShowMap(true);
            }
          }}
          title={`${
            mapState.address ? "Please select address before mark area" : ""
          }`}
        >
          <MapIcon
            className="text-primaryBlue"
            width={60}
            height={60}
            strokeWidth={1}
          />

          <p className="text-sm text-primaryBlue">Click to Draw Area</p>
        </div>
      )}

      {showMap && (
        <div className="w-full h-full bg-black fixed top-0 left-0 ">
          <DynamicMap
            mapStyle={mapStyle}
            handleMapStyle={handleMapStyle}
            className="h-full"
            onSave={handleAreaSave}
          />
        </div>
      )}

      {!isMobile && showOverlayMap && !showMap && (
        <div
          className="w-full sm:h-[45vh] h-[35vh] z-[100] rounded-md bg-transparent hover:bg-primaryBlueLight mt-8 cursor-pointer flex items-center justify-center flex-col"
          onClick={(e) => {
            e.preventDefault();
            setShowMap(true);
          }}
        >
          <StaticMap
            mapStyle={mapStyle}
            className="opacity-100 hover:opacity-50 cursor-pointer"
          />
        </div>
      )}

      {isMobile && showOverlayMap && !showMap && (
        <div className="mt-8 relative">
          <div
            className=" w-full absolute sm:h-[45vh] h-[35vh] z-[1000] opacity-50 rounded-md bg-primaryBlueLight  flex items-center justify-center flex-col"
            {...longPressEvent}
          ></div>
          <StaticMap mapStyle={mapStyle} className="cursor-pointer h-[35vh]" />
        </div>
      )}
      {/* ============================================================================ */}

      <div className="mt-5 flex items-center">
        <MobilePriceBar />

        <Button className="" onClick={handleNext}>
          {orderState.step1_UpdateMode ? "Save" : "Next"}
        </Button>
      </div>

      {showMobileModel && (
        <Modal>
          <DatePicker_Mobile setShowMobileModel={setShowMobileModel} />
        </Modal>
      )}
    </div>
  );
};

export default LocationDate;
