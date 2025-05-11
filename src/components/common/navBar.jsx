import React from "react";
import { Link } from "react-router-dom";

import "./styles/navBar.css";

const NavBar = (props) => {
	const { active } = props;

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
									active === "about"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/about">À propos</Link>
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
									active === "veille"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/veille">Veille</Link>
							</li>
							<li
								className={
									active === "articles"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/articles">Articles</Link>
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
				</nav>
			</div>
		</React.Fragment>
	);
};

export default NavBar;
