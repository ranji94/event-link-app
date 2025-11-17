import * as React from "react";
import * as Lucide from "lucide-react";
import { TemplateDef } from "../types";
import { pl } from "date-fns/locale";
import { format } from "date-fns";
import { translate } from "@/locales";
import { useRsvpCountdown } from "../utils/useRsvpCountdown";

/**
 * BAPTISM BLESSING - Delikatny szablon na chrzciny
 * - Pastelowe błękity i biel
 * - Gołąbki, krzyże, anioły
 * - Delikatne, duchowe akcenty
 * - Spokojny, uroczysty klimat
 */
export const baptismBlessing: TemplateDef = {
  id: "baptism-blessing",
  name: "Baptism Blessing",
  accent: "blue",
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
      title || translate("templates.baptism_blessing.title_default");
    const locationText =
      location || translate("templates.baptism_blessing.location_default");

    const dateText = date
      ? format(new Date(date), "d MMMM yyyy, 'godzina' HH:mm", { locale: pl })
      : translate("templates.baptism_blessing.date_fallback");

    const personalizedGreeting =
      inviteeName || translate("templates.baptism_blessing.greeting_default");

    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);

    return (
      <div className="relative min-h-screen w-full bg-gradient-to-b from-sky-50 via-blue-50 to-sky-100">
        <FloatingFeathers />
        <SoftGlow />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative bg-gradient-to-b from-sky-100 to-white px-8 py-16">
              <div className="flex justify-center mb-8">
                <DoveDecor />
              </div>

              <div className="text-center">
                <CrossIcon />

                <div className="mx-auto my-6 flex items-center justify-center gap-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
                  <AngelWings />
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
                </div>

                <h1 className="font-serif text-4xl font-bold tracking-tight text-sky-900 sm:text-5xl">
                  {titleText}
                </h1>

                <p className="mt-4 text-lg font-medium text-sky-700">
                  Sakrament Chrztu Świętego
                </p>
              </div>
            </div>

            {/* Treść */}
            <div className="px-6 py-12 sm:px-10 sm:py-14">
              {/* Cytat biblijny */}
              <div className="mb-10 text-center">
                <div className="mx-auto max-w-2xl rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-6">
                  <Lucide.Quote className="mx-auto mb-3 h-8 w-8 text-sky-400" />
                  <p className="mt-4 text-lg font-medium text-sky-700">
                    {translate("templates.baptism_blessing.sacrament_label")}
                  </p>
                  <p className="font-serif italic text-sky-900">
                    {translate("templates.baptism_blessing.quote_text")}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-sky-600">
                    {translate("templates.baptism_blessing.quote_reference")}
                  </p>
                </div>
              </div>

              {/* Personalizowane powitanie */}
              <div className="mb-10 text-center">
                <p className="text-xl font-semibold text-gray-800">
                  {personalizedGreeting}
                </p>
                <p className="mt-3 text-gray-600">
                  {translate("templates.baptism_blessing.invitation_intro")}
                </p>
              </div>

              {/* Informacje */}
              <div className="mb-10 grid gap-6 sm:grid-cols-2">
                <BaptismCard
                  icon="Calendar"
                  label="Data i godzina"
                  value={dateText}
                />
                <BaptismCard
                  icon="Church"
                  label="Miejsce"
                  value={locationText}
                />
                {dressCode && (
                  <BaptismCard
                    icon="Shirt"
                    label={translate(
                      "templates.baptism_blessing.dress_code_label"
                    )}
                    value={dressCode}
                  />
                )}
              </div>

              {/* Opis */}
              <div className="mx-auto max-w-2xl">
                <p className="whitespace-pre-wrap text-center leading-relaxed text-gray-700">
                  {description ||
                    translate("templates.baptism_blessing.description_default")}
                </p>
              </div>

              {/* Program */}
              {program && program.length > 0 && (
                <div className="mx-auto mt-12 max-w-3xl">
                  <div className="mb-8 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-sky-700">
                      {translate("templates.baptism_blessing.program_title")}
                    </h3>
                    <div className="mx-auto mt-3 h-0.5 w-20 bg-sky-300" />
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
                          (it.icon && Lucide[it.icon]) || Lucide.Heart;

                        return (
                          <div
                            key={idx}
                            className="group relative overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-r from-white to-sky-50 p-6 transition hover:border-sky-300 hover:shadow-md"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-200 to-blue-300 shadow-sm">
                                <Icon className="h-6 w-6 text-sky-800" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900">
                                  {it.header}
                                </div>
                                {it.subheader && (
                                  <div className="mt-1 text-sm text-gray-600">
                                    {it.subheader}
                                  </div>
                                )}
                              </div>

                              <div className="shrink-0 rounded-full bg-sky-200 px-4 py-2 text-sm font-semibold text-sky-800">
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
              <div className="mt-12 rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-8">
                {!rsvpStatus ? (
                  <>
                    {deadlineDate && (
                      <div className="mb-6 text-center">
                        {!isExpired && countdown ? (
                          <div className="inline-flex flex-col items-center gap-2">
                            <p className="text-xs font-medium text-sky-800">
                              {translate(
                                "templates.baptism_blessing.rsvp_deadline_label"
                              )}
                            </p>
                            <div className="rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-900">
                              {countdown}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1 text-center">
                            <p className="text-sm font-semibold text-sky-900">
                              {translate(
                                "templates.baptism_blessing.rsvp_deadline_expired_title"
                              )}
                            </p>
                            <p className="text-xs text-sky-700">
                              {translate(
                                "templates.baptism_blessing.rsvp_deadline_expired_at"
                              )}{" "}
                              {format(deadlineDate, "dd.MM.yyyy, HH:mm")}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!deadlineDate || (!isExpired && countdown) ? (
                      <div className="space-y-6">
                        <p className="text-center text-sm font-medium text-gray-700">
                          {translate("templates.baptism_blessing.rsvp_request")}
                        </p>
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                          <button
                            disabled={sending}
                            onClick={onAccept}
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-10 py-4 font-bold text-white shadow-lg transition hover:shadow-xl hover:scale-105 disabled:opacity-50"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <Lucide.Check className="h-5 w-5" />
                              {translate(
                                "templates.baptism_blessing.rsvp_accept_label"
                              )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 transition group-hover:opacity-100" />
                          </button>
                          <button
                            disabled={sending}
                            onClick={onDecline}
                            className="rounded-full border-2 border-sky-300 bg-white px-10 py-4 font-bold text-sky-700 transition hover:border-sky-400 hover:bg-sky-50 disabled:opacity-50"
                          >
                            {translate(
                              "templates.baptism_blessing.rsvp_decline_label"
                            )}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 animate-pulse rounded-full bg-sky-300/50" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-300 to-blue-400 shadow-xl">
                        <Lucide.Heart className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-sky-900">
                        {translate(
                          "templates.baptism_blessing.rsvp_accepted_title"
                        )}
                      </p>
                      <p className="mt-2 text-sky-700">
                        {translate(
                          "templates.baptism_blessing.rsvp_accepted_text"
                        )}
                      </p>
                    </div>
                    <BlessingHands />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 border-2 border-sky-200">
                      <Lucide.Heart className="h-10 w-10 text-sky-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                      {translate(
                        "templates.baptism_blessing.rsvp_declined_title"
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      {translate(
                        "templates.baptism_blessing.rsvp_declined_text"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-sky-100 bg-gradient-to-r from-sky-50 via-white to-sky-50 px-8 py-8">
              <FooterBlessing />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-br from-sky-100 to-blue-100">
      <svg
        className="absolute left-3 top-3 h-6 w-6 opacity-60"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2 L12 10 M8 6 L16 6"
          stroke="#0c4a6e"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute right-3 top-2 h-8 w-10 opacity-50"
        viewBox="0 0 40 30"
      >
        <ellipse cx="20" cy="15" rx="12" ry="8" fill="#7dd3fc" />
        <path
          d="M10 15 Q8 10 12 8 Q15 12 20 12 Q25 12 28 8 Q32 10 30 15"
          fill="#bae6fd"
        />
      </svg>
      <div className="absolute bottom-3 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-white/70" />
    </div>
  ),
};

/* ========= Komponenty dekoracyjne ========= */

function FloatingFeathers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            animation: `float ${8 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            top: `${-10 + i * 5}%`,
          }}
        >
          <svg
            width="30"
            height="40"
            viewBox="0 0 30 40"
            className="opacity-20"
          >
            <path
              d="M15 5 Q10 15 8 25 Q10 30 15 38 Q20 30 22 25 Q20 15 15 5"
              fill="#0ea5e9"
              stroke="#0284c7"
              strokeWidth="0.5"
            />
            <line
              x1="15"
              y1="5"
              x2="15"
              y2="38"
              stroke="#0284c7"
              strokeWidth="1"
            />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(20px) rotate(5deg); }
          50% { transform: translateY(40px) rotate(-5deg); }
          75% { transform: translateY(20px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}

function SoftGlow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
    </div>
  );
}

function DoveDecor() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60" className="drop-shadow-lg">
      {/* Ciało gołębia */}
      <ellipse cx="40" cy="35" rx="18" ry="12" fill="#e0f2fe" />

      {/* Głowa */}
      <circle cx="35" cy="28" r="8" fill="#e0f2fe" />

      {/* Dziób */}
      <path d="M28 28 L22 28 L25 30 Z" fill="#f59e0b" />

      {/* Oko */}
      <circle cx="33" cy="27" r="2" fill="#0c4a6e" />
      <circle cx="33.5" cy="26.5" r="0.8" fill="white" />

      {/* Skrzydła */}
      <path
        d="M40 35 Q20 25 10 30 Q15 38 25 40 Q30 38 40 35"
        fill="#bae6fd"
        stroke="#7dd3fc"
        strokeWidth="1"
      />
      <path
        d="M40 35 Q60 25 70 30 Q65 38 55 40 Q50 38 40 35"
        fill="#bae6fd"
        stroke="#7dd3fc"
        strokeWidth="1"
      />

      {/* Ogon */}
      <path d="M52 40 Q58 45 55 50 Q52 48 50 45" fill="#dbeafe" />
      <path d="M52 40 Q58 43 60 48 Q56 48 52 45" fill="#dbeafe" />

      {/* Gałązka oliwna */}
      <line
        x1="22"
        y1="32"
        x2="18"
        y2="38"
        stroke="#22c55e"
        strokeWidth="1.5"
      />
      <ellipse cx="16" cy="36" rx="2" ry="3" fill="#86efac" />
      <ellipse cx="17" cy="39" rx="2" ry="3" fill="#86efac" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-blue-200 shadow-lg">
      <svg width="32" height="32" viewBox="0 0 32 32" className="text-sky-700">
        <path
          d="M16 4 L16 28 M10 16 L22 16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function AngelWings() {
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" className="text-sky-300">
      <path
        d="M5 12 Q8 8 12 10 Q14 12 15 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M35 12 Q32 8 28 10 Q26 12 25 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="20" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function BaptismCard({ icon, label, value }) {
  const Icon = Lucide[icon];

  return (
    <div className="group rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-white to-sky-50 p-6 transition hover:border-sky-300 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-200 to-blue-300">
          <Icon className="h-7 w-7 text-sky-800" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-600">
            {label}
          </div>
          <div className="mt-1 font-semibold text-gray-900">{value}</div>
        </div>
      </div>
    </div>
  );
}

function BlessingHands() {
  return (
    <div className="mt-4">
      <svg width="60" height="50" viewBox="0 0 60 50" className="opacity-60">
        <path
          d="M15 30 Q15 20 20 15 L25 25 M45 30 Q45 20 40 15 L35 25"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2"
        />
        <path
          d="M20 25 Q25 30 30 32 Q35 30 40 25"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2"
        />
        <circle cx="30" cy="28" r="3" fill="#7dd3fc" />
      </svg>
    </div>
  );
}

function FooterBlessing() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3 text-sky-400">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-sky-300" />
        <Lucide.Heart className="h-5 w-5" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-sky-300" />
      </div>
      <p className="text-center text-sm font-medium text-sky-700">
        Niech Boże błogosławieństwo towarzyszy nam zawsze
      </p>
    </div>
  );
}
