"use client";

import type { TemplateDef } from "@/templates/registry";

export function TemplateCard({
  tpl,
  selected,
  onSelect,
}: {
  tpl: TemplateDef;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "group w-full rounded-2xl border bg-white p-3 text-left shadow-sm transition",
        selected
          ? "border-black/10 ring-2 ring-offset-2 ring-indigo-500"
          : "border-black/5 hover:shadow",
      ].join(" ")}
      aria-pressed={selected}
      aria-label={`Wybierz szablon ${tpl.name}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium">{tpl.name}</div>
        <span className={`h-3 w-3 rounded-full bg-${tpl.accent}-500`} />
      </div>
      <div className="pointer-events-none select-none">
        {/* Placeholder mini-podglądu (nie renderujemy pełnego Preview dla wydajności) */}
        <div className="h-20 w-full rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 ring-1 ring-inset ring-black/5" />
      </div>
    </button>
  );
}
