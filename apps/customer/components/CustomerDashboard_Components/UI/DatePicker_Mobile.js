import React, { useState, useEffect } from "react";
import Datepicker from "react-datepicker";
import { setStartDate } from "../../../redux/createOrderSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Input from "./Input";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DatePicker_Mobile = ({ setShowMobileModel, arrivalTimeComponent }) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.createOrder);

  return (
    <div className=" w-full h-full bg-gray-50">
      <Datepicker
        selected={orderState.startDate ? new Date(orderState.startDate) : null}
        inline
        onChange={(date) => {
          dispatch(setStartDate(date.toDateString()));
          // setShowMobileModel(false);
        }}
        excludeDates={[new Date()]}
        minDate={new Date()}
        renderCustomHeader={({
          date,
          increaseMonth,
          decreaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => {
          return (
            <div className="bg-white fixed top-0 left-0 w-[100vw] h-fit px-5 pt-6 pb-3 ">
              <div className="flex items-center">
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-md mr-2 bg-skyBlue"
                  onClick={() => setShowMobileModel(false)}
                >
                  <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>
                <Input className={"h-12 flex-1"}>
                  <div className="w-full flex items-center justify-between">
                    <ChevronLeftIcon
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      className="w-5 h-5 text-primaryBlue"
                    />
                    <p className="text-primaryBlue font-semibold">
                      {date.getFullYear()} {months[date.getMonth()]}
                    </p>
                    <ChevronRightIcon
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      className="w-5 h-5 text-primaryBlue"
                    />
                  </div>
                </Input>
              </div>
            </div>
          );
        }}
      />

      <div>{arrivalTimeComponent}</div>
    </div>
  );
};

export default DatePicker_Mobile;
