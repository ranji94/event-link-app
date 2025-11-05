"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarDays, MoreVertical, Trash2, Pencil } from "lucide-react";
import { EventListItem } from "@/lib/types";
import { KIND_MAP } from "@/lib/events/event-kind-map";
import { formatDate } from "@/common/utils";
import { translate } from "@/locales";

export function EventRow({
  e,
  onDelete,
}: {
  e: EventListItem;
  onDelete: (id: string) => void;
}) {
  const { Icon, label, bg, fg } = KIND_MAP[e.kind] ?? KIND_MAP.OTHER;

  return (
    <div
      className={`grid grid-cols-1 gap-2 rounded-2xl border p-3 sm:grid-cols-12 sm:items-center border-t-4 ${fg.replace(
        "text-",
        "border-"
      )}`}
    >
      {/* LEWA CZĘŚĆ */}
      <div className="sm:col-span-4 flex items-center gap-2">
        <span className={`rounded-xl p-2 ${bg}`}>
          <Icon className={`h-5 w-5 ${fg}`} />
        </span>
        <div>
          <div className="font-medium leading-tight">{e.title}</div>
          <div className="text-muted-foreground text-sm">
            {e.location ?? translate("events.list.no_location")}
          </div>
        </div>
      </div>

      {/* DATA */}
      <div className="sm:col-span-3 text-sm text-muted-foreground flex items-center">
        <CalendarDays className="mr-1 inline h-4 w-4" />
        {formatDate(e.date)}
      </div>

      {/* ETYKIETA TYPU */}
      <div className="sm:col-span-3">
        <Badge
          variant="secondary"
          className={`${bg} ${fg} border-0 font-medium shadow-none`}
        >
          {label}
        </Badge>
      </div>

      {/* AKCJE */}
      <div className="sm:col-span-2 flex items-center justify-end gap-2">
        <Button asChild variant="secondary" size="sm">
          <Link href={`/events/${e.id}`}>
            {translate("events.list.card.manage")}
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/events/${e.id}/edit`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Pencil className="h-4 w-4" />
                {translate("button.edit")}
              </Link>
            </DropdownMenuItem>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                  <Trash2 className="mr-2 h-4 w-4" />
                  {translate("button.delete")}
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {translate("events.list.delete.title")} „{e.title}”?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {translate("events.list.delete.description")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {translate("button.cancel")}
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(e.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {translate("button.delete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
