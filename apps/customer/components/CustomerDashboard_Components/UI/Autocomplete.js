import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCenter, setAddress, setPolygon } from "../../../redux/mapSlice";
import { Input, Modal, LoadingSpinner } from "../";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";

const Autocomplete = ({ searchCapture, setSearchCapture }) => {
  const dispatch = useDispatch();
  const mapState = useSelector((state) => state.map);
  const [search, setSearch] = useState(mapState.address);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileModel, setShowMobileModel] = useState(false);

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

  const handleSearchValue = (e) => {
    setSearch(e.target.value);
    setSearchCapture(e.target.value);
    let search = e.target.value;
    let timeoutId;

    const getResult = async () => {
      if (search === "") {
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.NEXT_MAPBOX_TOKEN}&country=gb`
        );

        setResult(data.features);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      getResult();
    }, 1000);
  };

  const handleClickItem = (place) => {
    console.log(place.center);
    dispatch(setPolygon(undefined));
    setSearch(place.place_name);
    setResult([]);
    dispatch(setCenter(place.center));
    dispatch(setAddress(place.place_name));
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <input
          className="form-input sm:text-sm text-[16px] w-[90%]"
          placeholder="Search Address"
          type="text"
          autoComplete="street-address"
          value={search}
          onClick={() => isMobile && setShowMobileModel(true)}
          onChange={handleSearchValue}
        />

        {loading && (
          <LoadingSpinner width={5} height={5} color="text-primaryBlue" />
        )}
      </div>

      {!isMobile && !loading && result.length !== 0 && (
        <div className="absolute z-[400] ml-[-10px] mt-4 w-full px-5 py-3 bg-white rounded-md shadow-xl">
          {result.map((place) => (
            <li
              className="border-b-1 text-sm rounded-md text-[#2263DF] cusor-pointer p-3 list-none hover:bg-gray-100 cursor-pointer "
              key={place.id}
              onClick={() => handleClickItem(place)}
            >
              {place.place_name}
            </li>
          ))}
        </div>
      )}

      {showMobileModel && (
        <Modal>
          <div className="pt-6 pb-3 px-5 bg-white">
            <div className="flex items-center">
              <button
                className="w-12 h-12 flex items-center justify-center rounded-md mr-3 bg-skyBlue"
                onClick={() => setShowMobileModel(false)}
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>
              <Input className={"h-12"}>
                <div className="w-full flex items-center justify-between">
                  <input
                    className="form-input sm:text-sm text-[16px] w-[90%]"
                    placeholder="Search Address"
                    type="text"
                    autoComplete="street-address"
                    value={search}
                    onChange={handleSearchValue}
                    autoFocus
                  />

                  <XCircleIcon
                    className="w-4 h-4 text-primaryBlue"
                    onClick={() => {
                      setSearch("");
                      dispatch(setAddress(""));
                      dispatch(setPolygon(undefined));
                      setResult([]);
                    }}
                  />
                </div>
              </Input>
            </div>
          </div>

          <div className="px-5 pt-5 bg-gray-50 h-full w-full">
            {result.length === 0 ? (
              <div>
                <p className="">Result here</p>
                <div className="w-full min-h-[60vh] flex items-center justify-center">
                  <img src="assets/MapVector.png" className="" alt="" />
                </div>
              </div>
            ) : (
              <div>
                {result.map((place) => (
                  <li
                    className="border-b-1 text-sm rounded-md text-[#2263DF] cusor-pointer p-3 list-none hover:bg-gray-100 cursor-pointer "
                    key={place.id}
                    onClick={() => {
                      handleClickItem(place);
                      setShowMobileModel(false);
                      setResult([]);
                    }}
                  >
                    {place.place_name}
                  </li>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Autocomplete;
