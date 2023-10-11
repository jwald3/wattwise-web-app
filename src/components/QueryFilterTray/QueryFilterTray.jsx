import React, { useEffect } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchTotalEnergyConsumption, fetchUsageData } from "../../redux/energyUsagesSlice";
import { setHousehold, setPeriod, setRegion, setState } from "../../redux/dashboardSlice";
import { getStates } from "../../redux/statesSlice";
import { getRegions } from "../../redux/regionsSlice";
import { fetchHouseholdsByRegion } from "../../redux/householdsSlice";

const QueryFilterTray = () => {
    const dispatch = useDispatch();
    const { state, region, household, period } = useSelector((state) => state.dashboard);
    const { currentDate, currentYear, currentMonth, currentWeek } = useSelector(state => state.energyUsage);
    const statesFromRedux = useSelector(state => state.states.states);
	const regionsFromRedux = useSelector(state => state.regions.regions);
    const householdsFromRedux = useSelector(state => state.households.households);
    

    const periods = ["Daily", "Weekly", "Monthly", "Yearly"].map((period) => ({
		value: period,
		display: period,
	}));

	const navigate = useNavigate();
    const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

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
		setState(selectedState);
		setRegion(null);
		setHousehold(null);
		updateURLParams(selectedState, "", "", period);
	};

	const handleRegionChange = (event) => {
		const selectedRegion = event.target.value;
		setRegion(selectedRegion);
		setHousehold(null);
		updateURLParams(state, selectedRegion, "", period);
	};

	const handleHouseholdChange = (event) => {
		const selectedHousehold = event.target.value;
		setHousehold(selectedHousehold);
		updateURLParams(state, region, selectedHousehold, period);
	};

	const handlePeriodChange = (event) => {
		const selectedPeriod = event.target.value;
		setPeriod(selectedPeriod)
		updateURLParams(state, region, household, selectedPeriod);
	};

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
	}, [location.search, navigate, dispatch, queryParams]);

    useEffect(() => {
		if (household === "") return;

		dispatch(fetchUsageData({ household, period, currentDate, currentYear, currentMonth, currentWeek }));
	}, [dispatch, household, period, currentDate, currentYear, currentMonth, currentWeek]);

	useEffect(() => {
		dispatch(fetchTotalEnergyConsumption({ household, period, currentDate, currentYear, currentMonth, currentWeek }));
	}, [
		dispatch,
		period,
		household,
		currentDate,
		currentYear,
		currentMonth,
		currentWeek,
	]);

    return (
        <div className="filterContainer">
            <div className="dropdownContainer">
                <DropdownMenu
                    label="State"
                    value={state}
                    options={statesFromRedux.map((state) => ({
                        value: state.state_id,
                        display: state.state_territory,
                    }))}
                    handleChange={handleStateChange}
                    nullable={true}
                    minWidth={150}
                />

                {state !== "" && (
                    <DropdownMenu
                        label="Region"
                        value={region}
                        options={regionsFromRedux.map((region) => ({
                            value: region.region_id,
                            display: region.region_name,
                        }))}
                        handleChange={handleRegionChange}
                        nullable={true}
                        minWidth={150}
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
                        minWidth={150}
                    />
                )}
            </div>
            <div className="period-container">
                <DropdownMenu
                    label="Period"
                    value={period}
                    options={periods}
                    handleChange={handlePeriodChange}
                    nullable={false}
                    minWidth={150}
                />
            </div>
        </div>
    );
};

export default QueryFilterTray;
