import React, { useEffect } from "react";
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
							Mes Compétences
						</div>

						<div className="competences-content">
							<div className="competences-section">
								<h2>Programmation</h2>
								<ul>
									<li>
										Développement de sites web (HTML, CSS,
										JS, PHP)
									</li>
									<li>
										Projets collaboratifs : Locaboard,
										Motoos, Boutique Pic du Midi
									</li>
									<li>Développement sous WordPress</li>
									<li>
										Programmation Python
										(maths/informatique)
									</li>
									<li>
										Utilisation de la ligne de commande :
										SSH, Linux
									</li>
								</ul>
							</div>

							<div className="competences-section">
								<h2>Cybersécurité</h2>
								<ul>
									<li>
										Sensibilisation aux cyberattaques et à
										la protection des données
									</li>
									<li>
										Recensement des données personnelles
									</li>
									<li>
										Déploiement de preuves électroniques
										(contrats, signatures)
									</li>
									<li>
										Analyse de risques liés aux logiciels
										malveillants
									</li>
								</ul>
							</div>

							<div className="competences-section">
								<h2>Réseaux</h2>
								<ul>
									<li>
										Configuration de machines virtuelles
										sous Linux et Windows (VirtualBox)
									</li>
									<li>
										Active Directory sous Windows Server
									</li>
									<li>
										Adresse IP, routeurs, points d'accès
									</li>
									<li>
										Outils : Wireshark, PuTTY, Tera Term,
										Cisco Packet Tracer
									</li>
								</ul>
							</div>

							<div className="competences-section">
								<h2>Projet</h2>
								<ul>
									<li>Suivi de projets avec Kanboard</li>
									<li>
										Rédaction de comptes-rendus d'activité
									</li>
									<li>
										Élaboration de recettes (tests de
										validation)
									</li>
								</ul>
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
