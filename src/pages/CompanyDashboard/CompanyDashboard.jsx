import React from "react";
import "./CompanyDashboard.css";
import UsageChart from "../../components/UsageChart/UsageChart";
import PeriodNavigator from "../../components/PeriodNavigator/PeriodNavigator";
import StatsSection from "../../components/StatsSection/StatsSection";
import Layout from "../../Layouts/Layout";
import NoData from "../../components/NoData/NoData";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import PricingTierTray from "../../components/PricingTierTray/PricingTierTray";
import QueryFilterTray from "../../components/QueryFilterTray/QueryFilterTray";

const CompanyDashboard = () => {
	const { household } = useSelector((state) => state.dashboard);
	
	const { isAuthenticated } = useAuth0();

	return (
		isAuthenticated ? (
			<Layout>
				<div className="mainPage">
					<div className="chartMenu flex2">
						<QueryFilterTray />
						<div className="content-container">
							{household ? (
								<>
									<UsageChart />
									<div style={{ display: "flex", alignItems: "center" }}>
										<PeriodNavigator />
									</div>
									<StatsSection /></>) : <NoData />}
						</div>
					</div>
					<PricingTierTray />
				</div>
			</Layout>
		) : null
	);
};

export default CompanyDashboard;
