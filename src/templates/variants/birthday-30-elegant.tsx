import * as React from "react";
import { format } from "date-fns";
import { TemplateDef } from "../types";
import { pl } from "date-fns/locale";
import * as Lucide from "lucide-react";
import { translate } from "@/locales";
import { useRsvpCountdown } from "../utils/useRsvpCountdown";

export const birthday30Elegant: TemplateDef = {
  id: "birthday-30-elegant",
  name: "30 Urodziny — Elegancja",
  accent: "slate",
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
      title || translate("templates.birthday_30_elegant.title_default");
    const locationText =
      location || translate("templates.birthday_30_elegant.location_default");
    const dateText = date
      ? format(new Date(date), "d MMMM yyyy, 'godzina' HH:mm", { locale: pl })
      : translate("templates.birthday_30_elegant.date_fallback");

    const personalizedGreeting = inviteeName
      ? translate("templates.birthday_30_elegant.greeting_personalized", {
          name: inviteeName,
        })
      : translate("templates.birthday_30_elegant.greeting_default");

    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);
    return (
      <div className="relative min-h-[80vh] w-full overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/20 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:py-16">
          <div className="border border-slate-200 bg-white p-10 shadow-xl">
            <div className="border-b-2 border-amber-400 pb-6 text-center">
              <div className="mb-4 text-6xl font-light text-slate-800">30</div>
              <h1 className="font-serif text-3xl font-light tracking-wide text-slate-900 sm:text-4xl">
                {titleText}
              </h1>
              <p className="mt-3 text-sm uppercase tracking-widest text-slate-600">
                {locationText}
              </p>
              <p className="mt-1 text-xs text-slate-500">{dateText}</p>
              {dressCode && (
                <p className="mt-2 text-xs uppercase tracking-widest text-slate-500">
                  {translate("templates.birthday_30_elegant.dress_code_label")}{" "}
                  <span className="font-semibold normal-case text-slate-700">
                    {dressCode}
                  </span>
                </p>
              )}
            </div>

            <div className="mx-auto mt-8 max-w-xl text-slate-700">
              <p className="text-center italic text-slate-600">
                {personalizedGreeting}
              </p>
              <p className="mt-4 whitespace-pre-wrap text-center leading-relaxed">
                {description ||
                  translate(
                    "templates.birthday_30_elegant.description_default"
                  )}
              </p>
            </div>

            {program && program.length > 0 && (
              <div className="mx-auto mt-10">
                <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {translate("templates.birthday_30_elegant.program_title")}
                </h3>
                <div className="space-y-4">
                  {program
                    .slice()
                    .map((it, idx) => ({
                      ...it,
                      _pos: typeof it.position === "number" ? it.position : idx,
                    }))
                    .sort((a, b) => a._pos - b._pos)
                    .map((it, idx) => {
                      const Icon =
                        (it.icon && (Lucide as any)[it.icon]) || Minus;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 border-l-2 border-amber-400 pl-4"
                        >
                          <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-amber-600" />
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">
                              {it.header}
                            </div>
                            {it.subheader && (
                              <div className="text-sm text-slate-600">
                                {it.subheader}
                              </div>
                            )}
                          </div>
                          <div className="text-sm font-medium text-slate-700">
                            {it.time}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {!rsvpStatus ? (
              <>
                {deadlineDate && (
                  <div className="mb-4 text-center">
                    {!isExpired && countdown ? (
                      <div className="inline-flex flex-col items-center gap-2">
                        <p className="text-xs font-medium text-slate-700">
                          {translate(
                            "templates.birthday_30_elegant.rsvp_deadline_label"
                          )}
                        </p>
                        <div className="rounded-full border border-amber-400/60 bg-amber-50 px-5 py-2 text-sm font-semibold text-slate-900">
                          {countdown}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <p className="text-sm font-semibold text-slate-900">
                          {translate(
                            "templates.birthday_30_elegant.rsvp_deadline_expired_title"
                          )}
                        </p>
                        <p className="text-xs text-slate-600">
                          {translate(
                            "templates.birthday_30_elegant.rsvp_deadline_expired_at"
                          )}{" "}
                          {format(deadlineDate, "dd.MM.yyyy, HH:mm")}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {!deadlineDate || (!isExpired && countdown) ? (
                  <div className="flex flex-col gap-3 sm:flex-row justify-center">
                    <button
                      disabled={sending}
                      onClick={onAccept}
                      className="cursor-pointer border-2 border-slate-900 bg-slate-900 px-8 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
                    >
                      {translate(
                        "templates.birthday_30_elegant.rsvp_accept_label"
                      )}
                    </button>
                    <button
                      disabled={sending}
                      onClick={onDecline}
                      className="cursor-pointer border-2 border-slate-300 px-8 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                      {translate(
                        "templates.birthday_30_elegant.rsvp_decline_label"
                      )}
                    </button>
                  </div>
                ) : null}
              </>
            ) : rsvpStatus === "ACCEPTED" ? (
              <div className="mt-10 text-center font-medium text-slate-700">
                <Lucide.CheckCircle2 className="mx-auto mb-2 h-7 w-7" />
                {translate("templates.birthday_30_elegant.rsvp_accepted_text")}
              </div>
            ) : (
              <div className="mt-10 text-center font-medium text-slate-500">
                <Lucide.XCircle className="mx-auto mb-2 h-7 w-7" />
                {translate("templates.birthday_30_elegant.rsvp_declined_text")}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-white ring-1 ring-inset ring-slate-200">
      <div className="absolute left-4 top-4 text-2xl font-light text-slate-700">
        30
      </div>
      <div className="absolute bottom-3 right-3 h-1 w-16 bg-amber-400" />
    </div>
  ),
};
