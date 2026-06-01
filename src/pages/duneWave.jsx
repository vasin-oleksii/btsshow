import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faUpRightFromSquare,
	faStore,
	faWater,
	faUser,
	faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import { Figure, Lightbox, useLightbox } from "../components/projects/projectMedia";

import INFO from "../data/user";

import "./styles/billetterieFa.css";

const DEMO_URL = "https://dune-wave.vercel.app/";

const IMG = "/projects/dune-wave";

const TECHS = ["HTML", "CSS", "JavaScript", "Vercel"];

const DuneWave = () => {
	const { lightbox, openLightbox, closeLightbox } = useLightbox();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Dune Wave | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="Boutique en ligne de matériel de surf et de glisse, réalisée en projet d'école avec HTML, CSS et JavaScript."
				/>
				<meta
					name="keywords"
					content="HTML, CSS, JavaScript, boutique, surf, projet d'école, Vercel"
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

						<div className="title bf-title">Dune Wave</div>

						<div className="subtitle bf-subtitle">
							{
								"Boutique en ligne de matériel de surf et de glisse — projet d'école (HTML / CSS / JavaScript)"
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
							alt="Page d'accueil du site Dune Wave"
							caption="Page d'accueil du site"
							onOpen={openLightbox}
						/>

						<div className="bf-content">
							{/* Présentation */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faStore} />{" "}
									Présentation
								</h2>
								<p>
									{
										"Dune Wave est un site de boutique en ligne sur le thème du surf. C'est un projet réalisé en équipe pendant ma formation, où j'étais chef de projet."
									}
								</p>
								<p>
									{
										"Le site présente du matériel de surf et de glisse : planches, bodyboards, combinaisons et pagaies. Le visiteur peut parcourir le catalogue, chercher un produit et créer un compte."
									}
								</p>
							</section>

							{/* Catalogue */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faLayerGroup} /> Le
									catalogue de produits
								</h2>
								<p>
									{
										"La page Produits affiche tous les articles avec une image et un bouton « Voir Détails ». On peut aussi filtrer les produits par rayon ou par marque, et utiliser la barre de recherche en haut de page."
									}
								</p>
								<Figure
									src={`${IMG}/produits.png`}
									alt="Page catalogue des produits de Dune Wave"
									caption="Catalogue : tous nos produits"
									onOpen={openLightbox}
								/>
							</section>

							{/* Marque / histoire */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faWater} /> La marque
									et son histoire
								</h2>
								<p>
									{
										"Une page présente l'univers de la marque : son histoire (un loueur de matériel de surf dans les Landes et le Pays Basque), ses valeurs et son équipe."
									}
								</p>
								<Figure
									src={`${IMG}/locaboard.png`}
									alt="Page de présentation de la marque Dune Wave"
									caption="Notre histoire et nos valeurs"
									onOpen={openLightbox}
								/>
							</section>

							{/* Compte */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faUser} /> Compte
									utilisateur
								</h2>
								<p>
									{
										"Le site propose des pages de connexion et d'inscription, avec des formulaires simples (e-mail et mot de passe)."
									}
								</p>
								<Figure
									src={`${IMG}/login.png`}
									alt="Page de connexion du site Dune Wave"
									caption="Page de connexion"
									onOpen={openLightbox}
								/>
							</section>

							{/* Technologies */}
							<section className="bf-section">
								<h2>Technologies utilisées</h2>
								<ul>
									<li>
										{
											"HTML pour la structure des pages."
										}
									</li>
									<li>
										{
											"CSS pour la mise en page et le design responsive."
										}
									</li>
									<li>
										{
											"JavaScript pour les interactions (menu, recherche, navigation)."
										}
									</li>
									<li>{"Déploiement en ligne sur Vercel."}</li>
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

export default DuneWave;
