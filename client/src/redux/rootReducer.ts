import { combineReducers } from "@reduxjs/toolkit";
import authSession from "./slices/authSession";
import client from "./slices/client";

const rootReducer = combineReducers({
  authSession: authSession,
  client: client,

});

export default rootReducer;
