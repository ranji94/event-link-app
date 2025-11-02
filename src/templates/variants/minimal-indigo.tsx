import * as React from "react";
import type { TemplateDef } from "../types";

export const minimalIndigo: TemplateDef = {
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
        <span>{date ? new Date(date).toLocaleString() : "Data i godzina"}</span>
      </div>
      <p className="mt-4 whitespace-pre-wrap text-sm text-gray-700">
        {description || "Opis / treść zaproszenia..."}
      </p>
    </div>
  ),
};
