"use client";

import * as React from "react";
import * as Lucide from "lucide-react";
import { TemplateDef } from "../types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { translate } from "@/locales";
import { useRsvpCountdown } from "../utils/useRsvpCountdown";
import { normalizeProgram } from "../utils/program";
import { formatEventDate } from "../utils/date";

/**
 * GOLDEN EIGHTEEN - Elegancki szablon na 18 urodziny
 * - Złoto, czerń, biel - elegancka paleta
 * - Art deco vibes, gatsby style
 * - Glamour & sophistication
 * - Luksusowy, dojrzały, stylowy
 * - Milestone celebration
 */

export const birthday18Golden: TemplateDef = {
  id: "birthday-18-golden",
  name: "Golden Eighteen",
  accent: "yellow",
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
      title || translate("templates.birthday_18_gold.title_fallback");
    const locationText =
      location || translate("templates.birthday_18_gold.location_fallback");

    const dateText = date
      ? formatEventDate(date)
      : translate("templates.birthday_18_gold.date_fallback");

    const personalizedGreeting = inviteeName
      ? `${translate(
          "templates.birthday_18_gold.greeting_personalized_prefix"
        )} ${inviteeName}!`
      : translate("templates.birthday_18_gold.greeting_fallback");
    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);
    const isDeadlineExpired = isExpired;

    const normalizedProgram = normalizeProgram(program);

    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-zinc-900 to-black">
        <GoldenParticles />
        <LuxuryShimmer />
        <ArtDecoPattern />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <div className="overflow-hidden rounded-2xl border-2 border-yellow-500/50 bg-gradient-to-b from-zinc-900 to-black shadow-2xl shadow-yellow-500/20">
            {/* Header - Gatsby/Art Deco style */}
            <div className="relative overflow-hidden border-b-2 border-yellow-500/50 bg-gradient-to-b from-black via-zinc-900 to-black px-8 py-20 text-center">
              <RadialGlow />
              <GeometricLines />

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-center gap-4">
                  <GoldenDiamond />
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
                  <GoldenStar />
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
                  <GoldenDiamond />
                </div>

                <div className="mb-6">
                  <div className="mx-auto mb-6 inline-flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping rounded-full bg-yellow-500/30" />
                      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-yellow-500 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50">
                        <span
                          className="font-serif text-5xl font-black text-black"
                          style={{
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                          }}
                        >
                          18
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h1
                  className="mb-6 font-serif text-6xl font-black uppercase tracking-tight sm:text-7xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #fbbf24 0%, #fef08a 50%, #fbbf24 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 0 40px rgba(251, 191, 36, 0.5)",
                  }}
                >
                  {titleText}
                </h1>

                <div className="mx-auto mb-6 h-1 w-40 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

                <p className="mx-auto max-w-lg font-serif text-lg font-medium tracking-wide text-yellow-100">
                  {translate("templates.birthday_18_gold.header_subtitle")}
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="rounded-full border border-yellow-500/50 bg-yellow-500/10 px-6 py-2 backdrop-blur-sm">
                    <span className="text-sm font-bold uppercase tracking-widest text-yellow-500">
                      {translate("templates.birthday_18_gold.header_tagline")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-12 sm:px-10 sm:py-16">
              {/* Personalized greeting */}
              <div className="mb-12 text-center">
                <div className="inline-block border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-500/10 via-yellow-500/20 to-yellow-500/10 px-10 py-4 backdrop-blur-sm">
                  <p className="font-serif text-2xl font-bold uppercase tracking-wide text-yellow-100">
                    {personalizedGreeting}
                  </p>
                </div>
              </div>

              {/* Info cards - luxury style */}
              <div className="mb-14 space-y-6">
                <LuxuryCard
                  icon="Calendar"
                  label={translate("templates.birthday_18_gold.date_label")}
                  value={dateText}
                />
                <LuxuryCard
                  icon="MapPin"
                  label={translate("templates.birthday_18_gold.location_label")}
                  value={locationText}
                />
                {dressCode && (
                  <LuxuryCard
                    icon="Sparkles"
                    label={translate(
                      "templates.birthday_18_gold.dresscode_label"
                    )}
                    value={dressCode}
                  />
                )}
              </div>

              {/* Description */}
              <div className="mx-auto mb-14 max-w-2xl">
                <div className="relative rounded-xl border-2 border-yellow-500/50 bg-gradient-to-br from-zinc-900/80 to-black/80 p-10 shadow-lg backdrop-blur-sm">
                  <div className="absolute -left-4 -top-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-yellow-500 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50">
                      <Lucide.Crown className="h-8 w-8 text-black" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-yellow-500 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50">
                      <Lucide.Sparkles className="h-8 w-8 text-black" />
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap text-center text-base leading-relaxed text-gray-300">
                    {description ||
                      translate(
                        "templates.birthday_18_gold.description_fallback"
                      )}
                  </p>
                </div>
              </div>

              {/* Program */}
              {normalizedProgram && normalizedProgram.length > 0 && (
                <div className="mx-auto mb-14 max-w-3xl">
                  <div className="mb-10 text-center">
                    <div className="mx-auto mb-6 inline-flex items-center gap-4 rounded-full border-2 border-yellow-500 bg-gradient-to-r from-yellow-500/20 via-yellow-500/30 to-yellow-500/20 px-10 py-5 backdrop-blur-sm">
                      <Lucide.Star
                        className="h-7 w-7 text-yellow-500"
                        fill="currentColor"
                      />
                      <h3 className="font-serif text-sm font-black uppercase tracking-widest text-yellow-500">
                        {translate("templates.birthday_18_gold.program_title")}
                      </h3>
                      <Lucide.Star
                        className="h-7 w-7 text-yellow-500"
                        fill="currentColor"
                      />
                    </div>
                  </div>

                  <div className="space-y-5">
                    {normalizedProgram.map((it, idx) => {
                      const Icon =
                        (it.icon && Lucide[it.icon]) || Lucide.Sparkles;

                      return (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-xl border-2 border-yellow-500/50 bg-gradient-to-r from-zinc-900/50 via-zinc-800/50 to-zinc-900/50 p-7 backdrop-blur-sm transition hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20"
                        >
                          <div className="flex items-center gap-6">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 border-yellow-500 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-md transition group-hover:scale-110 group-hover:shadow-yellow-500/50">
                              <Icon className="h-10 w-10 text-black" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-xl font-bold text-white">
                                {it.header}
                              </div>
                              {it.subheader && (
                                <div className="mt-1 text-sm text-gray-400">
                                  {it.subheader}
                                </div>
                              )}
                            </div>

                            <div className="shrink-0 rounded-full border-2 border-yellow-500 bg-yellow-500/20 px-6 py-3 text-sm font-bold text-yellow-500 backdrop-blur-sm">
                              {it.time}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* RSVP */}
              <div className="rounded-2xl border-2 border-yellow-500/50 bg-gradient-to-br from-zinc-900/80 to-black/80 p-10 backdrop-blur-sm">
                {!rsvpStatus ? (
                  <div className="space-y-8">
                    {deadlineDate && (
                      <div className="flex flex-col items-center gap-4 text-center">
                        {!isDeadlineExpired && countdown && (
                          <>
                            <div className="inline-flex items-center gap-3 rounded-full border-2 border-yellow-500/50 bg-yellow-500/10 px-7 py-3 text-xs font-bold uppercase tracking-widest text-yellow-500 backdrop-blur-sm">
                              <Lucide.Clock className="h-5 w-5" />
                              <span>
                                {translate(
                                  "templates.birthday_18_gold.countdown_prefix"
                                )}
                              </span>
                            </div>
                            <p className="text-3xl font-black text-white">
                              {countdown.label}
                            </p>
                            <p className="text-sm font-medium text-gray-400">
                              {translate(
                                "templates.birthday_18_gold.countdown_until_prefix"
                              )}{" "}
                              {format(deadlineDate, "d MMMM yyyy, HH:mm", {
                                locale: pl,
                              })}
                            </p>
                          </>
                        )}

                        {isDeadlineExpired && (
                          <div className="mt-2 max-w-md rounded-xl border-2 border-red-500/50 bg-red-500/10 px-6 py-4 text-sm text-red-200 backdrop-blur-sm">
                            <div className="mb-1 flex items-center justify-center gap-2">
                              <Lucide.Clock className="h-5 w-5" />
                              <span className="font-bold">
                                {translate(
                                  "templates.birthday_18_gold.deadline_expired_title"
                                )}
                              </span>
                            </div>
                            <p className="text-xs text-red-300/80">
                              {translate(
                                "templates.birthday_18_gold.deadline_expired_subtitle"
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!isDeadlineExpired ? (
                      <>
                        <p className="text-center text-xl font-semibold text-gray-200">
                          {translate("templates.birthday_18_gold.rsvp_prompt")}
                        </p>
                        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
                          <button
                            disabled={sending}
                            onClick={onAccept}
                            className="group relative overflow-hidden rounded-full border-2 border-yellow-500 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-14 py-6 font-black uppercase tracking-wider text-black shadow-lg shadow-yellow-500/50 transition hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/60 disabled:opacity-50"
                          >
                            <span className="relative z-10 flex items-center gap-3">
                              <Lucide.PartyPopper className="h-6 w-6" />
                              {translate(
                                "templates.birthday_18_gold.rsvp_accept"
                              )}
                              <Lucide.Crown className="h-6 w-6" />
                            </span>
                          </button>
                          <button
                            disabled={sending}
                            onClick={onDecline}
                            className="rounded-full border-2 border-gray-500 bg-gray-800/50 px-14 py-6 font-bold uppercase tracking-wider text-gray-200 backdrop-blur-sm transition hover:border-gray-400 hover:bg-gray-700/50 disabled:opacity-50"
                          >
                            {translate(
                              "templates.birthday_18_gold.rsvp_decline"
                            )}
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-500 bg-gradient-to-br from-green-400 to-green-600 shadow-2xl shadow-green-500/50">
                      <Lucide.CheckCircle2 className="h-16 w-16 text-white" />
                    </div>
                    <div>
                      <p className="mb-2 text-4xl font-black text-white">
                        {translate(
                          "templates.birthday_18_gold.rsvp_done_title_accept"
                        )}
                      </p>
                      <p className="text-lg text-gray-400">
                        {translate(
                          "templates.birthday_18_gold.rsvp_done_sub_accept"
                        )}
                      </p>
                    </div>
                    <GoldenEmojis />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-600 bg-gray-700">
                      <Lucide.X className="h-16 w-16 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {translate(
                        "templates.birthday_18_gold.rsvp_done_title_decline"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-yellow-500/50 bg-gradient-to-b from-black to-zinc-900 px-8 py-6">
              <FooterDecor />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-3 top-3 h-10 w-10 rounded-full bg-yellow-500 blur-xl" />
        <div className="absolute right-4 bottom-4 h-8 w-8 rounded-full bg-yellow-400 blur-lg" />
      </div>
      <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-yellow-500 bg-gradient-to-br from-yellow-400 to-yellow-600">
        <span className="font-serif text-xl font-black text-black">18</span>
      </div>
      <div className="absolute right-2 top-2 text-lg">👑</div>
      <div className="absolute bottom-2 left-2 text-lg">✨</div>
    </div>
  ),
};

/* ========= Komponenty dekoracyjne ========= */

function GoldenParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-yellow-500"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            animation: `float-particle ${
              5 + Math.random() * 5
            }s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

function LuxuryShimmer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.1) 50%, transparent 100%)",
          animation: "shimmer 3s infinite",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

function ArtDecoPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="art-deco"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M100 0 L120 40 L100 80 L80 40 Z"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="30"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1"
            />
            <path
              d="M70 70 L130 70 L130 130 L70 130 Z"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#art-deco)" />
      </svg>
    </div>
  );
}

function RadialGlow() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
      style={{
        background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
      }}
    />
  );
}

function GeometricLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-yellow-500"
          style={{
            left: 0,
            right: 0,
            top: `${10 + i * 10}%`,
            transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function GoldenDiamond() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <path
        d="M14 2 L26 14 L14 26 L2 14 Z"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
      />
      <path d="M14 8 L20 14 L14 20 L8 14 Z" fill="#fbbf24" />
    </svg>
  );
}

function GoldenStar() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <path
        d="M14 2 L17 11 L26 14 L17 17 L14 26 L11 17 L2 14 L11 11 Z"
        fill="#fbbf24"
        stroke="#fef08a"
        strokeWidth="1"
      />
    </svg>
  );
}

function LuxuryCard({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Lucide;
  label: string;
  value: string;
}) {
  const Icon = Lucide[icon];

  return (
    <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-500/50 bg-gradient-to-r from-zinc-900/50 via-zinc-800/50 to-zinc-900/50 p-7 backdrop-blur-sm transition hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20">
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 border-yellow-500 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-md transition group-hover:scale-110">
          <Icon className="h-10 w-10 text-black" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-widest text-yellow-600">
            {label}
          </div>
          <div className="mt-2 text-xl font-bold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}

function GoldenEmojis() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {["👑", "✨", "🎉", "🥂", "💎", "🎊", "⭐", "🎈"].map((emoji, i) => (
        <span
          key={i}
          className="text-4xl"
          style={{
            animation: `bounce-golden ${
              1 + Math.random() * 0.5
            }s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {emoji}
        </span>
      ))}
      <style>{`
        @keyframes bounce-golden {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}

function FooterDecor() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-500" />
      <div className="flex items-center gap-4 text-2xl">
        <span>👑</span>
        <span className="text-yellow-500">✨</span>
        <span>💎</span>
        <span className="text-yellow-500">✨</span>
        <span>🥂</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-500" />
    </div>
  );
}
