import React from 'react';
import './Layout.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Header />
                <div className="layout-content">{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
