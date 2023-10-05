import React, { useState } from 'react';
import Layout from '../../Layouts/Layout';

const PricingTierForm = () => {
  const [formData, setFormData] = useState({
    provider_id: "",  // Set default values as needed
    region_id: "",
    pricing_tier_name: "",
    rate: "",
    start_time: "",
    end_time: "",
    pricingTierDays: [],
    pricingTierSpecialDates: [],
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Layout>
      <div>Hi</div>
    </Layout>
  );
};

export default PricingTierForm;
