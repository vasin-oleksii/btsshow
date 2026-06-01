import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faMapMarkerAlt,
	faFilePdf,
	faBuilding,
	faMap,
	faLocationDot,
	faGaugeHigh,
	faIdBadge,
	faListCheck,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import {
	CodeBlock,
	Figure,
	Lightbox,
	useLightbox,
} from "../components/projects/projectMedia";

import INFO from "../data/user";

import "./styles/habitatStage.css";
import "./styles/billetterieFa.css";

const IMG = "/stages/habitat-2025";

const CODE_CARTE = `import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useState } from "react";

// Fournisseur de géocodage pour transformer une adresse en coordonnées
const provider = new OpenStreetMapProvider();

function RechercheAdresse({ onResultat }) {
  const [query, setQuery] = useState("");
  const map = useMap();

  const rechercher = async (e) => {
    e.preventDefault();
    const resultats = await provider.search({ query });
    if (resultats.length) {
      const { x, y, label } = resultats[0];
      map.setView([y, x], 15); // on centre la carte sur l'adresse trouvée
      onResultat({ lat: y, lng: x, label });
    }
  };

  return (
    <form onSubmit={rechercher} className="barre-recherche">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher une adresse…"
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}`;

const CODE_POI = `// Récupère les services (points d'intérêt) autour d'une adresse
export async function pointsInteret(lat, lng, rayon = 5000) {
  // Requête Overpass : pharmacies, hôpitaux, écoles, banques… dans le rayon
  const requete = \`
    [out:json][timeout:25];
    (
      node["amenity"~"pharmacy|hospital|school|bank|bus_station"]
        (around:\${rayon}, \${lat}, \${lng});
    );
    out center;\`;

  const reponse = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: requete,
  });
  const data = await reponse.json();

  return data.elements.map((el) => ({
    id: el.id,
    type: el.tags.amenity,
    nom: el.tags.name ?? "Service",
    lat: el.lat,
    lng: el.lon,
  }));
}`;

const CODE_BADGES = `// generation-badges.js — génère les badges depuis un fichier Excel
import xlsx from "node-xlsx";
import { PDFDocument } from "pdf-lib";
import fs from "node:fs/promises";

// 1) Lecture asynchrone du fichier Excel des participants
const [feuille] = xlsx.parse(await fs.readFile("participants.xlsx"));
const [entetes, ...lignes] = feuille.data;

const participants = lignes.map((ligne) =>
  Object.fromEntries(entetes.map((cle, i) => [cle, ligne[i]]))
);

// 2) Un badge par participant, mis en page sur le modèle
const pdf = await PDFDocument.create();
for (const p of participants) {
  const page = pdf.addPage([242, 153]); // format d'un badge
  page.drawText(\`\${p.prenom} \${p.nom}\`, { x: 20, y: 90, size: 18 });
  page.drawText(p.role ?? "Bénévole", { x: 20, y: 60, size: 12 });
}

await fs.writeFile("badges.pdf", await pdf.save());`;

const CODE_CI = `# .github/workflows/ci.yml — intégration continue (CI/CD)
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm test       # tests unitaires (Jest)
      - run: npm run e2e     # tests end-to-end (Cypress)
      - run: npm run build   # build Next.js (SSR)`;

