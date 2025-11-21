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
 * BABY SHOWER BUNNY - Delikatny szablon z zajączkami
 * - Pastelowe kolory (miętowy/brzoskwiniowy/lawenda)
 * - Zajączki, marchewki, kwiatki
 * - Delikatne, naturalne kształty
 * - Ciepła, wiosenna atmosfera
 */

export const babyShowerBunny: TemplateDef = {
  id: "baby-shower-bunny",
  name: "Baby Shower Bunny",
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
    dressCode,
    rsvpDeadline,
  }) => {
    const titleText =
      title || translate("templates.baby_shower_bunny.title_fallback");
    const locationText =
      location || translate("templates.baby_shower_bunny.location_fallback");

    const dateText = date
      ? formatEventDate(date)
      : translate("templates.baby_shower_bunny.date_fallback");

    const personalizedGreeting = inviteeName
      ? `${translate(
          "templates.baby_shower_bunny.greeting_personalized_prefix"
        )} ${inviteeName}!`
      : translate("templates.baby_shower_bunny.greeting_fallback");
    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);
    const isDeadlineExpired = isExpired;

    const normalizedProgram = normalizeProgram(program);

    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br from-emerald-50 via-orange-50 to-purple-50">
        <GrassDecor />
        <FloralBackground />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <div className="overflow-hidden rounded-[2.5rem] bg-white/95 shadow-2xl backdrop-blur-sm">
            {/* Header z zajączkiem */}
            <div className="relative bg-gradient-to-br from-emerald-100 via-orange-50 to-purple-100 px-8 py-12 text-center">
              <div className="absolute inset-0 opacity-10">
                <CarrotPattern />
              </div>

              <BunnyIllustration />

              <div className="relative z-10 mt-8">
                <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                  <FlowerIcon color="#fbbf24" />
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                  <CarrotIcon />
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
                  <FlowerIcon color="#c084fc" />
                </div>

                <h1 className="font-serif text-4xl font-bold tracking-tight text-emerald-900 sm:text-5xl">
                  {titleText}
                </h1>

                <p className="mt-3 text-lg text-emerald-700">
                  {translate("templates.baby_shower_bunny.header_subtitle")}
                </p>
              </div>
            </div>

            {/* Treść */}
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              {/* Personalizowane powitanie */}
              <div className="mb-8 text-center">
                <p className="text-xl font-semibold text-emerald-800">
                  {personalizedGreeting}
                </p>
              </div>

              {/* Karty z informacjami */}
              <div className="mb-10 flex flex-col items-center gap-6 sm:gap-8">
                <InfoCard
                  icon="Calendar"
                  label={translate("templates.baby_shower_bunny.date_label")}
                  value={dateText}
                  color="emerald"
                />
                <InfoCard
                  icon="MapPin"
                  label={translate(
                    "templates.baby_shower_bunny.location_label"
                  )}
                  value={locationText}
                  color="orange"
                />
                {dressCode && (
                  <InfoCard
                    icon="Shirt"
                    label={translate(
                      "templates.baby_shower_bunny.dresscode_label"
                    )}
                    value={dressCode}
                    color="purple"
                  />
                )}
              </div>

              {/* Opis */}
              <div className="mx-auto max-w-2xl">
                <div className="relative rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30 p-8">
                  <div className="absolute -left-4 -top-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-200">
                      <span className="text-2xl">🥕</span>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap text-center text-base leading-relaxed text-gray-700">
                    {description ||
                      translate(
                        "templates.baby_shower_bunny.description_fallback"
                      )}
                  </p>
                </div>
              </div>

              {/* Program */}
              {normalizedProgram && normalizedProgram.length > 0 && (
                <div className="mx-auto mt-12 max-w-3xl">
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-orange-100">
                      <Lucide.Sparkles className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                      {translate("templates.baby_shower_bunny.program_title")}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {normalizedProgram.map((it, idx) => {
                      const Icon = (it.icon && Lucide[it.icon]) || Lucide.Baby;
                      const colors = [
                        {
                          bg: "bg-emerald-100",
                          text: "text-emerald-700",
                          badge: "bg-emerald-200 text-emerald-800",
                        },
                        {
                          bg: "bg-orange-100",
                          text: "text-orange-700",
                          badge: "bg-orange-200 text-orange-800",
                        },
                        {
                          bg: "bg-purple-100",
                          text: "text-purple-700",
                          badge: "bg-purple-200 text-purple-800",
                        },
                      ];
                      const colorSet = colors[idx % colors.length];

                      return (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-2xl border-2 border-emerald-200 bg-white p-5 transition hover:shadow-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${colorSet.bg} shadow-sm transition group-hover:scale-110`}
                            >
                              <Icon className={`h-7 w-7 ${colorSet.text}`} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-gray-800">
                                {it.header}
                              </div>
                              {it.subheader && (
                                <div className="mt-1 text-sm text-gray-600">
                                  {it.subheader}
                                </div>
                              )}
                            </div>

                            <div
                              className={`shrink-0 rounded-full ${colorSet.badge} px-4 py-2 text-sm font-bold`}
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

              {/* RSVP + countdown */}
              <div className="mt-12 rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-8">
                {!rsvpStatus ? (
                  <div className="space-y-5">
                    {deadlineDate && (
                      <div className="flex flex-col items-center gap-2 text-center">
                        {!isDeadlineExpired && countdown && (
                          <>
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-800">
                              <Lucide.Clock className="h-4 w-4 text-emerald-600" />
                              <span>
                                {translate(
                                  "templates.baby_shower_bunny.countdown_prefix"
                                )}
                              </span>
                            </div>
                            <p className="text-lg font-bold text-emerald-900">
                              {countdown.label}
                            </p>
                            <p className="text-xs text-emerald-700">
                              {translate(
                                "templates.baby_shower_bunny.countdown_until_prefix"
                              )}{" "}
                              {format(deadlineDate, "d MMMM yyyy, HH:mm", {
                                locale: pl,
                              })}
                            </p>
                          </>
                        )}

                        {isDeadlineExpired && (
                          <div className="mt-2 max-w-md rounded-2xl border-2 border-orange-200 bg-orange-50 px-5 py-4 text-sm text-orange-900">
                            <div className="mb-1 flex items-center justify-center gap-2">
                              <Lucide.Clock className="h-5 w-5" />
                              <span className="font-semibold">
                                {translate(
                                  "templates.baby_shower_bunny.deadline_expired_title"
                                )}
                              </span>
                            </div>
                            <p className="text-xs text-orange-800">
                              {translate(
                                "templates.baby_shower_bunny.deadline_expired_subtitle"
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!isDeadlineExpired ? (
                      <>
                        <p className="text-center text-base font-medium text-gray-700">
                          {translate("templates.baby_shower_bunny.rsvp_prompt")}
                        </p>
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                          <button
                            disabled={sending}
                            onClick={onAccept}
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 px-10 py-4 font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <Lucide.Heart className="h-5 w-5" />
                              {translate(
                                "templates.baby_shower_bunny.rsvp_accept"
                              )}
                            </span>
                          </button>
                          <button
                            disabled={sending}
                            onClick={onDecline}
                            className="rounded-full border-2 border-gray-300 bg-white px-10 py-4 font-bold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50"
                          >
                            {translate(
                              "templates.baby_shower_bunny.rsvp_decline"
                            )}
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg">
                      <Lucide.CheckCircle2 className="h-12 w-12 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {translate(
                          "templates.baby_shower_bunny.rsvp_done_title_accept"
                        )}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        {translate(
                          "templates.baby_shower_bunny.rsvp_done_sub_accept"
                        )}
                      </p>
                    </div>
                    <BunnyFootprints />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 shadow-lg">
                      <Lucide.CloudOff className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="text-xl font-semibold text-gray-700">
                      {translate(
                        "templates.baby_shower_bunny.rsvp_done_title_decline"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-emerald-100 bg-gradient-to-r from-emerald-50 via-orange-50 to-purple-50 px-8 py-6">
              <FooterDecor />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 via-orange-50 to-purple-100">
      <svg
        className="absolute left-2 top-2 h-10 w-10 opacity-70"
        viewBox="0 0 60 70"
      >
        <ellipse cx="20" cy="15" rx="6" ry="15" fill="#d1fae5" />
        <ellipse cx="40" cy="15" rx="6" ry="15" fill="#d1fae5" />
        <circle cx="30" cy="35" r="16" fill="#f0f9ff" />
        <circle cx="25" cy="32" r="2.5" fill="#374151" />
        <circle cx="35" cy="32" r="2.5" fill="#374151" />
        <ellipse cx="30" cy="38" rx="2" ry="1.5" fill="#fbbf24" />
      </svg>
      <div className="absolute right-3 top-3 text-xl">🥕</div>
      <div className="absolute bottom-3 right-4 text-lg">🌸</div>
      <div className="absolute bottom-3 left-3 h-3 w-20 rounded-full bg-white/60" />
    </div>
  ),
};

/* ========= Komponenty dekoracyjne ========= */

function GrassDecor() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-200/30 to-transparent" />
  );
}

function FloralBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${20 + Math.random() * 20}px`,
            animation: `float-gentle ${
              4 + Math.random() * 3
            }s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {["🌸", "🌼", "🌷", "🥕"][Math.floor(Math.random() * 4)]}
        </div>
      ))}
      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}

function CarrotPattern() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="carrots"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <text x="20" y="30" fontSize="30">
            🥕
          </text>
          <text x="60" y="70" fontSize="30">
            🥕
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#carrots)" />
    </svg>
  );
}

function BunnyIllustration() {
  return (
    <div className="flex justify-center">
      <svg
        width="120"
        height="140"
        viewBox="0 0 120 140"
        className="drop-shadow-2xl"
      >
        {/* Lewe ucho */}
        <ellipse
          cx="35"
          cy="35"
          rx="12"
          ry="35"
          fill="#e0e7ff"
          transform="rotate(-15 35 35)"
        />
        <ellipse
          cx="35"
          cy="35"
          rx="7"
          ry="28"
          fill="#fde68a"
          transform="rotate(-15 35 35)"
        />

        {/* Prawe ucho */}
        <ellipse
          cx="85"
          cy="35"
          rx="12"
          ry="35"
          fill="#e0e7ff"
          transform="rotate(15 85 35)"
        />
        <ellipse
          cx="85"
          cy="35"
          rx="7"
          ry="28"
          fill="#fde68a"
          transform="rotate(15 85 35)"
        />

        {/* Głowa */}
        <ellipse cx="60" cy="70" rx="32" ry="35" fill="#f0f4ff" />

        {/* Oczy */}
        <circle cx="50" cy="65" r="5" fill="#374151" />
        <circle cx="70" cy="65" r="5" fill="#374151" />
        <circle cx="51" cy="64" r="2" fill="white" />
        <circle cx="71" cy="64" r="2" fill="white" />

        {/* Różowe policzki */}
        <ellipse cx="40" cy="75" rx="6" ry="4" fill="#fecaca" opacity="0.6" />
        <ellipse cx="80" cy="75" rx="6" ry="4" fill="#fecaca" opacity="0.6" />

        {/* Nosek */}
        <ellipse cx="60" cy="78" rx="4" ry="3" fill="#fbbf24" />

        {/* Uśmiech */}
        <path
          d="M55 82 Q60 85 65 82"
          stroke="#374151"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Wąsy */}
        <line
          x1="35"
          y1="78"
          x2="48"
          y2="77"
          stroke="#9ca3af"
          strokeWidth="1"
        />
        <line
          x1="35"
          y1="82"
          x2="48"
          y2="80"
          stroke="#9ca3af"
          strokeWidth="1"
        />
        <line
          x1="85"
          y1="78"
          x2="72"
          y2="77"
          stroke="#9ca3af"
          strokeWidth="1"
        />
        <line
          x1="85"
          y1="82"
          x2="72"
          y2="80"
          stroke="#9ca3af"
          strokeWidth="1"
        />

        {/* Ciało */}
        <ellipse cx="60" cy="115" rx="28" ry="25" fill="#f0f4ff" />

        {/* Łapki */}
        <ellipse cx="45" cy="120" rx="10" ry="15" fill="#e0e7ff" />
        <ellipse cx="75" cy="120" rx="10" ry="15" fill="#e0e7ff" />

        {/* Brzuszek */}
        <ellipse
          cx="60"
          cy="115"
          rx="15"
          ry="12"
          fill="#fde68a"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

type InfoCardColor = "emerald" | "orange" | "purple";

function InfoCard({
  icon,
  label,
  value,
  color,
}: {
  icon: keyof typeof Lucide;
  label: string;
  value: string;
  color: InfoCardColor;
}) {
  const Icon = Lucide[icon];
  const colorClasses: Record<InfoCardColor, string> = {
    emerald: "from-emerald-100 to-emerald-50 border-emerald-300",
    orange: "from-orange-100 to-orange-50 border-orange-300",
    purple: "from-purple-100 to-purple-50 border-purple-300",
  };

  const iconBg =
    color === "emerald"
      ? "bg-emerald-200 text-emerald-700"
      : color === "orange"
      ? "bg-orange-200 text-orange-700"
      : "bg-purple-200 text-purple-700";

  return (
    <div
      className={`w-full max-w-md rounded-3xl border-2 bg-gradient-to-br p-6 shadow-lg transition hover:shadow-xl ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${iconBg} shadow-sm`}
        >
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {label}
          </div>
          <div className="mt-1 text-lg font-semibold text-gray-800">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowerIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="3" fill={color} />
      <circle cx="10" cy="5" r="2.5" fill={color} opacity="0.7" />
      <circle cx="10" cy="15" r="2.5" fill={color} opacity="0.7" />
      <circle cx="5" cy="10" r="2.5" fill={color} opacity="0.7" />
      <circle cx="15" cy="10" r="2.5" fill={color} opacity="0.7" />
      <circle cx="10" cy="10" r="1.5" fill="#fef3c7" />
    </svg>
  );
}

function CarrotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path d="M10 4 L12 8 L10 16 L8 8 Z" fill="#fb923c" />
      <path
        d="M9 4 L10 2 L11 4"
        stroke="#15803d"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 5 L9 3 L10 5"
        stroke="#15803d"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function BunnyFootprints() {
  return (
    <div className="flex gap-6">
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          width="40"
          height="50"
          viewBox="0 0 40 50"
          className="opacity-30"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          <ellipse cx="15" cy="35" rx="8" ry="12" fill="#10b981" />
          <ellipse cx="25" cy="35" rx="8" ry="12" fill="#10b981" />
          <ellipse cx="12" cy="20" rx="4" ry="6" fill="#10b981" />
          <ellipse cx="20" cy="18" rx="4" ry="6" fill="#10b981" />
          <ellipse cx="28" cy="20" rx="4" ry="6" fill="#10b981" />
        </svg>
      ))}
    </div>
  );
}

function FooterDecor() {
  return (
    <div className="flex items-center justify-center gap-4 text-2xl">
      <span>🐰</span>
      <span className="text-emerald-400">•</span>
      <span>🥕</span>
      <span className="text-orange-400">•</span>
      <span>🌸</span>
      <span className="text-purple-400">•</span>
      <span>👶</span>
      <span className="text-emerald-400">•</span>
      <span>🎀</span>
    </div>
  );
}
