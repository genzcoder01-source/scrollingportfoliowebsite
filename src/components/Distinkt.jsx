"use client";

import React, { useRef, useState, useEffect } from "react";

export default function Distinkt() {
  const videoRef = useRef(null);
  const figureRef = useRef(null);
  const seekRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(82);

  const formatTime = (secs) => {
    const s = Math.max(0, Math.floor(secs || 0));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      if (vid.preload !== "auto") vid.preload = "auto";
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setCurrentTime(vid.currentTime);
    if (seekRef.current && vid.duration) {
      const pct = (vid.currentTime / vid.duration) * 100;
      seekRef.current.value = Math.round((vid.currentTime / vid.duration) * 1000);
      seekRef.current.style.setProperty("--pct", `${pct.toFixed(2)}%`);
    }
  };

  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (vid && vid.duration) {
      setDuration(vid.duration);
    }
  };

  const handleSeek = (e) => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    const val = parseFloat(e.target.value);
    vid.currentTime = (val / 1000) * vid.duration;
    setCurrentTime(vid.currentTime);
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  return (
    <>
      {/* Distinkt Stop inside 3D World */}
      <section
        className="st"
        id="dk-stop"
        data-label="Distinkt"
        data-gap="3"
        data-hold="3.1"
        data-ease="1"
        data-a="0,0"
        data-ma="0,0"
        data-dk="1"
      ></section>

      {/* Distinkt Overlay Panel */}
      <section id="distinkt" aria-label="Distinkt AI">
        <div className="panel">
          <div className="dk-in">
            <div className="dk-copy">
              <div className="dk-top fly" style={{ "--d": 0 }}>
                <span className="dk-mine">My product</span>
                <span className="dk-logo" aria-label="Distinkt">
                  <svg
                    fill="#0A0A0A"
                    role="img"
                    aria-label="Distinkt"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 997.46 204.81"
                  >
                    <path d="M0,200.52v-2.86l6.01-2.29c6.1-2.48,9.15-7.34,9.15-14.59V31.47c0-7.63-3.05-12.49-9.15-14.59L0,14.59v-2.86h75.52c20.21,0,37.62,3.77,52.2,11.3,14.59,7.54,25.84,18.31,33.75,32.32,7.91,14.02,11.87,30.85,11.87,50.49s-4.29,37.09-12.87,51.2c-8.58,14.11-20.55,24.89-35.9,32.32-15.35,7.44-33.42,11.16-54.21,11.16H0ZM58.07,194.8h12.3c13.73,0,24.79-2.72,33.18-8.15,8.39-5.43,14.54-14.59,18.45-27.46,3.91-12.87,5.86-30.56,5.86-53.06s-1.96-40.19-5.86-53.06c-3.91-12.87-9.97-22.03-18.16-27.46-8.2-5.44-18.98-8.15-32.32-8.15h-13.44v177.35Z" />
                    <path d="M443.95,204.81c-12.21,0-21.7-3.05-28.46-9.15-6.77-6.1-10.16-15.83-10.16-29.18v-97.83h-19.74v-2.86l6.87-1.14c5.91-1.33,11.01-3.24,15.3-5.72,4.29-2.48,8.53-5.81,12.73-10.01l23.46-26.03h2.86l-.86,40.05h32.04v5.72h-32.32v102.98c0,6.68,1.47,11.73,4.43,15.16,2.95,3.43,6.72,5.15,11.3,5.15,4,0,7.53-1,10.58-3,3.05-2,6.1-4.72,9.15-8.15l2.86,2.86c-3.82,6.49-9.06,11.63-15.73,15.45-6.68,3.81-14.78,5.72-24.31,5.72Z" />
                    <path d="M493.44,200.52v-2.86l4-1.14c3.81-1.14,6.44-2.86,7.87-5.15,1.43-2.29,2.15-5.34,2.15-9.15v-89.54c0-4-.72-7.01-2.15-9.01-1.43-2-4.05-3.38-7.87-4.15l-4-.86v-2.86l52.35-16.88,2.86,2.86-.86,40.62v80.09c0,3.82.72,6.86,2.15,9.15,1.43,2.29,3.96,4,7.58,5.15l2.86.86v2.86h-66.94ZM527.19,43.77c-6.49,0-11.97-2.05-16.45-6.15-4.48-4.1-6.72-9.3-6.72-15.59s2.24-11.73,6.72-15.73c4.48-4,9.96-6.01,16.45-6.01s11.92,2,16.31,6.01c4.38,4,6.58,9.25,6.58,15.73s-2.19,11.49-6.58,15.59c-4.39,4.1-9.82,6.15-16.31,6.15Z" />
                    <path d="M572.96,200.52v-2.86l4-1.14c6.67-1.9,10.01-6.58,10.01-14.02v-89.54c0-4.19-.67-7.29-2-9.3-1.34-2-3.91-3.38-7.72-4.15l-4.29-1.14v-2.86l48.92-16.59,2.86,2.86,2.29,17.16c6.67-5.91,14.2-10.77,22.6-14.59,8.39-3.81,16.68-5.72,24.89-5.72,12.59,0,22.26,3.43,29.03,10.3,6.77,6.87,10.15,17.36,10.15,31.47v82.38c0,7.44,3.62,12.11,10.87,14.02l2.57.86v2.86h-67.51v-2.86l3.72-1.14c6.67-2.1,10.01-6.77,10.01-14.02v-91.25c0-12.2-6.11-18.31-18.31-18.31-8.39,0-17.55,4.2-27.46,12.59v97.26c0,7.44,3.33,12.11,10.01,14.02l2.57.86v2.86h-67.22Z" />
                    <path d="M738.87,200.52v-2.86l4.29-1.43c6.48-2.1,9.73-6.77,9.73-14.02V29.18c0-3.81-.76-6.67-2.29-8.58-1.53-1.9-4.2-3.43-8.01-4.58l-3.72-.86v-2.86l52.35-12.3,3.43,2.57-.86,40.05v139.59c0,7.63,3.15,12.4,9.44,14.3l4,1.14v2.86h-68.37ZM844.99,200.52l-50.92-71.51,52.92-48.92c2.48-2.29,3.96-4.72,4.43-7.3.47-2.57-1.19-4.43-5.01-5.58l-4.86-1.43v-2.86h42.62v2.86l-8.58,2.29c-4.2,1.34-7.58,2.91-10.16,4.72-2.57,1.82-5.68,4.34-9.3,7.58l-32.04,30.03,51.2,71.23c3.05,4.2,5.91,7.44,8.58,9.73,2.67,2.29,6.1,4.2,10.3,5.72l1.14.57v2.86h-50.35Z" />
                    <path d="M957.41,204.81c-12.21,0-21.7-3.05-28.46-9.15-6.77-6.1-10.16-15.83-10.16-29.18v-97.83h-19.74v-2.86l6.87-1.14c5.91-1.33,11.01-3.24,15.3-5.72,4.29-2.48,8.53-5.81,12.73-10.01l23.46-26.03h2.86l-.86,40.05h32.04v5.72h-32.32v102.98c0,6.68,1.47,11.73,4.43,15.16,2.95,3.43,6.72,5.15,11.3,5.15,4,0,7.53-1,10.58-3,3.05-2,6.1-4.72,9.15-8.15l2.86,2.86c-3.82,6.49-9.06,11.63-15.73,15.45-6.68,3.81-14.78,5.72-24.31,5.72Z" />
                    <g>
                      <path d="M219.12,43.77c6.48,0,11.92-2.05,16.31-6.15,4.38-4.1,6.58-9.3,6.58-15.59s-2.19-11.73-6.58-15.73c-4.39-4-9.82-6.01-16.31-6.01s-11.97,2-16.45,6.01c-4.48,4-6.72,9.25-6.72,15.73s2.24,11.49,6.72,15.59c4.48,4.1,9.96,6.15,16.45,6.15Z" />
                      <path d="M368.15,132.3c-5.91-7.34-15.73-13.11-29.46-17.31l-12.87-3.72c-9.54-3.24-16.73-6.77-21.6-10.58-4.86-3.81-7.29-8.96-7.29-15.45s2.86-11.82,8.58-15.45c5.72-3.62,11.82-5.43,18.31-5.43,7.05,0,12.34,1.29,15.88,3.86,3.53,2.57,7.1,7.01,10.73,13.3l10.01,17.74h2.86l1.72-30.89c-6.11-3.24-12.44-5.67-19.02-7.29-6.58-1.62-13.59-2.43-21.02-2.43-18.5,0-32.71,4.39-42.62,13.16-9.92,8.77-14.87,19.45-14.87,32.04,0,10.49,3.33,19.36,10.01,26.6,6.67,7.25,15.83,12.59,27.46,16.02l12.01,3.72c10.87,3.25,18.31,6.87,22.31,10.87,4,4,6.01,9.15,6.01,15.45,0,6.86-2.82,12.35-8.44,16.45-5.58,4.07-12.89,6.14-21.93,6.14-19.81,0-29.3-12.07-46.67-29.11-6.11-5.99-15.4-11.38-28.51-13.38v-54.19l.86-40.62-2.86-2.86-52.35,16.88v2.86l4,.86c3.81.76,6.44,2.15,7.87,4.15,1.43,2,2.15,5.01,2.15,9.01v60.34h0c.25,4.12-1.65,7.06-5.79,8.71l-12.08,4.28.02,4.81s37.42-8.91,78.54,16.82c30.89,18.1,55.1,17.16,55.1,17.16h.02c19.44-.11,34.58-4.3,45.4-12.58,10.96-8.39,16.45-19.55,16.45-33.47,0-10.3-2.96-19.12-8.87-26.46Z" />
                    </g>
                  </svg>
                </span>
              </div>
              <h2 className="dk-h fly" style={{ "--d": 1 }}>
                The AI brand <em>strategy</em> creator for designers.
              </h2>
              <div className="dk-side">
                <p className="fly" style={{ "--d": 2 }}>
                  Answer a few questions or paste in a website or docs. Distinkt
                  builds a complete brand strategy you can sell to clients and
                  design identities from.
                </p>
                <div className="dk-acts fly" style={{ "--d": 4 }}>
                  <span className="mono">$59 per strategy · No subscription</span>
                  <a
                    className="dk-cta"
                    href="https://distinktai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Try Distinkt
                  </a>
                </div>
              </div>
            </div>

            <figure
              className={`dk-shot dk-vid fly ${isPlaying ? "playing" : ""}`}
              id="dkfig"
              ref={figureRef}
              style={{ "--d": 3 }}
            >
              <video
                id="dkvid"
                ref={videoRef}
                src="/img/distinkt-teaser.mp4"
                poster="/img/distinkt-teaser-poster.webp"
                playsInline
                preload="none"
                muted={isMuted}
                aria-label="Distinkt teaser video"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />

              <button
                type="button"
                className="dk-big"
                id="dkbig"
                aria-label="Play the Distinkt teaser"
                onClick={togglePlay}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                </svg>
              </button>

              <div className="dk-bar">
                <button
                  type="button"
                  className="dk-ic"
                  id="dkpp"
                  aria-label={isPlaying ? "Pause" : "Play"}
                  onClick={togglePlay}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      className="i-play"
                      d="M8 5.5v13l11-6.5z"
                      fill="currentColor"
                    />
                    <g className="i-pause" fill="currentColor">
                      <rect x="6.5" y="5.5" width="4" height="13" rx="1" />
                      <rect x="13.5" y="5.5" width="4" height="13" rx="1" />
                    </g>
                  </svg>
                </button>

                <input
                  type="range"
                  id="dkseek"
                  ref={seekRef}
                  min="0"
                  max="1000"
                  defaultValue="0"
                  step="1"
                  aria-label="Video timeline"
                  onInput={handleSeek}
                />

                <span className="dk-time" id="dktime">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <button
                  type="button"
                  className="dk-ic dk-snd"
                  id="dksnd"
                  aria-pressed={!isMuted}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  onClick={toggleMute}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
                    <path className="w1" d="M15.5 9.2a4 4 0 0 1 0 5.6" />
                    <path className="w2" d="M18 6.8a7.4 7.4 0 0 1 0 10.4" />
                    <path className="x" d="M16 9.5l5 5M21 9.5l-5 5" />
                  </svg>
                </button>
              </div>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
