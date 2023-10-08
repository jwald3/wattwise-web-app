import React from 'react';

const NoData = () => {
    return (
        <div style={{ padding: '20px', alignItems: "center", justifyContent: "center", border: '1px solid #ccc', borderRadius: '8px', display: "flex", flex: 1, flexDirection: "column" }}>
            <h2>No Data Available</h2>
            <p>Please select a household to view data.</p>
        </div>
    );
};

export default NoData;
