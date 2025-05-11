import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/contact.css";

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "contact");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="contact" />
				<div className="content-wrapper">
					<div className="contact-logo-container">
						<div className="contact-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="contact-container">
						<div className="title contact-title">Contactez-moi</div>

						<div className="subtitle contact-subtitle">
							Merci de votre intérêt pour me contacter. Je suis
							ouvert à vos retours, questions et suggestions. Vous
							pouvez me joindre par :
							<div className="contact-details">
								<p>
									📧 Email :{" "}
									<a href={`mailto:${INFO.main.email}`}>
										{INFO.main.email}
									</a>
								</p>
								<p>📱 Téléphone : +33 7 83 57 02 35</p>
								<p>📍 Localisation : Pau, France</p>
								<p>
									🔗 GitHub :{" "}
									<a
										href={INFO.socials.github}
										target="_blank"
										rel="noreferrer"
									>
										vasin-oleksii
									</a>
								</p>
							</div>
							Je m'efforce de répondre à tous les messages dans
							les 24 heures, bien que cela puisse prendre plus de
							temps pendant les périodes chargées. N'hésitez pas à
							me contacter pour toute question ou opportunité de
							collaboration.
						</div>
					</div>

					<div className="socials-container">
						<div className="contact-socials">
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

export default Contact;
