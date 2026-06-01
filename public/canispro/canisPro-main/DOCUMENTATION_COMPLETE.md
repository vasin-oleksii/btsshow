# Documentation Complète - Projet canisPro

---

## 📋 Contexte

**canisPro** est une application web de gestion de cours de dressage pour chiens. Elle permet aux propriétaires de chiens de s'inscrire à des cours, consulter les disponibilités et gérer leurs informations personnelles. L'application offre également une interface d'administration pour gérer les cours, les séances, les chiens, les inscriptions et les propriétaires.

### Objectifs principales
- Gestion des cours de dressage canin par type (Obéissance, Agility, etc.) et niveau (Débutant, Intermédiaire, Avancé)
- Gestion des propriétaires et de leurs chiens
- Gestion des séances (date, heure, durée)
- Inscription des chiens aux séances
- Interface membre pour les propriétaires
- Interface d'administration pour la gestion complète

### Contexte technique
- **Framework** : Symfony 8.0
- **PHP** : ≥ 8.4
- **Base de données** : Doctrine ORM (MySQL/MariaDB)
- **Frontend** : Twig, JavaScript (Stimulus), CSS
- **Authentification** : Symfony Security Bundle

---

## 🔗 Lien Git

```
https://github.com/[votre-compte]/canisPro
```

*À compléter avec votre repository réel*

### Commandes git utiles
```bash
git clone https://github.com/[votre-compte]/canisPro.git
cd canisPro
git branch -a  # voir toutes les branches
git log --oneline  # voir l'historique
```

---

## 🏗️ Architecture Générale

### Architecture MVC (Modèle-Vue-Contrôleur)

```
canisPro/
├── src/
│   ├── Entity/           # Modèles de données (Entités Doctrine)
│   ├── Controller/       # Contrôleurs (logique applicative)
│   ├── Form/             # Formulaires Symfony
│   ├── Repository/       # Requêtes personnalisées
│   └── DataFixtures/     # Données de test
├── templates/            # Vues Twig
├── config/
│   ├── packages/         # Configuration des bundles
│   ├── routes.yaml       # Routage
│   └── services.yaml     # Services
├── migrations/           # Migrations Doctrine
├── public/               # Racine web (index.php)
├── assets/               # Assets (JS, CSS)
└── tests/                # Tests unitaires
```

### Flux de requête
```
URL → Routeur (routes.yaml) → Contrôleur → Entité/Repository → 
Template Twig → Réponse HTML
```

### Couches applicatives

| Couche | Responsabilité | Exemples |
|--------|------------------|----------|
| **Présentation** | Interface utilisateur | Templates Twig, CSS, JavaScript |
| **Métier** | Logique applicative | Contrôleurs, Services |
| **Données** | Accès à la BD | Entities, Repositories |
| **Sécurité** | Authentification/Autorisation | User, Roles |

---

## 📊 Modèle de Données (MCD / UML)

### Diagramme des relations

```
┌─────────────────┐
│      User       │
│─────────────────│
│ id (pk)         │
│ email (unique)  │
│ password        │
│ roles[]         │
└────────┬────────┘
         │ (1)
         │ OneToOne
         │
         │
┌────────▼──────────────┐
│   Proprietaire        │
│───────────────────────│
│ id (pk)               │
│ nom                   │
│ prenom                │
│ mail                  │
│ tel                   │
│ adresse               │
│ user_id (fk) (unique) │
└────────┬──────────────┘
         │ (1)
         │ OneToMany
         │
         │
    ┌────▼──────────┐
    │    Chien       │
    │────────────────│
    │ id (pk)        │
    │ nomChien       │
    │ race           │
    │ age            │
    │ sexe           │
    │ proprietaire_id│
    │ (fk)           │
    └────┬───────────┘
         │ (1)
         │ OneToMany
         │
         │
    ┌────▼──────────────────┐
    │   Inscription          │
    │─────────────────────────│
    │ id (pk)                │
    │ dateInscription        │
    │ chien_id (fk)          │
    │ seance_id (fk)         │
    └────────────────────────┘
         │ (n)
         │ ManyToOne
         │
         │
    ┌────▲──────────┐
    │    Seance      │
    │────────────────│
    │ id (pk)        │
    │ date           │
    │ heureDeb       │
    │ duree          │
    │ cour_id (fk)   │
    └────┬───────────┘
         │ (1)
         │ OneToMany
         │
         │
    ┌────▼──────────┐
    │     Cour       │
    │────────────────│
    │ id (pk)        │
    │ nomCour        │
    │ description    │
    │ prix           │
    │ type_id (fk)   │
    │ niveau_id (fk) │
    └──┬──────────┬──┘
       │          │
       │ (n)      │ (n)
       │ ManyToOne│
       │          │
    ┌──▼────┐  ┌──▼────┐
    │ Type  │  │ Niveau │
    │───────│  │────────│
    │ id(pk)│  │ id(pk) │
    │libelle│  │libelle │
    │nbPlace│  │        │
    └───────┘  └────────┘
```

