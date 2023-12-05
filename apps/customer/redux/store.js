import { configureStore } from "@reduxjs/toolkit";
import createOrderSlice from './createOrderSlice'
import mapSlice from './mapSlice'

const store = configureStore({
    reducer: {
        createOrder: createOrderSlice,
        map: mapSlice
    }
})

export default store