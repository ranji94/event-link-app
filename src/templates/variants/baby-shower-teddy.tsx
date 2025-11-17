"use client";

import * as React from "react";
import * as Lucide from "lucide-react";
import { TemplateDef } from "../types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { translate } from "@/locales";

/**
 * BABY SHOWER DREAMS - Słodki szablon na baby shower
 * - Pastelowe kolory (niebieski/różowy)
 * - Misie, chmurki, gwiazdki
 * - Miękkie, zaokrąglone kształty
 * - Przyjazna, ciepła atmosfera
 */

function getCountdownLabel(deadline: Date, now: Date) {
  const diffMs = deadline.getTime() - now.getTime();
  if (diffMs <= 0) {
    return { expired: true as const, label: "" };
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} d`);
  if (hours > 0 || days > 0) parts.push(`${hours} h`);
  parts.push(`${minutes} min`);

  return {
    expired: false as const,
    label: parts.join(" "),
  };
}

export const babyShowerDreams: TemplateDef = {
  id: "baby-shower-dreams",
  name: "Baby Shower Dreams",
  accent: "sky",
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
    const [now, setNow] = React.useState(() => new Date());

    const titleText =
      title || translate("templates.baby_shower_teddy.title_fallback");
    const locationText =
      location || translate("templates.baby_shower_teddy.location_fallback");

    const dateText = date
      ? format(new Date(date), "d MMMM yyyy, 'godzina' HH:mm", { locale: pl })
      : translate("templates.baby_shower_teddy.date_fallback");

    const personalizedGreeting = inviteeName
      ? `${translate(
          "templates.baby_shower_teddy.greeting_personalized_prefix"
        )} ${inviteeName}!`
      : translate("templates.baby_shower_teddy.greeting_fallback");

    const deadlineDate = rsvpDeadline ? new Date(rsvpDeadline) : null;
    const countdown = deadlineDate
      ? getCountdownLabel(deadlineDate, now)
      : null;
    const isDeadlineExpired = !!countdown && countdown.expired;

    React.useEffect(() => {
      if (!deadlineDate) return;
      const id = setInterval(() => {
        setNow(new Date());
      }, 60_000);
      return () => clearInterval(id);
    }, [deadlineDate?.getTime()]);

    return (
      <div className="relative min-h-screen w-full bg-gradient-to-b from-sky-50 via-blue-50 to-pink-50">
        <CloudsBackground />
        <StarsDecor />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <div className="overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur-sm">
            {/* Header z misiem */}
            <div className="relative bg-gradient-to-br from-sky-100 via-blue-100 to-pink-100 px-8 py-12 text-center">
              <TeddyBear />

              <div className="relative z-10 mt-6">
                <div className="mx-auto mb-4 flex items-center justify-center gap-2">
                  <MoonIcon />
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
                  <StarIcon />
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
                  <MoonIcon />
                </div>

                <h1 className="font-serif text-4xl font-bold tracking-tight text-sky-900 sm:text-5xl">
                  {titleText}
                </h1>

                <p className="mt-3 text-lg text-sky-700">
                  {translate("templates.baby_shower_teddy.header_subtitle")}
                </p>
              </div>
            </div>

            {/* Treść */}
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              {/* Personalizowane powitanie */}
              <div className="mb-8 text-center">
                <p className="text-xl font-semibold text-sky-800">
                  {personalizedGreeting}
                </p>
              </div>

              {/* Chmurki z informacjami */}
              <div className="mb-10 flex flex-col items-center gap-6 sm:gap-8">
                <CloudCard
                  icon="Calendar"
                  label={translate("templates.baby_shower_teddy.date_label")}
                  value={dateText}
                  color="sky"
                />
                <CloudCard
                  icon="MapPin"
                  label={translate(
                    "templates.baby_shower_teddy.location_label"
                  )}
                  value={locationText}
                  color="pink"
                />
                {dressCode && (
                  <CloudCard
                    icon="Shirt"
                    label={translate(
                      "templates.baby_shower_teddy.dresscode_label"
                    )}
                    value={dressCode}
                    color="lavender"
                  />
                )}
              </div>

              {/* Opis */}
              <div className="mx-auto max-w-2xl">
                <p className="whitespace-pre-wrap text-center text-base leading-relaxed text-gray-700">
                  {description ||
                    translate(
                      "templates.baby_shower_teddy.description_fallback"
                    )}
                </p>
              </div>

              {/* Program */}
              {program && program.length > 0 && (
                <div className="mx-auto mt-12 max-w-3xl">
                  <div className="mb-8 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600">
                      {translate("templates.baby_shower_teddy.program_title")}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {program
                      .slice()
                      .map((it, idx) => ({
                        ...it,
                        _pos:
                          typeof it.position === "number" ? it.position : idx,
                      }))
                      .sort((a, b) => a._pos - b._pos)
                      .map((it, idx) => {
                        const Icon =
                          (it.icon && Lucide[it.icon]) || Lucide.Baby;
                        const colors = [
                          "bg-sky-100 text-sky-700",
                          "bg-pink-100 text-pink-700",
                          "bg-purple-100 text-purple-700",
                        ];
                        const colorClass = colors[idx % colors.length];

                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-sky-200 bg-gradient-to-r from-white to-sky-50/50 p-5"
                          >
                            <div
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${colorClass} shadow-sm`}
                            >
                              <Icon className="h-6 w-6" />
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

                            <div className="shrink-0 rounded-full bg-sky-200 px-4 py-2 text-sm font-bold text-sky-800">
                              {it.time}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* RSVP + countdown */}
              <div className="mt-12 rounded-3xl bg-gradient-to-br from-sky-50 to-pink-50 p-8">
                {!rsvpStatus ? (
                  <div className="space-y-4">
                    {deadlineDate && (
                      <div className="flex flex-col items-center gap-1 text-center">
                        {!isDeadlineExpired && countdown && (
                          <>
                            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-sky-800">
                              <Lucide.Clock className="h-4 w-4 text-sky-500" />
                              <span>
                                {translate(
                                  "templates.baby_shower_teddy.countdown_prefix"
                                )}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-sky-900">
                              {countdown.label}
                            </p>
                            <p className="text-xs text-sky-700">
                              {translate(
                                "templates.baby_shower_teddy.countdown_until_prefix"
                              )}{" "}
                              {format(deadlineDate, "d MMMM yyyy, HH:mm", {
                                locale: pl,
                              })}
                            </p>
                          </>
                        )}

                        {isDeadlineExpired && (
                          <div className="mt-2 max-w-md rounded-2xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-900">
                            <div className="mb-1 flex items-center justify-center gap-2">
                              <Lucide.Clock className="h-4 w-4" />
                              <span className="font-semibold">
                                {translate(
                                  "templates.baby_shower_teddy.deadline_expired_title"
                                )}
                              </span>
                            </div>
                            <p className="text-xs text-pink-900/80">
                              {translate(
                                "templates.baby_shower_teddy.deadline_expired_subtitle"
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!isDeadlineExpired ? (
                      <>
                        <p className="text-center text-sm font-medium text-gray-700">
                          {translate("templates.baby_shower_teddy.rsvp_prompt")}
                        </p>
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                          <button
                            disabled={sending}
                            onClick={onAccept}
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <Lucide.Heart className="h-5 w-5" />
                              {translate(
                                "templates.baby_shower_teddy.rsvp_accept"
                              )}
                            </span>
                          </button>
                          <button
                            disabled={sending}
                            onClick={onDecline}
                            className="rounded-full border-2 border-gray-300 bg-white px-8 py-4 font-bold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50"
                          >
                            {translate(
                              "templates.baby_shower_teddy.rsvp_decline"
                            )}
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100">
                      <Lucide.CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-800">
                        {translate(
                          "templates.baby_shower_teddy.rsvp_done_title_accept"
                        )}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {translate(
                          "templates.baby_shower_teddy.rsvp_done_sub_accept"
                        )}
                      </p>
                    </div>
                    <BalloonDecor />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                      <Lucide.Cloud className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                      {translate(
                        "templates.baby_shower_teddy.rsvp_done_title_decline"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-sky-100 bg-gradient-to-r from-sky-50 to-pink-50 px-8 py-6">
              <FooterBabies />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-br from-sky-100 to-pink-100">
      <svg
        className="absolute left-2 top-2 h-8 w-8 opacity-60"
        viewBox="0 0 40 40"
      >
        <circle cx="20" cy="20" r="12" fill="#7dd3fc" />
        <circle cx="15" cy="17" r="2" fill="#0c4a6e" />
        <circle cx="25" cy="17" r="2" fill="#0c4a6e" />
        <path
          d="M15 24 Q20 27 25 24"
          stroke="#0c4a6e"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <div className="absolute right-3 top-3 text-2xl">⭐</div>
      <div className="absolute bottom-3 right-4 text-xl">☁️</div>
      <div className="absolute bottom-3 left-3 h-3 w-20 rounded-full bg-white/60" />
    </div>
  ),
};

/* ========= Komponenty dekoracyjne ========= */

function CloudsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <Cloud
          key={i}
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

function Cloud({ style }) {
  return (
    <div className="absolute animate-float opacity-20" style={style}>
      <svg width="80" height="40" viewBox="0 0 80 40">
        <ellipse cx="20" cy="25" rx="15" ry="12" fill="#bae6fd" />
        <ellipse cx="35" cy="20" rx="18" ry="15" fill="#bae6fd" />
        <ellipse cx="50" cy="23" rx="15" ry="12" fill="#bae6fd" />
        <ellipse cx="60" cy="25" rx="12" ry="10" fill="#bae6fd" />
      </svg>
    </div>
  );
}

function StarsDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-yellow-300 opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 8}px`,
            animation: `twinkle ${2 + Math.random() * 2}s infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          ⭐
        </div>
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function TeddyBear() {
  return (
    <div className="flex justify-center">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        {/* Uszy */}
        <circle cx="30" cy="30" r="15" fill="#d4a574" />
        <circle cx="70" cy="30" r="15" fill="#d4a574" />
        <circle cx="30" cy="30" r="10" fill="#f4c694" />
        <circle cx="70" cy="30" r="10" fill="#f4c694" />

        {/* Głowa */}
        <circle cx="50" cy="50" r="28" fill="#d4a574" />

        {/* Pyszczek */}
        <ellipse cx="50" cy="58" rx="16" ry="13" fill="#f4c694" />

        {/* Oczy */}
        <circle cx="42" cy="46" r="4" fill="#2c1810" />
        <circle cx="58" cy="46" r="4" fill="#2c1810" />
        <circle cx="43" cy="45" r="1.5" fill="white" />
        <circle cx="59" cy="45" r="1.5" fill="white" />

        {/* Nosek */}
        <ellipse cx="50" cy="56" rx="4" ry="3" fill="#2c1810" />

        {/* Uśmiech */}
        <path
          d="M45 60 Q50 63 55 60"
          stroke="#2c1810"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Łapy */}
        <ellipse cx="25" cy="70" rx="8" ry="12" fill="#d4a574" />
        <ellipse cx="75" cy="70" rx="8" ry="12" fill="#d4a574" />
      </svg>
    </div>
  );
}

type CloudCardColor = "sky" | "pink" | "lavender";

function CloudCard({
  icon,
  label,
  value,
  color,
}: {
  icon: keyof typeof Lucide;
  label: string;
  value: string;
  color: CloudCardColor;
}) {
  const Icon = Lucide[icon];
  const colorClasses: Record<CloudCardColor, string> = {
    sky: "from-sky-100 to-sky-50 border-sky-200",
    pink: "from-pink-100 to-pink-50 border-pink-200",
    lavender: "from-purple-100 to-purple-50 border-purple-200",
  };

  const badgeBg =
    color === "sky"
      ? "bg-sky-200 text-sky-700"
      : color === "pink"
      ? "bg-pink-200 text-pink-700"
      : "bg-purple-200 text-purple-700";

  return (
    <div
      className={`w-full max-w-md rounded-3xl border-2 bg-gradient-to-br p-6 shadow-lg ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${badgeBg}`}
        >
          <Icon className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {label}
          </div>
          <div className="mt-1 font-semibold text-gray-800">{value}</div>
        </div>
      </div>
    </div>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="text-sky-400">
      <path d="M6 2a6 6 0 1 0 8 8 5 5 0 1 1-8-8z" fill="currentColor" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="text-pink-400">
      <path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4h6z" fill="currentColor" />
    </svg>
  );
}

function BalloonDecor() {
  return (
    <div className="flex gap-2">
      {["#7dd3fc", "#fda4af", "#c4b5fd"].map((color, i) => (
        <svg
          key={i}
          width="30"
          height="40"
          viewBox="0 0 30 40"
          className="animate-float"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          <ellipse cx="15" cy="15" rx="12" ry="15" fill={color} opacity="0.8" />
          <line
            x1="15"
            y1="30"
            x2="15"
            y2="38"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </div>
  );
}

function FooterBabies() {
  return (
    <div className="flex items-center justify-center gap-4 text-2xl">
      <span>👶</span>
      <span className="text-sky-400">•</span>
      <span>🍼</span>
      <span className="text-pink-400">•</span>
      <span>🎀</span>
      <span className="text-purple-400">•</span>
      <span>🧸</span>
    </div>
  );
}
