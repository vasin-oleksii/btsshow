import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faUpRightFromSquare,
	faDatabase,
	faLayerGroup,
	faShieldHalved,
	faFilePdf,
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

import "./styles/billetterieFa.css";

// Lien de la démo en ligne. Laisser vide tant que le site n'est pas hébergé.
const DEMO_URL = "";

const IMG = "/projects/billetterie-fa";

const TECHS = ["PHP 8", "MySQL", "MVC", "DAO", "FPDF", "Git", "Scrum"];

const STRUCTURE = `site/
├── controleurs/
├── images/
├── JS/
├── modeles/
├── polices/
├── style/
├── vues/
├── configBdd.php
├── index.php
├── process-confirmation.php
└── README.md`;

const CODE_JS = `// JS/total.js — met à jour le total en temps réel
const billets = document.querySelectorAll(".billet");
const totalEl = document.getElementById("total");

function calculerTotal() {
  let total = 0;
  billets.forEach((billet) => {
    const prix = parseFloat(billet.dataset.prix);
    const quantite = parseInt(billet.querySelector(".quantite").value, 10);
    total += prix * quantite;
  });
  totalEl.textContent = total.toFixed(2) + " €";
}

billets.forEach((billet) =>
  billet.querySelector(".quantite").addEventListener("input", calculerTotal)
);`;

const CODE_CONTROLEUR = `<?php
namespace App\\Controleurs;

class ReservationControleur
{
    public function valider(): void
    {
        $nom   = trim($_POST['nom'] ?? '');
        $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        $date  = $_POST['date_visite'] ?? '';

        $erreurs = [];
        if ($nom === '')      $erreurs[] = "Le nom est obligatoire.";
        if ($email === false) $erreurs[] = "L'e-mail est invalide.";
        if ($date === '')     $erreurs[] = "La date est obligatoire.";

        if ($erreurs !== []) {
            $this->afficher('reservation/formulaire', ['erreurs' => $erreurs]);
            return;
        }

        $id = $this->dao->creer($this->construireReservation());
        header("Location: index.php?action=confirmation&id={$id}");
    }
}`;

const CODE_DAO = `<?php
namespace App\\Modeles;

use PDO;

class ReservationDAO
{
    public function __construct(private PDO $bdd) {}

    // Insertion sécurisée avec transaction SQL
    public function creer(Reservation $reservation): int
    {
        $this->bdd->beginTransaction();
        try {
            $sql = "INSERT INTO reservation (nom, email, date_visite, total)
                    VALUES (:nom, :email, :date_visite, :total)";
            $req = $this->bdd->prepare($sql);
            $req->execute([
                'nom'         => $reservation->getNom(),
                'email'       => $reservation->getEmail(),
                'date_visite' => $reservation->getDateVisite(),
                'total'       => $reservation->getTotal(),
            ]);

            $idReservation = (int) $this->bdd->lastInsertId();

            foreach ($reservation->getBillets() as $billet) {
                $this->ajouterBillet($idReservation, $billet);
            }

            $this->bdd->commit();
            return $idReservation;
        } catch (\\Throwable $e) {
            $this->bdd->rollBack();
            throw $e;
        }
    }
}`;

const CODE_PDF = `<?php
require __DIR__ . '/polices/fpdf.php';

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, 'Facture - Billetterie du Fa', 0, 1, 'C');

$pdf->SetFont('Arial', '', 12);
$pdf->Cell(0, 8, "Reservation n°{$reservation->getId()}", 0, 1);
$pdf->Cell(0, 8, "Client : {$reservation->getNom()}", 0, 1);

foreach ($reservation->getBillets() as $billet) {
    $pdf->Cell(120, 8, $billet->getLibelle(), 1);
    $pdf->Cell(30, 8, $billet->getQuantite(), 1, 0, 'C');
    $pdf->Cell(40, 8, number_format($billet->getPrix(), 2) . ' EUR', 1, 1, 'R');
}

$pdf->Output('D', 'facture.pdf');`;

