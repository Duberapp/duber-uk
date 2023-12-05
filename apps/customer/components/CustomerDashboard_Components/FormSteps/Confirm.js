import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  OrderSidebar,
  Checkbox,
  Button,
  ErrorMessage,
} from "../../../components/CustomerDashboard_Components";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import { plans } from "../storagePlans";
import { setStoragePlan, setActiveStep } from "../../../redux/createOrderSlice";
import { setPrice } from "../../../redux/mapSlice";
import { successToast } from "../UI/Toast";

const Confirm = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.createOrder);
  const mapState = useSelector((state) => state.map);
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [viewDisclaimer, setViewDisclaimer] = useState(false);
  const [expandDesktopDisclaimer, setExpandDesktopDisclaimer] = useState(false);

  // Redirect if not filled forms
  useEffect(() => {
    if (!orderState.step1_UpdateMode) router.push("/hire");
    if (!orderState.step2_UpdateMode) router.push("/hire");
    if (!orderState.step3_UpdateMode) router.push("/hire");
  }, []);

  const handleSwitchPlan = () => {
    dispatch(
      setStoragePlan({
        id: plans[1].id,
        text: plans[1].text,
      })
    );
    dispatch(setPrice(mapState.price + 10));
    successToast("Successfully Changed !");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setActiveStep(5));
  };

  return (
    <div className="grid md:grid-cols-12 grid-cols-1 gap-x-8">
      <div className="md:col-span-8 col-span-12">
        {/* Content */}
        <h2 className="sm:text-3xl text-2xl font-semibold text-navyBlue">
          Confirm
        </h2>

        {error && (
          <ErrorMessage className={"mt-8"} error={error} setError={setError} />
        )}
        <div className="sm:mt-5 mt-5 grid grid-cols-1 gap-y-7">
          {/* Location step data */}
          <StepCard
            column_1={
              <div>
                <p className="text-sm text-primaryBlue font-medium">Location</p>
                <p className="mt-1 text-xs text-primaryBlue font-normal">
                  {mapState.address}
                </p>
                <p className="mt-3 text-sm text-primaryBlue font-medium">
                  Date
                </p>
                <p className="mt-1 text-xs text-primaryBlue font-normal">
                  {orderState.startDate}
                </p>
              </div>
            }
            column_2={
              <div>
                <p className="text-sm text-primaryBlue font-medium">Area</p>
                <p className="mt-1 text-xs text-primaryBlue font-normal inline-flex">
                  {mapState.area} &nbsp;{" "}
                  <span className="sm:flex hidden">Squared Meters</span>{" "}
                  <span className="sm:hidden block">
                    {" "}
                    m<sup>2</sup>
                  </span>{" "}
                </p>
              </div>
            }
            onEditClick={() => {
              dispatch(setActiveStep(1));
              router.push("/hire");
            }}
          />

          {/* Options step data */}
          <StepCard
            column_1={
              <div>
                <p className="text-sm text-primaryBlue font-medium">
                  Capture Format
                </p>
                <p className="mt-1 text-xs text-primaryBlue font-normal">
                  {orderState.captureFormat}
                </p>
                <p className="mt-3 text-sm text-primaryBlue font-medium">
                  Pilot Prefered Expertises
                </p>
                <p className="mt-1 text-xs text-primaryBlue font-normal">
                  {orderState.expertise}
                </p>
              </div>
            }
            column_2={
              <div>
                <p className="text-sm text-primaryBlue font-medium">
                  Storage Plan
                </p>
                <p className="mt-1 text-xs text-primaryBlue font-normal">
                  {orderState.storagePlan.text}
                </p>
              </div>
            }
            onEditClick={() => {
              dispatch(setActiveStep(2));
              router.push("/hire");
            }}
          />

          {/* Contact step data */}
          <StepCard
            column_1={
              <div>
                <p className="text-sm text-primaryBlue font-medium">Name</p>
                <p className="mt-1 text-xs text-primaryBlue font-normal">
                  {orderState.firstName} {orderState.lastName}
                </p>
                <p className="mt-3 text-sm text-primaryBlue font-medium">
                  Email
                </p>
                <p className="mt-1 text-xs text-primaryBlue font-normal">
                  {orderState.email}
                </p>
              </div>
            }
            column_2={
              <div>
                <p className="text-sm text-primaryBlue font-medium">
                  Telephone
                </p>
                <p className="mt-1 text-xs text-primaryBlue font-normal">
                  {orderState.telNumber}
                </p>
                <p className="mt-3 text-sm text-primaryBlue font-medium">
                  Company
                </p>
                <p className="mt-1 text-xs text-primaryBlue font-normal">
                  {orderState.company}
                </p>
              </div>
            }
            onEditClick={() => {
              dispatch(setActiveStep(3));
              router.push("/hire");
            }}
          />
        </div>

        <div className="flex sm:hidden mt-8">
          {Object.keys(orderState.storagePlan).length !== 0 &&
            orderState.storagePlan.id == 1 && (
              <div
                className={`w-full ${
                  !viewDisclaimer ? "p-3" : "py-2 px-3"
                } bg-red-100 rounded-md`}
                onClick={() => setViewDisclaimer(!viewDisclaimer)}
              >
                <p
                  className={`text-red-400 ${
                    viewDisclaimer ? "font-semibold" : "font-semibold"
                  }`}
                >
                  {`Important Disclaimer`}{" "}
                  {!viewDisclaimer && (
                    <span className="text-sm font-normal">
                      {" (Tap to read)"}
                    </span>
                  )}{" "}
                </p>

                {viewDisclaimer && (
                  <>
                    <p className="text-red-400 text-sm font-light">{`You have selected "1 Month Download Link", After 1 month from order date the files will be DELETED`}</p>

                    <div
                      onClick={handleSwitchPlan}
                      className="cursor-pointer mt-3 mb-2 w-full rounded-md bg-primaryTealLight text-primaryTeal flex flex-col items-center justify-center py-3"
                    >
                      <p className="text-xs font-medium text-teal-500">{`Click to change to`}</p>
                      <p className="text-xs font-medium  text-teal-500">{`Cloud Hosting (£10/month)`}</p>
                    </div>
                  </>
                )}
              </div>
            )}
        </div>

        <p className="py-3 px-5 rounded-md bg-gray-200 mt-4 lg:hidden flex text-lg text-navyBlue font-semibold">
          TOTAL: &#163; {mapState.price}
        </p>

        {/* Desktop Disclaimer */}
        {Object.keys(orderState.storagePlan).length !== 0 &&
          orderState.storagePlan.id == 1 && (
            <div
              className="sm:flex flex-col hidden mt-5 bg-red-100 p-2 rounded-md cursor-pointer"
              onClick={() =>
                setExpandDesktopDisclaimer(!expandDesktopDisclaimer)
              }
            >
              <div className="w-full flex items-center justify-between">
                <h2 className="font-semibold text-red-400 pl-2 text-sm">{`Important Disclaimer (Click to Read)`}</h2>
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

        {/* -------- Submit --------- */}
        <div className="flex items-center mt-4">
          <Checkbox checked={confirmed} setChecked={setConfirmed} />
          <p className="text-black sm:text-base text-sm ml-4">
            I have permission from the land/building owner & accept the{" "}
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

      <div className="md:col-span-4 col-auto md:grid hidden h-[660px] bg-navyBlue rounded-lg py-6 px-4">
        <OrderSidebar />
      </div>
    </div>
  );
};

export default Confirm;

const StepCard = ({ column_1, column_2, onEditClick, col2_className }) => {
  return (
    <div className="bg-primaryBlueLight h-fit py-3 pb-5 px-5 rounded-md flex">
      <div className="flex-1 ">{column_1}</div>
      <div className={`${col2_className} flex-1 ml-6`}>{column_2}</div>
      <div className="w-fit ml-4">
        <PencilSquareIcon
          onClick={onEditClick}
          className="w-6 h-6 cursor-pointer text-primaryBlue"
        />
      </div>
    </div>
  );
};
