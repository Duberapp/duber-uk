import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userBilling: {},
  stripeState: null,
};

const currentUserBilling = createSlice({
  name: "userBilling",
  initialState,
  reducers: {
    setUserBilling: (state, action) => {
      state.userBilling = action.payload;
    },
    setStripeState: (state, action) => {
      state.stripeState = action.payload;
    },
  },
});

export const { setUserBilling, setStripeState } = currentUserBilling.actions;
export default currentUserBilling.reducer;
