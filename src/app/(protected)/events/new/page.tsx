"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  CreateEventDto,
  CreateEventDtoKind,
} from "@/entities/api.gen.schemas";
import {
  TemplatePicker,
  getTemplateById,
} from "@/components/templates/TemplatePicker";
import { templates } from "@/templates/registry";
import { translate } from "@/locales";
import { useEvents } from "@/lib/events/use-events";
import { FullscreenPreview } from "@/components/templates/FullScreenPreview";
import { useConfirm } from "@/components/common/confirm/confirm-provider";
import {
  getNewEventTexts,
  getTitlePlaceholder,
} from "@/lib/events/title-placeholder";
import { EventKind } from "@/common/enum";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: translate("events.new.errors.title_min") }),
  description: z.string().optional(),
  datetime: z
    .string()
    .min(1, { message: translate("events.new.errors.date_required") }),
  location: z.string().optional(),
  templateId: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function toIsoFromDatetimeLocal(input?: string): string | undefined {
  if (!input) return undefined;
  // input np. "2025-12-24T18:30"
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export default function NewEventPage() {
  const router = useRouter();
  const params = useSearchParams();
  const kindParam = (params.get("kind") as EventKind) || EventKind.WEDDING;

  const { create, isCreating, createError } = useEvents();
  const confirm = useConfirm();

  const { titlePlaceholder, pageTitle } = getNewEventTexts(kindParam);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      datetime: "",
      location: "",
      templateId: templates[0]?.id,
    },
  });

  const current = watch();

  async function onSubmit(values: FormValues) {
    const payload: CreateEventDto = {
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      date: toIsoFromDatetimeLocal(values.datetime),
      location: values.location?.trim() || undefined,
      kind: kindParam,
      templateId: values.templateId,
    };

    const res = await create(payload);
    if (res.ok) {
      // Jeśli API zwraca ID, warto przenieść użytkownika od razu na szczegóły:
      const id = (res.data as any)?.id;
      router.push(id ? `/events/${id}` : "/events");
    } else {
      alert(res.message);
    }
  }

  async function onCancel() {
    // router.replace("/");
    const yes = await confirm({
      title: translate("events.new.exit_dialog.warning") ?? "Uwaga",
      description: (
        <div>
          <p>{translate("events.new.exit_dialog.description")}</p>
        </div>
      ),
      confirmText: translate("button.delete") ?? "Usuń",
      cancelText: translate("button.cancel") ?? "Anuluj",
      danger: true,
    });

    if (yes) {
      router.replace("/");
    }
  }

  const [fsOpen, setFsOpen] = useState(false);

  const SelectedPreview =
    useMemo(
      () => getTemplateById(current.templateId)?.Preview,
      [current.templateId]
    ) ?? templates[0].Preview;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
        <p className="mt-1 text-sm text-gray-600">
          {translate("events.new.subtitle")}
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
              placeholder={titlePlaceholder}
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
              placeholder={translate("events.placeholders.description")}
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
                placeholder="Warszawa – Kościół św. Anny"
              />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {translate("events.fields.template")}
            </label>
            <TemplatePicker
              value={current.templateId}
              onChange={(id) =>
                setValue("templateId", id, { shouldDirty: true })
              }
            />
          </div>

          {createError && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
              {createError}
            </div>
          )}

          <div className="pt-4">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              {/* Cancel */}
              <button
                type="button"
                onClick={onCancel}
                className="cursor-pointer inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-50 sm:w-auto"
              >
                {translate("button.cancel")}
              </button>

              {/* Submit */}
              <button
                type="submit"
                disabled={isCreating}
                aria-busy={isCreating}
                className="cursor-pointer inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 sm:w-auto"
              >
                {isCreating && (
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
                {isCreating
                  ? translate("common.saving")
                  : translate("events.new.submit")}
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

        {/* większy, „pół-stronicowy” podgląd */}
        <div className="mt-4">
          <div className="rounded-2xl border border-black/5 p-4">
            <SelectedPreview
              title={current.title}
              description={current.description}
              date={toIsoFromDatetimeLocal(current.datetime)}
              location={current.location}
            />
          </div>
        </div>
      </aside>

      {/* Modal pełnoekranowy */}
      <FullscreenPreview open={fsOpen} onClose={() => setFsOpen(false)}>
        <SelectedPreview
          title={current.title}
          description={current.description}
          date={toIsoFromDatetimeLocal(current.datetime)}
          location={current.location}
        />
      </FullscreenPreview>
    </div>
  );
}
