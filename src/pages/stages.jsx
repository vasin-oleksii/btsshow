import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/stages.css";

const Stages = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "stages");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Stages | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="stages" />
				<div className="content-wrapper">
					<div className="stages-logo-container">
						<div className="stages-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="stages-container">
						<div className="title stages-title">Mes Stages</div>

						<div className="stages-content">
							<div className="stages-section">
								<h2>Habitat et Humanisme</h2>
								<div className="stage-details">
									<h3>Domaine</h3>
									<p>Développement web</p>

									<h3>Objectifs</h3>
									<p>
										Contribuer à la refonte ou au
										développement de leur plateforme
										numérique
									</p>

									<h3>Compétences mobilisées</h3>
									<ul>
										<li>Intégration</li>
										<li>Accessibilité</li>
										<li>Développement front/back</li>
										<li>Gestion de contenus</li>
									</ul>
								</div>
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

export default Stages;
