import { createSlice } from "@reduxjs/toolkit";
import { Navigation } from "../../types";
import type { RootState } from "../store";

// Define a type for the slice state
interface NavigationState {
  origin: {
    location: { lat: number; lng: number };
    description: any;
  } | null;
  destination: {
    location: { lat: number; lng: number };
    description: any;
  } | null;
  travelTimeinformation: {
    distance: { text: string };
    duration: { text: string; value: number };
  } | null;
}

// Define the initial state using that type
const initialState: NavigationState = {
  origin: null,
  destination: null,
  travelTimeinformation: null,
};

export const navigationSlice = createSlice({
  name: "navigation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeinformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  navigationSlice.actions;

// Selectors
export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) =>
  state.nav.travelTimeinformation;

export default navigationSlice.reducer;
