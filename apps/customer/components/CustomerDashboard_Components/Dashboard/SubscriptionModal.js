import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LoadingSpinner } from "../";
import { supabaseCustomerClient } from "../../../config/supabaseClient";
import { updateOrder } from "../../../config/supabaseFunctions";
import { cancelSubscriptionPlan } from "../../../utils/utilityFunctions";
import { errorToast, successToast } from "../UI/Toast";
import axios from "axios";

const SubscriptionModal = ({ setModalShow, userData }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState("");

  // Fetch data
  useEffect(() => {
    const initializeOrders = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabaseCustomerClient
          .from("Orders")
          .select()
          .match({ authUserId: userData.user_id });

        if (error) throw new Error("Error while fetching orders !");

        setSubscriptions(data.filter((order) => order.subscriptionId));
        // setSubscriptions(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    initializeOrders();
  }, [triggerFetch]);

  // Cancel Subscription
  const handleCancelSubscription = async (dataId, subscriptionId) => {
    try {
      setCancelId(dataId);
      setCancelling(true);

      // Cancel subscription in Stripe API
      const { data: unsubscribeDate, error: unsubscribeError } =
        await cancelSubscriptionPlan(subscriptionId);
      if (unsubscribeError) throw new Error("Failed to cancel subscription !");

      // Update DB Records
      const { data: updateData, error: updateError } = await updateOrder(
        {
          subscriptionId: "",
        },
        dataId
      );

      // Send Assets deletion request
      const { data: deleteSchedulerData } = await axios({
        method: "post",
        baseURL: "https://scheduler-service.duber.uk",
        url: "/add-expiration",
        data: {
          subscriptionDate: new Date(),
          jobId: dataId,
        },
      });
      console.log(deleteSchedulerData);

      setTriggerFetch(unsubscribeDate.id);
      successToast("Successfully Unsubscribed !");
      setCancelling(false);
      setCancelId(null);
    } catch (err) {
      setCancelId(null);
      setCancelling(false);
      errorToast(err.message);
    }
  };

  return (
    <div className="fixed w-full h-full z-[1000] top-0 left-0 bg-[#00000020] flex items-center justify-center">
      <div
        className={`sm:max-w-screen-sm w-full h-[500px] ${
          subscriptions.length > 6 && "overflow-scroll"
        } p-4 pb-7 bg-white rounded-md shadow-xl`}
      >
        <div className="flex justify-between">
          <p className="font-semibold text-navyBlue mb-5">{`Manage Storage Plan Subscriptions`}</p>
          <XMarkIcon
            className="cursor-pointer"
            onClick={() => setModalShow(false)}
            width={20}
            height={20}
            color="text-black"
          />
        </div>

        {/* List */}
        {loading && (
          <div className="w-full mt-6 flex items-center justify-center">
            <LoadingSpinner width={6} height={6} color="navyBlue" />
          </div>
        )}

        {!loading &&
          (subscriptions.length === 0 ? (
            <p className="text-gray-400">{`You dont have any subscriptions yet !`}</p>
          ) : (
            <div className="flex flex-col gap-y-5 py-3">
              {subscriptions.map((order) => (
                <div
                  className="w-full p-3 flex items-center justify-between bg-white custom-shadow-xs rounded-md"
                  key={order.id}
                >
                  <div className="flex items-center">
                    <p className="font-bold">{`#${order.id}`}</p>
                    <p className="text-sm text-gray-500 ml-4">{`#${order.address.slice(
                      0,
                      29
                    )}..`}</p>
                  </div>

                  <button
                    onClick={() =>
                      handleCancelSubscription(order.id, order.subscriptionId)
                    }
                    className="w-28 text-sm h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-md"
                  >
                    {cancelId === order.id && cancelling ? (
                      <LoadingSpinner width={5} height={5} color="red-100" />
                    ) : (
                      `Cancel`
                    )}
                  </button>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubscriptionModal;