const BilletterieFa = () => {
	const { lightbox, openLightbox, closeLightbox } = useLightbox();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Billetterie du Fâ | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="Application web de réservation de billets en PHP 8 / MVC pour le site archéologique du Fâ : base de données MySQL et génération de factures PDF."
				/>
				<meta
					name="keywords"
					content="PHP, MVC, DAO, MySQL, FPDF, réservation, billetterie, BTS SIO"
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="projects" />
				<div className="content-wrapper">
					<div className="bf-logo-container">
						<div className="bf-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="bf-container">
						<Link to="/projects" className="back-link">
							<FontAwesomeIcon icon={faArrowLeft} /> Retour aux
							projets
						</Link>

						<div className="title bf-title">
							Billetterie du Fâ
						</div>

						<div className="subtitle bf-subtitle">
							{
								"Application web de réservation de billets — PHP 8 / Architecture MVC"
							}
						</div>

						<div className="bf-techs">
							{TECHS.map((tech) => (
								<span className="bf-tech" key={tech}>
									{tech}
								</span>
							))}
						</div>

						<div className="bf-actions">
							{DEMO_URL ? (
								<a
									className="bf-btn bf-btn-primary"
									href={DEMO_URL}
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon
										icon={faUpRightFromSquare}
									/>{" "}
									Voir la démo
								</a>
							) : (
								<span
									className="bf-btn bf-btn-disabled"
									title="Démo en ligne bientôt disponible"
								>
									<FontAwesomeIcon
										icon={faUpRightFromSquare}
									/>{" "}
									Démo bientôt disponible
								</span>
							)}
						</div>

						<Figure
							src={`${IMG}/accueil.png`}
							alt="Page d'accueil du site de la Billetterie du Fâ"
							caption="Page d'accueil du site"
							onOpen={openLightbox}
						/>

						<div className="bf-content">
							{/* 1. Contexte & Besoin */}
							<section className="bf-section">
								<h2>1. Contexte et besoin</h2>
								<p>
									{
										"Le site archéologique du Fâ, à Barzan, reçoit beaucoup de visiteurs l'été. Le but du projet était de créer une application web pour gérer les entrées plus facilement et permettre la réservation en ligne."
									}
								</p>
								<p>
									{
										"Le travail s'est fait en méthode Scrum, en PHP 8 sans framework, avec une architecture MVC imposée."
									}
								</p>
								<Figure
									src={`${IMG}/programme-estival.png`}
									alt="Programme estival 2026 du site du Fâ"
									caption="Programme estival proposé aux visiteurs"
									onOpen={openLightbox}
								/>
							</section>

							{/* 2. Architecture */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faLayerGroup} /> 2.
									Architecture et choix techniques
								</h2>
								<ul>
									<li>
										{
											"Langage : PHP 8 (typage fort, attributs)."
										}
									</li>
									<li>
										{
											"Architecture MVC pour séparer la logique et l'affichage."
										}
									</li>
									<li>
										{
											"Accès aux données : pattern DAO avec PDO pour sécuriser les requêtes SQL."
										}
									</li>
									<li>
										{
											"Sécurité : mots de passe hachés, protection contre les injections SQL et le XSS."
										}
									</li>
								</ul>
								<CodeBlock
									label="Structure du projet (MVC)"
									code={STRUCTURE}
									language="bash"
								/>
							</section>

							{/* 3. Fonctionnalités */}
							<section className="bf-section">
								<h2>3. Fonctionnalités clés</h2>

								<h3>A. Sélection des billets (front-end)</h3>
								<p>
									{
										"Un formulaire dynamique permet de choisir le type de visite et le nombre de billets. Le total se met à jour en temps réel pendant que le visiteur modifie les quantités."
									}
								</p>
								<div className="bf-figure-grid">
									<Figure
										src={`${IMG}/formulaire-reservation.png`}
										alt="Formulaire de réservation des billets"
										caption="Formulaire de réservation"
										onOpen={openLightbox}
									/>
									<Figure
										src={`${IMG}/fonction-reservation.png`}
										alt="Fonction de réservation côté interface"
										caption="Choix des billets et total"
										onOpen={openLightbox}
									/>
								</div>
								<CodeBlock
									label="Calcul du total en temps réel"
									code={CODE_JS}
									language="javascript"
								/>

								<h3>
									B. Validation et enregistrement (back-end)
								</h3>
								<p>
									{
										"Le contrôleur reçoit les données, vérifie chaque champ, puis les enregistre en base via le DAO. Une transaction SQL garantit que tout est sauvegardé correctement, ou rien du tout."
									}
								</p>
								<CodeBlock
									label="Contrôleur : validation des données"
									code={CODE_CONTROLEUR}
									language="php"
								/>
								<CodeBlock
									label="DAO : création de la réservation (transaction)"
									code={CODE_DAO}
									language="php"
								/>

								<h3>
									<FontAwesomeIcon icon={faFilePdf} /> C.
									Confirmation et facture PDF
								</h3>
								<p>
									{
										"Une fois la commande validée, le visiteur voit un récapitulatif et peut télécharger sa facture. Celle-ci est générée automatiquement avec la librairie FPDF."
									}
								</p>
								<div className="bf-figure-grid">
									<Figure
										src={`${IMG}/confirmation.png`}
										alt="Page de confirmation de commande"
										caption="Confirmation de commande"
										onOpen={openLightbox}
									/>
									<Figure
										src={`${IMG}/facture-pdf.png`}
										alt="Facture PDF générée automatiquement"
										caption="Facture PDF générée"
										onOpen={openLightbox}
									/>
								</div>
								<CodeBlock
									label="Génération de la facture avec FPDF"
									code={CODE_PDF}
									language="php"
								/>
							</section>

							{/* Données & RGPD */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faDatabase} /> Base de
									données et RGPD
								</h2>
								<p>
									{
										"Les données des visiteurs sont stockées dans une base MySQL. Le schéma est organisé en plusieurs tables liées entre elles (réservations, billets, types de visite)."
									}
								</p>
								<Figure
									src={`${IMG}/sql-tables.png`}
									alt="Schéma des tables SQL de la base de données"
									caption="Schéma des tables de la base de données"
									onOpen={openLightbox}
								/>
								<p>
									{
										"Le site informe aussi l'utilisateur sur l'usage de ses données personnelles, dans le respect du RGPD."
									}
								</p>
								<Figure
									src={`${IMG}/rgpd.png`}
									alt="Information RGPD du site"
									caption="Information RGPD affichée à l'utilisateur"
									onOpen={openLightbox}
								/>
							</section>

							{/* Bilan */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faShieldHalved} />{" "}
									Bilan
								</h2>
								<p>
									{
										"Ce projet m'a permis de mettre en pratique l'architecture MVC en PHP, de sécuriser l'accès aux données avec le pattern DAO et PDO, et de travailler en équipe avec la méthode Scrum."
									}
								</p>
								<Figure
									src={`${IMG}/footer.png`}
									alt="Pied de page du site avec les informations de contact"
									caption="Pied de page du site"
									onOpen={openLightbox}
								/>
							</section>
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

export default BilletterieFa;
