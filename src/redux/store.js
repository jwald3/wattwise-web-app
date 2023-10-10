import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import pricingTiersReducer from "./pricingTiersSlice";
import householdsReducer from "./householdsSlice";  

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    pricingTiers: pricingTiersReducer,
    households: householdsReducer,
  },
});
