import React, { useState, useEffect } from "react";
import AdminAppSettings from "../../../../components/Dashboard_Components/AdminAppSettings";
import { successToast, errorToast } from "../../../../components/UI/Toast";
import { LoadingSpinner } from "../../../../components";
import {
  selectPaymentData,
  updatePaymentData,
} from "../../../../config/supabaseFunctions";
import { Toaster } from "react-hot-toast";

const PaymentData = () => {
  const [loading, setLoading] = useState(true);
  const [depositValues, setDepositValues] = useState({});
  const [depositValues_solid, setDepositValues_solid] = useState({});
  const [vat, setVat] = useState(null);
  const [vat_solid, setVat_solid] = useState(null);
  const [transferRate, setTransferRate] = useState(null);
  const [transferRate_solid, setTransferRate_solid] = useState(null);

  const [depositUpdateEnabled, setDepositUpdateEnabled] = useState(false);
  const [vatUpdateEnabled, setVatUpdateEnabled] = useState(false);
  const [transferRateUpdateEnabled, setTransferRateUpdateEnabled] =
    useState(false);

  const [depositUpdating, setDepositUpdating] = useState(false);
  const [vatUpdating, setVatUpdating] = useState(false);
  const [rateUpdating, setRateUpdating] = useState();

  const [exampleJobValue, setExampleJobValue] = useState(250);
  const [pilotPayout, setPilotPayout] = useState(0);

  const initializeData = async () => {
    try {
      setLoading(true);
      let data;

      const { data: _data, error } = await selectPaymentData();
      if (error) throw error;

      data = _data[0];
      setDepositValues(data.deposit);
      setDepositValues_solid(data.deposit);
      setVat(data.VAT);
      setVat_solid(data.VAT);
      setTransferRate(data.transferAmount_rate);
      setTransferRate_solid(data.transferAmount_rate);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // initializeData on component loaded
  useEffect(() => {
    initializeData();
  }, []);

  // Handle deposit value enabled
  useEffect(() => {
    if (JSON.stringify(depositValues) !== JSON.stringify(depositValues_solid)) {
      setDepositUpdateEnabled(true);
    } else setDepositUpdateEnabled(false);
  }, [depositValues]);

  // Handle vat value enabled
  useEffect(() => {
    if (vat !== vat_solid) {
      setVatUpdateEnabled(true);
    } else setVatUpdateEnabled(false);
  }, [vat]);

  // Handle transfer rate update value enabled
  useEffect(() => {
    if (transferRate_solid !== transferRate) {
      setTransferRateUpdateEnabled(true);
    } else {
      setTransferRateUpdateEnabled(false);
    }
  }, [transferRate]);

  // Update values
  const handleDepositUpdate = async (e) => {
    e.preventDefault();

    try {
      setDepositUpdating(true);

      const { data, error } = await updatePaymentData({
        deposit: {
          with_subscription: depositValues.with_subscription,
          without_subscription: depositValues.without_subscription,
        },
      });
      if (error) throw new Error("Update deposit amounts failed !");

      setDepositUpdateEnabled(false);
      setDepositUpdating(false);

      successToast("Deposit Values Updated !");
    } catch (error) {
      errorToast(error.message);
      setDepositUpdating(false);
    }
  };

  const handleVATUpdate = async (e) => {
    e.preventDefault();

    try {
      setVatUpdating(true);

      const { data, error } = await updatePaymentData({
        VAT: vat,
      });
      if (error) throw new Error("Update VAT failed !");

      setVatUpdateEnabled(false);
      setVatUpdating(false);

      successToast("VAT Updated !");
    } catch (error) {
      errorToast(error.message);
      setVatUpdating(false);
    }
  };

  const handleRateUpdate = async (e) => {
    e.preventDefault();

    try {
      setRateUpdating(true);

      const { data, error } = await updatePaymentData({
        transferAmount_rate: transferRate,
      });
      if (error) throw new Error("Update transfer amount failed !");

      setTransferRateUpdateEnabled(false);
      setRateUpdating(false);

      successToast("Transfer Amount Updated !");
    } catch (error) {
      errorToast(error.message);
      setRateUpdating(false);
    }
  };

  // Calculate transfer rate
  useEffect(() => {
    if (transferRate) {
      setPilotPayout(exampleJobValue - (exampleJobValue / 100) * transferRate);
    }
  }, [transferRate]);

  return (
    <AdminAppSettings>
      <Toaster position="top-right" />
      <div className="max-w-screen-md px-5 pt-2 pb-4 rounded-md bg-white custom-shadow-xs">
        {loading && <LoadingSpinner width={5} height={5} color={"navyBlue"} />}

        {/* Deposit Section */}
        <h1 className="mt-3 text-lg text-gray-700 font-semibold">
          {`Deposit Values`}
        </h1>
        <div className="flex items-end justify-between w-full">
          <div className="">
            <p className="mt-3 text-xs text-gray-500">{`Without Subscription`}</p>
            <input
              className="px-3 h-11 bg-gray-300 text-gray-800 w-72 focus:border border-navyBlue mt-1 rounded-md outline-none"
              type="text"
              value={depositValues?.without_subscription}
              onChange={(e) =>
                setDepositValues((prevState) => ({
                  ...prevState,
                  without_subscription: e.target.value,
                }))
              }
            />
            <p className="mt-3 text-xs text-gray-500">{`With Subscription   *(Real price is £100 + £12 for Subscription )`}</p>
            <input
              className="px-2 h-11 bg-gray-300 text-gray-800 w-72 focus:border border-navyBlue mt-1 rounded-md outline-none"
              type="text"
              value={depositValues?.with_subscription}
              onChange={(e) =>
                setDepositValues((prevState) => ({
                  ...prevState,
                  with_subscription: e.target.value,
                }))
              }
            />
          </div>

          <button
            onClick={handleDepositUpdate}
            disabled={!depositUpdateEnabled}
            className={`w-56 flex items-center justify-center h-11 ${
              depositUpdateEnabled
                ? "bg-navyBlue text-white"
                : "bg-gray-300 text-gray-500"
            }  rounded-md   text-sm`}
          >
            {depositUpdating ? (
              <LoadingSpinner width={5} height={5} color="white" />
            ) : (
              `Update Deposit Details`
            )}
          </button>
        </div>

        <hr className="my-6" />

        {/* VAT Section */}
        <h1 className="mt-3 text-lg text-gray-700 font-semibold">{`VAT`}</h1>
        <div className="flex items-end justify-between w-full">
          <div className="">
            <p className="mt-3 text-xs text-gray-500">{`VAT Value`}</p>
            <input
              className="px-3 h-11 bg-gray-300 text-gray-800 w-72 focus:border border-navyBlue mt-1 rounded-md outline-none"
              type="text"
              value={vat}
              onChange={(e) => setVat(e.target.value)}
            />
          </div>

          <button
            onClick={handleVATUpdate}
            disabled={!vatUpdateEnabled}
            className={`w-56 flex items-center justify-center h-11 ${
              vatUpdateEnabled
                ? "bg-navyBlue text-white"
                : "bg-gray-300 text-gray-500"
            }  rounded-md  px-5 text-sm`}
          >
            {vatUpdating ? (
              <LoadingSpinner width={5} height={5} color="white" />
            ) : (
              `Update VAT Details`
            )}
          </button>
        </div>

        <hr className="my-6" />

        {/* Transfer Amount Ration Section */}
        <h1 className="mt-3 text-lg text-gray-700 font-semibold">{`Transfer Rate`}</h1>
        <div className="flex items-end justify-between w-full">
          <div className="">
            <p className="mt-3 text-xs text-gray-500">{`Pilot fund transfer amount rate`}</p>
            <input
              className="px-3 h-11 bg-gray-300 text-gray-800 w-72 focus:border border-navyBlue mt-1 rounded-md outline-none"
              type="text"
              value={transferRate}
              onChange={(e) => setTransferRate(e.target.value)}
            />

            <div className="mt-3">
              <p className="text-xs text-gray-500">{`Example Job Value : ${exampleJobValue}`}</p>
              {transferRate && (
                <p className="text-xs text-gray-500">{`Example Pilot Payout : ${pilotPayout}`}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleRateUpdate}
            disabled={!transferRateUpdateEnabled}
            className={`w-56 flex items-center justify-center h-11 ${
              transferRateUpdateEnabled
                ? "bg-navyBlue text-white"
                : "bg-gray-300 text-gray-500"
            }  rounded-md  px-5 text-sm`}
          >
            {rateUpdating ? (
              <LoadingSpinner width={5} height={5} color="white" />
            ) : (
              `Update Transfer Rate`
            )}
          </button>
        </div>
      </div>
    </AdminAppSettings>
  );
};

export default PaymentData;
