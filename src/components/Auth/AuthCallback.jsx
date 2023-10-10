import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthCallback() {
    const { isAuthenticated, handleRedirectCallback } = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        async function handleAuth() {
            if (isAuthenticated) {
                // Get the targetUrl from the appState if available
                const targetUrl = location.state?.appState?.targetUrl || '/dashboard';
                navigate(targetUrl);
                return;
            }
    
            if (location.pathname === '/callback') {
                try {
                    const appState = await handleRedirectCallback();
                    const targetUrl = appState?.targetUrl || '/dashboard';
                    navigate(targetUrl);
                } catch (error) {
                    console.error("Error during authentication:", error);
                }
            }
        }
    
        handleAuth();
    }, [isAuthenticated, handleRedirectCallback, navigate, location]);

    return <div>Loading...</div>;
}

export default AuthCallback;
