import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

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
						<div className="title cv-title">
							Mon Curriculum Vitae
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
									Junior Software Engineer – Miratech (React,
									Next.js, Ruby on Rails)
								</p>
								<p>
									Frontend Developer – DigitalMindUA (React
									Native)
								</p>
							</div>

							<div className="cv-section">
								<h2>Compétences techniques</h2>
								<p>
									HTML5, CSS3, JavaScript, TypeScript, React,
									Redux, Next.js, Tailwind, Ruby on Rails,
									Node.js, Git, Docker, Firebase, Jest
								</p>
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

export default CV;
