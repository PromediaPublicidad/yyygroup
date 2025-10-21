// src/components/BackgroundFX.jsx
import React from "react";

/**
 * Fondo cinemático (blur + bokeh + bandas diagonales + grain + viñeta)
 * No requiere assets externos (usa data-URI para el grain).
 * Úsalo dentro de un contenedor relative; este componente es absolute:inset-0.
 */
export default function BackgroundFX({
  tint = "#0b1320",          // base
  accentA = "rgba(24,144,255,0.18)",
  accentB = "rgba(34,211,238,0.14)",
  accentC = "rgba(56,189,248,0.12)",
  className = "",
}) {
  // PNG 64x64 ruido monocromo ultra-ligero (data-URI)
  const NOISE =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4yLjHx0fZaAAAANElEQVR4Xu3BMQEAAADCoPVP7WcIoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHkFiioAAXqk7mQAAAAASUVORK5CYII=";

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Base vertical dark */}
      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(120% 80% at 50% -10%, ${accentA} 0%, transparent 55%),` +
            `radial-gradient(80% 60% at 90% 10%, ${accentB} 0%, transparent 65%),` +
            `radial-gradient(70% 60% at 10% 20%, ${accentC} 0%, transparent 70%),` +
            `linear-gradient(180deg, ${tint} 0%, #09101b 60%, #0a0f19 100%)`,
        }}
      />

      {/* Bandas diagonales suaves */}
      <div
        className="absolute -inset-x-16 inset-y-0 rotate-[12deg] opacity-[0.12] blur-[2px]"
        style={{
          background:
            "repeating-linear-gradient(90deg, #b3e5fc 0 1px, transparent 1px 160px)",
          transformOrigin: "center",
        }}
      />

      {/* Bokeh spots */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120px 120px at 20% 38%, rgba(255,255,255,.06), transparent 60%)," +
            "radial-gradient(160px 160px at 78% 34%, rgba(255,255,255,.05), transparent 65%)," +
            "radial-gradient(100px 100px at 60% 70%, rgba(255,255,255,.05), transparent 60%)",
          filter: "blur(6px)",
        }}
      />

      {/* Grain (ruido) */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url(${NOISE})`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 80% at 50% 50%, transparent 0%, rgba(0,0,0,.25) 70%, rgba(0,0,0,.55) 100%)",
        }}
      />
    </div>
  );
}