"use client";

import { EventTypeDef } from "@/lib/types";
import { EventTypeCard } from "./EventTypeCard";

export function EventTypeGrid({ items }: { items: EventTypeDef[] }) {
  return (
    <div
      className={[
        "grid gap-4",
        "grid-cols-2",
        "sm:grid-cols-3",
        "lg:grid-cols-4",
        "xl:grid-cols-6",
      ].join(" ")}
    >
      {items.map((it) => (
        <EventTypeCard key={it.kind} item={it} />
      ))}
    </div>
  );
}
