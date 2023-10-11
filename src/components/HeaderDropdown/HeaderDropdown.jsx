import { useState } from "react";
import { Link } from "react-router-dom";

const HeaderDropdown = ({ isAuthenticated, loginWithRedirect, logout }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="dropdown">
			<button onClick={toggleDropdown}>Menu</button>
			{isOpen && (
				<div className="dropdown-content">
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
				</div>
			)}
		</div>
	);
};

export default HeaderDropdown;