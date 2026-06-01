import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faMapMarkerAlt,
	faMap,
	faTableList,
	faLocationDot,
	faServer,
	faListCheck,
	faBuilding,
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
import "./styles/habitat2026Stage.css";
import "./styles/billetterieFa.css";

const IMG = "/stages/habitat-2026";

const CODE_MARKER = `import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

// Une couleur par statut de logement
const couleursStatut = {
  Disponible:   "#10B981", // vert
  Occupé:       "#3B82F6", // bleu
  "En travaux": "#F97316", // orange
  Réservé:      "#8B5CF6", // violet
  Indisponible: "#6B7280", // gris
};

// Génère une icône de marqueur colorée selon le statut du logement
const creerIcone = (couleur) =>
  new Icon({
    iconUrl: \`data:image/svg+xml;base64,\${btoa(\`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path fill="\${couleur}" stroke="#fff" stroke-width="2"
          d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z"/>
        <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
        <circle fill="\${couleur}" cx="12.5" cy="12.5" r="4"/>
      </svg>\`)}\`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

export function MarqueurLogement({ logement, onOuvrir }) {
  const icone = creerIcone(couleursStatut[logement.statut]);
  return (
    <Marker position={[logement.lat, logement.lng]} icon={icone}>
      <Popup>
        <PopupLogement logement={logement} onOuvrir={onOuvrir} />
      </Popup>
    </Marker>
  );
}`;

const CODE_MAP = `import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";

// Centre et zoome la carte pour afficher tous les logements
function AjusterVue({ logements }) {
  const map = useMap();
  useEffect(() => {
    const coords = logements
      .filter((l) => l.lat && l.lng)
      .map((l) => [l.lat, l.lng]);
    if (coords.length) {
      map.fitBounds(new LatLngBounds(coords), { padding: [20, 20] });
    }
  }, [map, logements]);
  return null;
}

export function CarteLogements({ logements, center = [43.2951, -0.3708], zoom = 12 }) {
  // On ne garde que les logements géolocalisés
  const localises = logements.filter((l) => l.lat && l.lng);

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <AjusterVue logements={localises} />
      {localises.map((logement) => (
        <MarqueurLogement key={logement.id} logement={logement} onOuvrir={ouvrirDetails} />
      ))}
    </MapContainer>
  );
}`;

const CODE_API = `// routes/logements.js — API REST des logements
import { Router } from "express";
import { db } from "../database";

const router = Router();

// GET /api/logements — liste filtrable par statut et par ville
router.get("/", (req, res) => {
  const { statut, ville } = req.query;
  let sql = "SELECT * FROM logement WHERE 1 = 1";
  const params = [];

  if (statut) { sql += " AND statut = ?"; params.push(statut); }
  if (ville)  { sql += " AND ville = ?";  params.push(ville); }

  const logements = db.prepare(sql + " ORDER BY ville").all(...params);
  res.json(logements);
});

export default router;`;

