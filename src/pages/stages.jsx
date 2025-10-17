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
						<div className="title stages-title">Mes Stages</div>

						<div className="stages-content">
							<div className="stages-section">
								<h2>
									Habitat et Humanisme Pyrénées Adour | 2025
								</h2>
								<div className="stage-details">
									<h3>À propos de l'association</h3>
									<p>
										Habitat et Humanisme est une association
										qui œuvre pour l'accès au logement des
										personnes en difficulté. Elle développe
										des projets d'habitat social et
										accompagne les familles vers l'autonomie
										résidentielle et l'insertion sociale
										dans la région des Pyrénées-Adour.
									</p>

									<h3>Domaine d'activité</h3>
									<p>
										Développement web et transformation
										numérique
									</p>

									<h3>Objectifs du stage</h3>
									<p>
										Contribuer à la refonte et au
										développement de leur plateforme
										numérique pour améliorer la gestion des
										logements sociaux et l'accompagnement
										des familles. Développer des outils de
										suivi et de communication pour optimiser
										les processus internes.
									</p>

									<h3>Compétences mobilisées</h3>
									<ul>
										<li>
											Développement front-end (React,
											HTML5, CSS3)
										</li>
										<li>
											Intégration et accessibilité web
										</li>
										<li>
											Développement back-end (Node.js,
											bases de données)
										</li>
										<li>Gestion de contenus et CMS</li>
										<li>
											Interface utilisateur et expérience
											utilisateur
										</li>
										<li>
											Gestion de projet et méthodologies
											agiles
										</li>
									</ul>

									<h3>Technologies utilisées</h3>
									<ul>
										<li>
											React.js pour l'interface
											utilisateur
										</li>
										<li>Node.js pour le backend</li>
										<li>
											MongoDB/PostgreSQL pour la base de
											données
										</li>
										<li>Git pour le versioning</li>
										<li>Figma pour le design</li>
									</ul>

									<h3>Résultats attendus</h3>
									<p>
										Amélioration significative de
										l'efficacité des processus de gestion
										des logements, meilleure communication
										avec les bénéficiaires, et modernisation
										de l'outil numérique de l'association
										pour servir au mieux sa mission sociale.
									</p>
								</div>
							</div>
						</div>

						<div className="stages-pdf-viewer">
							<iframe
								src="/Presentation Stage.pdf#toolbar=0&navpanes=0&scrollbar=0"
								width="100%"
								height="800px"
								title="Présentation Stage"
								className="stages-pdf-iframe"
							></iframe>
							<div className="stages-pdf-fallback">
								<object
									data="/Presentation Stage.pdf"
									type="application/pdf"
									width="100%"
									height="800px"
									className="stages-pdf-object"
								>
									<p>
										Votre navigateur ne supporte pas
										l'affichage des PDF.
										<a
											href="/Presentation Stage.pdf"
											target="_blank"
											rel="noopener noreferrer"
										>
											Télécharger le PDF
										</a>
									</p>
								</object>
							</div>
						</div>

						<div className="stages-mobile-message">
							<div className="mobile-pdf-info">
								<h3>📱 Version mobile</h3>
								<p>
									Pour une meilleure expérience de lecture sur
									mobile et tablette, téléchargez la
									présentation PDF directement.
								</p>
								<a
									href="/Presentation Stage.pdf"
									className="mobile-download-button"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faFilePdf} />{" "}
									Télécharger la Présentation
								</a>
							</div>
						</div>

						<div className="stages-pdf-download">
							<a
								href="/Presentation Stage.pdf"
								className="stages-pdf-button"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon icon={faFilePdf} /> Télécharger
								Présentation
							</a>
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
