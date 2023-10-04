import axios from 'axios';

const API_URL = 'https://energy-api-gateway.onrender.com';

// Geography endpoints

export const fetchRegions = async (stateID = null) => {
    let params = new URLSearchParams();

    if (stateID !== null && stateID !== undefined)  {
        params.append("state_id", stateID);
    }

    const response = await axios.get(`${API_URL}/regions?${params.toString()}`);
    console.log(`${API_URL}/regions?${params.toString()}`);
    
    return response.data;
};

export const fetchStates = async () => {
    const response = await axios.get(`${API_URL}/states`);
    return response.data;
};

// Provider endpoints

export const fetchProviderByID = async (providerID) => {
    const response = await axios.get(`${API_URL}/providers/${providerID}`);
    return response.data;
};

export const fetchCustomersByProviderAndRegion = async (providerID, regionID) => {
    let params = new URLSearchParams();

    if (providerID !== null && providerID !== undefined)  {
        params.append("provider_id", providerID);
    }

    if (regionID !== null && regionID !== undefined)  {
        params.append("region_id", regionID);
    }

    const response = await axios.get(`${API_URL}/provider_customers?${params.toString()}`);

    return response.data;
}

// Pricing tier endpoints

export const fetchPricingTiersByProvider = async ({providerID, regionID}) => {
    let params = new URLSearchParams();

    if (providerID !== null && providerID !== undefined)  {
        params.append("provider_id", providerID);
    }

    if (regionID !== null && regionID !== undefined)  {
        params.append("region_id", regionID);
    }

    const response = await axios.get(`${API_URL}/pricing_tiers?${params.toString()}`);
    console.log(`${API_URL}/pricing_tiers?${params.toString()}`)
    return response.data;
}

export const addPricingTier = async (pricingTier) => {
    const response = await axios.post(`${API_URL}/pricing_tiers`, pricingTier);
    return response.data;
}

export const deletePricingTier = async (pricingTierID) => {
    const response = await axios.delete(`${API_URL}/pricing_tiers/${pricingTierID}`);
    return response.data;
}

export const updatePricingTier = async ({pricingTierID = null, pricingTier = null}) => {
    const response = await axios.put(`${API_URL}/pricing_tiers/${pricingTierID}`, pricingTier);
    return response.data;
}


// Customer endpoints
export const fetchTotalDailyEnergyConsumptionByCustomer = async ({household_id = null, date = null, year = null}) => {
    let params = new URLSearchParams();

    if (household_id !== null && household_id !== undefined)  {
        params.append("household_id", household_id);
    }

    if (date !== null && date !== undefined)  {
        params.append("date", date);
    }

    if (year !== null && year !== undefined)  {
        params.append("year", year);
    }

    const response = await axios.get(`${API_URL}/energy_usages/totals/daily?${params.toString()}`);

    return response.data;
}

export const fetchTotalMonthlyEnergyConsumptionByCustomer = async ({household_id = null, month = null, year = null}) => {
    let params = new URLSearchParams();

    if (household_id !== null && household_id !== undefined)  {
        params.append("household_id", household_id);
    }

    if (month !== null && month !== undefined)  {
        params.append("month", month);
    }

    if (year !== null && year !== undefined)  {
        params.append("year", year);
    }

    const response = await axios.get(`${API_URL}/energy_usages/totals/monthly?${params.toString()}`);
    return response.data;
}

export const fetchTotalWeeklyEnergyConsumptionByCustomer = async ({household_id = null, week = null, year = null}) => {
    let params = new URLSearchParams();

    if (household_id !== null && household_id !== undefined)  {
        params.append("household_id", household_id);
    }

    if (week !== null && week !== undefined)  {
        params.append("week", week);
    }

    if (year !== null && year !== undefined)  {
        params.append("year", year);
    }

    const response = await axios.get(`${API_URL}/energy_usages/totals/weekly?${params.toString()}`);
    return response.data;
}

export const fetchTotalYearlyEnergyConsumptionByCustomer = async ({household_id = null, year = null}) => {
    let params = new URLSearchParams();

    if (household_id !== null && household_id !== undefined)  {
        params.append("household_id", household_id);
    }

    if (year !== null && year !== undefined)  {
        params.append("year", year);
    }

    const response = await axios.get(`${API_URL}/energy_usages/totals/yearly?${params.toString()}`);
    return response.data;
}

export const fetchDailyEnergyConsumptionByCustomer = async ({household_id = null, date = null, year = null}) => {
    let params = new URLSearchParams();

    if (household_id !== null && household_id !== undefined)  {
        params.append("household_id", household_id);
    }

    if (date !== null && date !== undefined)  {
        params.append("date", date);
    }

    if (year !== null && year !== undefined)  {
        params.append("year", year);
    }

    const response = await axios.get(`${API_URL}/energy_usages/daily?${params.toString()}`);
    return response.data;
}

export const fetchMonthlyEnergyConsumptionByCustomer = async ({household_id = null, month = null, year = null}) => {
    let params = new URLSearchParams();

    if (household_id !== null && household_id !== undefined)  {
        params.append("household_id", household_id);
    }

    if (month !== null && month !== undefined)  {
        params.append("month", month);
    }

    if (year !== null && year !== undefined)  {
        params.append("year", year);
    }

    const response = await axios.get(`${API_URL}/energy_usages/monthly?${params.toString()}`);
    return response.data;
}

export const fetchWeeklyEnergyConsumptionByCustomer = async ({household_id = null, week = null, year = null}) => {
    let params = new URLSearchParams();

    if (household_id !== null && household_id !== undefined)  {
        params.append("household_id", household_id);
    }

    if (week !== null && week !== undefined)  {
        params.append("week", week);
    }

    if (year !== null && year !== undefined)  {
        params.append("year", year);
    }

    const response = await axios.get(`${API_URL}/energy_usages/weekly?${params.toString()}`);
    return response.data;
} 

export const fetchYearlyEnergyConsumptionByCustomer = async ({household_id = null, year = null}) => {
    let params = new URLSearchParams();

    if (household_id !== null && household_id !== undefined)  {
        params.append("household_id", household_id);
    }

    if (year !== null && year !== undefined)  {
        params.append("year", year);
    }

    const response = await axios.get(`${API_URL}/energy_usages/yearly?${params.toString()}`);
    return response.data;
}

