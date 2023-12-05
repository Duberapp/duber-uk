import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  polygon: undefined,
  address: "",
  area: 0,
  price: 0,
  center: [-2.369669, 54.237933],
  zoom: 5,
  styleIndex: 0,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setPolygon: (state, action) => {
      state.polygon = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setArea: (state, action) => {
      state.area = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setCenter: (state, action) => {
      state.center = action.payload;
      state.zoom = 17;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
    setStyleIndex: (state, action) => {
      state.styleIndex = action.payload;
    },
  },
});

export const {
  setPolygon,
  setArea,
  setAddress,
  setPrice,
  setCenter,
  setZoom,
  setStyleIndex,
} = mapSlice.actions;

export default mapSlice.reducer;
