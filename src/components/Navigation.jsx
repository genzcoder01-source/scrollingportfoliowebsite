"use client";

import React, { useState } from "react";

export default function Navigation({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("menu-open", nextState);
    }
  };

  const handleNavClick = (target, e) => {
    e.preventDefault();
    setIsOpen(false);
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("menu-open");
    }
    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <>
      <header className="bar">
        <button
          type="button"
          className="mark"
          data-go="hero"
          aria-label="Dhruvin, Back to start"
          onClick={(e) => handleNavClick("hero", e)}
        >
          Dhruvin
        </button>
        <button
          type="button"
          className="burger"
          id="burger"
          aria-expanded={isOpen}
          aria-controls="menu"
          onClick={toggleMenu}
        >
          <span className="mono" style={{ color: "inherit" }}>
            Menu
          </span>
          <i aria-hidden="true"></i>
        </button>
      </header>

      <nav id="menu" aria-label="Main">
        <ol>
          <li>
            <a
              href="#about"
              data-go="about"
              onClick={(e) => handleNavClick("about", e)}
            >
              <span className="mono">01</span>
              <span className="d">About</span>
            </a>
          </li>
          <li>
            <a
              href="#journey"
              data-go="journey"
              onClick={(e) => handleNavClick("journey", e)}
            >
              <span className="mono">02</span>
              <span className="d">Journey</span>
            </a>
          </li>
          <li>
            <a
              href="#services"
              data-go="services"
              onClick={(e) => handleNavClick("services", e)}
            >
              <span className="mono">03</span>
              <span className="d">What I do</span>
            </a>
          </li>
          <li>
            <a
              href="#work"
              data-go="work"
              onClick={(e) => handleNavClick("work", e)}
            >
              <span className="mono">04</span>
              <span className="d">Work</span>
            </a>
          </li>
          <li>
            <a
              href="#distinkt"
              data-go="distinkt"
              onClick={(e) => handleNavClick("distinkt", e)}
            >
              <span className="mono">05</span>
              <span className="d">Distinkt</span>
            </a>
          </li>
          <li>
            <a
              href="#contact"
              data-go="contact"
              onClick={(e) => handleNavClick("contact", e)}
            >
              <span className="mono">06</span>
              <span className="d">Contact</span>
            </a>
          </li>
        </ol>
        <div className="menu-sub mono">
          <a
            href="#services"
            data-go="services"
            onClick={(e) => handleNavClick("services", e)}
          >
            Services
          </a>
          <a
            href="#contact"
            data-go="contact"
            onClick={(e) => handleNavClick("contact", e)}
          >
            FAQ
          </a>
        </div>
      </nav>
    </>
  );
}
