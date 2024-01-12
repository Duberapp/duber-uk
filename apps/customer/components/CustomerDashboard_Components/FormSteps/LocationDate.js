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
import toast, { Toaster } from "react-hot-toast";
import { mapTheme } from "../../CustomerDashboard_Components/UI/Map/mapStyles";
import { setStyleIndex } from "../../../redux/mapSlice";
import useLongPress from "../../../hooks/useLongPress";
import GoogleAutocomplete from "../UI/GoogleAutocomplete";
import GoogleMap from "../../GoogleMap";
import { Button as DuberButton } from "ui";

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
  const [locationGeocode, setLocationGeocode] = useState(null);

  // This state used to toggle show state of map
  const [showMap, setShowMap] = useState(false);
  const [showOverlayMap, setShowOverlayMap] = useState(mapState.address !== "");

  const [polygons, setPolygons] = useState([]);

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

  const handleAreaSave = (payload, error) => {
    if (!error) {
      setLocationGeocode(payload.center);

      setShowMap(false);
      setShowOverlayMap(true);
    } else {
      toast(error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="sm:hidden block font-semibold text-navyBlue text-lg sm:mt-8 mt-6">
        Location &amp; Date
      </h2>
      <div className="sm:mb-6 mb-5" />

      {/* Error message */}
      {error && <ErrorMessage error={error} setError={setError} />}
      {/* ---------------------- */}

      {/* <div className="grid sm:grid-cols-4 grid-cols-1 sm:h-12 h-32 gap-x-3 sm:gap-y-5 gap-y-2">
        <div className={`sm:col-span-2 grid-cols-1 relative`}>
          <Input>
            <GoogleAutocomplete setLocationGeocode={setLocationGeocode} />
          </Input>
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
      </div> */}

      <div className="flex flex-1 h-full flex-col relative ">
        {/* Row 01 */}
        <div className="flex items-center sm:h-12 h-32 gap-x-3">
          <Input>
            <GoogleAutocomplete setLocationGeocode={setLocationGeocode} />
          </Input>

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

        {/* Row 2 */}
        <div className="mt-3 flex items-center gap-x-3 w-full h-full relative">
          {/* ============================================================================ */}
          {/* MAP COMPONENT */}
          {/* ============================================================================ */}
          {!showOverlayMap && (
            <div className="flex-1 w-full h-full relative flex items-center justify-center">
              <div className="opacity-60 flex-1 h-full rounded-lg overflow-hidden">
                <GoogleMap
                  polygons={polygons}
                  setPolygons={setPolygons}
                  staticMapType={"roadmap"}
                  mapState={"static"}
                />
              </div>

              <div className="absolute">
                <DuberButton
                  variant={"default"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (mapState.address) {
                      setShowMap(true);
                    }
                  }}
                >
                  Select a address first
                </DuberButton>
              </div>
            </div>
          )}

          {showMap && (
            <div className="fixed w-full h-screen overflow-y-hidden bg-black top-0 left-0">
              <GoogleMap
                polygons={polygons}
                setPolygons={setPolygons}
                mapState={"dynamic"}
                location={locationGeocode}
                onCloseMap={() => setShowMap(false)}
                onSaveArea={handleAreaSave}
                mapOptions={{ gestureHandling: "greedy" }}
              />
            </div>
          )}

          {!isMobile && showOverlayMap && !showMap && (
            <div className="relative border border-duber-skyBlue-light shadow-md flex-1 w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
              <GoogleMap
                polygons={polygons}
                setPolygons={setPolygons}
                mapState={"static"}
                staticMapType={"roadmap"}
                location={locationGeocode}
              />

              <DuberButton
                variant={"default"}
                className="absolute bottom-2 right-2"
                onClick={() => setShowMap(true)}
              >
                Edit
              </DuberButton>
            </div>
          )}

          {isMobile && showOverlayMap && !showMap && (
            <div className="relative">
              <div
                className=" w-full absolute sm:h-[45vh] h-[35vh] z-[1000] opacity-50 rounded-md bg-primaryBlueLight  flex items-center justify-center flex-col"
                {...longPressEvent}
              ></div>
              <StaticMap
                mapStyle={mapStyle}
                className="cursor-pointer h-[35vh]"
              />
            </div>
          )}
          {/* ============================================================================ */}

          {/* Row 2 -> Col 2 */}
          <div className="flex-1 w-full">Col 2</div>
        </div>
      </div>

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
