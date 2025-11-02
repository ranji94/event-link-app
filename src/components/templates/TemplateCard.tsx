"use client";

import type { TemplateDef } from "@/templates/registry";
import React from "react";

function MiniPreviewBase({ tpl }: { tpl: TemplateDef }) {
  if (tpl.Thumb) return <tpl.Thumb />;

  const sample = {
    title: "Tytuł wydarzenia",
    description: "Treść zaproszenia…",
    date: new Date().toISOString(),
    location: "Miejsce wydarzenia",
  };

  return (
    <div className="relative h-24 w-full overflow-hidden rounded-xl ring-1 ring-inset ring-black/5">
      <div
        className="origin-top-left pointer-events-none select-none"
        style={{
          transform: "scale(0.45)",
          transformOrigin: "top left",
          width: 600,
        }}
      >
        {tpl.Preview(sample)}
      </div>
    </div>
  );
}

// memo z prostym porównaniem — render ponownie tylko gdy zmieni się tpl.id
const MiniPreview = React.memo(
  MiniPreviewBase,
  (prev, next) => prev.tpl.id === next.tpl.id
);

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
        "group w-full rounded-2xl border bg-white p-3 text-left shadow-sm transition cursor-pointer",
        selected
          ? "border-black/10 ring-2 ring-offset-2 ring-indigo-500"
          : "border-black/5 hover:shadow",
      ].join(" ")}
      aria-pressed={selected}
      aria-label={`Wybierz szablon ${tpl.name}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="truncate text-sm font-medium">{tpl.name}</div>
        <span className={`h-3 w-3 rounded-full bg-${tpl.accent}-500`} />
      </div>

      <MiniPreview tpl={tpl} />
    </button>
  );
}
