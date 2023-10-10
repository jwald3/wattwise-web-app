import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRegions } from "../api/Api";

export const getRegions = createAsyncThunk(
    "regions/getRegions",
    async (stateID) => {
        const response = await fetchRegions(stateID);
        return response; 
    }
);

const initialState = {
    regions: [],
    status: "idle",
    error: null,
};

const regionsSlice = createSlice({
    name: "regions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRegions.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getRegions.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.regions = action.payload;
            })
            .addCase(getRegions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export default regionsSlice.reducer;