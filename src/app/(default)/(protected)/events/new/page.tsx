"use client";

import { Suspense, useMemo } from "react";
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
import { translate } from "@/locales";

export default function NewEventPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm text-muted-foreground">
          {translate("common.loading")}
        </div>
      }
    >
      <NewEventPageInner />
    </Suspense>
  );
}

function NewEventPageInner() {
  const router = useRouter();
  const params = useSearchParams();

  const kindParamRaw = params.get("kind");

  const kindParam = useMemo(() => {
    if (!kindParamRaw) {
      return EventKind.OTHER;
    }

    const isValid = Object.values(EventKind).includes(
      kindParamRaw as EventKind
    );

    return isValid ? (kindParamRaw as EventKind) : null;
  }, [kindParamRaw]);

  if (kindParam === null) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg font-semibold">
          {translate("events.new.not_found.this_type_of_event") + " "}
          {kindParamRaw && (
            <span className="font-mono text-sm">({kindParamRaw}) </span>
          )}
          {translate("events.new.not_found.not_exists")}
        </p>
        <p className="text-sm text-muted-foreground">
          {translate("events.new.not_found.make_sure_youre_using_correct_link")}
        </p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="cursor-pointer mt-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          {translate("events.new.not_found.go_back")}
        </button>
      </div>
    );
  }

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
      dressCode: values.dressCode?.trim() || undefined,
      rsvpDeadline: values.rsvpDeadline?.trim() || undefined,
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
      title: translate("common.warning"),
      description: <div>{translate("common.all_data_will_be_lost")}</div>,
      confirmText: translate("button.delete"),
      cancelText: translate("button.cancel"),
      danger: true,
    });
    if (yes) router.replace("/");
  }

  return (
    <EventForm
      kind={kindParam}
      form={form}
      builder={program}
      onChangeTemplate={() => {}}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title={pageTitle}
      subtitle={translate("events.new.subtitle")}
      submitLabel={translate("events.new.submit")}
      isSubmitting={isCreating}
      errorMessage={createError}
      placeholderTitle={titlePlaceholder}
      renderSchedule={(slot) => slot}
      right={
        <PreviewPanel
          eventKind={kindParam}
          templateKey={current.templateKey}
          title={current.title}
          description={current.description}
          date={toIsoFromDatetimeLocal(current.datetime)}
          location={current.location}
          program={program.items}
          dressCode={current.dressCode}
          rsvpDeadline={current.rsvpDeadline}
        />
      }
    />
  );
}
