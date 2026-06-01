# Texte pour « CanisPro : Documentation utilisateur » (Word)

## Avant collage dans Word

Reprenez les **mêmes styles** que dans votre fichier : **Titre 1** pour la grande section (équivalent de « Documentation membre »), **Titre 2** pour chaque grande action, **Titre 3** pour les sous-étapes, **Normal** pour le corps de texte.

Les images du projet : dossier **`docs/admin-manuel/`** (`01-connexion.png` … `08-gestion-seances.png`). Insérez chaque image juste après le paragraphe « Capture à insérer » correspondant.

Vous pouvez ajouter au sommaire Word une entrée de niveau 1 du type **3 Documentation administrateur** et des sous-entrées **3.1**, **3.2**, etc., sur le modèle des sections « Documentation visiteur » et « Documentation membre ».

---

## Bloc à copier-coller (du titre suivant jusqu’à « Fin du bloc »)

Documentation administrateur

Pouvoir se connecter avec un compte administrateur

Pour pouvoir accéder à l’espace d’administration, il vous faudra disposer d’un compte ayant le droit administrateur, puis cliquer sur « Connexion ».

Accueil > Connexion

Il faudra ensuite saisir l’adresse e-mail et le mot de passe du compte administrateur, puis cliquer sur « Se connecter ».

Après une connexion réussie, vous êtes renvoyé vers l’accueil : votre adresse e-mail s’affiche dans la barre de navigation et le menu « Gestion » devient disponible.

Compte de démonstration si les données de test du projet sont chargées : e-mail admin@gmail.com, mot de passe admin. En production, utilisez un compte sécurisé et ne communiquez pas ce mot de passe.

En développement, une barre d’outils technique peut apparaître en bas de l’écran sur les captures ; elle n’apparaît pas en utilisation réelle du site en production.

Capture à insérer : page de connexion — fichier 01-connexion.png.

Pouvoir accéder au menu Gestion

Pour pouvoir ouvrir les fonctions réservées à l’administrateur, il vous faudra cliquer sur « Gestion » dans le menu en haut de la page.

Accueil > Gestion

Le menu déroulant propose « Gestion des chiens », « Gestion des membres », « Gestion des inscriptions », « Gestion des cours » et « Gestion des séances ».

Capture à insérer : menu Gestion ouvert — fichier 02-menu-gestion.png.

Vous pouvez aussi accéder directement aux adresses suivantes sur votre serveur (exemple en local) : http://127.0.0.1:8000/admin/chien pour les chiens, http://127.0.0.1:8000/admin/proprietaire pour les membres, http://127.0.0.1:8000/admin/inscription pour les inscriptions, http://127.0.0.1:8000/admin/cour pour les cours, http://127.0.0.1:8000/admin/seance pour les séances.

Gérer les chiens (administration)

Consulter la liste des chiens

Pour pouvoir consulter l’ensemble des chiens enregistrés, il vous faudra cliquer sur « Gestion des chiens » dans le menu « Gestion ».

Accueil > Gestion > GestionDesChiens

Le tableau affiche notamment l’identifiant, le nom, la race, l’âge, le sexe et le propriétaire (nom et e-mail).

Capture à insérer : liste des chiens — fichier 03-gestion-chiens.png.

Ajouter un chien

Il faudra cliquer sur « Ajouter un chien ».

Accueil > Gestion > GestionDesChiens > AjouterChien

Vous pourrez librement remplir le formulaire (race, nom, âge, sexe, propriétaire associé), puis valider pour enregistrer.

Capture à insérer : formulaire d’ajout d’un chien — fichier 04-ajout-chien.png.

Modifier ou supprimer un chien

Pour modifier un chien, il vous faudra cliquer sur « Modifier » sur la ligne correspondante, ajuster les champs puis enregistrer.

Pour supprimer un chien, il faudra cliquer sur « Supprimer », puis par la suite valider ou non la suppression sur le Pop-Up.

Gérer les membres (propriétaires)

Pour pouvoir gérer les fiches des propriétaires (membres) et leur lien avec les comptes utilisateurs, il vous faudra cliquer sur « Gestion des membres » dans le menu « Gestion ».

Accueil > Gestion > GestionDesMembres

Vous pourrez utiliser les boutons prévus sur la page (ajout, modification, suppression) en suivant les libellés affichés à l’écran. La création d’un membre peut inclure la création ou l’association d’un compte utilisateur selon le formulaire proposé.

Capture à insérer : liste des membres — fichier 05-gestion-membres.png.

Gérer les inscriptions

Pour pouvoir gérer les inscriptions d’un chien à une séance, il vous faudra cliquer sur « Gestion des inscriptions » dans le menu « Gestion ».

Accueil > Gestion > GestionDesInscriptions

Pour ajouter une inscription, il faudra ouvrir le formulaire d’ajout, choisir la séance et le chien concernés, puis valider. Pour modifier une inscription existante, il vous faudra ouvrir la fiche correspondante et mettre à jour les champs. Pour supprimer, il faudra utiliser l’action de suppression prévue et confirmer si un message vous le demande.

Capture à insérer : liste des inscriptions — fichier 06-gestion-inscriptions.png.

Gérer les cours

Pour pouvoir gérer le catalogue des cours (nom, description, prix, type, niveau), il vous faudra cliquer sur « Gestion des cours » dans le menu « Gestion ».

Accueil > Gestion > GestionDesCours

Il faudra cliquer sur « Créer un cours » pour ajouter un cours, remplir le formulaire puis valider. Pour modifier ou supprimer, il vous faudra utiliser les actions prévues sur chaque ligne du tableau ; en cas de suppression, attention aux séances déjà liées au cours.

Capture à insérer : liste des cours — fichier 07-gestion-cours.png.

Gérer les séances

Pour pouvoir planifier les séances (date, heure de début, durée) et les rattacher à un cours, il vous faudra cliquer sur « Gestion des séances » dans le menu « Gestion ».

Accueil > Gestion > GestionDesSeances

Vous pourrez ajouter une séance via le formulaire (choix du cours, date et horaires), puis modifier ou supprimer depuis le tableau ; une confirmation peut être demandée avant suppression.

Capture à insérer : liste des séances — fichier 08-gestion-seances.png.

Pouvoir se déconnecter

Pour quitter la session administrateur, il vous faudra cliquer sur « Déconnexion » à côté de votre adresse e-mail en haut à droite.

Les pages d’administration (chemins commençant par /admin/) ne seront plus accessibles tant que vous ne vous serez pas reconnecté avec un compte administrateur.

Fin du bloc

---

Après collage : appliquez **Titre 1** à la ligne « Documentation administrateur », **Titre 2** aux intitulés du type « Pouvoir… » / « Gérer… », **Titre 3** à « Consulter la liste des chiens », « Ajouter un chien », « Modifier ou supprimer un chien », puis supprimez la ligne « Fin du bloc ».
