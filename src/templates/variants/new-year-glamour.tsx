import * as Lucide from "lucide-react";
import { TemplateDef } from "../types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { translate } from "@/locales";

export const newYearGlamour: TemplateDef = {
  id: "new-year-glamour",
  name: "New Year's Eve Glamour",
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
  }) => {
    const titleText = title || "Sylwester 2025";
    const locationText = location || "Miejsce imprezy";
    const dateText = date
      ? format(new Date(date), "d MMMM yyyy, 'godzina' HH:mm", { locale: pl })
      : "";
    const personalizedGreeting = inviteeName
      ? `${inviteeName}, ${translate(
          "templates.new_year_glamour.greeting_personalized"
        )}`
      : translate("templates.new_year_glamour.greeting");

    return (
      <div className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 pb-[env(safe-area-inset-bottom)]">
        <div className="block">
          <Fireworks />
        </div>
        <div className="block">
          <ConfettiRain />
        </div>
        <SparklesBg />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-900 to-black shadow-2xl ring-1 ring-amber-500/20">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-900/20 via-transparent to-amber-900/20 px-5 py-10 text-center sm:px-8 sm:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_55%)]" />
              <div className="mx-auto max-w-sm sm:max-w-none">
                <ClockDecor />
              </div>

              <div className="relative z-10 mt-6 sm:mt-8">
                <div className="mx-auto mb-4 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4">
                  <div className="h-px w-14 bg-gradient-to-r from-transparent via-amber-400 to-transparent sm:w-20" />
                  <Sparkle />
                  <div className="h-px w-14 bg-gradient-to-r from-transparent via-amber-400 to-transparent sm:w-20" />
                </div>

                <h1 className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text font-serif text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                  {titleText}
                </h1>

                <p className="mt-3 text-base font-semibold text-amber-100 sm:mt-4 sm:text-xl">
                  🎊 {translate("templates.new_year_glamour.undertitle")} 🎊
                </p>
              </div>
            </div>

            {/* Treść */}
            <div className="px-4 py-8 sm:px-8 sm:py-12">
              {/* Powitanie */}
              <div className="mb-6 text-center sm:mb-8">
                <p className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                  {personalizedGreeting}
                </p>
              </div>

              {/* Info karty */}
              <div className="mb-8 grid gap-4 sm:mb-10 sm:grid-cols-2 sm:gap-6">
                <GlamourCard
                  icon="Clock"
                  label="Rozpoczęcie"
                  value={dateText}
                  gradient="from-amber-500 to-yellow-600"
                />
                <GlamourCard
                  icon="MapPin"
                  label="Lokalizacja"
                  value={locationText}
                  gradient="from-yellow-500 to-amber-600"
                />
              </div>

              {/* Opis */}
              <div className="mx-auto max-w-2xl rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 to-transparent p-5 sm:rounded-2xl sm:p-8">
                <p className="whitespace-pre-wrap text-center text-sm leading-relaxed text-amber-50 sm:text-base">
                  {description ||
                    "Zapraszamy na niezapomnianą Sylwestrową Noc! Czeka na nas szampan, doskonała muzyka, taniec do białego rana i toast o północy. Ubierz się elegancko i przygotuj na noc pełną blasku i dobrej zabawy!"}
                </p>
              </div>

              {/* Program */}
              {program && program.length > 0 && (
                <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
                  <div className="mb-5 text-center sm:mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300 sm:text-sm">
                      ✨
                      {translate(
                        "templates.new_year_glamour.program_of_the_night"
                      )}
                      ✨
                    </h3>
                    <div className="mx-auto mt-3 h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent sm:w-24" />
                  </div>

                  <div className="space-y-3 sm:space-y-4">
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
                          (it.icon && (Lucide as any)[it.icon]) ||
                          Lucide.Sparkles;

                        return (
                          <div
                            key={idx}
                            className="group relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 to-yellow-950/40 p-4 backdrop-blur-sm transition hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-500/20 sm:rounded-2xl sm:p-6"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 transition group-hover:opacity-100" />
                            <div className="relative flex items-start gap-3 sm:items-center sm:gap-4">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 shadow-lg shadow-amber-500/30 sm:h-14 sm:w-14">
                                <Icon className="h-6 w-6 text-black sm:h-7 sm:w-7" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-base font-bold text-amber-50 sm:text-lg">
                                  {it.header}
                                </div>
                                {it.subheader && (
                                  <div className="mt-1 line-clamp-2 text-xs text-amber-200/70 sm:text-sm">
                                    {it.subheader}
                                  </div>
                                )}
                              </div>
                              <div className="shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 px-3 py-1.5 text-xs font-extrabold text-black shadow-lg sm:px-5 sm:py-2 sm:text-sm whitespace-nowrap">
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
              <div className="mt-10 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-yellow-950/40 p-5 backdrop-blur-sm sm:mt-12 sm:rounded-3xl sm:p-8">
                {!rsvpStatus ? (
                  <div className="space-y-5 sm:space-y-6">
                    <p className="text-center text-xs font-medium text-amber-200 sm:text-sm">
                      {translate(
                        "templates.new_year_glamour.presence_agreement"
                      )}{" "}
                      🥂
                    </p>
                    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                      <button
                        disabled={sending}
                        onClick={onAccept}
                        className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 px-6 py-4 text-base font-black text-black shadow-2xl transition hover:shadow-amber-500/50 disabled:opacity-50 sm:w-auto sm:px-10 sm:py-5"
                      >
                        <span className="relative z-10 inline-flex items-center gap-2">
                          <Lucide.Sparkles className="h-5 w-5" />
                          {translate("templates.new_year_glamour.accepted")}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 transition group-hover:opacity-100" />
                      </button>
                      <button
                        disabled={sending}
                        onClick={onDecline}
                        className="w-full rounded-full border-2 border-amber-600 bg-black/50 px-6 py-4 text-base font-bold text-amber-200 transition hover:border-amber-500 hover:bg-black/70 disabled:opacity-50 sm:w-auto sm:px-10 sm:py-5"
                      >
                        {translate("templates.new_year_glamour.declined")}
                      </button>
                    </div>
                  </div>
                ) : rsvpStatus === "ACCEPTED" ? (
                  <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping rounded-full bg-amber-400/50 [@media(prefers-reduced-motion:reduce)]:animate-none" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 shadow-2xl shadow-amber-500/50 sm:h-24 sm:w-24">
                        <Lucide.PartyPopper className="h-10 w-10 text-black sm:h-12 sm:w-12" />
                      </div>
                    </div>
                    <div>
                      <p className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-xl font-black text-transparent sm:text-2xl">
                        {translate("templates.new_year_glamour.wonderful")} 🎉
                      </p>
                      <p className="mt-1 text-sm text-amber-200 sm:mt-2">
                        {translate("templates.new_year_glamour.see_you")}
                      </p>
                    </div>
                    <ChampagneGlasses />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-600/30 bg-gray-800 sm:h-20 sm:w-20">
                      <Lucide.CloudOff className="h-8 w-8 text-amber-600/50 sm:h-10 sm:w-10" />
                    </div>
                    <p className="text-base font-semibold text-amber-200 sm:text-lg">
                      {translate(
                        "templates.new_year_glamour.declined_description"
                      )}
                      🥺
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-amber-500/20 bg-black/50 px-5 py-5 sm:px-8 sm:py-6">
              <FooterCountdown />
            </div>
          </div>
        </div>
      </div>
    );
  },
  Thumb: () => (
    <div className="relative h-20 w-full overflow-hidden rounded-xl bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.3),transparent_50%)]" />
      <div className="absolute left-3 top-3 text-2xl">🎊</div>
      <div className="absolute right-3 top-2 text-xl">✨</div>
      <div className="absolute bottom-3 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500" />
      <div className="absolute right-4 bottom-3 text-lg">🥂</div>
    </div>
  ),
};

function Fireworks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
            animation: `firework ${2 + Math.random()}s ease-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="2" fill="#fbbf24" opacity="0.8" />
            {[...Array(8)].map((_, j) => {
              const angle = (j * Math.PI * 2) / 8;
              return (
                <line
                  key={j}
                  x1="30"
                  y1="30"
                  x2={30 + Math.cos(angle) * 25}
                  y2={30 + Math.sin(angle) * 25}
                  stroke="#fbbf24"
                  strokeWidth="2"
                  opacity="0.6"
                />
              );
            })}
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes firework {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: firework"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function ConfettiRain() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute h-2 w-1 animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            backgroundColor: ["#fbbf24", "#facc15", "#eab308", "#f59e0b"][
              Math.floor(Math.random() * 4)
            ],
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            opacity: 0.6,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to { transform: translateY(100vh) rotate(360deg); }
        }
        .animate-fall { animation: fall linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-fall { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function SparklesBg() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-amber-300"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${1 + Math.random() * 2}s infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: twinkle"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function ClockDecor() {
  return (
    <div className="flex justify-center">
      <svg
        width="110"
        height="110"
        viewBox="0 0 120 120"
        className="drop-shadow-2xl sm:h-[120px] sm:w-[120px]"
      >
        <defs>
          <linearGradient id="clockGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="url(#clockGradient)"
          opacity="0.9"
        />
        <circle cx="60" cy="60" r="45" fill="#000" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = 60 + Math.cos(angle) * 38;
          const y1 = 60 + Math.sin(angle) * 38;
          const x2 = 60 + Math.cos(angle) * 42;
          const y2 = 60 + Math.sin(angle) * 42;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#fbbf24"
              strokeWidth="2"
            />
          );
        })}
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="30"
          stroke="#fbbf24"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="60"
          y1="60"
          x2="75"
          y2="65"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="60" cy="60" r="4" fill="#fbbf24" />
      </svg>
    </div>
  );
}

function Sparkle() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="text-amber-400 sm:h-6 sm:w-6"
    >
      <path
        d="M12 0l2.5 7.5L22 12l-7.5 2.5L12 24l-2.5-7.5L2 12l7.5-2.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function GlamourCard({
  icon,
  label,
  value,
  gradient,
}: {
  icon: keyof typeof Lucide | string;
  label: string;
  value: string;
  gradient: string;
}) {
  const Icon = (Lucide as any)[icon] || Lucide.Sparkles;
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-br ${gradient} p-4 shadow-xl transition hover:shadow-2xl hover:shadow-amber-500/30 sm:rounded-2xl sm:p-6`}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative flex items-center gap-3 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/50 shadow-lg sm:h-16 sm:w-16">
          <Icon className="h-6 w-6 text-amber-300 sm:h-8 sm:w-8" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 sm:text-xs">
            {label}
          </div>
          <div className="mt-1 truncate text-sm font-bold text-white sm:text-lg">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChampagneGlasses() {
  return (
    <div className="mt-3 flex gap-3 sm:mt-4 sm:gap-4">
      {[0, 1].map((i) => (
        <svg
          key={i}
          width="36"
          height="54"
          viewBox="0 0 40 60"
          className="animate-bounce [@media(prefers-reduced-motion:reduce)]:animate-none"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          <path
            d="M10 10 L15 35 L15 45 L10 45 L10 50 L30 50 L30 45 L25 45 L25 35 L30 10 Z"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          <path d="M10 10 L15 30 L25 30 L30 10" fill="#fef3c7" opacity="0.6" />
          <ellipse
            cx="20"
            cy="10"
            rx="10"
            ry="3"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
          />
        </svg>
      ))}
    </div>
  );
}

function FooterCountdown() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="text-3xl sm:text-4xl">🎆</div>
        <div className="text-xs font-bold uppercase tracking-widest text-amber-400 sm:text-sm">
          {translate("templates.new_year_glamour.footer_countdown_description")}
        </div>
        <div className="text-3xl sm:text-4xl">🎇</div>
      </div>
    </div>
  );
}
