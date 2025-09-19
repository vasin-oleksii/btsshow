import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Travail"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Miratech_Logo.jpg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">Miratech</div>
							<div className="work-subtitle">
								Ingénieur Logiciel
							</div>
							<div className="work-duration">
								2024 Oct - Présent
							</div>
						</div>

						<div className="work">
							<img
								src="https://media.licdn.com/dms/image/v2/D560BAQERO7AVxNWXaA/company-logo_200_200/company-logo_200_200/0/1732511591958/digital_minds_group_logo?e=2147483647&v=beta&t=AY6YTONR2fOxaYJqE-e8PYvbCItAOz3UstLC_t97PhY"
								alt="twitter"
								className="work-image"
							/>
							<div className="work-title">Digital Minds</div>
							<div className="work-subtitle">
								Ingénieur Logiciel
							</div>
							<div className="work-duration">
								2024 Avr - 2024 Juin
							</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
