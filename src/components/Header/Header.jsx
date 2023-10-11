import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
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
					<Hidden smDown>
							{isAuthenticated ? (
								<>
									<Link to="/dashboard">Dashboard</Link>
									<Link to="/privacy">Privacy</Link>
									<Link to="/about-us">About</Link>
									<Link to="https://twitter.com/WattwiseApp">Contact Us</Link>
									<div onClick={() => logout({ returnTo: window.location.origin })} style={{ cursor: "pointer" }}>
										Logout
									</div>
								</>
							) : (
								<div onClick={loginWithRedirect} style={{ cursor: "pointer" }}>
									Login
								</div>
							)}
                    </Hidden>
					<Hidden smUp>
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
                                <MenuItem onClick={handleClose}><Link to="/dashboard" style={{ textDecoration: "none", color: "#000"}}>Dashboard</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="/privacy" style={{ textDecoration: "none", color: "#000"}}>Privacy</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="/about-us" style={{ textDecoration: "none", color: "#000"}}>About</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="https://twitter.com/WattwiseApp" style={{ textDecoration: "none", color: "#000"}}>Contact Us</Link></MenuItem>
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
					</Hidden>
                </div>
            </div>
        </div>
    );
};

export default Header;
