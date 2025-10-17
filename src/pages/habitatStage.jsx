import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faMapMarkerAlt,
	faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";

import "./styles/habitatStage.css";

const HabitatStage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Stage Habitat et Humanisme | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="Stage de développement web chez Habitat et Humanisme Pyrénées Adour à Pau"
				/>
				<meta
					name="keywords"
					content="Stage, Habitat et Humanisme, Développement Web, Pau"
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="stages" />
				<div className="content-wrapper">
					<div className="habitat-logo-container">
						<div className="habitat-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="habitat-container">
						<Link to="/stages" className="back-link">
							<FontAwesomeIcon icon={faArrowLeft} /> Retour aux
							stages
						</Link>

						<div className="title habitat-title">
							Habitat et Humanisme Pyrénées Adour
						</div>

						<div className="subtitle habitat-subtitle">
							Stage de développement web et transformation
							numérique | 2025
						</div>

						<div className="habitat-map-section">
							<h2>
								<FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
								Localisation
							</h2>
							<div className="map-info">
								<p>
									<strong>Adresse :</strong> Pau,
									Pyrénées-Atlantiques, France
								</p>
							</div>
							<div className="habitat-map-container">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.7064130672966!2d-0.37553452365988094!3d43.29946957523699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5648ce0b963c8f%3A0x10cb54c3c3a976a3!2sHabitat%20et%20Humanisme%20Pyr%C3%A9n%C3%A9es%20Adour!5e0!3m2!1sen!2sfr!4v1760694113250!5m2!1sen!2sfr"
									width="100%"
									height="450"
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="Localisation Habitat et Humanisme Pyrénées Adour"
								></iframe>
							</div>
						</div>

						<div className="habitat-content">
							<div className="habitat-section">
								<h2>À propos de l'association</h2>
								<p>
									Habitat et Humanisme est une association qui
									œuvre pour l'accès au logement des personnes
									en difficulté. Elle développe des projets
									d'habitat social et accompagne les familles
									vers l'autonomie résidentielle et
									l'insertion sociale dans la région des
									Pyrénées-Adour.
								</p>
							</div>

							<div className="habitat-section">
								<h2>Domaine d'activité</h2>
								<p>
									Développement web et transformation
									numérique
								</p>
							</div>

							<div className="habitat-section">
								<h2>Objectifs du stage</h2>
								<p>
									Contribuer à la refonte et au développement
									de leur plateforme numérique pour améliorer
									la gestion des logements sociaux et
									l'accompagnement des familles. Développer
									des outils de suivi et de communication pour
									optimiser les processus internes.
								</p>
							</div>

							<div className="habitat-section">
								<h2>Compétences mobilisées</h2>
								<ul>
									<li>
										Développement front-end (React, HTML5,
										CSS3)
									</li>
									<li>Intégration et accessibilité web</li>
									<li>
										Développement back-end (Node.js, bases
										de données)
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
							</div>

							<div className="habitat-section">
								<h2>Technologies utilisées</h2>
								<ul>
									<li>
										React.js pour l'interface utilisateur
									</li>
									<li>Node.js pour le backend</li>
									<li>
										MongoDB/PostgreSQL pour la base de
										données
									</li>
									<li>Git pour le versioning</li>
									<li>Figma pour le design</li>
								</ul>
							</div>

							<div className="habitat-section">
								<h2>Résultats attendus</h2>
								<p>
									Amélioration significative de l'efficacité
									des processus de gestion des logements,
									meilleure communication avec les
									bénéficiaires, et modernisation de l'outil
									numérique de l'association pour servir au
									mieux sa mission sociale.
								</p>
							</div>
						</div>

						<div className="habitat-pdf-viewer">
							<iframe
								src="/Presentation Stage.pdf#toolbar=0&navpanes=0&scrollbar=0"
								width="100%"
								height="800px"
								title="Présentation Stage"
								className="habitat-pdf-iframe"
							></iframe>
							<div className="habitat-pdf-fallback">
								<object
									data="/Presentation Stage.pdf"
									type="application/pdf"
									width="100%"
									height="800px"
									className="habitat-pdf-object"
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

						<div className="habitat-mobile-message">
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

						<div className="habitat-pdf-download">
							<a
								href="/Presentation Stage.pdf"
								className="habitat-pdf-button"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon icon={faFilePdf} /> Télécharger
								la Présentation
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

export default HabitatStage;
