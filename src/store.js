import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./actions/userSlices.js";

const store = configureStore( {
    reducer: {
        user: userReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware( {
            serializableCheck: false,
        } ),
} )

export default store