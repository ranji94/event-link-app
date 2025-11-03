"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  MapPin,
  MoreVertical,
  Heart,
  Baby,
  PartyPopper,
  GlassWater,
  Cake,
  BabyIcon,
  Church,
  HelpCircle,
  List as ListIcon,
  LayoutGrid,
  Trash2,
  Pencil,
  ExternalLink,
} from "lucide-react";
import { useEvents } from "@/lib/events/use-events";

// --- Domain types -----------------------------------------------------------
export type EventKind =
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
  title: string;
  description?: string | null;
  date?: string | null; // ISO string
  location?: string | null;
  slug: string;
  kind: EventKind;
  templateKey?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

// --- Helpers ---------------------------------------------------------------
const KIND_MAP: Record<
  EventKind,
  { label: string; Icon: React.ComponentType<any>; badge: string }
> = {
  WEDDING: { label: "Ślub/Wesele", Icon: Heart, badge: "love" },
  BAPTISM: { label: "Chrzest", Icon: Baby, badge: "baby" },
  BIRTHDAY_18: { label: "Osiemnastka", Icon: PartyPopper, badge: "b-day" },
  BIRTHDAY_30: { label: "Trzydziestka", Icon: GlassWater, badge: "30" },
  BIRTHDAY_50: { label: "Pięćdziesiątka", Icon: Cake, badge: "50" },
  BABY_SHOWER: { label: "Baby Shower", Icon: BabyIcon, badge: "baby" },
  HOLY_COMMUNION: { label: "Pierwsza Komunia", Icon: Church, badge: "komunia" },
  OTHER: { label: "Inne", Icon: HelpCircle, badge: "inne" },
};

function formatDate(iso?: string | null) {
  if (!iso) return "Brak daty";
  try {
    return format(new Date(iso), "d MMM yyyy, HH:mm", { locale: pl });
  } catch {
    return iso;
  }
}

// --- UI Components ---------------------------------------------------------
function EventsToolbar(props: {
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
          <TabsTrigger value="grid" className="flex items-center gap-1">
            <LayoutGrid className="h-4 w-4" />
            Kafelki
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-1">
            <ListIcon className="h-4 w-4" />
            Lista
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

function EventCard({
  e,
  onDelete,
}: {
  e: EventListItem;
  onDelete: (id: string) => void;
}) {
  const { Icon, label } = KIND_MAP[e.kind] ?? KIND_MAP.OTHER;
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
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/events/${e.id}`}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Otwórz
                </Link>
              </DropdownMenuItem>
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
                      Operacji nie można cofnąć. Zaproszenia i program
                      wydarzenia zostaną usunięte.
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
            {e.templateKey && <Badge variant="outline">{e.templateKey}</Badge>}
          </div>
          <Button asChild size="sm" variant="secondary">
            <Link href={`/events/${e.id}`}>Zarządzaj</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EventRow({
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

function EmptyState() {
  return (
    <Card className="text-center">
      <CardContent className="py-12">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <PartyPopper className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold">
          Nie masz jeszcze żadnych wydarzeń
        </h3>
        <p className="text-muted-foreground mt-1">
          Utwórz pierwsze wydarzenie, aby rozpocząć planowanie.
        </p>
        <Button asChild className="mt-4">
          <Link href="/create">Stwórz nowe</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-xl" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-6 w-6 rounded" />
            </div>
            <div className="mt-3 flex gap-3">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </CardHeader>
          <CardContent className="pt-0 flex justify-between items-center">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function EventsPage() {
  const [search, setSearch] = React.useState("");
  const [kind, setKind] = React.useState<"ALL" | EventKind>("ALL");
  const [sort, setSort] = React.useState<"DATE_ASC" | "DATE_DESC">("DATE_DESC");
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const { list, select, remove, isListing, isRemoving } = useEvents({
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
    (id: string) => {
      void remove(id);
    },
    [remove]
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
            <Link href="/create">Stwórz nowe</Link>
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