### Relations principales (Many-to-Many via Inscription)

**Chien ←→ Seance** (via Inscription)
- Un chien peut s'inscrire à plusieurs séances
- Une séance peut accueillir plusieurs chiens
- Table de liaison : `Inscription`

### Énumération des entités

| Entité | Champs | Relations |
|--------|--------|-----------|
| **User** | id, email, password, roles | 1:1 Proprietaire |
| **Proprietaire** | id, nom, prenom, mail, tel, adresse, user | 1:1 User, 1:n Chien |
| **Chien** | id, nomChien, race, age, sexe, proprietaire | n:1 Proprietaire, 1:n Inscription |
| **Type** | id, libelleType, nbPlaces | n:1 Cour |
| **Niveau** | id, libelleNiveau | n:1 Cour |
| **Cour** | id, nomCour, description, prix, type, niveau | 1:n Seance, n:1 Type, n:1 Niveau |
| **Seance** | id, date, heureDeb, duree, cour | n:1 Cour, 1:n Inscription |
| **Inscription** | id, dateInscription, chien, seance | n:1 Chien, n:1 Seance |

---

## 🗄️ Schéma Base de Données (SQL)

### Structure des tables

```sql
-- Table User
CREATE TABLE `user` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(180) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `roles` JSON DEFAULT NULL
);

-- Table Proprietaire
CREATE TABLE `proprietaire` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `prenom` VARCHAR(255) NOT NULL,
  `mail` VARCHAR(255) NOT NULL,
  `tel` VARCHAR(10),
  `adresse` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL UNIQUE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

-- Table Type
CREATE TABLE `type` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `libelle_type` VARCHAR(11) NOT NULL,
  `nb_places` SMALLINT NOT NULL
);

-- Table Niveau
CREATE TABLE `niveau` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `libelle_niveau` VARCHAR(8) NOT NULL
);

-- Table Cour
CREATE TABLE `cour` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nom_cour` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `prix` FLOAT NOT NULL,
  `type_id` INT NOT NULL,
  `niveau_id` INT NOT NULL,
  FOREIGN KEY (`type_id`) REFERENCES `type`(`id`),
  FOREIGN KEY (`niveau_id`) REFERENCES `niveau`(`id`)
);

-- Table Chien
CREATE TABLE `chien` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nom_chien` VARCHAR(255) NOT NULL,
  `race` VARCHAR(255) NOT NULL,
  `age` SMALLINT NOT NULL,
  `sexe` VARCHAR(7) NOT NULL,
  `proprietaire_id` INT NOT NULL,
  FOREIGN KEY (`proprietaire_id`) REFERENCES `proprietaire`(`id`) ON DELETE CASCADE
);

-- Table Seance
CREATE TABLE `seance` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `heure_deb` TIME NOT NULL,
  `duree` TIME NOT NULL,
  `cour_id` INT NOT NULL,
  FOREIGN KEY (`cour_id`) REFERENCES `cour`(`id`) ON DELETE CASCADE
);

-- Table Inscription (Many-to-Many)
CREATE TABLE `inscription` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `date_inscription` DATE NOT NULL,
  `chien_id` INT NOT NULL,
  `seance_id` INT NOT NULL,
  FOREIGN KEY (`chien_id`) REFERENCES `chien`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`seance_id`) REFERENCES `seance`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `unique_inscription` (`chien_id`, `seance_id`)
);

-- Index pour les performances
CREATE INDEX `idx_chien_proprietaire` ON `chien`(`proprietaire_id`);
CREATE INDEX `idx_seance_cour` ON `seance`(`cour_id`);
CREATE INDEX `idx_inscription_chien` ON `inscription`(`chien_id`);
CREATE INDEX `idx_inscription_seance` ON `inscription`(`seance_id`);
CREATE INDEX `idx_cour_type` ON `cour`(`type_id`);
CREATE INDEX `idx_cour_niveau` ON `cour`(`niveau_id`);
```

