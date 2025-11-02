import * as React from "react";
import type { TemplateDef } from "../types";

export const classicRose: TemplateDef = {
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
};
