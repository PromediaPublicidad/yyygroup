// src/components/GlobeHero.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";

// Ciudades base para trazar “expansión” (puedes sumar las que quieras)
const HUBS = [
  { name: "Panamá",        lat: 8.9824,  lng: -79.5199 },
  { name: "Nueva York",    lat: 40.7128, lng: -74.0060 },
  { name: "Londres",       lat: 51.5074, lng: -0.1278  },
  { name: "Madrid",        lat: 40.4168, lng: -3.7038  },
  { name: "São Paulo",     lat: -23.5505,lng: -46.6333 },
  { name: "Ciudad de México", lat: 19.4326, lng: -99.1332 },
  { name: "Bogotá",        lat: 4.7110,  lng: -74.0721 },
  { name: "Buenos Aires",  lat: -34.6037,lng: -58.3816 },
  { name: "Johannesburgo", lat: -26.2041,lng: 28.0473 },
  { name: "Dubái",         lat: 25.2048, lng: 55.2708 },
  { name: "Singapur",      lat: 1.3521,  lng: 103.8198 },
  { name: "Tokio",         lat: 35.6762, lng: 139.6503 },
  { name: "Sídney",        lat: -33.8688,lng: 151.2093 }
];

function buildArcs(hubs) {
  // Conecta cada hub con 3–5 destinos aleatorios para un look “red global”
  const arcs = [];
  const rnd = (n) => Math.floor(Math.random() * n);
  hubs.forEach((a, i) => {
    const targets = new Set();
    const links = 3 + rnd(3); // 3 a 5 líneas
    while (targets.size < links) {
      const j = rnd(hubs.length);
      if (j !== i) targets.add(j);
    }
    [...targets].forEach(j => {
      const b = hubs[j];
      arcs.push({
        startLat: a.lat,
        startLng: a.lng,
        endLat: b.lat,
        endLng: b.lng,
        name: `${a.name} → ${b.name}`,
        // aleatorio para altitud y timing
        alt: 0.15 + Math.random() * 0.25,
        time: 1500 + Math.random() * 1500
      });
    });
  });
  return arcs;
}

export default function GlobeHero({
  height = 520,       // ajústalo según tu hero
  cyan = "#45e6ff",   // celeste neón
  bg = "#071329"      // azul oscuro YGroup
}) {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({ w: 800, h: height });

  // Arcos memoizados
  const arcsData = useMemo(() => buildArcs(HUBS), []);

  // Respeta “reduced motion”
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Resize
  useEffect(() => {
    const onResize = () => {
      const w = Math.min(window.innerWidth, 1200); // cap para no pasarse
      setDimensions({ w, h: height });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [height]);

  // Auto-rotación y POV inicial hacia América/Europa
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls();
    controls.autoRotate = !prefersReduced;
    controls.autoRotateSpeed = 0.35; // suave
    // POV inicial (ajústalo si quieres otra vista)
    g.pointOfView({ lat: 15, lng: -30, altitude: 2.1 }, 2000);
  }, [prefersReduced]);

  return (
    <div
      className="rounded-2xl shadow-lg overflow-hidden"
      style={{
        background: bg,
        width: "100%",
        maxWidth: 900,
        height: dimensions.h
      }}
      aria-label="Globo giratorio con conexiones globales"
    >
      <Globe
        ref={globeRef}
        width={dimensions.w}
        height={dimensions.h}
        backgroundColor={bg}
        showAtmosphere
        atmosphereColor={cyan}
        atmosphereAltitude={0.18}

        // Usa rutas locales cuando copies los assets a /public/globe
        globeImageUrl={"/globe/earth-night.png"}
        bumpImageUrl={"/globe/earth-specular.png"}

        // Líneas (arcos) de expansión
        arcsData={arcsData}
        arcColor={() => [cyan, cyan]}
        arcAltitude={(d) => d.alt}
        arcStroke={0.7}
        arcDashLength={0.5}
        arcDashGap={0.4}
        arcDashAnimateTime={(d) => d.time}

        // Puntos en hubs (opcional)
        pointsData={HUBS}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointAltitude={0.01}
        pointRadius={0.7}
        pointColor={() => cyan}

        // Interacción: limitamos el zoom para UX del hero
        enablePointerInteraction
        onGlobeReady={() => {
          const g = globeRef.current;
          if (!g) return;
          const controls = g.controls();
          controls.minDistance = 220;
          controls.maxDistance = 600;
        }}
      />
    </div>
  );
}