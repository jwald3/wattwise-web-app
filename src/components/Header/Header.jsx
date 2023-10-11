import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './Header.css';

const Header = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="header-container">
            <div className="main-header">
                <div className="main-header-left">
				<div className="header-logo">
					<Link to="/">
						<img
							src={process.env.PUBLIC_URL + "/headerLogo.png"}
							alt="logo"
							className="header-logo-img"
						/>
					</Link>
				</div>
                </div>
                <div className="main-header-right">
                    <Button onClick={handleClick} style={{ fontSize: 22}}>
                        ...
                    </Button>
                    <Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleClose}
					PaperProps={{
						style: {
							maxHeight: '200px',
							width: '20ch',
							backgroundColor: '#F5F5F5',
						},
					}}
                    >
                        {isAuthenticated ? (
                            <>
                                <MenuItem onClick={handleClose}><Link to="/dashboard">Dashboard</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="/privacy">Privacy</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="/about-us">About</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="https://twitter.com/WattwiseApp">Contact Us</Link></MenuItem>
                                <MenuItem onClick={() => {
                                    logout({ returnTo: window.location.origin });
                                    handleClose();
                                }}>
                                    Logout
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={() => {
                                loginWithRedirect();
                                handleClose();
                            }}>
                                Login
                            </MenuItem>
                        )}
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Header;
