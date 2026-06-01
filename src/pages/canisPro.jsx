import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faPaw,
	faUsers,
	faUserShield,
	faShieldHalved,
	faDatabase,
	faDiagramProject,
	faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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

const REPO_URL = "https://github.com/vasin-oleksii/canisPro";

const IMG = "/projects/canispro";

const CODE_ENTITY = `<?php
namespace App\\Entity;

use Doctrine\\Common\\Collections\\ArrayCollection;
use Doctrine\\Common\\Collections\\Collection;
use Doctrine\\DBAL\\Types\\Types;
use Doctrine\\ORM\\Mapping as ORM;

#[ORM\\Entity(repositoryClass: ChienRepository::class)]
class Chien
{
    #[ORM\\Id]
    #[ORM\\GeneratedValue]
    #[ORM\\Column]
    private ?int $id = null;

    #[ORM\\Column(length: 255)]
    private ?string $nomChien = null;

    #[ORM\\Column(type: Types::SMALLINT)]
    private ?int $age = null;

    #[ORM\\Column(length: 7)]
    private ?string $sexe = null;

    // Un chien peut avoir plusieurs inscriptions
    #[ORM\\OneToMany(targetEntity: Inscription::class, mappedBy: 'chien', orphanRemoval: true, cascade: ['remove'])]
    private Collection $inscriptions;

    // ... et appartient à un propriétaire
    #[ORM\\ManyToOne(inversedBy: 'chiens')]
    #[ORM\\JoinColumn(nullable: false)]
    private ?Proprietaire $proprietaire = null;

    public function __construct()
    {
        $this->inscriptions = new ArrayCollection();
    }

    // getters / setters ...
}`;

const CODE_CONTROLLER = `<?php
namespace App\\Controller;

#[Route('/admin/chien')]
final class AdminChienController extends AbstractController
{
    #[Route('/ajout', name: 'app_admin_chien_ajout', methods: ['GET', 'POST'])]
    public function ajout(Request $request, EntityManagerInterface $entityManager): Response
    {
        $chien = new Chien();
        $form = $this->createForm(AdminChienType::class, $chien);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($chien);
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_chien_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin_chien/ajout.html.twig', [
            'chien' => $chien,
            'form'  => $form,
        ]);
    }

    #[Route('/supprimer-{id}', name: 'app_admin_chien_delete', methods: ['POST'])]
    public function delete(Request $request, Chien $chien, EntityManagerInterface $entityManager): Response
    {
        // Vérification du jeton CSRF avant la suppression
        if ($this->isCsrfTokenValid('delete'.$chien->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($chien);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_admin_chien_index', [], Response::HTTP_SEE_OTHER);
    }
}`;

const CODE_SECURITY = `security:
    # Hachage automatique des mots de passe (bcrypt)
    password_hashers:
        Symfony\\Component\\Security\\Core\\User\\PasswordAuthenticatedUserInterface: 'auto'

    # L'utilisateur est chargé depuis la base via son e-mail
    providers:
        app_user_provider:
            entity:
                class: App\\Entity\\User
                property: email

    firewalls:
        main:
            lazy: true
            provider: app_user_provider
            form_login:
                login_path: app_login
                check_path: app_login
                enable_csrf: true
                default_target_path: app_accueil
            logout:
                path: app_logout

    # Restriction des accès par rôle
    access_control:
        - { path: ^/membre, roles: ROLE_USER }
        - { path: ^/admin,  roles: ROLE_ADMIN }`;

const TECHS = [
	"Symfony 8",
	"PHP 8.4",
	"MySQL",
	"Doctrine ORM",
	"Twig",
	"JavaScript",
	"Git",
	"Scrum",
];

