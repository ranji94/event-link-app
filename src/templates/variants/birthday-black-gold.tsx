import type { TemplateDef } from "../types";
import * as Lucide from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

/**
 * 30TH BIRTHDAY — Black & Gold Neon
 * - Ciemne, eleganckie tło + złote akcenty i neonowa „30”
 * - Layout „boarding pass / VIP pass” z sekcją hero i blokami info
 */
export const thirtyBlackGoldNeon: TemplateDef = {
  id: "thirty-black-gold-neon",
  name: "30th — Black & Gold Neon",
  accent: "amber",
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
    const titleText = title || "Trzydziestka!";
    const whenText = date
      ? format(new Date(date), "EEEE, d MMMM yyyy 'o' HH:mm", { locale: pl })
      : "Sobota, 20:00";
    const whereText = location || "Miejsce imprezy";
    const hi = inviteeName
      ? `${inviteeName}, świętujemy 30!`
      : "Świętujemy 30!";

    return (
      <div className="relative min-h-[80vh] w-full overflow-hidden bg-black">
        {/* Tło: gradient + 'iskry' */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0b0b0b_0%,_#000_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen">
          {Array.from({ length: 70 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                background:
                  i % 7 === 0
                    ? "rgba(251,191,36,0.9)" // amber-400
                    : "rgba(245,158,11,0.35)", // amber-500/35
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: "0 0 10px rgba(251,191,36,0.8)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:py-14">
          <div className="overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-b from-zinc-900/70 to-black/70 shadow-[0_0_40px_rgba(245,158,11,0.15)] backdrop-blur">
            {/* HERO */}
            <div className="relative flex flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:items-stretch sm:gap-8 sm:px-10">
              <NeonThirty />
              <div className="flex-1 text-center sm:text-left">
                <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  {titleText}
                </h1>
                <p className="mt-2 text-amber-300">{hi}</p>
                <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                  <InfoPill icon={Lucide.CalendarDays} label={whenText} />
                  <InfoPill icon={Lucide.MapPin} label={whereText} />
                </div>
              </div>
            </div>

            {/* TREŚĆ */}
            <div className="px-6 pb-8 sm:px-10">
              <div className="mx-auto max-w-2xl text-center sm:text-left">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
                  {description ||
                    "Wpadnij świętować okrągłe 30! Będzie muzyka, tort, bar z koktajlami i strefa zdjęć. Styl: smart casual z nutą złota ✨"}
                </p>
              </div>
            </div>

            {/* PROGRAM — karty w rzędzie */}
            {program && program.length > 0 && (
              <div className="px-6 pb-8 sm:px-10">
                <h3 className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-amber-300 sm:text-left">
                  Plan imprezy
                </h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {program
                    .slice()
                    .map((it, idx) => ({
                      ...it,
                      _pos: typeof it.position === "number" ? it.position : idx,
                    }))
                    .sort((a, b) => a._pos - b._pos)
                    .map((it, idx) => {
                      const Icon =
                        (it.icon && (Lucide as any)[it.icon]) || Lucide.Music2;
                      return (
                        <div
                          key={idx}
                          className="rounded-2xl border border-amber-400/20 bg-zinc-900/60 p-4 text-zinc-100"
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/15 ring-1 ring-amber-400/30">
                              <Icon className="h-4 w-4 text-amber-300" />
                            </span>
                            <div className="text-sm font-semibold text-white">
                              {it.header}
                            </div>
                            <span className="ml-auto text-xs font-medium text-amber-300">
                              {it.time}
                            </span>
                          </div>
                          {it.subheader && (
                            <div className="text-xs text-zinc-300">
                              {it.subheader}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* RSVP */}
            <div className="px-6 pb-10 sm:px-10">
              {!rsvpStatus ? (
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    disabled={sending}
                    onClick={onAccept}
                    className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black shadow hover:bg-amber-400 disabled:opacity-60"
                  >
                    Będę!
                  </button>
                  <button
                    disabled={sending}
                    onClick={onDecline}
                    className="rounded-xl border border-amber-400/50 px-6 py-3 font-semibold text-amber-300 hover:bg-amber-400/10 disabled:opacity-60"
                  >
                    Tym razem nie dam rady
                  </button>
                </div>
              ) : rsvpStatus === "ACCEPTED" ? (
                <div className="text-center font-medium text-amber-300">
                  <Lucide.ThumbsUp className="mx-auto mb-2 h-8 w-8" />
                  Super — do zobaczenia na parkiecie!
                </div>
              ) : (
                <div className="text-center font-medium text-zinc-300">
                  <Lucide.CircleSlash2 className="mx-auto mb-2 h-8 w-8 text-amber-300" />
                  Szkoda, że się nie spotkamy.
                </div>
              )}
            </div>
            <DividerGlow />
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl ring-1 ring-inset ring-amber-400/30">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />
      <div className="absolute left-3 top-3 h-4 w-14 rounded-full bg-amber-400/60 blur-[1px]" />
      <div className="absolute right-3 bottom-3 h-3 w-10 rounded-full bg-amber-200/50" />
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        width="74"
        height="34"
        viewBox="0 0 74 34"
      >
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          className="fill-amber-300"
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          30
        </text>
      </svg>
    </div>
  ),
};

/* ====== Dekoracje / elementy ====== */

function InfoPill({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-amber-200">
      <Icon className="h-4 w-4 text-amber-300" />
      {label}
    </span>
  );
}

function NeonThirty() {
  return (
    <div className="relative mx-auto aspect-[3/2] w-64 max-w-full select-none">
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.12),_transparent_60%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div
            className="absolute inset-0 blur-2xl"
            style={{ boxShadow: "0 0 80px 20px rgba(251,191,36,0.35)" }}
          />
          <svg width="220" height="120" viewBox="0 0 220 120">
            <defs>
              <linearGradient id="gold" x1="0" x2="1">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="65%"
              textAnchor="middle"
              fill="url(#gold)"
              stroke="#fbbf24"
              strokeWidth="1"
              style={{
                fontFamily: "ui-serif, Georgia, serif",
                fontWeight: 900,
                fontSize: 82,
                letterSpacing: 2,
                filter:
                  "drop-shadow(0 0 12px rgba(251,191,36,0.6)) drop-shadow(0 0 28px rgba(245,158,11,0.35))",
              }}
            >
              30
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function DividerGlow() {
  return (
    <div className="pb-6">
      <div className="mx-auto h-px w-[85%] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
    </div>
  );
}