### Exemple de données

```sql
-- Utilisateurs
INSERT INTO `user` VALUES 
(1, 'alice@example.com', '$2y$13$...hash...', '["ROLE_USER"]'),
(2, 'bob@example.com', '$2y$13$...hash...', '["ROLE_USER"]');

-- Propriétaires
INSERT INTO `proprietaire` VALUES 
(1, 'Martin', 'Alice', 'alice@example.com', '0601234567', '123 Rue de Paris', 1),
(2, 'Dupont', 'Bob', 'bob@example.com', '0607654321', '456 Avenue Lyon', 2);

-- Types de cours
INSERT INTO `type` VALUES 
(1, 'Obéissance', 8),
(2, 'Agility', 6),
(3, 'Pistage', 4);

-- Niveaux
INSERT INTO `niveau` VALUES 
(1, 'Débutant'),
(2, 'Intermédiaire'),
(3, 'Avancé');

-- Cours
INSERT INTO `cour` VALUES 
(1, 'Obéissance pour Débutants', 'Apprendre les bases de l''obéissance', 50.00, 1, 1),
(2, 'Agility Intermédiaire', 'Parcours d''agility niveau intermédiaire', 60.00, 2, 2),
(3, 'Pistage Avancé', 'Défis de suivi olfactif avancé', 70.00, 3, 3);

-- Chiens
INSERT INTO `chien` VALUES 
(1, 'Rex', 'Berger Allemand', 3, 'M', 1),
(2, 'Luna', 'Labrador', 2, 'F', 1),
(3, 'Max', 'Golden Retriever', 4, 'M', 2);

-- Séances
INSERT INTO `seance` VALUES 
(1, '2026-04-15', '09:00:00', '01:00:00', 1),
(2, '2026-04-15', '10:15:00', '01:00:00', 1),
(3, '2026-04-16', '14:00:00', '01:30:00', 2);

-- Inscriptions
INSERT INTO `inscription` VALUES 
(1, '2026-03-23', 1, 1),
(2, '2026-03-23', 2, 1),
(3, '2026-03-23', 3, 3);
```

---

## 🎨 Interface Utilisateur (IHM/Vues)

### Architecture des vues Twig

```
templates/
├── base.html.twig            # Layout principal
├── menu.html.twig            # Barre de navigation
├── accueil/
│   ├── index.html.twig       # Page d'accueil
│   ├── listeCours.html.twig  # Liste des cours
│   ├── detailsCour.html.twig # Détails d'un cours
│   ├── listeSeances.html.twig # Séances d'un cours
│   └── detailsSeance.html.twig # Détails d'une séance
├── membre/
│   ├── index.html.twig       # Tableau de bord membre
│   ├── modifMembre.html.twig # Modification profil
│   └── formulaireChien.html.twig # Ajout/Modif chien
├── admin_chien/
│   ├── listeChiens.html.twig # Liste admin
│   ├── ajout.html.twig       # Ajout chien
│   └── modif.html.twig       # Modification chien
├── security/
│   └── login.html.twig       # Page de connexion
└── ... (autres modules admin)
```

### Écrans principaux

#### 1. **Page d'Accueil** (`/`)
- Présentation du service
- Accès rapide aux cours
- Boutons d'inscription/connexion

#### 2. **Liste des Cours** (`/liste-des-cours`)
- Affichage de tous les cours disponibles
- Filtrage par type et niveau
- Accès aux détails de chaque cours
- **Colonnes** : Nom, Type, Niveau, Prix, Action (détails)

