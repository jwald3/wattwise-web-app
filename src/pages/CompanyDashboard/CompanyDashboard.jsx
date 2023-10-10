import React, { useEffect } from "react";
import "./CompanyDashboard.css";
import UsageChart from "../../components/UsageChart/UsageChart";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import PricingTierTile from "../../components/PricingTierTile/PricingTierTile";
import {
	fetchRegions,
	fetchTotalDailyEnergyConsumptionByCustomer,
	fetchTotalMonthlyEnergyConsumptionByCustomer,
	fetchTotalWeeklyEnergyConsumptionByCustomer,
	fetchTotalYearlyEnergyConsumptionByCustomer,
} from "../../api/Api";
import FillerPricingTierTile from "../../components/FillerPricingTierTile/FillerPricingTierTile";
import PeriodNavigator from "../../components/PeriodNavigator/PeriodNavigator";
import StatsSection from "../../components/StatsSection/StatsSection";
import Layout from "../../Layouts/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import NoData from "../../components/NoData/NoData";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { setHousehold, setPeriod, setRegion, setState } from "../../redux/dashboardSlice";
import { fetchPricingTiersByRegion } from "../../redux/pricingTiersSlice";
import { fetchHouseholdsByRegion } from "../../redux/householdsSlice";
import { fetchUsageData } from "../../redux/energyUsagesSlice";
import { getStates } from "../../redux/statesSlice";

const CompanyDashboard = () => {
	const { state, region, household, period } = useSelector((state) => state.dashboard);
	const pricingTiersFromRedux = useSelector(state => state.pricingTiers.pricingTiers);
	const householdsFromRedux = useSelector(state => state.households.households);
	const energyUsageFromRedux = useSelector(state => state.energyUsage.energyUsage);
	const statesFromRedux = useSelector(state => state.states.states);

	const { currentDate, currentYear, currentMonth, currentWeek } = useSelector(state => state.energyUsage);

 	const dispatch = useDispatch();

	
	const [regions, setRegions] = React.useState([]);
	
	const [totalEnergyConsumption, setTotalEnergyConsumption] = React.useState(0);
	const [isEdit, setIsEdit] = React.useState(false);

	const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

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
			navigate(`${location.pathname}?${queryParams.toString()}`, {
				replace: true,
			});
		} else {
			// The standard logic to set states based on URL
			if (stateParam) {
				dispatch(setState(stateParam));
				if (regionParam) {
				  dispatch(setRegion(regionParam));
				  if (householdParam) {
					dispatch(setHousehold(householdParam));
				  }
				}
			  }
			  dispatch(setPeriod(periodParam));
		}
	}, [location.search, navigate]);

	const updateURLParams = (newState, newRegion, newHousehold, newPeriod) => {
		const params = [];

		if (newState) params.push(`state=${newState}`);
		if (newState && newRegion) params.push(`region=${newRegion}`);
		if (newState && newRegion && newHousehold)
			params.push(`household=${newHousehold}`);
		if (newPeriod) params.push(`period=${newPeriod}`);

		navigate(`/dashboard?${params.join("&")}`);
	};

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
		dispatch(getStates())
	}, []);

	useEffect(() => {
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
		if (region !== "") {
			dispatch(fetchHouseholdsByRegion(region));
		}
	}, [dispatch, region]);

	useEffect(() => {
        if (region !== "") {
            // Dispatch the action to fetch the pricing tiers
            dispatch(fetchPricingTiersByRegion(region));
        }
    }, [dispatch, region]);

	useEffect(() => {
		if (household === "") return;

		dispatch(fetchUsageData({ household, period, currentDate, currentYear, currentMonth, currentWeek }));
	}, [dispatch, household, period, currentDate, currentYear, currentMonth, currentWeek]);

	useEffect(() => {
		if (energyUsageFromRedux.length === 0) return;

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
	}, [
		period,
		energyUsageFromRedux,
		household,
		currentDate,
		currentYear,
		currentMonth,
		currentWeek,
	]);

	return (
		isAuthenticated ? (
			<Layout>
				<div className="mainPage">
					<div className="chartMenu flex2">
						<div className="filterContainer">
							<div className="dropdownContainer">
								<DropdownMenu
									label="State"
									value={state}
									options={statesFromRedux.map((state) => ({
										value: state.state_id,
										display: state.state_territory,
									}))	
									}
									handleChange={handleStateChange}
									nullable={true}
									// adapt minWidth based on screen size, reduce by .8 if on screen < 1200px
									minWidth={window.innerWidth <= 1200 ? 75 * .6 : 75}
								/>

								{state !== "" && (
									<DropdownMenu
										label="Region"
										value={region}
										options={regions}
										handleChange={handleRegionChange}
										nullable={true}
										minWidth={window.innerWidth <= 1200 ? 125 * .6 : 125}
									/>
								)}

								{region !== "" && (
									<DropdownMenu
										label="Household"
										value={household}
										options={householdsFromRedux.map((household) => ({
											value: household.household_id,
											display: household.street_address,
										}))}
										handleChange={handleHouseholdChange}
										nullable={true}
										minWidth={window.innerWidth <= 1200 ? 150 * .6 : 150}
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
									minWidth={window.innerWidth <= 1200 ? 125 * .6 : 125}
								/>
							</div>
						</div>

						<div className="content-container">
							{household ? (
								<>
									<UsageChart data={energyUsageFromRedux} period={period} />
									<div style={{ display: "flex", alignItems: "center" }}>
										<PeriodNavigator />
									</div>
									<StatsSection energyUsage={totalEnergyConsumption} /></>) : <NoData />}
						</div>
					</div>
					<div className="pricingMenu">
						<div className="titleContainer">
							<div className="headerText">Pricing Tiers</div>
							<button
								className={`editButton ${isEdit ? "active-edit" : ""}`}
								onClick={() => setIsEdit(!isEdit)}
							>
								Edit
							</button>
						</div>
						<div className="pricingContent">
							{pricingCategories.map((category) => {
								const matchingTier = pricingTiersFromRedux.find(
									(tier) => tier.pricing_tier_name === category
								);

								return matchingTier ? (
									<PricingTierTile
										key={category}
										pricingData={matchingTier}
										state={state}
										region={region}
										regionName={matchingTier.region_name}
										isEdit={isEdit}
									/>
								) : (
									<FillerPricingTierTile
										key={category}
										pricingTierName={category}
										state={state}
										region={region}
										regionName={matchingTier?.region_name}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</Layout>
		) : null
	);
};

export default CompanyDashboard;
