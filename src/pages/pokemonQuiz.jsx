import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faUpRightFromSquare,
	faGamepad,
	faShieldHalved,
	faCode,
	faRobot,
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

// Démo en ligne déjà déployée.
const DEMO_URL = "https://pokemon-quize.vercel.app/";

const IMG = "/projects/pokemon-quiz";

const TECHS = ["React", "Hooks", "JavaScript", "CSS Modules", "Vercel"];

const CODE_QUESTIONS = `export const questions = [
  {
    id: 12,
    question: "Qu'est-ce qu'un pare-feu ?",
    type: "choix_unique",
    reponses: [
      {
        texte: "Un logiciel qui empêche les accès non autorisés au réseau",
        correcte: true,
      },
      { texte: "Un antivirus", correcte: false },
      { texte: "Un mot de passe complexe", correcte: false },
      { texte: "Un système de sauvegarde automatique", correcte: false },
    ],
  },
  // ... + 8 autres questions : VPN, DDoS, Wi-Fi, mots de passe...
];`;

const CODE_MENU = `// Chaque réponse de la question devient une action de combat
{asks.reponses.map((ask) => {
  if (ask.correcte === true) {
    // Bonne réponse : on attaque (ou on se soigne ~1 fois sur 3)
    return Math.random() > 0.33 ? (
      <div onClick={() => { onAttack(); alert("Bonne réponse ! 🗡️"); }}>
        {ask.texte}
      </div>
    ) : (
      <div onClick={() => { onHeal(); alert("Bonne réponse ! 💓"); }}>
        {ask.texte}
      </div>
    );
  }
  // Mauvaise réponse : attaque faible
  return (
    <div onClick={() => { onMagic(); alert("Mauvaise réponse 😥"); }}>
      {ask.texte}
    </div>
  );
})}`;

const CODE_DAMAGE = `// Dégâts calculés à partir des stats et de l'écart de niveau
export const attack = ({ attacker, receiver }) => {
  const recu = attacker.attack - (attacker.level - receiver.level) * 1.25;
  return recu - receiver.defense / 2;
};

export const heal = ({ receiver }) =>
  receiver.magic + receiver.level * 0.25;`;

const CODE_AI = `// L'adversaire (IA) choisit une action au hasard à son tour
export const useAIOpponent = (turn) => {
  const [aiChoice, setAIChoice] = useState("");

  useEffect(() => {
    if (turn === 1) {
      const options = ["attack", "magic", "heal"];
      setAIChoice(options[Math.floor(Math.random() * options.length)]);
    }
  }, [turn]);

  return aiChoice;
};`;

const PokemonQuiz = () => {
	const { lightbox, openLightbox, closeLightbox } = useLightbox();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`PokemonQuize | ${INFO.main.title}`}</title>
				<meta
					name="description"
					content="Jeu de combat tour par tour façon Pokémon, transformé en quiz de cybersécurité. Développé en React avec des hooks personnalisés."
				/>
				<meta
					name="keywords"
					content="React, hooks, JavaScript, jeu, quiz, cybersécurité, Pokémon"
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

						<div className="title bf-title">PokemonQuize</div>

						<div className="subtitle bf-subtitle">
							{
								"Jeu de combat tour par tour façon Pokémon, transformé en quiz de cybersécurité — React"
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
								href={DEMO_URL}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon icon={faUpRightFromSquare} />{" "}
								Voir la démo
							</a>
						</div>

						<Figure
							src={`${IMG}/accueil.png`}
							alt="Écran d'accueil du jeu PokemonQuize"
							caption="Écran d'accueil du jeu"
							onOpen={openLightbox}
						/>

						<div className="bf-content">
							{/* Concept */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faGamepad} /> Le
									concept
								</h2>
								<p>
									{
										"PokemonQuize est un petit jeu de combat au tour par tour, inspiré des combats Pokémon. À chaque tour, une question de cybersécurité s'affiche et les réponses possibles deviennent les actions du joueur."
									}
								</p>
								<p>
									{
										"Le joueur (Tarsal) affronte un adversaire contrôlé par l'ordinateur. Le but est de faire tomber les points de vie de l'ennemi à zéro en répondant correctement."
									}
								</p>
							</section>

							{/* Gameplay */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faShieldHalved} />{" "}
									Comment on joue
								</h2>
								<ul>
									<li>
										{
											"Bonne réponse : on lance une attaque (ou un soin de temps en temps)."
										}
									</li>
									<li>
										{
											"Mauvaise réponse : on ne fait qu'une attaque faible."
										}
									</li>
									<li>
										{
											"L'adversaire joue ensuite tout seul, en choisissant une action au hasard."
										}
									</li>
									<li>
										{
											"Les barres de vie et les animations se mettent à jour à chaque tour."
										}
									</li>
								</ul>
								<div className="bf-figure-grid">
									<Figure
										src={`${IMG}/ecran-jeu.png`}
										alt="Écran de combat avec la question et les réponses"
										caption="Combat : question + réponses"
										onOpen={openLightbox}
									/>
									<Figure
										src={`${IMG}/ecran-jeu-hp.png`}
										alt="Écran de combat avec les barres de vie des personnages"
										caption="Barres de vie des personnages"
										onOpen={openLightbox}
									/>
								</div>
							</section>

							{/* Code 1 : questions */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faCode} /> Les
									questions du quiz
								</h2>
								<p>
									{
										"Les questions et leurs réponses sont stockées dans un simple tableau d'objets. Chaque réponse indique si elle est correcte ou non."
									}
								</p>
								<CodeBlock
									label="src/data.js — les questions"
									code={CODE_QUESTIONS}
									language="javascript"
								/>
							</section>

							{/* Code 2 : menu */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faCode} /> Réponse =
									action de combat
								</h2>
								<p>
									{
										"C'est le cœur du jeu : on transforme chaque réponse en action. Une bonne réponse attaque (ou soigne), une mauvaise réponse ne fait qu'une attaque faible."
									}
								</p>
								<CodeBlock
									label="src/components/BattleMenu/BattleMenu.js"
									code={CODE_MENU}
									language="jsx"
								/>
							</section>

							{/* Code 3 : dégâts */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faCode} /> Le calcul
									des dégâts
								</h2>
								<p>
									{
										"Les dégâts dépendent des statistiques du personnage (attaque, défense) et de la différence de niveau entre les deux combattants."
									}
								</p>
								<CodeBlock
									label="src/shared/helpers.js"
									code={CODE_DAMAGE}
									language="javascript"
								/>
							</section>

							{/* Code 4 : IA */}
							<section className="bf-section">
								<h2>
									<FontAwesomeIcon icon={faRobot} />{" "}
									L&apos;adversaire (IA)
								</h2>
								<p>
									{
										"L'adversaire est géré par un hook personnalisé. Quand c'est son tour, il choisit une action au hasard parmi attaquer, lancer un sort ou se soigner."
									}
								</p>
								<CodeBlock
									label="src/hooks/useAIOpponent.js"
									code={CODE_AI}
									language="javascript"
								/>
							</section>

							{/* Bilan */}
							<section className="bf-section">
								<h2>Bilan</h2>
								<p>
									{
										"Ce projet m'a permis de pratiquer React et surtout les hooks personnalisés (useBattleSequence, useAIOpponent) pour séparer la logique du jeu de l'affichage. L'application est découpée en composants et déployée sur Vercel."
									}
								</p>
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

export default PokemonQuiz;
