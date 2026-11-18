"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Numbers from "../components/Numbers";
import Journey from "../components/Journey";
import BeyondDesign from "../components/BeyondDesign";
import WhatIDo from "../components/WhatIDo";
import SelectedWork from "../components/SelectedWork";
import Distinkt from "../components/Distinkt";
import Contact from "../components/Contact";
import ProjectModal from "../components/ProjectModal";
import WipeTransition from "../components/WipeTransition";
import FxCanvas from "../components/FxCanvas";
import Hud from "../components/Hud";
import { siteData } from "../data/siteData";
import { useLenis } from "../hooks/useLenis";
import { useVirtualCameraEngine } from "../hooks/useVirtualCameraEngine";

export default function Home() {
  useLenis();

  const fxRef = useRef(null);
  const wipeRef = useRef(null);
  const thumbsDnQuoteIdx = useRef(0);

  const [activeProjectIdx, setActiveProjectIdx] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hudState, setHudState] = useState({ number: "01", label: "Home" });

  const handleSectionChange = useCallback((label, number) => {
    setHudState({
      number: String(number).padStart(2, "0"),
      label,
    });
  }, []);

  const { scrollToSection } = useVirtualCameraEngine({
    onSectionChange: handleSectionChange,
  });

  // Project Modal Handlers
  const handleOpenProject = (index, triggerElement) => {
    setActiveProjectIdx(index);
    setIsModalOpen(true);
    document.documentElement.style.overflow = "hidden";
    const proj = siteData.projects[index];
    if (proj) {
      try {
        history.pushState({ proj: index }, "", `/projects/${proj.slug}`);
      } catch {}
    }
  };

  const handleCloseProject = () => {
    setIsModalOpen(false);
    document.documentElement.style.overflow = "";
    try {
      history.pushState({ proj: -1 }, "", "/");
    } catch {}
    setTimeout(() => {
      setActiveProjectIdx(-1);
    }, 500);
  };

  const handleNextProject = () => {
    if (activeProjectIdx < 0) return;
    const nextIdx = (activeProjectIdx + 1) % siteData.projects.length;
    const nextProj = siteData.projects[nextIdx];

    if (wipeRef.current) {
      wipeRef.current.triggerWipe(
        nextProj,
        nextIdx,
        () => {
          // Halfway callback: update modal data
          setActiveProjectIdx(nextIdx);
          try {
            history.replaceState({ proj: nextIdx }, "", `/projects/${nextProj.slug}`);
          } catch {}
        },
        () => {
          // Complete
        }
      );
    } else {
      setActiveProjectIdx(nextIdx);
    }
  };

  // Flash Nostalgia Interactions
  const handleThumbsUp = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (fxRef.current) {
      fxRef.current.triggerExplosion(x, y);
    }

    btn.classList.remove("pop");
    // force reflow
    void btn.offsetWidth;
    btn.classList.add("pop");
    setTimeout(() => btn.classList.remove("pop"), 600);

    const tt = document.getElementById("thumbtt");
    if (tt) tt.textContent = "Ha. You remember. Respect.";
  };

  const handleThumbsDown = (e) => {
    const btn = e.currentTarget;
    btn.classList.remove("nope");
    void btn.offsetWidth;
    btn.classList.add("nope");

    const tt = document.getElementById("thumbtt");
    if (tt) {
      const quote =
        siteData.flashQuotes[
          thumbsDnQuoteIdx.current++ % siteData.flashQuotes.length
        ];
      tt.textContent = quote;
    }
  };

  return (
    <>
      <Navigation onNavigate={scrollToSection} />

      {/* 3D Spline Canvas */}
      <canvas id="cv" aria-hidden="true"></canvas>

      {/* 3D World Container */}
      <main id="world">
        <Hero onExplore={() => scrollToSection("about")} />
        <About />
        <Numbers />
        <Journey
          onThumbsUp={handleThumbsUp}
          onThumbsDown={handleThumbsDown}
        />
        <BeyondDesign />
        <WhatIDo />
        <SelectedWork onOpenProject={handleOpenProject} />
        <Distinkt />
        <Contact />
      </main>

      {/* Scroll Track Spacer */}
      <div id="spacer" aria-hidden="true"></div>

      {/* Fullscreen Project Details Modal */}
      <ProjectModal
        activeProjectIndex={activeProjectIdx}
        isOpen={isModalOpen}
        onClose={handleCloseProject}
        onNextProject={handleNextProject}
      />

      {/* Curved SVG Wave Wipe Transition */}
      <WipeTransition ref={wipeRef} />

      {/* Physics Particle Canvas */}
      <FxCanvas ref={fxRef} />

      {/* Persistent Navigation HUD */}
      <Hud
        activeNumber={hudState.number}
        activeLabel={hudState.label}
      />
    </>
  );
}
