"use client";

import { useCallback, useState } from "react";
import type {
  CreateEventDto,
  UpdateEventDto,
} from "@/entities/api.gen.schemas";
import {
  eventsControllerCreate,
  // Poniższe zostawiam na przyszłość (list/get/update/remove),
  // odkomentuj jeśli chcesz używać:
  // eventsControllerList,
  // eventsControllerGetOne,
  // eventsControllerUpdate,
  // eventsControllerRemove,
} from "@/entities/events";
import { translate } from "@/locales";

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; message: string };

function errMessage(e: unknown): string {
  if (typeof e === "string") return e;
  if (e && typeof e === "object" && "message" in e)
    return String((e as any).message ?? "");
  return translate("events.new.errors.create_failed");
}

export function useEvents() {
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const create = useCallback(
    async (dto: CreateEventDto): Promise<Ok<any> | Err> => {
      setIsCreating(true);
      setCreateError(null);
      try {
        const res = await eventsControllerCreate(dto, {
          credentials: "include",
        });
        if (res.status >= 200 && res.status < 300) {
          return { ok: true, data: res.data };
        }
        return {
          ok: false,
          message: translate("events.new.errors.create_failed"),
        };
      } catch (e) {
        const msg = errMessage(e);
        setCreateError(msg);
        return { ok: false, message: msg };
      } finally {
        setIsCreating(false);
      }
    },
    []
  );

  // szkic pod kolejne metody (zostawiam do użycia później):
  // const list = useCallback(async () => { ... }, []);
  // const getOne = useCallback(async (id: string) => { ... }, []);
  // const update = useCallback(async (id: string, dto: UpdateEventDto) => { ... }, []);
  // const remove = useCallback(async (id: string) => { ... }, []);

  return {
    // actions
    create,
    // list, getOne, update, remove,
    // state
    isCreating,
    createError,
  };
}
