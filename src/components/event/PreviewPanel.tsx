"use client";
import { useMemo } from "react";
import { templates } from "@/templates/registry";
import {
  getDefaultTemplateByKind,
  getTemplateById,
} from "@/components/templates/TemplatePicker";
import { FullscreenPreview } from "@/components/templates/FullScreenPreview";
import { translate } from "@/locales";
import { useState } from "react";
import type { CreateProgramItemDto } from "@/entities/api.gen.schemas";
import { Separator } from "@/components/ui/separator";
import { EventKind } from "@/common/enum";

export function PreviewPanel({
  templateKey,
  title,
  description,
  date,
  location,
  program,
  eventKind,
  dressCode,
  rsvpDeadline,
}: {
  templateKey: string;
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  program?: CreateProgramItemDto[];
  eventKind: EventKind;
  dressCode?: string;
  rsvpDeadline?: string;
}) {
  const [fsOpen, setFsOpen] = useState(false);

  const SelectedPreview =
    useMemo(() => getTemplateById(templateKey)?.Preview, [templateKey]) ??
    getDefaultTemplateByKind(eventKind).Preview;

  return (
    <div className="-mx-[calc(50vw-50%)] w-screen overflow-hidden">
      <div className="flex items-center gap-4 py-4">
        <Separator className="flex-1" />
        <span className="text-sm font-medium text-muted-foreground">
          {translate("events.new.live_preview") ?? "Podgląd zaproszenia"}
        </span>
        <Separator className="flex-1" />
      </div>

      <div className="w-full">
        <SelectedPreview
          title={title}
          dressCode={dressCode}
          rsvpDeadline={rsvpDeadline}
          description={description}
          date={date}
          location={location}
          program={program}
        />
      </div>

      <FullscreenPreview open={fsOpen} onClose={() => setFsOpen(false)}>
        <SelectedPreview
          title={title}
          dressCode={dressCode}
          rsvpDeadline={rsvpDeadline}
          description={description}
          date={date}
          location={location}
          program={program}
        />
      </FullscreenPreview>
    </div>
  );
}
