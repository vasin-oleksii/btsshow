import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import Homepage from "./pages/homepage";
import Projects from "./pages/projects";
import Articles from "./pages/articles";
import ReadArticle from "./pages/readArticle";
import Contact from "./pages/contact";
// import Notfound from "./pages/404";
import CV from "./pages/cv";
import Competences from "./pages/competences";
import Stages from "./pages/stages";
import Veille from "./pages/veille";

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
				<Route path="/articles" element={<Articles />} />
				<Route path="/article/:slug" element={<ReadArticle />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/cv" element={<CV />} />
				<Route path="/competences" element={<Competences />} />
				<Route path="/stages" element={<Stages />} />
				<Route path="/veille" element={<Veille />} />
				{/* <Route path="*" element={<Notfound />} /> */}
			</Routes>
		</div>
	);
}

export default App;
