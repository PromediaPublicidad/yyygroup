// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Globe from "react-globe.gl";
import {
  ArrowRight,
  Briefcase,
  HeartPulse,
  ShoppingBag,
  Share2,
  ChevronUp,
  ExternalLink,
  Instagram,
  Facebook,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import BackgroundFX from "./components/BackgroundFX";
import CategoryOpen from "./components/CategoryOpen";

/* ───────────────────────── helpers ───────────────────────── */
const cx = (...c) => c.filter(Boolean).join(" ");
const withUTM = (url, source = "ygroup") => {
  if (!url || url === "#") return "#";
  try {
    const u = new URL(url);
    if (!u.searchParams.get("utm_source")) u.searchParams.set("utm_source", source);
    return u.toString();
  } catch {
    return url;
  }
};

/* ───────────────────────── i18n ──────────────────────────── */
const COPY = {
  es: {
    brand: "YGroup",
    badge: "Grupo empresarial",
    heroTitle: "Liderando inversiones con impacto en múltiples industrias.",
    heroBody:
      "YGroup integra compañías de salud, distribución, retail y servicios. Menos ruido, más ejecución.",
    viewPortfolio: "Ver portafolio",
    talk: "Conversemos",
    contact: "Contacto",
    thanks: "¡Gracias! Tu mensaje fue enviado. Te contactaremos pronto.",
    buildNext: "Construyamos el siguiente movimiento.",
    writeUs:
      "Escríbenos y conectamos con el equipo correcto dentro del grupo.",
    send: "Enviar",
    up: "Arriba",
    close: "Cerrar",
    all: "Todas",
    webCta: "Sitio web",
    cat_healthcare: "Salud",
    cat_distribution: "Distribución",
    cat_retail: "Retail",
    cat_services: "Servicios",
    blurb_healthcare: "Salud, bienestar y tecnología médica.",
    blurb_distribution: "Logística, insumos y cadena de suministro.",
    blurb_retail: "Marcas y experiencias para el consumidor.",
    blurb_services: "Soluciones digitales y financieras.",
    view: "Ver",
    // subtabs retail:
    retail_food_tab: "Food",
    retail_fashion_tab: "Moda",
  },
  en: {
    brand: "YGroup",
    badge: "Business group",
    heroTitle: "Leading investments with impact across industries.",
    heroBody:
      "YGroup integrates companies in healthcare, distribution, retail and services. Less noise, more execution.",
    viewPortfolio: "View portfolio",
    talk: "Let’s talk",
    contact: "Contact",
    thanks: "Thanks! Your message was sent. We’ll be in touch soon.",
    buildNext: "Let’s build the next move.",
    writeUs:
      "Write to us and we’ll connect you with the right team in the group.",
    send: "Send",
    up: "Top",
    close: "Close",
    all: "All",
    webCta: "Website",
    cat_healthcare: "Healthcare",
    cat_distribution: "Distribution",
    cat_retail: "Retail",
    cat_services: "Services",
    blurb_healthcare: "Health, wellbeing and medical technology.",
    blurb_distribution: "Logistics, supplies, and supply chain.",
    blurb_retail: "Brands and consumer experiences.",
    blurb_services: "Digital and financial solutions.",
    view: "View",
    retail_food_tab: "Food",
    retail_fashion_tab: "Fashion",
  },
};

/* ───────────────────────── data (logos + companies) ──────── */
const LOGOS = {
  regenerationclinicpanama: "/logos/healthcare/regeneration-clinic-panama.png",
  drsalud: "/logos/healthcare/dr-salud.png",
  iseeoptics: "/logos/healthcare/i-see-optics.png",
  medifercorp: "/logos/healthcare/medifer.png",

  aleph: "/logos/distribution/aleph.png",
  velox: "/logos/distribution/velox.png",
  dyoni: "/logos/distribution/dyoni.png",
  montevito: "/logos/distribution/montevito.png",

  mcdonalds: "/logos/retail/mcdonalds.png",
  roadster: "/logos/retail/roadster.png",
  shams: "/logos/retail/shams.png",
  rosaclara: "/logos/retail/rosa-clara.png",

  promedia: "/logos/services/promedia.png",
  paguelofacil: "/logos/services/paguelofacil.png",
};

const COMPANIES = {
  regenerationclinicpanama: {
    name: { es: "Regeneration Clinic Panamá", en: "Regeneration Clinic Panama" },
    story: {
      es: [
        "Nos dedicamos a redefinir el envejecimiento con un enfoque basado en evidencia.",
        "Bienestar a largo plazo con cuidado integral, diagnóstico temprano y terapias regenerativas.",
      ],
      en: [
        "Redefining aging with a science-based approach.",
        "Long-term wellbeing through comprehensive care and regenerative therapies.",
      ],
    },
    contacts: { web: "https://antiagingpanama.com/" },
    url: "https://antiagingpanama.com/",
    images: [
      "/images/companies/regenerationclinicpanama/1.jpg",
      "/images/companies/regenerationclinicpanama/2.jpg",
      "/images/companies/regenerationclinicpanama/3.jpg",
      "/images/companies/regenerationclinicpanama/4.jpg",
      "/images/companies/regenerationclinicpanama/5.jpg",
    ],
  },
  drsalud: {
    name: { es: "Dr. Salud", en: "Dr. Salud" },
    story: {
      es: [
        "Centro médico general para necesidades cotidianas con rapidez y cercanía.",
        "Rutas de atención claras, esperas reducidas y comunicación directa.",
      ],
      en: [
        "General medical center for everyday needs with speed and proximity.",
        "Clear care paths, reduced wait times, and direct communication.",
      ],
    },
    contacts: { instagram: "https://www.instagram.com/doctorsalud.pa/" },
    url: "#",
    images: [
      "/images/companies/drsalud/1.jpg",
      "/images/companies/drsalud/2.jpg",
      "/images/companies/drsalud/3.jpg",
      "/images/companies/drsalud/4.jpg",
      "/images/companies/drsalud/5.jpg",
    ],
  },
  iseeoptics: {
    name: { es: "I See Optics", en: "I See Optics" },
    story: {
      es: [
        "Óptica clínica con laboratorio propio para precisión y velocidad.",
        "Asesoría experta, diagnóstico visual y catálogo amplio.",
      ],
      en: [
        "Clinical optics with an in-house lab for precision and speed.",
        "Expert advice, visual diagnostics and a broad catalog.",
      ],
    },
    contacts: { instagram: "https://www.instagram.com/i.seeoptics/?hl=es" },
    url: "#",
    images: [
      "/images/companies/iseeoptics/1.jpg",
      "/images/companies/iseeoptics/2.jpg",
      "/images/companies/iseeoptics/3.jpg",
      "/images/companies/iseeoptics/4.jpg",
      "/images/companies/iseeoptics/5.jpg",
    ],
  },
  medifercorp: {
    name: { es: "MediferCorp", en: "MediferCorp" },
    story: {
      es: [
        "Comercialización de productos médicos con foco en disponibilidad y cumplimiento.",
        "Trazabilidad y almacenamiento seguro no negociables.",
      ],
      en: [
        "Medical products distribution focused on availability and compliance.",
        "Traceability and safe storage are non-negotiable.",
      ],
    },
    contacts: {},
    url: "#",
    images: ["/companies/medifercorp/1.jpg"],
  },

  aleph: {
    name: { es: "Aleph Group", en: "Aleph Group" },
    story: {
      es: [
        "Actor clave en llantas con expansión regional.",
        "Portafolio competitivo, cobertura logística y relaciones B2B de largo plazo.",
      ],
      en: [
        "Key player in the tire industry with regional expansion.",
        "Competitive portfolio, logistics coverage and long-term B2B relationships.",
      ],
    },
    contacts: { web: "https://alephgroupcorp.com/" },
    url: "https://alephgroupcorp.com/",
    images: [
      "/images/companies/aleph/1.png",
      "/images/companies/aleph/2.webp",
      "/images/companies/aleph/3.jpg",
      "/images/companies/aleph/4.jpg",
    ],
  },
  velox: {
    name: { es: "Velox", en: "Velox" },
    story: {
      es: [
        "Servicios para consultar información pública de empresas en Panamá.",
        "Facilita verificación y transparencia para decisiones informadas.",
      ],
      en: [
        "Services to query public corporate information in Panama.",
        "Enables verification and transparency for informed decisions.",
      ],
    },
    contacts: {},
    url: "#",
    images: ["/images/companies/velox/1.jpeg"],
  },
  dyoni: {
    name: { es: "Dyoni", en: "Dyoni" },
    story: {
      es: [
        "Suministros premium para arguiles: tabacos, carbones de coco y accesorios.",
        "Curaduría enfocada en calidad y disponibilidad real en tienda.",
      ],
      en: [
        "Premium hookah supplies: tobaccos, coconut charcoals and accessories.",
        "Curation focused on quality and real in-store availability.",
      ],
    },
    contacts: {},
    url: "#",
    images: ["/companies/dyoni/1.jpg", "/companies/dyoni/2.jpg"],
  },
  montevito: {
    name: { es: "Montevito", en: "Montevito" },
    story: {
      es: [
        "Vitrina de alimentos y bebidas con curaduría.",
        "Selección cuidada y disponibilidad confiable.",
      ],
      en: ["Curated food & beverage store.", "Careful selection with dependable availability."],
    },
    contacts: {},
    url: "#",
    images: ["/images/companies/montevito/1.jpg", "/images/companies/montevito/2.jpg", "/images/companies/montevito/3.jpg", "/images/companies/montevito/4.jpg", "/images/companies/montevito/5.jpg"],
  },

  mcdonalds: {
    name: { es: "McDonald's", en: "McDonald's" },
    story: {
      es: [
        "Franquicia global de comida rápida con operación local en Panamá, contando con 14 restaurantes en el territorio.",
        "Productos icónicos: hamburguesas, papas, desayunos y bebidas.",
      ],
      en: [
        "Global QSR franchise with robust local operations.",
        "Iconic products: burgers, fries, breakfast and beverages.",
      ],
    },
    contacts: { web: "https://www.mcdonalds.com.pa/" },
    url: "https://www.mcdonalds.com.pa/",
    images: [
      "/images/companies/mcdonalds/1.jpg",
      "/images/companies/mcdonalds/2.jpg",
      "/images/companies/mcdonalds/3.webp",
      "/images/companies/mcdonalds/4.jpg",
      "/images/companies/mcdonalds/5.jpg",
    ],
  },
  roadster: {
    name: { es: "Roadster Diner", en: "Roadster Diner" },
    story: {
      es: [
        "Restaurante estilo diner con ambiente que invita a quedarse.",
        "Clásicos reconfortantes con ejecución consistente.",
      ],
      en: [
        "Diner-style restaurant with a stay-long vibe.",
        "Comfort classics with consistent execution.",
      ],
    },
    contacts: { instagram: "https://www.instagram.com/roadstersdinerpty/?hl=es" },
    url: "#",
    images: [
      "/images/companies/roadster/1.jpg",
      "/images/companies/roadster/2.jpg",
      "/images/companies/roadster/3.webp",
      "/images/companies/roadster/4.jpg",
      "/images/companies/roadster/5.jpg",
    ],
  },
  shams: {
    name: { es: "Shams Market", en: "Shams Market" },
    story: {
      es: [
        "Retail orientado al cuidado personal y la belleza cotidiana.",
        "Marcas confiables y experiencia para descubrir sin prisa.",
      ],
      en: [
        "Retail concept for everyday self-care and beauty.",
        "Trusted brands and an experience for unhurried discovery.",
      ],
    },
    contacts: {},
    url: "#",
    images: ["/images/companies/shams/1.jpeg", "/images/companies/shams/2.jpeg" ],
  },
  rosaclara: {
    name: { es: "Rosa Clara", en: "Rosa Clará" },
    story: {
      es: [
        "Experiencias nupciales y de fiesta con atención al detalle.",
        "Pruebas y ajustes personalizados sin sobresaltos.",
        "Tenemos mas de () locales en las ciudades de ().",
      ],
      en: [
        "Bridal and evening experiences where detail matters.",
        "Personalized fittings and alterations—no surprises.",
      ],
    },
    contacts: { web: "https://www.rosaclara.es/es" },
    url: "https://www.rosaclara.es/es",
    images: [
      "/images/companies/rosaclara/1.webp",
      "/images/companies/rosaclara/2.webp",
      "/images/companies/rosaclara/3.webp",
      "/images/companies/rosaclara/4.webp",
      "/images/companies/rosaclara/5.webp",
    ],
  },

  promedia: {
    name: { es: "Promedia", en: "Promedia" },
    story: {
      es: [
        "Agencia 360° que empuja ideas hasta convertirlas en resultados.",
        "Estrategia, creatividad, producción y performance en un flujo.",
      ],
      en: [
        "360° marketing agency that pushes ideas into results.",
        "Strategy, creativity, production and performance in one flow.",
      ],
    },
    contacts: { web: "https://www.promediapublicidad.com/" },
    url: "https://www.promediapublicidad.com/",
    images: [
      "/images/companies/promedia/1.jpg",
      "/images/companies/promedia/2.jpg",
      "/images/companies/promedia/3.JPG",
      "/images/companies/promedia/4.jpg",
      "/images/companies/promedia/5.JPG",
    ],
  },
  paguelofacil: {
    name: { es: "PagueloFacil", en: "PagueloFacil" },
    story: {
      es: [
        "Plataforma de pagos usada en Panamá con múltiples bancos y canales.",
        "Integración simple, seguridad y soporte cercano.",
      ],
      en: ["Payment platform widely used in Panama.", "Simple integration, security and close support."],
    },
    contacts: { web: "https://www.paguelofacil.com/" },
    url: "https://www.paguelofacil.com/",
    images: [
      "/images/companies/paguelofacil/1.jpg",
      "/images/companies/paguelofacil/2.jpg",
      "/images/companies/paguelofacil/3.jpg",
      "/images/companies/paguelofacil/4.jpeg",
      "/images/companies/paguelofacil/5.jpg",
    ],
  },
};

/* ───── Ajustes de imagen ───── */
const IMAGE_CROP = {
  regenerationclinicpanama: [50, 47, 68, 50, 43],
  drsalud:                  [50, 50, 38, 40, 40],
  iseeoptics:               [56, 50, 50, 50, 50],
  medifercorp:              [50],
  aleph:                    [50, 50, 50, 50, 40],
  velox:                    [8],
  dyoni:                    [50, 50],
  montevito:                [50],
  mcdonalds:                [50, 50, 50, 50, 50],
  roadster:                 [67, 30, 90, 50, 50],
  shams:                    [50],
  rosaclara:                [15, 40, 35, 25, 50],
  promedia:                 [50, 50, 50, 38, 50],
  paguelofacil:             [50, 50, 50, 50, 50],
};

const IMAGE_ZOOM = {
  regenerationclinicpanama: [1, 1, 1, 1, 1],
  drsalud:                  [1, 1, 1, 1, 1],
  iseeoptics:               [1, 1, 1, 1, 1],
  medifercorp:              [1],
  aleph:                    [1, 1, 1, 1, 1],
  velox:                    [1],
  dyoni:                    [1, 1],
  montevito:                [1],
  mcdonalds:                [1, 1, 1, 1, 1],
  roadster:                 [1, 1, 1, 1, 1],
  shams:                    [1],
  rosaclara:                [1, 1, 1, 1, 1],
  promedia:                 [1, 1, 1, 1, 1],
  paguelofacil:             [1, 1, 1, 1, 1],
};

/* ───────── CATEGORÍAS (retail único a nivel superior) ───────── */
const CATEGORIES = [
  {
    id: "healthcare",
    icon: HeartPulse,
    title: { es: COPY.es.cat_healthcare, en: COPY.en.cat_healthcare },
    blurb: { es: COPY.es.blurb_healthcare, en: COPY.en.blurb_healthcare },
    companies: ["regenerationclinicpanama", "drsalud", "iseeoptics", "medifercorp"],
  },
  {
    id: "distribution",
    icon: Share2,
    title: { es: COPY.es.cat_distribution, en: COPY.en.cat_distribution },
    blurb: { es: COPY.es.blurb_distribution, en: COPY.en.blurb_distribution },
    companies: ["aleph", "velox", "dyoni", "montevito"],
  },
  {
    id: "retail",
    icon: ShoppingBag,
    title: { es: COPY.es.cat_retail, en: COPY.en.cat_retail },
    blurb: { es: COPY.es.blurb_retail, en: COPY.en.blurb_retail },
    // Nota: internamente se subdivide; acá no listamos companies.
    companies: [],
  },
  {
    id: "services",
    icon: Briefcase,
    title: { es: COPY.es.cat_services, en: COPY.en.cat_services },
    blurb: { es: COPY.es.blurb_services, en: COPY.en.blurb_services },
    companies: ["promedia", "paguelofacil"],
  },
];

/* ──────────────────────── UI atoms ───────────────────────── */
const Badge = ({ children, theme }) => (
  <span
    className={cx(
      "rounded-full px-3 py-1 text-xs",
      theme === "dark"
        ? "border border-slate-600/60 bg-slate-800/60 text-slate-300"
        : "border border-slate-200 bg-white text-slate-700"
    )}
  >
    {children}
  </span>
);

/* ───────── DiagonalLanding ───────── */
function DiagonalLanding({ theme = "dark", lang = "es", onPick }) {
  const isDark = theme === "dark";
  const t = COPY[lang];
  const [hover, setHover] = React.useState(null);

  const titleColorIdle = isDark ? "text-slate-100/95" : "text-slate-900";
  const blurbColorIdle = isDark ? "text-slate-300/75" : "text-slate-600";
  const iconWrapIdle   = isDark ? "bg-sky-500/10 ring-1 ring-sky-300/30"
                                : "bg-sky-100 ring-1 ring-sky-300/60";
  const iconColorIdle  = isDark ? "text-sky-200" : "text-sky-700";

  const sectionBg = isDark
    ? "bg-[linear-gradient(180deg,#0b1220_0%,#0f172a_100%)]"
    : "bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]";

  const PANEL_BG = isDark ? "rgba(13,23,38,0.9)" : "rgba(255,255,255,0.96)";
  const EDGE_COLOR = isDark ? "rgba(148,163,184,.18)" : "rgba(15,23,42,.16)";

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-12">
      <div className={`relative overflow-hidden rounded-3xl ${sectionBg}`}>
        <div className="hidden md:grid grid-cols-4 gap-0">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => onPick?.(cat.id)}
              onHoverStart={() => setHover(i)}
              onHoverEnd={() => setHover(null)}
              className="relative h-[460px] overflow-hidden"
              initial={false}
              whileHover={{ scale: 1.006 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ scale: hover === i ? 1.012 : 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  background: PANEL_BG,
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                }}
              />

              <div className="absolute inset-y-0 right-0 w-px" style={{ backgroundColor: EDGE_COLOR }} />
              {i === 0 && (
                <div className="absolute inset-y-0 left-0 w-px" style={{ backgroundColor: EDGE_COLOR }} />
              )}

              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={false}
                animate={{ opacity: hover === i ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: isDark
                    ? "radial-gradient(60% 40% at 50% 40%, rgba(56,189,248,.20), transparent 72%)"
                    : "radial-gradient(60% 40% at 50% 40%, rgba(2,132,199,.22), transparent 72%)",
                }}
              />

              <div className="relative z-10 grid h-full place-items-center text-center px-4">
                <div className="grid place-items-center gap-3">
                  <motion.div
                    className={`grid h-16 w-16 place-items-center rounded-2xl ${iconWrapIdle}`}
                    animate={{
                      scale: hover === i ? 1.06 : 1,
                      boxShadow:
                        hover === i
                          ? (isDark
                              ? "0 0 24px rgba(56,189,248,.28)"
                              : "0 0 24px rgba(2,132,199,.30)")
                          : "0 0 0 rgba(0,0,0,0)",
                    }}
                    transition={{ duration: 0.22 }}
                  >
                    <cat.icon className={`h-7 w-7 ${iconColorIdle}`} />
                  </motion.div>

                  <motion.h3
                    className={`text-lg font-semibold transition-colors ${titleColorIdle}`}
                    animate={{
                      color:
                        hover === i
                          ? (isDark ? "#a5f3fc" : "#0369a1")
                          : undefined,
                    }}
                    style={{
                      textShadow:
                        hover === i
                          ? (isDark
                              ? "0 0 14px rgba(56,189,248,.65)"
                              : "0 0 14px rgba(2,132,199,.45)")
                          : "none",
                    }}
                  >
                    {cat.title[lang]}
                  </motion.h3>

                  <motion.p
                    className={`text-xs leading-relaxed max-w-[24ch] ${blurbColorIdle}`}
                    animate={{ opacity: hover === i ? 0.95 : 0.75, y: hover === i ? -2 : 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {cat.blurb[lang]}
                  </motion.p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden grid grid-cols-1 gap-4 p-4">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => onPick?.(cat.id)}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-2xl p-4 text-left ${
                isDark
                  ? "border border-white/10 bg-[rgba(13,23,38,0.9)]"
                  : "border border-slate-200 bg-[rgba(255,255,255,0.96)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${iconWrapIdle}`}>
                  <cat.icon className={`h-6 w-6 ${iconColorIdle}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${titleColorIdle}`}>{cat.title[lang]}</h3>
                  <p className={`text-xs ${blurbColorIdle}`}>{cat.blurb[lang]}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/20"
          onClick={() => onPick?.("healthcare")}
        >
          {t.viewPortfolio} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

/* ───────── Globo en HERO ─────── */
function HeroGlobe({ size = 520, cyan = "#45e6ff" }) {
  const ref = React.useRef(null);
  useEffect(() => {
    const g = ref.current;
    if (!g) return;
    const ctrls = g.controls?.();
    if (ctrls) {
      // Invertimos sentido y subimos velocidad
      ctrls.autoRotate = true;
      ctrls.autoRotateSpeed = -0.65; // negativo = sentido contrario
      ctrls.enableZoom = false;
      ctrls.enablePan = false;
    }
    g.pointOfView({ lat: 15, lng: -40, altitude: 2.1 }, 1200);
  }, []);
  return (
    <div className="relative pointer-events-none" style={{ width: size, height: size }}>
      <Globe
        ref={ref}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor={cyan}
        atmosphereAltitude={0.18}
        globeImageUrl={"/globe/earth-night-equirect.png"}
        bumpImageUrl={"/globe/earth-bump-equirect.png"}
        bumpScale={0.05}
        arcsData={[]}
        pointsData={[]}
        enablePointerInteraction={false}
      />
      <div
        className="absolute inset-0 -z-10 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(69,230,255,.18), transparent 70%)" }}
      />
    </div>
  );
}

/* ───────────────── Carrusel simple ───────────────── */
function Carousel({ images = [], alt = "", theme = "dark", positions = [], zoom = [] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = images.length || 0;

  useEffect(() => {
    if (!n || paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % n), 3500);
    return () => clearInterval(id);
  }, [n, paused]);

  if (!n) return null;

  const go = (dir) => setIdx((i) => (i + dir + n) % n);

  const currentY = positions?.[idx] ?? 50;
  const currentScale = zoom?.[idx] ?? 1;

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl",
        theme === "dark" ? "bg-slate-900/40" : "bg-slate-100"
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="aspect-[16/9] w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[idx]}
            src={images[idx]}
            alt={alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: `50% ${currentY}%`, scale: currentScale }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            loading="lazy"
          />
        </AnimatePresence>
      </div>

      {n > 1 && (
        <>
          <button
            aria-label="prev"
            onClick={() => go(-1)}
            className={cx(
              "absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full p-1.5 backdrop-blur",
              theme === "dark"
                ? "bg-black/30 text-white hover:bg-black/50"
                : "bg-white/70 text-slate-700 hover:bg-white"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="next"
            onClick={() => go(1)}
            className={cx(
              "absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full p-1.5 backdrop-blur",
              theme === "dark"
                ? "bg-black/30 text-white hover:bg-black/50"
                : "bg-white/70 text-slate-700 hover:bg-white"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={cx(
                  "h-1.5 rounded-full transition-all",
                  i === idx ? "w-5" : "w-2",
                  theme === "dark" ? "bg-cyan-300/80" : "bg-sky-600/80"
                )}
                aria-label={`slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ───────────────── Retail con subtabs internos ───────────── */
function RetailCategoryOpen({ theme, lang, logos, companies, onOpenCompany, onClose }) {
  const [sub, setSub] = useState("food"); // "food" | "fashion"
  const t = COPY[lang];

  // Por ahora: Food = mcdonalds, roadster, shams ; Fashion = rosaclara
  const FOOD = ["mcdonalds", "roadster", "shams"];
  const FASHION = ["rosaclara"];

  const currentIds = sub === "food" ? FOOD : FASHION;
  const TitleIcon = ShoppingBag;

  return (
    <div className={cx(
      "rounded-3xl overflow-hidden",
      theme === "dark" ? "border border-slate-800/60" : "border border-slate-200 bg-white"
    )}>
      {/* Header + tabs */}
      <div className={cx(
        "flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between",
        theme === "dark" ? "bg-slate-900/40" : "bg-slate-50"
      )}>
        <div className="flex items-center gap-3">
          <div className={cx(
            "grid h-10 w-10 place-items-center rounded-xl ring-1",
            theme === "dark" ? "ring-sky-400/40 bg-sky-500/10" : "ring-sky-300/60 bg-sky-100"
          )}>
            <TitleIcon className={cx("h-5 w-5", theme === "dark" ? "text-sky-200" : "text-sky-700")} />
          </div>
          <div>
            <h2 className={cx("text-lg font-semibold", theme === "dark" ? "text-slate-100" : "text-slate-900")}>
              {COPY[lang].cat_retail}
            </h2>
            <p className={cx("text-xs", theme === "dark" ? "text-slate-400" : "text-slate-600")}>
              {COPY[lang].blurb_retail}
            </p>
          </div>
        </div>

        {/* Subtabs */}
        <div className={cx(
          "inline-flex rounded-xl p-1",
          theme === "dark" ? "bg-slate-800/60 border border-slate-700" : "bg-white border border-slate-200 shadow-sm"
        )}>
          <button
            onClick={() => setSub("food")}
            className={cx(
              "px-3 py-1.5 text-xs rounded-lg",
              sub === "food"
                ? (theme === "dark" ? "bg-sky-500/20 text-sky-200" : "bg-sky-100 text-sky-700")
                : (theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900")
            )}
          >
            {t.retail_food_tab}
          </button>
          <button
            onClick={() => setSub("fashion")}
            className={cx(
              "px-3 py-1.5 text-xs rounded-lg",
              sub === "fashion"
                ? (theme === "dark" ? "bg-sky-500/20 text-sky-200" : "bg-sky-100 text-sky-700")
                : (theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900")
            )}
          >
            {t.retail_fashion_tab}
          </button>
        </div>
      </div>

      {/* Grid reutilizando CategoryOpen para el listado */}
      <CategoryOpen
        title={COPY[lang].cat_retail}
        blurb={COPY[lang].blurb_retail}
        icon={ShoppingBag}
        companyIds={currentIds}
        onOpenCompany={onOpenCompany}
        onClose={onClose}
        theme={theme}
        lang={lang}
        logos={logos}
        companies={companies}
      />
    </div>
  );
}

/* ───────────────────────── Modales ──────────────────────── */
function CompanyModal({ companyId, onClose, theme = "dark", lang = "es" }) {
  if (!companyId) return null;
  const t = COPY[lang];
  const c = COMPANIES[companyId];
  const name = c?.name?.[lang] ?? companyId;
  const story = c?.story?.[lang] ?? [];
  const contacts = c?.contacts ?? {};
  const logo = LOGOS[companyId];
  const images = c?.images?.length ? c.images : (logo ? [logo] : []);

  const clampStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const positions = IMAGE_CROP[companyId] || [];
  const zoom = IMAGE_ZOOM[companyId] || [];

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25 }}
        className={cx(
          "w-full max-w-3xl rounded-3xl p-0 shadow-2xl overflow-hidden",
          theme === "dark" ? "border border-slate-700/80 bg-slate-950/80" : "border border-slate-200 bg-white"
        )}
      >
        {/* Header */}
        <div className={cx(
          "flex items-center gap-3 px-6 py-4",
          theme === "dark" ? "bg-slate-900/70" : "bg-slate-50"
        )}>
          <div
            className={cx(
              "h-11 w-11 overflow-hidden rounded-xl ring-1",
              theme === "dark" ? "bg-slate-950/90 ring-slate-700/80" : "bg-slate-200 ring-slate-400"
            )}
          >
            <img src={logo} alt={`${name} logo`} className="h-full w-full object-contain" />
          </div>
          <h3 className={cx("text-lg font-semibold tracking-tight", theme === "dark" ? "text-slate-100" : "text-slate-900")}>
            {name}
          </h3>
        </div>

        {/* Carrusel */}
        <div className="px-6 pt-5">
          <Carousel images={images} alt={name} theme={theme} positions={positions} zoom={zoom} />
        </div>

        {/* copy + links */}
        <div className={cx("px-6 pt-5 space-y-3 text-[0.95rem] leading-relaxed", theme === "dark" ? "text-slate-300" : "text-slate-700")}>
          {story.map((p, i) => (
            <p key={i} style={clampStyle} title={p}>
              {p}
            </p>
          ))}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {contacts.web && contacts.web !== "#" && (
              <AButton href={withUTM(contacts.web)} icon={ExternalLink} theme={theme}>
                {COPY[lang].webCta}
              </AButton>
            )}
            {contacts.instagram && contacts.instagram !== "#" && (
              <AButton href={contacts.instagram} icon={Instagram} theme={theme}>
                Instagram
              </AButton>
            )}
            {contacts.facebook && contacts.facebook !== "#" && (
              <AButton href={contacts.facebook} icon={Facebook} theme={theme}>
                Facebook
              </AButton>
            )}
            {contacts.email && (
              <AButton href={`mailto:${contacts.email}`} icon={Mail} theme={theme}>
                Email
              </AButton>
            )}
          </div>
        </div>

        {/* acciones */}
        <div className="px-6 py-5 flex justify-end">
          <button
            onClick={onClose}
            className={cx(
              "rounded-xl px-3 py-1.5 text-sm",
              theme === "dark"
                ? "border border-slate-700/80 text-slate-300 hover:bg-slate-800/80"
                : "border border-slate-300 text-slate-700 hover:bg-slate-50"
            )}
          >
            {t.close}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AButton({ href, children, icon: Icon, theme }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cx(
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium",
        theme === "dark"
          ? "border border-slate-700 bg-slate-900/40 text-slate-200 hover:bg-slate-900 hover:border-sky-500/50"
          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />} {children}
    </a>
  );
}

/* ───────────────────────── Footer & banners ─────────────── */
const Footer = ({ onGoTop, theme, lang }) => (
  <footer className="mx-auto w-full max-w-7xl px-6 pb-12 pt-10">
    <div
      className={cx(
        "flex flex-col items-center justify-between gap-6 rounded-3xl p-6 md:flex-row",
        theme === "dark" ? "border border-slate-800/80 bg-slate-900/40" : "border border-slate-200 bg-white"
      )}
    >
      <div>
        <p className={cx("text-sm", theme === "dark" ? "text-slate-300" : "text-slate-800")}>
          {lang === "es" ? "¿Tienes un proyecto estratégico?" : "Got a strategic project?"}
        </p>
        <p className={cx("text-xs", theme === "dark" ? "text-slate-500" : "text-slate-600")}>
          {lang === "es"
            ? "Conversemos sobre cómo YGroup puede potenciarlo."
            : "Let’s talk about how YGroup can boost it."}
        </p>
      </div>
      <a
        href="#contacto"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/20"
      >
        {COPY[lang].contact} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
    <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 md:flex-row">
      <span>
        © {new Date().getFullYear()} YGroup.{" "}
        {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}
      </span>
      <button
        onClick={onGoTop}
        className={cx(
          "inline-flex items-center gap-1 rounded-lg px-2 py-1",
          theme === "dark"
            ? "border border-slate-700/60 text-slate-300 hover:bg-slate-800/40"
            : "border border-slate-300 text-slate-700 hover:bg-slate-50"
        )}
      >
        <ChevronUp className="h-3.5 w-3.5" /> {COPY[lang].up}
      </button>
    </div>
  </footer>
);

const ThankYouBanner = ({ theme, lang }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const check = () => setShow((window.location.hash || "") === "#gracias");
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);
  if (!show) return null;
  return (
    <div
      className={cx(
        "mb-6 rounded-xl p-4",
        theme === "dark"
          ? "border border-emerald-700/40 bg-emerald-950/40 text-emerald-200"
          : "border border-emerald-200 bg-emerald-50 text-emerald-700"
      )}
    >
      {COPY[lang].thanks}
    </div>
  );
};

/* ───────────────────────────── App ───────────────────────── */
export default function YGroupLanding() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("es");
  const [activeCat, setActiveCat] = useState("all"); // "all" | categoryId
  const [selected, setSelected] = useState(null); // companyId

  const t = COPY[lang];

  useEffect(() => {
    try {
      const st = localStorage.getItem("ygroup_theme");
      const sl = localStorage.getItem("ygroup_lang");
      if (st) setTheme(st);
      if (sl) setLang(sl);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("ygroup_theme", theme);
      localStorage.setItem("ygroup_lang", lang);
    } catch {}
  }, [theme, lang]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const topRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactoRef = useRef(null);
  const emailRef = useRef(null);
  const scrollToEl = (el, opts = { focusEmail: false }) => {
    if (!el?.current) return;
    const y = el.current.getBoundingClientRect().top + window.scrollY - 80;
    window.history.pushState({}, "", `#${el.current.id || ""}`);
    window.scrollTo({ top: y, behavior: "smooth" });
    if (opts.focusEmail) setTimeout(() => emailRef.current?.focus(), 300);
  };

  return (
    <div
      data-theme={theme}
      className={cx(
        "min-h-screen w-full",
        theme === "dark"
          ? "text-slate-100 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(60%_50%_at_80%_10%,rgba(34,211,238,0.10),transparent_60%),linear-gradient(180deg,#0f172a,#0b1220)]"
          : "bg-white text-slate-900"
      )}
    >
      {/* NAV */}
      <header
        className={cx(
          "sticky top-0 z-40 backdrop-blur",
          theme === "dark"
            ? "supports-[backdrop-filter]:bg-slate-900/40"
            : "supports-[backdrop-filter]:bg-white/70 border-b border-slate-200"
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className={cx(
              )}
            >
              <span
                className={cx(
                  "text-sm font-extrabold tracking-widest",
                  theme === "dark" ? "text-slate-900 mix-blend-screen" : "text-slate-800"
                )}
              >
                
              </span>
            </div>
            <button
              onClick={() => scrollToEl(topRef)}
              className={cx("text-sm font-semibold", theme === "dark" ? "text-slate-200" : "text-slate-800")}
            >
              {t.brand}
            </button>
          </div>

          {/* NAV categories */}
          <nav className="hidden lg:flex items-center gap-2">
            {[{ id: "all", title: COPY[lang].all }, ...CATEGORIES.map(c => ({ id: c.id, title: c.title[lang] }))].map(
              (c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCat(c.id);
                    portfolioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={cx(
                    "rounded-xl px-3 py-1.5 text-sm transition",
                    activeCat === c.id
                      ? theme === "dark"
                        ? "bg-sky-500/20 text-sky-200 ring-1 ring-inset ring-sky-400/40"
                        : "bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-300/60"
                      : theme === "dark"
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {c.title}
                </button>
              )
            )}
          </nav>

          {/* switches + CTA */}
          <div className="flex items-center gap-2">
            {/* Idioma */}
            <div
              className={cx(
                "hidden md:flex items-center rounded-xl border px-1 py-0.5 text-xs",
                theme === "dark" ? "border-slate-800 bg-slate-900/50 text-slate-200" : "border-slate-200 bg-white text-slate-700"
              )}
            >
              {["es", "en"].map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={cx(
                    "px-2 py-1 rounded-lg",
                    lang === code
                      ? theme === "dark"
                        ? "bg-sky-500/20 text-sky-200"
                        : "bg-sky-100 text-sky-700"
                      : "opacity-70 hover:opacity-100"
                  )}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Tema */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cx(
                "rounded-xl px-3 py-1.5 text-xs",
                theme === "dark"
                  ? "border border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-900"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              )}
              aria-label="theme"
            >
              {theme === "dark" ? "◐" : "◑"}
            </button>

            {/* CTA */}
            <button
              onClick={() => scrollToEl(contactoRef, { focusEmail: true })}
              className={cx(
                "rounded-xl px-3 py-1.5 text-xs",
                theme === "dark"
                  ? "border border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-900"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              {t.talk}
            </button>
          </div>
        </div>
      </header>

      {/* TOP anchor */}
      <div id="top" ref={topRef} />

      {/* HERO */}
      <section className="relative mx-auto w-full max-w-7xl px-6 pb-10 pt-14 md:pt-16">
        <div className={cx("relative overflow-hidden rounded-3xl border",
          theme === "dark" ? "border-slate-800/60" : "border-slate-300/80")}>
          <BackgroundFX theme={theme} />
          <div className="relative grid p-8 md:p-10 items-center md:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] gap-6">
            {/* texto */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start gap-6"
            >
              <Badge theme={theme}>{COPY[lang].badge}</Badge>

              <h1
                className="font-semibold tracking-tight"
                style={{
                  fontSize: "clamp(2.25rem, 4.6vw + 0.25rem, 3.75rem)",
                  lineHeight: 1.08,
                  maxWidth: "12.5ch",
                  textWrap: "balance",
                  margin: 0,
                }}
              >
                {COPY[lang].heroTitle}
              </h1>

              <p
                className={cx("text-sm md:text-base",
                  theme === "dark" ? "text-slate-300/85" : "text-slate-600")}
                style={{ maxWidth: "40ch", margin: 0 }}
              >
                {COPY[lang].heroBody}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setActiveCat("healthcare");
                    portfolioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/20"
                >
                  {COPY[lang].viewPortfolio} <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToEl(contactoRef, { focusEmail: true })}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm",
                    theme === "dark"
                      ? "border border-slate-700 bg-slate-900/40 text-slate-200 hover:bg-slate-900"
                      : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                  )}
                >
                  {t.talk}
                </button>
              </div>
            </motion.div>

            {/* globo */}
            <div className="hidden md:flex items-center justify-center">
              <HeroGlobe size={520} />
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" ref={portfolioRef} className="mx-auto w-full max-w-7xl px-6 pb-10">
        {activeCat === "all" ? (
          <DiagonalLanding theme={theme} lang={lang} onPick={setActiveCat} />
        ) : activeCat === "retail" ? (
          <RetailCategoryOpen
            theme={theme}
            lang={lang}
            logos={LOGOS}
            companies={COMPANIES}
            onOpenCompany={(id) => setSelected(id)}
            onClose={() => setActiveCat("all")}
          />
        ) : (
          <div className={cx(
            "rounded-3xl overflow-hidden",
            theme === "dark"
              ? "border border-slate-800/60"
              : "border border-slate-200 bg-white"
          )}>
            <CategoryOpen
              key={theme}
              title={CATEGORIES.find((c) => c.id === activeCat).title[lang]}
              blurb={CATEGORIES.find((c) => c.id === activeCat).blurb[lang]}
              icon={CATEGORIES.find((c) => c.id === activeCat).icon}
              companyIds={CATEGORIES.find((c) => c.id === activeCat).companies}
              onOpenCompany={(id) => setSelected(id)}
              onClose={() => setActiveCat("all")}
              theme={theme}
              lang={lang}
              logos={LOGOS}
              companies={COMPANIES}
            />
          </div>
        )}
      </section>

      {/* MODAL company */}
      {selected && (
        <CompanyModal
          companyId={selected}
          onClose={() => setSelected(null)}
          theme={theme}
          lang={lang}
        />
      )}

      {/* CONTACTO */}
      <section id="contacto" ref={contactoRef} className="mx-auto w-full max-w-7xl px-6 py-12">
        <div
          className={cx(
            "rounded-3xl p-8",
            theme === "dark"
              ? "border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-900/40"
              : "border border-slate-200 bg-white"
          )}
        >
          <div className="grid items-center gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className={cx("text-2xl font-semibold", theme === "dark" ? "text-slate-50" : "text-slate-900")}>
                {COPY[lang].buildNext}
              </h2>
              <p className={cx("mt-1 text-sm", theme === "dark" ? "text-slate-400" : "text-slate-600")}>
                {COPY[lang].writeUs}
              </p>
            </div>
            <form className="grid gap-3" action="https://formsubmit.co/contacto@ygroup.com" method="POST">
              <input type="hidden" name="_subject" value="Contacto YGroup" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="/#gracias" />
              <input
                ref={emailRef}
                placeholder={lang === "es" ? "Tu correo" : "Your email"}
                type="email"
                name="email"
                required
                className={cx(
                  "rounded-xl px-3 py-2 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500",
                  theme === "dark"
                    ? "border border-slate-800 bg-slate-900/60 text-slate-200"
                    : "border border-slate-300 bg-white text-slate-800"
                )}
              />
              <input
                placeholder={lang === "es" ? "Empresa / proyecto" : "Company / project"}
                name="empresa"
                className={cx(
                  "rounded-xl px-3 py-2 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500",
                  theme === "dark"
                    ? "border border-slate-800 bg-slate-900/60 text-slate-200"
                    : "border border-slate-300 bg-white text-slate-800"
                )}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/20"
              >
                {COPY[lang].send}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* GRACIAS */}
      <section id="gracias" className="mx-auto w-full max-w-7xl px-6 pb-4">
        <ThankYouBanner theme={theme} lang={lang} />
      </section>

      <Footer
        theme={theme}
        lang={lang}
        onGoTop={() => {
          if (topRef.current) window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}