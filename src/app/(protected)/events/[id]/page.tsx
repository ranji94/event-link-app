"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, ArrowLeft, Info } from "lucide-react";

import { useEvents, type EventListItem } from "@/lib/events/use-events";
import { programControllerList } from "@/entities/program";
import type { CreateProgramItemDto } from "@/entities/api.gen.schemas";
import { KIND_MAP } from "@/lib/events/event-kind-map";
import { translate } from "@/locales";
import { formatDate } from "@/common/utils";
import { getTemplateById } from "@/components/templates/TemplatePicker";
import { templates } from "@/templates/registry";

// Prostokątne, pastelowe tła jak w kafelkach listy:
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

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const ev = await getOne(params.id);
        if (!mounted) return;
        if (ev.ok) setItem(ev.data);
        else setError(ev.message);

        // program (best-effort)
        const body = await programControllerList(params.id, {
          credentials: "include",
        });

        // API zwraca tablicę; typ w orvalu jest ogólny -> rzut typów
        // Jeżeli backend ma inne właściwości, pokażemy to co mamy.
        // :contentReference[oaicite:2]{index=2}
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
    return () => {
      mounted = false;
    };
  }, [getOne, params.id]);

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
