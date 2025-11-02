import * as React from "react";
import type { TemplateDef } from "../types";

/**
 * WEDDING – Botanical & Gold
 * - Pełnoekranowy układ „zaproszenia” (centralna karta na delikatnym tle)
 * - Zielone listki (SVG) + złote elementy dekoracyjne (gradient)
 * - Responsywna typografia
 */
export const weddingBotanicalGold: TemplateDef = {
  id: "wedding-botanical-gold",
  name: "Wedding — Botanical & Gold",
  accent: "emerald",
  Preview: ({ title, description, date, location }) => {
    const titleText = title || "Ślub Ani & Pawła";
    const locationText = location || "Warszawa — Kościół św. Anny";
    const dateText = date ? new Date(date).toLocaleString() : "Sobota, 14:30";

    return (
      <div className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        {/* Dekor: złote kropki */}
        <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)]">
          <svg
            aria-hidden
            className="h-full w-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient id="goldDot" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#facc15" />
              </radialGradient>
            </defs>
            {Array.from({ length: 120 }).map((_, i) => (
              <circle
                key={i}
                cx={(i * 97) % 1200}
                cy={(i * 53) % 800}
                r={Math.max(0.6, (i % 5) * 0.6)}
                fill="url(#goldDot)"
                opacity={0.5}
              />
            ))}
          </svg>
        </div>

        {/* Dekor: zielone liście (rogi) */}
        <LeafDecor position="top-left" />
        <LeafDecor position="bottom-right" />

        {/* Centralna karta zaproszenia */}
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <div className="rounded-2xl bg-white/90 p-8 shadow-xl ring-1 ring-black/5 backdrop-blur">
            {/* Nagłówek / imiona */}
            <div className="text-center">
              <div className="mx-auto mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
              <h1 className="font-serif text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                {titleText}
              </h1>
              <p className="mt-2 text-sm text-emerald-700 sm:text-base">
                {locationText}
              </p>
              <p className="text-xs text-gray-500">{dateText}</p>

              {/* Złoty separator „ornament” */}
              <Ornament />
            </div>

            {/* Treść zaproszenia */}
            <div className="prose prose-emerald mx-auto mt-6 max-w-none text-gray-700 prose-p:leading-relaxed">
              <p className="whitespace-pre-wrap">
                {description ||
                  "Mamy zaszczyt zaprosić Was do wspólnego świętowania naszego ślubu. Po ceremonii zapraszamy na przyjęcie weselne w ogrodach Dworu Konstancja. Prosimy o potwierdzenie obecności do 10 czerwca."}
              </p>
            </div>

            {/* Stopka / drobne informacje */}
            <div className="mt-8 text-center text-xs text-gray-500">
              <span>Dress code: koktajlowy</span>
              <span className="mx-2">•</span>
              <span>RSVP do 10.06</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl ring-1 ring-inset ring-black/5">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
      <div className="absolute left-2 top-2 h-4 w-14 rounded-full bg-amber-400/70" />
      <div className="absolute right-2 bottom-2 h-3 w-10 rounded-full bg-emerald-300/70" />
      <div className="absolute inset-x-2 top-1/2 h-3 rounded bg-white/80 ring-1 ring-black/5" />
    </div>
  ),
};

/* ========= Dekoracje ========= */

function Ornament() {
  return (
    <div className="mt-5 flex items-center justify-center">
      <svg
        aria-hidden
        width="180"
        height="24"
        viewBox="0 0 180 24"
        className="text-amber-500"
      >
        <defs>
          <linearGradient id="goldLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
        </defs>
        <path
          d="M5 12h60c10 0 15-10 25-10s15 10 25 10h60"
          stroke="url(#goldLine)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="90" cy="12" r="3" fill="#f59e0b" />
      </svg>
    </div>
  );
}

function LeafDecor({ position }: { position: "top-left" | "bottom-right" }) {
  const common = "pointer-events-none absolute opacity-60";
  const cls =
    position === "top-left"
      ? `${common} left-[-20px] top-[-20px]`
      : `${common} right-[-20px] bottom-[-20px] rotate-180`;
  return (
    <svg
      aria-hidden
      className={cls}
      width="220"
      height="220"
      viewBox="0 0 220 220"
    >
      <g fill="none" stroke="#10b981" strokeWidth="1.4">
        <path d="M10 140 C 40 120, 60 100, 70 60" />
        <path d="M30 150 C 60 130, 85 110, 95 70" />
        <path d="M55 165 C 85 145, 105 120, 120 85" />
        <path d="M85 180 C 110 160, 130 135, 145 100" />
        {/* listki */}
        {[
          [68, 75],
          [98, 90],
          [128, 105],
          [155, 120],
        ].map(([x, y], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="10"
            ry="18"
            transform={`rotate(${i * 8} ${x} ${y})`}
            fill="#a7f3d0"
            stroke="#34d399"
            strokeWidth="0.8"
            opacity="0.9"
          />
        ))}
      </g>
    </svg>
  );
}
