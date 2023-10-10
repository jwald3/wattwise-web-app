import React from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const QueryFilterTray = () => {
    const { state, region, household, period } = useSelector((state) => state.dashboard);
    const statesFromRedux = useSelector(state => state.states.states);
	const regionsFromRedux = useSelector(state => state.regions.regions);
    const householdsFromRedux = useSelector(state => state.households.households);

    const periods = ["Daily", "Weekly", "Monthly", "Yearly"].map((period) => ({
		value: period,
		display: period,
	}));

	const navigate = useNavigate();

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
                    minWidth={window.innerWidth <= 1200 ? 75 * 0.6 : 75}
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
                        minWidth={window.innerWidth <= 1200 ? 125 * 0.6 : 125}
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
                        minWidth={window.innerWidth <= 1200 ? 150 * 0.6 : 150}
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
                    minWidth={window.innerWidth <= 1200 ? 125 * 0.6 : 125}
                />
            </div>
        </div>
    );
};

export default QueryFilterTray;
