import React from 'react';
import './Layout.css';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Footer from '../components/Footer/Footer';

function Layout({ children }) {
    return (
        <div className="layout-container">
            <Header />
                <div className="layout-content">{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
