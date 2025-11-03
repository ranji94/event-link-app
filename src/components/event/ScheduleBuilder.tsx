"use client";

import { translate } from "@/locales";
import * as React from "react";
import { IconPicker, type IconKey } from "@/components/event/IconPicker";

/* ========= Typy ========= */
export type ScheduleItem = {
  time: string; // "HH:mm"
  icon?: IconKey; // wyłącznie spośród 5 dostępnych
  header: string;
  subheader?: string;
  position?: number;
  dayIndex?: number;
};

type BuilderApi = {
  items: ScheduleItem[];
  addItem: (item?: Partial<ScheduleItem>) => void;
  updateItem: (index: number, patch: Partial<ScheduleItem>) => void;
  removeItem: (index: number) => void;
  moveItem: (from: number, to: number) => void;
};

type Props = {
  builder: BuilderApi;
  titleKey?: string;
  addBtnKey?: string;
  emptyKey?: string;
};

/* ========= Klocki ========= */

function Field({
  label,
  children,
}: React.PropsWithChildren<{ label: string }>) {
  return (
    <label className="block min-w-0">
      <div className="mb-1 text-xs font-medium text-gray-600">{label}</div>
      {children}
    </label>
  );
}

const NavBtn = ({
  children,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className="rounded-md px-3 py-2 text-sm ring-1 ring-black/10 hover:bg-gray-50 disabled:opacity-40"
  >
    {children}
  </button>
);

/* ========= Główny komponent ========= */

export function ScheduleBuilder({
  builder,
  titleKey = "events.new.schedule.title",
  addBtnKey = "events.new.schedule.add_item",
  emptyKey = "events.new.schedule.empty",
}: Props) {
  const { items, addItem, updateItem, removeItem, moveItem } = builder;

  return (
    <section className="rounded-2xl border border-black/5 p-4">
      <div className="mb-4 flex flex-col gap-2 sm:mb-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold tracking-tight text-gray-700 sm:text-sm sm:uppercase sm:tracking-wide">
          {translate(titleKey)}
        </h3>
        <button
          type="button"
          onClick={() => addItem()}
          className="w-full cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 sm:w-auto"
        >
          {translate(addBtnKey)}
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">{translate(emptyKey)}</p>
      ) : (
        <ul className="space-y-4">
          {items.map((it, idx) => (
            <li
              key={idx}
              className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm"
            >
              {/* ROW 1: Godzina + IconPicker */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label={translate("events.new.schedule.time")}>
                  <input
                    type="time"
                    pattern="^([01]\\d|2[0-3]):[0-5]\\d$"
                    className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    value={it.time}
                    onChange={(e) => updateItem(idx, { time: e.target.value })}
                  />
                </Field>

                <IconPicker
                  label={translate("events.new.schedule.icon")}
                  value={it.icon}
                  onChange={(v) => updateItem(idx, { icon: v })}
                />
              </div>

              {/* ROW 2: Header (full width) */}
              <div className="mt-3">
                <Field label={translate("events.new.schedule.header")}>
                  <textarea
                    rows={2}
                    className="w-full resize-y rounded-md border border-black/10 px-3 py-2 text-sm leading-6 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    value={it.header}
                    onChange={(e) =>
                      updateItem(idx, { header: e.target.value })
                    }
                    placeholder={translate("events.new.schedule.header_ph")}
                  />
                </Field>
              </div>

              {/* ROW 3: Subheader (full width) */}
              <div className="mt-3">
                <Field label={translate("events.new.schedule.subheader")}>
                  <textarea
                    rows={2}
                    className="w-full resize-y rounded-md border border-black/10 px-3 py-2 text-sm leading-6 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    value={it.subheader ?? ""}
                    onChange={(e) =>
                      updateItem(idx, { subheader: e.target.value })
                    }
                    placeholder={translate("events.new.schedule.subheader_ph")}
                  />
                </Field>
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center justify-end gap-2">
                <NavBtn
                  onClick={() => idx > 0 && moveItem(idx, idx - 1)}
                  disabled={idx === 0}
                  title={translate("common.move_up")}
                >
                  ↑
                </NavBtn>
                <NavBtn
                  onClick={() =>
                    idx < items.length - 1 && moveItem(idx, idx + 1)
                  }
                  disabled={idx === items.length - 1}
                  title={translate("common.move_down")}
                >
                  ↓
                </NavBtn>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 ring-1 ring-red-200 hover:bg-red-100"
                >
                  {translate("button.delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
