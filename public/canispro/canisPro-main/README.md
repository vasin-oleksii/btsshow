# canisPro - Gestion de Cours de Dressage Canin

> 🐕 Une application web moderne pour gérer des cours de dressage canin

## 📌 Résumé Rapide

**canisPro** est une plateforme complète de gestion de cours de dressage pour chiens permettant :

- 👤 Propriétaires : S'inscrire, gérer leur profil et leurs chiens, voir les cours disponibles
- 📚 Consultants : Visualiser les cours, séances et disponibilités
- ⚙️ Administrateurs : Gérer complètement les cours, séances, chiens et inscriptions

---

## 🎯 Fonctionnalités Clés

### Pour les Propriétaires (Membres)
✅ Tableau de bord personnel  
✅ Gestion des chiens  
✅ Inscription aux séances  
✅ Historique des participations  

### Pour le Public
✅ Visualisation des cours  
✅ Filtrage par type et niveau  
✅ Consultation des séances  
✅ Inscription en ligne  

### Pour les Administrateurs
✅ CRUD Chiens  
✅ CRUD Cours  
✅ CRUD Séances  
✅ CRUD Inscriptions  
✅ CRUD Propriétaires/Utilisateurs  

---

## 🏗️ Architecture

```
Model (Entity)      → Controller (Business Logic)    → View (Twig Template)
Chien, Propriétaire → AccueilController, AdminChien → listeCours.html.twig
```

### Entités Principales
- **User** - Utilisateurs (login)
- **Proprietaire** - Propriétaires de chiens
- **Chien** - Les chiens enregistrés
- **Cour** - Les cours disponibles
- **Seance** - Les séances de cours
- **Inscription** - Inscriptions chien-séance (Many-to-Many via table liaison)
- **Type** - Types de cours (Obéissance, Agility, etc.)
- **Niveau** - Niveaux (Débutant, Intermédiaire, Avancé)

---

## 🗄️ Modèle de Données

```
Proprietaire (1) ──→ (n) Chien
User (1) ──→ (1) Proprietaire
Type (1) ──→ (n) Cour
Niveau (1) ──→ (n) Cour
Cour (1) ──→ (n) Seance
Chien (n) ──→ (n) Seance  [via Inscription]
```

---

## 🚀 Installation Rapide

### Prérequis
- PHP 8.4+
- Composer
- MySQL/MariaDB

### Étapes

```bash
# 1. Cloner
git clone https://github.com/[vous]/canisPro.git
cd canisPro

# 2. Dépendances
composer install

# 3. Configuration .env.local
cp .env .env.local
# Éditer DATABASE_URL

# 4. Base de données
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate

# 5. Démarrer
symfony serve
```

📍 Accéder à **http://localhost:8000**

---

## 📸 Écrans Principaux

### 🏠 Accueil
Présentation avec accès au catalogue de cours

### 📖 Liste des Cours
Tous les cours avec filtres (type, niveau, prix)

### 👤 Profil Membre
Tableau de bord : infos perso + gestion des chiens

### 📋 Admin
Interface complète de gestion (chiens, cours, séances)

---

## 🔒 Sécurité & Rôles

| Rôle | Accès |
|------|-------|
| **ROLE_USER** | `/accueil/*` • `/membre/*` |
| **ROLE_ADMIN** | `/admin/*` • Toutes fonctions |
| **Public** | `/` • `/liste-des-cours` |

### Protections
- ✅ Authentification Symfony Security
- ✅ Tokens CSRF sur tous les formulaires
- ✅ Hash Bcrypt pour les mots de passe

---

## 📚 Routes Principales

### Publiques
```
GET  /                          Accueil
GET  /liste-des-cours           Voir les cours
GET  /details-cour/{id}         Détails d'un cours
POST /s-inscrire                Inscription chien
```

### Membre
```
GET  /membre                    Tableau de bord
GET  /membre/{id}               Modifier profil
POST /membre/chien-ajout        Ajouter un chien
POST /membre/chien-modification/{id}  Modifier chien
```

### Admin
```
GET  /admin/chien               Liste chiens
POST /admin/chien/ajout         Créer chien
GET  /admin/cour                Liste cours
POST /admin/cour/ajout          Créer cours
... (autres modules admin)
```

---

## 💻 Stack Technique

| Couche | Technologie |
|--------|-------------|
| **Backend** | Symfony 8.0 |
| **Language** | PHP 8.4 |
| **Database** | MySQL + Doctrine ORM |
| **Template** | Twig |
| **Frontend** | JavaScript (Stimulus) + CSS |
| **Auth** | Security Bundle Symfony |

---

## 📂 Structure du Projet

```
src/
├── Entity/          Modèles (Doctrine)
├── Controller/      Contrôleurs (logique métier)
├── Form/            Formulaires Symfony
├── Repository/      Requêtes personnalisées
└── DataFixtures/    Données de test

templates/
├── accueil/         Pages publiques
├── membre/          Pages membres
├── admin_chien/     Admin chiens
└── ...

config/
├── routes.yaml      Routage
├── services.yaml    Services
└── packages/        Configuration bundles

public/
└── index.php        Point d'entrée web
```

---

## ⚙️ Configuration

### Variables d'environnement (.env.local)

```env
APP_ENV=dev
APP_DEBUG=1
DATABASE_URL="mysql://user:password@localhost:3306/canisPro"
MAILER_DSN=null://null
```

---

## 🧪 Tests & Commandes Utiles

```bash
# Routes
php bin/console debug:router

# Base de données
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load

# Cache
php bin/console cache:clear

# Serveur
symfony serve
```

---

## 📞 Support

- 📧 **Email** : contact@canispro.fr
- 🐛 **Issues** : Créer une issue sur GitHub
- 📖 **Doc complète** : Voir `DOCUMENTATION_COMPLETE.md` ou `DOCUMENTATION.html`

---

## 📄 Licence

Propriétaire - Voir LICENSE.md

---

## 👥 Contribuer

1. Fork le projet
2. Créer une branche (`git checkout -b feature/...`)
3. Commit (`git commit -am 'Add feature'`)
4. Push (`git push origin feature/...`)
5. Créer une Pull Request

---

## 📋 Checklist Développeur

- [ ] Récupérer le code via Git
- [ ] Installer les dépendances (`composer install`)
- [ ] Configurer la base de données
- [ ] Exécuter les migrations
- [ ] Charger les fixtures (optionnel)
- [ ] Démarrer le serveur local
- [ ] Accéder à http://localhost:8000

---

**Dernière mise à jour** : 23 Mars 2026  
**Version** : 1.0
