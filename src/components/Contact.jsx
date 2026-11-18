"use client";

import React, { useState } from "react";
import { SplitText } from "../utils/textSplitter";
import { siteData } from "../data/siteData";

export default function Contact() {
  const [copyText, setCopyText] = useState("Copy email");

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(siteData.email).then(
        () => {
          setCopyText("Copied");
          setTimeout(() => setCopyText("Copy email"), 1800);
        },
        () => {
          setCopyText("Press ⌘C");
          setTimeout(() => setCopyText("Copy email"), 1800);
        }
      );
    } catch {
      setCopyText("Press ⌘C");
      setTimeout(() => setCopyText("Copy email"), 1800);
    }
  };

  return (
    <section
      className="st"
      id="contact"
      data-label="Contact"
      data-gap="3.4"
      data-hold="1.2"
      data-a="0.44,-0.07"
      data-ma="0.47,-0.07"
      data-end="1"
    >
      <div
        className="el"
        data-p="0,-0.06"
        data-mp="0,-0.06"
        data-z="0"
        data-f="0,0"
      >
        <div className="ct-wrap">
          <h2
            className="d bb ct-one split"
            aria-label="Let's make something"
          >
            <SplitText text="Let's make something" />
          </h2>
          <span className="para" aria-hidden="true">
            <svg viewBox="0 0 60 100">
              <g className="canopy">
                <path
                  d="M2 22C2 6 15 0 30 0s28 6 28 22Q51 17 44 22 37 17 30 22 23 17 16 22 9 17 2 22Z"
                  fill="var(--line)"
                />
                <path
                  d="M30 0Q20 9 16 22M30 0Q40 9 44 22"
                  stroke="var(--bg)"
                  strokeWidth="1.2"
                  fill="none"
                  opacity=".5"
                />
                <path
                  d="M3 22 29 61M30 22 29.5 61M30 22 30.5 61M57 22 31 61"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </g>
              <g transform="translate(12 44)">
                <circle cx="18" cy="9" r="4.6" fill="currentColor" />
                <path
                  d="M18 15 18 28M18 17 12 24 15 30M18 17 24 24 21 30M18 28 11 33 6 37M18 28 25 33 30 37"
                  stroke="currentColor"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            </svg>
          </span>
        </div>
      </div>

      <div
        className="el"
        data-p="0,0.13"
        data-mp="0,0.1"
        data-z="-.12"
        data-f="0,.1"
      >
        <div className="ct-row">
          <span className="ct-mail" id="mail">
            {siteData.email}
          </span>
          <button
            type="button"
            className="pill"
            id="copy"
            onClick={handleCopy}
          >
            {copyText}
          </button>
        </div>
      </div>

      <div
        className="el"
        data-p="0,0.36"
        data-mp="0,0.34"
        data-z="-.2"
        data-f="0,.1"
      >
        <div className="ct-foot mono">
          <a
            href={siteData.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href={siteData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="/services">Services</a>
          <a href="/faq">FAQ</a>
          <a href="/saratoga-springs-brand-designer">Saratoga Springs</a>
          <a href="/freelance-brand-designer">Freelance</a>
          <span>© 2026 Dhruvin</span>
        </div>
      </div>
    </section>
  );
}
