import React, { useState, useEffect } from "react";
import Datepicker from "react-datepicker";
import { setStartDate } from "../../../redux/createOrderSlice";
import { useSelector, useDispatch } from "react-redux";

const DatePicker_Desktop = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.createOrder);

  return (
    <div className="w-full">
      <Datepicker
        placeholderText="Select a Date"
        selected={orderState.startDate ? new Date(orderState.startDate) : null}
        onChange={(date) => {
          dispatch(setStartDate(date.toDateString()));
        }}
        excludeDates={[new Date()]}
        minDate={new Date()}
        className="form-input sm:text-sm text-[16px]"
      />
      {/* <input type="text" className='form-input sm:text-sm text-[16px]' placeholder='Selecte Date' /> */}
    </div>
  );
};

export default DatePicker_Desktop;
