import React, { useEffect } from "react";
import "./CompanyDashboard.css";
import UsageChart from "../../components/UsageChart/UsageChart";
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
import { fetchTotalEnergyConsumption, fetchUsageData } from "../../redux/energyUsagesSlice";
import { getStates } from "../../redux/statesSlice";
import { getRegions } from "../../redux/regionsSlice";
import PricingTierTray from "../../components/PricingTierTray/PricingTierTray";
import QueryFilterTray from "../../components/QueryFilterTray/QueryFilterTray";

const CompanyDashboard = () => {
	const { state, region, household, period } = useSelector((state) => state.dashboard);
	const pricingTiersFromRedux = useSelector(state => state.pricingTiers.pricingTiers);
	const energyUsageFromRedux = useSelector(state => state.energyUsage.energyUsage);
	
	const { currentDate, currentYear, currentMonth, currentWeek } = useSelector(state => state.energyUsage);

 	const dispatch = useDispatch();
	
	const totalEnergyConsumptionFromRedux = useSelector(state => state.energyUsage.totalEnergyConsumption);
	

	const { isAuthenticated } = useAuth0();

	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);

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

	useEffect(() => {
		dispatch(getStates())
	}, [dispatch]);

	useEffect(() => {
		dispatch(getRegions(state));
	}, [dispatch, state]);

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
		dispatch(fetchTotalEnergyConsumption({ household, period, currentDate, currentYear, currentMonth, currentWeek }));
	}, [
		dispatch,
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
						<QueryFilterTray />
						<div className="content-container">
							{household ? (
								<>
									<UsageChart data={energyUsageFromRedux} period={period} />
									<div style={{ display: "flex", alignItems: "center" }}>
										<PeriodNavigator />
									</div>
									<StatsSection energyUsage={totalEnergyConsumptionFromRedux} /></>) : <NoData />}
						</div>
					</div>
					<PricingTierTray pricingTiers={pricingTiersFromRedux} />
				</div>
			</Layout>
		) : null
	);
};

export default CompanyDashboard;
