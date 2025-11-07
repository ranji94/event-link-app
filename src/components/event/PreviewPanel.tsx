"use client";
import { useMemo } from "react";
import { templates } from "@/templates/registry";
import { getTemplateById } from "@/components/templates/TemplatePicker";
import { FullscreenPreview } from "@/components/templates/FullScreenPreview";
import { translate } from "@/locales";
import { useState } from "react";
import type { CreateProgramItemDto } from "@/entities/api.gen.schemas";

export function PreviewPanel({
  templateKey,
  title,
  description,
  date,
  location,
  program,
  className,
}: {
  templateKey: string;
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  program?: CreateProgramItemDto[];
  className?: string;
}) {
  const [fsOpen, setFsOpen] = useState(false);

  const SelectedPreview =
    useMemo(() => getTemplateById(templateKey)?.Preview, [templateKey]) ??
    templates[0].Preview;

  return (
    <div className="-mx-[calc(50vw-50%)] w-screen overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-xs uppercase tracking-wide text-gray-600">
          Podgląd na żywo
        </span>
        <button
          onClick={() => setFsOpen(true)}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50"
        >
          Pełny ekran
        </button>
      </div>

      {/* Właściwy szablon — zero ramek, zero paddingu */}
      <div className="w-full">
        <SelectedPreview
          title={title}
          description={description}
          date={date}
          location={location}
          program={program}
        />
      </div>

      <FullscreenPreview open={fsOpen} onClose={() => setFsOpen(false)}>
        <SelectedPreview
          title={title}
          description={description}
          date={date}
          location={location}
          program={program}
        />
      </FullscreenPreview>
    </div>
  );
}
