"use client";

import { useMemo } from "react";
import { TemplateCard } from "./TemplateCard";
import {
  getTemplatesByEventKind,
  templates,
  type TemplateDef,
} from "@/templates/registry";
import { EventKind } from "@/common/enum";

export function TemplatePicker({
  eventKind,
  value,
  onChange,
}: {
  eventKind: EventKind;
  value: string | undefined;
  onChange: (id: string) => void;
}) {
  const availableTemplates = useMemo(
    () => getTemplatesByEventKind(eventKind),
    []
  );
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {availableTemplates.map((tpl) => (
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

export function getDefaultTemplateByKind(eventKind: EventKind): TemplateDef {
  const availableTemplates = getTemplatesByEventKind(eventKind);

  return availableTemplates[0];
}
