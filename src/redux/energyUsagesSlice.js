// energyUsageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchDailyEnergyConsumptionByCustomer,
    fetchWeeklyEnergyConsumptionByCustomer,
    fetchMonthlyEnergyConsumptionByCustomer,
    fetchYearlyEnergyConsumptionByCustomer,
} from '../api/Api';

export const fetchUsageData = createAsyncThunk(
    'energyUsage/fetchUsageData',
    async ({ household, period, currentDate, currentYear, currentMonth, currentWeek }) => {
        let responseData = null;
        
        if (period === "Daily") {
				responseData = await fetchDailyEnergyConsumptionByCustomer({
					household_id: household,
					date: currentDate,
					year: currentYear,
				});
			} else if (period === "Weekly") {
				responseData = await fetchWeeklyEnergyConsumptionByCustomer({
					household_id: household,
					week: currentWeek,
					year: currentYear,
				});
			} else if (period === "Monthly") {
				responseData = await fetchMonthlyEnergyConsumptionByCustomer({
					household_id: household,
					month: currentMonth,
					year: currentYear,
				});
			} else if (period === "Yearly") {
				responseData = await fetchYearlyEnergyConsumptionByCustomer({
					household_id: household,
					year: currentYear,
				});
			}

        return responseData;
    }
);

const energyUsageSlice = createSlice({
    name: 'energyUsage',
    initialState: {
        energyUsage: [],
        totalEnergyConsumption: 0,
        currentDate: "2023-01-01",
        currentYear: 2023,
        currentMonth: 1,
        currentWeek: 1,
        loading: false,
        error: null
    },
    reducers: {
        setCurrentDate: (state, action) => {
            state.currentDate = action.payload;
        },
        setCurrentYear: (state, action) => {
            state.currentYear = action.payload;
        },
        setCurrentMonth: (state, action) => {
            state.currentMonth = action.payload;
        },
        setCurrentWeek: (state, action) => {
            state.currentWeek = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsageData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsageData.fulfilled, (state, action) => {
                state.loading = false;
                state.energyUsage = action.payload;
            })
            .addCase(fetchUsageData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            

    }
});

export default energyUsageSlice.reducer;
