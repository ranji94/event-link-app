"use client";

import * as React from "react";
import { translate } from "@/locales";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type CookieCategories = {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
};

type CookieConsent = {
  categories: CookieCategories;
  timestamp: string;
};

const STORAGE_KEY = "cookieConsent";

export function CookieConsentBanner() {
  const [isClient, setIsClient] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [showPreferences, setShowPreferences] = React.useState(false);
  const [categories, setCategories] = React.useState<CookieCategories>({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  React.useEffect(() => {
    setIsClient(true);

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // brak zgody – pokaż baner
        setVisible(true);
        return;
      }

      const parsed = JSON.parse(raw) as CookieConsent | null;
      if (parsed && parsed.categories?.necessary) {
        setCategories(parsed.categories);
        setVisible(false);
      } else {
        setVisible(true);
      }
    } catch {
      // w razie błędu pokaż baner ponownie
      setVisible(true);
    }
  }, []);

  const saveConsent = (nextCategories: CookieCategories) => {
    const data: CookieConsent = {
      categories: nextCategories,
      timestamp: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setCategories(nextCategories);
  };

  const handleAcceptAll = () => {
    const next: CookieCategories = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    saveConsent(next);
    setVisible(false);
  };

  const handleRejectOptional = () => {
    const next: CookieCategories = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    saveConsent(next);
    setVisible(false);
  };

  const handleSavePreferences = () => {
    // upewniamy się, że "necessary" zawsze true
    const next: CookieCategories = { ...categories, necessary: true };
    saveConsent(next);
    setVisible(false);
  };

  const toggleCategory = (key: keyof CookieCategories) => {
    if (key === "necessary") return; // nie można wyłączyć
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isClient || !visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[900] flex items-end justify-center bg-background/70 backdrop-blur-sm px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="max-w-4xl w-full rounded-2xl border border-gray-200 bg-card p-4 shadow-lg sm:p-5">
        <div className="flex flex-col gap-3">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-gray-900">
              {translate("cookies.title") ??
                "Ta strona korzysta z plików cookies"}
            </h2>
            <p className="text-xs text-gray-600 sm:text-sm">
              {translate("cookies.description") ??
                "Używamy plików cookies niezbędnych do działania serwisu oraz – za Twoją zgodą – cookies analitycznych, funkcjonalnych i marketingowych. Możesz zaakceptować wszystkie, odrzucić nieobowiązkowe lub dostosować swoje ustawienia."}
            </p>

            <button
              type="button"
              className="cursor-pointer mt-1 text-xs text-indigo-600 underline-offset-2 hover:underline sm:text-xs"
              onClick={() => {
                // np. router.push("/polityka-prywatnosci");
              }}
            >
              {translate("cookies.link.privacy") ??
                "Więcej informacji w Polityce Prywatności i Polityce Cookies"}
            </button>

            {showPreferences && (
              <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-xs text-gray-700 sm:text-xs">
                <p className="mb-2 font-medium text-gray-900">
                  {translate("cookies.preferences.title") ??
                    "Dostosuj ustawienia plików cookies"}
                </p>

                <div className="space-y-2">
                  <PreferenceRow
                    label={
                      translate("cookies.category.necessary.title") ??
                      "Niezbędne"
                    }
                    description={
                      translate("cookies.category.necessary.description") ??
                      "Zapewniają podstawowe działanie serwisu. Zawsze aktywne i niewymagające zgody."
                    }
                    checked={true}
                    disabled
                    onChange={() => {}}
                  />

                  <PreferenceRow
                    label={
                      translate("cookies.category.analytics.title") ??
                      "Analityczne"
                    }
                    description={
                      translate("cookies.category.analytics.description") ??
                      "Pomagają nam zrozumieć, w jaki sposób użytkownicy korzystają z serwisu, aby móc go ulepszać."
                    }
                    checked={categories.analytics}
                    onChange={() => toggleCategory("analytics")}
                  />

                  <PreferenceRow
                    label={
                      translate("cookies.category.functional.title") ??
                      "Funkcjonalne"
                    }
                    description={
                      translate("cookies.category.functional.description") ??
                      "Pozwalają zapamiętać Twoje preferencje i personalizować działanie strony."
                    }
                    checked={categories.functional}
                    onChange={() => toggleCategory("functional")}
                  />

                  <PreferenceRow
                    label={
                      translate("cookies.category.marketing.title") ??
                      "Marketingowe"
                    }
                    description={
                      translate("cookies.category.marketing.description") ??
                      "Umożliwiają wyświetlanie treści i reklam dopasowanych do Twoich zainteresowań."
                    }
                    checked={categories.marketing}
                    onChange={() => toggleCategory("marketing")}
                  />
                </div>

                <div className="mt-3 flex flex-wrap justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    size="sm"
                    onClick={() => setShowPreferences(false)}
                  >
                    {translate("cookies.actions.closePreferences") ?? "Zamknij"}
                  </Button>
                  <Button
                    type="button"
                    className="cursor-pointer"
                    size="sm"
                    onClick={handleSavePreferences}
                  >
                    {translate("cookies.actions.savePreferences") ??
                      "Zapisz wybór"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* 🔽 PRZYCISKI GŁÓWNE – ZAWSZE POD TEKSTEM, WYRÓWNANE DO PRAWEJ */}
          <div className="mt-2 flex flex-wrap justify-end gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              size="sm"
              type="button"
              onClick={handleRejectOptional}
            >
              {translate("cookies.actions.rejectOptional") ??
                "Odrzuć nieobowiązkowe"}
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              size="sm"
              type="button"
              onClick={() => setShowPreferences((v) => !v)}
            >
              {translate("cookies.actions.customize") ?? "Dostosuj ustawienia"}
            </Button>
            <Button
              className="cursor-pointer"
              size="sm"
              type="button"
              onClick={handleAcceptAll}
            >
              {translate("cookies.actions.acceptAll") ?? "Akceptuję wszystkie"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type PreferenceRowProps = {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
};

function PreferenceRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: PreferenceRowProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-900">{label}</p>
        <p className="text-[11px] text-gray-600">{description}</p>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={disabled ? undefined : () => onChange()}
      />
    </div>
  );
}
