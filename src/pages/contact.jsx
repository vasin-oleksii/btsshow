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

					<div className="map-container">
						<h3>Ma localisation</h3>
						<div className="map-wrapper">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.1234567890123!2d-0.3707976845000001!3d43.2951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5649c123456789%3A0x123456789abcdef!2sPau%2C%20France!5e0!3m2!1sen!2sfr!4v1634567890123!5m2!1sen!2sfr"
								width="100%"
								height="400"
								style={{ border: 0 }}
								allowFullScreen=""
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="Carte de Pau, France"
							></iframe>
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
