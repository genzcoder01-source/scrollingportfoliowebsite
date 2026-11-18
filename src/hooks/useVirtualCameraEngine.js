"use client";

import { useEffect, useRef } from "react";
import { siteData } from "../data/siteData";

export function useVirtualCameraEngine({ onSectionChange }) {
  const stateRef = useRef({
    lenis: null,
    isInitialized: false,
  });

  useEffect(() => {
    const doc = document;
    const root = doc.documentElement;
    root.classList.add("is3d");

    try {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    } catch {}

    const cv = doc.getElementById("cv");
    const spacer = doc.getElementById("spacer");
    const distinktSec = doc.getElementById("distinkt");
    const distinktPanel = distinktSec?.querySelector(".panel");
    const distinktFly = distinktSec ? Array.from(distinktSec.querySelectorAll(".fly")) : [];
    const distinktIn = distinktSec?.querySelector(".dk-in");
    const hud = doc.getElementById("hud");
    const hudN = doc.getElementById("hudn");
    const hudL = doc.getElementById("hudl");
    const ticksContainer = doc.getElementById("ticks");
    const countEl = doc.getElementById("count");

    if (!cv || !spacer) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let q = window.innerWidth;
    let x = window.innerHeight;
    let p = 900;
    let Z = q < 760;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let stops = [];
    let elements = [];
    let scrollSpline = [];
    let splinePoints = [];
    let maxSplineZ = 0;
    let distinktStop = null;
    let totalScrollHeight = 0;
    let smoothedScrollY = 0;
    let currentAnimZ = 0;
    let startTime = performance.now();
    let isNumbersCounted = false;
    let countAnimId = 0;
    let currentDarkFactor = 0;
    let prevDarkFactor = -1;
    let activeLabel = "";
    let prevTickSig = "";

    function parseNum(val, def = 0) {
      const f = parseFloat(val);
      return isNaN(f) ? def : f;
    }

    function parsePair(str, def = [0, 0]) {
      if (!str) return def;
      const parts = str.split(",");
      return [parseNum(parts[0], def[0]), parseNum(parts[1], def[1])];
    }

    function clamp(val, min, max) {
      return val < min ? min : val > max ? max : val;
    }

    function cubicEase(t) {
      t = clamp(t, 0, 1);
      return t * t * t * (t * (t * 6 - 15) + 10);
    }

    function lerpColor(c1, c2, factor) {
      return `rgb(${Math.round(c1[0] + (c2[0] - c1[0]) * factor)}, ${Math.round(
        c1[1] + (c2[1] - c1[1]) * factor
      )}, ${Math.round(c1[2] + (c2[2] - c1[2]) * factor)})`;
    }

    const THEME_PALETTE = {
      bg: [
        [236, 234, 226],
        [11, 12, 11],
      ],
      ink: [
        [18, 20, 19],
        [241, 241, 238],
      ],
      muted: [
        [94, 99, 96],
        [154, 160, 156],
      ],
      hair: [
        [211, 208, 198],
        [44, 47, 45],
      ],
      line: [
        [34, 52, 224],
        [124, 138, 255],
      ],
    };

    function recalculateLayout() {
      q = window.innerWidth;
      x = window.innerHeight;
      Z = q < 760;
      p = Z ? 900 : clamp(q * 0.8, 900, 1400);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      cv.width = q * dpr;
      cv.height = x * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stops = [];
      if (typeof window !== "undefined") window.STOPS = stops;
      elements = [];
      let cumulativeZ = 0;

      const stopSections = Array.from(doc.querySelectorAll(".st"));
      stopSections.forEach((sec, idx) => {
        const gap = parseNum(sec.dataset.gap, 3);
        if (idx > 0) cumulativeZ += gap * p;

        const cameraAngle = parsePair(
          Z && sec.dataset.ma ? sec.dataset.ma : sec.dataset.a,
          [0, 0]
        );

        const stopObj = {
          sec,
          id: sec.id || "",
          label: sec.dataset.label || "",
          z: cumulativeZ,
          gap,
          hold: parseNum(sec.dataset.hold, 0.6),
          ease: parseNum(sec.dataset.ease, 1),
          ax: cameraAngle[0],
          ay: cameraAngle[1],
          dk: !!sec.dataset.dk,
          end: !!sec.dataset.end,
          nodes: Array.from(sec.querySelectorAll(".node")),
        };

        stops.push(stopObj);
        if (stopObj.dk) distinktStop = stopObj;

        const elNodes = Array.from(sec.querySelectorAll(".el"));
        elNodes.forEach((el) => {
          const pos = parsePair(
            Z && el.dataset.mp ? el.dataset.mp : el.dataset.p,
            [0, 0]
          );
          const fly = parsePair(el.dataset.f, [0, 0]);
          const zo = parseNum(el.dataset.z, 0);

          el.style.visibility = "hidden";
          elements.push({
            abs: parseNum(el.dataset.abs, 0),
            el,
            st: stopObj,
            x: pos[0],
            y: pos[1],
            zo,
            z: cumulativeZ + zo * p,
            ff: Math.min(1.7, Math.max(1, stopObj.gap * 0.82)) * p,
            fx: Z ? fly[0] * 0.5 : fly[0],
            fy: fly[1],
            r: Z ? 0 : parseNum(el.dataset.r, 0),
            vis: false,
            node: el.querySelector(".node"),
            pose: Array.from(el.querySelectorAll(".pose img")),
            runner: el.querySelector(".runner"),
            spray: el.querySelector(".spray"),
            ctWrap: el.querySelector(".ct-wrap"),
          });

          el.classList.toggle("far", zo > 0.2);
        });
      });

      scrollSpline = [];
      let totalScroll = 0;
      const scrollRatio = Z ? 0.52 : 0.46;

      stops.forEach((stop, idx) => {
        const baseZ = stop.z - p;
        if (idx > 0) totalScroll += stop.gap * scrollRatio * x;

        const offsetFactor = stop.dk || idx === 0 ? 0 : 0.11;
        const holdPx = stop.dk ? stop.hold * x : stop.hold * x * 0.55;

        scrollSpline.push({
          s: totalScroll,
          zc: baseZ - offsetFactor * p,
          ease: idx ? stop.ease * 0.45 : 0,
        });

        stop.sHold = totalScroll;
        stop.holdPx = holdPx;
        stop.sec.sHold = totalScroll;
        stop.sec.holdPx = holdPx;
        totalScroll += holdPx;

        scrollSpline.push({
          s: totalScroll,
          zc: baseZ + (stop.dk ? 0 : idx === 0 ? 0.18 : 0.11) * p,
          ease: 0,
        });
      });

      totalScrollHeight = totalScroll;
      spacer.style.height = `${totalScrollHeight + x}px`;

      // Build 3D spline knots
      const knots = [{ z: stops[0].z, x: stops[0].ax * q, y: stops[0].ay * x }];
      let altDir = 1;

      for (let i = 1; i < stops.length; i++) {
        const prev = stops[i - 1];
        const curr = stops[i];
        if (curr.gap >= 2.2) {
          altDir = -altDir;
          knots.push({
            z: prev.z + (curr.z - prev.z) * 0.5,
            x: altDir * (Z ? 0.85 : 1.05) * q,
            y: (altDir > 0 ? -0.42 : 0.46) * x,
          });
        }
        knots.push({ z: curr.z, x: curr.ax * q, y: curr.ay * x });
      }

      maxSplineZ = knots[knots.length - 1].z;
      splinePoints = [];
      const numKnots = knots.length;
      const tangX = [];
      const tangY = [];

      for (let c = 0; c < numKnots; c++) {
        const prevK = knots[Math.max(0, c - 1)];
        const nextK = knots[Math.min(numKnots - 1, c + 1)];
        const dz = Math.max(1, nextK.z - prevK.z);
        tangX[c] = c === 0 || c === numKnots - 1 ? 0 : (nextK.x - prevK.x) / dz;
        tangY[c] = c === 0 || c === numKnots - 1 ? 0 : (nextK.y - prevK.y) / dz;
      }

      for (let c = 0; c < numKnots - 1; c++) {
        const k1 = knots[c];
        const k2 = knots[c + 1];
        const segmentZ = Math.max(1, k2.z - k1.z);
        const steps = Math.max(24, Math.round((segmentZ / p) * 40));

        for (let step = 0; step < steps; step++) {
          const t = step / steps;
          const t2 = t * t;
          const t3 = t2 * t;
          const h00 = 2 * t3 - 3 * t2 + 1;
          const h10 = t3 - 2 * t2 + t;
          const h01 = -2 * t3 + 3 * t2;
          const h11 = t3 - t2;

          splinePoints.push({
            z: k1.z + segmentZ * t,
            x: h00 * k1.x + h10 * segmentZ * tangX[c] + h01 * k2.x + h11 * segmentZ * tangX[c + 1],
            y: h00 * k1.y + h10 * segmentZ * tangY[c] + h01 * k2.y + h11 * segmentZ * tangY[c + 1],
          });
        }
      }

      splinePoints.push({
        z: maxSplineZ,
        x: knots[numKnots - 1].x,
        y: knots[numKnots - 1].y,
      });

      if (distinktIn) {
        distinktIn.style.transform = "";
        const hIn = distinktIn.offsetHeight;
        const maxH = x - (Z ? 126 : 160);
        distinktIn.style.transform = hIn > maxH ? `scale(${(maxH / hIn).toFixed(3)})` : "";
      }
    }

    function getCameraZ(scrollVal) {
      if (!scrollSpline.length) return 0;
      if (scrollVal <= scrollSpline[0].s) return scrollSpline[0].zc;

      for (let i = 1; i < scrollSpline.length; i++) {
        const prev = scrollSpline[i - 1];
        const curr = scrollSpline[i];
        if (scrollVal <= curr.s) {
          let t = (scrollVal - prev.s) / Math.max(1, curr.s - prev.s);
          const r = curr.ease;
          t = t * (1 - r) + cubicEase(t) * r;
          return prev.zc + (curr.zc - prev.zc) * t;
        }
      }
      return scrollSpline[scrollSpline.length - 1].zc;
    }

    // Kinematics for the runner stick figure
    function updateRunner(runnerEl, angle) {
      if (!runnerEl._parts) {
        runnerEl._parts = {};
        const elementsWithK = runnerEl.querySelectorAll("[data-k]");
        elementsWithK.forEach((item) => {
          runnerEl._parts[item.dataset.k] = item;
        });
      }
      const parts = runnerEl._parts;
      if (!parts.lf || !parts.tor || !parts.hd) return;

      const bounce = Math.abs(Math.sin(angle)) * 1.1;
      const hipX = 17;
      const hipY = 25.5 - bounce;
      const shoulderX = 19.6;
      const shoulderY = 14.2 - bounce;

      function legPath(a) {
        const deg = (40 * Math.sin(a) * Math.PI) / 180;
        const kneeAng =
          12 + 78 * Math.max(0, Math.cos(a)) * Math.max(0, Math.cos(a) * 0.6 + 0.5);
        const kneeRad = ((40 * Math.sin(a) - kneeAng) * Math.PI) / 180;
        const knee = [Math.sin(deg) * 8.6, Math.cos(deg) * 8.6];
        const foot = [Math.sin(kneeRad) * 8.8, Math.cos(kneeRad) * 8.8];
        return `M${hipX} ${hipY}l${knee[0].toFixed(2)} ${knee[1].toFixed(2)}l${foot[0].toFixed(2)} ${foot[1].toFixed(2)}`;
      }

      function armPath(a) {
        const deg = ((-52 * Math.sin(a) + 4) * Math.PI) / 180;
        const handRad = ((-52 * Math.sin(a) + 4 + 78) * Math.PI) / 180;
        const elbow = [Math.sin(deg) * 6.4, Math.cos(deg) * 6.4];
        const hand = [Math.sin(handRad) * 5.6, Math.cos(handRad) * 5.6];
        return `M${shoulderX} ${shoulderY}l${elbow[0].toFixed(2)} ${elbow[1].toFixed(2)}l${hand[0].toFixed(2)} ${hand[1].toFixed(2)}`;
      }

      parts.lf.setAttribute("d", legPath(angle));
      parts.lb.setAttribute("d", legPath(angle + Math.PI));
      parts.af.setAttribute("d", armPath(angle + Math.PI));
      parts.ab.setAttribute("d", armPath(angle));
      parts.tor.setAttribute(
        "d",
        `M${hipX} ${hipY}L${(shoulderX + 0.4).toFixed(1)} ${(shoulderY - 1.2).toFixed(1)}`
      );
      parts.hd.setAttribute("cx", "21.4");
      parts.hd.setAttribute("cy", (6.4 - bounce).toFixed(2));
    }

    // Procedural Spray Paint Simulation
    function updateSpray(sprayEl, progress) {
      if (sprayEl._p === progress) return;
      sprayEl._p = progress;

      const path = sprayEl.querySelector(".spray-p");
      const mist = sprayEl.querySelector(".spray-mist");
      if (!path || !mist) return;

      if (!sprayEl._len) {
        const totalLen = path.getTotalLength ? path.getTotalLength() : 240;
        sprayEl._len = totalLen;
        path.style.strokeDasharray = `${totalLen}`;

        const dotsContainer = sprayEl.querySelector(".spray-dots");
        if (dotsContainer) {
          let dotHtml = "";
          sprayEl._dots = [];
          let seed = 11;
          const rnd = () => {
            seed = (seed * 16807) % 2147483647;
            return seed / 2147483647;
          };

          for (let i = 0; i < 55; i++) {
            const u = rnd();
            const pt = path.getPointAtLength(u * totalLen);
            const ang = rnd() * Math.PI * 2;
            const dist = 10 + Math.pow(rnd(), 1.6) * 20;
            dotHtml += `<circle cx="${(pt.x + Math.cos(ang) * dist).toFixed(1)}" cy="${(
              pt.y + Math.sin(ang) * dist
            ).toFixed(1)}" r="${(0.7 + rnd() * 2).toFixed(1)}" opacity="0"/>`;
            sprayEl._dots.push(u);
          }
          dotsContainer.innerHTML = dotHtml;
          sprayEl._dotEls = Array.from(dotsContainer.children);
        }
      }

      const c = Math.min(1, progress / 0.55);
      const poolScale = cubicEase((progress - 0.4) / 0.5);
      const dripProgress = clamp((progress - 0.72) / 0.28, 0, 1);

      path.style.strokeDashoffset = (sprayEl._len * (1 - c)).toFixed(1);
      path.style.opacity = c > 0.005 ? "1" : "0";

      const pool = sprayEl.querySelector(".spray-pool");
      if (pool) pool.style.transform = `scale(${poolScale.toFixed(3)})`;

      const drip = sprayEl.querySelector(".spray-drip");
      if (drip) {
        drip.style.strokeDashoffset = (40 * (1 - dripProgress)).toFixed(1);
        drip.style.opacity = dripProgress > 0.01 ? "1" : "0";
      }

      if (sprayEl._dotEls) {
        sprayEl._dotEls.forEach((dot, idx) => {
          const thresh = sprayEl._dots[idx];
          dot.setAttribute(
            "opacity",
            c > thresh ? (0.35 + (0.5 * ((idx * 37) % 10)) / 10).toFixed(2) : "0"
          );
        });
      }

      mist.style.opacity = progress > 0.01 && progress < 0.9 ? "1" : "0";
      const tipPt = path.getPointAtLength(Math.max(0.001, c) * sprayEl._len);
      mist.setAttribute("cx", (tipPt.x + 34).toFixed(1));
      mist.setAttribute("cy", (tipPt.y - 8).toFixed(1));

      const sprayCan = sprayEl.parentNode?.querySelector(".spray-can");
      if (sprayCan) {
        const parentW = sprayEl.parentNode.offsetWidth / 160;
        const parentH = sprayEl.parentNode.offsetHeight / 300;
        const startPt = sprayEl._st || (sprayEl._st = path.getPointAtLength(0));
        const canX = startPt.x + 64 + (tipPt.x - startPt.x) * 0.12;
        const canY = startPt.y - 16 + progress * 14;
        const trX = canX * parentW - sprayCan.offsetWidth * 0.781;
        const trY = canY * parentH - sprayCan.offsetHeight * 0.056;
        sprayCan.style.transform = `translate(${trX.toFixed(1)}px, ${trY.toFixed(
          1
        )}px) rotate(${(Math.sin(progress * 6) * 2).toFixed(1)}deg)`;
      }
    }

    // Contact Parachute Drop & Hanging Letters Animation (Exact Yt physics model)
    function smoothstep(v) {
      v = clamp(v, 0, 1);
      return v * v * v * (v * (v * 6 - 15) + 10);
    }

    function updateParachute(wrapEl, progress) {
      if (wrapEl._p === progress) return;
      wrapEl._p = progress;

      if (!wrapEl._k) {
        wrapEl._k = {
          h: wrapEl.querySelector("h2"),
          pa: wrapEl.querySelector(".para"),
          cs: Array.from(wrapEl.querySelectorAll(".c")),
        };
      }
      const n = wrapEl._k;
      if (!n.h || !n.pa) return;

      const i = wrapEl.offsetWidth;
      const t = parseFloat(getComputedStyle(n.h).fontSize) || 48;

      if (n.sig !== `${i}|${t}`) {
        n.sig = `${i}|${t}`;
        n.home = n.cs.map((te) => {
          let l = 0;
          let tp = 0;
          let curr = te;
          while (curr && curr !== wrapEl) {
            l += curr.offsetLeft;
            tp += curr.offsetTop;
            curr = curr.offsetParent;
          }
          return [l + te.offsetWidth / 2, tp + te.offsetHeight / 2];
        });
        n.sw = Math.max(0.8 * t, 52);
        n.pa.style.width = `${n.sw}px`;
      }

      const r = wrapEl.getBoundingClientRect();
      const d = Math.max(0.001, r.width / Math.max(1, i));
      const o = -r.left / d;
      const u = (window.innerWidth - r.left) / d;

      const s = n.cs.length;
      const f = n.sw / 60;
      const j = n.home[0] ? n.home[0][1] - 0.35 * t : 0;
      const c = 0.15 * t;
      const w = 0.3;
      const A = 0.18 * t;
      const _ = 0.04;
      const g = 0.9;
      const W = o - n.sw;
      const S = u + n.sw;

      const P = (te) => W + (S - W) * clamp((te - _) / (g - _), 0, 1);
      const z = (te) => _ + ((g - _) * (te - W)) / (S - W);

      const I = P(progress);
      const T = 0.07;
      let F = 0;
      const N = n.home.map((pos) => z(pos[0] - 0.04 * t));

      for (let y = 0; y < s; y++) {
        if (progress < N[y]) F++;
      }

      const Q = 1 - smoothstep((progress - _) / 0.25);
      const calcWeight = (te) => te * c + 0.12 * t;

      let R = 0;
      for (let y = 0; y < s; y++) {
        const J = clamp((progress - N[y] + 0.02) / 0.06, 0, 1);
        R += 1 - J;
      }

      let h = j - A - calcWeight(R) - Q * ((window.innerHeight * 0.6) / d);
      const U = Math.sin(progress * 22);
      if (progress >= g - 0.12) {
        h -= smoothstep((progress - (g - 0.12)) / 0.12) * t * 0.8;
      }

      let ee = 0;
      for (let y = 0; y < s; y++) {
        const ue = n.cs[y];
        const D = n.home[y];
        if (!D) continue;

        let B;
        let ie;
        let re;
        let oe;

        if (progress < N[y]) {
          const Xe = F - 1 - ee;
          ee++;
          B = I + (y % 2 ? 1 : -1) * 0.035 * t + U * 0.02 * t * (Xe / s);
          ie = h + 0.06 * t + Xe * c + c * 0.5;
          re = w;
          oe = ((y % 3) - 1) * 6 + U * 2;
        } else {
          const be = clamp((progress - N[y]) / T, 0, 1);
          const kt = P(N[y]) + (y % 2 ? 1 : -1) * 0.035 * t;
          const Ze = h + 0.06 * t + c * (F + 0.5);
          const Xt = be * be;

          B = kt + (D[0] - kt) * smoothstep(be);
          ie = Ze + (D[1] - Ze) * Xt;
          re = w + (1 - w) * smoothstep(Math.min(1, be * 1.6));
          oe = ((y % 3) - 1) * 6 * (1 - be);

          if (be >= 1) {
            const Zt = clamp((progress - N[y] - T) / 0.03, 0, 1);
            ie -= Math.sin(Math.PI * Zt) * 0.05 * t;
          }
        }

        const jt = `${(B - D[0]).toFixed(1)},${(ie - D[1]).toFixed(1)},${re.toFixed(3)},${oe.toFixed(1)}`;
        if (ue._t !== jt) {
          ue._t = jt;
          ue.style.transform =
            Math.abs(B - D[0]) < 0.05 &&
            Math.abs(ie - D[1]) < 0.05 &&
            re > 0.999 &&
            Math.abs(oe) < 0.05
              ? "none"
              : `translate(${(B - D[0]).toFixed(1)}px, ${(ie - D[1]).toFixed(1)}px) rotate(${oe.toFixed(1)}deg) scale(${re.toFixed(3)})`;
        }
      }

      n.pa.style.visibility = progress > _ && progress < g ? "visible" : "hidden";
      n.pa.style.transform = `translate(${(I - 30 * f).toFixed(1)}px, ${(h - 74 * f).toFixed(1)}px) rotate(${(U * 5).toFixed(2)}deg)`;
    }

    // Main 3D Render Loop
    let lastTime = performance.now();

    function renderFrame(now) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const scrollTarget = window.scrollY;
      const diff = scrollTarget - smoothedScrollY;
      smoothedScrollY += diff * (1 - Math.exp(-dt * (Math.abs(diff) > 3 * x ? 9 : 5.5)));
      if (Math.abs(diff) < 0.3) smoothedScrollY = scrollTarget;

      const introProgress = clamp((now - startTime - 250) / 1700, 0, 1);
      currentAnimZ = (Z ? 3 : 3.3) * p * cubicEase(introProgress);

      const cameraZ = getCameraZ(smoothedScrollY);

      // 1. Dark Mode Transition
      const darkStops = stops.filter((s) => s.sec.dataset.dark);
      let targetDark = 0;
      darkStops.forEach((ds) => {
        const dist = ds.z - cameraZ - p;
        const enter = 1 - cubicEase((dist - 0.45 * p) / (0.85 * p));
        const exit = 1 - cubicEase((-dist - 0.6 * p) / (0.65 * p));
        targetDark = Math.max(targetDark, Math.min(enter, exit));
      });

      if (Math.abs(targetDark - prevDarkFactor) > 0.003) {
        prevDarkFactor = targetDark;
        currentDarkFactor = targetDark;
        for (const varName in THEME_PALETTE) {
          root.style.setProperty(
            `--${varName}`,
            lerpColor(THEME_PALETTE[varName][0], THEME_PALETTE[varName][1], targetDark)
          );
        }
      }

      // Numbers count up
      if (darkStops[0]) {
        const numDist = darkStops[0].z - cameraZ - p;
        if (!isNumbersCounted && numDist < 0.5 * p && numDist > -0.8 * p) {
          isNumbersCounted = true;
          const countStart = performance.now();
          const currentId = ++countAnimId;

          const animateNumber = (tNow) => {
            if (currentId !== countAnimId) return;
            const progress = clamp((tNow - countStart) / 1100, 0, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            if (countEl) countEl.textContent = `${Math.round(250 * easeOut)}`;
            if (progress < 1) requestAnimationFrame(animateNumber);
          };
          requestAnimationFrame(animateNumber);
        }
        if (isNumbersCounted && numDist > 1.4 * p) {
          isNumbersCounted = false;
          countAnimId++;
          if (countEl) countEl.textContent = "0";
        }
      }

      // 2. Draw 3D Spline Canvas Line
      ctx.clearRect(0, 0, q, x);
      const halfW = q / 2;
      const halfH = x / 2;
      const minClipZ = 0.1 * p;
      const maxDrawZ = Math.min(cameraZ + currentAnimZ, maxSplineZ);

      ctx.lineCap = "butt";
      ctx.lineJoin = "round";
      ctx.strokeStyle = lerpColor(THEME_PALETTE.line[0], THEME_PALETTE.line[1], currentDarkFactor);

      let prevPoint = null;
      let lastPoint = null;

      for (let i = 0; i < splinePoints.length; i++) {
        let pt = splinePoints[i];
        if (pt.z < cameraZ + minClipZ) {
          prevPoint = null;
          continue;
        }

        if (pt.z > maxDrawZ) {
          if (prevPoint) {
            const lastK = splinePoints[i - 1];
            const frac = (maxDrawZ - lastK.z) / Math.max(1, pt.z - lastK.z);
            pt = {
              z: maxDrawZ,
              x: lastK.x + (pt.x - lastK.x) * frac,
              y: lastK.y + (pt.y - lastK.y) * frac,
            };
          } else break;
        }

        const depth = pt.z - cameraZ;
        const scale = p / depth;
        const screenX = halfW + pt.x * scale;
        const screenY = halfH + pt.y * scale;
        const screenPt = { x: screenX, y: screenY, scale, depth, z: pt.z };

        if (prevPoint) {
          const lineWidth = clamp(2.4 * scale, 0.5, 7);
          const alphaFade =
            (1 - 0.82 * cubicEase((depth - 1.2 * p) / (currentAnimZ - 1.2 * p))) *
            cubicEase((depth - minClipZ) / (0.3 * p));

          ctx.globalAlpha = clamp(alphaFade, 0, 1);
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(screenX, screenY);
          ctx.stroke();
        }

        prevPoint = screenPt;
        lastPoint = screenPt;
        if (pt.z >= maxDrawZ) break;
      }

      // Glowing Tip Node
      if (lastPoint) {
        const tipRadius = clamp(5 * lastPoint.scale, 2.5, 14);
        ctx.globalAlpha = 1;
        ctx.fillStyle = lerpColor(
          THEME_PALETTE.line[0],
          THEME_PALETTE.line[1],
          currentDarkFactor
        );
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, tipRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, tipRadius * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 3. Transform 3D Elements
      elements.forEach((item) => {
        const depth = item.z - cameraZ;
        const distOffset = p * (1 + item.zo);
        const relativeDist = depth - distOffset;

        if (depth < 0.16 * p || relativeDist > 2.7 * p) {
          if (item.vis) {
            item.el.style.visibility = "hidden";
            item.vis = false;
          }
          return;
        }

        const scale = (item.abs ? p * item.abs : distOffset) / depth;
        const flyProgress = relativeDist > 0 ? cubicEase(relativeDist / (1.9 * p)) : 0;
        const posX = (item.x + item.fx * flyProgress) * q;
        const posY = (item.y + item.fy * flyProgress) * x;
        const screenX = halfW + posX * scale;
        const screenY = halfH + posY * scale;

        const alpha =
          relativeDist > 0
            ? 1 - cubicEase((relativeDist - 0.45 * item.ff) / (0.55 * item.ff))
            : 1 - cubicEase((-relativeDist - 0.22 * p) / (0.42 * p));

        if (alpha < 0.01) {
          if (item.vis) {
            item.el.style.visibility = "hidden";
            item.vis = false;
          }
          return;
        }

        if (!item.vis) {
          item.el.style.visibility = "visible";
          item.vis = true;
        }

        item.el.style.opacity = alpha.toFixed(3);
        item.el.style.transform = `translate3d(${screenX.toFixed(1)}px, ${screenY.toFixed(
          1
        )}px, 0) translate(-50%, -50%) perspective(1100px) rotateY(${(
          item.r * flyProgress
        ).toFixed(2)}deg) scale(${scale.toFixed(4)})`;

        item.el.style.setProperty("--k", flyProgress.toFixed(3));
        item.el.style.setProperty(
          "--fp",
          clamp((0.55 * p - relativeDist) / (0.65 * p), 0, 1).toFixed(3)
        );
        item.el.style.setProperty(
          "--dp",
          cubicEase((-relativeDist - 0.03 * p) / (0.38 * p)).toFixed(3)
        );

        const g = Math.max(0, (-relativeDist - 0.03 * p) / (0.38 * p));
        const spVal =
          g < 1
            ? 3 * g * g - 2 * g * g * g + 0.35 * (g * g * g - g * g)
            : 1 + 0.35 * (g - 1);
        item.el.style.setProperty("--sp", spVal.toFixed(3));

        // Poses switching
        if (item.pose && item.pose.length > 0) {
          const poseProg = clamp((-relativeDist + 0.04 * p) / (0.42 * p), 0, 1);
          const poseIdx = Math.round(poseProg * (item.pose.length - 1));
          if (poseIdx !== item._currPose) {
            item.pose.forEach((img, idx) => {
              img.classList.toggle("on", idx === poseIdx);
            });
            item._currPose = poseIdx;
          }
        }

        // Stick-Figure Runner
        if (item.runner) {
          const runP = clamp((0.55 * p - relativeDist) / (0.65 * p), 0, 1);
          const jumpP = clamp((-relativeDist - 0.1 * p) / (0.42 * p), 0, 1);
          const leftPercent = runP * 96 + jumpP * 26;
          const jumpY = -1.5 * jumpP + 2.9 * jumpP * jumpP;
          item.runner.style.left = `${leftPercent.toFixed(2)}%`;

          const headingParent = item.runner.parentNode;
          if (headingParent) {
            const hWidth = headingParent.offsetWidth;
            if (item._jw !== hWidth) {
              item._jw = hWidth;
              item._chars = Array.from(headingParent.querySelectorAll(".c")).map((cEl) => {
                let offL = 0;
                let cNode = cEl;
                while (cNode && cNode !== headingParent) {
                  offL += cNode.offsetLeft;
                  cNode = cNode.offsetParent;
                }
                return [cEl, (offL / hWidth) * 100, (cEl.offsetWidth / hWidth) * 100];
              });
            }

            const clampedRun = Math.min(leftPercent, 100);
            if (item._chars) {
              item._chars.forEach(([cEl, startPct, widthPct]) => {
                const fillRatio = clamp((clampedRun - startPct) / widthPct, 0, 1);
                cEl.style.setProperty("--cf", `${(fillRatio * 100).toFixed(1)}%`);
              });
            }
          }

          item.runner.style.transform = `translate(-50%, ${jumpY.toFixed(3)}em) rotate(${(
            jumpP * 24
          ).toFixed(1)}deg)`;

          const mode = jumpP > 0.01 ? "pj" : "run";
          item.runner.classList.toggle("run", mode === "run");
          item.runner.classList.toggle("pj", mode === "pj");

          if (mode === "run") {
            updateRunner(item.runner, runP * 7 * Math.PI * 2);
          }
        }

        // Spray Simulation
        if (item.spray) {
          const sprayProg = clamp(
            (clamp((0.55 * p - relativeDist) / (0.65 * p), 0, 1) - 0.3) / 0.68,
            0,
            1
          );
          updateSpray(item.spray, sprayProg);
        }

        // Parachute Drop
        if (item.ctWrap) {
          const ctProg = clamp(
            (smoothedScrollY - (item.st.sHold - 0.4 * x)) / (0.4 * x + item.st.holdPx * 0.95),
            0,
            1
          );
          updateParachute(item.ctWrap, ctProg);
        }

        item.el.style.pointerEvents = alpha > 0.6 && scale < 1.6 ? "auto" : "none";
        if (item.node) item.node.classList.toggle("on", relativeDist < 0.05 * p);
      });

      // 4. Distinkt Circular Iris Reveal & 3D Fold
      if (distinktStop && distinktPanel && distinktSec) {
        const sHold = distinktStop.sHold;
        const holdPx = distinktStop.holdPx;
        const enterFactor = cubicEase((smoothedScrollY - (sHold - 0.75 * x)) / (1.05 * x));
        const exitFactor = cubicEase((smoothedScrollY - (sHold + holdPx - 1.05 * x)) / (1 * x));

        if (enterFactor <= 0 || exitFactor >= 1) {
          distinktSec.style.visibility = "hidden";
          distinktSec.style.pointerEvents = "none";
        } else {
          distinktSec.style.visibility = "visible";
          const radius = Math.hypot(q, x) * 0.62 * enterFactor + 1;
          distinktPanel.style.clipPath = `circle(${radius.toFixed(1)}px at ${halfW + distinktStop.ax * q}px ${halfH + distinktStop.ay * x}px)`;

          const scalePanel = 1 - 0.84 * exitFactor;
          distinktPanel.style.transform = `perspective(1200px) translate3d(0, ${-exitFactor * x * 0.04}px, 0) rotateX(${exitFactor * 14}deg) scale(${scalePanel.toFixed(4)})`;
          distinktPanel.style.borderRadius = `${exitFactor * 36}px`;
          distinktPanel.style.opacity = (1 - cubicEase((exitFactor - 0.7) / 0.3)).toFixed(3);

          const textProg = (smoothedScrollY - (sHold + 0.05 * x)) / (0.95 * x);
          distinktFly.forEach((el, idx) => {
            const flyQ = 1 - cubicEase(textProg * 1.6 - idx * 0.13);
            el.style.setProperty("--q", flyQ.toFixed(3));
          });

          distinktSec.style.pointerEvents = enterFactor > 0.98 && exitFactor < 0.2 ? "auto" : "none";
        }
      }

      // 5. Update HUD
      if (hud && hudN && hudL) {
        let activeStop = stops[0];
        let sectionNum = 0;
        let counter = 0;

        stops.forEach((st) => {
          if (st.gap >= 2.2 || st === stops[0]) {
            if (smoothedScrollY >= st.sHold - 0.6 * x) {
              activeStop = st;
              sectionNum = counter;
            }
            counter++;
          }
        });

        if (activeStop && activeStop.label !== activeLabel) {
          activeLabel = activeStop.label;
          hudL.textContent = activeStop.label;
          hudN.textContent = String(sectionNum + 1).padStart(2, "0");
          if (onSectionChange) onSectionChange(activeStop.label, sectionNum + 1);
        }

        const normScroll = clamp(smoothedScrollY / totalScrollHeight, 0, 1);
        hud.style.setProperty("--p", normScroll.toFixed(4));

        const sig = `${totalScrollHeight}|${x}`;
        if (sig !== prevTickSig && ticksContainer) {
          prevTickSig = sig;
          const majorStops = stops.filter((st, idx) => idx === 0 || st.gap >= 2.2);
          ticksContainer.innerHTML = majorStops
            .map(
              (st) =>
                `<i class="tk" data-s="${st.sHold}" style="top:${(
                  (st.sHold / totalScrollHeight) *
                  100
                ).toFixed(2)}%"></i>`
            )
            .join("");
        }

        if (ticksContainer) {
          const ticks = ticksContainer.querySelectorAll(".tk");
          ticks.forEach((tk) => {
            tk.classList.toggle("on", parseFloat(tk.dataset.s) <= smoothedScrollY + 2);
          });
        }
      }

      requestAnimationFrame(renderFrame);
    }

    recalculateLayout();
    const frameId = requestAnimationFrame(renderFrame);

    const handleResize = () => {
      recalculateLayout();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [onSectionChange]);

  const scrollToSection = (sectionId) => {
    const doc = document;
    const targetSection = doc.getElementById(sectionId);
    if (!targetSection) return;

    const stopSections = Array.from(doc.querySelectorAll(".st"));
    const matched = stopSections.find(
      (sec) => sec.id === sectionId || (sectionId === "distinkt" && sec.dataset.dk)
    );

    if (matched && matched.sHold !== undefined) {
      const targetPos = matched.sHold + (matched.dataset.dk ? matched.holdPx * 0.45 : 2);
      window.scrollTo({ top: targetPos, behavior: "smooth" });
    } else {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { scrollToSection };
}
