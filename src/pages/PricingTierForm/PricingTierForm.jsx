import React, { useState } from 'react';
import Layout from '../../Layouts/Layout'
import './PricingTierForm.css';

const PricingTierForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rate, setRate] = useState('');
  const [days, setDays] = useState('');
  const [dates, setDates] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({
      startTime,
      endTime,
      rate,
      days,
      dates,
    });
  };

  return (
	<Layout>
		<div className='page-body'>
			<div className='form-container'>
				<div className="form-header">Pricing Tier</div>
				<div className="form-body">
					{/* The input field and label for start time */}
					<div className="input-group">
						<label htmlFor="startTime">Start Time</label>
						<input
							type="text"
							name="startTime"
							id="startTime"
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
						/>
					</div>
					{/* The input field and label for end time */}
					<div className="input-group">
						<label htmlFor="endTime">End Time</label>
						<input
							type="text"
							name="endTime"
							id="endTime"
							value={endTime}
							onChange={(e) => setEndTime(e.target.value)}
						/>
					</div>
					{/* The input field and label for rate */}
					<div className="input-group">
						<label htmlFor="rate">Rate</label>
						<input
							type="text"
							name="rate"
							id="rate"
							value={rate}
							onChange={(e) => setRate(e.target.value)}
						/>
					</div>
					{/* The input field and label for days */}
					<div className="input-group">
						<label htmlFor="days">Days</label>
						<input
							type="text"
							name="days"
							id="days"
							value={days}
							onChange={(e) => setDays(e.target.value)}
						/>
					</div>
					{/* The input field and label for dates */}
					<div className="input-group">
						<label htmlFor="dates">Dates</label>
						<input
							type="text"
							name="dates"
							id="dates"
							value={dates}
							onChange={(e) => setDates(e.target.value)}
						/>
					</div>
				</div>
				<div className="button-container">
					<button className="submit-button" onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</div>
		</div>
	</Layout>
  );
};

export default PricingTierForm;