const CanisPro = () => {
	const { lightbox, openLightbox, closeLightbox } = useLightbox();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`CanisPro | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="CanisPro — application web de gestion d'un club d'éducation canine. Développée avec Symfony 8, PHP 8.4, Doctrine ORM et MySQL, en architecture MVC."
				/>
				<meta
					name="keywords"
					content="Symfony, PHP, MVC, Doctrine, MySQL, Twig, CRUD, éducation canine, CanisPro"
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

						<div className="title bf-title">CanisPro</div>

						<div className="subtitle bf-subtitle">
							{
								"Application web de gestion d'un club d'éducation canine — Symfony 8 / PHP 8.4 / architecture MVC"
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
							<a
								className="bf-btn bf-btn-primary"
								href={REPO_URL}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon icon={faGithub} /> Voir le code
							</a>
						</div>

						<Figure
							src={`${IMG}/accueil.png`}
							alt="Page d'accueil du site CanisPro Education"
							caption="Page d'accueil : présentation du club et accès aux cours"
							onOpen={openLightbox}
						/>

						<div className="bf-content">
							{/* Présentation */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faPaw} /> Présentation
								</h2>
								<p>
									{
										"CanisPro est une application web complète pour gérer un club d'éducation canine. Elle permet de présenter les cours au public, de donner aux propriétaires un espace personnel pour gérer leurs chiens et leurs inscriptions, et d'offrir aux administrateurs un back-office pour tout piloter."
									}
								</p>
								<p>
									{
										"Le projet a été réalisé avec le framework Symfony 8 en PHP 8.4, selon une architecture MVC, avec une base de données MySQL gérée par l'ORM Doctrine."
									}
								</p>
							</section>

							{/* Trois espaces */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faUsers} /> Trois
									espaces, trois rôles
								</h2>
								<ul>
									<li>
										{
											"Public : consulter la liste des cours, leurs détails et les séances disponibles."
										}
									</li>
									<li>
										{
											"Membre (propriétaire) : tableau de bord personnel, gestion de ses chiens et de son profil."
										}
									</li>
									<li>
										{
											"Administrateur : gestion complète (cours, séances, chiens, inscriptions, propriétaires)."
										}
									</li>
								</ul>
							</section>

							{/* Espace membre */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faUsers} /> Espace
									membre
								</h2>
								<p>
									{
										"Une fois connecté, le propriétaire retrouve un tableau de bord avec ses informations et la liste de ses chiens, qu'il peut ajouter, modifier ou supprimer."
									}
								</p>
								<Figure
									src={`${IMG}/espace-membre.png`}
									alt="Tableau de bord d'un membre avec ses chiens"
									caption="Espace membre : informations personnelles et fiches des chiens"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/modifier-profil.png`}
									alt="Formulaire de modification du profil membre"
									caption="Modification du profil du propriétaire"
									onOpen={openLightbox}
								/>
							</section>

							{/* Connexion & sécurité */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faShieldHalved} />{" "}
									Connexion et sécurité
								</h2>
								<p>
									{
										"L'accès aux espaces membre et administration est protégé par le système de sécurité de Symfony : authentification par e-mail et mot de passe, hachage des mots de passe (bcrypt), gestion des rôles (ROLE_USER, ROLE_ADMIN) et jetons CSRF sur les formulaires."
									}
								</p>
								<Figure
									src={`${IMG}/connexion.png`}
									alt="Page de connexion de CanisPro"
									caption="Page de connexion à l'espace personnel"
									onOpen={openLightbox}
								/>
								<CodeBlock
									label="config/packages/security.yaml"
									code={CODE_SECURITY}
									language="yaml"
								/>
							</section>

							{/* Espace administration */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faUserShield} />{" "}
									Espace d'administration (CRUD)
								</h2>
								<p>
									{
										"L'administrateur dispose d'un back-office pour créer, consulter, modifier et supprimer toutes les données du club. Chaque module propose un tableau clair et des actions rapides."
									}
								</p>
								<Figure
									src={`${IMG}/admin-cours.png`}
									alt="Gestion des cours en administration"
									caption="Gestion des cours : type, niveau et prix"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/admin-seances.png`}
									alt="Gestion des séances en administration"
									caption="Gestion des séances : dates, horaires et inscriptions"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/admin-chiens.png`}
									alt="Gestion des chiens en administration"
									caption="Gestion des chiens inscrits et de leurs propriétaires"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/admin-ajout-chien.png`}
									alt="Formulaire d'ajout d'un chien"
									caption="Ajout d'une nouvelle fiche chien"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/admin-inscriptions.png`}
									alt="Gestion des inscriptions en administration"
									caption="Gestion des inscriptions : chien associé à une séance"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/admin-proprietaires.png`}
									alt="Gestion des propriétaires en administration"
									caption="Gestion des propriétaires (membres) du club"
									onOpen={openLightbox}
								/>
								<p>
									{
										"Chaque module repose sur le même schéma : un contrôleur reçoit la requête, valide le formulaire, puis enregistre ou supprime l'entité via Doctrine. La suppression est protégée par un jeton CSRF."
									}
								</p>
								<CodeBlock
									label="src/Controller/AdminChienController.php"
									code={CODE_CONTROLLER}
									language="php"
								/>
							</section>

							{/* Architecture & base de données */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faDatabase} />{" "}
									Architecture et base de données
								</h2>
								<p>
									{
										"L'application suit le modèle MVC de Symfony : des contrôleurs reçoivent les requêtes, les Repository interrogent la base via Doctrine, et les vues Twig affichent les données. La base relie huit entités : User, Proprietaire, Chien, Cour, Seance, Inscription, Type et Niveau."
									}
								</p>
								<Figure
									src={`${IMG}/mcd.png`}
									alt="Modèle conceptuel de données (MCD)"
									caption="Modèle conceptuel de données (MCD)"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/mld.png`}
									alt="Modèle relationnel des entités"
									caption="Modèle relationnel : relations entre les entités"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/bdd.png`}
									alt="Schéma des tables de la base de données"
									caption="Schéma des tables de la base MySQL"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/controllers.png`}
									alt="Liste des contrôleurs Symfony du projet"
									caption="Les contrôleurs Symfony (un par module)"
									onOpen={openLightbox}
								/>
								<p>
									{
										"Les entités sont décrites en PHP avec les attributs Doctrine. L'entité Chien illustre les deux types de relations utilisés : OneToMany (ses inscriptions) et ManyToOne (son propriétaire)."
									}
								</p>
								<CodeBlock
									label="src/Entity/Chien.php"
									code={CODE_ENTITY}
									language="php"
								/>
							</section>

							{/* Gestion de projet */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faListCheck} />{" "}
									Gestion de projet
								</h2>
								<p>
									{
										"Le projet a été organisé en méthode Scrum : découpage des tâches, planning et suivi de l'avancement sur ClickUp (diagramme de Gantt), et versionnement du code avec Git et GitHub."
									}
								</p>
								<Figure
									src={`${IMG}/clickup.png`}
									alt="Suivi des tâches et diagramme de Gantt sur ClickUp"
									caption="Planification des tâches (Gantt) sur ClickUp"
									onOpen={openLightbox}
								/>
								<Figure
									src={`${IMG}/github.png`}
									alt="Dépôt GitHub du projet CanisPro"
									caption="Dépôt GitHub : code versionné et documenté"
									onOpen={openLightbox}
								/>
							</section>

							{/* Technologies */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faDiagramProject} />{" "}
									Technologies utilisées
								</h2>
								<ul>
									<li>
										{
											"Symfony 8 (PHP 8.4) pour le back-end et l'architecture MVC."
										}
									</li>
									<li>
										{
											"Doctrine ORM pour gérer la base de données MySQL."
										}
									</li>
									<li>
										{"Twig pour les vues (templates HTML)."}
									</li>
									<li>
										{
											"JavaScript (Stimulus) et CSS pour l'interface."
										}
									</li>
									<li>
										{
											"Symfony Security pour l'authentification et les rôles."
										}
									</li>
									<li>
										{
											"Git / GitHub et ClickUp (Scrum) pour la gestion de projet."
										}
									</li>
								</ul>
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

export default CanisPro;
