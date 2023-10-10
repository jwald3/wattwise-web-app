import { useState } from "react";
import PricingTierTile from "../PricingTierTile/PricingTierTile";
import FillerPricingTierTile from "../FillerPricingTierTile/FillerPricingTierTile";
import { useSelector } from "react-redux";
import "./PricingTierTray.css";

const PricingTierTray = ({ pricingTiers }) => {
	const [isEdit, setIsEdit] = useState(false);
	const { state, region } = useSelector((state) => state.dashboard);

    const pricingCategories = ["Peak", "Off-Peak", "Weekend", "Holiday"];

    return (
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
                    const matchingTier = pricingTiers.find(
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
    );
};

export default PricingTierTray;
