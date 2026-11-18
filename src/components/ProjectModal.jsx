"use client";

import React, { useEffect, useRef } from "react";
import { siteData } from "../data/siteData";

export default function ProjectModal({
  activeProjectIndex,
  isOpen,
  onClose,
  onNextProject,
}) {
  const modalRef = useRef(null);

  const project =
    activeProjectIndex >= 0 ? siteData.projects[activeProjectIndex] : null;
  const nextProject =
    activeProjectIndex >= 0
      ? siteData.projects[(activeProjectIndex + 1) % siteData.projects.length]
      : null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  const descParagraphs = project.description
    .split("\n\n")
    .filter(Boolean);

  return (
    <>
      <div
        id="proj"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className={isOpen ? "show" : ""}
        style={{
          clipPath: isOpen ? "inset(0)" : "inset(50% 50% 50% 50%)",
          transition: "clip-path 0.9s cubic-bezier(0.7, 0, 0.2, 1)",
        }}
      >
        <div className="pv">
          {/* Left Column: Details */}
          <div className="pv-l">
            <span className="mono">
              {String(activeProjectIndex + 1).padStart(2, "0")} / 06
            </span>
            <h2 className="d b9">{project.title}</h2>
            <div>
              <span className="mono">Overview</span>
              <div style={{ marginTop: "12px" }}>
                {descParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <dl className="pv-dl">
              <dt>Client</dt>
              <dd>{project.client}</dd>
              <dt>Services</dt>
              <dd>{project.services.join(", ")}</dd>
            </dl>

            <button
              type="button"
              className="pv-next"
              id="pvn"
              onClick={onNextProject}
            >
              <span className="mono">Next project</span>
              <span className="d t1">{nextProject?.title}</span>
            </button>
          </div>

          {/* Right Column: Images & Media */}
          <div className="pv-r">
            {project.images.map((imgUrl, i) => (
              <figure key={i}>
                <img
                  src={imgUrl}
                  alt={`${project.title} image ${i + 1}`}
                  loading={i > 1 ? "lazy" : "eager"}
                  decoding="async"
                />
              </figure>
            ))}

            {project.videos &&
              project.videos.map((vid, vIdx) => (
                <figure key={`vid-${vIdx}`} className="pv-vid mid">
                  <video
                    src={vid.src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                </figure>
              ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="pv-x"
        id="pvx"
        aria-label="Close project"
        onClick={onClose}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
      >
        ×
      </button>
    </>
  );
}
