import React from "react";

function article_1() {
	return {
		date: "Mars 2024",
		title: "React.js et l'écosystème front-end moderne",
		description:
			"Analyse des tendances actuelles et futures de React.js, y compris React 18, Server Components, et les meilleures pratiques de développement.",
		keywords: [
			"React.js",
			"Front-end",
			"JavaScript",
			"Web Development",
			"Vasin Oleksii",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">
						<h2>Objectifs de la veille</h2>
						<ul>
							<li>
								Suivre les tendances et évolutions de React.js
							</li>
							<li>
								Analyser les bonnes pratiques de développement
							</li>
							<li>
								Étudier les nouvelles fonctionnalités (React 18,
								Server Components)
							</li>
							<li>
								Évaluer les aspects de sécurité et performance
							</li>
						</ul>

						<h2>Outils utilisés</h2>
						<ul>
							<li>
								Google Alerts : "React.js news", "React roadmap
								2024"
							</li>
							<li>GitHub Notifications</li>
							<li>Feedly (flux RSS)</li>
							<li>Réseaux sociaux : Twitter, LinkedIn</li>
							<li>
								Newsletters : React Status, JS Weekly, Frontend
								Focus
							</li>
						</ul>

						<h2>Analyse</h2>
						<p>
							React.js, soutenu par Meta, est largement adopté par
							des entreprises comme Netflix et Airbnb. Sa
							modularité et sa compatibilité avec React Native et
							Next.js en font un outil stratégique pour le
							développement web moderne.
						</p>
					</div>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "Février 2024",
		title: "Next.js 14 : Les nouveautés et leur impact",
		description:
			"Exploration des nouvelles fonctionnalités de Next.js 14 et leur impact sur le développement d'applications web modernes.",
		style: ``,
		keywords: [
			"Next.js",
			"React",
			"Web Development",
			"Server Components",
			"Vasin Oleksii",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">
						<h2>Points clés de Next.js 14</h2>
						<ul>
							<li>Server Actions améliorées</li>
							<li>Nouvelles optimisations de performance</li>
							<li>
								Meilleure intégration avec React Server
								Components
							</li>
							<li>Améliorations de la gestion des métadonnées</li>
						</ul>

						<h2>Impact sur le développement</h2>
						<p>
							Next.js 14 apporte des améliorations significatives
							en termes de performance et de développement, tout
							en simplifiant l'implémentation des fonctionnalités
							serveur.
						</p>
					</div>
				</div>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2];

export default myArticles;