const Habitat2026Stage = () => {
	const { lightbox, openLightbox, closeLightbox } = useLightbox();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Stage Habitat et Humanisme 2026 | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="Stage 2026 chez Habitat et Humanisme Pyrénées Adour : développement d'une carte interactive des logements (React, Leaflet, Node.js)."
				/>
				<meta
					name="keywords"
					content="Stage, Habitat et Humanisme, carte, logements, Leaflet, React, Node.js, Pau, 2026"
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
							Stage de développement web | 2026 — Carte interactive
							des logements
						</div>

						<Figure
							src={`${IMG}/carte.png`}
							alt="Carte interactive des logements avec marqueurs colorés par statut"
							caption="La carte interactive : chaque logement est un marqueur coloré selon son statut"
							onOpen={openLightbox}
						/>

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
									Habitat et Humanisme Pyrénées Adour œuvre
									pour l&apos;accès au logement des personnes en
									situation précaire. Basée à Pau,
									l&apos;association gère un parc de logements
									répartis sur tout le territoire et accompagne
									les familles vers l&apos;autonomie
									résidentielle.
								</p>
							</div>

							<div className="habitat-section">
								<h2>Contexte et besoin</h2>
								<p>
									Pour mon second stage en 2026, l&apos;équipe
									avait besoin d&apos;une vue d&apos;ensemble de
									son parc de logements. Les informations
									étaient dispersées dans des tableurs, sans
									visualisation géographique. J&apos;ai donc
									développé une <strong>carte interactive des
									logements</strong> permettant de localiser
									chaque bien, de connaître son statut en un
									coup d&apos;œil et de gérer ses informations.
								</p>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faMap} /> Fonctionnalités
									principales
								</h2>
								<ul>
									<li>
										Carte interactive (Leaflet) affichant
										tous les logements géolocalisés.
									</li>
									<li>
										Marqueurs colorés selon le statut du
										logement (disponible, occupé, en travaux,
										réservé…).
									</li>
									<li>
										Fiche détaillée au clic : adresse, nombre
										de pièces, surface, statut et photo.
									</li>
									<li>
										Vue tableau avec recherche, filtres par
										statut et export CSV des données.
									</li>
									<li>
										Ajout, modification et suivi des
										logements depuis l&apos;interface.
									</li>
								</ul>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faTableList} /> Vue
									tableau et filtres
								</h2>
								<p>
									En complément de la carte, une vue tableau
									permet de parcourir tous les logements, de les
									rechercher, de les filtrer par statut et
									d&apos;exporter la liste au format CSV pour
									les réunions de l&apos;équipe.
								</p>
								<Figure
									src={`${IMG}/tableau.png`}
									alt="Vue tableau des logements avec recherche, filtres et statuts"
									caption="La vue tableau : recherche, filtres par statut et export CSV"
									onOpen={openLightbox}
								/>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faLocationDot} /> Des
									marqueurs colorés par statut
								</h2>
								<p>
									Chaque logement est représenté par un
									marqueur dont la couleur dépend de son statut.
									L&apos;icône est générée dynamiquement en SVG,
									ce qui évite de gérer des images séparées pour
									chaque couleur.
								</p>
								<CodeBlock
									label="components/Map/MarqueurLogement.jsx"
									code={CODE_MARKER}
									language="jsx"
								/>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faMap} /> Le cœur de la
									carte
								</h2>
								<p>
									Le composant de carte charge le fond
									cartographique, ajuste automatiquement le zoom
									pour afficher tous les logements, puis place un
									marqueur par bien géolocalisé.
								</p>
								<CodeBlock
									label="components/Map/CarteLogements.jsx"
									code={CODE_MAP}
									language="jsx"
								/>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faServer} /> L&apos;API
									des logements
								</h2>
								<p>
									Côté serveur, une petite API REST en Node.js /
									Express fournit la liste des logements à la
									carte et à la vue tableau, avec un filtrage
									possible par statut et par ville.
								</p>
								<CodeBlock
									label="server/routes/logements.js"
									code={CODE_API}
									language="javascript"
								/>
							</div>

							<div className="habitat-section">
								<h2>Technologies utilisées</h2>
								<ul>
									<li>
										React pour l&apos;interface (carte + vue
										tableau).
									</li>
									<li>
										Leaflet / React-Leaflet pour la
										cartographie et les marqueurs.
									</li>
									<li>
										Node.js et Express pour l&apos;API REST.
									</li>
									<li>
										Base de données (SQLite) pour stocker les
										logements.
									</li>
									<li>Git / GitHub pour le versionnement.</li>
								</ul>
							</div>

							<div className="habitat-section">
								<h2>
									<FontAwesomeIcon icon={faListCheck} />{" "}
									Compétences mobilisées
								</h2>
								<ul>
									<li>
										Analyse d&apos;un besoin et conception
										d&apos;une solution applicative.
									</li>
									<li>
										Développement front-end React et
										intégration d&apos;une librairie de cartes.
									</li>
									<li>
										Développement d&apos;une API REST et accès
										aux données.
									</li>
									<li>
										Travail en équipe et restitution
										aux utilisateurs.
									</li>
								</ul>
							</div>

							<div className="habitat-section">
								<h2>Bilan</h2>
								<p>
									Ce projet m&apos;a permis de mettre en pratique
									la cartographie web et la communication entre un
									front-end React et une API. L&apos;outil donne
									à l&apos;association une vision claire et
									géolocalisée de son parc de logements, plus
									pratique que les tableurs utilisés auparavant.
								</p>
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

export default Habitat2026Stage;
