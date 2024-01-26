import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveStep } from "../../../redux/createOrderSlice";
import { TimeOptions, PilotExpertises } from "global-constants";

const sharedStyles_card = `w-full rounded-lg flex items-center justify-between max-h-24 overflow-hidden`;
const sharedStyles_titleArea = `flex flex-col gap-y-0.5 basis-2/3 ml-3`;
const sharedStyles_imgArea = `flex basis-1/3 flex-row-reverse`;

const ChangeButton = ({ activeToID }) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.createOrder);

  const handleClick = (activeTo) => {
    // if (orderState.updateMode) dispatch(setActiveStep(activeTo))
    if (orderState[`step${activeTo}_UpdateMode`]) {
      dispatch(setActiveStep(activeTo));
    }
  };

  return (
    <p
      onClick={() => handleClick(activeToID)}
      className="text-white text-xs cursor-pointer underline"
    >
      Change
    </p>
  );
};

export const LocationCard = () => {
  const mapState = useSelector((state) => state.map);

  return (
    <div className={`bg-[#FFB21D] ${sharedStyles_card}`}>
      {/* Text */}
      <div className={sharedStyles_titleArea}>
        <p className="text-white sm:text-sm text-base font-semibold">
          {`${mapState.address}`.split(",")[0]}
        </p>

        <p className="text-white text-sm font-semibold">
          {mapState.area ? (
            <span>
              {mapState.area}
              {mapState.areaType === "squareMeters" && (
                <span>
                  {" "}
                  m<sup>2</sup>
                </span>
              )}
              {mapState.areaType === "squareKilometers" && (
                <span>
                  {" "}
                  Km<sup>2</sup>
                </span>
              )}
            </span>
          ) : (
            ""
          )}
        </p>

        <ChangeButton activeToID={1} />
      </div>

      {/* Picture */}
      <div className={`${sharedStyles_imgArea}`}>
        <img src="/assets/sidebar_assets/location.png" alt="" />
      </div>
    </div>
  );
};

export const DateCard = () => {
  const orderState = useSelector((state) => state.createOrder);
  const [timeOption, setTimeOption] = useState(null);

  useEffect(() => {
    if (orderState.timeOption) {
      const timeOpt = TimeOptions.filter(
        (obj) => obj.slug === orderState.timeOption
      )[0];

      setTimeOption(timeOpt);
    }
  }, [orderState.timeOption, orderState.timeSlot]);

  return (
    <div className={`bg-[#2263DF] ${sharedStyles_card}`}>
      {/* Text */}
      <div className={sharedStyles_titleArea}>
        <p className="text-white sm:text-sm text-base font-semibold">
          {orderState.startDate}
        </p>
        <p className="text-white text-xs font-normal">
          {timeOption && timeOption.slug !== "choose"
            ? `${timeOption.name}`
            : orderState.timeSlot}
        </p>

        <ChangeButton activeToID={1} />
      </div>

      {/* Picture */}
      <div className={sharedStyles_imgArea}>
        <img src="/assets/sidebar_assets/date.png" alt="" />
      </div>
    </div>
  );
};

export const OptionsCard = () => {
  const orderState = useSelector((state) => state.createOrder);

  return (
    <div className={`bg-[#FF6666] ${sharedStyles_card}`}>
      {/* Text */}
      <div className={sharedStyles_titleArea}>
        <p className="text-white sm:text-sm text-sm font-semibold">
          {
            PilotExpertises.filter(
              (exp) => exp.slug === orderState.expertise
            )[0].title
          }
        </p>
        <p className="text-white sm:text-xs text-base font-semibold">
          {orderState.totalDuration}hrs
          {orderState.captureFormat === "Both (Video/Photo)"
            ? ", Photos & Videos"
            : orderState.captureFormat
            ? `, ${orderState.captureFormat}`
            : ""}
        </p>

        <ChangeButton activeToID={2} />
      </div>

      {/* Picture */}
      <div className={sharedStyles_imgArea}>
        <img src="/assets/sidebar_assets/options.png" alt="" />
      </div>
    </div>
  );
};

export const SubscriptionCard = () => {
  const orderState = useSelector((state) => state.createOrder);

  return (
    <div className={`bg-[#41D8BD] ${sharedStyles_card}`}>
      {/* Text */}
      <div className={sharedStyles_titleArea}>
        <p className="text-white sm:text-sm text-base font-semibold">
          {Object.keys(orderState.storagePlan).length === 0
            ? ""
            : orderState.storagePlan.text}
        </p>

        <ChangeButton activeToID={5} />
      </div>

      {/* Picture */}
      <div className={sharedStyles_imgArea}>
        <img src="/assets/sidebar_assets/subscription.png" alt="" />
      </div>
    </div>
  );
};

export const ContactCard = () => {
  const orderState = useSelector((state) => state.createOrder);

  return (
    <div className={`bg-[#9747FF] ${sharedStyles_card}`}>
      {/* Text */}
      <div className={sharedStyles_titleArea}>
        {(orderState.firstName || orderState.lastName) && (
          <p className="text-white sm:text-sm text-base font-semibold">
            {orderState.firstName} {orderState.lastName}
          </p>
        )}
        {orderState.telNumber && (
          <p className="text-white text-xs font-semibold">
            {orderState.telNumber}
          </p>
        )}

        <ChangeButton activeToID={3} />
      </div>

      {/* Picture */}
      <div className={sharedStyles_imgArea}>
        <img src="/assets/sidebar_assets/contact_details.png" alt="" />
      </div>
    </div>
  );
};
