import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provider: 1,
  state: "",
  region: "",
  household: "",
  period: "Yearly",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.state = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setHousehold: (state, action) => {
      state.household = action.payload;
    },
    setPeriod: (state, action) => {
      state.period = action.payload;
    }
  },
});

export const { setState, setRegion, setHousehold, setPeriod } = dashboardSlice.actions;
export default dashboardSlice.reducer;
