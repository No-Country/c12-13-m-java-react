import { combineReducers } from "@reduxjs/toolkit";
import spaces from "./spaces";
import rooms from "./rooms";
import tasks from "./tasks";

const rootReducer = combineReducers({
  spaces,
  rooms,
  tasks,
});

export default rootReducer;
