// ygroup-landing\src\components\Starfield.jsx
import React, { useEffect, useRef } from "react";

export default function Starfield({
  density = 900,
  maxRadius = 1.2,
  twinkle = 0.018,
}) {
  const ref = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeStars = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const stars = Array.from({ length: density }).map(() => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * maxRadius + 0.2;
        const a = Math.random() * 0.65 + 0.08; // alpha base
        const t = Math.random() * Math.PI * 2; // phase
        const s = Math.random() * 0.6 + 0.2;   // twinkle speed
        return { x, y, r, a, t, s };
      });

      starsRef.current = stars;
    };

    let raf = 0;
    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // estrellas
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const st = stars[i];
        st.t += twinkle * st.s;

        const alpha = Math.max(0, Math.min(1, st.a + Math.sin(st.t) * 0.18));
        ctx.beginPath();
        ctx.fillStyle = `rgba(180, 230, 255, ${alpha})`;
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    makeStars();
    draw();

    const onResize = () => {
      resize();
      makeStars();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density, maxRadius, twinkle]);

  return (
  <canvas
    ref={ref}
    className="absolute inset-0 pointer-events-none"
    style={{ opacity: 0.85 }}
    aria-hidden="true"
  />
);
}