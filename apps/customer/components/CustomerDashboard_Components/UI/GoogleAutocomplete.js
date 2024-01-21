import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Loading, TextField } from "ui";
import { LoadingSpinner } from "../";
import { setAddress, setTempAddress } from "../../../redux/mapSlice";

export default function GoogleAutocomplete({ setLocationGeocode }) {
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

        {(loading || geoCoding) && (
          <LoadingSpinner width={5} height={5} color="text-primaryBlue" />
        )}
      </div>

      {status === "OK" && data.length !== 0 && (
        <div className="absolute z-[400] ml-[-10px] mt-4 w-full px-3 py-3 bg-white rounded-md shadow-xl">
          {data.map(({ description, place_id }) => (
            <li
              className="border-b-1 text-sm rounded-md text-[#2263DF] cusor-pointer p-3 list-none hover:bg-gray-100 cursor-pointer "
              key={place_id}
              onClick={() => handleClickItem(description)}
            >
              {description}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
