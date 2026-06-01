import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faUpRightFromSquare,
	faShareNodes,
	faDatabase,
	faKeyboard,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import { Figure, Lightbox, useLightbox } from "../components/projects/projectMedia";

import INFO from "../data/user";

import "./styles/billetterieFa.css";

const DEMO_URL = "https://p.vasin.fr/";

const IMG = "/projects/partage";

const TECHS = ["React", "MongoDB", "API REST", "Vercel"];

const Partage = () => {
	const { lightbox, openLightbox, closeLightbox } = useLightbox();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Partage | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="Petite application web pour partager rapidement du texte et des liens. Développée en React avec une base de données MongoDB."
				/>
				<meta
					name="keywords"
					content="React, MongoDB, API REST, partage, texte, liens, Vercel"
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="projects" />
				<div className="content-wrapper">
					<div className="bf-logo-container">
						<div className="bf-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="bf-container">
						<Link to="/projects" className="back-link">
							<FontAwesomeIcon icon={faArrowLeft} /> Retour aux
							projets
						</Link>

						<div className="title bf-title">Partage</div>

						<div className="subtitle bf-subtitle">
							{
								"Application web pour partager rapidement du texte et des liens — React + MongoDB"
							}
						</div>

						<div className="bf-techs">
							{TECHS.map((tech) => (
								<span className="bf-tech" key={tech}>
									{tech}
								</span>
							))}
						</div>

						<div className="bf-actions">
							<a
								className="bf-btn bf-btn-primary"
								href={DEMO_URL}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon icon={faUpRightFromSquare} />{" "}
								Voir la démo
							</a>
						</div>

						<Figure
							src={`${IMG}/accueil.png`}
							alt="Page d'accueil de l'application Partage"
							caption="L'application Partage"
							onOpen={openLightbox}
						/>

						<div className="bf-content">
							{/* Présentation */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faShareNodes} />{" "}
									Présentation
								</h2>
								<p>
									{
										"Partage est une petite application web minimaliste pour partager rapidement du texte ou des liens. On écrit son message, on clique sur « Submit », et il est enregistré puis affiché."
									}
								</p>
								<p>
									{
										"L'idée est d'avoir un endroit simple pour coller un lien ou une note et le retrouver facilement, par exemple pour le travail en équipe."
									}
								</p>
							</section>

							{/* Fonctionnement */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faKeyboard} /> Comment
									ça marche
								</h2>
								<ul>
									<li>
										{
											"On écrit dans la zone de texte ce qu'on veut partager."
										}
									</li>
									<li>
										{
											"Le bouton « Submit » enregistre le message, « Clear » l'efface."
										}
									</li>
									<li>
										{
											"Le contenu partagé s'affiche en dessous sous forme de carte colorée."
										}
									</li>
								</ul>
								<Figure
									src={`${IMG}/contenu.png`}
									alt="Saisie d'un message et aperçu du contenu partagé"
									caption="Saisie d'un message et aperçu du partage"
									onOpen={openLightbox}
								/>
							</section>

							{/* Données */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faDatabase} /> Le
									stockage des données
								</h2>
								<p>
									{
										"Les messages partagés sont enregistrés dans une base de données MongoDB, à travers une petite API. Ainsi, le contenu reste disponible même après avoir rechargé la page."
									}
								</p>
							</section>

							{/* Technologies */}
							<section className="bf-section">
								<h2>Technologies utilisées</h2>
								<ul>
									<li>
										{
											"React pour l'interface (composants, état, aperçu en direct)."
										}
									</li>
									<li>
										{
											"MongoDB pour stocker les messages partagés."
										}
									</li>
									<li>
										{
											"Une API pour relier l'interface à la base de données."
										}
									</li>
									<li>{"Déploiement en ligne (Vercel)."}</li>
								</ul>
							</section>
						</div>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>

			<Lightbox lightbox={lightbox} onClose={closeLightbox} />
		</React.Fragment>
	);
};

export default Partage;
