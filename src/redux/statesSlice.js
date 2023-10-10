import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStates } from "../api/Api";

export const getStates = createAsyncThunk(
    "states/getStates",
    async () => {
        const response = await fetchStates();
        return response; 
    }
);

const initialState = {
    states: [],
    status: "idle",
    error: null,
};

const statesSlice = createSlice({
    name: "states",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStates.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getStates.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.states = action.payload;
            })
            .addCase(getStates.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export default statesSlice.reducer;