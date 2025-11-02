import * as React from "react";

export type TemplateDef = {
  id: string;
  name: string;
  accent: string; // tailwind color name
  // Komponent podglądu: renderuje „zaproszenie” z danych
  Preview: (props: {
    title: string;
    description?: string;
    date?: string; // ISO
    location?: string;
  }) => React.ReactNode;
  Thumb?: () => React.ReactNode;
};

export const templates: TemplateDef[] = [
  {
    id: "classic-rose",
    name: "Classic Rose",
    accent: "rose",
    Preview: ({ title, description, date, location }) => (
      <div className="mx-auto max-w-3xl">
        <div className="w-full rounded-2xl border border-rose-200 bg-rose-50 p-8 text-rose-900 shadow-sm">
          <h3 className="text-3xl font-extrabold tracking-tight">
            {title || "Tytuł wydarzenia"}
          </h3>
          <p className="mt-2 text-base opacity-80">
            {location || "Miejsce wydarzenia"}
          </p>
          <p className="text-sm opacity-70">
            {date ? new Date(date).toLocaleString() : "Data i godzina"}
          </p>
          <hr className="my-6 border-rose-200" />
          <div className="prose prose-rose max-w-none prose-p:leading-relaxed">
            <p className="whitespace-pre-wrap">
              {description || "Treść zaproszenia..."}
            </p>
          </div>
        </div>
      </div>
    ),
    Thumb: () => (
      <div className="h-20 w-full rounded-xl border border-rose-200 bg-rose-50" />
    ),
  },
  {
    id: "minimal-indigo",
    name: "Minimal Indigo",
    accent: "indigo",
    Preview: ({ title, description, date, location }) => (
      <div className="w-full rounded-2xl bg-white p-6 text-gray-900 shadow ring-1 ring-inset ring-indigo-200/60">
        <h3 className="text-xl font-semibold">{title || "Tytuł wydarzenia"}</h3>
        <div className="mt-2 text-xs text-gray-600">
          <span className="font-medium text-indigo-700">
            {location || "Miejsce"}
          </span>{" "}
          ·{" "}
          <span>
            {date ? new Date(date).toLocaleString() : "Data i godzina"}
          </span>
        </div>
        <p className="mt-4 whitespace-pre-wrap text-sm text-gray-700">
          {description || "Opis / treść zaproszenia..."}
        </p>
      </div>
    ),
  },
  {
    id: "dark-elegant",
    name: "Dark Elegant",
    accent: "emerald",
    Preview: ({ title, description, date, location }) => (
      <div className="w-full rounded-2xl bg-gray-900 p-6 text-gray-100 shadow">
        <h3 className="text-2xl font-bold text-emerald-400">
          {title || "Tytuł wydarzenia"}
        </h3>
        <p className="mt-1 text-sm text-gray-300">{location || "Miejsce"}</p>
        <p className="text-sm text-gray-400">
          {date ? new Date(date).toLocaleString() : "Data i godzina"}
        </p>
        <div className="mt-4 rounded-lg bg-gray-800/70 p-4 text-sm leading-relaxed">
          {description || "Opis / treść zaproszenia..."}
        </div>
      </div>
    ),
  },
];
