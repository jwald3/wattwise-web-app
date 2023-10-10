import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import pricingTiersReducer from "./pricingTiersSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    pricingTiers: pricingTiersReducer,
  },
});
