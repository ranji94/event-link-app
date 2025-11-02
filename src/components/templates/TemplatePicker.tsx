"use client";

import { useMemo } from "react";
import { TemplateCard } from "./TemplateCard";
import { templates, type TemplateDef } from "@/templates/registry";

export function TemplatePicker({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (id: string) => void;
}) {
  const all = useMemo(() => templates, []);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {all.map((tpl) => (
        <TemplateCard
          key={tpl.id}
          tpl={tpl}
          selected={tpl.id === value}
          onSelect={() => onChange(tpl.id)}
        />
      ))}
    </div>
  );
}

export function getTemplateById(id?: string): TemplateDef | undefined {
  return templates.find((t) => t.id === id);
}
