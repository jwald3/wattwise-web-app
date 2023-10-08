import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";
import NewPricingTierForm from "./pages/NewPricingTierForm/NewPricingTierForm";
import AboutUs from "./pages/AboutUs/AboutUs";
import EditPricingTierForm from "./pages/EditPricingTierForm/EditPricingTierForm";
import { Auth0Provider } from "@auth0/auth0-react";

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
        element: <NewPricingTierForm />
    },
    // path for pricing tier by id and edit
    {
        path: "/pricing-tier/:id/edit",
        element: <EditPricingTierForm />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Auth0Provider
        domain="dev-pj7t2m2pdrnvypjq.us.auth0.com"
        clientId="qQhvR1xQBG17JGBcRU1aUyrMqAQs3Io3"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <RouterProvider router={router} />
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
