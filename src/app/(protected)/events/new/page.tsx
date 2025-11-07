"use client";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  CreateEventDto,
  CreateProgramItemDto,
} from "@/entities/api.gen.schemas";
import { useEvents } from "@/lib/events/use-events";
import { EventKind } from "@/common/enum";
import { useConfirm } from "@/components/common/confirm/confirm-provider";
import { getNewEventTexts } from "@/lib/events/title-placeholder";
import { useProgramBuilder } from "@/lib/events/program/use-program-builder";
import { EventForm } from "@/components/event/form/EventForm";
import { useEventForm } from "@/components/event/form/useEventForm";
import { PreviewPanel } from "@/components/event/PreviewPanel";
import { toIsoFromDatetimeLocal } from "@/common/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function NewEventPage() {
  const router = useRouter();
  const params = useSearchParams();
  const kindParam = (params.get("kind") as EventKind) || EventKind.WEDDING;

  const { create, isCreating, createError } = useEvents();
  const confirm = useConfirm();

  const program = useProgramBuilder([] as CreateProgramItemDto[]);

  const form = useEventForm({ templateKey: undefined as any });
  const current = form.watch();

  const { titlePlaceholder, pageTitle } = useMemo(
    () => getNewEventTexts(kindParam),
    [kindParam]
  );

  async function onSubmit(values: any) {
    const payload: CreateEventDto = {
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      date: toIsoFromDatetimeLocal(values.datetime),
      location: values.location?.trim() || undefined,
      kind: kindParam,
      templateKey: values.templateKey,
    };

    const res = await create(payload);
    if (res.ok) {
      const id = (res.data as any)?.id;
      if (id) {
        await program.saveBulk(id);
        router.replace(`/events/${id}`);
        return;
      }
      router.replace("/events");
    } else {
      alert(res.message);
    }
  }

  async function onCancel() {
    const yes = await confirm({
      title: "Uwaga",
      description: <div>Utracisz wprowadzone dane.</div>,
      confirmText: "Usuń",
      cancelText: "Anuluj",
      danger: true,
    });
    if (yes) router.replace("/");
  }

  return (
    <EventForm
      form={form}
      builder={program}
      onChangeTemplate={() => {}}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title={pageTitle}
      subtitle={"Wprowadź podstawowe informacje o wydarzeniu"}
      submitLabel={"Utwórz wydarzenie"}
      isSubmitting={isCreating}
      errorMessage={createError}
      placeholderTitle={titlePlaceholder}
      renderSchedule={(slot) => slot}
      right={
        <PreviewPanel
          templateKey={current.templateKey}
          title={current.title}
          description={current.description}
          date={toIsoFromDatetimeLocal(current.datetime)}
          location={current.location}
          program={program.items}
        />
      }
    />
  );
}
