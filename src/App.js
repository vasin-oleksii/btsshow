import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import Homepage from "./pages/homepage";
import Projects from "./pages/projects";
import ReadArticle from "./pages/readArticle";
import Contact from "./pages/contact";
// import Notfound from "./pages/404";
import CV from "./pages/cv";
import Competences from "./pages/competences";
import Stages from "./pages/stages";
import HabitatStage from "./pages/habitatStage";
import Habitat2026Stage from "./pages/habitat2026Stage";
import Benevolat from "./pages/benevolat";
import Veille from "./pages/veille";
import BilletterieFa from "./pages/billetterieFa";
import PokemonQuiz from "./pages/pokemonQuiz";
import DuneWave from "./pages/duneWave";
import Partage from "./pages/partage";
import CanisPro from "./pages/canisPro";

import { TRACKING_ID } from "./data/tracking";
import "./app.css";

function App() {
	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.initialize(TRACKING_ID);
		}
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/article/:slug" element={<ReadArticle />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/cv" element={<CV />} />
				<Route path="/competences" element={<Competences />} />
				<Route path="/stages" element={<Stages />} />
				<Route
					path="/stage/habitat-humanisme"
					element={<HabitatStage />}
				/>
				<Route
					path="/stage/habitat-humanisme-2026"
					element={<Habitat2026Stage />}
				/>
				<Route path="/benevolat" element={<Benevolat />} />
				<Route path="/veille" element={<Veille />} />
				<Route
					path="/project/billetterie-fa"
					element={<BilletterieFa />}
				/>
				<Route
					path="/project/pokemon-quiz"
					element={<PokemonQuiz />}
				/>
				<Route path="/project/dune-wave" element={<DuneWave />} />
				<Route path="/project/partage" element={<Partage />} />
				<Route path="/project/canispro" element={<CanisPro />} />
				{/* <Route path="*" element={<Notfound />} /> */}
			</Routes>
		</div>
	);
}

export default App;
