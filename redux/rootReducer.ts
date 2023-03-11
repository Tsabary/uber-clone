import { combineReducers } from "@reduxjs/toolkit";

import navReducer from "./slices/navSlice";

const rootReducer = combineReducers({
  nav: navReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
