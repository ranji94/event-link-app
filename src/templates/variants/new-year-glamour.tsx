"use client";

import * as React from "react";
import * as Lucide from "lucide-react";
import { TemplateDef } from "../types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { translate } from "@/locales";

/**
 * New Year Glamour – sylwestrowy szablon premium:
 * - tło black & gold
 * - fajerwerki, konfetti, błyszczące dekoracje
 * - elegancki box z RSVP i odliczaniem
 */

function useRsvpCountdown(rsvpDeadline?: string | null) {
  const [now, setNow] = React.useState<Date>(() => new Date());

  const deadlineDate = React.useMemo(
    () => (rsvpDeadline ? new Date(rsvpDeadline) : null),
    [rsvpDeadline]
  );

  React.useEffect(() => {
    if (!deadlineDate) return;
    const id = setInterval(() => {
      setNow(new Date());
    }, 60_000); // minuta po minucie
    return () => clearInterval(id);
  }, [deadlineDate]);

  if (!deadlineDate) {
    return {
      deadlineDate: null as Date | null,
      isExpired: false,
      countdown: null as string | null,
    };
  }

  const diffMs = deadlineDate.getTime() - now.getTime();
  const isExpired = diffMs <= 0;

  if (isExpired) {
    return { deadlineDate, isExpired: true, countdown: null as string | null };
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  // format: dd:hh:mm (dni:godziny:minuty)
  const parts: string[] = [];
  if (days > 0) {
    parts.push(String(days).padStart(2, "0"));
  } else {
    parts.push("00");
  }
  parts.push(String(hours).padStart(2, "0"));
  parts.push(String(minutes).padStart(2, "0"));

  return {
    deadlineDate,
    isExpired: false,
    countdown: parts.join(":"), // np. 01:05:23
  };
}

export const newYearGlamour: TemplateDef = {
  id: "new-year-glamour",
  name: "New Year's Eve Glamour",
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
    dressCode,
    rsvpDeadline,
  }) => {
    const titleText =
      title || translate("templates.new_year_glamour.title_fallback");
    const locationText =
      location || translate("templates.new_year_glamour.location_default");
    const dateText = date
      ? format(new Date(date), "d MMMM yyyy, 'godzina' HH:mm", { locale: pl })
      : translate("templates.new_year_glamour.date_fallback");

    const personalizedGreeting = inviteeName
      ? `${inviteeName}, ${translate(
          "templates.new_year_glamour.greeting_personalized"
        )}`
      : translate("templates.new_year_glamour.greeting");

    const undertitle = translate("templates.new_year_glamour.undertitle");

    const descriptionText =
      description ||
      translate("templates.new_year_glamour.description_default");

    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);

    return (
      <div className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 pb-[env(safe-area-inset-bottom)]">
        {/* Dekoracje tła */}
        <div className="block">
          <Fireworks />
        </div>
        <div className="block">
          <ConfettiRain />
        </div>
        <SparklesBg />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black shadow-2xl ring-1 ring-amber-500/20 sm:rounded-3xl">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900/70 to-amber-900/20 px-5 py-10 text-center sm:px-8 sm:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.12),transparent_55%)]" />
              <div className="mx-auto max-w-sm sm:max-w-none">
                <ClockDecor />
              </div>

              <div className="relative z-10 mt-6 sm:mt-8">
                <div className="mx-auto mb-4 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4">
                  <div className="h-px w-14 bg-gradient-to-r from-transparent via-amber-400 to-transparent sm:w-20" />
                  <Sparkle />
                  <div className="h-px w-14 bg-gradient-to-r from-transparent via-amber-400 to-transparent sm:w-20" />
                </div>

                <h1 className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                  {titleText}
                </h1>

                <p className="mt-3 text-base font-semibold text-amber-100 sm:mt-4 sm:text-xl">
                  🎊 {undertitle} 🎊
                </p>
              </div>
            </div>

            {/* Treść */}
            <div className="space-y-8 px-5 py-8 sm:px-8 sm:py-10">
              {/* Powitanie */}
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 sm:text-sm">
                  {personalizedGreeting}
                </p>
              </div>

              {/* Karty informacji */}
              <div className="grid gap-4 sm:grid-cols-3">
                <GlamourCard
                  icon="Clock"
                  label={translate("templates.new_year_glamour.start_label")}
                  value={dateText}
                  gradient="from-amber-500 to-yellow-600"
                />
                <GlamourCard
                  icon="MapPin"
                  label={translate("templates.new_year_glamour.location_label")}
                  value={locationText}
                  gradient="from-yellow-500 to-amber-600"
                />
                {dressCode && (
                  <GlamourCard
                    icon="Shirt"
                    label={translate(
                      "templates.new_year_glamour.dress_code_label"
                    )}
                    value={dressCode}
                    gradient="from-amber-500 to-yellow-500"
                  />
                )}
              </div>

              {/* Opis */}
              <div className="mx-auto max-w-2xl rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-transparent p-5 sm:rounded-2xl sm:p-8">
                <p className="whitespace-pre-wrap text-center text-sm leading-relaxed text-amber-50 sm:text-base">
                  {descriptionText}
                </p>
              </div>

              {/* Program */}
              {program && program.length > 0 && (
                <div className="mt-2 space-y-4">
                  <h3 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 sm:text-sm">
                    {translate("templates.new_year_glamour.program_title")}
                  </h3>
                  <div className="space-y-3">
                    {program
                      .slice()
                      .map((it, idx) => ({
                        ...it,
                        _pos:
                          typeof it.position === "number" ? it.position : idx,
                      }))
                      .sort((a, b) => a._pos - b._pos)
                      .map((it, idx) => (
                        <ProgramStep key={idx} item={it} index={idx} />
                      ))}
                  </div>
                </div>
              )}

              {/* RSVP z odliczaniem */}
              <div className="mt-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-yellow-950/40 p-5 backdrop-blur-sm sm:mt-8 sm:rounded-3xl sm:p-8">
                {!rsvpStatus ? (
                  <div className="space-y-5 sm:space-y-6">
                    {deadlineDate && (
                      <div className="text-center">
                        {!isExpired && countdown ? (
                          <div className="inline-flex flex-col items-center gap-2">
                            <p className="text-xs font-medium text-amber-200 sm:text-sm">
                              {translate(
                                "templates.new_year_glamour.rsvp_deadline_label"
                              )}
                            </p>
                            <div className="rounded-full border border-amber-400/60 bg-black/40 px-5 py-2 text-sm font-semibold text-amber-100">
                              {countdown}
                            </div>
                            <p className="text-[11px] text-amber-200/80 sm:text-xs">
                              {translate(
                                "templates.new_year_glamour.rsvp_deadline_until"
                              )}{" "}
                              {format(deadlineDate, "dd.MM.yyyy, HH:mm")}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1 text-center">
                            <p className="text-sm font-semibold text-amber-100">
                              {translate(
                                "templates.new_year_glamour.rsvp_deadline_expired_title"
                              )}
                            </p>
                            <p className="text-xs text-amber-200/80">
                              {translate(
                                "templates.new_year_glamour.rsvp_deadline_expired_at"
                              )}{" "}
                              {deadlineDate &&
                                format(deadlineDate, "dd.MM.yyyy, HH:mm")}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Przyciski tylko gdy nie minął termin */}
                    {(!deadlineDate || (!isExpired && countdown)) && (
                      <>
                        <p className="text-center text-xs font-medium text-amber-200 sm:text-sm">
                          {translate(
                            "templates.new_year_glamour.presence_agreement"
                          )}{" "}
                          🥂
                        </p>
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                          <button
                            disabled={sending}
                            onClick={onAccept}
                            className="w-full rounded-full bg-amber-400 px-8 py-3 text-sm font-bold text-black shadow-lg transition hover:bg-amber-300 disabled:opacity-50 sm:w-auto"
                          >
                            {translate(
                              "templates.new_year_glamour.rsvp_accept"
                            )}
                          </button>
                          <button
                            disabled={sending}
                            onClick={onDecline}
                            className="w-full rounded-full border border-amber-500/60 bg-transparent px-8 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/10 disabled:opacity-50 sm:w-auto"
                          >
                            {translate(
                              "templates.new_year_glamour.rsvp_decline"
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/20">
                      <Lucide.CheckCircle2 className="h-8 w-8 text-amber-300" />
                    </div>
                    <p className="text-sm font-semibold text-amber-100 sm:text-base">
                      {translate(
                        "templates.new_year_glamour.rsvp_accepted_heading"
                      )}
                    </p>
                    <p className="text-xs text-amber-200 sm:text-sm">
                      {translate(
                        "templates.new_year_glamour.rsvp_accepted_description"
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
                      <Lucide.XCircle className="h-8 w-8 text-amber-300" />
                    </div>
                    <p className="text-sm font-semibold text-amber-100 sm:text-base">
                      {translate(
                        "templates.new_year_glamour.rsvp_declined_heading"
                      )}
                    </p>
                    <p className="text-xs text-amber-200/90 sm:text-sm">
                      {translate(
                        "templates.new_year_glamour.rsvp_declined_description"
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer tekstowy */}
              <div className="pt-4 sm:pt-6">
                <FooterCountdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.3),transparent_50%)]" />
      <div className="absolute left-3 top-3 text-2xl">🎊</div>
      <div className="absolute right-3 top-2 text-xl">✨</div>
      <div className="absolute bottom-3 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500" />
      <div className="absolute right-4 bottom-3 text-lg">🥂</div>
    </div>
  ),
};

/* ===== Dekoracje / komponenty pomocnicze ===== */

function Fireworks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 18}%`,
            top: `${10 + (i % 3) * 25}%`,
            animation: "firework 3s ease-out infinite",
            animationDelay: `${i * 0.6}s`,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="2" fill="#fbbf24" opacity="0.8" />
            {[...Array(8)].map((_, j) => {
              const angle = (j * Math.PI * 2) / 8;
              return (
                <line
                  key={j}
                  x1="30"
                  y1="30"
                  x2={30 + Math.cos(angle) * 25}
                  y2={30 + Math.sin(angle) * 25}
                  stroke="#fbbf24"
                  strokeWidth="2"
                  opacity="0.6"
                />
              );
            })}
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes firework {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: firework"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function ConfettiRain() {
  const pieces = React.useMemo(
    () =>
      [...Array(40)].map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 4,
        size: 4 + Math.random() * 6,
        color: ["#fbbf24", "#f97316", "#e5e7eb", "#facc15"][i % 4],
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            animation: `confetti ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size * 2,
              backgroundColor: p.color,
              borderRadius: "999px",
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: confetti"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function SparklesBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute text-amber-300/60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${10 + Math.random() * 10}px`,
            animation: `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          ✨
        </div>
      ))}
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 0.9; transform: scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: sparkle"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

type GlamourCardProps = {
  icon: keyof typeof Lucide;
  label: string;
  value: string;
  gradient: string;
};

function GlamourCard({ icon, label, value, gradient }: GlamourCardProps) {
  const Icon = Lucide[icon];

  return (
    <div className="overflow-hidden rounded-xl border border-amber-500/30 bg-zinc-900/60 p-4 shadow-md backdrop-blur-sm sm:p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-black shadow-lg`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">
            {label}
          </div>
          <div className="mt-1 truncate text-sm font-semibold text-amber-50 sm:text-base">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-amber-300">
      <path
        fill="currentColor"
        d="M12 2L13.8 7.2L19 9L13.8 10.8L12 16L10.2 10.8L5 9L10.2 7.2L12 2Z"
      />
    </svg>
  );
}

function ClockDecor() {
  return (
    <div className="mx-auto flex max-w-xs items-center justify-center rounded-full border border-amber-500/40 bg-black/60 p-4 shadow-[0_0_45px_rgba(250,204,21,0.35)] sm:max-w-md sm:p-6">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="text-amber-300"
      >
        <defs>
          <radialGradient id="clockGradient">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#facc15" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="url(#clockGradient)"
          opacity="0.9"
        />
        <circle cx="60" cy="60" r="45" fill="#000" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = 60 + Math.cos(angle) * 38;
          const y1 = 60 + Math.sin(angle) * 38;
          const x2 = 60 + Math.cos(angle) * 42;
          const y2 = 60 + Math.sin(angle) * 42;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#facc15"
              strokeWidth={i % 3 === 0 ? 2 : 1}
              opacity={i % 3 === 0 ? 0.9 : 0.5}
            />
          );
        })}
        {/* wskazówki – 23:59-ish */}
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="30"
          stroke="#facc15"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="60"
          y1="60"
          x2="82"
          y2="60"
          stroke="#fde68a"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="60" cy="60" r="3" fill="#facc15" />
      </svg>
    </div>
  );
}

type ProgramItem = {
  header: string;
  subheader?: string | null;
  time?: string | null;
};

function ProgramStep({ item, index }: { item: ProgramItem; index: number }) {
  const Icon = Lucide.Star;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-black/40 p-3 sm:p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 text-amber-300 sm:h-9 sm:w-9">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-amber-50">
            {item.header}
          </p>
          {item.time && (
            <span className="shrink-0 rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] font-semibold text-amber-200 sm:text-xs">
              {item.time}
            </span>
          )}
        </div>
        {item.subheader && (
          <p className="mt-1 text-xs text-amber-200/80 sm:text-sm">
            {item.subheader}
          </p>
        )}
      </div>
    </div>
  );
}

function FooterCountdown() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="text-3xl sm:text-4xl">🎆</div>
        <div className="text-xs font-bold uppercase tracking-widest text-amber-400 sm:text-sm">
          {translate("templates.new_year_glamour.footer_countdown_description")}
        </div>
        <div className="text-3xl sm:text-4xl">🎇</div>
      </div>
    </div>
  );
}
