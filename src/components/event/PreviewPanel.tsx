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
}: {
  templateKey: string;
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  program?: CreateProgramItemDto[];
}) {
  const [fsOpen, setFsOpen] = useState(false);
  const SelectedPreview =
    useMemo(() => getTemplateById(templateKey)?.Preview, [templateKey]) ??
    templates[0].Preview;

  return (
    <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">
          {translate("events.new.live_preview")}
        </h2>
        <button
          type="button"
          onClick={() => setFsOpen(true)}
          className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50"
        >
          {translate("events.new.fullscreen")}
        </button>
      </div>

      <div className="mt-4">
        <div className="rounded-2xl border border-black/5 p-4">
          <SelectedPreview
            title={title}
            description={description}
            date={date}
            location={location}
            program={program}
          />
        </div>
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
    </aside>
  );
}
