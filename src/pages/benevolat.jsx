import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faHeart,
	faHandsHelping,
	faLanguage,
	faChalkboardUser,
	faLaptop,
	faFileAlt,
	faComments,
	faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import { Lightbox, useLightbox } from "../components/projects/projectMedia";

import INFO from "../data/user";

import "./styles/benevolat.css";

const IMG = "/benevolat";

const LESSONS = [
	{ src: `${IMG}/lessons1.png`, alt: "Cours de français en ligne — compréhension orale (DELF)" },
	{ src: `${IMG}/lessons2.png`, alt: "Cours de grammaire — la négation" },
	{ src: `${IMG}/lessons3.png`, alt: "Séance de cours de français en ligne" },
	{ src: `${IMG}/lessons4.png`, alt: "Séance de cours de français en ligne" },
	{ src: `${IMG}/lessons5.png`, alt: "Séance de cours de français en ligne" },
	{ src: `${IMG}/lessons6.png`, alt: "Séance de cours de français en ligne" },
	{ src: `${IMG}/lessons7.png`, alt: "Séance de cours de français en ligne" },
	{ src: `${IMG}/lessons8.png`, alt: "Séance de cours de français en ligne" },
];

const MISSIONS = [
	{
		icon: faChalkboardUser,
		title: "Cours de français",
		text: "Je donne des cours de français en ligne (niveau DELF) : grammaire, compréhension orale et exercices, avec plusieurs élèves à chaque séance.",
	},
	{
		icon: faLanguage,
		title: "Traducteur-assistant",
		text: "J'aide à comprendre les lettres, les documents et les rendez-vous avec l'administration : CAF, CPAM, préfecture, mairie.",
	},
	{
		icon: faHandsHelping,
		title: "Accompagnement aux rendez-vous",
		text: "J'accompagne les personnes dans les institutions et je les aide à s'exprimer en français.",
	},
	{
		icon: faLaptop,
		title: "Aide avec les services en ligne",
		text: "J'aide à utiliser France Travail, CAF, Ameli, impots.gouv et à faire les démarches administratives en ligne.",
	},
	{
		icon: faComments,
		title: "Club de conversation",
		text: "J'organise une rencontre par semaine : pratique du français, échange d'expérience et aide pour les questions du quotidien.",
	},
	{
		icon: faFileAlt,
		title: "Traduction d'annonces et de documents",
		text: "Je traduis les informations et les consignes de l'association en ukrainien et en russe.",
	},
];

const SKILLS = [
	"Enseignement du français (FLE)",
	"Traduction ukrainien-français",
	"Traduction russe-français",
	"Médiation administrative",
	"Communication interculturelle",
	"Pédagogie",
	"Écoute active",
	"Solidarité",
];

const Benevolat = () => {
	const { lightbox, openLightbox, closeLightbox } = useLightbox();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const Photo = ({ src, alt }) => (
		<button
			type="button"
			className="benevolat-photo"
			onClick={() => openLightbox(src, alt)}
			aria-label={`Agrandir : ${alt}`}
		>
			<img src={src} alt={alt} loading="lazy" />
		</button>
	);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Bénévolat | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="Mon engagement bénévole auprès des personnes ukrainiennes : cours de français en ligne, traduction et accompagnement administratif"
				/>
				<meta
					name="keywords"
					content="Bénévolat, Ukraine, Cours de français, Traduction, Aide aux réfugiés, Solidarité"
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
							Cours de français et aide aux personnes ukrainiennes
							depuis février 2022
						</div>

						{/* Hero */}
						<div className="benevolat-hero">
							<div className="hero-image-placeholder">
								<Photo
									src={LESSONS[0].src}
									alt={LESSONS[0].alt}
								/>
							</div>
							<div className="hero-overlay">
								<p className="hero-quote">
									&laquo; Quand on parle la même langue, les
									barrières tombent &raquo;
								</p>
							</div>
						</div>

						<div className="benevolat-content">
							{/* Mon parcours */}
							<div className="benevolat-section highlight-section">
								<div className="section-icon-container">
									<FontAwesomeIcon
										icon={faGlobe}
										className="section-icon"
									/>
								</div>
								<h2>Mon parcours</h2>
								<div className="section-with-image">
									<div className="section-text">
										<p>
											Je suis d&apos;origine ukrainienne et
											je parle l&apos;
											<strong>ukrainien</strong>, le{" "}
											<strong>russe</strong> et le{" "}
											<strong>français</strong>. Depuis le
											début de la guerre en février 2022,
											beaucoup de personnes sont arrivées
											en France sans parler la langue.
										</p>
										<p>
											J&apos;ai décidé d&apos;utiliser mes
											langues pour les aider : leur
											apprendre le français et faciliter
											leurs démarches du quotidien.
										</p>
									</div>
									<div className="section-image-placeholder">
										<Photo
											src={`${IMG}/moi.png`}
											alt="Moi, bénévole auprès de l'association"
										/>
									</div>
								</div>
							</div>

							{/* Cours de français (mission principale) */}
							<div className="benevolat-section">
								<div className="section-icon-container">
									<FontAwesomeIcon
										icon={faChalkboardUser}
										className="section-icon"
									/>
								</div>
								<h2>Cours de français en ligne</h2>
								<p>
									Mon action principale : je donne des{" "}
									<strong>cours de français</strong> en ligne.
									Chaque séance réunit plusieurs élèves
									ukrainiens. Au programme : la grammaire (par
									exemple la négation), la compréhension orale
									et des exercices de type{" "}
									<strong>DELF</strong>.
								</p>
								<p>
									L&apos;objectif est simple : les aider à
									parler français au quotidien et à devenir
									autonomes.
								</p>
								<div className="benevolat-cours-gallery">
									{LESSONS.map((img) => (
										<div
											key={img.src}
											className="gallery-item"
										>
											<Photo
												src={img.src}
												alt={img.alt}
											/>
										</div>
									))}
								</div>
							</div>

							{/* Missions */}
							<div className="benevolat-section missions-section">
								<div className="section-icon-container">
									<FontAwesomeIcon
										icon={faHandsHelping}
										className="section-icon"
									/>
								</div>
								<h2>Mes missions bénévoles</h2>
								<div className="mission-cards">
									{MISSIONS.map((m) => (
										<div
											key={m.title}
											className="mission-card"
										>
											<div className="mission-icon">
												<FontAwesomeIcon
													icon={m.icon}
												/>
											</div>
											<h3>{m.title}</h3>
											<p>{m.text}</p>
										</div>
									))}
								</div>
							</div>

							{/* Compétences */}
							<div className="benevolat-section skills-section">
								<h2>Compétences développées</h2>
								<div className="skills-grid">
									{SKILLS.map((s) => (
										<div key={s} className="skill-item">
											<span className="skill-name">
												{s}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Témoignage */}
							<div className="benevolat-section testimony-section">
								<h2>Mon témoignage</h2>
								<blockquote className="testimony-quote">
									<p>
										&laquo; Aider, ce n&apos;est pas
										seulement traduire des mots. C&apos;est
										donner confiance, créer du lien et
										permettre à chacun de se débrouiller
										seul. Apprendre le français à ces
										personnes, c&apos;est leur ouvrir une
										porte vers une nouvelle vie. &raquo;
									</p>
								</blockquote>
							</div>
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

export default Benevolat;
