import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./styles/navBar.css";

const NavBar = (props) => {
	const { active } = props;
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	// Close menu when clicking outside or pressing Escape
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				isMobileMenuOpen &&
				!event.target.closest(".mobile-menu") &&
				!event.target.closest(".mobile-menu-button")
			) {
				setIsMobileMenuOpen(false);
			}
		};

		const handleEscapeKey = (event) => {
			if (event.key === "Escape" && isMobileMenuOpen) {
				setIsMobileMenuOpen(false);
			}
		};

		if (isMobileMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscapeKey);
			document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	return (
		<React.Fragment>
			<div className="nav-container">
				<nav className="navbar">
					<div className="nav-background">
						<ul className="nav-list">
							<li
								className={
									active === "home"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/">Accueil</Link>
							</li>
							<li
								className={
									active === "cv"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/cv">CV</Link>
							</li>
							<li
								className={
									active === "competences"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/competences">Compétences</Link>
							</li>
							<li
								className={
									active === "projects"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/projects">Projets</Link>
							</li>
							<li
								className={
									active === "stages"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/stages">Stages</Link>
							</li>
							<li
								className={
									active === "benevolat"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/benevolat">Bénévolat</Link>
							</li>
							<li
								className={
									active === "veille"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/veille">Veille</Link>
							</li>
							<li
								className={
									active === "contact"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/contact">Contact</Link>
							</li>
						</ul>
					</div>

					{/* Mobile menu button */}
					<button
						className="mobile-menu-button"
						onClick={toggleMobileMenu}
					>
						<FontAwesomeIcon
							icon={isMobileMenuOpen ? faTimes : faBars}
						/>
					</button>
				</nav>

				{/* Mobile menu */}
				{isMobileMenuOpen && (
					<div className="mobile-menu">
						<button
							className="mobile-menu-close"
							onClick={closeMobileMenu}
						>
							<FontAwesomeIcon icon={faTimes} />
						</button>
						<ul className="mobile-nav-list">
							<li
								className={
									active === "home"
										? "mobile-nav-item active"
										: "mobile-nav-item"
								}
							>
								<Link to="/" onClick={closeMobileMenu}>
									Accueil
								</Link>
							</li>
							<li
								className={
									active === "cv"
										? "mobile-nav-item active"
										: "mobile-nav-item"
								}
							>
								<Link to="/cv" onClick={closeMobileMenu}>
									CV
								</Link>
							</li>
							<li
								className={
									active === "competences"
										? "mobile-nav-item active"
										: "mobile-nav-item"
								}
							>
								<Link
									to="/competences"
									onClick={closeMobileMenu}
								>
									Compétences
								</Link>
							</li>
							<li
								className={
									active === "projects"
										? "mobile-nav-item active"
										: "mobile-nav-item"
								}
							>
								<Link to="/projects" onClick={closeMobileMenu}>
									Projets
								</Link>
							</li>
							<li
								className={
									active === "stages"
										? "mobile-nav-item active"
										: "mobile-nav-item"
								}
							>
								<Link to="/stages" onClick={closeMobileMenu}>
									Stages
								</Link>
							</li>
							<li
								className={
									active === "benevolat"
										? "mobile-nav-item active"
										: "mobile-nav-item"
								}
							>
								<Link to="/benevolat" onClick={closeMobileMenu}>
									Bénévolat
								</Link>
							</li>
							<li
								className={
									active === "veille"
										? "mobile-nav-item active"
										: "mobile-nav-item"
								}
							>
								<Link to="/veille" onClick={closeMobileMenu}>
									Veille
								</Link>
							</li>
							<li
								className={
									active === "contact"
										? "mobile-nav-item active"
										: "mobile-nav-item"
								}
							>
								<Link to="/contact" onClick={closeMobileMenu}>
									Contact
								</Link>
							</li>
						</ul>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default NavBar;
