import * as React from "react";
import type { TemplateDef } from "../types";

export const darkElegant: TemplateDef = {
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
};
