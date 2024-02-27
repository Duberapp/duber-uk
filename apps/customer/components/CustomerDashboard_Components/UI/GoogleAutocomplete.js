import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Loading, TextField } from "ui";
import { LoadingSpinner, Modal } from "../";
import { setAddress, setTempAddress } from "../../../redux/mapSlice";
import { ChevronLeftIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function GoogleAutocomplete({
  setLocationGeocode,
  setGlobalSuggestions,
  setIsSuggestionsLoading,
  setGlobalSuggestionsStatus,
  selectedGlobalSuggestion,
  setSelectedGlobalSuggestion,
}) {
  const {
    ready,
    value,
    setValue,
    suggestions: { data, status, loading },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "UK" },
    },
  });

  const dispatch = useDispatch();
  const mapState = useSelector((state) => state.map);

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileModel, setShowMobileModel] = useState(false);
  const [geoCoding, setGeocoding] = useState(false);

  useEffect(() => {
    setGlobalSuggestions(data);
    setIsSuggestionsLoading(loading || geoCoding);
    setGlobalSuggestionsStatus(status);
  }, [data, status, loading, geoCoding]);

  // Initiate Device Type (Mobile or Not)
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

  const getCoordinates = async (address) => {
    const results = await getGeocode({ address: address });
    const { lat, lng } = await getLatLng(results[0]);
    return { lat, lng };
  };

  const handleSearchValue = (e) => {
    dispatch(setTempAddress(e.target.value));
    setValue(mapState.address_temp);
  };

  const handleClickItem = async (place) => {
    try {
      setGeocoding(true);
      clearSuggestions();

      dispatch(setTempAddress(place));
      setValue(place, false);

      const geoCodes = await getCoordinates(place);

      // Write codes for set center
      setLocationGeocode(geoCodes);
      // --------------------------

      dispatch(setAddress(place));
      setGeocoding(false);
    } catch (err) {
      console.log(err);
      setGeocoding(false);
    }
  };

  useEffect(() => {
    if (selectedGlobalSuggestion) {
      handleClickItem(selectedGlobalSuggestion);
    }
  }, [selectedGlobalSuggestion]);

  return (
    <div className="relative">
      <div className="w-full flex items-center justify-between">
        <input
          className="form-input bg-duber-skyBlue-light sm:text-sm text-[16px] w-[90%]"
          placeholder="Search Address"
          type="text"
          autoComplete="street-address"
          value={mapState.address_temp}
          onChange={handleSearchValue}
          onClick={() => isMobile && setShowMobileModel(true)}
          disabled={!ready}
        />
      </div>

      {showMobileModel && (
        <Modal>
          <div className="pt-6 pb-3 px-3 bg-white">
            <div className="flex items-center">
              <button
                className="w-12 h-12 flex items-center justify-center rounded-md mr-2 bg-skyBlue"
                onClick={() => setShowMobileModel(false)}
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>

              <div className="rounded-lg overflow-hidden flex-1 flex items-center justify-between bg-duber-skyBlue-light">
                <input
                  className="form-input bg-duber-skyBlue-light sm:text-sm text-[16px] w-[90%] h-12 pl-3"
                  placeholder="Search Address"
                  type="text"
                  autoComplete="street-address"
                  value={mapState.address_temp}
                  onChange={handleSearchValue}
                  onClick={() => isMobile && setShowMobileModel(true)}
                  disabled={!ready}
                  autoFocus
                />

                {!loading ? (
                  <XCircleIcon
                    className="w-6 h-6 mr-3 text-primaryBlue"
                    onClick={() => {
                      setValue(null);
                      dispatch(setTempAddress(""));
                      clearSuggestions();
                    }}
                  />
                ) : (
                  <Loading className={"w-6 h-6 mr-3 text-primaryBlue"} />
                )}
              </div>
            </div>
          </div>

          <div className="px-5 pt-5 bg-gray-50 h-full w-full">
            {data.length === 0 ? (
              <div>
                <p className="">Result here</p>
                <div className="w-full min-h-[60vh] flex items-center justify-center">
                  <img src="assets/MapVector.png" className="" alt="" />
                </div>
              </div>
            ) : (
              <div>
                {data.map((place) => (
                  <li
                    className="border-b-1 text-base rounded-md text-[#2263DF] cusor-pointer p-3 list-none hover:bg-gray-100 cursor-pointer "
                    key={place.place_id}
                    onClick={() => {
                      setSelectedGlobalSuggestion(place.description);
                      setShowMobileModel(false);
                    }}
                  >
                    {place.description}
                  </li>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export function GoogleAutocompleteModal({
  suggestions,
  setSelectedGlobalSuggestion,
  loadingSuggestions,
  className,
}) {
  return (
    <div
      className={`w-full h-full bg-duber-skyBlue-light rounded-md flex flex-col gap-y-1.5 p-3 ${className}`}
    >
      {loadingSuggestions && (
        <div className="w-full h-full flex items-center justify-center">
          <Loading className={"w-8 h-8"} />
        </div>
      )}

      {!loadingSuggestions &&
        suggestions.map(({ description, place_id }) => (
          <div
            key={place_id}
            className="cursor-pointer text-duber-skyBlue text-base p-2 hover:bg-sky-500/10 duration-75 transition-all rounded-md"
            onClick={() => setSelectedGlobalSuggestion(description)}
          >
            {description}
          </div>
        ))}
    </div>
  );
}
