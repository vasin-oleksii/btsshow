import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCode } from "@fortawesome/free-solid-svg-icons";

import "./styles/project.css";

const Project = (props) => {
	const { logo, preview, isCode, title, description, linkText, link } = props;

	const isExternal = /^https?:\/\//.test(link);

	const inner = (
		<div className="project-container">
			{isCode ? (
				<div className="project-preview project-preview-code">
					<FontAwesomeIcon icon={faCode} />
				</div>
			) : (
				<div className="project-preview">
					<img src={preview} alt={title} loading="lazy" />
				</div>
			)}
			<div className="project-body">
				<div className="project-logo">
					<img src={logo} alt="logo" />
				</div>
				<div className="project-title">{title}</div>
				<div className="project-description">{description}</div>
				<div className="project-link">
					<div className="project-link-icon">
						<FontAwesomeIcon icon={isCode ? faCode : faLink} />
					</div>

					<div className="project-link-text">{linkText}</div>
				</div>
			</div>
		</div>
	);

	return (
		<React.Fragment>
			<div className={`project${isCode ? " project-code" : ""}`}>
				{isExternal ? (
					<a href={link} target="_blank" rel="noopener noreferrer">
						{inner}
					</a>
				) : (
					<Link to={link}>{inner}</Link>
				)}
			</div>
		</React.Fragment>
	);
};

export default Project;
