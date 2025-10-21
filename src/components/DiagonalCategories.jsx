import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Share2, ShoppingBag, Briefcase } from "lucide-react";

// Utilidad para classes
const cx = (...c) => c.filter(Boolean).join(" ");

const CARDS = [
  {
    id: "healthcare",
    icon: HeartPulse,
    label: { es: "Salud", en: "Healthcare" },
    blurb: {
      es: "Salud, bienestar y tecnología médica.",
      en: "Health, wellbeing and medical tech.",
    },
    tint: "from-cyan-400/10 to-cyan-500/5",
  },
  {
    id: "distribution",
    icon: Share2,
    label: { es: "Distribución", en: "Distribution" },
    blurb: {
      es: "Logística, insumos y cadena de suministro.",
      en: "Logistics, supplies & supply chain.",
    },
    tint: "from-sky-400/10 to-sky-500/5",
  },
  {
    id: "retail",
    icon: ShoppingBag,
    label: { es: "Retail", en: "Retail" },
    blurb: {
      es: "Marcas y experiencias para el consumidor.",
      en: "Brands & consumer experiences.",
    },
    tint: "from-teal-400/10 to-teal-500/5",
  },
  {
    id: "services",
    icon: Briefcase,
    label: { es: "Servicios", en: "Services" },
    blurb: {
      es: "Soluciones digitales y financieras.",
      en: "Digital & financial solutions.",
    },
    tint: "from-emerald-400/10 to-emerald-500/5",
  },
];

/**
 * Barras diagonales grandes con animación hover y click
 * - clipPath para bordes diagonales
 * - Altura mayor (clamps por viewport)
 * - Icono y textos centrados
 */
export default function DiagonalCategories({
  theme = "dark",
  lang = "es",
  onSelect, // (categoryId) => void
}) {
  return (
    <section
      className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-label="Categorías"
    >
      <div
        className={cx(
          "relative mx-auto grid gap-4 md:gap-6",
          // 4 columnas en desktop; 2x2 en tablet; 1x4 en móvil
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}
        style={{
          // altura generosa como pediste
          minHeight: "42vh",
        }}
      >
        {CARDS.map((c, idx) => (
          <CategoryColumn
            key={c.id}
            data={c}
            theme={theme}
            lang={lang}
            index={idx}
            onSelect={() => onSelect?.(c.id)}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryColumn({ data, theme, lang, index, onSelect }) {
  const Icon = data.icon;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cx(
        "group relative isolate overflow-hidden rounded-3xl p-6 sm:p-7 md:p-8 text-left",
        theme === "dark"
          ? "bg-slate-900/35 ring-1 ring-inset ring-slate-800/80"
          : "bg-white ring-1 ring-inset ring-slate-200",
        "shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]"
      )}
      style={{
        // Borde diagonal con clip-path (funciona bien sin imágenes)
        clipPath:
          "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)",
        minHeight: "min(64vh, 620px)", // columnas grandes
      }}
    >
      {/* Fondo “blurred” tipo hero de tu mockup */}
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[radial-gradient(120%_80%_at_50%_10%,rgba(5,120,180,0.10),transparent_60%)]"
        )}
      />
      {/* Gradiente tenue por categoría */}
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br",
          data.tint
        )}
      />
      {/* Glow al hover */}
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-300",
          "group-hover:opacity-100",
          theme === "dark"
            ? "bg-[radial-gradient(60%_60%_at_50%_40%,rgba(56,189,248,0.18),transparent_70%)]"
            : "bg-[radial-gradient(60%_60%_at_50%_40%,rgba(14,165,233,0.20),transparent_70%)]"
        )}
      />

      {/* Contenido centrado */}
      <div className="flex h-full flex-col items-center justify-center gap-4 sm:gap-5">
        <div
          className={cx(
            "grid h-16 w-16 place-items-center rounded-2xl ring-1 ring-inset transition",
            theme === "dark"
              ? "bg-slate-800/60 ring-slate-700 group-hover:ring-sky-400/60"
              : "bg-slate-100 ring-slate-300 group-hover:ring-sky-300"
          )}
        >
          <Icon
            className={cx(
              "h-7 w-7 transition",
              theme === "dark" ? "text-sky-200" : "text-sky-600",
              "group-hover:scale-110"
            )}
          />
        </div>

        <div className="text-center">
          <h3
            className={cx(
              "text-lg sm:text-xl font-semibold tracking-tight",
              theme === "dark" ? "text-slate-100" : "text-slate-900"
            )}
          >
            {data.label[lang]}
          </h3>
          <p
            className={cx(
              "mt-1 text-sm max-w-[24ch] mx-auto",
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            )}
          >
            {data.blurb[lang]}
          </p>
        </div>
      </div>

      {/* Borde luminoso al pasar el mouse */}
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0 rounded-3xl ring-1 transition",
          "ring-transparent group-hover:ring-sky-400/40"
        )}
        style={{
          clipPath: "inherit",
        }}
      />
    </motion.button>
  );
}