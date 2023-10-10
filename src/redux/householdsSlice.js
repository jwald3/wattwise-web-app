import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCustomersByProviderAndRegion } from "../api/Api";

export const fetchHouseholdsByRegion = createAsyncThunk(
    "households/getHouseholdsByRegion",
    async (region) => {
        const response = await fetchCustomersByProviderAndRegion(1, region);
        return response; 
    }
);

const initialState = {
    households: [],
    status: "idle",
    error: null,
};

const householdsSlice = createSlice({
    name: "households",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHouseholdsByRegion.pending, (state, action) => {
                state.status = "loading";
        })
            .addCase(fetchHouseholdsByRegion.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.households = action.payload;
            })
            .addCase(fetchHouseholdsByRegion.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export default householdsSlice.reducer;