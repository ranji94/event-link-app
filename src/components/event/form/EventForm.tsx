"use client";
import * as React from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { translate } from "@/locales";
import { TemplatePicker } from "@/components/templates/TemplatePicker";
import { ScheduleBuilder } from "@/components/event/ScheduleBuilder";
import type { EventFormValues } from "./schema";
import type { CreateProgramItemDto } from "@/entities/api.gen.schemas";
import { EventKind } from "@/common/enum";

export type EventFormProps = {
  kind: EventKind;
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
  renderSchedule: (children: React.ReactNode) => React.ReactNode;
  right?: React.ReactNode;
  placeholderTitle?: string;
};

function laterNative(a?: string, b?: string): string {
  const da = a ? new Date(a) : null;
  const db = b ? new Date(b) : null;
  if (!da && !db) return "";
  if (da && !db) return a!;
  if (!da && db) return b!;
  return da!.getTime() >= db!.getTime() ? a! : b!;
}

function maxOneYearNative(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  d.setSeconds(0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function parseDisplayToDate(value: string): Date | null {
  const m = value.match(/^(\d{2})\.(\d{2})\.(\d{4}),\s(\d{2}):(\d{2})$/);
  if (!m) return null;
  const [, d, mo, y, h, mi] = m;
  const date = new Date(
    Number(y),
    Number(mo) - 1,
    Number(d),
    Number(h),
    Number(mi),
    0,
    0
  );
  // sanity check
  if (
    date.getFullYear() !== Number(y) ||
    date.getMonth() !== Number(mo) - 1 ||
    date.getDate() !== Number(d) ||
    date.getHours() !== Number(h) ||
    date.getMinutes() !== Number(mi)
  )
    return null;
  return date;
}

// Date -> 'dd.MM.yyyy, hh:mm'
function formatDisplay(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(
    date.getMonth() + 1
  )}.${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// 'dd.MM.yyyy hh:mm' -> 'YYYY-MM-DDTHH:mm' (native input)
function displayToNative(value?: string): string {
  if (!value) return "";
  const d = parseDisplayToDate(value);
  if (!d) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

// 'YYYY-MM-DDTHH:mm' -> 'dd.MM.yyyy hh:mm'
function nativeToDisplay(value?: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return formatDisplay(d);
}

// teraz (zaokrąglony do minuty) w formacie 'YYYY-MM-DDTHH:mm'
function nowNative(): string {
  const d = new Date();
  d.setSeconds(0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export function EventForm({
  kind,
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
            {/* DATA GŁÓWNA */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translate("events.fields.datetime")}
                <span className="ml-1 text-gray-400">*</span>
              </label>

              <input
                type="datetime-local"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                value={displayToNative(current?.datetime)}
                // min = max(now, rsvpDeadline)
                min={laterNative(
                  nowNative(),
                  displayToNative(current?.rsvpDeadline)
                )}
                max={maxOneYearNative()}
                onChange={(e) => {
                  const native = e.target.value;
                  const display = nativeToDisplay(native);
                  setValue("datetime", display, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });

                  const rsvpNative = displayToNative(current?.rsvpDeadline);
                  if (rsvpNative) {
                    const newEvent = new Date(native);
                    const currentRsvp = new Date(rsvpNative);
                    if (currentRsvp.getTime() > newEvent.getTime()) {
                      // dociągnięcie RSVP do nowej daty wydarzenia
                      setValue("rsvpDeadline", display, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }
                  }
                }}
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onFocus={(e) => {
                  // @ts-expect-error
                  if (e.target.showPicker) e.target.showPicker();
                }}
              />

              <p className="mt-1 text-xs text-gray-500">
                {translate("events.hint.format")}
              </p>

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

          {/* 🆕 dodatkowe pola */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translate("events.fields.dressCode") /* dodaj w locales */}
                <span className="ml-1 text-gray-400">
                  ({translate("common.optional")})
                </span>
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                {...register("dressCode")}
                placeholder={
                  translate("events.placeholders.dressCode") ??
                  "Np. formalny, smart casual"
                }
              />
              {errors.dressCode && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.dressCode.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translate("events.fields.rsvpDeadline")}
                <span className="ml-1 text-gray-400">
                  ({translate("common.optional")})
                </span>
              </label>

              <input
                type="datetime-local"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                value={displayToNative(current?.rsvpDeadline)}
                min={nowNative()}
                max={displayToNative(current?.datetime) || maxOneYearNative()}
                onChange={(e) =>
                  setValue("rsvpDeadline", nativeToDisplay(e.target.value), {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onFocus={(e) => {
                  // @ts-expect-error
                  if (e.target.showPicker) e.target.showPicker();
                }}
              />

              <div className="mt-1 text-xs text-gray-500">
                <span className="block">
                  {
                    translate(
                      "events.hint.optional"
                    ) /* np. „Pole opcjonalne” */
                  }
                </span>
                <span className="block">
                  {
                    translate(
                      "events.hint.format"
                    ) /* „Format: dd.MM.yyyy hh:mm” */
                  }
                </span>
                <span className="block">
                  {
                    translate(
                      "events.hint.rsvp_leq_date"
                    ) /* np. „RSVP nie może być później niż data wydarzenia” */
                  }
                </span>
              </div>

              {errors.rsvpDeadline && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.rsvpDeadline.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {translate("events.fields.template")}
            </label>
            <TemplatePicker
              eventKind={kind}
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
                      d="M4 12a 8 8 0 018-8v4a4 4 0 00-4 4H4z"
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
