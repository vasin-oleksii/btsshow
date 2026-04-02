import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faHeart,
	faHandsHelping,
	faLanguage,
	faUsers,
	faHome,
	faFileAlt,
	faComments,
	faGlobe,
	faImage,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";

import "./styles/benevolat.css";

const Benevolat = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Bénévolat | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="Mon engagement bénévole auprès des réfugiés ukrainiens - aide à la traduction et accompagnement administratif"
				/>
				<meta
					name="keywords"
					content="Bénévolat, Ukraine, Traduction, Aide aux réfugiés, Solidarité"
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="benevolat" />
				<div className="content-wrapper">
					<div className="benevolat-logo-container">
						<div className="benevolat-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="benevolat-container">
						<Link to="/" className="back-link">
							<FontAwesomeIcon icon={faArrowLeft} /> Retour à
							l&apos;accueil
						</Link>

						<div className="title benevolat-title">
							<FontAwesomeIcon
								icon={faHeart}
								className="title-icon"
							/>{" "}
							Engagement Bénévole
						</div>

						<div className="subtitle benevolat-subtitle">
							Aide aux personnes ukrainiennes et russophones
							depuis février 2022
						</div>

						{/* Hero Section with Placeholder */}
						<div className="benevolat-hero">
							<div className="hero-image-placeholder">
								<FontAwesomeIcon
									icon={faImage}
									className="placeholder-icon"
								/>
								<span>Photo de groupe / activité bénévole</span>
							</div>
							<div className="hero-overlay">
								<p className="hero-quote">
									&laquo; Quand on parle la même langue, les
									barrières tombent &raquo;
								</p>
							</div>
						</div>

						<div className="benevolat-content">
							{/* Introduction personnelle */}
							<div className="benevolat-section highlight-section">
								<div className="section-icon-container">
									<FontAwesomeIcon
										icon={faGlobe}
										className="section-icon"
									/>
								</div>
								<h2>Mon parcours linguistique</h2>
								<div className="section-with-image">
									<div className="section-text">
										<p>
											En tant qu&apos;élève d&apos;origine
											ukrainienne, je maîtrise
											parfaitement <strong>l&apos;ukrainien</strong> et{" "}
											<strong>le russe</strong>, deux
											langues qui sont devenues un pont
											essentiel pour aider ceux qui en ont
											besoin. Cette richesse linguistique,
											héritée de mes racines, m&apos;a
											permis de me mettre au service des
											autres dans un contexte où la
											communication est souvent le premier
											obstacle à surmonter.
										</p>
										<p>
											Depuis le début de la guerre en
											Ukraine en février 2022, j&apos;ai
											ressenti le besoin profond de mettre
											mes compétences au service de ceux
											qui fuient le conflit et cherchent
											refuge en France.
										</p>
									</div>
									<div className="section-image-placeholder">
										<FontAwesomeIcon
											icon={faImage}
											className="placeholder-icon"
										/>
										<span>Photo personnelle</span>
									</div>
								</div>
							</div>

							{/* Contexte */}
							<div className="benevolat-section">
								<div className="section-icon-container">
									<FontAwesomeIcon
										icon={faHandsHelping}
										className="section-icon"
									/>
								</div>
								<h2>Le contexte de mon engagement</h2>
								<p>
									Lorsque la guerre a éclaté en Ukraine, des
									milliers de personnes ont dû fuir leur pays
									dans l&apos;urgence. Arrivées en France,
									beaucoup d&apos;entre elles se sont
									retrouvées face à un mur linguistique :
									comment remplir des formulaires
									administratifs ? Comment expliquer sa
									situation à une association ? Comment
									comprendre ses droits ?
								</p>
								<p>
									C&apos;est dans ce contexte que j&apos;ai
									décidé de m&apos;engager comme{" "}
									<strong>bénévole traducteur et médiateur</strong>,
									faisant le lien entre les personnes
									ukrainiennes et russophones et les
									structures d&apos;aide françaises.
								</p>
								<div className="image-gallery">
									<div className="gallery-placeholder">
										<FontAwesomeIcon
											icon={faImage}
											className="placeholder-icon"
										/>
										<span>Photo d&apos;accueil réfugiés</span>
									</div>
									<div className="gallery-placeholder">
										<FontAwesomeIcon
											icon={faImage}
											className="placeholder-icon"
										/>
										<span>Photo association</span>
									</div>
								</div>
							</div>

							{/* Missions détaillées */}
							<div className="benevolat-section missions-section">
								<div className="section-icon-container">
									<FontAwesomeIcon
										icon={faUsers}
										className="section-icon"
									/>
								</div>
								<h2>Mes missions bénévoles</h2>

								<div className="mission-cards">
									<div className="mission-card">
										<div className="mission-icon">
											<FontAwesomeIcon icon={faLanguage} />
										</div>
										<h3>Traduction et interprétariat</h3>
										<p>
											Traduction orale lors des
											rendez-vous avec les associations,
											les services sociaux et les
											administrations. Aide à la
											compréhension des documents officiels
											et des courriers importants.
										</p>
										<div className="mission-image-placeholder">
											<FontAwesomeIcon
												icon={faImage}
												className="placeholder-icon-small"
											/>
											<span>Photo traduction</span>
										</div>
									</div>

									<div className="mission-card">
										<div className="mission-icon">
											<FontAwesomeIcon icon={faFileAlt} />
										</div>
										<h3>Accompagnement administratif</h3>
										<p>
											Aide au remplissage des formulaires
											de demande d&apos;asile, de titre de
											séjour, d&apos;allocations et
											d&apos;aides sociales. Explication
											des procédures et des démarches à
											suivre.
										</p>
										<div className="mission-image-placeholder">
											<FontAwesomeIcon
												icon={faImage}
												className="placeholder-icon-small"
											/>
											<span>Photo administratif</span>
										</div>
									</div>

									<div className="mission-card">
										<div className="mission-icon">
											<FontAwesomeIcon icon={faHome} />
										</div>
										<h3>Aide au logement</h3>
										<p>
											Assistance dans les démarches de
											recherche de logement, traduction
											lors des visites, aide à la
											compréhension des baux et des droits
											des locataires.
										</p>
										<div className="mission-image-placeholder">
											<FontAwesomeIcon
												icon={faImage}
												className="placeholder-icon-small"
											/>
											<span>Photo logement</span>
										</div>
									</div>

									<div className="mission-card">
										<div className="mission-icon">
											<FontAwesomeIcon icon={faComments} />
										</div>
										<h3>Soutien moral et écoute</h3>
										<p>
											Au-delà de l&apos;aide pratique, offrir
											une oreille attentive et un soutien
											émotionnel à des personnes qui ont
											tout quitté. Créer un lien de
											confiance dans leur langue maternelle.
										</p>
										<div className="mission-image-placeholder">
											<FontAwesomeIcon
												icon={faImage}
												className="placeholder-icon-small"
											/>
											<span>Photo écoute</span>
										</div>
									</div>
								</div>
							</div>

							{/* Impact */}
							<div className="benevolat-section impact-section">
								<h2>L&apos;impact de cet engagement</h2>
								<div className="impact-content">
									<div className="impact-text">
										<p>
											Chaque interaction, chaque traduction,
											chaque formulaire rempli ensemble
											représente bien plus qu&apos;une simple
											tâche accomplie. C&apos;est une main
											tendue, un moment de réconfort, une
											étape vers l&apos;intégration.
										</p>
										<p>
											Cet engagement m&apos;a permis de
											développer des compétences humaines
											essentielles : l&apos;empathie, la
											patience, la capacité d&apos;adaptation
											et la gestion de situations parfois
											émotionnellement difficiles.
										</p>
										<p>
											J&apos;ai également appris énormément sur
											le fonctionnement des associations,
											les procédures administratives
											françaises et l&apos;importance du
											travail en réseau pour accompagner au
											mieux les personnes en difficulté.
										</p>
									</div>
									<div className="impact-image-placeholder">
										<FontAwesomeIcon
											icon={faImage}
											className="placeholder-icon"
										/>
										<span>Photo impact / témoignage</span>
									</div>
								</div>
							</div>

							{/* Compétences développées */}
							<div className="benevolat-section skills-section">
								<h2>Compétences développées</h2>
								<div className="skills-grid">
									<div className="skill-item">
										<span className="skill-name">
											Communication interculturelle
										</span>
									</div>
									<div className="skill-item">
										<span className="skill-name">
											Traduction ukrainien-français
										</span>
									</div>
									<div className="skill-item">
										<span className="skill-name">
											Traduction russe-français
										</span>
									</div>
									<div className="skill-item">
										<span className="skill-name">
											Médiation sociale
										</span>
									</div>
									<div className="skill-item">
										<span className="skill-name">
											Accompagnement administratif
										</span>
									</div>
									<div className="skill-item">
										<span className="skill-name">
											Écoute active
										</span>
									</div>
									<div className="skill-item">
										<span className="skill-name">
											Gestion du stress
										</span>
									</div>
									<div className="skill-item">
										<span className="skill-name">
											Travail en équipe associatif
										</span>
									</div>
								</div>
							</div>

							{/* Témoignage personnel */}
							<div className="benevolat-section testimony-section">
								<h2>Mon témoignage</h2>
								<blockquote className="testimony-quote">
									<p>
										&laquo; Être bénévole traducteur, c&apos;est
										bien plus que convertir des mots d&apos;une
										langue à une autre. C&apos;est être un pont
										entre deux mondes, porter des histoires,
										des espoirs et parfois des douleurs.
										Chaque personne que j&apos;ai aidée m&apos;a
										appris quelque chose sur la résilience
										et la force de l&apos;esprit humain. Cet
										engagement a profondément marqué ma vie
										et m&apos;a confirmé l&apos;importance de la
										solidarité. &raquo;
									</p>
								</blockquote>
								<div className="testimony-image-placeholder">
									<FontAwesomeIcon
										icon={faImage}
										className="placeholder-icon"
									/>
									<span>Photo personnelle / activité</span>
								</div>
							</div>

							{/* Galerie photos */}
							<div className="benevolat-section gallery-section">
								<h2>Galerie photos</h2>
								<div className="photo-gallery">
									<div className="gallery-item large">
										<FontAwesomeIcon
											icon={faImage}
											className="placeholder-icon"
										/>
										<span>Photo principale</span>
									</div>
									<div className="gallery-item">
										<FontAwesomeIcon
											icon={faImage}
											className="placeholder-icon-small"
										/>
										<span>Photo 1</span>
									</div>
									<div className="gallery-item">
										<FontAwesomeIcon
											icon={faImage}
											className="placeholder-icon-small"
										/>
										<span>Photo 2</span>
									</div>
									<div className="gallery-item">
										<FontAwesomeIcon
											icon={faImage}
											className="placeholder-icon-small"
										/>
										<span>Photo 3</span>
									</div>
									<div className="gallery-item">
										<FontAwesomeIcon
											icon={faImage}
											className="placeholder-icon-small"
										/>
										<span>Photo 4</span>
									</div>
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

export default Benevolat;
