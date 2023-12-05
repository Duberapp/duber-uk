import React from "react";
import { HomeModernIcon } from "@heroicons/react/24/outline";

const BalanceCard = ({ data, handleOnClick, activePaymentID }) => {
  let jobcard_title;
  switch (data.capability) {
    case "Videography (Films, Docs)":
      jobcard_title = "Videography";
      break;
    case "Photography (Weddings)":
      jobcard_title = "Photography";
      break;
    case "Thermal Imaging":
      jobcard_title = "Thermal Imaging";
      break;
    case "Building / Roof Inspections":
      jobcard_title = "Building / Roof Inspections";
      break;
    default:
      jobcard_title = data.capability;
      break;
  }

  return (
    <div
      className={`job-card ${activePaymentID === data.JobID && "active"}`}
      onClick={handleOnClick}
    >
      <div className="flex items-center">
        <HomeModernIcon
          strokeWidth={0.7}
          className="h-12 max-w-12 text-primaryBlue"
        />
        <div className="ml-5">
          <div className="w-full flex items-center justify-between">
            <p className="text-sm font-semibold text-black">{jobcard_title}</p>
            {/* <p className="text-sm font-semibold text-black">{`£ ${data.price}`}</p> */}
          </div>

          <div className="flex flex-row gap-6 items-center">
            <div className="">
              <p
                title={data.address}
                className="mt-2 sm:text-sm text-xs font-normal text-gray-400"
              >
                {data?.address.slice(0, 22)}..
              </p>
            </div>
            <p className="mt-2 lg:block hidden text-sm font-normal text-gray-400">
              {new Date(data?.date).toDateString()}
            </p>
            <p className="mt-2 lg:block hidden text-sm font-semibold text-black">
              {data?.area}m<sup>2</sup>
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <p className="block sm:hidden text-center mb-5 text-sm font-semibold text-black">
          {data?.area}m<sup>2</sup>
        </p>
        <button
          className={`sm:w-28 py-2 sm:text-sm w-20 text-xs font-medium ${
            data.payoutStatus == "outstanding" && "bg-red-100 text-red-500"
          } ${
            data.payoutStatus == "paid" && "bg-blue-100 text-blue-500"
          } rounded-md`}
        >
          {data.payoutStatus === "outstanding" && "Outstanding"}
          {data.payoutStatus === "paid" && "Paid"}
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
