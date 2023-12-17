import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./registerSlice";
import activeJobSlice from "./activeJobSlice";
import currentUserSlice from "./currentUser";
import userBillingSlice from "./userBillingSlice";
import uploadLogSlice from "./uploadLogSlice";
import dataSlice from "./dataSlice";

const store = configureStore({
  reducer: {
    register: registerSlice,
    activeJob: activeJobSlice,
    currentUser: currentUserSlice,
    userBilling: userBillingSlice,
    uploadLog: uploadLogSlice,
    data: dataSlice,
  },
});

export default store;
