import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    const handleClick = () => {
        loginWithRedirect({
            appState: { targetUrl: window.location.pathname }
        });
    };

    return <button onClick={handleClick}>Login</button>;
}

export default LoginButton;
