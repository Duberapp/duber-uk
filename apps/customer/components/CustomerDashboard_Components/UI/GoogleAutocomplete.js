import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Loading, TextField } from "ui";
import { LoadingSpinner } from "../";
import { setAddress, setTempAddress } from "../../../redux/mapSlice";

export default function GoogleAutocomplete({
  setLocationGeocode,
  setGlobalSuggestions,
  setIsSuggestionsLoading,
  setGlobalSuggestionsStatus,
  selectedGlobalSuggestion,
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
