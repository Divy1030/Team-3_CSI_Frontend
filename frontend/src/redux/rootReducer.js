import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import socketSlice from "./socketSlice";
import chatSlice from "./chatSlice";
import rtnSlice from "./rtnSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    socketio: socketSlice,
    chat: chatSlice,
    realTimeNotification: rtnSlice
});

export default rootReducer;