"use client";

import * as React from "react";
import * as Lucide from "lucide-react";
import { translate } from "@/locales";
import { formatEventDate } from "../utils/date";
import { useRsvpCountdown } from "../utils/useRsvpCountdown";
import { normalizeProgram } from "../utils/program";

/**
 * WILD WEST - Uniwersalny szablon inspirowany Red Dead Redemption 2
 * - Estetyka Dzikiego Zachodu, vintage poster style
 * - Tekstury drewna, papieru, skóry
 * - Vintage typography - western fonts vibe
 * - Ciepłe, ziemiste kolory (brązy, beże, bursztyn)
 * - Wanted poster aesthetic
 * - Rustykalna elegancja
 */

export const wildWestUniversal = {
  id: "wild-west-universal",
  name: "Wild West",
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
  }: any) => {
    const titleText = title || translate("templates.wild_west.title_fallback");
    const locationText =
      location || translate("templates.wild_west.location_fallback");
    const dateText = date
      ? formatEventDate(date)
      : translate("templates.wild_west.date_fallback");

    const personalizedGreeting = inviteeName
      ? `${translate(
          "templates.wild_west.greeting_personalized_prefix"
        )} ${inviteeName}!`
      : translate("templates.wild_west.greeting_fallback");

    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);
    const isDeadlineExpired = isExpired;
    const normalizedProgram = normalizeProgram(program);

    return (
      <div className="relative min-h-screen w-full bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
        <PaperTexture />
        <VignetteOverlay />
        <RopeDecor />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:py-16">
          {/* Wanted Poster Style */}
          <div className="relative overflow-hidden rounded-lg border-8 border-amber-900 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-100 shadow-2xl">
            <WoodGrain />
            <CornerOrnaments />

            {/* Header */}
            <div className="relative border-b-4 border-amber-900 bg-gradient-to-b from-amber-200 to-amber-100 px-8 py-12 text-center">
              <div className="absolute left-0 right-0 top-0 h-3 bg-gradient-to-r from-transparent via-amber-900/30 to-transparent" />

              <WesternOrnament />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-center gap-4">
                  <WesternStar />
                  <div className="h-px w-24 bg-amber-900" />
                  <Lucide.Flame className="h-8 w-8 text-amber-800" />
                  <div className="h-px w-24 bg-amber-900" />
                  <WesternStar />
                </div>

                <div className="mb-4 border-y-2 border-amber-900 py-3">
                  <p className="font-serif text-sm font-bold uppercase tracking-[0.3em] text-amber-900">
                    {translate("templates.wild_west.header_badge")}
                  </p>
                </div>

                <h1
                  className="mb-4 font-serif text-5xl font-black uppercase leading-none tracking-tight text-amber-950 sm:text-6xl"
                  style={{
                    textShadow: "2px 2px 0px rgba(217, 119, 6, 0.3)",
                  }}
                >
                  {titleText}
                </h1>

                <div className="mx-auto mb-4 h-1 w-32 bg-amber-900" />

                <p className="font-serif text-lg font-semibold uppercase tracking-wider text-amber-800">
                  {translate("templates.wild_west.header_subtitle")}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-amber-900/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative px-6 py-10 sm:px-10 sm:py-12">
              {/* Personalized greeting */}
              <div className="mb-10 text-center">
                <div className="inline-block border-4 border-amber-900 bg-amber-50 px-8 py-4 shadow-lg">
                  <p className="font-serif text-xl font-bold uppercase tracking-wide text-amber-950">
                    {personalizedGreeting}
                  </p>
                </div>
              </div>

              {/* Info cards - vintage style */}
              <div className="mb-12 space-y-6">
                <VintageCard
                  icon="Calendar"
                  label={translate("templates.wild_west.date_label")}
                  value={dateText}
                />
                <VintageCard
                  icon="MapPin"
                  label={translate("templates.wild_west.location_label")}
                  value={locationText}
                />
                {dressCode && (
                  <VintageCard
                    icon="Shirt"
                    label={translate("templates.wild_west.dresscode_label")}
                    value={dressCode}
                  />
                )}
              </div>

              {/* Description */}
              <div className="mx-auto mb-12 max-w-2xl">
                <div className="relative rounded-none border-4 border-double border-amber-900 bg-gradient-to-b from-amber-50 to-orange-50 p-8 shadow-lg">
                  <div className="absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center border-4 border-amber-900 bg-amber-200 text-2xl shadow-md">
                    🤠
                  </div>
                  <div className="absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center border-4 border-amber-900 bg-amber-200 text-2xl shadow-md">
                    🌵
                  </div>
                  <p className="whitespace-pre-wrap text-center font-serif text-base leading-relaxed text-amber-950">
                    {description ||
                      translate("templates.wild_west.description_fallback")}
                  </p>
                </div>
              </div>

              {/* Program */}
              {normalizedProgram && normalizedProgram.length > 0 && (
                <div className="mx-auto mb-12 max-w-3xl">
                  <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-4 border-4 border-amber-900 bg-amber-200 px-8 py-4 shadow-lg">
                      <Lucide.MapPinned className="h-6 w-6 text-amber-900" />
                      <h3 className="font-serif text-sm font-black uppercase tracking-widest text-amber-950">
                        {translate("templates.wild_west.program_title")}
                      </h3>
                      <Lucide.MapPinned className="h-6 w-6 text-amber-900" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {normalizedProgram.map((it: any, idx: number) => {
                      const Icon =
                        (it.icon && Lucide[it.icon as keyof typeof Lucide]) ||
                        Lucide.Star;

                      return (
                        <div
                          key={idx}
                          className="group relative border-4 border-amber-900 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-6 shadow-md transition hover:shadow-xl"
                        >
                          <div className="absolute left-0 top-0 h-full w-2 bg-amber-900" />
                          <div className="flex items-center gap-5">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center border-4 border-amber-900 bg-amber-200 shadow-sm transition group-hover:scale-110">
                              <Icon className="h-8 w-8 text-amber-900" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="font-serif text-xl font-bold uppercase text-amber-950">
                                {it.header}
                              </div>
                              {it.subheader && (
                                <div className="mt-1 font-serif text-sm italic text-amber-800">
                                  {it.subheader}
                                </div>
                              )}
                            </div>

                            <div className="shrink-0 border-4 border-amber-900 bg-amber-200 px-5 py-2 font-serif text-sm font-bold uppercase tracking-wider text-amber-950">
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
              <div className="border-4 border-double border-amber-900 bg-gradient-to-b from-amber-100 to-orange-100 p-10 shadow-xl">
                {!rsvpStatus ? (
                  <div className="space-y-8">
                    {deadlineDate && (
                      <div className="flex flex-col items-center gap-4 text-center">
                        {!isDeadlineExpired && countdown && (
                          <>
                            <div className="inline-flex items-center gap-3 border-4 border-amber-900 bg-amber-200 px-6 py-3 font-serif text-xs font-bold uppercase tracking-widest text-amber-950 shadow-md">
                              <Lucide.Clock className="h-5 w-5" />
                              <span>
                                {translate(
                                  "templates.wild_west.countdown_prefix"
                                )}
                              </span>
                            </div>
                            <p className="font-serif text-3xl font-black uppercase text-amber-950">
                              {countdown.label}
                            </p>
                            <p className="font-serif text-sm font-semibold text-amber-800">
                              {translate(
                                "templates.wild_west.countdown_until_prefix"
                              )}{" "}
                              {deadlineDate.toLocaleDateString("pl-PL")}
                            </p>
                          </>
                        )}

                        {isDeadlineExpired && (
                          <div className="mt-2 max-w-md border-4 border-red-900 bg-red-100 px-6 py-4 text-sm shadow-lg">
                            <div className="mb-1 flex items-center justify-center gap-2">
                              <Lucide.Clock className="h-5 w-5 text-red-900" />
                              <span className="font-serif font-bold uppercase text-red-900">
                                {translate(
                                  "templates.wild_west.deadline_expired_title"
                                )}
                              </span>
                            </div>
                            <p className="font-serif text-xs italic text-red-800">
                              {translate(
                                "templates.wild_west.deadline_expired_subtitle"
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!isDeadlineExpired ? (
                      <>
                        <p className="text-center font-serif text-xl font-bold uppercase tracking-wide text-amber-950">
                          {translate("templates.wild_west.rsvp_prompt")}
                        </p>
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                          <button
                            disabled={sending}
                            onClick={onAccept}
                            className="group relative overflow-hidden border-4 border-amber-900 bg-gradient-to-b from-amber-600 to-amber-800 px-12 py-5 font-serif font-black uppercase tracking-wider text-white shadow-xl transition hover:from-amber-700 hover:to-amber-900 hover:shadow-2xl disabled:opacity-50"
                          >
                            <span className="relative z-10 flex items-center gap-3">
                              <Lucide.Check className="h-6 w-6" />
                              {translate("templates.wild_west.rsvp_accept")}
                            </span>
                          </button>
                          <button
                            disabled={sending}
                            onClick={onDecline}
                            className="border-4 border-amber-900 bg-amber-100 px-12 py-5 font-serif font-bold uppercase tracking-wider text-amber-950 transition hover:bg-amber-200 disabled:opacity-50"
                          >
                            {translate("templates.wild_west.rsvp_decline")}
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <div className="flex h-32 w-32 items-center justify-center border-8 border-green-900 bg-gradient-to-br from-green-600 to-green-800 shadow-2xl">
                      <Lucide.CheckCircle2 className="h-16 w-16 text-white" />
                    </div>
                    <div>
                      <p className="mb-2 font-serif text-4xl font-black uppercase text-amber-950">
                        {translate(
                          "templates.wild_west.rsvp_done_title_accept"
                        )}
                      </p>
                      <p className="font-serif text-lg italic text-amber-800">
                        {translate("templates.wild_west.rsvp_done_sub_accept")}
                      </p>
                    </div>
                    <WesternEmojis />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <div className="flex h-32 w-32 items-center justify-center border-8 border-gray-700 bg-gray-600">
                      <Lucide.X className="h-16 w-16 text-white" />
                    </div>
                    <p className="font-serif text-2xl font-bold uppercase text-amber-950">
                      {translate("templates.wild_west.rsvp_done_title_decline")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-4 border-amber-900 bg-gradient-to-b from-amber-200 to-amber-100 px-8 py-6">
              <FooterDecor />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-lg border-4 border-amber-900 bg-gradient-to-b from-amber-100 to-orange-100">
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <pattern
            id="wood-thumb"
            x="0"
            y="0"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <rect width="4" height="4" fill="#d97706" opacity="0.1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#wood-thumb)" />
        </svg>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-black uppercase text-amber-950">
        WILD
      </div>
      <div className="absolute right-2 top-2 text-xl">🤠</div>
      <div className="absolute bottom-2 left-2 text-lg">⭐</div>
    </div>
  ),
};

/* ========= Komponenty dekoracyjne ========= */

function PaperTexture() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-30"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4' /%3E%3C/svg%3E")`,
      }}
    />
  );
}

function VignetteOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle, transparent 40%, rgba(120, 53, 15, 0.3) 100%)",
      }}
    />
  );
}

function WoodGrain() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="wood"
            x="0"
            y="0"
            width="100"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="5"
              x2="100"
              y2="5"
              stroke="#78350f"
              strokeWidth="0.5"
              opacity="0.5"
            />
            <line
              x1="0"
              y1="2"
              x2="100"
              y2="2"
              stroke="#78350f"
              strokeWidth="0.3"
              opacity="0.3"
            />
            <line
              x1="0"
              y1="8"
              x2="100"
              y2="8"
              stroke="#78350f"
              strokeWidth="0.3"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wood)" />
      </svg>
    </div>
  );
}

function RopeDecor() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0">
      <svg width="100%" height="20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 10 Q 50 5, 100 10 T 200 10 T 300 10 T 400 10 T 500 10 T 600 10 T 700 10 T 800 10 T 900 10 T 1000 10 T 1100 10 T 1200 10"
          stroke="#78350f"
          strokeWidth="3"
          fill="none"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

function CornerOrnaments() {
  return (
    <>
      {/* Top corners */}
      <div className="absolute left-2 top-2 h-8 w-8 border-l-4 border-t-4 border-amber-900 opacity-60" />
      <div className="absolute right-2 top-2 h-8 w-8 border-r-4 border-t-4 border-amber-900 opacity-60" />

      {/* Bottom corners */}
      <div className="absolute bottom-2 left-2 h-8 w-8 border-b-4 border-l-4 border-amber-900 opacity-60" />
      <div className="absolute bottom-2 right-2 h-8 w-8 border-b-4 border-r-4 border-amber-900 opacity-60" />
    </>
  );
}

function WesternOrnament() {
  return (
    <div className="absolute left-1/2 top-4 -translate-x-1/2">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle
          cx="30"
          cy="30"
          r="25"
          fill="none"
          stroke="#78350f"
          strokeWidth="2"
        />
        <path
          d="M30 10 L35 25 L50 30 L35 35 L30 50 L25 35 L10 30 L25 25 Z"
          fill="#d97706"
          stroke="#78350f"
          strokeWidth="1.5"
        />
        <circle
          cx="30"
          cy="30"
          r="8"
          fill="#fef3c7"
          stroke="#78350f"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

function WesternStar() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path
        d="M16 2 L19 13 L30 16 L19 19 L16 30 L13 19 L2 16 L13 13 Z"
        fill="#d97706"
        stroke="#78350f"
        strokeWidth="1.5"
      />
      <circle
        cx="16"
        cy="16"
        r="4"
        fill="#fef3c7"
        stroke="#78350f"
        strokeWidth="1"
      />
    </svg>
  );
}

function VintageCard({
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
    <div className="group relative border-4 border-amber-900 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 p-6 shadow-lg transition hover:shadow-xl">
      <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-amber-700 to-amber-900" />
      <div className="absolute right-0 top-0 h-full w-3 bg-gradient-to-b from-amber-700 to-amber-900" />

      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center border-4 border-amber-900 bg-amber-200 shadow-sm">
          <Icon className="h-8 w-8 text-amber-900" />
        </div>
        <div className="flex-1">
          <div className="font-serif text-xs font-bold uppercase tracking-widest text-amber-700">
            {label}
          </div>
          <div className="mt-2 font-serif text-xl font-bold uppercase text-amber-950">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function WesternEmojis() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {["🤠", "🌵", "⭐", "🐎", "🎯", "🔥", "🏜️"].map((emoji, i) => (
        <span
          key={i}
          className="text-4xl"
          style={{
            animation: `bounce-western ${
              1 + Math.random() * 0.5
            }s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {emoji}
        </span>
      ))}
      <style>{`
        @keyframes bounce-western {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}

function FooterDecor() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-900" />
      <div className="flex items-center gap-3 text-2xl">
        <span>🤠</span>
        <span className="text-amber-700">⭐</span>
        <span>🌵</span>
        <span className="text-amber-700">⭐</span>
        <span>🐎</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-900" />
    </div>
  );
}
