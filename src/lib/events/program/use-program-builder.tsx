"use client";

import { useState, useCallback } from "react";
import type { CreateProgramItemDto } from "@/entities/api.gen.schemas";
import {
  programControllerBulk,
  programControllerReorder,
} from "@/entities/program";

type ProgramItem = CreateProgramItemDto;

export function useProgramBuilder(initial: ProgramItem[] = []) {
  const [items, setItems] = useState<ProgramItem[]>(initial);

  const addItem = useCallback((item?: Partial<ProgramItem>) => {
    setItems((prev) => [
      ...prev,
      {
        dayIndex: item?.dayIndex ?? 0,
        time: item?.time ?? "14:00",
        icon: item?.icon ?? "Calendar",
        header: item?.header ?? "",
        subheader: item?.subheader ?? "",
        position: item?.position ?? prev.length,
      },
    ]);
  }, []);

  const updateItem = useCallback(
    (index: number, patch: Partial<ProgramItem>) => {
      setItems((prev) =>
        prev.map((it, i) => (i === index ? { ...it, ...patch } : it))
      );
    },
    []
  );

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const moveItem = useCallback((from: number, to: number) => {
    setItems((prev) => {
      const next = [...prev];
      const [m] = next.splice(from, 1);
      next.splice(to, 0, m);
      return next.map((it, i) => ({ ...it, position: i }));
    });
  }, []);

  /** Zapis do API po utworzeniu eventu */
  const saveBulk = useCallback(
    async (eventId: string) => {
      if (!items.length) return { ok: true as const };
      const res = await programControllerBulk(
        eventId,
        { items },
        { credentials: "include" }
      );
      return { ok: res.status === (201 as const) };
    },
    [items]
  );

  /** Opcjonalnie: zapis samych pozycji (reorder) */
  const saveOrder = useCallback(
    async (eventId: string) => {
      const order = items
        .map((it: any, i) => ({ id: it.id, position: i }))
        .filter((x) => !!x.id);
      if (!order.length) return { ok: true as const };
      const res = await programControllerReorder(
        eventId,
        { order },
        { credentials: "include" }
      );
      return { ok: res.status === (200 as const) };
    },
    [items]
  );

  return {
    items,
    setItems,
    addItem,
    updateItem,
    removeItem,
    moveItem,
    saveBulk,
    saveOrder,
  };
}
