import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/cv.css";

const CV = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "cv");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`CV | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="cv" />
				<div className="content-wrapper">
					<div className="cv-logo-container">
						<div className="cv-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="cv-container">
						<div className="cv-about-section">
							<div className="cv-about-main">
								<div className="cv-about-left">
									<div className="title cv-title">
										{INFO.about.title}
									</div>

									<div className="subtitle cv-subtitle">
										{INFO.about.description}
									</div>

									<div className="cv-socials">
										<Socials />
									</div>
								</div>

								<div className="cv-about-right">
									<div className="cv-image-container">
										<div className="cv-image-wrapper">
											<img
												src="about.png"
												alt="about"
												className="cv-image"
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="cv-socials-mobile">
								<Socials />
							</div>
						</div>

						<div className="cv-content">
							<div className="cv-section">
								<h2>Informations personnelles</h2>
								<p>Nom : Vasin Oleksii</p>
								<p>Téléphone : +33 7 83 57 02 35</p>
								<p>Email : vasin.oleksii@gmail.com</p>
								<p>Adresse : Pau, France</p>
								<p>
									Langues : Français (C1), Anglais (B2),
									Ukrainien (C2), Russe (C2)
								</p>
							</div>

							<div className="cv-section">
								<h2>Formation</h2>
								<p>
									2024–2026 : BTS SIO – SLAM, Lycée Saint-John
									Perse, Pau
								</p>
								<p>
									2023–2024 : STI2D SIN, Lycée Antoine
									Bourdelle, Montauban
								</p>
							</div>

							<div className="cv-section">
								<h2>Expériences professionnelles</h2>
								<p>
									<strong>
										Depuis Octobre 2024 : Ingénieur Logiciel
										Junior chez Miratech
									</strong>
									<br />→ Développement fullstack (React,
									Next.js, Ruby on Rails)
									<br />→ Collaboration en équipe
									internationale
									<br />→ Maintenance et évolution
									d'applications web
								</p>
								<p>
									<strong>
										Avril – Juin 2024 : Développeur Frontend
										Junior chez DigitalMindUA
									</strong>
									<br />→ Développement avec React Native
									<br />→ Intégration de systèmes de paiement
									et API externes
									<br />→ Développement d'applications mobiles
									cross-platform
								</p>
								<p>
									<strong>
										2025 : Stagiaire Développement Web chez
										Habitat et Humanisme Pyrénées Adour
									</strong>
									<br />→ Refonte de plateforme numérique pour
									la gestion de logements sociaux
									<br />→ Développement d'outils de suivi et
									de communication
									<br />→ Amélioration des processus internes
									de l'association
								</p>
							</div>

							<div className="cv-section">
								<h2>Compétences techniques</h2>
								<p>
									<strong>Frontend :</strong> HTML5, CSS3,
									JavaScript ES6+, TypeScript, React, Redux,
									Next.js, Tailwind CSS
								</p>
								<p>
									<strong>Backend :</strong> Node.js, Ruby on
									Rails, Express.js, API REST
								</p>
								<p>
									<strong>Bases de données :</strong> MongoDB,
									PostgreSQL, MySQL
								</p>
								<p>
									<strong>Outils :</strong> Git, Docker,
									Firebase, Jest, Figma, Webpack
								</p>
								<p>
									<strong>Mobile :</strong> React Native,
									développement cross-platform
								</p>
							</div>

							<div className="cv-section">
								<h2>Projets significatifs</h2>
								<p>
									<strong>Shop.co :</strong> Site e-commerce
									moderne en React + TypeScript + Vite avec
									Redux Toolkit
								</p>
								<p>
									<strong>PokemonQuize :</strong> Application
									de quiz Pokémon en JavaScript vanilla
									déployée sur Vercel
								</p>
								<p>
									<strong>DuneWave - Locaboard :</strong>{" "}
									Plateforme de gestion de logements (projet
									d'école)
								</p>
								<p>
									<strong>Partage :</strong> Service
									minimaliste de partage de texte et liens en
									React + Vite
								</p>
							</div>

							<div className="cv-section">
								<h2>Soft Skills</h2>
								<p>
									Travail en équipe, communication efficace,
									résolution de problèmes, adaptabilité,
									esprit critique, gestion du temps,
									apprentissage continu
								</p>
							</div>
						</div>

						<div className="cv-pdf-viewer">
							<iframe
								src="/CV-Vasin Oleksii.pdf#toolbar=0&navpanes=0&scrollbar=0"
								width="100%"
								height="600px"
								title="CV Vasin Oleksii"
								className="cv-pdf-iframe"
							></iframe>
						</div>

						<div className="cv-pdf-download">
							<a
								href="/CV-Vasin Oleksii.pdf"
								className="cv-pdf-button"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon icon={faFilePdf} /> Télécharger
								PDF
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

export default CV;
