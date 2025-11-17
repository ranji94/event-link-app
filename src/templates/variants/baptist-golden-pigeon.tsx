import * as React from "react";
import * as Lucide from "lucide-react";
import { TemplateDef } from "../types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { translate } from "@/locales";
import { useRsvpCountdown } from "../utils/useRsvpCountdown";

/**
 * CHRZEST ŚWIĘTY - ZŁOTA GOŁĘBICA
 * Elegancki szablon na Chrzciny
 * - Kolorystyka: Biel, złoto, akcenty szałwiowej zieleni
 * - Motywy: Gołębica, gałązka oliwna, subtelne złote detale
 * - Czysta, elegancka typografia
 * - Podniosła i spokojna atmosfera
 */
export const baptistGoldenPigeon: TemplateDef = {
  id: "chrzest-zlota-golebica",
  name: "Złota Gołębica",
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
      title || translate("templates.baptist_golden_pigeon.title_default");
    const locationText =
      location || translate("templates.baptist_golden_pigeon.location_default");

    const dateText = date
      ? format(new Date(date), "d MMMM yyyy, 'godzina' HH:mm", { locale: pl })
      : translate("templates.baptist_golden_pigeon.date_fallback");

    const personalizedGreeting = inviteeName
      ? translate("templates.baptist_golden_pigeon.greeting_personalized", {
          name: inviteeName,
        })
      : translate("templates.baptist_golden_pigeon.greeting_default");

    const descriptionText =
      description ||
      translate("templates.baptist_golden_pigeon.description_default");

    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);

    return (
      <div className="relative min-h-screen w-full bg-gray-50">
        <GoldenSparkles />

        <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <div className="overflow-hidden rounded-2xl border border-amber-200/50 bg-white shadow-xl">
            {/* Header z Gołębicą */}
            <div className="relative border-b border-amber-100 bg-white px-8 py-12 text-center">
              <GoldenDoveHeader />

              <div className="relative z-10 mt-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-amber-600">
                  Zaproszenie na
                </p>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl">
                  {titleText}
                </h1>
              </div>
            </div>

            {/* Treść */}
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              {/* Personalizowane powitanie */}
              <div className="mb-8 text-center">
                <p className="text-xl font-semibold text-gray-800">
                  {personalizedGreeting}
                </p>
              </div>

              {/* Opis */}
              <div className="mx-auto max-w-2xl">
                <p className="whitespace-pre-wrap text-center text-base leading-relaxed text-gray-700">
                  {descriptionText}
                </p>
              </div>

              {/* Informacje o dacie i miejscu */}
              <div className="mt-10 mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <InfoBlock
                  icon="CalendarDays"
                  label={translate(
                    "templates.baptist_golden_pigeon.info_date_label"
                  )}
                  value={dateText}
                  color="amber"
                />
                <InfoBlock
                  icon="Church"
                  label={translate(
                    "templates.baptist_golden_pigeon.info_location_label"
                  )}
                  value={locationText}
                  color="green"
                />
                {dressCode && (
                  <InfoBlock
                    icon="Shirt"
                    label={translate(
                      "templates.baptist_golden_pigeon.dress_code_label"
                    )}
                    value={dressCode}
                    color="amber"
                  />
                )}
              </div>

              {/* Program */}
              {program && program.length > 0 && (
                <div className="mx-auto mt-12 max-w-3xl">
                  <div className="mb-8 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-amber-600">
                      {translate(
                        "templates.baptist_golden_pigeon.program_title"
                      )}
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
                          (it.icon && Lucide[it.icon]) || Lucide.Gift;
                        const colors = [
                          "bg-amber-100 text-amber-700",
                          "bg-emerald-100 text-emerald-700",
                        ];
                        const colorClass = colors[idx % colors.length];

                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"
                          >
                            <div
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${colorClass}`}
                            >
                              <Icon className="h-6 w-6" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-gray-800">
                                {it.header}
                              </div>
                              {it.subheader && (
                                <div className="mt-1 text-sm text-gray-600">
                                  {it.subheader}
                                </div>
                              )}
                            </div>

                            <div className="shrink-0 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">
                              {it.time}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* RSVP */}
              <div className="mt-12 rounded-2xl bg-gray-50/70 p-8">
                {!rsvpStatus ? (
                  <>
                    {deadlineDate && (
                      <div className="mb-5 text-center">
                        {!isExpired && countdown ? (
                          <div className="inline-flex flex-col items-center gap-2">
                            <p className="text-xs font-medium text-amber-800">
                              {translate(
                                "templates.baptist_golden_pigeon.rsvp_deadline_label"
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
                                "templates.baptist_golden_pigeon.rsvp_deadline_expired_title"
                              )}
                            </p>
                            <p className="text-xs text-amber-700">
                              {translate(
                                "templates.baptist_golden_pigeon.rsvp_deadline_expired_at"
                              )}{" "}
                              {format(deadlineDate, "dd.MM.yyyy, HH:mm")}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!deadlineDate || (!isExpired && countdown) ? (
                      <div className="space-y-4">
                        <p className="text-center text-sm font-medium text-gray-700">
                          {translate(
                            "templates.baptist_golden_pigeon.rsvp_request"
                          )}
                        </p>
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                          <button
                            disabled={sending}
                            onClick={onAccept}
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-8 py-3 font-bold text-white shadow-lg transition hover:shadow-xl hover:scale-105 disabled:opacity-50"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <Lucide.Check className="h-5 w-5" />
                              {translate(
                                "templates.baptist_golden_pigeon.rsvp_accept_label"
                              )}
                            </span>
                          </button>
                          <button
                            disabled={sending}
                            onClick={onDecline}
                            className="rounded-full border-2 border-gray-300 bg-white px-8 py-3 font-bold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50"
                          >
                            {translate(
                              "templates.baptist_golden_pigeon.rsvp_decline_label"
                            )}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100">
                      <Lucide.CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-800">
                        {translate(
                          "templates.baptist_golden_pigeon.rsvp_accepted_title"
                        )}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {translate(
                          "templates.baptist_golden_pigeon.rsvp_accepted_text"
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <Lucide.Frown className="h-8 w-8 text-gray-500" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                      {translate(
                        "templates.baptist_golden_pigeon.rsvp_declined_title"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-amber-100 bg-gray-50/50 px-8 py-6">
              <OliveBranchDecor />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-br from-white to-amber-100/70 border border-amber-200/50">
      <svg
        className="absolute left-3 top-3 h-8 w-8 text-amber-700 opacity-70"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 12c-2.5-1.8-9-3.4-9-10C13 1.7 11.2 1 9.5 1 5.4 1 3 4.4 3 8.5c0 3.8 2.3 6.9 5.5 8.6.6.3 1.2.6 1.8.8 1.4.6 2.9.6 4.3 0 .6-.2 1.2-.5 1.8-.8 3.2-1.7 5.5-4.8 5.5-8.6M12 22v-6" />
      </svg>
      <div className="absolute right-3 top-2 text-xl text-amber-400">✨</div>
      <div className="absolute bottom-3 right-4 h-3 w-16 rounded-full bg-amber-200/50" />
    </div>
  ),
};

/* ========= Komponenty dekoracyjne ========= */

function GoldenSparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-amber-300"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${10 + Math.random() * 6}px`,
            animation: `twinkle ${2 + Math.random() * 3}s infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          ✨
        </div>
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

function GoldenDoveHeader() {
  return (
    <div className="flex justify-center">
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber-700 drop-shadow-sm"
      >
        {/* Gołębica */}
        <path d="M22 12c-2.5-1.8-9-3.4-9-10C13 1.7 11.2 1 9.5 1 5.4 1 3 4.4 3 8.5c0 3.8 2.3 6.9 5.5 8.6.6.3 1.2.6 1.8.8 1.4.6 2.9.6 4.3 0 .6-.2 1.2-.5 1.8-.8 3.2-1.7 5.5-4.8 5.5-8.6" />
        {/* Gałązka oliwna w dziobie */}
        <path d="M12 22v-6" />
        <path d="M9 13c-1.5-1-2-2.5-2-4" />
        <path d="M15 13c1.5-1 2-2.5 2-4" />
      </svg>
    </div>
  );
}

function InfoBlock({ icon, label, value, color }) {
  const Icon = Lucide[icon];
  const colorClasses = {
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "border-amber-200",
    },
    green: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "border-emerald-200",
    },
  };
  const c = colorClasses[color] || colorClasses.amber;

  return (
    <div
      className={`w-full rounded-2xl border ${c.border} bg-white p-5 shadow-sm`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${c.bg}`}
        >
          <Icon className={`h-6 w-6 ${c.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-xs font-bold uppercase tracking-wider ${c.text} opacity-80`}
          >
            {label}
          </div>
          <div className="mt-1 font-semibold text-gray-800">{value}</div>
        </div>
      </div>
    </div>
  );
}

function OliveBranchDecor() {
  return (
    <div className="flex items-center justify-center gap-4 text-2xl">
      <svg
        width="80"
        height="24"
        viewBox="0 0 80 24"
        className="text-amber-600 opacity-70"
      >
        <path
          d="M10 12 C 20 8, 30 8, 40 12 C 50 16, 60 16, 70 12"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="15" cy="9" r="3" fill="currentColor" />
        <circle cx="25" cy="7" r="3" fill="currentColor" />
        <circle cx="35" cy="9" r="3" fill="currentColor" />
        <circle cx="45" cy="15" r="3" fill="currentColor" />
        <circle cx="55" cy="17" r="3" fill="currentColor" />
        <circle cx="65" cy="15" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}
