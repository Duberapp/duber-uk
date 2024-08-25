import React from "react";
import { type UserTypeSlug } from "global-constants";
import Button from "../DuberButton";

interface Props {
  name: string;
  company: string;
  totalBookings: string | number;
  userType: UserTypeSlug;
  subscriptions: string | number;
  customerID: string | number;
  onView: (customerId: string | number) => void;
}

export default function CustomerCard({
  name,
  company,
  totalBookings,
  customerID,
  subscriptions,
  userType,
  onView,
}: Props) {
  return (
    <div className="w-full p-2 rounded-lg bg-white shadow-md flex items-center justify-between border border-slate-200">
      <div className="bg-duber-navyBlue py-2.5 rounded-lg pl-3 min-w-60">
        <p className="text-xs font-light text-white">Name</p>
        <p className="text-lg font-semibold text-white">{name}</p>
      </div>

      <div className="flex-1 items-center justify-between px-6 flex">
        <div className="flex-1">
          <p className="text-xs text-duber-navyBlue font-light">Company</p>
          <p className="text-base text-duber-navyBlue">
            {company ? company : "None"}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs text-duber-navyBlue font-light">
            Total Bookings
          </p>
          <p className="text-base text-duber-navyBlue">
            {totalBookings ? totalBookings : "None"}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs text-duber-navyBlue font-light">User Type</p>
          <p className="text-base text-duber-navyBlue normal-case">
            {!userType
              ? "None"
              : userType === "account"
              ? "Account"
              : userType === "guest"
              ? "Guest"
              : userType}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs text-duber-navyBlue font-light">
            Subscriptions
          </p>
          <p className="text-base text-duber-navyBlue">
            {subscriptions ? subscriptions : "None"}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs text-duber-navyBlue font-light">Customer ID</p>
          <p className="text-base text-duber-navyBlue">
            {customerID ? customerID : "None"}
          </p>
        </div>
      </div>

      <Button size={"xxl"} variant={"teal"} onClick={() => onView(customerID!)}>
        View
      </Button>
    </div>
  );
}
