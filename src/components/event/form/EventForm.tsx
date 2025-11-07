"use client";
import * as React from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { translate } from "@/locales";
import { TemplatePicker } from "@/components/templates/TemplatePicker";
import { ScheduleBuilder } from "@/components/event/ScheduleBuilder";
import type { EventFormValues } from "./schema";
import type { CreateProgramItemDto } from "@/entities/api.gen.schemas";

export type EventFormProps = {
  form: UseFormReturn<EventFormValues>;
  builder: {
    items: CreateProgramItemDto[];
    addItem: (item?: Partial<CreateProgramItemDto>) => void;
    updateItem: (index: number, patch: Partial<CreateProgramItemDto>) => void;
    removeItem: (index: number) => void;
    moveItem: (from: number, to: number) => void;
  };
  onChangeTemplate: (id: string) => void;
  onSubmit: (values: EventFormValues) => Promise<void> | void;
  onCancel: () => Promise<void> | void;
  title: string;
  subtitle: string;
  submitLabel: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  renderSchedule: (children: React.ReactNode) => React.ReactNode; // pozwala wstrzyknąć ScheduleBuilder z zewnątrz
  right?: React.ReactNode; // np. preview panel
  placeholderTitle?: string;
};

export function EventForm({
  form,
  builder,
  onChangeTemplate,
  onSubmit,
  onCancel,
  title,
  subtitle,
  submitLabel,
  isSubmitting,
  errorMessage,
  renderSchedule,
  right,
  placeholderTitle,
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = form;

  const current = useWatch({ control });

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {translate("events.fields.title")}
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              {...register("title")}
              placeholder={placeholderTitle}
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
              value={current?.templateKey}
              onChange={(id) => {
                setValue("templateKey", id, { shouldDirty: true });
                onChangeTemplate?.(id);
              }}
            />
          </div>

          {renderSchedule(<ScheduleBuilder builder={builder} />)}

          {errorMessage && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
              {errorMessage}
            </div>
          )}

          <div className="pt-4">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => void onCancel()}
                className="cursor-pointer inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-50 sm:w-auto"
              >
                {translate("button.cancel")}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="cursor-pointer inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting && (
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
                {isSubmitting ? translate("common.saving") : submitLabel}
              </button>
            </div>
          </div>
        </form>
      </section>

      {right}
    </div>
  );
}
