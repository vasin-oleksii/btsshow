import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

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
						<div className="title stages-title">
							Mes Stages
							<a
								href="/Presentation Stage.pdf"
								className="stages-pdf-button"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon icon={faFilePdf} /> Télécharger Présentation
							</a>
						</div>

						<div className="stages-content">
							<div className="stages-section">
								<h2>Habitat et Humanisme Pyrénées Adour | 2025</h2>
								<div className="stage-details">
									<h3>À propos de l'association</h3>
									<p>
										Habitat et Humanisme est une association qui œuvre pour l'accès au logement des personnes en difficulté. 
										Elle développe des projets d'habitat social et accompagne les familles vers l'autonomie résidentielle 
										et l'insertion sociale dans la région des Pyrénées-Adour.
									</p>

									<h3>Domaine</h3>
									<p>Développement web et numérique</p>

									<h3>Objectifs</h3>
									<p>
										Contribuer à la refonte ou au développement de leur plateforme numérique pour améliorer 
										la gestion des logements et l'accompagnement des familles.
									</p>

									<h3>Compétences mobilisées</h3>
									<ul>
										<li>Intégration web</li>
										<li>Accessibilité numérique</li>
										<li>Développement front/back</li>
										<li>Gestion de contenus</li>
										<li>Interface utilisateur</li>
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
