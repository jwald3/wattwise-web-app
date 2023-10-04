import React from 'react';
import './StatsSection.css';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RecyclingIcon from '@mui/icons-material/Recycling';


const StatsSection = () => {
    return (
        <div className="stats-container">
            <div className="stat-card">
                <div className="icon"><EnergySavingsLeafIcon /></div>
                <div className="value">19.1 kWh</div>
                <div className="description">Great job! You've used energy efficiently.</div>
            </div>
            <div className="stat-card">
                <div className="icon"><RecyclingIcon /></div>
                <div className="value">17.5 lbs</div>
                <div className="description">Amazing! You've reduced your carbon footprint.</div>
            </div>
            <div className="stat-card">
                <div className="icon"><AttachMoneyIcon /></div>
                <div className="value">$4.39</div>
                <div className="description">Well done! You're saving on energy costs.</div>
            </div>
        </div>
    );
}

export default StatsSection;