#### 3. **Détails d'un Cours** (`/details-cour-{id}`)
- Description complète du cours
- Prix et niveau requis
- Liste des séances disponibles
- Bouton "Voir les séances"

#### 4. **Gestion Profil Membre** (`/membre`)
- Affichage des informations personnelles
- Liste des chiens associés
- Boutons modifier/ajouter chien
- Visualisation des inscriptions actuelles

#### 5. **Gestion Chien** (`/membre/chien-ajout`, `/membre/chien-modification-{id}`)
- Formulaire ajout/modification chien
- Champs : nom, race, âge, sexe
- Validation des données

#### 6. **Interface Admin - Chiens** (`/admin/chien`)
- CRUD complet des chiens
- Liste complète avec propriétaire
- Actions : modifier, supprimer
- Droits : Administrateur seulement

#### 7. **Interface Admin - Cours** (`/admin/cour`)
- Gestion complète des cours
- Paramètres : nom, description, prix, type, niveau

#### 8. **Interface Admin - Séances** (`/admin/seance`)
- Gestion des séances
- Paramètres : date, heure début, durée, cours associé

#### 9. **Interface Admin - Inscriptions** (`/admin/inscription`)
- Gestion des inscriptions chien-séance
- Vue d'ensemble des participations

### Palette colori et design
- **Couleur principale** : Bleu (confiance, professionnalisme)
- **Couleur secondaire** : Orange (dynamisme, action)
- **Fond** : Blanc/Gris clair
- **Police** : Sans-serif moderne (Bootstrap par défaut)
- **Responsive** : Adapté mobile (Bootstrap grid)

---

## ⚙️ Fonctionnalités Principales

### A. Module Public (Accueil)

| Fonctionnalité | Description | Route |
|-----------------|-------------|-------|
| **Accueil** | Page d'introduction | `/` |
| **Lister les cours** | Voir tous les cours disponibles | `/liste-des-cours` |
| **Détails cours** | Voir description complète d'un cours | `/details-cour-{id}` |
| **Lister séances** | Voir les séances d'un cours | `/liste-des-seances?id={id}` |
| **Détails séance** | Voir détails d'une séance (date, heure) | `/details-seances-{id}` |
| **S'inscrire** | Inscrire son chien à une séance | `POST /s-inscrire` |

### B. Module Membre (Propriétaire connecté)

| Fonctionnalité | Description | Route |
|-----------------|-------------|-------|
| **Tableau de bord** | Voir profil et chiens | `/membre` |
| **Modifier profil** | Éditer informations personnes | `/membre/{id}` |
| **Ajouter chien** | Créer un nouveau chien | `/membre/chien-ajout` |
| **Modifier chien** | Éditer infos chien | `/membre/chien-modification-{id}` |
| **Supprimer chien** | Retirer un chien | `/membre/chien/supprimer/{id}` |
| **Voir inscriptions** | Lister les séances du chien | Vue dans le tableau de bord |

### C. Module Admin (Administrateur)

#### **Gestion Chiens** (`/admin/chien`)
- ✅ Lister tous les chiens
- ✅ Créer un chien
- ✅ Modifier un chien
- ✅ Supprimer un chien
- ✅ Voir propriétaire associé

#### **Gestion Cours** (`/admin/cour`)
- ✅ Lister tous les cours
- ✅ Créer un cours
- ✅ Modifier un cours
- ✅ Supprimer un cours
- ✅ Gérer type et niveau

#### **Gestion Séances** (`/admin/seance`)
- ✅ Lister toutes les séances
- ✅ Créer une séance
- ✅ Modifier une séance
- ✅ Supprimer une séance
- ✅ Associer à un cours

#### **Gestion Inscriptions** (`/admin/inscription`)
- ✅ Lister les inscriptions
- ✅ Créer une inscription
- ✅ Supprimer une inscription

#### **Gestion Propriétaires** (`/admin/proprietaire`)
- ✅ Lister les propriétaires
- ✅ Créer un propriétaire
- ✅ Modifier un propriétaire
- ✅ Supprimer un propriétaire

### D. Module Sécurité

| Fonctionnalité | Description |
|-----------------|-------------|
| **Inscription** | Créer un compte propriétaire |
| **Connexion** | S'authentifier |
| **Déconnexion** | Quitter la session |
| **Rôles** | ROLE_USER (membre), ROLE_ADMIN (administrateur) |

