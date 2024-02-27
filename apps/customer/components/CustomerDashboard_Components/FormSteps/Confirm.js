import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  OrderSidebar,
  Checkbox,
  Button,
  ErrorMessage,
} from "../../../components/CustomerDashboard_Components";
import { useRouter } from "next/router";
import Link from "next/link";
import { setStoragePlan, setActiveStep } from "../../../redux/createOrderSlice";
import { setPrice } from "../../../redux/mapSlice";
import { StoragePlanCard, Button as DuberButton } from "ui";
import { storage_plans } from "global-constants";

const Confirm = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.createOrder);
  const activeUserState = useSelector((state) => state.activeUser);
  const mapState = useSelector((state) => state.map);
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [viewDisclaimer, setViewDisclaimer] = useState(false);
  const [expandDesktopDisclaimer, setExpandDesktopDisclaimer] = useState(false);

  const disclaimer__basicPlan =
    Object.keys(orderState.storagePlan).length !== 0 &&
    orderState.storagePlan.id == 1;
  const disclaimer__authRequired =
    !orderState.authUserId && orderState.storagePlan.id == 2;

  const isAnyDisclaimer = disclaimer__authRequired || disclaimer__basicPlan;

  // Redirect if not filled forms
  useEffect(() => {
    if (!orderState.step1_UpdateMode) router.push("/hire");
    if (!orderState.step2_UpdateMode) router.push("/hire");
    if (!orderState.step3_UpdateMode) router.push("/hire");
  }, []);

  const handleSwitchPlan = () => {
    dispatch(setStoragePlan(storage_plans[1]));
    dispatch(setPrice(mapState.price + 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setActiveStep(5));
  };

  return (
    <div className="grid md:grid-cols-12 grid-cols-1 gap-x-8">
      <div className="md:col-span-8 col-span-12 flex flex-col justify-between">
        {/* Content */}
        <h2 className="text-2xl font-semibold text-navyBlue">Storage Plan</h2>

        {error && (
          <ErrorMessage className={"mt-8"} error={error} setError={setError} />
        )}

        <div
          className={`sm:mt-3 mt-5 flex sm:flex-row flex-col gap-x-3 gap-y-4 ${
            isAnyDisclaimer
              ? "sm:flex-1 flex-none sm:h-auto h-[425px]"
              : "sm:h-[26.5rem] h-[26rem]"
          }`}
        >
          {storage_plans.map((plan) => (
            <StoragePlanCard
              key={plan.id}
              storage_plan={plan}
              className="flex-1"
              selectedPlan={orderState.storagePlan}
              handleSelect={() => dispatch(setStoragePlan(plan))}
            />
          ))}
        </div>

        <p className="mt-8 py-3 px-5 rounded-md bg-gray-200 lg:hidden flex text-lg text-navyBlue font-semibold">
          TOTAL: &#163; {mapState.price}
        </p>

        {/* Desktop Disclaimer Container */}
        {isAnyDisclaimer && (
          <div
            className={`${
              expandDesktopDisclaimer ? "sm:h-20 h-24" : "sm:h-20 h-16"
            } w-full my-2 flex items-center justify-center`}
          >
            {/* Desktop Disclaimer -> If basic plan selected */}
            {disclaimer__basicPlan && (
              <div
                className="sm:flex flex-col w-full rounded-md hidden bg-red-200 p-2 cursor-pointer"
                onClick={() =>
                  setExpandDesktopDisclaimer(!expandDesktopDisclaimer)
                }
              >
                <div className="w-full flex items-center justify-between">
                  <h2 className="font-semibold text-red-500 pl-2 text-sm">{`Important Disclaimer (Click to Read)`}</h2>
                  <div
                    onClick={handleSwitchPlan}
                    className="group bg-primaryTealLight hover:bg-teal-200 p-2 rounded-md transition-all duration-200"
                  >
                    <p className="text-teal-500 group-hover:text-teal-600 text-xs">{`Click to change to Cloud Hosting (£10/month)`}</p>
                  </div>
                </div>

                <div>
                  {expandDesktopDisclaimer && (
                    <p className="text-sm pl-2 mt-3 text-red-400">
                      {`You have selected "1 Month Download Link", After 1 month from order date the files will be DELETED`}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Disclaimer -> If basic plan selected */}
            {disclaimer__basicPlan && (
              <div
                className={`${
                  expandDesktopDisclaimer ? "mt-3" : "mt-0"
                } sm:hidden flex flex-col w-full rounded-md bg-red-200 p-2 cursor-pointer`}
                onClick={() =>
                  setExpandDesktopDisclaimer(!expandDesktopDisclaimer)
                }
              >
                <div className="w-full flex items-center justify-between">
                  <h2 className="font-semibold text-red-500 pl-2 text-xs">{`Important Disclaimer (Click to Read)`}</h2>
                  <div
                    onClick={handleSwitchPlan}
                    className="group bg-primaryTealLight hover:bg-teal-200 p-2 rounded-md transition-all duration-200"
                  >
                    <p className="text-teal-500 group-hover:text-teal-600 text-[10px]">{`Click to change to Cloud Hosting (£10/month)`}</p>
                  </div>
                </div>

                <div>
                  {expandDesktopDisclaimer && (
                    <p className="text-[9px] pl-2 mt-3 text-red-400">
                      {`You have selected "1 Month Download Link", After 1 month from order date the files will be DELETED`}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Desktop Disclaimer -> If premium plan selected && not signed in */}
            {disclaimer__authRequired && (
              <div className="sm:flex hidden w-full bg-duber-navyBlue rounded-md min-h-10 items-center justify-between px-2 py-2">
                <p className="text-white font-semibold text-[14px]">
                  You must create or login to account for Premium
                </p>

                <DuberButton
                  variant={"teal"}
                  className="font-semibold"
                  onClick={() => {
                    const activeTo = 3;

                    if (orderState[`step${activeTo}_UpdateMode`]) {
                      dispatch(setActiveStep(activeTo));
                    }
                  }}
                >
                  Create Account / Login
                </DuberButton>
              </div>
            )}

            {/* Mobile Disclaimer -> If premium plan selected && not signed in */}
            {disclaimer__authRequired && (
              <div
                className="sm:hidden flex w-full bg-duber-navyBlue rounded-md h-14 items-center justify-between px-4 py-2"
                onClick={() => {
                  const activeTo = 3;

                  if (orderState[`step${activeTo}_UpdateMode`]) {
                    dispatch(setActiveStep(activeTo));
                  }
                }}
              >
                <p className="text-white font-semibold text-[13px]">
                  Click to create or login to account for Premium
                </p>
              </div>
            )}
          </div>
        )}

        <div>
          {/* -------- Submit --------- */}
          <div className="sm:mt-0 mt-3 flex items-center">
            <Checkbox checked={confirmed} setChecked={setConfirmed} />
            <p className="text-black sm:text-base text-sm ml-4">
              I accept thee{" "}
              <span className="font-semibold cursor-pointer">
                <Link href="/legal/TermsAndConditions">
                  Terms &amp; Conditions
                </Link>
              </span>{" "}
              and the{" "}
              <span className="font-semibold cursor-pointer">
                <Link href="/legal/PrivacyPolicy">Privacy Policy</Link>
              </span>{" "}
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!confirmed}
            isLoading={loading}
            width={"w-full"}
            className={`mt-4 ${
              confirmed ? "bg-primaryTeal" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm and Pay
          </Button>

          {/* --------------- */}
        </div>
      </div>

      <div className="md:col-span-4 col-auto md:grid hidden h-[660px] bg-navyBlue rounded-lg py-6 px-4">
        <OrderSidebar />
      </div>
    </div>
  );
};

export default Confirm;