const HabitatStage = () => {
	const { lightbox, openLightbox, closeLightbox } = useLightbox();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Stage Habitat et Humanisme | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="Stage 2025 chez Habitat et Humanisme Pyrénées Adour : application cartographique (React/Leaflet), optimisation (Next.js, CI/CD) et automatisation des badges."
				/>
				<meta
					name="keywords"
					content="Stage, Habitat et Humanisme, Développement Web, React, Leaflet, Next.js, badges, Pau"
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="stages" />
				<div className="content-wrapper">
					<div className="habitat-logo-container">
						<div className="habitat-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="habitat-container">
						<Link to="/stages" className="back-link">
							<FontAwesomeIcon icon={faArrowLeft} /> Retour aux
							stages
						</Link>

						<div className="title habitat-title">
							Habitat et Humanisme Pyrénées Adour
						</div>

						<div className="subtitle habitat-subtitle">
							Stage de développement web et transformation
							numérique | 2025
						</div>

						<div className="habitat-map-section">
							<h2>
								<FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
								Localisation
							</h2>
							<div className="map-info">
								<p>
									<strong>Adresse :</strong> Pau,
									Pyrénées-Atlantiques, France
								</p>
							</div>
							<div className="habitat-map-container">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.7064130672966!2d-0.37553452365988094!3d43.29946957523699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5648ce0b963c8f%3A0x10cb54c3c3a976a3!2sHabitat%20et%20Humanisme%20Pyr%C3%A9n%C3%A9es%20Adour!5e0!3m2!1sen!2sfr!4v1760694113250!5m2!1sen!2sfr"
									width="100%"
									height="450"
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="Localisation Habitat et Humanisme Pyrénées Adour"
								></iframe>
							</div>
						</div>

						<div className="habitat-content">
							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faBuilding} /> À propos
									de l&apos;association
								</h2>
								<p>
									Habitat et Humanisme Pyrénées Adour lutte
									contre le mal-logement. Basée à Pau,
									l&apos;association héberge et accompagne des
									personnes et des familles en difficulté, et
									mobilise donateurs et bénévoles. Elle
									s&apos;appuie sur une équipe mêlant salariés
									et bénévoles.
								</p>
							</div>

							<div className="habitat-section">
								<h2>Contexte et besoin</h2>
								<p>
									L&apos;objectif global du stage était de
									moderniser et d&apos;automatiser les processus
									internes de l&apos;association. Deux besoins
									concrets sont ressortis :
								</p>
								<ul>
									<li>
										une carte locale pour aider les nouveaux
										résidents à repérer les services autour
										de leur logement ;
									</li>
									<li>
										la gestion des badges, jusque-là
										manuelle et source d&apos;erreurs
										fréquentes.
									</li>
								</ul>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faBuilding} />{" "}
									L&apos;outil interne ISIS
								</h2>
								<p>
									J&apos;ai travaillé autour
									d&apos;ISIS, l&apos;application interne de
									suivi des familles, de l&apos;accompagnement
									et du parc immobilier (logements, immeubles,
									propriétaires, adresses, événements). C&apos;est
									dans cet outil que s&apos;intègrent les
									développements réalisés.
								</p>
								<Figure
									src={`${IMG}/isis.png`}
									alt="Tableau de bord de l'application interne ISIS"
									caption="ISIS : suivi des familles, de l'accompagnement et du parc immobilier"
									onOpen={openLightbox}
								/>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faMap} /> Application
									cartographique
								</h2>
								<p>
									J&apos;ai développé une application
									cartographique permettant de rechercher une
									adresse et d&apos;afficher les points
									d&apos;intérêt (commerces, services,
									transports) dans un rayon de 5 km. La carte
									reste utilisable hors-ligne, ce qui était
									important pour un usage sur le terrain.
								</p>
								<Figure
									src={`${IMG}/application-cartographique.png`}
									alt="Application cartographique : recherche d'adresse et points d'intérêt"
									caption="Recherche d'adresse et services à proximité (React, Leaflet, Google Places API)"
									onOpen={openLightbox}
								/>
								<p>
									La recherche d&apos;adresse transforme le
									texte saisi en coordonnées, puis recentre la
									carte sur le lieu trouvé.
								</p>
								<CodeBlock
									label="components/RechercheAdresse.jsx"
									code={CODE_CARTE}
									language="jsx"
								/>
								<p>
									Les points d&apos;intérêt situés dans le rayon
									demandé sont récupérés via l&apos;API Overpass
									d&apos;OpenStreetMap.
								</p>
								<CodeBlock
									label="services/pointsInteret.js"
									code={CODE_POI}
									language="javascript"
								/>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faGaugeHigh} />{" "}
									Optimisation et tests
								</h2>
								<p>
									Dans un second temps, j&apos;ai amélioré la
									qualité et les performances : migration vers
									le rendu côté serveur (Next.js), mise en place
									de tests unitaires (Jest) et end-to-end
									(Cypress), pipeline d&apos;intégration
									continue (GitHub Actions) et
									internationalisation (fr / en).
								</p>
								<Figure
									src={`${IMG}/optimisation-bundle.png`}
									alt="Comparaison de la taille du bundle avant et après optimisation"
									caption="Taille du bundle réduite après optimisation (≈ 450 Ko → 180 Ko)"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/optimisation-tests.png`}
									alt="Tests et pipeline d'intégration continue sur GitHub Actions"
									caption="Tests automatisés et pipeline CI/CD (GitHub Actions)"
									onOpen={openLightbox}
								/>
								<CodeBlock
									label=".github/workflows/ci.yml"
									code={CODE_CI}
									language="yaml"
								/>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faIdBadge} />{" "}
									Automatisation des badges
								</h2>
								<p>
									J&apos;ai aussi automatisé la création des
									badges événementiels. À partir d&apos;un
									simple fichier Excel, l&apos;outil génère
									automatiquement tous les badges, ce qui évite
									la saisie manuelle et les erreurs. La lecture
									du fichier est asynchrone pour rester
									performante, et la mise en page a été
									simplifiée pour l&apos;impression.
								</p>
								<Figure
									src={`${IMG}/badges.png`}
									alt="Badges générés automatiquement à partir d'un fichier Excel"
									caption="Génération automatique des badges depuis un fichier Excel"
									onOpen={openLightbox}
								/>
								<CodeBlock
									label="generation-badges.js"
									code={CODE_BADGES}
									language="javascript"
								/>
							</div>

							<div className="habitat-section">
								<h2>Technologies utilisées</h2>
								<ul>
									<li>
										React, Leaflet et Google Places API pour
										la cartographie.
									</li>
									<li>
										Next.js (SSR) pour les performances et le
										référencement.
									</li>
									<li>
										Node.js, JavaScript et TypeScript côté
										logique.
									</li>
									<li>
										Jest, Cypress et GitHub Actions pour les
										tests et la CI/CD.
									</li>
									<li>
										Excel, Office.js et Node.js pour
										l&apos;automatisation des badges.
									</li>
								</ul>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faListCheck} />{" "}
									Compétences mobilisées
								</h2>
								<ul>
									<li>
										Analyse des besoins et conception de
										solutions applicatives.
									</li>
									<li>
										Développement front-end React et
										cartographie web (Leaflet).
									</li>
									<li>
										Tests, intégration continue et sécurité
										(JWT).
									</li>
									<li>
										Communication, documentation et travail en
										équipe.
									</li>
								</ul>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faLocationDot} /> Bilan
								</h2>
								<p>
									Ces réalisations ont donné à
									l&apos;association des outils plus modernes :
									une carte pour localiser rapidement adresses
									et services, et une génération de badges qui
									réduit les erreurs et fait gagner du temps.
									Le travail des salariés et des bénévoles
									s&apos;en trouve simplifié.
								</p>
							</div>
						</div>

						<div className="habitat-pdf-viewer">
							<iframe
								src="/Presentation Stage.pdf#toolbar=0&navpanes=0&scrollbar=0"
								width="100%"
								height="800px"
								title="Présentation Stage"
								className="habitat-pdf-iframe"
							></iframe>
							<div className="habitat-pdf-fallback">
								<object
									data="/Presentation Stage.pdf"
									type="application/pdf"
									width="100%"
									height="800px"
									className="habitat-pdf-object"
								>
									<p>
										Votre navigateur ne supporte pas
										l'affichage des PDF.
										<a
											href="/Presentation Stage.pdf"
											target="_blank"
											rel="noopener noreferrer"
										>
											Télécharger le PDF
										</a>
									</p>
								</object>
							</div>
						</div>

						<div className="habitat-mobile-message">
							<div className="mobile-pdf-info">
								<h3>📱 Version mobile</h3>
								<p>
									Pour une meilleure expérience de lecture sur
									mobile et tablette, téléchargez la
									présentation PDF directement.
								</p>
								<a
									href="/Presentation Stage.pdf"
									className="mobile-download-button"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faFilePdf} />{" "}
									Télécharger la Présentation
								</a>
							</div>
						</div>

						<div className="habitat-pdf-download">
							<a
								href="/Presentation Stage.pdf"
								className="habitat-pdf-button"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon icon={faFilePdf} /> Télécharger
								la Présentation
							</a>
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

export default HabitatStage;