---

## 📸 Captures d'Écran / Wireframes

### 1. Page d'Accueil
```
┌─────────────────────────────────────────────────────┐
│ Navigation: [Accueil] [Cours] [Login] [Signup]      │
├─────────────────────────────────────────────────────┤
│                                                      │
│   Bienvenue sur canisPro                            │
│   Plateforme de gestion de cours de dressage        │
│                                                      │
│   [Voir nos cours] [S'inscrire]                     │
│                                                      │
│   Cours populaires:                                 │
│   ┌───────────┬───────────┬───────────┐            │
│   │ Obéissance│  Agility  │ Pistage   │            │
│   │ Débutant  │ Intermediate │ Avancé   │            │
│   │ €50       │ €60       │ €70       │            │
│   └───────────┴───────────┴───────────┘            │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 2. Liste des Cours
```
┌─────────────────────────────────────────────────────┐
│ Menu: [Accueil] [Cours] [Profil ▼] [Logout]        │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Nos Cours                                            │
│                                                      │
│ ┌────────────────────────────────────────────────┐ │
│ │ Obéissance pour Débutants                     │ │
│ │ Type: Obéissance | Niveau: Débutant          │ │
│ │ Prix: €50.00                                  │ │
│ │ Description: Apprendre les bases...           │ │
│ │ [Détails]                                     │ │
│ └────────────────────────────────────────────────┘ │
│                                                      │
│ ┌────────────────────────────────────────────────┐ │
│ │ Agility Intermédiaire                         │ │
│ │ Type: Agility | Niveau: Intermédiaire        │ │
│ │ Prix: €60.00                                  │ │
│ │ Description: Parcours d'agility niveau...    │ │
│ │ [Détails]                                     │ │
│ └────────────────────────────────────────────────┘ │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 3. Détails Cours
```
┌─────────────────────────────────────────────────────┐
│ Menu: [Accueil] [Cours] [Profil ▼] [Logout]        │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Obéissance pour Débutants                           │
│ ─────────────────────────────────                   │
│                                                      │
│ Type: Obéissance                                    │
│ Niveau: Débutant                                    │
│ Prix: €50.00 par séance                             │
│                                                      │
│ Description complète:                               │
│ Apprendre les bases de l'obéissance canine...      │
│                                                      │
│ Séances disponibles:                                │
│ ┌──────────────┬─────────┬──────────┐             │
│ │ Date         │ Heure   │ Durée    │ Action     │
│ ├──────────────┼─────────┼──────────┤             │
│ │ 15/04/2026   │ 09:00   │ 1h00     │ [Détails]  │
│ │ 15/04/2026   │ 10:15   │ 1h00     │ [Détails]  │
│ │ 18/04/2026   │ 14:00   │ 1h30     │ [Détails]  │
│ └──────────────┴─────────┴──────────┘             │
│                                                      │
│ [Retour]                                            │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 4. Tableau de Bord Membre
```
┌─────────────────────────────────────────────────────┐
│ Menu: [Accueil] [Cours] [Profil ▼] [Logout]        │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Tableau de Bord Membre                              │
│ ─────────────────────────────                       │
│                                                      │
│ Profil: Alice Martin                                │
│ Email: alice@example.com                            │
│ Téléphone: 06 01 23 45 67                          │
│ Adresse: 123 Rue de Paris                           │
│ [Modifier mes infos]                                │
│                                                      │
│ Mes Chiens:                                         │
│ ┌───────────────────────────────────────────────┐ │
│ │ Rex (Berger Allemand, 3 ans, M)              │ │
│ │ Inscriptions: 2 séances en cours              │ │
│ │ [Voir] [Modifier] [Supprimer]                │ │
│ └───────────────────────────────────────────────┘ │
│                                                      │
│ ┌───────────────────────────────────────────────┐ │
│ │ Luna (Labrador, 2 ans, F)                    │ │
│ │ Inscriptions: 1 séance en cours               │ │
│ │ [Voir] [Modifier] [Supprimer]                │ │
│ └───────────────────────────────────────────────┘ │
│                                                      │
│ [+ Ajouter un chien]                                │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 5. Admin - Gestion Chiens
```
┌─────────────────────────────────────────────────────┐
│ Menu: [Admin] [Chiens] [Cours] [Séances]  [Logout]  │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Gestion des Chiens                                  │
│ [+ Ajouter un chien]                                │
│                                                      │
│ ┌──────┬────────┬──────┬─────┬────────┬──────────┐ │
│ │ ID   │ NomChien│ Race │ Age│ Sexe   │ Propriét │
│ ├──────┼────────┼──────┼─────┼────────┼──────────┤ │
│ │ 1    │ Rex    │ Berger│ 3  │ M      │ Al. Martin│
│ │ 2    │ Luna   │ Lab. │ 2  │ F      │ Al. Martin│
│ │ 3    │ Max    │ Retr.│ 4  │ M      │ B. Dupont│
│ └──────┴────────┴──────┴─────┴────────┴──────────┘
│           Actions            │
│ ┌──────────────┬──────────────┐
│ │ [Modifier]   │ [Supprimer]  │
│ └──────────────┴──────────────┘
```

