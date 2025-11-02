"use client";

import { EventTypeDef } from "@/lib/types";
import Link from "next/link";

type Props = { item: EventTypeDef };

export function EventTypeCard({ item }: Props) {
  return (
    <Link
      href={item.href}
      className={[
        "group block rounded-2xl p-4 shadow-sm ring-1 ring-black/5 transition",
        "hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        item.bg,
      ].join(" ")}
      aria-label={`Utwórz wydarzenie: ${item.label}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            "grid h-12 w-12 place-items-center rounded-xl bg-white/70",
            "backdrop-blur-sm",
          ].join(" ")}
        >
          <span className={`text-2xl ${item.fg}`}>{item.icon}</span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-gray-900">
            {item.label}
          </p>
          <p className="text-xs text-gray-600 opacity-90">
            Kliknij, aby zacząć
          </p>
        </div>
      </div>
    </Link>
  );
}
