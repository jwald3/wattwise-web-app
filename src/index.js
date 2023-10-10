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
import AuthCallback from "./components/Auth/AuthCallback";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { store } from "./redux/store";
import { Provider } from "react-redux";


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
        element: (
            <ProtectedRoute>
                <CompanyDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/pricing-tier",
        element: (
            <ProtectedRoute>
                <NewPricingTierForm />
            </ProtectedRoute>
        )
    },
    {
        path: "/pricing-tier/:id/edit",
        element: (
            <ProtectedRoute>
                <EditPricingTierForm />
            </ProtectedRoute>
        )
    },
    {
        path: "/callback",
        element: <AuthCallback />,
    }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <Auth0Provider
        domain="dev-pj7t2m2pdrnvypjq.us.auth0.com"
        clientId="qQhvR1xQBG17JGBcRU1aUyrMqAQs3Io3"
        redirectUri={window.location.origin}
        useRefreshTokens={true}
        cacheLocation="localstorage"
    >
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </Auth0Provider>
);

reportWebVitals();