---

## 💻 Code Source - Extraits Clés

### 1. Entité Chien (Modèle)

```php
// src/Entity/Chien.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: ChienRepository::class)]
class Chien
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $race = null;

    #[ORM\Column(length: 255)]
    private ?string $nomChien = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $age = null;

    #[ORM\Column(length: 7)]
    private ?string $sexe = null;

    #[ORM\OneToMany(targetEntity: Inscription::class, mappedBy: 'chien', 
                   orphanRemoval: true, cascade: ['remove'])]
    private Collection $inscriptions;

    #[ORM\ManyToOne(inversedBy: 'chiens')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Proprietaire $proprietaire = null;

    // Getters et Setters
    public function getId(): ?int { return $this->id; }
    public function getNomChien(): ?string { return $this->nomChien; }
    public function setNomChien(string $nomChien): static {
        $this->nomChien = $nomChien;
        return $this;
    }
    // ... autres getters/setters
}
```

### 2. Contrôleur - Liste des Cours

```php
// src/Controller/AccueilController.php

namespace App\Controller;

use App\Repository\CourRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AccueilController extends AbstractController
{
    #[Route('/liste-des-cours', name: 'app_liste_cours')]
    public function listeCours(CourRepository $repository): Response
    {
        // Récupération de tous les cours
        $cours = $repository->findAll();
        
        // Passage au template
        return $this->render('accueil/listeCours.html.twig', [
            'cours' => $cours
        ]);
    }

    #[Route('/details-cour-{id}', name: 'app_details_cour')]
    public function detailsCour(CourRepository $repository, int $id): Response
    {
        // Récupération d'un cours spécifique
        $cour = $repository->find($id);
        
        return $this->render('accueil/detailsCour.html.twig', [
            'cour' => $cour
        ]);
    }
}
```

### 3. Contrôleur Admin - CRUD Chien

```php
// src/Controller/AdminChienController.php

namespace App\Controller;

use App\Entity\Chien;
use App\Form\AdminChienType;
use App\Repository\ChienRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin/chien')]
final class AdminChienController extends AbstractController
{
    // READ: Lister tous les chiens
    #[Route(name: 'app_admin_chien_index', methods: ['GET'])]
    public function listeChiens(ChienRepository $chienRepository): Response
    {
        return $this->render('admin_chien/listeChiens.html.twig', [
            'chiens' => $chienRepository->findAll(),
        ]);
    }

    // CREATE: Ajouter un chien
    #[Route('/ajout', name: 'app_admin_chien_ajout', methods: ['GET', 'POST'])]
    public function ajout(Request $request, EntityManagerInterface $entityManager): Response
    {
        $chien = new Chien();
        $form = $this->createForm(AdminChienType::class, $chien);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($chien);
            $entityManager->flush();
            return $this->redirectToRoute('app_admin_chien_index');
        }

        return $this->render('admin_chien/ajout.html.twig', [
            'chien' => $chien,
            'form' => $form,
        ]);
    }

    // UPDATE: Modifier un chien
    #[Route('/modification-{id}', name: 'app_admin_chien_modif', methods: ['GET', 'POST'])]
    public function modif(Request $request, Chien $chien, 
                         EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(AdminChienType::class, $chien);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();
            return $this->redirectToRoute('app_admin_chien_index');
        }

        return $this->render('admin_chien/modif.html.twig', [
            'chien' => $chien,
            'form' => $form,
        ]);
    }

    // DELETE: Supprimer un chien
    #[Route('/supprimer-{id}', name: 'app_admin_chien_delete', methods: ['POST'])]
    public function delete(Request $request, Chien $chien, 
                          EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$chien->getId(), 
                                    $request->getPayload()->getString('_token'))) {
            $entityManager->remove($chien);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_admin_chien_index');
    }
}
```

