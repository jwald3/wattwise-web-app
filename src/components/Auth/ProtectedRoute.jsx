import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        loginWithRedirect();
        return <div>Redirecting to login...</div>;
    }

    return children;
}

export default ProtectedRoute;
