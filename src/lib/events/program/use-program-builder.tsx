"use client";

import { useState, useCallback } from "react";
import type { CreateProgramItemDto } from "@/entities/api.gen.schemas";
import {
  programControllerBulk,
  programControllerReorder,
  programControllerBulkUpsert,
  programControllerList,
} from "@/entities/program";

type ProgramItem = CreateProgramItemDto & { id?: string };

export function useProgramBuilder(initial: ProgramItem[] = []) {
  const [items, setItems] = useState<ProgramItem[]>(initial);
  const [removedIds, setRemovedIds] = useState<string[]>([]);

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
    setItems((prevItems) => {
      const next = [...prevItems];
      const [removed] = next.splice(index, 1);
      if (removed?.id) {
        setRemovedIds((prev) =>
          prev.includes(removed.id!) ? prev : [...prev, removed.id!]
        );
      }
      return next;
    });
  }, []);

  const moveItem = useCallback((from: number, to: number) => {
    setItems((prev) => {
      const next = [...prev];
      const [m] = next.splice(from, 1);
      next.splice(to, 0, m);
      return next.map((it, i) => ({ ...it, position: i }));
    });
  }, []);

  /** Zapis po UTWORZENIU eventu (tworzenie wszystkich naraz) */
  const saveBulk = useCallback(
    async (eventId: string) => {
      if (!items.length) return { ok: true as const };
      const res = await programControllerBulk(
        eventId,
        { items },
        { credentials: "include" }
      );
      return { ok: res.status === 201 };
    },
    [items]
  );

  /** 🔥 Nowy zapis do API po EDYCJI eventu */
  const saveBulkUpsert = useCallback(
    async (eventId: string) => {
      const payload = { items, deletedIds: removedIds };
      const res = await programControllerBulkUpsert(eventId, payload, {
        credentials: "include",
      });

      if (res.status >= 200 && res.status < 300) {
        const updated = await programControllerList(eventId, {
          credentials: "include",
        });
        setItems(updated);
        setRemovedIds([]);
        return { ok: true as const };
      }
      return { ok: false as const };
    },
    [items, removedIds]
  );

  /** (opcjonalny) zapis tylko kolejności — zostaje do innych celów */
  const saveOrder = useCallback(
    async (eventId: string) => {
      const order = items
        .map((it, i) => ({ id: it.id, position: i }))
        .filter((x) => !!x.id);
      if (!order.length) return { ok: true as const };
      const res = await programControllerReorder(
        eventId,
        { order },
        { credentials: "include" }
      );
      return { ok: res.status === 200 };
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
    saveBulkUpsert,
  };
}
