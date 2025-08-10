"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const init = useCallback(async (engine: Engine) => {
    // load the lightweight preset
    await loadSlim(engine);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      <Particles
        id="tsparticles"
        init={init}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          background: { color: "transparent" },
          backgroundMask: { enable: false },
          fpsLimit: 60,
          detectRetina: true,
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: true,
                mode: [], // parallax-only
                parallax: { enable: true, force: 55, smooth: 20 },
              },
              onClick: { enable: false, mode: [] },
              resize: true,
            },
          },
          particles: {
            number: {
              value: 140,
              density: { enable: true, area: 900 },
            },
            color: { value: ["#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed"] },
            links: { enable: false },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
              trail: { enable: false },
            },
            opacity: {
              value: { min: 0.45, max: 0.9 },
              animation: { enable: true, speed: 0.6, minimumValue: 0.35, sync: false },
            },
            size: {
              value: { min: 0.8, max: 2.2 },
              animation: { enable: true, speed: 2, minimumValue: 0.6, sync: false },
            },
            shape: { type: "circle" },
          },
        }}
      />
    </div>
  );
}
