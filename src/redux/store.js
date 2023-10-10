import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import pricingTiersReducer from "./pricingTiersSlice";
import householdsReducer from "./householdsSlice";  
import energyUsageReducer from "./energyUsagesSlice";
import statesReducer from "./statesSlice";

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        pricingTiers: pricingTiersReducer,
        households: householdsReducer,
        energyUsage: energyUsageReducer,
        states: statesReducer,
    },
});
