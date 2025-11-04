"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { translate } from "@/locales";
import { useEvents } from "@/lib/events/use-events";
import { useProgramBuilder } from "@/lib/events/program/use-program-builder";
import { programControllerList } from "@/entities/program";

import {
  TemplatePicker,
  getTemplateById,
} from "@/components/templates/TemplatePicker";
import { templates } from "@/templates/registry";
import { FullscreenPreview } from "@/components/templates/FullScreenPreview";
import { ScheduleBuilder } from "@/components/event/ScheduleBuilder";
import { useConfirm } from "@/components/common/confirm/confirm-provider";

import type { UpdateEventDto } from "@/entities/api.gen.schemas";
import type { CreateProgramItemDto } from "@/entities/api.gen.schemas";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: translate("events.new.errors.title_min") }),
  description: z.string().optional(),
  datetime: z
    .string()
    .min(1, { message: translate("events.new.errors.date_required") }),
  location: z.string().optional(),
  templateKey: z.string(),
});

type FormValues = z.infer<typeof schema>;

function toIsoFromDatetimeLocal(input?: string): string | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

function toDatetimeLocalFromIso(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const confirm = useConfirm();

  const { getOne, update, isUpdating, updateError } = useEvents();

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const program = useProgramBuilder([]);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const current = watch();

  useEffect(() => {
    async function load() {
      try {
        const res = await getOne(params.id);
        if (!res.ok) throw new Error(res.message);
        const e = res.data;

        reset({
          title: e.title ?? "",
          description: e.description ?? "",
          datetime: toDatetimeLocalFromIso(e.date),
          location: e.location ?? "",
          templateKey: e.templateKey ?? templates[0]?.id ?? "",
        });

        const programData = await programControllerList(params.id, {
          credentials: "include",
        });

        const items = programData?.map(
          (x: CreateProgramItemDto, i: number) => ({
            id: x.id, // 🟢 zachowaj id!
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
    // 🔧 tylko ID – reszta jest stabilna
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function onSubmit(values: FormValues) {
    const payload: UpdateEventDto = {
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      date: toIsoFromDatetimeLocal(values.datetime),
      location: values.location?.trim() || undefined,
      templateKey: values.templateKey,
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
    if (!isDirty) return router.back();

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

  const [fsOpen, setFsOpen] = useState(false);

  const SelectedPreview =
    useMemo(
      () => getTemplateById(current.templateKey)?.Preview,
      [current.templateKey]
    ) ?? templates[0].Preview;

  if (loading) {
    return <p className="text-gray-500">{translate("common.loading")}...</p>;
  }

  if (fetchError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
        {fetchError}
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-2xl font-bold tracking-tight">
          {translate("events.edit.title")}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {translate("events.edit.subtitle")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {translate("events.fields.title")}
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              {...register("title")}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {translate("events.fields.description")}
            </label>
            <textarea
              rows={5}
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              {...register("description")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translate("events.fields.datetime")}
              </label>
              <input
                type="datetime-local"
                className="cursor-pointer mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                {...register("datetime")}
              />
              {errors.datetime && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.datetime.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translate("events.fields.location")}
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                {...register("location")}
              />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {translate("events.fields.template")}
            </label>
            <TemplatePicker
              value={current.templateKey}
              onChange={(id) =>
                setValue("templateKey", id, { shouldDirty: true })
              }
            />
          </div>

          <ScheduleBuilder builder={program} />

          {updateError && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
              {updateError}
            </div>
          )}

          <div className="pt-4">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onCancel}
                className="cursor-pointer inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-50 sm:w-auto"
              >
                {translate("button.cancel")}
              </button>

              <button
                type="submit"
                disabled={isUpdating}
                aria-busy={isUpdating}
                className="cursor-pointer inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 sm:w-auto"
              >
                {isUpdating && (
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                )}
                {isUpdating
                  ? translate("common.saving")
                  : translate("events.edit.submit")}
              </button>
            </div>
          </div>
        </form>
      </section>

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
              title={current.title}
              description={current.description}
              date={toIsoFromDatetimeLocal(current.datetime)}
              location={current.location}
              program={program.items}
            />
          </div>
        </div>
      </aside>

      <FullscreenPreview open={fsOpen} onClose={() => setFsOpen(false)}>
        <SelectedPreview
          title={current.title}
          description={current.description}
          date={toIsoFromDatetimeLocal(current.datetime)}
          location={current.location}
          program={program.items}
        />
      </FullscreenPreview>
    </div>
  );
}
