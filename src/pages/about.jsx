import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/about.css";

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`À propos | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="about" />
				<div className="content-wrapper">
					<div className="about-logo-container">
						<div className="about-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="about-container">
						<div className="about-main">
							<div className="about-right-side">
								<div className="title about-title">
									{INFO.about.title}
								</div>

								<div className="subtitle about-subtitle">
									{INFO.about.description}
								</div>

								<div className="about-details">
									<div className="about-subtitle">
										<h3>Formation</h3>
										<p>
											2024–2026 : BTS SIO – SLAM, Lycée
											Saint-John Perse, Pau
										</p>
										<p>
											2023–2024 : STI2D SIN, Lycée Antoine
											Bourdelle, Montauban
										</p>
									</div>

									<div className="about-subtitle">
										<h3>Expériences professionnelles</h3>
										<p>
											Junior Software Engineer – Miratech
											(React, Next.js, Ruby on Rails)
										</p>
										<p>
											Frontend Developer – DigitalMindUA
											(React Native)
										</p>
										<p>
											Stagiaire – Habitat et Humanisme Pyrénées Adour | 2025
											(Développement web et numérique)
										</p>
									</div>

									<div className="about-subtitle">
										<h3>Compétences techniques</h3>
										<p>
											HTML5, CSS3, JavaScript, TypeScript,
											React, Redux, Next.js, Tailwind,
											Ruby on Rails, Node.js, Git, Docker,
											Firebase, Jest
										</p>
									</div>

									<div className="about-subtitle">
										<h3>Langues</h3>
										<p>
											Français (C1), Anglais (B2),
											Ukrainien (C2), Russe (C2)
										</p>
									</div>
								</div>
							</div>

							<div className="about-left-side">
								<div className="about-image-container">
									<div className="about-image-wrapper">
										<img
											src="about.png"
											alt="about"
											className="about-image"
										/>
									</div>
								</div>

								<div className="about-socials">
									<Socials />
								</div>
							</div>
						</div>
						<div className="about-socials-mobile">
							<Socials />
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

export default About;
