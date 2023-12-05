import React from "react";
import { useSelector } from "react-redux";
import { SubscriptionAlertCard } from "./";
import {
  ContactCard,
  DateCard,
  LocationCard,
  OptionsCard,
  SubscriptionCard,
} from "./SidebarComponents/Cards";

const OrderSidebar = () => {
  const mapState = useSelector((state) => state.map);
  const orderState = useSelector((state) => state.createOrder);

  return (
    <div className="min-h-full w-full flex flex-col justify-between">
      <div className="mb-6">
        <div className="mb-3">
          <p className="text-base text-white">Booking Overview</p>
        </div>
        <div className="flex-1 flex flex-col gap-y-4">
          {mapState.address && <LocationCard />}

          {orderState.startDate && <DateCard />}

          {orderState.expertise && <OptionsCard />}

          {Object.keys(orderState.storagePlan).length > 0 && (
            <SubscriptionCard />
          )}

          {(orderState.firstName || orderState.lastName) && <ContactCard />}
        </div>
      </div>

      <div className="flex w-full items-center justify-between ">
        <p className="text-lg uppercase font-bold text-white">Total</p>
        <p className="text-lg font-medium text-white">
          &#163; {mapState.price}{" "}
          <span className="text-xs font-normal">{`(ex vat)`}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSidebar;
