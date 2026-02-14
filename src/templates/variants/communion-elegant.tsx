import * as React from "react";
import * as Lucide from "lucide-react";
import { TemplateDef } from "../types";
import { pl } from "date-fns/locale";
import { format } from "date-fns";
import { translate } from "@/locales";
import { useRsvpCountdown } from "../utils/useRsvpCountdown";
import { normalizeProgram } from "../utils/program";
import { formatEventDate } from "../utils/date";

/**
 * FIRST HOLY COMMUNION - Elegant Template
 * - Colors: White, Gold, Soft Purple
 * - Symbols: Chalice, Host, Cross, Church
 * - Atmosphere: Spiritual, Elegant, Celebratory
 * - Perfect for First Communion ceremonies
 */
export const communionElegant: TemplateDef = {
  id: "communion-elegant",
  name: "Komunia Elegancka",
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
      title || translate("templates.communion_elegant.title_default");
    const locationText =
      location || translate("templates.communion_elegant.location_default");

    const dateText = date
      ? formatEventDate(date)
      : translate("templates.communion_elegant.date_fallback");

    const personalizedGreeting =
      inviteeName || translate("templates.communion_elegant.greeting_default");

    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);

    const normalizedProgram = normalizeProgram(program);

    return (
      <div className="relative min-h-screen w-full bg-gradient-to-b from-amber-50 via-white to-purple-50">
        <GoldenSparkles />
        <SoftGlow />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Header with Cross and Chalice */}
            <div className="relative bg-gradient-to-b from-amber-50 to-white px-8 py-16">
              <div className="flex justify-center mb-8">
                <ChaliceCrossDecor />
              </div>

              <div className="text-center">
                <div className="mx-auto my-6 flex items-center justify-center gap-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                  <AngelWings />
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                </div>

                <h1 className="font-serif text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl">
                  {titleText}
                </h1>

                <p className="mt-4 text-lg font-medium text-purple-700">
                  {translate("templates.communion_elegant.sacrament_label")}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-12 sm:px-10 sm:py-14">
              {/* Biblical Quote */}
              <div className="mb-10 text-center">
                <div className="mx-auto max-w-2xl rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-purple-50 p-6">
                  <Lucide.Quote className="mx-auto mb-3 h-8 w-8 text-amber-500" />
                  <p className="mt-4 text-lg font-medium text-amber-800">
                    {translate("templates.communion_elegant.quote_label")}
                  </p>
                  <p className="font-serif italic text-purple-900">
                    {translate("templates.communion_elegant.quote_text")}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-purple-700">
                    {translate("templates.communion_elegant.quote_reference")}
                  </p>
                </div>
              </div>

              {/* Personalized Greeting */}
              <div className="mb-10 text-center">
                <p className="text-xl font-semibold text-gray-800">
                  {personalizedGreeting}
                </p>
                <p className="mt-3 text-gray-600">
                  {translate("templates.communion_elegant.invitation_intro")}
                </p>
              </div>

              {/* Information Cards */}
              <div className="mb-10 grid gap-6 sm:grid-cols-2">
                <CommunionCard
                  icon="Calendar"
                  label={translate("templates.communion_elegant.info_date_label")}
                  value={dateText}
                />
                <CommunionCard
                  icon="Church"
                  label={translate("templates.communion_elegant.info_location_label")}
                  value={locationText}
                />
                {dressCode && (
                  <CommunionCard
                    icon="Shirt"
                    label={translate(
                      "templates.communion_elegant.dress_code_label"
                    )}
                    value={dressCode}
                  />
                )}
              </div>

              {/* Description */}
              <div className="mx-auto max-w-2xl">
                <p className="whitespace-pre-wrap text-center leading-relaxed text-gray-700">
                  {description ||
                    translate("templates.communion_elegant.description_default")}
                </p>
              </div>

              {/* Program */}
              {normalizedProgram && normalizedProgram.length > 0 && (
                <div className="mx-auto mt-12 max-w-3xl">
                  <div className="mb-8 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-amber-700">
                      {translate("templates.communion_elegant.program_title")}
                    </h3>
                    <div className="mx-auto mt-3 h-0.5 w-20 bg-amber-300" />
                  </div>

                  <div className="space-y-4">
                    {normalizedProgram.map((it, idx) => {
                      const Icon = (it.icon && Lucide[it.icon]) || Lucide.Bible;

                      return (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-r from-white to-amber-50 p-6 transition hover:border-amber-300 hover:shadow-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-yellow-300 shadow-sm">
                              <Icon className="h-6 w-6 text-amber-900" />
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

                            <div className="shrink-0 rounded-full bg-amber-200 px-4 py-2 text-sm font-semibold text-amber-900">
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
              <div className="mt-12 rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-purple-50 p-8">
                {!rsvpStatus ? (
                  <>
                    {deadlineDate && (
                      <div className="mb-6 text-center">
                        {!isExpired && countdown ? (
                          <div className="inline-flex flex-col items-center gap-2">
                            <p className="text-xs font-medium text-amber-800">
                              {translate(
                                "templates.communion_elegant.rsvp_deadline_label"
                              )}
                            </p>
                            <div className="rounded-full bg-amber-100 px-5 py-2 text-sm font-semibold text-amber-900">
                              {countdown}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1 text-center">
                            <p className="text-sm font-semibold text-amber-900">
                              {translate(
                                "templates.communion_elegant.rsvp_deadline_expired_title"
                              )}
                            </p>
                            <p className="text-xs text-amber-700">
                              {translate(
                                "templates.communion_elegant.rsvp_deadline_expired_at"
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
                          {translate("templates.communion_elegant.rsvp_request")}
                        </p>
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                          <button
                            disabled={sending}
                            onClick={onAccept}
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-10 py-4 font-bold text-white shadow-lg transition hover:shadow-xl hover:scale-105 disabled:opacity-50"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <Lucide.Check className="h-5 w-5" />
                              {translate(
                                "templates.communion_elegant.rsvp_accept_label"
                              )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 opacity-0 transition group-hover:opacity-100" />
                          </button>
                          <button
                            disabled={sending}
                            onClick={onDecline}
                            className="rounded-full border-2 border-amber-300 bg-white px-10 py-4 font-bold text-amber-700 transition hover:border-amber-400 hover:bg-amber-50 disabled:opacity-50"
                          >
                            {translate(
                              "templates.communion_elegant.rsvp_decline_label"
                            )}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 animate-pulse rounded-full bg-amber-300/50" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-400 shadow-xl">
                        <Lucide.Heart className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-900">
                        {translate(
                          "templates.communion_elegant.rsvp_accepted_title"
                        )}
                      </p>
                      <p className="mt-2 text-amber-700">
                        {translate(
                          "templates.communion_elegant.rsvp_accepted_text"
                        )}
                      </p>
                    </div>
                    <BlessingHands />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 border-2 border-amber-200">
                      <Lucide.Heart className="h-10 w-10 text-amber-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                      {translate(
                        "templates.communion_elegant.rsvp_declined_title"
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      {translate(
                        "templates.communion_elegant.rsvp_declined_text"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-amber-100 bg-gradient-to-r from-amber-50 via-white to-amber-50 px-8 py-8">
              <FooterBlessing />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-purple-100">
      <svg
        className="absolute left-3 top-3 h-6 w-6 opacity-60"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2 L12 10 M8 6 L16 6"
          stroke="#713f12"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute right-3 top-2 h-8 w-10 opacity-50"
        viewBox="0 0 40 30"
      >
        <ellipse cx="20" cy="15" rx="12" ry="8" fill="#fde68a" />
        <path
          d="M10 15 Q8 10 12 8 Q15 12 20 12 Q25 12 28 8 Q32 10 30 15"
          fill="#fef3c7"
        />
      </svg>
      <div className="absolute bottom-3 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-white/70" />
    </div>
  ),
};

/* ========= Decorative Components ========= */

function GoldenSparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${8 + i * 9}%`,
            animation: `twinkle ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
            top: `${-10 + i * 5}%`,
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="text-amber-400 opacity-30"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 0.6; transform: scale(1.2) rotate(10deg); }
        }
      `}</style>
    </div>
  );
}

function SoftGlow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl" />
    </div>
  );
}

function ChaliceCrossDecor() {
  return (
    <div className="flex justify-center">
      <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
        {/* Cross */}
        <path
          d="M50 15 L50 85 M30 50 L70 50"
          stroke="#713f12"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Chalice Base */}
        <ellipse cx="50" cy="75" rx="12" ry="5" fill="#713f12" />
        
        {/* Chalice Bowl */}
        <path
          d="M40 70 Q50 40 60 70"
          stroke="#713f12"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Wine */}
        <path
          d="M42 65 Q50 45 58 65"
          stroke="#ef4444"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Host (Bread) */}
        <ellipse cx="50" cy="40" rx="4" ry="2" fill="#f59e0b" />
      </svg>
    </div>
  );
}

function AngelWings() {
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" className="text-amber-300">
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

function CommunionCard({ icon, label, value }) {
  const Icon = Lucide[icon];

  return (
    <div className="group rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50 p-6 transition hover:border-amber-300 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-yellow-300">
          <Icon className="h-7 w-7 text-amber-900" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
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
          stroke="#ca8a04"
          strokeWidth="2"
        />
        <path
          d="M20 25 Q25 30 30 32 Q35 30 40 25"
          fill="none"
          stroke="#ca8a04"
          strokeWidth="2"
        />
        <circle cx="30" cy="28" r="3" fill="#fde68a" />
      </svg>
    </div>
  );
}

function FooterBlessing() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3 text-amber-500">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300" />
        <Lucide.Heart className="h-5 w-5" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300" />
      </div>
      <p className="text-center text-sm font-medium text-purple-800">
        {translate("templates.communion_elegant.footer_blessing")}
      </p>
    </div>
  );
}