import React, { useEffect, useRef } from "react";
import "./CompanyDashboard.css";
import UsageChart from "../../components/UsageChart/UsageChart";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import PricingTierTile from "../../components/PricingTierTile/PricingTierTile";
import {
    fetchCustomersByProviderAndRegion,
    fetchDailyEnergyConsumptionByCustomer,
    fetchMonthlyEnergyConsumptionByCustomer,
    fetchPricingTiersByProvider,
    fetchRegions,
    fetchStates,
    fetchTotalDailyEnergyConsumptionByCustomer,
    fetchTotalMonthlyEnergyConsumptionByCustomer,
    fetchTotalWeeklyEnergyConsumptionByCustomer,
    fetchTotalYearlyEnergyConsumptionByCustomer,
    fetchWeeklyEnergyConsumptionByCustomer,
    fetchYearlyEnergyConsumptionByCustomer,
} from "../../api/Api";
import FillerPricingTierTile from "../../components/FillerPricingTierTile/FillerPricingTierTile";
import PeriodNavigator from "../../components/PeriodNavigator/PeriodNavigator";
import StatsSection from "../../components/StatsSection/StatsSection";
import Layout from "../../Layouts/Layout";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

const CompanyDashboard = () => {
    const [provider, setProvider] = React.useState(1);
    const [state, setState] = React.useState("");
    const [region, setRegion] = React.useState("");
    const [household, setHousehold] = React.useState("");
    const [period, setPeriod] = React.useState("Yearly");
    const [states, setStates] = React.useState([]);
    const [regions, setRegions] = React.useState([]);
    const [households, setHouseholds] = React.useState([]);
    const [pricingTiers, setPricingTiers] = React.useState([]);
    const [energyUsage, setEnergyUsage] = React.useState([]);
    const [currentDate, setCurrentDate] = React.useState("2023-01-01");
    const [currentYear, setCurrentYear] = React.useState(2023);
    const [currentMonth, setCurrentMonth] = React.useState(1);
    const [currentWeek, setCurrentWeek] = React.useState(1);
    const [totalEnergyConsumption, setTotalEnergyConsumption] = React.useState(0);

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const periods = ["Daily", "Weekly", "Monthly", "Yearly"].map((period) => ({
        value: period,
        display: period,
    }));

    const pricingCategories = ["Peak", "Off-Peak", "Weekend", "Holiday"];

    // Read URL parameters and set to state
    useEffect(() => {
        const stateParam = queryParams.get("state");
        const regionParam = queryParams.get("region");
        const householdParam = queryParams.get("household");
        const periodParam = queryParams.get("period") || "Yearly"; // default to "Yearly"
        
        let updateURL = false; // flag to check if we need to update the URL
    
        if (householdParam && (!stateParam || !regionParam)) {
            // If household is provided without both state and region, clear all params
            updateURL = true;
            queryParams.delete("household");
            queryParams.delete("region");
            queryParams.delete("state");
        } else if (regionParam && !stateParam) {
            // If a region is provided without a state, remove the region param
            updateURL = true;
            queryParams.delete("region");
        }
    
        if (updateURL) {
            // If we've made changes, update the URL without causing a navigation event
            navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
        } else {
            // The standard logic to set states based on URL
            if (stateParam) {
                setState(stateParam);
                if (regionParam) {
                    setRegion(regionParam);
                    if (householdParam) {
                        setHousehold(householdParam);
                    }
                }
            }
            setPeriod(periodParam);
        }
    }, [location.search, navigate]);
    

    const updateURLParams = (newState, newRegion, newHousehold, newPeriod) => {
        const params = [];

        if (newState) params.push(`state=${newState}`);
        if (newState && newRegion) params.push(`region=${newRegion}`);
        if (newState && newRegion && newHousehold) params.push(`household=${newHousehold}`);
        if (newPeriod) params.push(`period=${newPeriod}`);

        navigate(`/dashboard?${params.join("&")}`);
    }

    const handleStateChange = (event) => {
        const selectedState = event.target.value;
        updateURLParams(selectedState, "", "", period);
    };

    const handleRegionChange = (event) => {
        const selectedRegion = event.target.value;
        updateURLParams(state, selectedRegion, "", period);
    };

    const handleHouseholdChange = (event) => {
        const selectedHousehold = event.target.value;
        updateURLParams(state, region, selectedHousehold, period);
    };

    const handlePeriodChange = (event) => {
        const selectedPeriod = event.target.value;
        updateURLParams(state, region, household, selectedPeriod);
    };

    useEffect(() => {
        const fetchStatesData = async () => {
            const states = await fetchStates();
            let statesArray = states.map((state) => ({
                value: state.state_id,
                display: state.state_territory,
            }));
            setStates(statesArray);
        };

        fetchStatesData();
    }, []);

    useEffect(() => {
        if (state === -1) return;

        const fetchRegionsData = async () => {
            const regions = await fetchRegions(state);
            let regionsArray = regions.map((region) => ({
                value: region.region_id,
                display: region.region_name,
            }));
            setRegions(regionsArray);
        };

        fetchRegionsData();
    }, [state]);

    useEffect(() => {
        if (region === "") {
            setHouseholds([]);
            return;
        }

        const fetchHouseholdData = async () => {
            const responseData = await fetchCustomersByProviderAndRegion(1, region);
            const customersArray = responseData.customers;

            if (!Array.isArray(customersArray) || customersArray.length === 0) return;

            let householdArray = customersArray.map((customer) => ({
                value: customer.household_id,
                display: customer.street_address,
            }));
            setHouseholds(householdArray);
        };

        fetchHouseholdData();
    }, [region, state]);

    useEffect(() => {
        if (region === "") {
            setPricingTiers([]);
            return;
        }

        const fetchPricingTiers = async () => {
            const pricingTiers = await fetchPricingTiersByProvider({ providerID: provider, regionID: region });
            setPricingTiers(pricingTiers);
        };

        fetchPricingTiers();
    }, [provider, region]);

    useEffect(() => {
        if (household === "") return;

        const fetchUsageData = async () => {
            let responseData = null;

            if (period === "Daily") {
                responseData = await fetchDailyEnergyConsumptionByCustomer({
                    household_id: household,
                    date: currentDate,
                    year: 2023,
                });
            } else if (period === "Weekly") {
                responseData = await fetchWeeklyEnergyConsumptionByCustomer({
                    household_id: household,
                    week: currentWeek,
                    year: 2023,
                });
            } else if (period === "Monthly") {
                responseData = await fetchMonthlyEnergyConsumptionByCustomer({
                    household_id: household,
                    month: currentMonth,
                    year: 2023,
                });
            } else if (period === "Yearly") {
                responseData = await fetchYearlyEnergyConsumptionByCustomer({
                    household_id: household,
                    year: 2023,
                });
            }

            setEnergyUsage(responseData);
        };

        fetchUsageData();
    }, [household, period, currentDate, currentYear, currentMonth, currentWeek]);

    useEffect(() => {
        if (energyUsage.length === 0) return;

        const getTotalConsumption = async () => {
            let totalEnergy = 0;

            if (period === "Daily") {
                totalEnergy = await fetchTotalDailyEnergyConsumptionByCustomer({
                    household_id: household,
                    date: currentDate,
                    year: currentYear,
                });
            } else if (period === "Weekly") {
                totalEnergy = await fetchTotalWeeklyEnergyConsumptionByCustomer({
                    household_id: household,
                    week: currentWeek,
                    year: currentYear,
                });
            } else if (period === "Monthly") {
                totalEnergy = await fetchTotalMonthlyEnergyConsumptionByCustomer({
                    household_id: household,
                    month: currentMonth,
                    year: currentYear,
                });
            } else if (period === "Yearly") {
                totalEnergy = await fetchTotalYearlyEnergyConsumptionByCustomer({
                    household_id: household,
                    year: currentYear,
                });
            }

            setTotalEnergyConsumption(totalEnergy.energy_usage);
        };

        getTotalConsumption();
    }, [period, energyUsage, household, currentDate, currentYear, currentMonth, currentWeek]);

    return (
        <Layout>
            <div className="mainPage">
                <div className="chartMenu flex2">
                    <div className="filterContainer">
                        <div className="dropdownContainer">
                            <DropdownMenu
                                label="State"
                                value={state}
                                options={states}
                                handleChange={handleStateChange}
                                nullable={true}
                                minWidth={75}
                            />

                            {state !== "" && (
                                <DropdownMenu
                                    label="Region"
                                    value={region}
                                    options={regions}
                                    handleChange={handleRegionChange}
                                    nullable={true}
                                    minWidth={125}
                                />
                            )}

                            {region !== "" && (
                                <DropdownMenu
                                    label="Household"
                                    value={household}
                                    options={households}
                                    handleChange={handleHouseholdChange}
                                    nullable={true}
                                    minWidth={150}
                                />
                            )}
                        </div>
                        <div>
                            <DropdownMenu
                                label="Period"
                                value={period}
                                options={periods}
                                handleChange={handlePeriodChange}
                                nullable={false}
                                minWidth={125}
                            />
                        </div>
                    </div>

                    <div className="contentContainer">
                        <UsageChart data={energyUsage} period={period} />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <PeriodNavigator
                                period={period}
                                dateValue={currentDate}
                                dateSetter={setCurrentDate}
                                yearValue={currentYear}
                                yearSetter={setCurrentYear}
                                monthValue={currentMonth}
                                monthSetter={setCurrentMonth}
                                weekValue={currentWeek}
                                weekSetter={setCurrentWeek}
                            />
                        </div>
                        <StatsSection energyUsage={totalEnergyConsumption} />
                    </div>
                </div>
                <div className="pricingMenu">
                    <div className="titleContainer">
                        <div className="headerText">Pricing Tiers</div>
                        <button className="editButton">Edit</button>
                    </div>
                    <div className="pricingContent">
                        {pricingCategories.map((category) => {
                            const matchingTier = pricingTiers.find(
                                (tier) => tier.pricing_tier_name === category
                            );

                            return matchingTier ? (
                                <PricingTierTile
                                    key={category}
                                    pricingData={matchingTier}
                                />
                            ) : (
                                <FillerPricingTierTile
                                    key={category}
                                    pricingTierName={category}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CompanyDashboard;
