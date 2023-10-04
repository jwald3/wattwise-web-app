import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";
import PricingTierForm from "./pages/PricingTierForm/PricingTierForm";
import AboutUs from "./pages/AboutUs/AboutUs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/about-us",
        element: <AboutUs />,
    },
    {
        path: "/privacy",
        element: <PrivacyPolicyPage />,
    },
    {
        path: "/dashboard",
        element: <CompanyDashboard />,
    },
    {
        path: "/pricing-tier",
        element: <PricingTierForm />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
