const INFO = {
	main: {
		title: "Mon Portfolio",
		name: "Vasin Oleksii",
		email: "vasin.oleksii@gmail.com",
		logo: "../logo.png",
	},

	socials: {
		linkedin: "https://www.linkedin.com/in/oleksii-vasin/",
		instagram: "https://www.instagram.com/vasin.oleksii/",
		github: "https://github.com/vasin-oleksii",
	},

	homepage: {
		title: "Développeur Web Full-Stack",
		description:
			"Je m'appelle Vasin Oleksii, étudiant en deuxième année de BTS SIO SLAM au lycée Saint-John Perse à Pau. Passionné par le développement web, je possède déjà une expérience concrète dans la création de projets front-end et full-stack.",
	},

	about: {
		title: "À propos de moi",
		description:
			"Je suis un développeur passionné avec une expérience en développement web et mobile. J'ai travaillé sur divers projets utilisant React, Next.js, Ruby on Rails et d'autres technologies modernes. Je suis toujours à la recherche de nouveaux défis et opportunités pour développer mes compétences.",
	},

	work: {
		title: "Expérience Professionnelle",
		description: [
			{
				company: "Miratech",
				position: "Ingénieur Logiciel Junior",
				period: "Depuis Octobre 2024",
				description:
					"Développement fullstack (React, Next.js, Ruby on Rails)",
				logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Miratech_Logo.jpg",
			},
			{
				company: "DigitalMindUA",
				position: "Développeur Frontend Junior",
				period: "Avril – Juin 2024",
				description:
					"Développement avec React Native, intégration de systèmes de paiement, API externes",
				logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX2jfJBVbV3AHlWbCpuQApG7m9QQF09KgV7Ic_10XkVOYxi0KVi_xExlZSZIap2LwQTM&usqp=CAU",
			},
			{
				company: "Habitat et Humanisme Pyrénées Adour",
				position: "Stagiaire Développement Web",
				period: "2025",
				description:
					"Développement web et numérique pour l'amélioration de la plateforme de gestion des logements sociaux",
				logo: "https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=H&H",
			},
		],
	},

	articles: {
		title: "Veille Technologique",
		description:
			"Suivi des tendances et bonnes pratiques autour de React.js et l'écosystème front-end moderne.",
	},

	projects: [
		{
			title: "CanisPro — Symfony",
			description:
				"Application web de gestion d'un club d'éducation canine : cours, séances, chiens et inscriptions. Développée avec Symfony 8, PHP 8.4, Doctrine ORM et MySQL.",
			logo: "/projects/canispro/logo.png",
			preview: "/projects/canispro/accueil.png",
			linkText: "Voir le projet",
			link: "/project/canispro",
		},
		{
			title: "Billetterie du Fâ — PHP/MVC",
			description:
				"Application complète de réservation de billets pour le site archéologique du Fâ. Architecture MVC en PHP 8, base de données MySQL et génération de factures PDF.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/php/php.png",
			preview: "/projects/billetterie-fa/accueil.png",
			linkText: "Voir le projet",
			link: "/project/billetterie-fa",
		},
		{
			title: "PokemonQuize",
			description:
				"Jeu de combat tour par tour façon Pokémon, transformé en quiz de cybersécurité. Développé en React avec des hooks personnalisés.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			preview: "/projects/pokemon-quiz/accueil.png",
			linkText: "Voir le projet",
			link: "/project/pokemon-quiz",
		},
		{
			title: "Dune Wave",
			description:
				"Boutique en ligne de matériel de surf et de glisse, réalisée en projet d'école. HTML, CSS et JavaScript.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
			preview: "/projects/dune-wave/accueil.png",
			linkText: "Voir le projet",
			link: "/project/dune-wave",
		},
		{
			title: "Partage",
			description:
				"Application web pour partager rapidement du texte et des liens. Développée en React avec une base de données MongoDB.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			preview: "/projects/partage/accueil.png",
			linkText: "Voir le projet",
			link: "/project/partage",
		},
		{
			title: "Site Web personnel (CV)",
			description:
				"Le code source de ce portfolio. Site personnel pour présenter mon CV et mes projets. HTML, CSS, JavaScript (React). Compétence 1.3 du BTS SIO.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			isCode: true,
			linkText: "Voir le code",
			link: "https://github.com/vasin-oleksii/btsshow",
		},
	],
};

export default INFO;
