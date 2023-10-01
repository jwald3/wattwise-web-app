import "./App.css";
import { useEffect, useState } from "react";
import { fetchProviderByID } from "./api/Api";

const App = () => {
    const [provider, setProvider] = useState([]);

    useEffect(() => {
        const getProvider = async () => {
            const providerFromServer = await fetchProviderByID(1);
            setProvider(providerFromServer);
        };

        getProvider();
    }, []);

    return (
        <div style={{display: "flex", backgroundColor: "#fbfbfd"}}>
            <header>
                <p>{provider.provider_name}</p>
            </header>
        </div>
    );
};

export default App;
