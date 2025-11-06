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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChevronDown,
  SlidersHorizontal,
  LayoutGrid,
  List as ListIcon,
} from "lucide-react";

import { EventKind } from "@/common/enum";
import { KIND_MAP } from "@/lib/events/event-kind-map";

/** ————————————————————————————————
 *  Public API
 * ———————————————————————————————— */
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
  // 🔒 Na mobilce wymuszamy "grid" – robimy to raz po montażu
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      props.onView("grid");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* MOBILE: zwijany panel filtrów + bottom-sheet selecty */}
      <div className="sm:hidden">
        <MobileFilters
          search={props.search}
          onSearch={props.onSearch}
          kind={props.kind}
          onKind={props.onKind}
          sort={props.sort}
          onSort={props.onSort}
        />
      </div>

      {/* DESKTOP/TABLET: klasyczny pasek z inputem i selectami */}
      <div className="hidden sm:flex w-full gap-2">
        <Input
          placeholder="Szukaj po tytule, miejscu, slugu…"
          value={props.search}
          onChange={(e) => props.onSearch(e.target.value)}
          className="w-full sm:flex-1"
        />

        <Select
          value={props.kind}
          onValueChange={(v) => props.onKind(v as any)}
        >
          <SelectTrigger className="w-full sm:w-44">
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
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Sortuj" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DATE_DESC">Najnowsze</SelectItem>
            <SelectItem value="DATE_ASC">Najbliższe / Najstarsze</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* DESKTOP/TABLET: przełącznik widoku – na mobilce ukryty */}
      <div className="hidden sm:block">
        <Tabs
          value={props.view}
          onValueChange={(v) => props.onView(v as any)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-2 sm:w-auto">
            <TabsTrigger
              value="grid"
              className="cursor-pointer flex items-center justify-center gap-1"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Kafelki</span>
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="cursor-pointer flex items-center justify-center gap-1"
            >
              <ListIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Lista</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

/** ————————————————————————————————
 *  MOBILE Filters (collapsible + bottom sheet selects)
 * ———————————————————————————————— */
function MobileFilters(props: {
  search: string;
  onSearch: (v: string) => void;
  kind: "ALL" | EventKind;
  onKind: (v: "ALL" | EventKind) => void;
  sort: "DATE_ASC" | "DATE_DESC";
  onSort: (v: "DATE_ASC" | "DATE_DESC") => void;
}) {
  const [open, setOpen] = React.useState(false);

  // “Nagłówek” filtrów – przycisk otwiera panel
  return (
    <div className="flex flex-col gap-2">
      {/* Pasek wyszukiwania zawsze dostępny i na pełną szerokość */}
      <Input
        placeholder="Szukaj po tytule, miejscu, slugu…"
        value={props.search}
        onChange={(e) => props.onSearch(e.target.value)}
        className="w-full"
      />

      {/* Zwijany / otwierany panel z filtrami */}
      <div className="flex">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="cursor-pointer w-full justify-between"
            >
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filtry i sortowanie
              </span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </Button>
          </SheetTrigger>

          {/* Bottom sheet – mobilny feeling */}
          <SheetContent side="bottom" className="p-0">
            <div className="mx-auto w-full max-w-md">
              <SheetHeader className="px-4 pt-4">
                <SheetTitle>Filtry i sortowanie</SheetTitle>
              </SheetHeader>

              <div className="space-y-5 p-4">
                {/* Typ wydarzenia */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Typ</p>
                  <MobileBottomSheetSelect<"ALL" | EventKind>
                    value={props.kind}
                    onChange={props.onKind}
                    options={[
                      { value: "ALL", label: "Wszystkie typy" },
                      ...Object.entries(KIND_MAP).map(([k, v]) => ({
                        value: k as EventKind,
                        label: v.label,
                      })),
                    ]}
                  />
                </div>

                {/* Sortowanie */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Sortowanie
                  </p>
                  <MobileBottomSheetSelect<"DATE_DESC" | "DATE_ASC">
                    value={props.sort}
                    onChange={props.onSort}
                    options={[
                      { value: "DATE_DESC", label: "Najnowsze" },
                      { value: "DATE_ASC", label: "Najbliższe / Najstarsze" },
                    ]}
                  />
                </div>
              </div>

              <SheetFooter className="p-4">
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Zastosuj
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

/** ————————————————————————————————
 *  MobileBottomSheetSelect
 *  – przycisk + bottom sheet z listą (RadioGroup)
 * ———————————————————————————————— */
function MobileBottomSheetSelect<T extends string>(props: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  buttonLabel?: string; // opcjonalnie własna etykieta przycisku
}) {
  const [open, setOpen] = React.useState(false);
  const current = props.options.find((o) => o.value === props.value);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer w-full justify-between"
        >
          <span>{current?.label ?? props.buttonLabel ?? "Wybierz…"}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="p-0">
        <div className="mx-auto w-full max-w-md">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle>Wybierz</SheetTitle>
          </SheetHeader>

          <div className="p-2">
            <RadioGroup
              value={props.value}
              onValueChange={(v) => props.onChange(v as T)}
              className="space-y-1"
            >
              {props.options.map((opt) => (
                <label
                  key={opt.value}
                  htmlFor={`mbs-${String(opt.value)}`}
                  className="cursor-pointer flex items-center justify-between rounded-xl px-3 py-3 hover:bg-muted"
                >
                  <span className="text-sm">{opt.label}</span>
                  <RadioGroupItem
                    id={`mbs-${String(opt.value)}`}
                    value={opt.value}
                  />
                </label>
              ))}
            </RadioGroup>
          </div>

          <SheetFooter className="p-4">
            <Button
              className="w-full cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Gotowe
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
