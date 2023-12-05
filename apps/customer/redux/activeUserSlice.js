import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUser: null,
};

const activeOrderSlice = createSlice({
  name: "activeUser",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
  },
});

export const { setActiveUser } = activeOrderSlice.actions;

export default activeOrderSlice.reducer;