### 4. Formulaire Chien (AdminChienType)

```php
// src/Form/AdminChienType.php

namespace App\Form;

use App\Entity\Chien;
use App\Entity\Proprietaire;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

final class AdminChienType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nomChien', TextType::class, [
                'label' => 'Nom du chien',
                'attr' => ['placeholder' => 'Ex: Rex']
            ])
            ->add('race', TextType::class, [
                'label' => 'Race',
                'attr' => ['placeholder' => 'Ex: Berger Allemand']
            ])
            ->add('age', IntegerType::class, [
                'label' => 'Âge (en années)'
            ])
            ->add('sexe', ChoiceType::class, [
                'label' => 'Sexe',
                'choices' => [
                    'Mâle' => 'M',
                    'Femelle' => 'F',
                ],
                'expanded' => true,
            ])
            ->add('proprietaire', EntityType::class, [
                'class' => Proprietaire::class,
                'choice_label' => function(Proprietaire $prop) {
                    return $prop->getPrenom() . ' ' . $prop->getNom();
                },
                'label' => 'Propriétaire'
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Chien::class,
        ]);
    }
}
```

### 5. Repository - Requêtes personnalisées

```php
// src/Repository/ChienRepository.php

namespace App\Repository;

use App\Entity\Chien;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

final class ChienRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Chien::class);
    }

    // Trouver tous les chiens d'un propriétaire
    public function findByProprietaire(int $proprietaireId): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.proprietaire = :id')
            ->setParameter('id', $proprietaireId)
            ->orderBy('c.nomChien', 'ASC')
            ->getQuery()
            ->getResult();
    }

    // Trouver les chiens inscrits à une séance
    public function findBySeance(int $seanceId): array
    {
        return $this->createQueryBuilder('c')
            ->join('c.inscriptions', 'i')
            ->where('i.seance = :seanceId')
            ->setParameter('seanceId', $seanceId)
            ->getQuery()
            ->getResult();
    }
}
```

### 6. Template Twig - Liste des cours

```twig
{# templates/accueil/listeCours.html.twig #}

{% extends "base.html.twig" %}

{% block title %}Liste des Cours - canisPro{% endblock %}

{% block content %}
<div class="container">
    <h1>Nos Cours</h1>
    
    {% if cours %}
        <div class="row">
            {% for cour in cours %}
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">{{ cour.nomCour }}</h5>
                        <p class="card-text">{{ cour.description }}</p>
                        <ul class="list-unstyled">
                            <li><strong>Type:</strong> {{ cour.type.libelleType }}</li>
                            <li><strong>Niveau:</strong> {{ cour.niveau.libelleNiveau }}</li>
                            <li><strong>Prix:</strong> {{ cour.prix }}€</li>
                        </ul>
                    </div>
                    <div class="card-footer bg-transparent">
                        <a href="{{ path('app_details_cour', {'id': cour.id}) }}" 
                           class="btn btn-primary">Voir détails</a>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
    {% else %}
        <div class="alert alert-info">
            Aucun cours disponible pour le moment.
        </div>
    {% endif %}
</div>
{% endblock %}
```

### 7. Configuration des routes

```yaml
# config/routes.yaml

# Contrôleurs avec attribut Route (auto-détectés)
controllers:
    resource: routing.controllers
    type: attribute

# Exemple de route statique
app_homepage:
    path: /
    controller: App\Controller\AccueilController::index

# Exemple route REST (admin)
admin_chien:
    path: /admin/chien
    controller: App\Controller\AdminChienController::listeChiens
```

