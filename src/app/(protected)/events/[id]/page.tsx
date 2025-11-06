"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  MapPin,
  ArrowLeft,
  Info,
  Share2,
  Link2,
  Plus,
  Users,
  Trash2,
} from "lucide-react";

import { useEvents, type EventListItem } from "@/lib/events/use-events";
import { programControllerList } from "@/entities/program";
import type { CreateProgramItemDto } from "@/entities/api.gen.schemas";
import { KIND_MAP } from "@/lib/events/event-kind-map";
import { translate } from "@/locales";
import { formatDate } from "@/common/utils";
import { getTemplateById } from "@/components/templates/TemplatePicker";
import { templates } from "@/templates/registry";
import { useGuests } from "@/lib/events/guests/use-guests";

// Pastelowe badge dla typu wydarzenia
const KIND_BADGE_CLASS: Record<string, string> = {
  WEDDING: "bg-rose-100 text-rose-900",
  BAPTISM: "bg-sky-100 text-sky-900",
  BIRTHDAY_18: "bg-violet-100 text-violet-900",
  BIRTHDAY_30: "bg-emerald-100 text-emerald-900",
  BIRTHDAY_50: "bg-amber-100 text-amber-900",
  BABY_SHOWER: "bg-lime-100 text-lime-900",
  HOLY_COMMUNION: "bg-orange-100 text-orange-900",
  OTHER: "bg-zinc-100 text-zinc-900",
};

