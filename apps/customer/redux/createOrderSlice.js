import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active_step: 1,
  step1_state: "active",
  step2_state: "",
  step3_state: "",

  startDate: null,

  expertise: "",
  customerNote: "",
  captureFormat: null,

  title: "",
  firstName: "",
  lastName: "",
  email: "",
  telNumber: "",
  company: "",

  authUserId: "",

  step1_UpdateMode: false,
  step2_UpdateMode: false,
  step3_UpdateMode: false,

  storagePlan: {},

  timeOption: null,
  timeSlot: null,

  extendedDurationHours: 0,
  totalDuration: 2,
};

const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    completeStep: (state, action) => {
      state[`step${action.payload}_state`] = "completed";
    },

    setActiveStep: (state, action) => {
      state[`step${action.payload}_state`] = "active";
      state.active_step = action.payload;
    },

    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },

    completeOptions: (state, action) => {
      state.expertise = action.payload.expertise;
      state.customerNote = action.payload.customerNote;
      state.captureFormat = action.payload.captureFormat;
    },

    completeContact: (state, action) => {
      state.title = action.payload.title;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.telNumber = action.payload.telNumber;
      state.company = action.payload.company;
    },

    switchToUpdateMode: (state, action) => {
      state[`step${action.payload}_UpdateMode`] = true;
    },

    setClientSecret: (state, action) => {
      state.stripeClientSecret = action.payload;
    },

    setAuthUserId: (state, action) => {
      state.authUserId = action.payload;
    },

    setStoragePlan: (state, action) => {
      state.storagePlan = action.payload;
    },

    setPilotExpertise: (state, action) => {
      state.expertise = action.payload;
    },

    setTimeOption: (state, action) => {
      state.timeOption = action.payload;
    },

    setTimeSlotRedux: (state, action) => {
      state.timeSlot = action.payload;
    },

    setExtendedDurationHours: (state, action) => {
      state.extendedDurationHours = action.payload;
    },

    setTotalDurationHours: (state, action) => {
      state.totalDuration = action.payload;
    },

    setCaptureFormatRedux: (state, action) => {
      state.captureFormat = action.payload;
    },
  },
});

export const {
  completeStep,
  setActiveStep,
  setStartDate,
  completeOptions,
  completeContact,
  switchToUpdateMode,
  setClientSecret,
  setAuthUserId,
  setStoragePlan,
  setPilotExpertise,
  setTimeOption,
  setTimeSlotRedux,
  setExtendedDurationHours,
  setTotalDurationHours,
  setCaptureFormatRedux,
} = createOrderSlice.actions;

export default createOrderSlice.reducer;
