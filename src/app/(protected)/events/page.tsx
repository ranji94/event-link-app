"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useEvents } from "@/lib/events/use-events";
import { EventKind } from "@/common/enum";
import { EventsToolbar } from "@/components/event/list/EventsToolbar";
import { GridSkeleton } from "@/components/event/list/GridSkeleton";
import { EmptyState } from "@/components/event/list/EmptyState";
import { EventListItem } from "@/lib/types";
import { EventCard } from "@/components/event/list/EventCard";
import { EventRow } from "@/components/event/list/EventRow";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function EventsPage() {
  const [search, setSearch] = React.useState("");
  const [kind, setKind] = React.useState<"ALL" | EventKind>("ALL");
  const [sort, setSort] = React.useState<"DATE_ASC" | "DATE_DESC">("DATE_DESC");
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const { list, select, remove, isListing, isRemoving, refresh } = useEvents({
    sort: "DATE_DESC",
  });

  React.useEffect(() => {
    void list();
  }, [list]);

  const data = React.useMemo(
    () => select({ search, kind, sort }),
    [select, search, kind, sort]
  );

  const onDelete = React.useCallback(
    async (id: string) => {
      await remove(id);
      await refresh();
    },
    [remove, refresh]
  );

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Moje wydarzenia
            </h1>
            <p className="text-muted-foreground">
              Zarządzaj zaproszeniami, programem i szczegółami wydarzeń.
            </p>
          </div>
          <Button asChild>
            <Link href="/">Stwórz nowe</Link>
          </Button>
        </div>
        <div className="mt-4">
          <EventsToolbar
            search={search}
            onSearch={setSearch}
            kind={kind}
            onKind={setKind}
            sort={sort}
            onSort={setSort}
            view={view}
            onView={setView}
          />
        </div>
      </div>

      {/* Content */}
      {isListing ? (
        <GridSkeleton />
      ) : data.length === 0 ? (
        <EmptyState />
      ) : view === "grid" ? (
        <div
          className={cn(
            "grid gap-4",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {data.map((e: EventListItem) => (
            <EventCard key={e.id} e={e} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((e: EventListItem) => (
            <EventRow key={e.id} e={e} onDelete={onDelete} />
          ))}
        </div>
      )}

      {(isListing || !!isRemoving) && (
        <div className="text-center text-xs text-muted-foreground">
          {isListing ? "Ładowanie…" : "Usuwam…"}
        </div>
      )}
    </div>
  );
}
