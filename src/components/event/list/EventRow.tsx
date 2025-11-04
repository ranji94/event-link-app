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

export function EventRow({
  e,
  onDelete,
}: {
  e: EventListItem;
  onDelete: (id: string) => void;
}) {
  const { Icon } = KIND_MAP[e.kind] ?? KIND_MAP.OTHER;
  return (
    <div className="grid grid-cols-1 gap-2 rounded-2xl border p-3 sm:grid-cols-12 sm:items-center">
      <div className="sm:col-span-4 flex items-center gap-2">
        <span className="rounded-xl bg-muted p-2">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="font-medium leading-tight">{e.title}</div>
          <div className="text-muted-foreground text-sm">
            {e.location ?? "Brak lokalizacji"}
          </div>
        </div>
      </div>
      <div className="sm:col-span-3 text-sm">
        <CalendarDays className="mr-1 inline h-4 w-4" />
        {formatDate(e.date)}
      </div>
      <div className="sm:col-span-3">
        <Badge variant="secondary">{KIND_MAP[e.kind].label}</Badge>
      </div>
      <div className="sm:col-span-2 flex items-center justify-end gap-2">
        <Button asChild variant="secondary" size="sm">
          <Link href={`/events/${e.id}`}>Zarządzaj</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/events/${e.id}/edit`}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edytuj
              </Link>
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Usuń
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Usunąć „{e.title}”?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Operacji nie można cofnąć.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Anuluj</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(e.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Usuń
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
