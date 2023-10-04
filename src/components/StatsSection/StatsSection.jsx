import React from 'react';
import './StatsSection.css';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RecyclingIcon from '@mui/icons-material/Recycling';


const StatsSection = ({ energyUsage }) => {
    return (
        <div className="stats-container">
            <div className="stat-card">
                <div className="icon"><EnergySavingsLeafIcon /></div>
                <div className="value">{Math.round(energyUsage)} kWh</div>
                <div className="description">Great job! You've used energy efficiently.</div>
            </div>
            <div className="stat-card">
                <div className="icon"><RecyclingIcon /></div>
                <div className="value">{Math.round(energyUsage * 0.92)} lbs</div>
                <div className="description">Amazing! You've reduced your carbon footprint.</div>
            </div>
            <div className="stat-card">
                <div className="icon"><AttachMoneyIcon /></div>
                <div className="value">${(energyUsage * 0.23).toFixed(2)}</div>
                <div className="description">Well done! You're saving on energy costs.</div>
            </div>
        </div>
    );
}

export default StatsSection;
