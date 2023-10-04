import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
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
    fetchWeeklyEnergyConsumptionByCustomer,
    fetchYearlyEnergyConsumptionByCustomer,
} from "../../api/Api";
import FillerPricingTierTile from "../../components/FillerPricingTierTile/FillerPricingTierTile";
import PeriodNavigator from "../../components/PeriodNavigator/PeriodNavigator";

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
            const responseData = await fetchCustomersByProviderAndRegion(
                1,
                region
            );
            console.log(responseData);

            const customersArray = responseData.customers;

            // if customersArray is null or an empty array, return
            if (!Array.isArray(customersArray) || customersArray.length === 0)
                return;

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
            const pricingTiers = await fetchPricingTiersByProvider({
                providerID: provider,
                regionID: region,
            });
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

            console.log(responseData);
            setEnergyUsage(responseData);
        };

        fetchUsageData();
    }, [
        household,
        period,
        currentDate,
        currentYear,
        currentMonth,
        currentWeek,
    ]);

    const handleStateChange = (event) => {
        setState(event.target.value);
        setRegion("");
        setHousehold("");
    };

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
        setHousehold("");
    };

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    const handleHouseholdChange = (event) => {
        setHousehold(event.target.value);
    };

    const periods = ["Daily", "Weekly", "Monthly", "Yearly"].map((period) => ({
        value: period,
        display: period,
    }));

    const pricingCategories = ["Peak", "Off-Peak", "Weekend", "Holiday"];

    return (
        <div>
            <Header />
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
                        <UsageChart data={energyUsage} />
                        <div style={{ display: "flex", alignItems: "center"}}>
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
            <Footer />
        </div>
    );
};

export default CompanyDashboard;
