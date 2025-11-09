"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import type {
  UpdateEventDto,
  CreateProgramItemDto,
} from "@/entities/api.gen.schemas";
import { useEvents } from "@/lib/events/use-events";
import { useConfirm } from "@/components/common/confirm/confirm-provider";
import { useProgramBuilder } from "@/lib/events/program/use-program-builder";
import { EventForm } from "@/components/event/form/EventForm";
import { useEventForm } from "@/components/event/form/useEventForm";
import { PreviewPanel } from "@/components/event/PreviewPanel";
import { programControllerList } from "@/entities/program";
import { translate } from "@/locales";

// === Helpers: konwersje ISO <-> 'dd.MM.yyyy hh:mm' ===
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function isoToDisplay(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
function displayToIso(display?: string | null): string | undefined {
  if (!display) return undefined;
  const m = display.match(/^(\d{2})\.(\d{2})\.(\d{4})\s(\d{2}):(\d{2})$/);
  if (!m) return undefined;
  const [, dd, mm, yyyy, hh, mi] = m;
  const d = new Date(
    Number(yyyy),
    Number(mm) - 1,
    Number(dd),
    Number(hh),
    Number(mi),
    0,
    0
  );
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { getOne, update, isUpdating, updateError } = useEvents();
  const confirm = useConfirm();

  const program = useProgramBuilder([]);

  const form = useEventForm();
  const current = form.watch();

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getOne(params.id);
        if (!res.ok) throw new Error(res.message);
        const e = res.data;

        form.reset({
          title: e.title ?? "",
          description: e.description ?? "",
          // główna data wydarzenia -> display
          datetime: isoToDisplay(e.date),
          location: e.location ?? "",
          templateKey: e.templateKey ?? "",
          // 🆕 pola
          dressCode: e.dressCode ?? "",
          rsvpDeadline: isoToDisplay(e.rsvpDeadline),
        });

        const programData = await programControllerList(params.id, {
          credentials: "include",
        });
        const items = programData?.map(
          (x: CreateProgramItemDto, i: number) => ({
            id: (x as any).id,
            dayIndex: x.dayIndex ?? 0,
            time: x.time ?? "14:00",
            icon: x.icon ?? "Calendar",
            header: x.header ?? "",
            subheader: x.subheader ?? "",
            position: x.position ?? i,
          })
        ) as CreateProgramItemDto[];
        program.setItems(items ?? []);
      } catch (e: any) {
        setFetchError(e.message ?? "Nie udało się pobrać danych");
      } finally {
        setLoading(false);
      }
    }
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function onSubmit(values: any) {
    const payload: UpdateEventDto = {
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      // display -> ISO
      date: displayToIso(values.datetime)!,
      location: values.location?.trim() || undefined,
      templateKey: values.templateKey,
      // 🆕
      dressCode: values.dressCode?.trim() || undefined,
      rsvpDeadline: displayToIso(values.rsvpDeadline) || undefined,
    };

    const res = await update(params.id, payload);
    if (res.ok) {
      await program.saveBulkUpsert(params.id);
      router.replace(`/events/${params.id}`);
    } else {
      alert(res.message);
    }
  }

  async function onCancel() {
    if (!form.formState.isDirty) return router.back();
    const yes = await confirm({
      title: translate("events.edit.exit_dialog.warning") ?? "Odrzucić zmiany?",
      description:
        translate("events.edit.exit_dialog.description") ??
        "Wprowadzone dane nie zostaną zapisane.",
      confirmText: translate("button.discard") ?? "Odrzuć",
      cancelText: translate("button.cancel") ?? "Anuluj",
      danger: true,
    });
    if (yes) router.back();
  }

  if (loading)
    return <p className="text-gray-500">{translate("common.loading")}...</p>;
  if (fetchError)
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
        {fetchError}
      </div>
    );

  return (
    <EventForm
      form={form}
      builder={program}
      onChangeTemplate={() => {}}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title={translate("events.edit.title")}
      subtitle={translate("events.edit.subtitle")}
      submitLabel={translate("events.edit.submit")}
      isSubmitting={isUpdating}
      errorMessage={updateError}
      placeholderTitle={undefined}
      renderSchedule={(slot) => slot}
      right={
        <PreviewPanel
          templateKey={current.templateKey}
          title={current.title}
          description={current.description}
          // PreviewPanel potrzebuje ISO → konwersja display -> ISO
          date={displayToIso(current.datetime)}
          location={current.location}
          program={program.items}
        />
      }
    />
  );
}
