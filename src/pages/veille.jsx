import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/veille.css";

const Veille = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "veille");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Veille Technologique | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="veille" />
				<div className="content-wrapper">
					<div className="veille-logo-container">
						<div className="veille-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="veille-container">
						<div className="title veille-title">
							Veille Technologique
						</div>

						<div className="veille-content">
							<div className="veille-section">
								<h2>Sujet</h2>
								<p>
									React.js et l'écosystème front-end moderne
								</p>
							</div>

							<div className="veille-section">
								<h2>Objectifs</h2>
								<ul>
									<li>
										Suivre les tendances et évolutions de
										React.js
									</li>
									<li>
										Analyser les bonnes pratiques de
										développement
									</li>
									<li>
										Étudier les nouvelles fonctionnalités
										(React 18, Server Components)
									</li>
									<li>
										Évaluer les aspects de sécurité et
										performance
									</li>
								</ul>
							</div>

							<div className="veille-section">
								<h2>Outils utilisés</h2>
								<ul>
									<li>
										Google Alerts : "React.js news", "React
										roadmap 2024"
									</li>
									<li>GitHub Notifications</li>
									<li>Feedly (flux RSS)</li>
									<li>
										Réseaux sociaux : Twitter, LinkedIn (Dan
										Abramov, Kent C. Dodds)
									</li>
									<li>
										Newsletters : React Status, JS Weekly,
										Frontend Focus
									</li>
								</ul>
							</div>

							<div className="veille-section">
								<h2>Analyse</h2>
								<p>
									React.js, soutenu par Meta, est largement
									adopté par des entreprises comme Netflix et
									Airbnb. Sa modularité et sa compatibilité
									avec React Native et Next.js en font un
									outil stratégique pour le développement web
									moderne.
								</p>
							</div>
						</div>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Veille;
