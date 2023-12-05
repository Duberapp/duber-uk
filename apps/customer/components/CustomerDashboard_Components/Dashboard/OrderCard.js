import React from "react";
import { Button } from "../";
import {
  HomeModernIcon,
  CameraIcon,
  PhotoIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const OrderCard = ({ data, activeId, setActiveId }) => {
  const router = useRouter();

  return (
    <div
      className={`${
        activeId === data.id && "border-2 border-teal-300"
      } w-full flex items-center justify-between bg-white min-h-fit p-3 custom-shadow-xs rounded-md cursor-pointer`}
      onMouseEnter={() => {
        setActiveId(data.id);
        console.log(data);
      }}
      onMouseLeave={() => setActiveId(null)}
      onClick={() => router.push(`/hire/track-order/${data.id}`)}
    >
      <div className="flex items-center">
        {formatIcon(data.pilotExpertize)}

        <div className="ml-5 flex items-center gap-x-5">
          <div>
            <p className="sm:text-sm text-xs font-semibold">
              {formatExpertises(data.pilotExpertize)}
            </p>
            <p className="mt-1 sm:text-sm text-[10px] text-gray-400">
              {extractCity(data.address)}
            </p>
          </div>

          <div>
            <p className="sm:text-sm text-xs font-semibold">
              {data.area}m<sup>2</sup>
            </p>
            <p className="mt-1 sm:text-sm text-[10px] text-gray-400">
              {new Date(data.date).toDateString()}
            </p>
          </div>

          <div>
            <p className="sm:text-sm text-xs font-semibold mb-1">
              {!data.arrivalTime ? "" : data.arrivalTime}
            </p>

            {extractStatus(data.status)}
          </div>
        </div>
      </div>
      <div className="">
        <Button
          width={"w-fit"}
          className={
            "sm:flex hidden sm:text-xs text-xs h-10 capitalize px-4 text-navyBlue"
          }
          onClick={() => router.push(`/hire/track-order/${data.id}`)}
        >{`View/Track Order`}</Button>
      </div>
    </div>
  );
};

export default OrderCard;

const formatIcon = (term) => {
  switch (term) {
    case "Building/Roof Inspections":
      return (
        <HomeModernIcon
          width={48}
          height={48}
          className="text-primaryBlue"
          strokeWidth={1}
        />
      );

    case "Videography (Films, Docs)":
      return (
        <CameraIcon
          width={48}
          height={48}
          className="text-primaryBlue"
          strokeWidth={1}
        />
      );

    case "Photography (Weddings)":
      return (
        <PhotoIcon
          width={48}
          height={48}
          className="text-primaryBlue"
          strokeWidth={1}
        />
      );

    case "Thermal Imaging":
      return (
        <FireIcon
          width={48}
          height={48}
          className="text-primaryBlue"
          strokeWidth={1}
        />
      );

    default:
      return "";
  }
};

const formatExpertises = (term) => {
  switch (term) {
    case "Building/Roof Inspections":
      return "Building";

    case "Videography (Films, Docs)":
      return "Videography";

    case "Photography (Weddings)":
      return "Photography";

    case "Thermal Imaging":
      return "Thermal";

    default:
      return "";
  }
};

const extractCity = (term) => {
  const spilited = term.split(",");
  return `${spilited[1]} UK`;
};

const extractStatus = (status) => {
  switch (status) {
    case "Available":
      return (
        <div className="sm:text-xs text-[10px] text-red-500 bg-red-100 rounded-full w-20 text-center py-[1px]">
          Live
        </div>
      );
    case "Live":
      return (
        <div className="sm:text-xs text-[10px] text-red-500 bg-red-100 rounded-full w-20 text-center py-[1px]">
          Live
        </div>
      );
    case "Completed":
      return (
        <div className="sm:text-xs text-[10px] text-blue-500 bg-blue-100 rounded-full w-20 text-center py-[1px]">
          Completed
        </div>
      );

    default:
      return (
        <div className="sm:text-xs text-[10px] text-gray-500 bg-gray-100 rounded-full w-20 text-center py-[1px]">
          Status: Null
        </div>
      );
  }
};
