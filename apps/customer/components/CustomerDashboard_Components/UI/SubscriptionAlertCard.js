import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoragePlan } from "../../../redux/createOrderSlice";
import { setPrice } from "../../../redux/mapSlice";
import { storage_plans } from "global-constants";

const SubscriptionAlertCard = () => {
  const dispatch = useDispatch();
  const mapState = useSelector((state) => state.map);

  const handleSwitchPlan = () => {
    dispatch(setStoragePlan(storage_plans[1]));
    dispatch(setPrice(mapState.price + 10));
  };

  return (
    <div className="mt-6 mb-8 w-full py-2 px-3 bg-red-100 rounded-md">
      <p className="text-red-400 font-medium">{`Important Disclaimer`}</p>
      <p className="text-red-400 text-sm font-light">{`You have selected "1 Month Download Link", After 1 month from order date the files will be DELETED`}</p>

      <div
        onClick={handleSwitchPlan}
        className="cursor-pointer mt-3 mb-2 w-full rounded-md bg-primaryTealLight text-primaryTeal flex flex-col items-center justify-center py-3"
      >
        <p className="text-xs font-medium text-teal-500">{`Click to change to`}</p>
        <p className="text-xs font-medium  text-teal-500">{`Cloud Hosting (£10/month)`}</p>
      </div>
    </div>
  );
};

export default SubscriptionAlertCard;
