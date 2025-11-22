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
 * DIRTY THIRTY - Trendy szablon na 30 urodziny
 * - Inspirowany Instagram/TikTok (holograficzne akcenty, neon, glitch)
 * - Ciemny motyw z neonowymi akcentami
 * - Geometryczne kształty, gradientowe tekstury
 * - Efekty 3D, glassmorphism
 * - Vibe: elegancki, młodzieżowy, nowoczesny
 */

export const birthday30Trendy: TemplateDef = {
  id: "birthday-30-trendy",
  name: "Dirty Thirty",
  accent: "fuchsia",
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
      title || translate("templates.birthday_30_trendy.title_fallback");
    const locationText =
      location || translate("templates.birthday_30_trendy.location_fallback");

    const dateText = date
      ? formatEventDate(date)
      : translate("templates.birthday_30_trendy.date_fallback");

    const personalizedGreeting = inviteeName
      ? `${translate(
          "templates.birthday_30_trendy.greeting_personalized_prefix"
        )} ${inviteeName}!`
      : translate("templates.birthday_30_trendy.greeting_fallback");
    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);
    const isDeadlineExpired = isExpired;

    const normalizedProgram = normalizeProgram(program);

    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <AnimatedBackground />
        <GridOverlay />
        <GlowOrbs />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
            {/* Header z holograficznym efektem */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/50 to-fuchsia-900/30 px-8 py-16 text-center">
              <HolographicOverlay />
              <div className="absolute inset-0 opacity-20">
                <GeometricPattern />
              </div>

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-center gap-3">
                  <SparkleIcon color="#e879f9" />
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
                  <NumberThirty />
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                  <SparkleIcon color="#22d3ee" />
                </div>

                <h1
                  className="mb-4 font-black text-6xl uppercase tracking-tight sm:text-7xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #e879f9 0%, #22d3ee 50%, #fbbf24 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 0 60px rgba(232, 121, 249, 0.5)",
                  }}
                >
                  {titleText}
                </h1>

                <div className="mx-auto max-w-md">
                  <p className="text-lg font-medium text-cyan-300">
                    {translate("templates.birthday_30_trendy.header_subtitle")}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest">
                  <span className="text-fuchsia-400">✨</span>
                  <span className="text-white/80">
                    {translate("templates.birthday_30_trendy.header_tagline")}
                  </span>
                  <span className="text-cyan-400">✨</span>
                </div>
              </div>
            </div>

            {/* Treść */}
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              {/* Personalizowane powitanie */}
              <div className="mb-10 text-center">
                <p className="text-2xl font-bold text-white">
                  {personalizedGreeting}
                </p>
              </div>

              {/* Karty z informacjami - glassmorphism style */}
              <div className="mb-12 grid gap-6 sm:grid-cols-2">
                <GlassCard
                  icon="Calendar"
                  label={translate("templates.birthday_30_trendy.date_label")}
                  value={dateText}
                  gradient="from-fuchsia-500/20 to-purple-500/20"
                />
                <GlassCard
                  icon="MapPin"
                  label={translate(
                    "templates.birthday_30_trendy.location_label"
                  )}
                  value={locationText}
                  gradient="from-cyan-500/20 to-blue-500/20"
                />
                {dressCode && (
                  <div className="sm:col-span-2">
                    <GlassCard
                      icon="Sparkles"
                      label={translate(
                        "templates.birthday_30_trendy.dresscode_label"
                      )}
                      value={dressCode}
                      gradient="from-amber-500/20 to-orange-500/20"
                    />
                  </div>
                )}
              </div>

              {/* Opis */}
              <div className="mx-auto mb-12 max-w-2xl">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-purple-900/30 p-8 backdrop-blur-sm">
                  <div className="absolute -left-3 -top-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 shadow-lg shadow-fuchsia-500/50">
                      <Lucide.Sparkles className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap text-center text-base leading-relaxed text-gray-300">
                    {description ||
                      translate(
                        "templates.birthday_30_trendy.description_fallback"
                      )}
                  </p>
                </div>
              </div>

              {/* Program */}
              {normalizedProgram && normalizedProgram.length > 0 && (
                <div className="mx-auto mb-12 max-w-3xl">
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 shadow-lg shadow-fuchsia-500/50">
                      <Lucide.Music className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-fuchsia-400">
                      {translate("templates.birthday_30_trendy.program_title")}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {normalizedProgram.map((it, idx) => {
                      const Icon = (it.icon && Lucide[it.icon]) || Lucide.Star;
                      const gradients = [
                        "from-fuchsia-500/30 to-purple-500/30",
                        "from-cyan-500/30 to-blue-500/30",
                        "from-amber-500/30 to-orange-500/30",
                      ];
                      const gradient = gradients[idx % gradients.length];

                      const iconGradients = [
                        "from-fuchsia-500 to-purple-500",
                        "from-cyan-500 to-blue-500",
                        "from-amber-500 to-orange-500",
                      ];
                      const iconGradient =
                        iconGradients[idx % iconGradients.length];

                      return (
                        <div
                          key={idx}
                          className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} p-6 backdrop-blur-sm transition hover:scale-[1.02] hover:border-white/20`}
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${iconGradient} shadow-lg transition group-hover:scale-110`}
                            >
                              <Icon className="h-8 w-8 text-white" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-lg font-bold text-white">
                                {it.header}
                              </div>
                              {it.subheader && (
                                <div className="mt-1 text-sm text-gray-400">
                                  {it.subheader}
                                </div>
                              )}
                            </div>

                            <div className="shrink-0 rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm">
                              {it.time}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* RSVP + countdown */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-purple-900/30 p-8 backdrop-blur-sm">
                {!rsvpStatus ? (
                  <div className="space-y-6">
                    {deadlineDate && (
                      <div className="flex flex-col items-center gap-3 text-center">
                        {!isDeadlineExpired && countdown && (
                          <>
                            <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-500/20 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-fuchsia-300 backdrop-blur-sm">
                              <Lucide.Clock className="h-5 w-5" />
                              <span>
                                {translate(
                                  "templates.birthday_30_trendy.countdown_prefix"
                                )}
                              </span>
                            </div>
                            <p className="text-2xl font-black text-white">
                              {countdown.label}
                            </p>
                            <p className="text-sm text-gray-400">
                              {translate(
                                "templates.birthday_30_trendy.countdown_until_prefix"
                              )}{" "}
                              {format(deadlineDate, "d MMMM yyyy, HH:mm", {
                                locale: pl,
                              })}
                            </p>
                          </>
                        )}

                        {isDeadlineExpired && (
                          <div className="mt-2 max-w-md rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-4 text-sm text-amber-200 backdrop-blur-sm">
                            <div className="mb-1 flex items-center justify-center gap-2">
                              <Lucide.Clock className="h-5 w-5" />
                              <span className="font-bold">
                                {translate(
                                  "templates.birthday_30_trendy.deadline_expired_title"
                                )}
                              </span>
                            </div>
                            <p className="text-xs text-amber-300/80">
                              {translate(
                                "templates.birthday_30_trendy.deadline_expired_subtitle"
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!isDeadlineExpired ? (
                      <>
                        <p className="text-center text-lg font-medium text-gray-300">
                          {translate(
                            "templates.birthday_30_trendy.rsvp_prompt"
                          )}
                        </p>
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                          <button
                            disabled={sending}
                            onClick={onAccept}
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 px-12 py-5 font-black uppercase text-white shadow-lg shadow-fuchsia-500/50 transition hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-500/60 disabled:opacity-50"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <Lucide.PartyPopper className="h-5 w-5" />
                              {translate(
                                "templates.birthday_30_trendy.rsvp_accept"
                              )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 opacity-0 transition group-hover:opacity-100" />
                          </button>
                          <button
                            disabled={sending}
                            onClick={onDecline}
                            className="rounded-full border-2 border-white/20 bg-white/5 px-12 py-5 font-bold uppercase text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10 disabled:opacity-50"
                          >
                            {translate(
                              "templates.birthday_30_trendy.rsvp_decline"
                            )}
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-5 text-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/50">
                      <Lucide.CheckCircle2 className="h-14 w-14 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-white">
                        {translate(
                          "templates.birthday_30_trendy.rsvp_done_title_accept"
                        )}
                      </p>
                      <p className="mt-2 text-base text-gray-400">
                        {translate(
                          "templates.birthday_30_trendy.rsvp_done_sub_accept"
                        )}
                      </p>
                    </div>
                    <ConfettiDecor />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-5 text-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-700">
                      <Lucide.X className="h-14 w-14 text-slate-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {translate(
                        "templates.birthday_30_trendy.rsvp_done_title_decline"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 bg-gradient-to-r from-slate-900 via-purple-900/30 to-slate-900 px-8 py-6">
              <FooterDecor />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-2 top-2 h-8 w-8 rounded-full bg-fuchsia-500 blur-xl" />
        <div className="absolute right-3 bottom-3 h-10 w-10 rounded-full bg-cyan-500 blur-xl" />
      </div>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-black"
        style={{
          background: "linear-gradient(135deg, #e879f9 0%, #22d3ee 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        30
      </div>
      <div className="absolute right-2 top-2 text-lg">✨</div>
      <div className="absolute bottom-2 left-2 text-lg">🎉</div>
    </div>
  ),
};

/* ========= Komponenty dekoracyjne ========= */

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-fuchsia-600 opacity-20 blur-3xl"
        style={{
          animation: "float-slow 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-600 opacity-20 blur-3xl"
        style={{
          animation: "float-slow 10s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-purple-600 opacity-10 blur-3xl"
        style={{
          animation: "float-slow 12s ease-in-out infinite",
          animationDelay: "4s",
        }}
      />
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, -50px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

function GridOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
}

function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            background:
              i % 3 === 0
                ? "radial-gradient(circle, #e879f9 0%, transparent 70%)"
                : i % 3 === 1
                ? "radial-gradient(circle, #22d3ee 0%, transparent 70%)"
                : "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
            opacity: 0.3,
            animation: `pulse-glow ${
              3 + Math.random() * 3
            }s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

function HolographicOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(232, 121, 249, 0.1) 2px,
              rgba(232, 121, 249, 0.1) 4px
            )
          `,
          animation: "scan 8s linear infinite",
        }}
      />
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}

function GeometricPattern() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="geometric"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#e879f9"
            strokeWidth="2"
          />
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <path
            d="M50 20 L80 50 L50 80 L20 50 Z"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geometric)" />
    </svg>
  );
}

function NumberThirty() {
  return (
    <div
      className="text-5xl font-black"
      style={{
        background: "linear-gradient(135deg, #e879f9 0%, #22d3ee 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 20px rgba(232, 121, 249, 0.6))",
      }}
    >
      30
    </div>
  );
}

function GlassCard({
  icon,
  label,
  value,
  gradient,
}: {
  icon: keyof typeof Lucide;
  label: string;
  value: string;
  gradient: string;
}) {
  const Icon = Lucide[icon];

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} p-6 backdrop-blur-sm transition hover:scale-[1.02] hover:border-white/20`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
          <Icon className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {label}
          </div>
          <div className="mt-1 text-lg font-bold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}

function SparkleIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 0L14 8L12 16L10 8L12 0Z"
        fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      <path
        d="M0 12L8 14L16 12L8 10L0 12Z"
        fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}

function ConfettiDecor() {
  return (
    <div className="flex gap-3">
      {["🎉", "✨", "🎊", "💫", "🎈"].map((emoji, i) => (
        <span
          key={i}
          className="text-3xl"
          style={{
            animation: `bounce-confetti ${
              1 + Math.random()
            }s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {emoji}
        </span>
      ))}
      <style>{`
        @keyframes bounce-confetti {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
}

function FooterDecor() {
  return (
    <div className="flex items-center justify-center gap-4 text-2xl">
      <span>🎉</span>
      <span className="text-fuchsia-400">•</span>
      <span>✨</span>
      <span className="text-cyan-400">•</span>
      <span>🎊</span>
      <span className="text-amber-400">•</span>
      <span>💫</span>
      <span className="text-fuchsia-400">•</span>
      <span>🎈</span>
    </div>
  );
}
