import React, { useState, useCallback, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXmark,
	faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";

import "../../pages/styles/billetterieFa.css";

export const CodeBlock = ({ label, code, language = "text" }) => (
	<div className="bf-code">
		{label && <div className="bf-code-label">{label}</div>}
		<SyntaxHighlighter
			language={language}
			style={vscDarkPlus}
			customStyle={{
				margin: 0,
				padding: "16px",
				background: "transparent",
				fontSize: "0.82rem",
			}}
			codeTagProps={{
				style: {
					fontFamily:
						'"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace',
				},
			}}
		>
			{code}
		</SyntaxHighlighter>
	</div>
);

export const Figure = ({ src, alt, caption, onOpen }) => (
	<figure className="bf-figure">
		<button
			type="button"
			className="bf-figure-btn"
			onClick={() => onOpen(src, caption || alt)}
			aria-label={`Agrandir : ${caption || alt}`}
		>
			<img src={src} alt={alt} loading="lazy" />
			<span className="bf-figure-zoom">
				<FontAwesomeIcon icon={faMagnifyingGlassPlus} />
			</span>
		</button>
		{caption && <figcaption>{caption}</figcaption>}
	</figure>
);

export const useLightbox = () => {
	const [lightbox, setLightbox] = useState(null);

	const openLightbox = useCallback((src, caption) => {
		setLightbox({ src, caption });
	}, []);

	const closeLightbox = useCallback(() => setLightbox(null), []);

	useEffect(() => {
		if (!lightbox) return undefined;
		const onKey = (e) => {
			if (e.key === "Escape") closeLightbox();
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
		};
	}, [lightbox, closeLightbox]);

	return { lightbox, openLightbox, closeLightbox };
};

export const Lightbox = ({ lightbox, onClose }) => {
	if (!lightbox) return null;
	return (
		<div
			className="bf-lightbox"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
		>
			<button
				type="button"
				className="bf-lightbox-close"
				onClick={onClose}
				aria-label="Fermer"
			>
				<FontAwesomeIcon icon={faXmark} />
			</button>
			<img
				className="bf-lightbox-img"
				src={lightbox.src}
				alt={lightbox.caption}
				onClick={(e) => e.stopPropagation()}
			/>
			{lightbox.caption && (
				<div className="bf-lightbox-caption">{lightbox.caption}</div>
			)}
		</div>
	);
};
