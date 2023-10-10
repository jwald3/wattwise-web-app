import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPricingTiersByProvider } from "../api/Api";

export const fetchPricingTiersByRegion = createAsyncThunk(
    "pricingTiers/getPricingTiersByRegion",
    async (region) => {
        const response = await fetchPricingTiersByProvider({providerID: 1, regionID: region});
        return response; 
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
