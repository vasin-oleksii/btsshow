import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

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
								<div className="stage-header">
									<h2>
										Habitat et Humanisme Pyrénées Adour |
										2026
									</h2>
									<Link
										to="/stage/habitat-humanisme-2026"
										className="stage-detail-link"
									>
										Voir les détails du stage →
									</Link>
								</div>
								<div className="stage-details">
									<h3>À propos de l&apos;association</h3>
									<p>
										Retour chez Habitat et Humanisme
										Pyrénées Adour pour un second stage en
										2026, dans la continuité des travaux
										engagés l&apos;année précédente.
									</p>

									<h3>Domaine d&apos;activité</h3>
									<p>
										Développement web et transformation
										numérique
									</p>

									<h3>Mission principale</h3>
									<p>
										Développement d&apos;une carte
										interactive des logements de
										l&apos;association : visualisation
										géolocalisée du parc, marqueurs colorés
										par statut, fiches détaillées et vue
										tableau avec filtres et export.
									</p>

									<h3>Compétences mobilisées</h3>
									<ul>
										<li>
											Développement front-end (React,
											Leaflet / cartographie)
										</li>
										<li>
											Développement back-end (Node.js,
											API REST, base de données)
										</li>
										<li>Gestion de projet agile</li>
										<li>Documentation technique</li>
									</ul>
								</div>
							</div>

							<div className="stages-section">
								<div className="stage-header">
									<h2>
										Habitat et Humanisme Pyrénées Adour |
										2025
									</h2>
									<Link
										to="/stage/habitat-humanisme"
										className="stage-detail-link"
									>
										Voir les détails du stage →
									</Link>
								</div>
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
										Moderniser et automatiser les processus
										internes de l'association autour de son
										outil de suivi des familles et du parc
										immobilier (ISIS).
									</p>

									<h3>Réalisations</h3>
									<ul>
										<li>
											Application cartographique :
											recherche d'adresse et services à
											proximité (rayon de 5 km),
											utilisable hors-ligne.
										</li>
										<li>
											Optimisation et tests : migration
											SSR (Next.js), tests Jest / Cypress
											et pipeline CI/CD.
										</li>
										<li>
											Automatisation de la génération des
											badges à partir d'un fichier Excel.
										</li>
									</ul>

									<h3>Technologies utilisées</h3>
									<ul>
										<li>
											React, Leaflet et Google Places API
											pour la cartographie
										</li>
										<li>Next.js (SSR), Node.js, TypeScript</li>
										<li>
											Jest, Cypress et GitHub Actions
											(tests et CI/CD)
										</li>
										<li>
											Excel, Office.js et Node.js pour les
											badges
										</li>
									</ul>

									<h3>Résultats</h3>
									<p>
										Des outils plus modernes pour
										l'association : une carte pour localiser
										rapidement adresses et services, et une
										génération de badges qui réduit les
										erreurs et fait gagner du temps à
										l'équipe.
									</p>
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

