// Redux slice for pricing tiers: an array of pricing tier objects for a given region
// will use the API function getPricingTiersByRegion(region) to get the pricing tiers
// for a given region
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPricingTiersByProvider } from "../api/Api";

export const fetchPricingTiersByRegion = createAsyncThunk(
    "pricingTiers/getPricingTiersByRegion",
    async (region) => {
        const response = await fetchPricingTiersByProvider({providerID: 1, regionID: region})
        const data = await response.json();
        return data;
    }
);

const initialState = {
    pricingTiers: [],
    status: "idle",
    error: null,
};

const pricingTiersSlice = createSlice({
    name: "pricingTiers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPricingTiersByRegion.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPricingTiersByRegion.fulfilled, (state, action) => {
                state.status = "succeeded";
                // replace the state.pricingTiers array with the array we fetched from the API
                state.pricingTiers = action.payload;
            })
            .addCase(fetchPricingTiersByRegion.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export default pricingTiersSlice.reducer;

