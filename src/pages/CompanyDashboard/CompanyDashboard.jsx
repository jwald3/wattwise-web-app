import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./CompanyDashboard.css";
import UsageChart from "../../components/UsageChart/UsageChart";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import PricingTierTile from "../../components/PricingTierTile/PricingTierTile";
import {
    fetchCustomersByProviderAndRegion,
    fetchPricingTiersByProvider,
    fetchRegions,
    fetchStates,
} from "../../api/Api";
import FillerPricingTierTile from "../../components/FillerPricingTierTile/FillerPricingTierTile";

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

    const energyUsage = [
        {
            start_date: "2023-01-01",
            end_date: "2023-01-06",
            energy_usage: 23.008349999999997,
            count: 6,
        },
        {
            start_date: "2023-01-02",
            end_date: "2023-01-07",
            energy_usage: 22.904799999999998,
            count: 6,
        },
        {
            start_date: "2023-01-03",
            end_date: "2023-01-08",
            energy_usage: 22.051699999999997,
            count: 6,
        },
        {
            start_date: "2023-01-04",
            end_date: "2023-01-09",
            energy_usage: 22.114583333333332,
            count: 6,
        },
        {
            start_date: "2023-01-05",
            end_date: "2023-01-10",
            energy_usage: 22.088066666666663,
            count: 6,
        },
        {
            start_date: "2023-01-06",
            end_date: "2023-01-11",
            energy_usage: 22.019383333333334,
            count: 6,
        },
        {
            start_date: "2023-01-07",
            end_date: "2023-01-12",
            energy_usage: 21.820916666666665,
            count: 6,
        },
        {
            start_date: "2023-01-08",
            end_date: "2023-01-13",
            energy_usage: 22.6991,
            count: 6,
        },
        {
            start_date: "2023-01-09",
            end_date: "2023-01-14",
            energy_usage: 22.655183333333337,
            count: 6,
        },
        {
            start_date: "2023-01-10",
            end_date: "2023-01-15",
            energy_usage: 21.68071666666667,
            count: 6,
        },
        {
            start_date: "2023-01-11",
            end_date: "2023-01-16",
            energy_usage: 21.983766666666668,
            count: 6,
        },
        {
            start_date: "2023-01-12",
            end_date: "2023-01-17",
            energy_usage: 21.658466666666666,
            count: 6,
        },
        {
            start_date: "2023-01-13",
            end_date: "2023-01-18",
            energy_usage: 21.916,
            count: 6,
        },
        {
            start_date: "2023-01-14",
            end_date: "2023-01-19",
            energy_usage: 22.020016666666663,
            count: 6,
        },
        {
            start_date: "2023-01-15",
            end_date: "2023-01-20",
            energy_usage: 22.71313333333333,
            count: 6,
        },
        {
            start_date: "2023-01-16",
            end_date: "2023-01-21",
            energy_usage: 22.830749999999995,
            count: 6,
        },
        {
            start_date: "2023-01-17",
            end_date: "2023-01-22",
            energy_usage: 21.83945,
            count: 6,
        },
        {
            start_date: "2023-01-18",
            end_date: "2023-01-23",
            energy_usage: 22.2111,
            count: 6,
        },
        {
            start_date: "2023-01-19",
            end_date: "2023-01-24",
            energy_usage: 22.129450000000002,
            count: 6,
        },
        {
            start_date: "2023-01-20",
            end_date: "2023-01-25",
            energy_usage: 22.3176,
            count: 6,
        },
        {
            start_date: "2023-01-21",
            end_date: "2023-01-26",
            energy_usage: 22.509966666666667,
            count: 6,
        },
        {
            start_date: "2023-01-22",
            end_date: "2023-01-27",
            energy_usage: 23.108633333333334,
            count: 6,
        },
        {
            start_date: "2023-01-23",
            end_date: "2023-01-28",
            energy_usage: 22.9083,
            count: 6,
        },
        {
            start_date: "2023-01-24",
            end_date: "2023-01-29",
            energy_usage: 22.2465,
            count: 6,
        },
        {
            start_date: "2023-01-25",
            end_date: "2023-01-30",
            energy_usage: 22.2212,
            count: 6,
        },
        {
            start_date: "2023-01-26",
            end_date: "2023-01-31",
            energy_usage: 21.697550000000003,
            count: 6,
        },
        {
            start_date: "2023-01-27",
            end_date: "2023-02-01",
            energy_usage: 21.474500000000003,
            count: 6,
        },
        {
            start_date: "2023-01-28",
            end_date: "2023-02-02",
            energy_usage: 22.027800000000003,
            count: 6,
        },
        {
            start_date: "2023-01-29",
            end_date: "2023-02-03",
            energy_usage: 22.890183333333336,
            count: 6,
        },
        {
            start_date: "2023-01-30",
            end_date: "2023-02-04",
            energy_usage: 22.864433333333334,
            count: 6,
        },
        {
            start_date: "2023-01-31",
            end_date: "2023-02-05",
            energy_usage: 22.35265,
            count: 6,
        },
        {
            start_date: "2023-02-01",
            end_date: "2023-02-06",
            energy_usage: 22.736183333333333,
            count: 6,
        },
        {
            start_date: "2023-02-02",
            end_date: "2023-02-07",
            energy_usage: 23.083133333333336,
            count: 6,
        },
        {
            start_date: "2023-02-03",
            end_date: "2023-02-08",
            energy_usage: 22.876516666666664,
            count: 6,
        },
        {
            start_date: "2023-02-04",
            end_date: "2023-02-09",
            energy_usage: 23.142566666666664,
            count: 6,
        },
        {
            start_date: "2023-02-05",
            end_date: "2023-02-10",
            energy_usage: 23.64633333333333,
            count: 6,
        },
        {
            start_date: "2023-02-06",
            end_date: "2023-02-11",
            energy_usage: 23.511016666666666,
            count: 6,
        },
        {
            start_date: "2023-02-07",
            end_date: "2023-02-12",
            energy_usage: 22.332116666666668,
            count: 6,
        },
        {
            start_date: "2023-02-08",
            end_date: "2023-02-13",
            energy_usage: 22.02685,
            count: 6,
        },
        {
            start_date: "2023-02-09",
            end_date: "2023-02-14",
            energy_usage: 22.116333333333333,
            count: 6,
        },
        {
            start_date: "2023-02-10",
            end_date: "2023-02-15",
            energy_usage: 21.703833333333336,
            count: 6,
        },
        {
            start_date: "2023-02-11",
            end_date: "2023-02-16",
            energy_usage: 21.986833333333333,
            count: 6,
        },
        {
            start_date: "2023-02-12",
            end_date: "2023-02-17",
            energy_usage: 22.709183333333332,
            count: 6,
        },
        {
            start_date: "2023-02-13",
            end_date: "2023-02-18",
            energy_usage: 22.897983333333332,
            count: 6,
        },
        {
            start_date: "2023-02-14",
            end_date: "2023-02-19",
            energy_usage: 22.194816666666668,
            count: 6,
        },
        {
            start_date: "2023-02-15",
            end_date: "2023-02-20",
            energy_usage: 22.408649999999998,
            count: 6,
        },
        {
            start_date: "2023-02-16",
            end_date: "2023-02-21",
            energy_usage: 22.727666666666668,
            count: 6,
        },
        {
            start_date: "2023-02-17",
            end_date: "2023-02-22",
            energy_usage: 22.487650000000002,
            count: 6,
        },
        {
            start_date: "2023-02-18",
            end_date: "2023-02-23",
            energy_usage: 22.5445,
            count: 6,
        },
        {
            start_date: "2023-02-19",
            end_date: "2023-02-24",
            energy_usage: 23.316,
            count: 6,
        },
        {
            start_date: "2023-02-20",
            end_date: "2023-02-25",
            energy_usage: 23.323333333333327,
            count: 6,
        },
        {
            start_date: "2023-02-21",
            end_date: "2023-02-26",
            energy_usage: 22.380866666666662,
            count: 6,
        },
        {
            start_date: "2023-02-22",
            end_date: "2023-02-27",
            energy_usage: 22.206499999999995,
            count: 6,
        },
        {
            start_date: "2023-02-23",
            end_date: "2023-02-28",
            energy_usage: 22.541483333333332,
            count: 6,
        },
        {
            start_date: "2023-02-24",
            end_date: "2023-03-01",
            energy_usage: 22.36675,
            count: 6,
        },
        {
            start_date: "2023-02-25",
            end_date: "2023-03-02",
            energy_usage: 22.531866666666662,
            count: 6,
        },
        {
            start_date: "2023-02-26",
            end_date: "2023-03-03",
            energy_usage: 23.650916666666664,
            count: 6,
        },
        {
            start_date: "2023-02-27",
            end_date: "2023-03-04",
            energy_usage: 23.434233333333335,
            count: 6,
        },
        {
            start_date: "2023-02-28",
            end_date: "2023-03-05",
            energy_usage: 22.81873333333333,
            count: 6,
        },
        {
            start_date: "2023-03-01",
            end_date: "2023-03-06",
            energy_usage: 22.4366,
            count: 6,
        },
        {
            start_date: "2023-03-02",
            end_date: "2023-03-07",
            energy_usage: 22.458333333333332,
            count: 6,
        },
        {
            start_date: "2023-03-03",
            end_date: "2023-03-08",
            energy_usage: 22.429416666666665,
            count: 6,
        },
        {
            start_date: "2023-03-04",
            end_date: "2023-03-09",
            energy_usage: 22.10123333333333,
            count: 6,
        },
        {
            start_date: "2023-03-05",
            end_date: "2023-03-10",
            energy_usage: 22.58371666666667,
            count: 6,
        },
        {
            start_date: "2023-03-06",
            end_date: "2023-03-11",
            energy_usage: 22.718149999999998,
            count: 6,
        },
        {
            start_date: "2023-03-07",
            end_date: "2023-03-12",
            energy_usage: 22.135683333333333,
            count: 6,
        },
        {
            start_date: "2023-03-08",
            end_date: "2023-03-13",
            energy_usage: 22.385683333333333,
            count: 6,
        },
        {
            start_date: "2023-03-09",
            end_date: "2023-03-14",
            energy_usage: 22.294983333333338,
            count: 6,
        },
        {
            start_date: "2023-03-10",
            end_date: "2023-03-15",
            energy_usage: 22.202183333333338,
            count: 6,
        },
        {
            start_date: "2023-03-11",
            end_date: "2023-03-16",
            energy_usage: 22.655716666666667,
            count: 6,
        },
        {
            start_date: "2023-03-12",
            end_date: "2023-03-17",
            energy_usage: 22.982266666666664,
            count: 6,
        },
        {
            start_date: "2023-03-13",
            end_date: "2023-03-18",
            energy_usage: 23.18001666666667,
            count: 6,
        },
        {
            start_date: "2023-03-14",
            end_date: "2023-03-19",
            energy_usage: 22.408150000000003,
            count: 6,
        },
        {
            start_date: "2023-03-15",
            end_date: "2023-03-20",
            energy_usage: 22.503283333333332,
            count: 6,
        },
        {
            start_date: "2023-03-16",
            end_date: "2023-03-21",
            energy_usage: 22.8255,
            count: 6,
        },
        {
            start_date: "2023-03-17",
            end_date: "2023-03-22",
            energy_usage: 22.544566666666668,
            count: 6,
        },
        {
            start_date: "2023-03-18",
            end_date: "2023-03-23",
            energy_usage: 22.765916666666666,
            count: 6,
        },
        {
            start_date: "2023-03-19",
            end_date: "2023-03-24",
            energy_usage: 23.369466666666664,
            count: 6,
        },
        {
            start_date: "2023-03-20",
            end_date: "2023-03-25",
            energy_usage: 23.295566666666662,
            count: 6,
        },
        {
            start_date: "2023-03-21",
            end_date: "2023-03-26",
            energy_usage: 22.174616666666665,
            count: 6,
        },
        {
            start_date: "2023-03-22",
            end_date: "2023-03-27",
            energy_usage: 21.98145,
            count: 6,
        },
        {
            start_date: "2023-03-23",
            end_date: "2023-03-28",
            energy_usage: 22.1331,
            count: 6,
        },
        {
            start_date: "2023-03-24",
            end_date: "2023-03-29",
            energy_usage: 22.152833333333334,
            count: 6,
        },
        {
            start_date: "2023-03-25",
            end_date: "2023-03-30",
            energy_usage: 22.111583333333332,
            count: 6,
        },
        {
            start_date: "2023-03-26",
            end_date: "2023-03-31",
            energy_usage: 23.14678333333333,
            count: 6,
        },
        {
            start_date: "2023-03-27",
            end_date: "2023-04-01",
            energy_usage: 23.43948333333333,
            count: 6,
        },
        {
            start_date: "2023-03-28",
            end_date: "2023-04-02",
            energy_usage: 22.86803333333333,
            count: 6,
        },
        {
            start_date: "2023-03-29",
            end_date: "2023-04-03",
            energy_usage: 23.0167,
            count: 6,
        },
        {
            start_date: "2023-03-30",
            end_date: "2023-04-04",
            energy_usage: 23.092233333333336,
            count: 6,
        },
        {
            start_date: "2023-03-31",
            end_date: "2023-04-05",
            energy_usage: 23.180899999999998,
            count: 6,
        },
        {
            start_date: "2023-04-01",
            end_date: "2023-04-06",
            energy_usage: 22.74808333333333,
            count: 6,
        },
        {
            start_date: "2023-04-02",
            end_date: "2023-04-07",
            energy_usage: 23.425283333333336,
            count: 6,
        },
        {
            start_date: "2023-04-03",
            end_date: "2023-04-08",
            energy_usage: 23.29035,
            count: 6,
        },
        {
            start_date: "2023-04-04",
            end_date: "2023-04-09",
            energy_usage: 22.125466666666668,
            count: 6,
        },
        {
            start_date: "2023-04-05",
            end_date: "2023-04-10",
            energy_usage: 22.058116666666667,
            count: 6,
        },
        {
            start_date: "2023-04-06",
            end_date: "2023-04-11",
            energy_usage: 22.048,
            count: 6,
        },
        {
            start_date: "2023-04-07",
            end_date: "2023-04-12",
            energy_usage: 22.186333333333334,
            count: 6,
        },
        {
            start_date: "2023-04-08",
            end_date: "2023-04-13",
            energy_usage: 22.540399999999995,
            count: 6,
        },
        {
            start_date: "2023-04-09",
            end_date: "2023-04-14",
            energy_usage: 23.21313333333333,
            count: 6,
        },
        {
            start_date: "2023-04-10",
            end_date: "2023-04-15",
            energy_usage: 23.226733333333332,
            count: 6,
        },
        {
            start_date: "2023-04-11",
            end_date: "2023-04-16",
            energy_usage: 22.223583333333334,
            count: 6,
        },
        {
            start_date: "2023-04-12",
            end_date: "2023-04-17",
            energy_usage: 21.979083333333335,
            count: 6,
        },
        {
            start_date: "2023-04-13",
            end_date: "2023-04-18",
            energy_usage: 21.923816666666667,
            count: 6,
        },
        {
            start_date: "2023-04-14",
            end_date: "2023-04-19",
            energy_usage: 21.41365,
            count: 6,
        },
        {
            start_date: "2023-04-15",
            end_date: "2023-04-20",
            energy_usage: 21.1512,
            count: 6,
        },
        {
            start_date: "2023-04-16",
            end_date: "2023-04-21",
            energy_usage: 22.16316666666667,
            count: 6,
        },
        {
            start_date: "2023-04-17",
            end_date: "2023-04-22",
            energy_usage: 22.385883333333336,
            count: 6,
        },
        {
            start_date: "2023-04-18",
            end_date: "2023-04-23",
            energy_usage: 21.8704,
            count: 6,
        },
        {
            start_date: "2023-04-19",
            end_date: "2023-04-24",
            energy_usage: 22.16765,
            count: 6,
        },
        {
            start_date: "2023-04-20",
            end_date: "2023-04-25",
            energy_usage: 22.439416666666663,
            count: 6,
        },
        {
            start_date: "2023-04-21",
            end_date: "2023-04-26",
            energy_usage: 22.70245,
            count: 6,
        },
        {
            start_date: "2023-04-22",
            end_date: "2023-04-27",
            energy_usage: 22.883749999999996,
            count: 6,
        },
        {
            start_date: "2023-04-23",
            end_date: "2023-04-28",
            energy_usage: 23.636299999999995,
            count: 6,
        },
        {
            start_date: "2023-04-24",
            end_date: "2023-04-29",
            energy_usage: 23.449149999999992,
            count: 6,
        },
        {
            start_date: "2023-04-25",
            end_date: "2023-04-30",
            energy_usage: 22.531666666666666,
            count: 6,
        },
        {
            start_date: "2023-04-26",
            end_date: "2023-05-01",
            energy_usage: 22.33301666666667,
            count: 6,
        },
        {
            start_date: "2023-04-27",
            end_date: "2023-05-02",
            energy_usage: 22.407383333333332,
            count: 6,
        },
        {
            start_date: "2023-04-28",
            end_date: "2023-05-03",
            energy_usage: 22.02905,
            count: 6,
        },
        {
            start_date: "2023-04-29",
            end_date: "2023-05-04",
            energy_usage: 22.17685,
            count: 6,
        },
        {
            start_date: "2023-04-30",
            end_date: "2023-05-05",
            energy_usage: 23.10078333333333,
            count: 6,
        },
        {
            start_date: "2023-05-01",
            end_date: "2023-05-06",
            energy_usage: 23.110566666666667,
            count: 6,
        },
        {
            start_date: "2023-05-02",
            end_date: "2023-05-07",
            energy_usage: 22.69425,
            count: 6,
        },
        {
            start_date: "2023-05-03",
            end_date: "2023-05-08",
            energy_usage: 22.68478333333333,
            count: 6,
        },
        {
            start_date: "2023-05-04",
            end_date: "2023-05-09",
            energy_usage: 22.715616666666666,
            count: 6,
        },
        {
            start_date: "2023-05-05",
            end_date: "2023-05-10",
            energy_usage: 22.48958333333333,
            count: 6,
        },
        {
            start_date: "2023-05-06",
            end_date: "2023-05-11",
            energy_usage: 22.019000000000002,
            count: 6,
        },
        {
            start_date: "2023-05-07",
            end_date: "2023-05-12",
            energy_usage: 23.001566666666665,
            count: 6,
        },
        {
            start_date: "2023-05-08",
            end_date: "2023-05-13",
            energy_usage: 22.86108333333333,
            count: 6,
        },
        {
            start_date: "2023-05-09",
            end_date: "2023-05-14",
            energy_usage: 22.006766666666667,
            count: 6,
        },
        {
            start_date: "2023-05-10",
            end_date: "2023-05-15",
            energy_usage: 22.10931666666667,
            count: 6,
        },
        {
            start_date: "2023-05-11",
            end_date: "2023-05-16",
            energy_usage: 22.54925,
            count: 6,
        },
        {
            start_date: "2023-05-12",
            end_date: "2023-05-17",
            energy_usage: 22.918050000000004,
            count: 6,
        },
        {
            start_date: "2023-05-13",
            end_date: "2023-05-18",
            energy_usage: 22.374183333333335,
            count: 6,
        },
        {
            start_date: "2023-05-14",
            end_date: "2023-05-19",
            energy_usage: 23.091183333333333,
            count: 6,
        },
        {
            start_date: "2023-05-15",
            end_date: "2023-05-20",
            energy_usage: 23.022000000000002,
            count: 6,
        },
        {
            start_date: "2023-05-16",
            end_date: "2023-05-21",
            energy_usage: 22.559249999999995,
            count: 6,
        },
        {
            start_date: "2023-05-17",
            end_date: "2023-05-22",
            energy_usage: 22.153366666666667,
            count: 6,
        },
    ];

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
                        <div>Content</div>
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
                                <FillerPricingTierTile key={category} pricingTierName={category} />
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
