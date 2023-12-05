import React, { useState } from "react";
import {
  PlusCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Modal, SubscriptionAlertCard } from "./";
import {
  ContactCard,
  DateCard,
  LocationCard,
  OptionsCard,
  SubscriptionCard,
} from "./SidebarComponents/Cards";

const MobilePriceBar = () => {
  const mapState = useSelector((state) => state.map);
  const orderState = useSelector((state) => state.createOrder);

  const [showSummeryModel, setShowSummeryModel] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowSummeryModel(true)}
        className="lg:hidden flex items-center justify-between flex-1 pl-2 pr-3 h-12 bg-gray-200 mr-2 rounded-md"
      >
        <div className="flex items-center">
          <PlusCircleIcon className="text-navyBlue w-7 h-7" />
          {orderState.storagePlan.id == 1 && (
            <ExclamationTriangleIcon
              strokeWidth={2}
              className="ml-2 text-red-500 w-6 h-6"
            />
          )}
        </div>
        <p className="text-lg font-semibold text-navyBlue">
          &#163; {mapState.price}{" "}
          <span className="text-xs font-normal">{`(ex VAT)`}</span>
        </p>
      </div>

      {showSummeryModel && (
        <Modal className={"bg-navyBlue"}>
          <div className="pt-6 pb-3 px-5 bg-navyBlue w-full flex items-center justify-between">
            <p className="text-lg text-white font-semibold">Booking Overview</p>
            <button
              onClick={() => setShowSummeryModel(false)}
              className="w-12 h-12 text-lg font-bold text-white rounded-md bg-[#FF33CE]"
            >
              -
            </button>
          </div>

          <div className="mt-3 px-5 flex-1 h-[78vh]  flex flex-col justify-between">
            <div className="flex-1 flex flex-col gap-y-4">
              {mapState.address && <LocationCard />}

              {orderState.startDate && <DateCard />}

              {orderState.expertise && <OptionsCard />}

              {Object.keys(orderState.storagePlan).length > 0 && (
                <SubscriptionCard />
              )}

              {(orderState.firstName || orderState.lastName) && <ContactCard />}
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-lg font-semibold text-white">TOTAL</p>

              <p className="text-lg font-semibold text-white bg-[#ffffff0a] p-3 rounded-2xl shadow-lg shadow-[#06193623]">
                &#163;{mapState.price}{" "}
                <span className="text-xs font-normal">{`(ex VAT)`}</span>
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MobilePriceBar;