export default function EventDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getOne } = useEvents();

  const [item, setItem] = React.useState<EventListItem | null>(null);
  const [program, setProgram] = React.useState<CreateProgramItemDto[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const {
    stats,
    loading: guestsLoading,
    listGuests,
    bulkAddGuests,
    createInvitation,
    shareInvitation,
    deleteGuest,
    loadStats,
  } = useGuests(params.id);

  // Formularz „szybkiego dodania” jednego gościa
  const [fullName, setFullName] = React.useState("");
  const [groupName, setGroupName] = React.useState("");

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const ev = await getOne(params.id);
        if (!mounted) return;
        if (ev.ok) setItem(ev.data);
        else setError(ev.message);

        const body = await programControllerList(params.id, {
          credentials: "include",
        });

        // @ts-expect-error – orval typuje elementy jako unknown
        setProgram(
          (body ?? []).map((x, i) => ({
            dayIndex: x.dayIndex ?? 0,
            time: x.time ?? "",
            icon: x.icon ?? "Calendar",
            header: x.header ?? "",
            subheader: x.subheader ?? "",
            position: x.position ?? i,
          }))
        );
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? translate("errors.unknown"));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();

    // załaduj gości + statystyki RSVP
    void listGuests();
    void loadStats();

    return () => {
      mounted = false;
    };
  }, [getOne, params.id, listGuests, loadStats]);

  // Handlery UI gości
  async function onQuickAddGuest(e: React.FormEvent) {
    e.preventDefault();
    const name = fullName.trim();
    const group = groupName.trim();
    if (!name) return;

    await bulkAddGuests([{ fullName: name, groupName: group || undefined }]);
    setFullName("");
    setGroupName("");
  }

  async function onGenerateAndShare(inviteeId: string, displayName: string) {
    const res = await createInvitation(inviteeId);
    if (res.ok && res.url) {
      await shareInvitation(res.url, displayName);
      await loadStats();
    }
  }

  async function onCopyLink(inviteeId: string) {
    const res = await createInvitation(inviteeId);
    // samo createInvitation kopiuje link do schowka w hooku
    if (res.ok) {
      await loadStats();
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonHeader />
        <Card className="ring-1 ring-black/5">
          <CardContent className="p-6">
            <div className="h-24 animate-pulse rounded-xl bg-muted" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/events")}
          className="inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {translate("events.details.back")}
        </Button>

        <div className="rounded-2xl bg-red-50 p-4 ring-1 ring-red-200">
          <div className="flex items-center gap-2 text-red-700">
            <Info className="h-4 w-4" />
            <p>{error ?? translate("events.details.not_found")}</p>
          </div>
        </div>
      </div>
    );
  }

  const { Icon, label } = KIND_MAP[item.kind] ?? KIND_MAP.OTHER;
  const badgeClass = KIND_BADGE_CLASS[item.kind] ?? KIND_BADGE_CLASS.OTHER;
  const Preview =
    getTemplateById(item.templateKey ?? templates[0]?.id)?.Preview ??
    templates[0].Preview;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <Button
            variant="ghost"
            asChild
            className="mb-1 inline-flex items-center gap-2 px-0"
          >
            <Link href="/events">
              <ArrowLeft className="h-4 w-4" />
              {translate("events.details.back")}
            </Link>
          </Button>

          <h1 className="truncate text-2xl font-bold tracking-tight">
            {item.title}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {item.date && (
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(item.date)}
              </span>
            )}
            {item.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {item.location}
              </span>
            )}
            <Badge className={badgeClass}>
              <span className="inline-flex items-center gap-1">
                <Icon className="h-4 w-4" />
                {label}
              </span>
            </Badge>
          </div>
        </div>

        <Button asChild variant="secondary" className="self-start">
          <Link href={`/events/${item.id}/edit`}>
            {translate("button.edit")}
          </Link>
        </Button>
      </div>

      {/* 🔥 Sekcja GOŚCIE – bardzo wyeksponowana, mobile-first */}
      <Card className="ring-1 ring-black/5">
        <CardContent className="p-6 space-y-5">
          {/* Pasek nagłówka z call-to-action */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-emerald-100 p-2">
                <Users className="h-5 w-5 text-emerald-700" />
              </span>
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  {translate("guests.header.title") ?? "Zaproszeni goście"}
                </h2>
                <p className="text-sm text-gray-600">
                  {translate("guests.header.subtitle") ??
                    "Dodaj gości i wyślij im spersonalizowane linki do zaproszeń."}
                </p>
              </div>
            </div>

            {/* <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button
                className="cursor-pointer"
                variant="secondary"
                size="sm"
                onClick={() =>
                  bulkAddGuests([
                    // PRZYKŁAD IMPORTU – docelowo z CSV/textarea
                    // { fullName: "Marta i Adrian z dziećmi" },
                  ])
                }
                disabled={guestsLoading}
              >
                {translate("guests.actions.import") ?? "Importuj wielu"}
              </Button>
            </div> */}
          </div>

          {/* Informacja o prywatności / personalizacji */}
          <div className="rounded-xl bg-amber-50 p-3 text-sm ring-1 ring-amber-200">
            <div className="flex items-start gap-2 text-amber-800">
              <Info className="mt-0.5 h-4 w-4" />
              <p>
                {translate("guests.notice.public_name") ??
                  "Link do zaproszenia jest publiczny. Na karcie zaproszenia będzie widoczna nazwa gościa dokładnie tak, jak ją wpiszesz (np. „Marta i Adrian z dziećmi”)."}
              </p>
            </div>
          </div>

          {/* Statystyki RSVP */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatPill
              label={translate("guests.stats.accepted") ?? "Potwierdzeni"}
              value={String(stats?.accepted ?? 0)}
              tone="success"
            />
            <StatPill
              label={translate("guests.stats.tentative") ?? "Oczekujący"}
              value={String(stats?.tentative ?? 0)}
              tone="muted"
            />
            <StatPill
              label={translate("guests.stats.declined") ?? "Odrzuceni"}
              value={String(stats?.declined ?? 0)}
              tone="danger"
            />
          </div>

          <Separator />

          {/* Szybkie dodanie pojedynczego gościa */}
          <form
            id="quick-add"
            onSubmit={onQuickAddGuest}
            className="grid grid-cols-1 gap-3 sm:grid-cols-6"
          >
            <div className="sm:col-span-3">
              <label className="mb-1 block text-xs font-medium text-gray-600">
                {translate("guests.form.full_name") ?? "Imię i nazwisko / opis"}
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={
                  translate("guests.form.full_name_ph") ??
                  "np. „Marta i Adrian z dziećmi”"
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600">
                {translate("guests.form.group_name") ?? "Grupa (opcjonalnie)"}
              </label>
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder={
                  translate("guests.form.group_name_ph") ??
                  "Rodzina, Przyjaciele..."
                }
              />
            </div>
            <div className="sm:col-span-1 flex items-end">
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={guestsLoading || !fullName.trim()}
              >
                <Plus className="mr-2 h-4 w-4" />
                {translate("guests.form.add_btn") ?? "Dodaj"}
              </Button>
            </div>
          </form>

          {/* Lista gości */}
          <div className="rounded-2xl border">
            {item.invitees.length === 0 ? (
              <div className="p-4 text-sm text-gray-600">
                {translate("guests.empty") ??
                  "Brak gości. Dodaj pierwszego powyżej."}
              </div>
            ) : (
              <ul className="divide-y">
                {item.invitees.map((g) => {
                  console.log("GUETS: ", g);
                  const display =
                    g.fullName || translate("guests.unknown") || "Gość";
                  return (
                    <li
                      key={g.id ?? display}
                      className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="truncate font-medium">{display}</div>
                          {/* ⇩ status obok nazwy, widoczny na mobile */}
                          <StatusPill status={g.invitation?.status} />
                        </div>
                        {g.groupName && (
                          <div className="truncate text-sm text-gray-600">
                            {g.groupName}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          className="cursor-pointer"
                          size="sm"
                          variant="secondary"
                          onClick={() => onCopyLink(g.id!)}
                          disabled={guestsLoading || !g.id}
                          title={
                            translate("guests.actions.copy_link_tt") ??
                            "Utwórz i skopiuj link"
                          }
                        >
                          <Link2 className="mr-2 h-4 w-4" />
                          {translate("guests.actions.copy_link") ?? "Link"}
                        </Button>

                        <Button
                          className="cursor-pointer"
                          size="sm"
                          variant="secondary"
                          onClick={() => onGenerateAndShare(g.id!, display)}
                          disabled={guestsLoading || !g.id}
                          title={
                            translate("guests.actions.share_tt") ??
                            "Utwórz i udostępnij"
                          }
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          {translate("guests.actions.share") ?? "Udostępnij"}
                        </Button>

                        <Button
                          className="cursor-pointer"
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteGuest(g.id!, display)}
                          disabled={guestsLoading || !g.id}
                          title={
                            translate("guests.actions.delete_tt") ??
                            "Usuń gościa"
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {translate("button.delete")}
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Opis + Preview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="ring-1 ring-black/5">
          <CardContent className="p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              {translate("events.details.description")}
            </h2>
            {item.description ? (
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-800">
                {item.description}
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                {translate("events.details.no_description")}
              </p>
            )}
            <Separator className="my-6" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              {translate("events.details.preview")}
            </h3>
            <div className="mt-3 rounded-2xl border border-black/5 p-4">
              <Preview
                title={item.title}
                description={item.description ?? undefined}
                date={item.date}
                location={item.location ?? undefined}
                program={program}
              />
            </div>
          </CardContent>
        </Card>

        {/* Program */}
        <Card className="ring-1 ring-black/5">
          <CardContent className="p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              {translate("events.details.schedule")}
            </h2>
            {program.length ? (
              <ul className="mt-3 space-y-3">
                {program
                  .slice()
                  .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                  .map((p, i) => (
                    <li
                      key={`${p.dayIndex}-${p.time}-${i}`}
                      className="flex items-start gap-3 rounded-xl bg-muted/40 p-3"
                    >
                      <span className="mt-1 text-xs font-semibold text-gray-600">
                        {p.time}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-medium">{p.header}</div>
                        {p.subheader && (
                          <div className="truncate text-sm text-gray-600">
                            {p.subheader}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                {translate("events.details.no_program")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SkeletonHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      <div className="h-7 w-80 animate-pulse rounded bg-muted" />
      <div className="h-5 w-64 animate-pulse rounded bg-muted" />
    </div>
  );
}

/* ======= Mały, wielorazowy komponent statystyki ======= */
function StatPill({
  label,
  value,
  tone = "muted",
}: {
  label: string;
  value: string;
  tone?: "success" | "danger" | "muted";
}) {
  const tones: Record<typeof tone, string> = {
    success: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    danger: "bg-red-50 text-red-800 ring-red-200",
    muted: "bg-gray-50 text-gray-800 ring-gray-200",
  };
  return (
    <div
      className={`rounded-xl px-3 py-2 text-sm ring-1 ${tones[tone]} flex items-center justify-between`}
    >
      <span className="font-medium">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function StatusPill({
  status,
}: {
  status: "PENDING" | "ACCEPTED" | "DECLINED" | undefined;
}) {
  const s = status ?? "PENDING";

  const map: Record<
    "PENDING" | "ACCEPTED" | "DECLINED",
    { label: string; cls: string }
  > = {
    PENDING: {
      label: translate("guests.status.pending") ?? "Oczekujące",
      cls: "bg-gray-50 text-gray-800 ring-1 ring-gray-200",
    },
    ACCEPTED: {
      label: translate("guests.status.accepted") ?? "Potwierdzone",
      cls: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
    },
    DECLINED: {
      label: translate("guests.status.declined") ?? "Odrzucone",
      cls: "bg-red-50 text-red-800 ring-1 ring-red-200",
    },
  };

  return (
    <span
      className={`inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium ${map[s].cls}`}
    >
      {map[s].label}
    </span>
  );
}
