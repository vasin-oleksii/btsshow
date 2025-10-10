import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/competences.css";

const Competences = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "competences");

	// Accordion state: manage open/close per top-level section (1, 2, 3)
	const [openSections, setOpenSections] = useState({
		1: false,
		2: false,
		3: false,
	});

	const toggleSection = (id) => {
		setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const expandAll = () => {
		setOpenSections({ 1: true, 2: true, 3: true });
	};

	const collapseAll = () => {
		setOpenSections({ 1: false, 2: false, 3: false });
	};

	// Build references from existing projects
	const projectRefs = useMemo(() => {
		return (INFO.projects || []).map((p, idx) => ({
			key: `ref-${idx}`,
			title: p.title,
			link: p.link,
			text: p.linkText || "Voir",
		}));
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Compétences | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="competences" />
				<div className="content-wrapper">
					<div className="competences-logo-container">
						<div className="competences-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="competences-container">
						<div className="title competences-title">
							Compétences
						</div>

						<div className="competences-actions">
							<button className="btn" onClick={expandAll}>
								Tout afficher
							</button>
							<button
								className="btn btn-secondary"
								onClick={collapseAll}
							>
								Tout masquer
							</button>
						</div>

						<div className="accordion">
							<div className="accordion-item">
								<div className="accordion-header">
									<button
										className="accordion-toggle"
										onClick={() => toggleSection("1")}
									>
										{openSections["1"] ? "−" : "+"}
									</button>
									<h2 onClick={() => toggleSection("1")}>
										1. Support et mise à disposition de
										services informatiques
									</h2>
								</div>
								{openSections["1"] && (
									<div className="accordion-content">
										<h3>
											1.1 Gestion du patrimoine
											informatique
										</h3>
										<ul>
											<li>
												Recenser et identifier les
												ressources numériques
											</li>
											<li>
												Exploiter des référentiels,
												normes et standards adoptés par
												le prestataire informatique
											</li>
											<li>
												Mettre en place et vérifier les
												niveaux d’habilitation associés
												à un service
											</li>
											<li>
												Vérifier les conditions de la
												continuité d’un service
												informatique
											</li>
											<li>Gérer des sauvegardes</li>
											<li>
												Vérifier le respect des règles
												d’utilisation des ressources
												numériques
											</li>
										</ul>

										<h3>
											1.2 Réponse aux incidents et aux
											demandes d’assistance et d’évolution
										</h3>
										<ul>
											<li>
												Collecter, suivre et orienter
												des demandes
											</li>
											<li>
												Traiter des demandes concernant
												les services réseau et système,
												applicatifs
											</li>
											<li>
												Traiter des demandes concernant
												les applications
											</li>
										</ul>

										<h3>
											1.3 Développement de la présence en
											ligne de l’organisation
										</h3>
										<ul>
											<li>
												Participer à la valorisation de
												l’image de l’organisation sur
												les médias numériques
											</li>
											<li>
												Référencer les services en ligne
												de l’organisation et mesurer
												leur visibilité
											</li>
											<li>
												Participer à l’évolution d’un
												site Web exploitant les données
												de l’organisation
											</li>
										</ul>

										<h3>1.4 Travail en mode projet</h3>
										<ul>
											<li>
												Analyser les objectifs et les
												modalités d’organisation d’un
												projet
											</li>
											<li>Planifier les activités</li>
											<li>
												Évaluer les indicateurs de suivi
												d’un projet et analyser les
												écarts
											</li>
										</ul>

										<h3>
											1.5 Mise à disposition des
											utilisateurs d’un service
											informatique
										</h3>
										<ul>
											<li>
												Réaliser les tests d’intégration
												et d’acceptation d’un service
											</li>
											<li>Déployer un service</li>
											<li>
												Accompagner les utilisateurs
												dans la mise en place d’un
												service
											</li>
										</ul>

										<h3>
											1.6 Organisation de son
											développement professionnel
										</h3>
										<ul>
											<li>
												Mettre en place son
												environnement d’apprentissage
												personnel
											</li>
											<li>
												Mettre en œuvre des outils et
												stratégies de veille
												informationnelle
											</li>
											<li>
												Gérer son identité
												professionnelle
											</li>
											<li>
												Développer son projet
												professionnel
											</li>
										</ul>

										<div className="references">
											<div className="references-title">
												Références (projets liés)
											</div>
											<ul className="references-list">
												{projectRefs
													.slice(4, 5)
													.map((r) => (
														<li key={r.key}>
															<a
																href={r.link}
																target="_blank"
																rel="noreferrer"
															>
																{r.title}
															</a>
														</li>
													))}
											</ul>
										</div>
									</div>
								)}
							</div>

							<div className="accordion-item">
								<div className="accordion-header">
									<button
										className="accordion-toggle"
										onClick={() => toggleSection("2")}
									>
										{openSections["2"] ? "−" : "+"}
									</button>
									<h2 onClick={() => toggleSection("2")}>
										2. Conception et développement
										d’applications
									</h2>
								</div>
								{openSections["2"] && (
									<div className="accordion-content">
										<h3>
											2.1 Conception et développement
											d’une solution applicative
										</h3>
										<ul>
											<li>
												Analyser un besoin exprimé et
												son contexte juridique
											</li>
											<li>
												Participer à la conception de
												l’architecture d’une solution
												applicative
											</li>
											<li>
												Modéliser une solution
												applicative
											</li>
											<li>
												Exploiter les ressources du
												cadre applicatif (framework)
											</li>
											<li>
												Identifier, développer, utiliser
												ou adapter des composants
												logiciels
											</li>
											<li>
												Exploiter les technologies Web
												pour les échanges entre
												applications, y compris mobiles
											</li>
											<li>
												Utiliser des composants d’accès
												aux données
											</li>
											<li>
												Intégrer en continu les versions
												d’une solution applicative
											</li>
											<li>
												Réaliser les tests nécessaires à
												la validation ou à la mise en
												production
											</li>
											<li>
												Rédiger des documentations
												technique et d’utilisation
											</li>
											<li>
												Exploiter les fonctionnalités
												d’un environnement de
												développement et de tests
											</li>
										</ul>

										<h3>
											2.2 Maintenance corrective ou
											évolutive
										</h3>
										<ul>
											<li>
												Recueillir, analyser et mettre à
												jour les informations sur une
												version
											</li>
											<li>
												Évaluer la qualité d’une
												solution applicative
											</li>
											<li>
												Analyser et corriger un
												dysfonctionnement
											</li>
											<li>
												Mettre à jour les documentations
												technique et d’utilisation
											</li>
											<li>
												Élaborer et réaliser les tests
												des éléments mis à jour
											</li>
										</ul>

										<h3>2.3 Gestion des données</h3>
										<ul>
											<li>
												Exploiter des données à l’aide
												d’un langage de requêtes
											</li>
											<li>
												Développer des fonctionnalités
												applicatives au sein d’un SGBD
											</li>
											<li>
												Concevoir ou adapter une base de
												données
											</li>
											<li>
												Administrer et déployer une base
												de données
											</li>
										</ul>

										<div className="references">
											<div className="references-title">
												Références (projets liés)
											</div>
											<ul className="references-list">
												{projectRefs
													.slice(0, 4)
													.map((r) => (
														<li key={r.key}>
															<a
																href={r.link}
																target="_blank"
																rel="noreferrer"
															>
																{r.title}
															</a>
														</li>
													))}
											</ul>
										</div>
									</div>
								)}
							</div>

							<div className="accordion-item">
								<div className="accordion-header">
									<button
										className="accordion-toggle"
										onClick={() => toggleSection("3")}
									>
										{openSections["3"] ? "−" : "+"}
									</button>
									<h2 onClick={() => toggleSection("3")}>
										3. Cybersécurité des services
										informatiques
									</h2>
								</div>
								{openSections["3"] && (
									<div className="accordion-content">
										<h3>
											3.1 Protection des données à
											caractère personnel
										</h3>
										<ul>
											<li>
												Recenser les traitements sur les
												données à caractère personnel au
												sein de l’organisation
											</li>
											<li>
												Identifier les risques liés à la
												collecte, au traitement, au
												stockage et à la diffusion des
												données
											</li>
											<li>
												Appliquer la réglementation
												(collecte, traitement,
												conservation)
											</li>
											<li>
												Sensibiliser les utilisateurs
											</li>
										</ul>

										<h3>
											3.2 Préservation de l'identité
											numérique de l’organisation
										</h3>
										<ul>
											<li>
												Protéger l’identité numérique
												d’une organisation
											</li>
											<li>
												Déployer les moyens appropriés
												de preuve électronique
											</li>
										</ul>

										<h3>
											3.3 Sécurisation des équipements et
											des usages des utilisateurs
										</h3>
										<ul>
											<li>
												Informer les utilisateurs et
												promouvoir les bons usages
											</li>
											<li>
												Identifier les menaces et mettre
												en œuvre des défenses
											</li>
											<li>
												Gérer les accès et les
												privilèges appropriés
											</li>
											<li>
												Vérifier l’efficacité de la
												protection
											</li>
										</ul>

										<h3>
											3.4 Garantie de la disponibilité, de
											l’intégrité et de la confidentialité
										</h3>
										<ul>
											<li>
												Caractériser les risques liés à
												l’utilisation malveillante d’un
												service informatique
											</li>
											<li>
												Recenser les conséquences d’une
												perte de disponibilité,
												d’intégrité ou de
												confidentialité
											</li>
											<li>
												Identifier les obligations
												légales (archivage, protection)
											</li>
											<li>
												Organiser la collecte et la
												conservation des preuves
												numériques
											</li>
											<li>
												Appliquer les procédures légales
											</li>
										</ul>

										<h3>
											3.5 Cyber sécurisation d’une
											solution applicative
										</h3>
										<ul>
											<li>
												Vérifier les éléments
												contribuant à la qualité d’un
												développement
											</li>
											<li>
												Prendre en compte la sécurité
												dans un projet de développement
											</li>
											<li>
												Vérifier la conformité à un
												référentiel, une norme ou un
												standard
											</li>
											<li>Prévenir les attaques</li>
											<li>
												Analyser les connexions (logs)
											</li>
											<li>
												Analyser des incidents de
												sécurité et mettre en œuvre des
												contre-mesures
											</li>
										</ul>

										<div className="references">
											<div className="references-title">
												Références (projets liés)
											</div>
											<ul className="references-list">
												{projectRefs
													.slice(1, 3)
													.map((r) => (
														<li key={r.key}>
															<a
																href={r.link}
																target="_blank"
																rel="noreferrer"
															>
																{r.title}
															</a>
														</li>
													))}
											</ul>
										</div>
									</div>
								)}
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

export default Competences;
