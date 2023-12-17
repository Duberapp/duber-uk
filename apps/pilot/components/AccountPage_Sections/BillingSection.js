import React, { useState, useEffect } from "react";
import { LoadingSpinner } from "../";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { successToast, errorToast } from "../UI/Toast";
import { createStripeConnectedAccount } from "../../config/utilityFunctions";
import { useRouter } from "next/router";

const BillingSection = ({ user, highlight }) => {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();

  // ----------------- Element States ---------------------
  const [userID, setUserID] = useState(user.id);

  const [homeStreet, setHomeStreet] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [homePostalCode, setHomePostalCode] = useState("");
  const [homeCountry, setHomeCountry] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [bankSortCode, setBankSortCode] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  // Solid states which used to compare when create new stripe connected account
  const [bankSortCode_solid, setBankSortCode_solid] = useState("");
  const [bankAccountNumber_solid, setBankAccountNumber_solid] = useState("");
  const [bankName_solid, setBankName_solid] = useState("");
  const [bankBranch_solid, setBankBranch_solid] = useState("");

  const [tradeType, setTradeType] = useState("");
  const [NIC, setNIC] = useState("");

  const [soleTrader, setSoleTrader] = useState(false);
  const [limited, setLimited] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [vatNumber, setVatNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  // ------------------------------------------------------

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        // -------------------------------------------
        // GET USER DETAILS
        const { data, error } = await supabaseClient
          .from("EmployeeBilling")
          .select()
          .eq("userId", user.id);

        if (error) throw error;

        if (data && data.length !== 0) {
          setHomeStreet(data[0].home_street);
          setHomeCity(data[0].home_city);
          setHomePostalCode(data[0].home_postCode);
          setHomeCountry(data[0].home_country);

          setStreet(data[0].billing_street);
          setCity(data[0].billing_city);
          setPostalCode(data[0].billing_postCode);
          setCountry(data[0].billing_country);

          setCompanyName(data[0].companyName);
          setVatNumber(data[0].vatNumber);

          setTradeType(data[0].tradeType);
          setNIC(data[0].NIC);

          setBankSortCode(data[0].bankSortCode);
          setBankAccountNumber(data[0].bankAccountNumber);
          setBankName(data[0].bankName);
          setBankBranch(data[0].bankBranch);

          setBankSortCode_solid(data[0].bankSortCode);
          setBankAccountNumber_solid(data[0].bankAccountNumber);
          setBankName_solid(data[0].bankName);
          setBankBranch_solid(data[0].bankBranch);
        }
        // -------------------------------------------

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      if (userID) {
        const { data: checkExits, error: checkExitsErr } = await supabaseClient
          .from("EmployeeBilling")
          .select("*")
          .eq("userId", userID);
        if (checkExitsErr) throw checkExitsErr;

        // Insert first record
        if (checkExits.length <= 0) {
          const { data: insertData, error: insertErr } = await supabaseClient
            .from("EmployeeBilling")
            .insert([
              {
                userId: userID,

                home_street: homeStreet,
                home_city: homeCity,
                home_postCode: homePostalCode,
                home_country: homeCountry,

                billing_street: street,
                billing_city: city,
                billing_postCode: postalCode,
                billing_country: country,

                companyName,
                vatNumber,

                bankSortCode,
                bankAccountNumber,
                bankName,
                bankBranch,
                tradeType,
                NIC,
              },
            ]);

          if (insertErr) throw insertErr;
          console.log(insertData);
        } else {
          const { data: updateData, error: updateErr } = await supabaseClient
            .from("EmployeeBilling")
            .update({
              userId: userID,

              home_street: homeStreet,
              home_city: homeCity,
              home_postCode: homePostalCode,
              home_country: homeCountry,

              billing_street: street,
              billing_city: city,
              billing_postCode: postalCode,
              billing_country: country,

              companyName,
              vatNumber,

              bankSortCode,
              bankAccountNumber,
              bankName,
              bankBranch,
              tradeType,
              NIC,
            })
            .eq("userId", userID);

          if (updateErr) throw updateErr;
        }
        successToast("User Billing Updated !");
        router.reload();
      }
      setUpdating(false);
    } catch (err) {
      console.log(err);
      setUpdating(false);
      setError(err);
      errorToast("Error: User Billing Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl w-full flex items-center justify-center px-4 py-12 mt-8">
        <LoadingSpinner width={5} height={5} color="skyBlue" />
      </div>
    );
  }

  return (
    <div>
      <p className="mt-8 text-black font-bold">Billing Details</p>
      <div
        className={`${
          highlight === "billing_section" && "outline outline-1 outline-red-300"
        } bg-white rounded-xl w-full px-4 py-8 mt-6`}
      >
        <p className="sm:text-base text-sm">
          Here you can edit your billing detail on which you get paid by us
        </p>

        {error && <p className="text-red-500 text-xs my-2">{error.message}</p>}

        {/* Row 1 */}
        <div className="mt-5">
          <p className="text-gray-400 sm:text-base text-sm">{`Home/Office Address`}</p>
          <input
            value={homeStreet}
            onChange={(e) => setHomeStreet(e.target.value)}
            type="text"
            className="sm:hidden flex mt-4 w-full form-input text-base py-3"
            placeholder="59 Washbrook Road"
          />
          <div className="flex flex-row gap-3 mt-3">
            <input
              value={homeStreet}
              onChange={(e) => setHomeStreet(e.target.value)}
              type="text"
              className="sm:flex hidden w-full form-input text-base py-3"
              placeholder="Street"
            />
            <input
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              type="text"
              className="form-input w-full text-base py-3"
              placeholder="City"
            />
            <input
              value={homePostalCode}
              onChange={(e) => setHomePostalCode(e.target.value)}
              type="text"
              className="form-input w-full text-base py-3"
              placeholder="Postal Code"
            />
            <input
              value={homeCountry}
              onChange={(e) => setHomeCountry(e.target.value)}
              type="text"
              className="sm:flex hidden w-full form-input text-base py-3"
              placeholder="Country"
            />
          </div>
          <input
            value={homeCountry}
            onChange={(e) => setHomeCountry(e.target.value)}
            type="text"
            className="sm:hidden flex mt-3 w-full form-input text-base py-3"
            placeholder="Country"
          />
        </div>

        {/* Row 2 */}
        <div className="mt-5">
          <p className="text-gray-400 sm:text-base text-sm">{`Billing Address (If different than above)`}</p>
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            type="text"
            className="sm:hidden flex mt-4 w-full form-input text-base py-3"
            placeholder="59 Washbrook Road"
          />
          <div className="flex flex-row gap-3 mt-3">
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              type="text"
              className="sm:flex hidden w-full form-input text-base py-3"
              placeholder="Street"
            />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="form-input w-full text-base py-3"
              placeholder="City"
            />
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              className="form-input w-full text-base py-3"
              placeholder="Postal Code"
            />
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              className="sm:flex hidden w-full form-input text-base py-3"
              placeholder="Country"
            />
          </div>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            className="sm:hidden flex mt-3 w-full form-input text-base py-3"
            placeholder="Country"
          />
        </div>
        {/* Row 2-1 */}
        <div className="mt-3 flex flex-row gap-3">
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            type="text"
            className="w-full form-input text-base py-3"
            placeholder="Company Name (Optional)"
          />
          <input
            value={vatNumber}
            onChange={(e) => setVatNumber(e.target.value)}
            type="text"
            className="w-full form-input text-base py-3"
            placeholder="VAT Number (Optional)"
          />
          <div className="w-full sm:flex hidden"></div>
          <div className="w-full sm:flex hidden"></div>
        </div>

        {/* Row 3 */}
        <div className="mt-5">
          <p className="text-gray-400 sm:text-base text-sm">Bank Details</p>
          <div className="flex flex-row sm:flex-nowrap flex-wrap justify-between gap-3 mt-3">
            <input
              value={bankSortCode}
              onChange={(e) => setBankSortCode(e.target.value)}
              type="text"
              className="form-input sm:w-full w-[48%] text-base py-3"
              placeholder="Sort Code"
            />
            <input
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              type="text"
              className="form-input sm:w-full w-[48%] text-base py-3"
              placeholder="Account Number"
            />
            <input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              type="text"
              className="form-input sm:w-full w-[48%] text-base py-3"
              placeholder="Bank Name"
            />
            <input
              value={bankBranch}
              onChange={(e) => setBankBranch(e.target.value)}
              type="text"
              className="form-input sm:w-full w-[48%] text-base py-3"
              placeholder="Bank Branch"
            />
          </div>
        </div>

        {/* row 3 */}
        <div className="mt-5 w-full">
          <div className="flex sm:flex-row flex-col mt-3 gap-6">
            <div className="w-full flex flex-row justify-end">
              <button
                onClick={handleUpdate}
                className="w-36 h-12 flex items-center justify-center bg-primaryBlue rounded-md text-white"
              >
                {!updating ? (
                  "Update"
                ) : (
                  <LoadingSpinner width={5} height={5} color="white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSection;
