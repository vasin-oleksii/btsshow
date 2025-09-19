import React from "react";
import { Link } from "react-router-dom";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Stage = () => {
	return (
		<div className="stage">
			<Link to="/stages" className="stage-link">
				<Card
					icon={faGraduationCap}
					title="Stage"
					body={
						<div className="works-body">
							<div className="work">
								<img
									src="habitat.png"
									alt="Habitat et Humanisme"
									className="work-image"
								/>
								<div className="work-title">
									Habitat et Humanisme
								</div>
								<div className="work-subtitle">
									Stagiaire Développement Web
								</div>
								<div className="work-duration">2025</div>
							</div>
						</div>
					}
				/>
			</Link>
		</div>
	);
};

export default Stage;
