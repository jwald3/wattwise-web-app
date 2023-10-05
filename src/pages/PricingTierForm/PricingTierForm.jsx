import React, { useState } from 'react';
import Layout from '../../Layouts/Layout';
import './PricingTierForm.css';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const PricingTierForm = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rate, setRate] = useState('');
  const [days, setDays] = useState('');
  const [dates, setDates] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ startTime, endTime, rate, days, dates });
  };

  return (
    <Layout>
      <div className='form-container'>
        <h2 className="form-header">Pricing Tier</h2>
        <form onSubmit={handleSubmit} className="form-body">
          <div className="input-group">
		  <LocalizationProvider dateAdapter={AdapterDayjs}>
				<TimePicker label="Start Time" />
			</LocalizationProvider>
          </div>
          <div className="input-group">
		  <LocalizationProvider dateAdapter={AdapterDayjs}>
				<TimePicker label="End Time" />
			</LocalizationProvider>
          </div>
          <div className="input-group">
            <label htmlFor="rate">Rate</label>
            <input type="text" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="days">Days</label>
            <input type="text" id="days" value={days} onChange={(e) => setDays(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="dates">Dates</label>
            <input type="text" id="dates" value={dates} onChange={(e) => setDates(e.target.value)} />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default PricingTierForm;
