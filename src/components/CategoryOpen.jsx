// src/components/CategoryOpen.jsx
import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

/**
 * CategoryOpen
 * - Muestra la cabecera de categoría + grilla de compañías.
 * - Soporta tema "dark" o "light".
 * - Hover: zoom + glow suave.
 *
 * Props:
 *  - title, blurb, icon: string | React component (Icon)
 *  - companyIds: string[]
 *  - onOpenCompany: (companyId) => void
 *  - onClose: () => void
 *  - theme: "dark" | "light"
 *  - lang: "es" | "en"
 *  - logos?: Record<id, url>
 *  - companies?: Record<id, { name: {es,en}, url? }>
 */

const cx = (...c) => c.filter(Boolean).join(" ");

function humanizeId(id) {
  if (!id) return "";
  return id
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function CategoryOpen({
  title,
  blurb,
  icon: Icon,
  companyIds = [],
  onOpenCompany,
  onClose,
  theme = "dark",
  lang = "es",
  logos,
  companies,
}) {
  const isDark = theme === "dark";

  const frameBorder = isDark ? "border-slate-800/60" : "border-slate-200";
  const frameBg = isDark ? "bg-transparent" : "bg-white";
  const titleColor = isDark ? "text-slate-100" : "text-slate-900";
  const blurbColor = isDark ? "text-slate-300/80" : "text-slate-600";
  const backBtn =
    isDark
      ? "border-slate-800 bg-slate-900/60 text-slate-200 hover:bg-slate-900"
      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";

  return (
    <section className="relative w-full">
      {/* Cabecera sticky de la categoría */}
      <div
        className={cx(
          "sticky -top-px z-30 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-transparent",
          isDark ? "border-slate-800/70" : "border-slate-200/90 bg-white/70"
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className={cx(
                "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm transition",
                backBtn
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "es" ? "Cerrar" : "Close"}</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={cx(
                "grid h-9 w-9 place-items-center rounded-xl ring-1 ring-inset",
                isDark
                  ? "bg-sky-500/15 ring-sky-400/30"
                  : "bg-sky-100 ring-sky-300/60"
              )}
              aria-hidden
            >
              {Icon ? (
                <Icon className={cx("h-5 w-5", isDark ? "text-sky-200" : "text-sky-700")} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div
        className={cx(
          "mx-auto mt-6 w-full max-w-7xl rounded-3xl border p-6 md:p-8",
          frameBorder,
          frameBg
        )}
      >
        {/* Encabezado de categoría */}
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-3xl">
            <h2 className={cx("text-2xl md:text-3xl font-semibold", titleColor)}>{title}</h2>
            {blurb ? (
              <p className={cx("mt-1 text-sm md:text-base", blurbColor)}>{blurb}</p>
            ) : null}
          </div>

          {/* CTA lateral opcional */}
          <a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/20"
          >
            {lang === "es" ? "Conversemos" : "Let’s talk"} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Grid de compañías */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companyIds.map((id) => (
            <CompanyCard
              key={id}
              id={id}
              theme={theme}
              lang={lang}
              onOpen={() => onOpenCompany?.(id)}
              logoUrl={logos?.[id]}
              companyObj={companies?.[id]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Card de compañía ───────── */
function CompanyCard({ id, onOpen, theme, lang, logoUrl, companyObj }) {
  const isDark = theme === "dark";

  const name =
    companyObj?.name?.[lang] ??
    companyObj?.name?.es ??
    humanizeId(id);

  const logo = logoUrl ?? companyObj?.logo ?? null;

  const cardBase =
    "group relative overflow-hidden rounded-2xl transition-all border p-4 md:p-5";
  const cardTheme = isDark
    ? "border-white/10 bg-white/5 hover:shadow-[0_16px_50px_-18px_rgba(14,165,233,.35)]"
    : "border-slate-200 bg-white hover:shadow-[0_16px_50px_-18px_rgba(2,132,199,.25)]";

  return (
    <button onClick={onOpen} className={cx(cardBase, cardTheme)}>
      {/* fondo/glow hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isDark
            ? "radial-gradient(60% 40% at 50% 20%, rgba(56,189,248,.14), transparent 70%)"
            : "radial-gradient(60% 40% at 50% 20%, rgba(14,165,233,.18), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex items-start gap-3">
        {/* Logo */}
        <div
          className={cx(
            "grid h-12 w-12 shrink-0 place-items-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105",
            isDark ? "bg-slate-950/60 ring-slate-700/70" : "bg-slate-50 ring-slate-200"
          )}
        >
          {logo ? (
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-9 w-9 object-contain"
              loading="lazy"
            />
          ) : (
            <span className={cx("text-base font-semibold", isDark ? "text-slate-300" : "text-slate-700")}>
              {name?.charAt(0) ?? "•"}
            </span>
          )}
        </div>

        {/* Texto */}
        <div className="min-w-0">
          <h3 className={cx("truncate text-left text-sm font-semibold", isDark ? "text-slate-100" : "text-slate-900")}>
            {name}
          </h3>
          <div className={cx("mt-1 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] ring-1",
            isDark ? "text-sky-200 ring-sky-300/30 bg-sky-500/10" : "text-sky-700 ring-sky-300/60 bg-sky-100")}>
            {lang === "es" ? "Ver" : "View"} <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </button>
  );
}