"use client";

import { useMemo } from "react";
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
  const kindParam = (params.get("kind") as CreateEventDtoKind) || "WEDDING";

  const { create, isCreating, createError } = useEvents();

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
  const SelectedPreview =
    useMemo(
      () => getTemplateById(current.templateId)?.Preview,
      [current.templateId]
    ) ?? templates[0].Preview;

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

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-2xl font-bold tracking-tight">
          {translate("events.new.title")}
        </h1>
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
              placeholder={translate("events.placeholders.title")}
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
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
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

          <div>
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

          <div className="pt-2">
            <button
              type="submit"
              disabled={isCreating}
              className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50"
            >
              {isCreating
                ? translate("common.saving")
                : translate("events.new.submit")}
            </button>
          </div>
        </form>
      </section>

      <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">
          {translate("events.new.live_preview")}
        </h2>
        <div className="mt-4">
          <SelectedPreview
            title={current.title}
            description={current.description}
            date={toIsoFromDatetimeLocal(current.datetime)}
            location={current.location}
          />
        </div>
      </aside>
    </div>
  );
}
