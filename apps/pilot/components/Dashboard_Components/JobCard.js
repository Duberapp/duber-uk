import React, { useState } from "react";
import {
  HomeModernIcon,
  CameraIcon,
  PhotoIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setActiveJob } from "../../redux/activeJobSlice";
import { useRouter } from "next/router";

const JobCard = ({ data, preventRoute, transferRate }) => {
  const state = useSelector((state) => state.activeJob.activeJob);
  const router = useRouter();
  const dispatch = useDispatch();

  let jobcard_title;
  let icon;
  switch (data.capability) {
    case "Videography (Films, Docs)":
      icon = (
        <CameraIcon
          strokeWidth={0.7}
          className="h-12 max-w-12 text-primaryBlue"
        />
      );
      jobcard_title = "Videography";
      break;
    case "Photography (Weddings)":
      icon = (
        <PhotoIcon
          strokeWidth={0.7}
          className="h-12 max-w-12 text-primaryBlue"
        />
      );
      jobcard_title = "Photography";
      break;
    case "Thermal Imaging":
      icon = (
        <FireIcon
          strokeWidth={0.7}
          className="h-12 max-w-12 text-primaryBlue"
        />
      );
      jobcard_title = "Thermal Imaging";
      break;
    case "Building/Roof Inspections":
      icon = (
        <HomeModernIcon
          strokeWidth={0.7}
          className="h-12 max-w-12 text-primaryBlue"
        />
      );
      jobcard_title = "Building/Roof Inspections";
      break;
    default:
      jobcard_title = data.capability;
      break;
  }

  const handleOnClick = () => {
    dispatch(setActiveJob(data.JobID));

    if (
      typeof window !== "undefined" &&
      data.status !== "Available" &&
      !preventRoute
    ) {
      // Client-side-only code
      let screenWidth = window.screen.width;
      if (screenWidth < 1024) {
        router.push(`/dashboard/myJobs/${data.JobID}`);
      }
    }
  };

  const formatPrice = (price) => {
    return (price - 100) * (1 - transferRate / 100);
  };

  return (
    <div
      className={`job-card ${state == data.JobID && "active"}`}
      onClick={handleOnClick}
    >
      <div className="flex items-center">
        {icon}
        <div className="ml-5">
          <div className="w-full flex items-center justify-between">
            <p className="text-sm font-semibold text-black">{jobcard_title}</p>
            <p className="sm:flex hidden text-sm font-semibold text-black">{`£ ${Math.floor(
              formatPrice(data.price)
            )}`}</p>
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
        <div className="block sm:hidden">
          <p className="sm:hidden block text-center text-sm font-semibold text-black">{`£ ${formatPrice(
            data.price
          )}`}</p>
          <p className="text-center mb-5 text-sm font-semibold text-black">
            {data?.area}m<sup>2</sup>
          </p>
        </div>
        <button
          className={`sm:w-28 py-2 sm:text-sm w-20 text-xs font-medium ${
            data.status == "Live" && "bg-red-100 text-red-500"
          } ${data.status == "Completed" && "bg-blue-100 text-blue-500"} ${
            data.status == "Available" && "bg-green-100 text-green-500"
          } rounded-md`}
        >
          {data?.status}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
