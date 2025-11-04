"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarDays,
  MapPin,
  MoreVertical,
  Pencil,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { KIND_MAP } from "@/lib/events/event-kind-map";
import { formatDate } from "@/common/utils";
import { EventListItem } from "@/lib/types";
import { translate } from "@/locales";
import { useConfirm } from "@/components/common/confirm/confirm-provider";

export function EventCard({
  e,
  onDelete,
}: {
  e: EventListItem;
  onDelete: (id: string) => void;
}) {
  const { Icon, label } = KIND_MAP[e.kind] ?? KIND_MAP.OTHER;

  const confirm = useConfirm();

  const openDeleteDialog = async (id: string) => {
    const yes = await confirm({
      title: translate("events.list.delete.title") ?? "Uwaga",
      description: (
        <div>
          <div>{translate("events.list.delete.description")}</div>
        </div>
      ),
      confirmText: translate("button.delete") ?? "Usuń",
      cancelText: translate("button.cancel") ?? "Anuluj",
      danger: true,
    });

    if (yes) {
      onDelete(id);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-muted p-2">
              <Icon className="h-5 w-5" />
            </span>
            <CardTitle className="text-base leading-tight">{e.title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer h-8 w-8"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/events/${e.id}`}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  {translate("button.open")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/events/${e.id}/edit`}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  {translate("button.edit")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => openDeleteDialog(e.id)}
                className="cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                {translate("button.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {formatDate(e.date)}
          </span>
          {e.location && (
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {e.location}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{label}</Badge>
          </div>
          <Button asChild size="sm" variant="secondary">
            <Link href={`/events/${e.id}`}>
              {translate("events.list.card.manage")}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