### 8. Configuration Doctrine (services.yaml)

```yaml
# config/packages/doctrine.yaml

doctrine:
    dbal:
        driver: 'pdo_mysql'
        host: '%env(resolve:DATABASE_HOST)%'
        port: '%env(resolve:DATABASE_PORT)%'
        dbname: '%env(resolve:DATABASE_NAME)%'
        user: '%env(resolve:DATABASE_USER)%'
        password: '%env(resolve:DATABASE_PASSWORD)%'
        charset: utf8mb4

    orm:
        auto_mapping: true
        mappings:
            App:
                is_bundle: false
                dir: '%kernel.project_dir%/src/Entity'
                prefix: 'App\Entity'
                alias: App
```

### 9. Configuration Sécurité

```yaml
# config/packages/security.yaml

security:
    password_hashers:
        App\Entity\User:
            algorithm: bcrypt

    providers:
        app_user_provider:
            entity:
                class: App\Entity\User
                property: email

    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false

        main:
            lazy: true
            provider: app_user_provider
            form_login:
                login_path: app_login
                check_path: app_login
                default_target_path: app_accueil
            logout:
                path: app_logout

    access_control:
        - { path: ^/admin, roles: ROLE_ADMIN }
        - { path: ^/membre, roles: ROLE_USER }
```

---

## 🚀 Installation et Déploiement

### Prérequis
- PHP ≥ 8.4
- Composer
- MySQL/MariaDB
- Node.js (optionnel, pour les assets)

### Installation locale

```bash
# 1. Cloner le repository
git clone https://github.com/[votre-compte]/canisPro.git
cd canisPro

# 2. Installer les dépendances PHP
composer install

# 3. Configurer la base de données
cp .env .env.local
# Éditer .env.local et ajouter vos paramètres DB

# 4. Créer la base de données
php bin/console doctrine:database:create

# 5. Exécuter les migrations
php bin/console doctrine:migrations:migrate

# 6. Charger les données de test (optionnel)
php bin/console doctrine:fixtures:load

# 7. Démarrer le serveur
symfony serve
# Accéder à http://localhost:8000
```

### Configuration .env

```bash
DATABASE_URL="mysql://user:password@localhost:3306/canisPro"
MAILER_DSN=null://null
APP_ENV=dev
APP_DEBUG=1
```

---

## 📚 Structure des Formulaires

### Formulaire AdminChienType
- **Champs** : nomChien, race, age, sexe, proprietaire
- **Validation** : Required, Length, Type
- **Bootstrap** : Classes Bootstrap appliquées

### Formulaire ProprietaireType
- **Champs** : nom, prenom, mail, tel, adresse
- **Validation** : Email, Required
- **Intégration** : User associé

---

## 🔒 Sécurité et Rôles

### Rôles définis
- **ROLE_USER** : Propriétaires connectés (accès /membre)
- **ROLE_ADMIN** : Administrateurs (accès /admin)

### Protection CSRF
```php
// Tous les formulaires sont protégés par token CSRF
// Appliqué automatiquement par Symfony
```

### Accès contrôlé
```yaml
- /admin/* → Réservé ROLE_ADMIN
- /membre/* → Réservé ROLE_USER (propriétaires)
- /accueil/* → Public
```

---

## 📝 Notes de Développement

### Points importants
1. Les migrations Doctrine gèrent le schéma de BD
2. Les entités utilisent les attributs PHP 8 (#[ORM\...])
3. Les repositories contiennent les requêtes personnalisées
4. Les formulaires gèrent la validation côté serveur
5. Twig offre une syntaxe propre pour les templates

### Conventions
- Noms de champs en camelCase (ex: `nomChien`)
- Noms de tables en snake_case en BD (ex: `nom_chien`)
- Routes cohérentes avec le module

---

## 📞 Support et Contact

Pour toute question ou suggestion concernant ce projet, veuillez contacter:
- **Email** : contact@canispro.fr
- **GitHub Issues** : [Créer une issue]
- **Documentation** : Voir ce fichier

---

**Version** : 1.0  
**Dernière mise à jour** : 23 Mars 2026  
**Auteur** : Équipe canisPro
