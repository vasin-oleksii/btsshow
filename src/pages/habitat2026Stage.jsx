import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faMapMarkerAlt,
	faImage,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";

import "./styles/habitatStage.css";
import "./styles/habitat2026Stage.css";

const Habitat2026Stage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Stage Habitat et Humanisme 2026 | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="Stage de développement web chez Habitat et Humanisme Pyrénées Adour à Pau - 2026"
				/>
				<meta
					name="keywords"
					content="Stage, Habitat et Humanisme, Développement Web, Pau, 2026"
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
							Stage de développement web | 2026
						</div>

						{/* Photo placeholder — bannière */}
						<div className="stage2026-photo-placeholder stage2026-banner-placeholder">
							<FontAwesomeIcon icon={faImage} />
							<span>Photo de présentation du stage</span>
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
								<h2>À propos de l&apos;association</h2>
								<div className="stage2026-section-with-photo">
									<p>
										Habitat et Humanisme Pyrénées Adour
										œuvre pour l&apos;accès au logement des
										personnes en situation précaire. Basée à
										Pau, l&apos;association accompagne les
										familles vers l&apos;autonomie
										résidentielle et l&apos;insertion
										sociale.
									</p>
									{/* Photo placeholder */}
									<div className="stage2026-photo-placeholder stage2026-inline-placeholder">
										<FontAwesomeIcon icon={faImage} />
										<span>Photo de l&apos;association</span>
									</div>
								</div>
							</div>

							<div className="habitat-section">
								<h2>Contexte du stage</h2>
								<p>
									Second stage effectué au sein de la même
									structure, ce retour en 2026 s&apos;inscrit
									dans la continuité des travaux engagés en
									2025, avec de nouvelles missions et
									responsabilités élargies.
								</p>
								{/* Photo placeholder */}
								<div className="stage2026-photo-placeholder">
									<FontAwesomeIcon icon={faImage} />
									<span>Photo du contexte / équipe</span>
								</div>
							</div>

							<div className="habitat-section">
								<h2>Missions principales</h2>
								<ul>
									<li>
										Développement et amélioration des
										fonctionnalités existantes
									</li>
									<li>
										Mise en place de nouvelles interfaces
										utilisateur
									</li>
									<li>
										Optimisation des performances de
										l&apos;application
									</li>
									<li>
										Participation aux réunions de projet et
										aux revues de code
									</li>
									<li>
										Documentation technique et utilisateur
									</li>
								</ul>
								{/* Photo placeholder */}
								<div className="stage2026-photo-placeholder">
									<FontAwesomeIcon icon={faImage} />
									<span>Photo des missions / écrans</span>
								</div>
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
										Expérience utilisateur et prototypage
									</li>
									<li>
										Gestion de projet et méthodologies
										agiles
									</li>
								</ul>
							</div>

							<div className="habitat-section">
								<h2>Technologies utilisées</h2>
								<div className="stage2026-section-with-photo">
									<ul>
										<li>
											React.js pour l&apos;interface
											utilisateur
										</li>
										<li>Node.js pour le backend</li>
										<li>
											PostgreSQL pour la base de données
										</li>
										<li>Git pour le versioning</li>
										<li>Figma pour le design</li>
									</ul>
									{/* Photo placeholder */}
									<div className="stage2026-photo-placeholder stage2026-inline-placeholder">
										<FontAwesomeIcon icon={faImage} />
										<span>
											Capture d&apos;écran / outils
										</span>
									</div>
								</div>
							</div>

							<div className="habitat-section">
								<h2>Réalisations</h2>
								<p>
									À compléter à l&apos;issue du stage avec
									les résultats concrets obtenus, les
									fonctionnalités livrées et les retours de
									l&apos;équipe.
								</p>
								{/* Photo placeholder */}
								<div className="stage2026-photo-placeholder">
									<FontAwesomeIcon icon={faImage} />
									<span>Photos des réalisations</span>
								</div>
								{/* Photo placeholder */}
								<div className="stage2026-photo-placeholder">
									<FontAwesomeIcon icon={faImage} />
									<span>Captures d&apos;écran du projet</span>
								</div>
							</div>

							<div className="habitat-section">
								<h2>Bilan</h2>
								<p>
									À compléter à l&apos;issue du stage avec
									les apprentissages, les difficultés
									rencontrées et les compétences acquises au
									cours de cette nouvelle expérience.
								</p>
								{/* Photo placeholder */}
								<div className="stage2026-photo-placeholder">
									<FontAwesomeIcon icon={faImage} />
									<span>Photo de bilan / soutenance</span>
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

export default Habitat2026Stage;
