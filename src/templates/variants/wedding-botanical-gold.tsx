import * as React from "react";
import type { TemplateDef } from "../types";
import * as Lucide from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

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
  Preview: ({
    title,
    description,
    date,
    location,
    program,
    rsvpStatus,
    sending,
    onAccept,
    onDecline,
    inviteeName,
  }) => {
    const titleText = title || "Ślub";
    const locationText = location || "Kościół";
    const dateText = date
      ? format(new Date(date), "d MMMM yyyy, 'godzina' HH:mm", { locale: pl })
      : "Sobota, 14:30";

    // Personalizowany nagłówek dla gościa
    const personalizedGreeting = inviteeName
      ? `${inviteeName}, zapraszamy serdecznie!`
      : "Serdecznie zapraszamy";

    return (
      <div className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <LeafDecor position="bottom-right" />
        <LeafDecor position="top-left" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:py-14">
          <div className="rounded-2xl bg-white/90 p-8 shadow-xl ring-1 ring-black/5 backdrop-blur">
            {/* HEADER */}
            <div className="text-center">
              <div className="mx-auto mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
              <h1 className="font-serif text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                {titleText}
              </h1>
              <p className="mt-2 text-sm text-emerald-700 sm:text-base">
                {locationText}
              </p>
              <p className="text-xs text-gray-500">{dateText}</p>
            </div>

            {/* TREŚĆ */}
            <div className="prose prose-emerald mx-auto mt-8 max-w-2xl text-gray-700 prose-p:leading-relaxed">
              <p className="text-center italic text-emerald-700 font-medium">
                {personalizedGreeting}
              </p>
              <p className="whitespace-pre-wrap mt-3">
                {description ||
                  "Mamy zaszczyt zaprosić Was do wspólnego świętowania naszego ślubu. Po ceremonii zapraszamy na przyjęcie weselne w ogrodach Dworu Konstancja. Prosimy o potwierdzenie obecności do 10 czerwca."}
              </p>
            </div>

            {/* HARMONOGRAM */}
            {program && program.length > 0 && (
              <div className="mx-auto mt-10 max-w-3xl">
                <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-gray-600">
                  Harmonogram Wydarzenia
                </h3>

                <ol className="relative ">
                  {program
                    .slice()
                    .map((it, idx) => ({
                      ...it,
                      _pos: typeof it.position === "number" ? it.position : idx,
                    }))
                    .sort((a, b) => a._pos - b._pos)
                    .map((it, idx, arr) => {
                      const Icon =
                        (it.icon && (Lucide as any)[it.icon]) || Lucide.Dot;
                      const isFirst = idx === 0;
                      const isLast = idx === arr.length - 1;

                      return (
                        <li
                          key={idx}
                          className="relative grid grid-cols-[1fr_auto] gap-4 pl-12 py-2"
                        >
                          {!isFirst && (
                            <span
                              aria-hidden
                              className="pointer-events-none absolute left-[18px] w-px bg-amber-300"
                              style={{ top: 0, bottom: "50%" }}
                            />
                          )}
                          {!isLast && (
                            <span
                              aria-hidden
                              className="pointer-events-none absolute left-[18px] w-px bg-amber-300"
                              style={{ top: "50%", bottom: 0 }}
                            />
                          )}
                          <span className="absolute left-[18px] top-1/2 -translate-y-1/2 -translate-x-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 ring-1 ring-amber-300">
                            <Icon className="h-4 w-4 text-amber-700" />
                          </span>

                          <div>
                            <div className="font-semibold text-gray-900">
                              {it.header}
                            </div>
                            {it.subheader && (
                              <div className="text-sm text-gray-500">
                                {it.subheader}
                              </div>
                            )}
                          </div>

                          <div className="text-right text-sm font-semibold text-gray-700">
                            {it.time}
                          </div>
                        </li>
                      );
                    })}
                </ol>
              </div>
            )}

            {/* RSVP */}
            {!rsvpStatus ? (
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  disabled={sending}
                  onClick={onAccept}
                  className="cursor-pointer rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 font-semibold transition"
                >
                  Wezmę udział
                </button>
                <button
                  disabled={sending}
                  onClick={onDecline}
                  className="cursor-pointer rounded-xl border border-amber-400 text-amber-700 hover:bg-amber-50 px-6 py-3 font-semibold transition"
                >
                  Nie mogę uczestniczyć
                </button>
              </div>
            ) : rsvpStatus === "ACCEPTED" ? (
              <div className="mt-10 text-center text-emerald-700 font-medium">
                <Lucide.CheckCircle2 className="mx-auto mb-2 h-8 w-8" />
                Cieszymy się, że będziesz!
              </div>
            ) : (
              <div className="mt-10 text-center text-amber-700 font-medium">
                <Lucide.XCircle className="mx-auto mb-2 h-8 w-8" />
                Szkoda, że się nie zobaczymy.
              </div>
            )}

            <Ornament />
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
