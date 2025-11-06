import type { TemplateDef } from "../types";
import * as Lucide from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

/**
 * BIRTHDAY – Pastel & Confetti
 * - Jasne tło z konfetti
 * - Pastelowe barwy (róż, błękit, złamana biel)
 * - Uniwersalny, radosny styl (urodziny, baby shower, komunia)
 */
export const birthdayPastelConfetti: TemplateDef = {
  id: "birthday-pastel-confetti",
  name: "Birthday — Pastel & Confetti",
  accent: "pink",
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
  }) => {
    const titleText = title || "Zaproszenie";
    const locationText = location || "Miejsce wydarzenia";
    const dateText = date
      ? format(new Date(date), "d MMMM yyyy, 'o godzinie' HH:mm", {
          locale: pl,
        })
      : "Sobota, 18:00";

    const greeting = inviteeName
      ? `Drogi ${inviteeName}, zapraszamy Cię serdecznie!`
      : "Serdecznie zapraszamy!";

    return (
      <div className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-pink-50 via-white to-sky-50">
        <ConfettiDecor />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <div className="rounded-2xl bg-white/90 p-8 shadow-xl ring-1 ring-pink-100 backdrop-blur">
            {/* HEADER */}
            <div className="text-center">
              <div className="mx-auto mb-3 h-1 w-24 rounded-full bg-gradient-to-r from-pink-300 via-sky-300 to-pink-300" />
              <h1 className="font-serif text-3xl font-extrabold text-gray-900 sm:text-5xl">
                {titleText}
              </h1>
              <p className="mt-2 text-sm text-pink-600">{locationText}</p>
              <p className="text-xs text-gray-500">{dateText}</p>
            </div>

            {/* CONTENT */}
            <div className="prose prose-pink mx-auto mt-8 max-w-2xl text-gray-700 text-center prose-p:leading-relaxed">
              <p className="italic text-pink-700 font-medium">{greeting}</p>
              <p className="mt-3 whitespace-pre-wrap">
                {description ||
                  "Z radością zapraszamy na wspólne świętowanie tego wyjątkowego dnia! Czeka nas wiele uśmiechu, słodkości i dobrej zabawy."}
              </p>
            </div>

            {/* PROGRAM */}
            {program && program.length > 0 && (
              <div className="mx-auto mt-10 max-w-3xl">
                <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-gray-600">
                  Plan dnia
                </h3>

                <ol className="relative ">
                  {program
                    .slice()
                    .map((it, idx) => ({
                      ...it,
                      _pos: typeof it.position === "number" ? it.position : idx,
                    }))
                    .sort((a, b) => a._pos - b._pos)
                    .map((it, idx, arr) => {
                      const Icon =
                        (it.icon && (Lucide as any)[it.icon]) || Lucide.Star;
                      const isFirst = idx === 0;
                      const isLast = idx === arr.length - 1;

                      return (
                        <li
                          key={idx}
                          className="relative grid grid-cols-[1fr_auto] gap-4 pl-12 py-2"
                        >
                          {!isFirst && (
                            <span
                              aria-hidden
                              className="absolute left-[18px] w-px bg-pink-200"
                              style={{ top: 0, bottom: "50%" }}
                            />
                          )}
                          {!isLast && (
                            <span
                              aria-hidden
                              className="absolute left-[18px] w-px bg-pink-200"
                              style={{ top: "50%", bottom: 0 }}
                            />
                          )}
                          <span className="absolute left-[18px] top-1/2 -translate-y-1/2 -translate-x-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 ring-1 ring-pink-200">
                            <Icon className="h-4 w-4 text-pink-700" />
                          </span>

                          <div>
                            <div className="font-semibold text-gray-900">
                              {it.header}
                            </div>
                            {it.subheader && (
                              <div className="text-sm text-gray-500">
                                {it.subheader}
                              </div>
                            )}
                          </div>

                          <div className="text-right text-sm font-semibold text-gray-700">
                            {it.time}
                          </div>
                        </li>
                      );
                    })}
                </ol>
              </div>
            )}

            {/* RSVP */}
            {!rsvpStatus ? (
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  disabled={sending}
                  onClick={onAccept}
                  className="rounded-xl bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 font-semibold transition"
                >
                  Będę obecny/a
                </button>
                <button
                  disabled={sending}
                  onClick={onDecline}
                  className="rounded-xl border border-sky-300 text-sky-600 hover:bg-sky-50 px-6 py-3 font-semibold transition"
                >
                  Nie mogę przyjść
                </button>
              </div>
            ) : rsvpStatus === "ACCEPTED" ? (
              <div className="mt-10 text-center text-pink-700 font-medium">
                <Lucide.Heart className="mx-auto mb-2 h-8 w-8" />
                Super! Do zobaczenia!
              </div>
            ) : (
              <div className="mt-10 text-center text-sky-600 font-medium">
                <Lucide.SadFace className="mx-auto mb-2 h-8 w-8" />
                Szkoda, że się nie spotkamy.
              </div>
            )}
            <ConfettiLine />
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl ring-1 ring-inset ring-black/5">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-sky-50" />
      <div className="absolute left-3 top-3 h-3 w-10 rounded-full bg-pink-300/70" />
      <div className="absolute right-3 bottom-3 h-3 w-10 rounded-full bg-sky-200/70" />
      <div className="absolute inset-x-2 top-1/2 h-3 rounded bg-white/80 ring-1 ring-black/5" />
    </div>
  ),
};

/* ========= Dekoracje ========= */

function ConfettiDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-50">
      {Array.from({ length: 40 }).map((_, i) => {
        const size = Math.random() * 6 + 2;
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const color = ["#f9a8d4", "#a5f3fc", "#fde68a", "#d8b4fe"][
          i % 4
        ] as string;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: size,
              height: size,
              left,
              top,
            }}
          />
        );
      })}
    </div>
  );
}

function ConfettiLine() {
  return (
    <div className="mt-5 flex items-center justify-center">
      <svg width="180" height="20" viewBox="0 0 180 20">
        <path
          d="M10 10 Q 30 0, 50 10 T 90 10 T 130 10 T 170 10"
          stroke="#f472b6"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="90" cy="10" r="3" fill="#a5f3fc" />
      </svg>
    </div>
  );
}
