"use client";

import * as React from "react";
import { format } from "date-fns";
import { TemplateDef } from "../types";
import { pl } from "date-fns/locale";
import * as Lucide from "lucide-react";
import { translate } from "@/locales";
import { useRsvpCountdown } from "../utils/useRsvpCountdown";
import { normalizeProgram } from "../utils/program";
import { formatEventDate } from "../utils/date";

/**
 * MINIMALIST NAVY - Elegancki szablon z granatową paletą
 * - Nowoczesny, minimalistyczny design
 * - Granatowo-różowo-złota paleta kolorów
 * - Geometryczne elementy dekoracyjne
 * - Uniwersalny dla różnych okazji
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

export const minimalistNavy: TemplateDef = {
  id: "minimalist-navy",
  name: "Minimalist Navy",
  accent: "blue",
  Preview: ({
    title,
    description,
    date,
    location,
    program,
    rsvpStatus,
    sending,
    dressCode,
    rsvpDeadline,
    onAccept,
    onDecline,
    inviteeName,
  }) => {
    const titleText =
      title || translate("templates.minimalist_navy.title_fallback");
    const locationText =
      location || translate("templates.minimalist_navy.location_fallback");

    const { deadlineDate, countdown, isExpired } =
      useRsvpCountdown(rsvpDeadline);
    const isDeadlineExpired = isExpired;

    const normalizedProgram = normalizeProgram(program);

    // Formatowanie daty wydarzenia
    const dateText = date ? formatEventDate(date) : "Sobota, 14:30";

    const personalizedGreeting = inviteeName
      ? inviteeName
      : translate("templates.minimalist_navy.greeting_fallback");

    return (
      <div className="relative min-h-screen w-full bg-slate-50">
        <GeometricPattern />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 px-8 py-16 sm:px-12 sm:py-20">
              <DiamondDecor position="top-right" />
              <DiamondDecor position="bottom-left" />

              <div className="relative z-10 text-center">
                <div className="mx-auto mb-6 h-px w-32 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />

                <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  {titleText}
                </h1>

                <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
              </div>
            </div>

            <div className="px-8 py-12 sm:px-12 sm:py-16">
              <div className="mb-8 text-center">
                <p className="text-lg font-semibold text-slate-700 sm:text-xl">
                  {personalizedGreeting}
                </p>
              </div>

              <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                    <Lucide.Calendar className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {translate("templates.minimalist_navy.date_label")}
                    </div>
                    <div className="font-semibold text-slate-800">
                      {dateText}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Lucide.MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {translate("templates.minimalist_navy.location_label")}
                    </div>
                    <div className="font-semibold text-slate-800">
                      {locationText}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto max-w-2xl">
                <p className="whitespace-pre-wrap text-center leading-relaxed text-slate-600">
                  {description ||
                    translate("templates.minimalist_navy.description_fallback")}
                </p>
              </div>

              {/* DRESS CODE */}
              {dressCode && (
                <div className="mx-auto mt-10 flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white shadow-md">
                    <Lucide.Shirt className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {translate("templates.minimalist_navy.dresscode_label")}
                    </span>
                    <span className="mt-0.5 font-medium text-slate-800">
                      {dressCode}
                    </span>
                  </div>
                </div>
              )}

              {/* PROGRAM */}
              {normalizedProgram && normalizedProgram.length > 0 && (
                <div className="mx-auto mt-12 max-w-3xl">
                  <div className="mb-8 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                      {translate("templates.minimalist_navy.program_title")}
                    </h3>
                    <div className="mx-auto mt-3 h-0.5 w-16 bg-rose-400" />
                  </div>

                  <div className="space-y-4">
                    {normalizedProgram.map((it, idx) => {
                      const Icon =
                        (it.icon && Lucide[it.icon]) || Lucide.Circle;

                      return (
                        <div
                          key={idx}
                          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white hover:shadow-md"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-slate-900">
                              {it.header}
                            </div>
                            {it.subheader && (
                              <div className="mt-1 text-sm text-slate-500">
                                {it.subheader}
                              </div>
                            )}
                          </div>

                          <div className="shrink-0 rounded-lg bg-rose-100 px-3 py-1.5 text-sm font-bold text-rose-700">
                            {it.time}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* COUNTDOWN / DEADLINE INFO */}
              {deadlineDate && (
                <div className="mt-12 flex flex-col items-center gap-2 text-center">
                  {!isDeadlineExpired && countdown && (
                    <>
                      <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-100">
                        <Lucide.Clock className="h-4 w-4 text-rose-300" />
                        <span>
                          {translate(
                            "templates.minimalist_navy.countdown_prefix"
                          )}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        {countdown.label}
                      </p>
                      <p className="text-xs text-slate-400">
                        {translate(
                          "templates.minimalist_navy.countdown_until_prefix"
                        )}{" "}
                        {format(deadlineDate, "d MMMM yyyy, HH:mm", {
                          locale: pl,
                        })}
                      </p>
                    </>
                  )}

                  {isDeadlineExpired && (
                    <div className="max-w-md rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                      <div className="mb-1 flex items-center justify-center gap-2">
                        <Lucide.Clock className="h-4 w-4" />
                        <span className="font-semibold">
                          {translate(
                            "templates.minimalist_navy.deadline_expired_title"
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-rose-900/80">
                        {translate(
                          "templates.minimalist_navy.deadline_expired_subtitle"
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* RSVP */}
              <div className="mt-12 border-t border-slate-200 pt-10">
                {!rsvpStatus ? (
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button
                      disabled={sending || isDeadlineExpired}
                      onClick={onAccept}
                      className="cursor-pointer group relative overflow-hidden rounded-full bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-4 font-bold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className="relative z-10">
                        {translate("templates.minimalist_navy.rsvp_accept")}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800 opacity-0 transition group-hover:opacity-100" />
                    </button>
                    <button
                      disabled={sending || isDeadlineExpired}
                      onClick={onDecline}
                      className="cursor-pointer rounded-full border-2 border-slate-300 px-8 py-4 font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {translate("templates.minimalist_navy.rsvp_decline")}
                    </button>
                  </div>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Lucide.CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-lg font-semibold text-slate-800">
                      {translate(
                        "templates.minimalist_navy.rsvp_done_title_accept"
                      )}
                    </p>
                    <p className="text-sm text-slate-500">
                      {translate(
                        "templates.minimalist_navy.rsvp_done_sub_accept"
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                      <Lucide.XCircle className="h-8 w-8 text-amber-600" />
                    </div>
                    <p className="text-lg font-semibold text-slate-800">
                      {translate(
                        "templates.minimalist_navy.rsvp_done_title_decline"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 px-8 py-8">
              <FooterOrnament />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
      <div className="absolute left-4 top-1/2 h-6 w-20 -translate-y-1/2 rounded-full bg-white/20" />
      <div className="absolute right-4 top-4 h-2 w-2 rotate-45 bg-rose-400" />
      <div className="absolute right-8 bottom-4 h-2 w-2 rotate-45 bg-rose-400" />
    </div>
  ),
};

function GeometricPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      <svg
        className="absolute -left-40 -top-40 h-80 w-80"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />
        <circle
          cx="100"
          cy="100"
          r="40"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />
      </svg>
      <svg
        className="absolute -bottom-40 -right-40 h-80 w-80"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />
        <circle
          cx="100"
          cy="100"
          r="40"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}

function DiamondDecor({ position }) {
  const cls =
    position === "top-right"
      ? "absolute right-8 top-8"
      : "absolute bottom-8 left-8";

  return (
    <div className={cls}>
      <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-30">
        <rect
          x="20"
          y="20"
          width="20"
          height="20"
          transform="rotate(45 20 20)"
          fill="none"
          stroke="#fb7185"
          strokeWidth="1.5"
        />
        <rect
          x="20"
          y="20"
          width="12"
          height="12"
          transform="rotate(45 20 20)"
          fill="#fb7185"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

function FooterOrnament() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-300" />
      <div className="flex gap-2">
        <div className="h-1.5 w-1.5 rotate-45 bg-rose-400" />
        <div className="h-1.5 w-1.5 rotate-45 bg-slate-400" />
        <div className="h-1.5 w-1.5 rotate-45 bg-rose-400" />
      </div>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-300" />
    </div>
  );
}
