import React from "react";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/stage.css";

const Stage = () => {
	return (
		<div className="stage">
			<Card
				icon={faGraduationCap}
				title="Stage"
				body={
					<div className="stage-body">
						<div className="stage-item">
							<img
								src="habitat.png"
								alt="Habitat et Humanisme"
								className="stage-image"
							/>
							<div className="stage-title">
								Habitat et Humanisme
							</div>
							<div className="stage-subtitle">
								Stagiaire Développement Web
							</div>
							<div className="stage-duration">2025</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Stage;
