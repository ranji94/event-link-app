"use client";

import * as React from "react";
import * as Lucide from "lucide-react";
import { translate } from "@/locales";
import { formatEventDate } from "../utils/date";
import { useRsvpCountdown } from "../utils/useRsvpCountdown";
import { normalizeProgram } from "../utils/program";

/**
 * WEDDING GEN Z - Trendy szablon ślubny dla Gen Z
 * - Minimalistyczny z maxymalistycznymi akcentami
 * - Y2K aesthetics meets modern elegance
 * - Soft gradients, dreamy pastels z bold typography
 * - Instagram-worthy, aesthetic, vibe-focused
 * - Playful yet romantic
 */

export const weddingGenZTrendy = {
  id: "wedding-genz-trendy",
  name: "Gen Z Wedding Vibes",
  accent: "rose",
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
  }: any) => {
    const titleText =
      title || translate("templates.wedding_genz.title_fallback");
    const locationText =
      location || translate("templates.wedding_genz.location_fallback");
    const dateText = date
      ? formatEventDate(date)
      : translate("templates.wedding_genz.date_fallback");

    const personalizedGreeting = inviteeName
      ? `${translate(
          "templates.wedding_genz.greeting_personalized_prefix"
        )} ${inviteeName}!`
      : translate("templates.wedding_genz.greeting_fallback");

    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);
    const isDeadlineExpired = isExpired;
    const normalizedProgram = normalizeProgram(program);

    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <DreamyBackground />
        <FloatingHearts />
        <GradientOrbs />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <div className="overflow-hidden rounded-[3rem] border-4 border-white bg-white/90 shadow-2xl backdrop-blur-md">
            {/* Header - Y2K inspired */}
            <div className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-8 py-20 text-center">
              <GlitterOverlay />
              <RetroShapes />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-center gap-2">
                  <SparkleStars />
                </div>

                <div className="mb-6">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 p-1 shadow-lg">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                      <Lucide.Heart
                        className="h-12 w-12 text-pink-500"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>

                <h1 className="mb-3 font-serif text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {titleText}
                </h1>

                <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" />

                <p className="mx-auto max-w-lg text-lg font-medium text-gray-700">
                  {translate("templates.wedding_genz.header_subtitle")}
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="rounded-full bg-white/80 px-6 py-2 text-sm font-bold uppercase tracking-widest text-gray-700 shadow-md backdrop-blur-sm">
                    {translate("templates.wedding_genz.header_tagline")}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-12 sm:px-10 sm:py-16">
              {/* Personalized greeting */}
              <div className="mb-12 text-center">
                <p className="text-2xl font-semibold text-gray-800">
                  {personalizedGreeting}
                </p>
              </div>

              {/* Info cards - aesthetic style */}
              <div className="mb-14 space-y-5">
                <AestheticCard
                  icon="Calendar"
                  label={translate("templates.wedding_genz.date_label")}
                  value={dateText}
                  gradient="from-pink-200 to-rose-200"
                  emoji="💍"
                />
                <AestheticCard
                  icon="MapPin"
                  label={translate("templates.wedding_genz.location_label")}
                  value={locationText}
                  gradient="from-purple-200 to-violet-200"
                  emoji="✨"
                />
                {dressCode && (
                  <AestheticCard
                    icon="Sparkles"
                    label={translate("templates.wedding_genz.dresscode_label")}
                    value={dressCode}
                    gradient="from-blue-200 to-cyan-200"
                    emoji="👗"
                  />
                )}
              </div>

              {/* Description */}
              <div className="mx-auto mb-14 max-w-2xl">
                <div className="relative rounded-3xl border-4 border-pink-200 bg-gradient-to-br from-white to-pink-50 p-10">
                  <div className="absolute -left-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 text-3xl shadow-lg">
                    💌
                  </div>
                  <p className="whitespace-pre-wrap text-center text-base leading-relaxed text-gray-700">
                    {description ||
                      translate("templates.wedding_genz.description_fallback")}
                  </p>
                </div>
              </div>

              {/* Program */}
              {normalizedProgram && normalizedProgram.length > 0 && (
                <div className="mx-auto mb-14 max-w-3xl">
                  <div className="mb-10 text-center">
                    <div className="mx-auto mb-4 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 px-8 py-4 text-white shadow-lg">
                      <Lucide.Heart className="h-6 w-6" fill="currentColor" />
                      <h3 className="text-sm font-black uppercase tracking-widest">
                        {translate("templates.wedding_genz.program_title")}
                      </h3>
                      <Lucide.Heart className="h-6 w-6" fill="currentColor" />
                    </div>
                  </div>

                  <div className="space-y-5">
                    {normalizedProgram.map((it: any, idx: number) => {
                      const Icon =
                        (it.icon && Lucide[it.icon as keyof typeof Lucide]) ||
                        Lucide.Heart;
                      const gradients = [
                        {
                          bg: "from-pink-100 to-rose-100",
                          border: "border-pink-300",
                          text: "text-pink-700",
                        },
                        {
                          bg: "from-purple-100 to-violet-100",
                          border: "border-purple-300",
                          text: "text-purple-700",
                        },
                        {
                          bg: "from-blue-100 to-cyan-100",
                          border: "border-blue-300",
                          text: "text-blue-700",
                        },
                      ];
                      const colors = gradients[idx % gradients.length];

                      return (
                        <div
                          key={idx}
                          className={`group relative overflow-hidden rounded-2xl border-3 ${colors.border} bg-gradient-to-br ${colors.bg} p-6 shadow-md transition hover:scale-[1.02] hover:shadow-xl`}
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-3 ${colors.border} bg-white shadow-sm transition group-hover:scale-110`}
                            >
                              <Icon className={`h-8 w-8 ${colors.text}`} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-xl font-bold text-gray-800">
                                {it.header}
                              </div>
                              {it.subheader && (
                                <div className="mt-1 text-sm text-gray-600">
                                  {it.subheader}
                                </div>
                              )}
                            </div>

                            <div
                              className={`shrink-0 rounded-full border-2 ${colors.border} bg-white px-5 py-2 text-sm font-bold ${colors.text}`}
                            >
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
              <div className="rounded-[2.5rem] border-4 border-pink-200 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-10">
                {!rsvpStatus ? (
                  <div className="space-y-8">
                    {deadlineDate && (
                      <div className="flex flex-col items-center gap-3 text-center">
                        {!isDeadlineExpired && countdown && (
                          <>
                            <div className="inline-flex items-center gap-2 rounded-full border-2 border-pink-300 bg-white/80 px-6 py-3 text-xs font-bold uppercase tracking-widest text-pink-700 backdrop-blur-sm">
                              <Lucide.Clock className="h-5 w-5" />
                              <span>
                                {translate(
                                  "templates.wedding_genz.countdown_prefix"
                                )}
                              </span>
                            </div>
                            <p className="text-3xl font-black text-gray-800">
                              {countdown.label}
                            </p>
                            <p className="text-sm font-medium text-gray-600">
                              {translate(
                                "templates.wedding_genz.countdown_until_prefix"
                              )}{" "}
                              {deadlineDate.toLocaleDateString("pl-PL")}
                            </p>
                          </>
                        )}

                        {isDeadlineExpired && (
                          <div className="mt-2 max-w-md rounded-2xl border-3 border-amber-300 bg-amber-50 px-6 py-4 text-sm text-amber-800">
                            <div className="mb-1 flex items-center justify-center gap-2">
                              <Lucide.Clock className="h-5 w-5" />
                              <span className="font-bold">
                                {translate(
                                  "templates.wedding_genz.deadline_expired_title"
                                )}
                              </span>
                            </div>
                            <p className="text-xs text-amber-700">
                              {translate(
                                "templates.wedding_genz.deadline_expired_subtitle"
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!isDeadlineExpired ? (
                      <>
                        <p className="text-center text-xl font-semibold text-gray-700">
                          {translate("templates.wedding_genz.rsvp_prompt")}
                        </p>
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                          <button
                            disabled={sending}
                            onClick={onAccept}
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-12 py-5 font-black uppercase tracking-wide text-white shadow-xl transition hover:scale-105 hover:shadow-2xl disabled:opacity-50"
                          >
                            <span className="relative z-10 flex items-center gap-3">
                              <Lucide.Heart
                                className="h-6 w-6"
                                fill="currentColor"
                              />
                              {translate("templates.wedding_genz.rsvp_accept")}
                              <Lucide.Sparkles className="h-6 w-6" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition group-hover:opacity-100" />
                          </button>
                          <button
                            disabled={sending}
                            onClick={onDecline}
                            className="rounded-full border-3 border-gray-300 bg-white px-12 py-5 font-bold uppercase tracking-wide text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50"
                          >
                            {translate("templates.wedding_genz.rsvp_decline")}
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-400 shadow-2xl">
                      <Lucide.CheckCircle2 className="h-16 w-16 text-white" />
                    </div>
                    <div>
                      <p className="mb-2 text-4xl font-black text-gray-800">
                        {translate(
                          "templates.wedding_genz.rsvp_done_title_accept"
                        )}
                      </p>
                      <p className="text-lg text-gray-600">
                        {translate(
                          "templates.wedding_genz.rsvp_done_sub_accept"
                        )}
                      </p>
                    </div>
                    <CelebrationEmojis />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
                      <Lucide.HeartCrack className="h-16 w-16 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-700">
                      {translate(
                        "templates.wedding_genz.rsvp_done_title_decline"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-4 border-pink-200 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-8 py-6">
              <FooterDecor />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
          <Lucide.Heart className="h-6 w-6 text-pink-500" fill="currentColor" />
        </div>
      </div>
      <div className="absolute right-2 top-2 text-xl">💍</div>
      <div className="absolute bottom-2 left-2 text-xl">✨</div>
      <div className="absolute bottom-2 right-2 text-lg">💐</div>
    </div>
  ),
};

/* ========= Komponenty dekoracyjne ========= */

function DreamyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-pink-300 opacity-30 blur-3xl"
        style={{ animation: "drift 15s ease-in-out infinite" }}
      />
      <div
        className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-purple-300 opacity-30 blur-3xl"
        style={{
          animation: "drift 12s ease-in-out infinite",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute left-1/3 bottom-1/4 h-[450px] w-[450px] rounded-full bg-blue-300 opacity-20 blur-3xl"
        style={{
          animation: "drift 18s ease-in-out infinite",
          animationDelay: "6s",
        }}
      />
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }
      `}</style>
    </div>
  );
}

function FloatingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-300"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 16}px`,
            opacity: 0.3,
            animation: `float-heart ${
              5 + Math.random() * 5
            }s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          ♡
        </div>
      ))}
      <style>{`
        @keyframes float-heart {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function GradientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: `${60 + Math.random() * 40}px`,
            height: `${60 + Math.random() * 40}px`,
            background:
              i % 3 === 0
                ? "radial-gradient(circle, rgba(244, 114, 182, 0.4) 0%, transparent 70%)"
                : i % 3 === 1
                ? "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, transparent 70%)",
            animation: `pulse-orb ${
              4 + Math.random() * 3
            }s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse-orb {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function GlitterOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle-glitter ${
              1 + Math.random() * 2
            }s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle-glitter {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function RetroShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="retro-shapes"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#ec4899"
              strokeWidth="2"
            />
            <rect
              x="120"
              y="20"
              width="40"
              height="40"
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
            />
            <path
              d="M160 120 L180 160 L140 160 Z"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <circle cx="50" cy="150" r="15" fill="#ec4899" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#retro-shapes)" />
      </svg>
    </div>
  );
}

function SparkleStars() {
  return (
    <div className="flex items-center gap-2">
      {["⭐", "✨", "💫", "✨", "⭐"].map((star, i) => (
        <span
          key={i}
          className="text-2xl"
          style={{
            animation: `bounce-star ${
              1.5 + Math.random() * 0.5
            }s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {star}
        </span>
      ))}
      <style>{`
        @keyframes bounce-star {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

function AestheticCard({
  icon,
  label,
  value,
  gradient,
  emoji,
}: {
  icon: keyof typeof Lucide;
  label: string;
  value: string;
  gradient: string;
  emoji: string;
}) {
  const Icon = Lucide[icon];

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border-3 border-white bg-gradient-to-r ${gradient} p-6 shadow-lg transition hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-3 border-white bg-white/90 text-4xl shadow-md backdrop-blur-sm">
          {emoji}
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-600">
            {label}
          </div>
          <div className="mt-2 text-xl font-bold text-gray-800">{value}</div>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
          <Icon className="h-6 w-6 text-gray-700" />
        </div>
      </div>
    </div>
  );
}

function CelebrationEmojis() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {["💕", "💍", "✨", "🎉", "🥂", "💐", "🎊", "💖"].map((emoji, i) => (
        <span
          key={i}
          className="text-4xl"
          style={{
            animation: `wiggle ${
              1 + Math.random() * 0.5
            }s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {emoji}
        </span>
      ))}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-10deg) scale(1.1); }
          75% { transform: rotate(10deg) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

function FooterDecor() {
  return (
    <div className="flex items-center justify-center gap-4 text-2xl">
      <span>💍</span>
      <span className="text-pink-400">•</span>
      <span>💕</span>
      <span className="text-purple-400">•</span>
      <span>✨</span>
      <span className="text-blue-400">•</span>
      <span>💐</span>
      <span className="text-pink-400">•</span>
      <span>🥂</span>
    </div>
  );
}
