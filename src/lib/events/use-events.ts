"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type {
  CreateEventDto,
  UpdateEventDto,
} from "@/entities/api.gen.schemas";
import {
  eventsControllerCreate,
  eventsControllerList,
  eventsControllerGetOne,
  eventsControllerUpdate,
  eventsControllerRemove,
} from "@/entities/events";
import { translate } from "@/locales";

// ===== Helpers =====
type Ok<T> = { ok: true; data: T };
type Err = { ok: false; message: string };

type EventKind =
  | "WEDDING"
  | "BAPTISM"
  | "BIRTHDAY_18"
  | "BIRTHDAY_30"
  | "BIRTHDAY_50"
  | "BABY_SHOWER"
  | "HOLY_COMMUNION"
  | "OTHER";

export type EventListItem = {
  id: string;
  ownerId: string;
  title: string;
  description?: string | null;
  date?: string | null; // ISO string
  location?: string | null;
  kind: EventKind;
  slug: string;
  templateKey?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

function errMessage(e: unknown): string {
  if (typeof e === "string") return e;
  if (e && typeof e === "object" && "message" in e)
    return String((e as any).message ?? "");
  return translate("events.new.errors.create_failed");
}

/** Orval może zwrócić {data, status, headers}. Trzymamy rozpakowanie w jednym miejscu. */
function unpack<T = any>(res: any): T {
  if (res && typeof res === "object" && "data" in res) return res.data as T; // :contentReference[oaicite:2]{index=2}
  return res as T;
}

export type ListParams = {
  search?: string;
  kind?: "ALL" | EventKind;
  sort?: "DATE_ASC" | "DATE_DESC";
};

export function useEvents(initialParams: ListParams = {}) {
  // ===== state =====
  const [items, setItems] = useState<EventListItem[] | null>(null);
  const [isListing, setIsListing] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const [isRemoving, setIsRemoving] = useState<string | null>(null); // id usuwanego
  const [removeError, setRemoveError] = useState<string | null>(null);

  const cacheRef = useRef<Map<string, EventListItem>>(new Map());

  // ===== actions =====
  const list = useCallback(
    async (params?: ListParams): Promise<Ok<EventListItem[]> | Err> => {
      setIsListing(true);
      setListError(null);
      try {
        const res = await eventsControllerList({ credentials: "include" });
        const body = unpack<EventListItem[]>(res);
        // lokalny cache po id
        cacheRef.current.clear();
        for (const it of body ?? []) cacheRef.current.set(it.id, it);
        setItems(body ?? []);
        return { ok: true, data: body ?? [] };
      } catch (e) {
        const msg = errMessage(e);
        setListError(msg);
        return { ok: false, message: msg };
      } finally {
        setIsListing(false);
      }
    },
    []
  );

  const getOne = useCallback(
    async (id: string): Promise<Ok<EventListItem> | Err> => {
      // najpierw z cache
      const cached = cacheRef.current.get(id);
      if (cached) return { ok: true, data: cached };
      try {
        const res = await eventsControllerGetOne(id, {
          credentials: "include",
        });
        const body = unpack<EventListItem>(res);
        if (body?.id) cacheRef.current.set(body.id, body);
        return { ok: true, data: body };
      } catch (e) {
        return { ok: false, message: errMessage(e) };
      }
    },
    []
  );

  const create = useCallback(
    async (dto: CreateEventDto): Promise<Ok<any> | Err> => {
      setIsCreating(true);
      setCreateError(null);
      try {
        const res = await eventsControllerCreate(dto, {
          credentials: "include",
        });
        const created = unpack<any>(res); // backend może zwracać świeży rekord
        // jeśli mamy listę w pamięci – dodać na początek
        if (created?.id) {
          cacheRef.current.set(created.id, created);
          setItems((prev) => (prev ? [created, ...prev] : [created]));
        } else {
          // jeśli backend nie zwraca body (201/204) – po prostu odśwież listę
          void list();
        }
        return { ok: true, data: created };
      } catch (e) {
        const msg = errMessage(e);
        setCreateError(msg);
        return { ok: false, message: msg };
      } finally {
        setIsCreating(false);
      }
    },
    [list]
  );

  const update = useCallback(
    async (id: string, dto: UpdateEventDto): Promise<Ok<any> | Err> => {
      setIsUpdating(true);
      setUpdateError(null);
      try {
        const res = await eventsControllerUpdate(id, dto, {
          credentials: "include",
        });
        const updated = unpack<any>(res);
        // optymistycznie zaktualizuj cache/listę
        setItems((prev) => {
          if (!prev) return prev;
          return prev.map((it) =>
            it.id === id ? { ...it, ...dto, ...(updated ?? {}) } : it
          );
        });
        if (updated?.id) cacheRef.current.set(updated.id, updated);
        return { ok: true, data: updated };
      } catch (e) {
        const msg = errMessage(e);
        setUpdateError(msg);
        return { ok: false, message: msg };
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  const remove = useCallback(async (id: string): Promise<Ok<true> | Err> => {
    setIsRemoving(id);
    setRemoveError(null);
    try {
      await eventsControllerRemove(id, { credentials: "include" });
      cacheRef.current.delete(id);
      setItems((prev) => prev?.filter((x) => x.id !== id) ?? []);
      return { ok: true, data: true };
    } catch (e) {
      const msg = errMessage(e);
      setRemoveError(msg);
      return { ok: false, message: msg };
    } finally {
      setIsRemoving(null);
    }
  }, []);

  const refresh = useCallback(() => list(), [list]);

  // ===== client-side filters/sort (do użycia na stronie) =====
  const select = useCallback(
    (params: ListParams) => {
      const src = items ?? [];
      let out = src;

      const kind = params.kind ?? initialParams.kind ?? "ALL";
      const search = (params.search ?? initialParams.search ?? "")
        .trim()
        .toLowerCase();
      const sort = params.sort ?? initialParams.sort ?? "DATE_DESC";

      if (kind !== "ALL") out = out.filter((e) => e.kind === kind);
      if (search) {
        out = out.filter(
          (e) =>
            e.title.toLowerCase().includes(search) ||
            (e.location ?? "").toLowerCase().includes(search) ||
            (e.slug ?? "").toLowerCase().includes(search)
        );
      }
      out = [...out].sort((a, b) => {
        const ta = a.date ? +new Date(a.date) : 0;
        const tb = b.date ? +new Date(b.date) : 0;
        return sort === "DATE_ASC" ? ta - tb : tb - ta;
      });
      return out;
    },
    [items, initialParams.kind, initialParams.search, initialParams.sort]
  );

  const hasAny = useMemo(() => (items?.length ?? 0) > 0, [items]);

  return {
    // actions
    list,
    getOne,
    create,
    update,
    remove,
    refresh,
    select, // filtr/sort po kliencie

    // state
    items,
    hasAny,

    isListing,
    listError,

    isCreating,
    createError,

    isUpdating,
    updateError,

    isRemoving,
    removeError,
  };
}
