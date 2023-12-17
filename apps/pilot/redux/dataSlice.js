import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  version: "v2",
};

const dataLog = createSlice({
  name: "dataLog",
  initialState,
  reducers: {
    setVersion: (state, action) => {
      state.version = action.payload;
    },
  },
});

export const { setVersion } = dataLog.actions;
export default dataLog.reducer;
