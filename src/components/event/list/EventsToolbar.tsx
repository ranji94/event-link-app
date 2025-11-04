"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List as ListIcon, LayoutGrid } from "lucide-react";
import { EventKind } from "@/common/enum";
import { KIND_MAP } from "@/lib/events/event-kind-map";

export function EventsToolbar(props: {
  search: string;
  onSearch: (v: string) => void;
  kind: "ALL" | EventKind;
  onKind: (v: "ALL" | EventKind) => void;
  sort: "DATE_ASC" | "DATE_DESC";
  onSort: (v: "DATE_ASC" | "DATE_DESC") => void;
  view: "grid" | "list";
  onView: (v: "grid" | "list") => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full gap-2">
        <Input
          placeholder="Szukaj po tytule, miejscu, slugu…"
          value={props.search}
          onChange={(e) => props.onSearch(e.target.value)}
          className="w-full"
        />
        <Select
          value={props.kind}
          onValueChange={(v) => props.onKind(v as any)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Typ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Wszystkie typy</SelectItem>
            {Object.entries(KIND_MAP).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={props.sort}
          onValueChange={(v) => props.onSort(v as any)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sortuj" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DATE_DESC">Najnowsze</SelectItem>
            <SelectItem value="DATE_ASC">Najbliższe / Najstarsze</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs
        value={props.view}
        onValueChange={(v) => props.onView(v as any)}
        className="w-full sm:w-auto"
      >
        <TabsList className="grid w-full grid-cols-2 sm:w-auto">
          <TabsTrigger
            value="grid"
            className="cursor-pointer flex items-center gap-1"
          >
            <LayoutGrid className="h-4 w-4" />
            Kafelki
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className="cursor-pointer flex items-center gap-1"
          >
            <ListIcon className="h-4 w-4" />
            Lista
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
