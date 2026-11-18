"use client";

import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

const EMOJIS = ["😄", "👍", "😎", "🙌", "✨", "😄", "👍"];

const FxCanvas = forwardRef(function FxCanvas(props, ref) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const isRunningRef = useRef(false);

  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    particlesRef.current = particlesRef.current.filter(
      (p) => p.life < 120 && p.y < h + 80
    );

    particlesRef.current.forEach((p) => {
      p.vy += 0.42;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life++;

      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - p.life / 120);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.font = `${p.s}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(p.e, 0, 0);
      ctx.restore();
    });

    if (particlesRef.current.length > 0) {
      requestAnimationFrame(loop);
    } else {
      isRunningRef.current = false;
      ctx.clearRect(0, 0, w, h);
    }
  };

  useImperativeHandle(ref, () => ({
    triggerExplosion: (originX, originY) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const x = originX ?? window.innerWidth / 2;
      const y = originY ?? window.innerHeight / 2;

      for (let i = 0; i < 54; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 6 + Math.random() * 13;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 7,
          r: Math.random() * 6.3,
          vr: (Math.random() - 0.5) * 0.3,
          s: 20 + Math.random() * 30,
          e: EMOJIS[i % EMOJIS.length],
          life: 0,
        });
      }

      if (!isRunningRef.current) {
        isRunningRef.current = true;
        requestAnimationFrame(loop);
      }
    },
  }));

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas id="fx" ref={canvasRef} aria-hidden="true" />;
});

export default FxCanvas;
