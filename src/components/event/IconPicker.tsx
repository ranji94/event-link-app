"use client";

import * as React from "react";
import { translate } from "@/locales";
import {
  Church,
  PartyPopper,
  GlassWater,
  Music,
  Cake,
  Heart,
  Baby,
  Gift,
  Sparkles,
  Star,
  Crown,
  Cross,
  Flower2,
  Wine,
  HandHeart,
  Sun,
} from "lucide-react";

/**
 * 🎨 Zestaw ikon do wyboru w zaproszeniach
 * Obejmuje motywy: ślub, chrzciny, urodziny (18 / 30 / 50), baby shower, komunia
 */
export const ICONS = {
  // klasyczne (pozostają)
  Church,
  PartyPopper,
  GlassWater,
  Music,
  Cake,

  // 🕊️ Ślub
  Heart, // symbol miłości
  Flower2, // dekoracje, bukiet

  // 👶 Chrzciny
  Baby, // motyw niemowlęcia
  Cross, // symbol religijny (delikatny)
  HandHeart, // rodzicielska opieka / błogosławieństwo

  // 🎂 Urodziny (18 / 30 / 50)
  Gift, // prezent
  Crown, // „królewski” akcent dla okrągłych rocznic
  Sparkles, // radość / świętowanie
  Wine, // toast dla dorosłych

  // 👼 Baby Shower
  Star, // gwiazdka / delikatny motyw nieba
  Sun, // ciepły, pozytywny klimat

  // ✝️ Pierwsza Komunia Święta
  Cross, // symbol sakramentu (można używać ponownie)
  Flower2, // symbol czystości, białe lilie itp.
  GlassWater, // symboliczny kielich (już w zestawie)
} as const;

export type IconKey = keyof typeof ICONS;

type IconPickerProps = {
  label: string;
  value?: IconKey;
  onChange: (v: IconKey) => void;
  buttonClassName?: string;
};

export function IconPicker({
  label,
  value,
  onChange,
  buttonClassName,
}: IconPickerProps) {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  const CurrentIcon: string | null = value ? ICONS[value] : null;

  function handleSelect(k: IconKey) {
    onChange(k);
    setOpen(false);
    // wróć focus na przycisk po wyborze
    requestAnimationFrame(() => btnRef.current?.focus());
  }

  return (
    <div className="relative">
      <div className="mb-1 text-xs font-medium text-gray-600">{label}</div>

      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={[
          "flex w-full items-center justify-between rounded-md border border-black/10 bg-white px-3 py-2 text-sm",
          "focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
          buttonClassName || "",
        ].join(" ")}
      >
        <span className="flex items-center gap-2">
          {CurrentIcon ? (
            <CurrentIcon className="h-4 w-4 text-emerald-600" />
          ) : (
            <span className="h-4 w-4 rounded-sm border border-dashed border-gray-300" />
          )}
          <span className="text-gray-700">
            {value ?? translate("common.select_placeholder")}
          </span>
        </span>
        <svg
          className="h-4 w-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <>
          {/* backdrop klikany zamyka */}
          <button
            aria-hidden
            className="fixed inset-0 z-40 cursor-default bg-black/10"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="absolute z-50 mt-2 w-64 rounded-xl border border-black/10 bg-white p-3 shadow-xl"
          >
            <div className="mb-2 text-xs font-medium text-gray-600">
              {translate("events.new.schedule.icon_pick")}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {(Object.keys(ICONS) as IconKey[]).map((k) => {
                const Ico = ICONS[k];
                const active = value === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => handleSelect(k)}
                    className={[
                      "flex aspect-square items-center justify-center rounded-lg border text-gray-700",
                      active
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-black/10 hover:bg-gray-50",
                    ].join(" ")}
                    aria-pressed={active}
                    title={k}
                  >
                    <Ico className="h-5 w-5" />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
