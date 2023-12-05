import React, { createRef, useState } from "react";
import Pdf from "react-to-pdf";
import {
  fetchOrder,
  getPilotData,
  selectCustomer,
  selectPaymentData,
} from "../../../config/supabaseFunctions";
import { useEffect } from "react";

const Invoice = ({ data, customer, paymentData, pilotData }) => {
  const ref = createRef();
  const buttonRef = createRef();
  let downloaded = false;
  const [status, setStatus] = useState(
    data?.paymentCharge_id !== null ? "charged" : "pending"
  );
  const [deposit_subtotal, setDeposit_Subtotal] = useState(
    data?.storagePlan?.id === 1
      ? paymentData?.deposit?.without_subscription
      : paymentData?.deposit?.with_subscription
  );
  const [deposit_tax, setDeposit_TAX] = useState(
    deposit_subtotal * (paymentData?.VAT / 100)
  );
  const [scheduledPayment, setSheduledPayment] = useState(
    data?.storagePlan?.id === 1
      ? data?.amount - paymentData?.deposit?.without_subscription
      : data?.amount - paymentData?.deposit?.with_subscription
  );
  const [complete_subtotal, setComplete_Subtotal] = useState(data?.amount);
  const [complete_tax, setComplete_TAX] = useState(
    complete_subtotal * (paymentData?.VAT / 100)
  );

  useEffect(() => {
    if (!downloaded) {
      // console.log('something')
      buttonRef.current.click();
      downloaded = true; // this line prevent the download invoice twice
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    function addOrdinalIndicator(day) {
      if (day > 3 && day < 21) {
        return day + "th";
      }
      switch (day % 10) {
        case 1:
          return day + "st";
        case 2:
          return day + "nd";
        case 3:
          return day + "rd";
        default:
          return day + "th";
      }
    }

    const formatter = new Intl.DateTimeFormat("en-GB", options);
    const formattedDate = formatter.format(date);

    const ordinalDay = new Intl.DateTimeFormat("en", { day: "numeric" })
      .formatToParts(date)
      .find((part) => part.type === "day").value;
    const formattedDateWithOrdinal = formattedDate.replace(
      ordinalDay,
      addOrdinalIndicator(ordinalDay)
    );

    return formattedDateWithOrdinal;
  };

  return (
    <div className="w-full">
      <Pdf
        targetRef={ref}
        filename={`invoice-#${data.id}.pdf`}
        scale={0.95}
        x={10}
        y={5}
      >
        {({ toPdf }) => <button ref={buttonRef} onClick={toPdf}></button>}
      </Pdf>

      <div
        ref={ref}
        className={`
          ${status === "pending" && "bg-[#FCDDEC]"} ${
          status === "charged" && "bg-[#E9FFFF]"
        }
          w-[750px] mt-12 sm:mx-auto mx-12 mb-12 rounded-[40px]
        `}
      >
        <div className="p-8">
          <div className="flex items-center flex-row gap-x-5">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-navyBlue">
              <img src="/assets/Duber Icon.png" className="w-16" alt="" />
            </div>

            <div className="">
              <h2 className="text-2xl font-semibold">
                {status === "pending" && `VAT Receipt`}
                {status === "charged" && "VAT Invoice"}
              </h2>
              <p className="text-primaryGray text-sm mt-1">
                {formatDate(data?.datePaid)}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            {/* FROM section */}
            <div className="">
              <p className="font-semibold text-primaryGray text-xs">{`FROM`}</p>
              <p className="mt-2 font-medium">Duber Ltd</p>
              <p className="text-xs mt-1 text-primaryGray">{`023 9217 9793`}</p>
              <p className="text-xs mt-2 text-primaryGray">{`
              Unit 12 - 14 Highcroft Industrial Estate
            `}</p>
              <p className="text-xs mt-1 text-primaryGray">{`
              Enterprise Road, Waterlooville
            `}</p>
              <p className="text-xs mt-1 text-primaryGray">{`
              PO8 0BT, UNITED KINGDOM
            `}</p>

              <p className="text-xs mt-3 text-primaryGray">{`
              VAT Number: 441919976
            `}</p>
              <p className="text-xs mt-2 text-primaryGray">{`
              Company Number: 14830374
            `}</p>

              <p className="text-xs mt-3 text-primaryGray">{`
              accounts@duber.uk
            `}</p>
            </div>

            {/* TO section */}
            <div className="">
              <p className="font-semibold text-primaryGray text-xs">{`CUSTOMER`}</p>
              <p className="mt-2 font-medium">
                {customer?.companyName !== ""
                  ? customer?.companyName
                  : `${customer?.firstName} ${customer?.lastName}`}
              </p>

              {data?.billing_address && (
                <>
                  <p className="text-xs mt-1 text-primaryGray">{`${
                    data?.billing_address?.road
                      ? data?.billing_address?.road
                      : ""
                  }, ${
                    data?.billing_address?.town
                      ? data?.billing_address?.town
                      : ""
                  }`}</p>
                  <p className="text-xs mt-1 text-primaryGray">{`${
                    data?.billing_address?.county
                      ? data?.billing_address?.county
                      : ""
                  },`}</p>
                  <p className="text-xs mt-1 text-primaryGray">{`${
                    data?.billing_address?.postcode
                      ? data?.billing_address?.postcode
                      : ""
                  }, ${
                    data?.billing_address?.country
                      ? data?.billing_address?.country
                      : ""
                  }`}</p>
                </>
              )}

              <p className="text-xs mt-3 text-primaryGray">{customer?.email}</p>
            </div>
          </div>

          <div className="mt-9 flex justify-between pr-16">
            <div>
              <h2 className="font-light text-sm text-primaryGray uppercase">{`reference no`}</h2>
              <h2 className="text-base font-medium">{`#${data.id}`}</h2>
            </div>
            <div>
              <h2 className="font-light text-sm text-primaryGray uppercase">{`Issue date`}</h2>
              <h2 className="text-base font-medium">
                {formatDate(data?.created_at)}
              </h2>
            </div>
            <div>
              <h2 className="font-light text-sm text-primaryGray uppercase">{`Status`}</h2>
              <h2 className="text-base font-medium">
                {status === "pending" && "Deposit Paid"}
                {status === "charged" && "Paid"}
              </h2>
            </div>
          </div>

          <div className="mt-9">
            <div className="flex items-center justify-between h-16  gap-x-4 ">
              <div className="flex items-center w-full h-16">
                <div>
                  <p className="font-medium">{`Booking Deposit`}</p>
                  <p className="text-xs text-primaryGray">
                    {status === "pending" &&
                      `Upfront payment to secure booking`}
                    {status === "charged" &&
                      `Upfront payment received on the - ${formatDate(
                        data?.datePaid
                      )}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center w-28 h-16">
                {`1`}
              </div>
              <div className="flex items-center justify-end w-80 h-16">
                {data?.storagePlan.id === 1 &&
                  `£${paymentData?.deposit?.without_subscription}.00`}
                {data?.storagePlan.id === 2 &&
                  `£${paymentData?.deposit?.with_subscription}.00`}
              </div>
            </div>

            <div className="flex items-center justify-between h-24  gap-x-4 ">
              <div className="flex items-center w-full h-16">
                <div>
                  <p className="font-medium">{`Scheduled Payment`}</p>
                  <p className="text-xs text-primaryGray">
                    {status === "pending" &&
                      `Remaining amount of £${scheduledPayment} (ex VAT) to be taken following completion of works`}
                    {status === "charged" &&
                      `Job completed final payment received `}
                  </p>
                </div>
              </div>

              {status === "charged" && (
                <div className="flex items-center justify-center w-28 h-16">
                  {`1`}
                </div>
              )}

              {status === "pending" && (
                <div className="flex items-center justify-end w-72 h-16" />
              )}
              {status === "charged" && (
                <div className="flex items-center justify-end w-80 h-16">
                  {/* CHANGE THIS TO DYNAMIC */}
                  {`£${scheduledPayment}.00`}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pl-64 pr-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 uppercase">{`subtotal`}</p>
              {status === "pending" && (
                <p className="text-lg">{`£${deposit_subtotal}.00`}</p>
              )}
              {status === "charged" && (
                <p className="text-lg">{`£${complete_subtotal}.00`}</p>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-gray-400 uppercase">{`total vat 20%`}</p>
              {status === "pending" && (
                <p className="text-lg">{`£${deposit_tax}.00`}</p>
              )}
              {status === "charged" && (
                <p className="text-lg">{`£${complete_tax}.00`}</p>
              )}
            </div>
            <div className="flex items-center justify-between mt-9">
              <p className="text-lg font-medium uppercase">{`TOTAL AMOUNT PAID`}</p>
              {status === "pending" && (
                <p className="text-xl font-bold">{`£${
                  deposit_subtotal + deposit_tax
                }.00`}</p>
              )}
              {status === "charged" && (
                <p className="text-xl font-bold">{`£${
                  complete_subtotal + complete_tax
                }.00`}</p>
              )}
            </div>
          </div>

          <div className="mt-9 bg-white rounded-3xl p-6">
            <p className="text-primaryGray uppercase text-sm font-semibold">{`Booking information`}</p>

            <div className="mt-4 grid grid-cols-4 grid-rows-2 gap-x-4 gap-y-4">
              {/* Row 1 */}
              <div className="">
                <p className="text-xs uppercase text-gray-500">{`Order no`}</p>
                <p className="text-sm font-semibold text-black">{`#${data?.id}`}</p>
              </div>
              <div className="">
                <p className="text-xs uppercase text-gray-500">{`BOOKING TYPE`}</p>
                <p className="text-sm font-semibold text-black">{`${data?.captureFormat}`}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs uppercase text-gray-500">{`CUSTOMER'S NOTES`}</p>
                <p className="text-xs font-medium text-black">{`${data?.customerNote}`}</p>
              </div>

              {/* Row 2 */}
              <div className="">
                <p className="text-xs uppercase text-gray-500">{`SITE ADDRESS`}</p>
                <p className="text-xs font-medium text-black">{`${data?.address}`}</p>
              </div>
              <div className="">
                <p className="text-xs uppercase text-gray-500">{`PILOT ASSIGNED`}</p>
                <p className="text-sm font-semibold text-black">
                  {data?.pilotID === null && "To be confirmed"}
                  {data?.pilotID !== null &&
                    `${pilotData?.firstName} ${pilotData?.lastName}`}
                </p>
              </div>
              <div className="">
                <p className="text-xs uppercase text-gray-500">{`outstanding balance`}</p>
                <p className="text-sm font-semibold text-black">
                  {data?.status !== "Completed"
                    ? `£${scheduledPayment}`
                    : "£0.00 ex VAT"}
                </p>
              </div>
              <div className="">
                <p className="text-xs uppercase text-gray-500">{`total`}</p>
                <p className="text-sm font-semibold text-black">{`£${data?.amount}`}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-t-3xl p-8">
          <p className="uppercase text-primaryGray text-xs">Note</p>
          <p className="text-xs">
            {`Thank you for booking with Duber, if you require assistance for billing contact accounts@duber.uk`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

export const getServerSideProps = async ({ query }) => {
  try {
    if (!query.paymentId || !query.id) throw new Error("Access Denied");

    // ------------------- Fetch Order -------------------
    const { data, error } = await fetchOrder(query.id);
    if (error) throw error;

    if (query.paymentId !== data[0].paymentID)
      throw new Error("Payment ID Not matched to order ID");

    // ------------------- Fetch customer data -------------------
    const { data: customerData, error: customerError } = await selectCustomer(
      data[0].customerID
    );
    if (customerError) throw customerError;

    // ------------------- GET PAYMENT DATA -------------------
    let paymentData = {};
    if (data[0].storagePlan) {
      const { data: paymentDataRes, error: paymentDataErr } =
        await selectPaymentData();

      if (paymentDataErr) throw paymentDataErr;

      paymentData = paymentDataRes[0];
    }

    // ------------------- GET PILOT DATA -------------------
    let pilotData = {};
    if (data[0].pilotID) {
      const { data: pilotDataRes, error: pilotDataErr } = await getPilotData(
        data[0].pilotID
      );

      if (pilotDataErr) throw pilotDataErr;

      pilotData = pilotDataRes[0];
    }

    return {
      props: {
        data: data.length > 0 ? data[0] : {},
        customer: customerData.length > 0 ? customerData[0] : {},
        paymentData: paymentData,
        pilotData: pilotData,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/hire",
        permanent: false,
      },
    };
  }
};
