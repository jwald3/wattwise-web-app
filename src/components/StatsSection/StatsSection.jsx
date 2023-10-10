import React from 'react';
import './StatsSection.css';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { useSelector } from 'react-redux';


const StatsSection = () => {
    const energyUsage = useSelector(state => state.energyUsage.totalEnergyConsumption);

    const energyUsageValid = (energyUsage) => energyUsage !== null && energyUsage !== undefined && energyUsage !== 0;

    return (
        <div className="stats-container">
            <div className="stat-card">
                <div className="icon"><EnergySavingsLeafIcon /></div>
                <div className="value">{energyUsageValid(energyUsage) ? `${Math.round(energyUsage)} kWh` : "--"} </div>
                <div className="description">{energyUsageValid(energyUsage) ? "Great job! You've used energy efficiently." : "No energy information available."}</div>
            </div>
            <div className="stat-card">
                <div className="icon"><RecyclingIcon /></div>
                <div className="value">{energyUsageValid(energyUsage) ? `${Math.round(energyUsage * 0.92)} lbs` : "--"}</div>
                <div className="description">{energyUsageValid(energyUsage) ? "Amazing! You've reduced your carbon footprint." : "No consumption information available."}</div>
            </div>
            <div className="stat-card">
                <div className="icon"><AttachMoneyIcon /></div>
                <div className="value">{energyUsageValid(energyUsage) ? `$${(energyUsage * 0.23).toFixed(2)}` : "--"}</div>
                <div className="description">{energyUsageValid(energyUsage) ? "Well done! You're saving on energy costs." : "No cost information available"}</div>
            </div>
        </div>
    );
}

export default StatsSection;
