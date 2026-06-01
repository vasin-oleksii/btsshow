export const questions = [
  {
    id: 12,
    question: 'Qu’est-ce qu’un pare-feu ?',
    type: 'choix_unique',
    reponses: [
      {
        texte: 'Un logiciel qui empêche les accès non autorisés au réseau',
        correcte: true,
      },
      {
        texte: 'Un antivirus',
        correcte: false,
      },
      {
        texte: 'Un mot de passe complexe',
        correcte: false,
      },
      {
        texte: 'Un système de sauvegarde automatique',
        correcte: false,
      },
    ],
  },
  {
    id: 13,
    question: 'Quel est le principal objectif d’un antivirus ?',
    type: 'choix_unique',
    reponses: [
      {
        texte: 'Supprimer les spams',
        correcte: false,
      },
      {
        texte:
          'Détecter, prévenir et supprimer les logiciels malveillants',
        correcte: true,
      },
      {
        texte: 'Améliorer la vitesse de l’ordinateur',
        correcte: false,
      },
      {
        texte: 'Protéger les données dans le cloud',
        correcte: false,
      },
    ],
  },
  {
    id: 14,
    question: 'Comment sécuriser un réseau Wi-Fi domestique ?',
    type: 'choix_multiple',
    reponses: [
      {
        texte: 'Utiliser un mot de passe fort',
        correcte: true,
      },
      {
        texte: 'Désactiver le SSID (nom du réseau)',
        correcte: false,
      },
      {
        texte: 'Activer le chiffrement WPA3',
        correcte: true,
      },
      {
        texte: 'Partager le mot de passe avec tout le monde',
        correcte: false,
      },
    ],
  },
  {
    id: 15,
    question: 'Qu’est-ce qu’une attaque par déni de service (DDoS) ?',
    type: 'choix_unique',
    reponses: [
      {
        texte:
          'Une attaque visant à surcharger un serveur pour le rendre inaccessible',
        correcte: true,
      },
      {
        texte: 'Une méthode pour pirater un mot de passe',
        correcte: false,
      },
      {
        texte: 'Une technique pour effacer des données sur un disque dur',
        correcte: false,
      },
      {
        texte: "Une attaque ciblant les utilisateurs d'un réseau",
        correcte: false,
      },
    ],
  },
  {
    id: 16,
    question: 'Quel est le risque d’utiliser un réseau Wi-Fi public ?',
    type: 'choix_unique',
    reponses: [
      {
        texte:
          'Les pirates peuvent intercepter les données transmises sur le réseau',
        correcte: true,
      },
      {
        texte: "L'accès à Internet peut être limité",
        correcte: false,
      },
      {
        texte: "Cela consomme plus de batterie sur l'appareil",
        correcte: false,
      },
      {
        texte: 'Le Wi-Fi public est toujours sécurisé',
        correcte: false,
      },
    ],
  },
  {
    id: 17,
    question:
      'Pourquoi est-il déconseillé de cliquer sur des liens dans des emails non sollicités ?',
    type: 'choix_unique',
    reponses: [
      {
        texte: 'Ils peuvent contenir des logiciels malveillants',
        correcte: true,
      },
      {
        texte: "Ils augmentent la mémoire utilisée par l'ordinateur",
        correcte: false,
      },
      {
        texte: "Ils bloquent automatiquement l'accès à Internet",
        correcte: false,
      },
      {
        texte: 'Ils ralentissent votre ordinateur',
        correcte: false,
      },
    ],
  },
  {
    id: 18,
    question: "Que signifie l'acronyme VPN ?",
    type: 'choix_unique',
    reponses: [
      {
        texte: 'Virtual Private Network',
        correcte: true,
      },
      {
        texte: 'Verified Personal Network',
        correcte: false,
      },
      {
        texte: 'Virtual Protected Node',
        correcte: false,
      },
      {
        texte: 'Verified Protocol Network',
        correcte: false,
      },
    ],
  },
  {
    id: 19,
    question:
      'Quelle est la meilleure pratique pour gérer les mots de passe ?',
    type: 'choix_unique',
    reponses: [
      {
        texte: 'Les écrire dans un fichier texte sur son ordinateur',
        correcte: false,
      },
      {
        texte: 'Utiliser un gestionnaire de mots de passe',
        correcte: true,
      },
      {
        texte: 'Utiliser le même mot de passe pour tous ses comptes',
        correcte: false,
      },
      {
        texte: 'Ne jamais changer ses mots de passe',
        correcte: false,
      },
    ],
  },
  {
    id: 20,
    question:
      "Pourquoi est-il risqué d'utiliser des clés USB non sécurisées ?",
    type: 'choix_unique',
    reponses: [
      {
        texte:
          'Elles peuvent contenir des logiciels malveillants ou des virus',
        correcte: true,
      },
      {
        texte: 'Elles sont lentes à transférer les fichiers',
        correcte: false,
      },
      {
        texte: 'Elles effacent automatiquement les données après usage',
        correcte: false,
      },
      {
        texte: 'Elles sont interdites par la loi',
        correcte: false,
      },
    ],
  },
];
