import { EventKind } from "@/common/enum";
import { EventTypeGrid } from "@/components/event/EventTypeGrid";
import { EventTypeDef } from "@/lib/types";
import { Baby, Cake, HelpCircle, PartyPopper, Wine, Heart } from "lucide-react";

const items: EventTypeDef[] = [
  {
    kind: EventKind.WEDDING,
    label: "Ślub/Wesele",
    href: "/events/new?kind=WEDDING",
    bg: "bg-rose-100",
    fg: "text-rose-600",
    icon: <Heart strokeWidth={1.75} />,
  },
  {
    kind: EventKind.BAPTISM,
    label: "Chrzciny",
    href: "/events/new?kind=BAPTISM",
    bg: "bg-sky-100",
    fg: "text-sky-600",
    icon: <Baby strokeWidth={1.75} />,
  },
  {
    kind: EventKind.BIRTHDAY_18,
    label: "Osiemnastka",
    href: "/events/new?kind=BIRTHDAY_18",
    bg: "bg-violet-100",
    fg: "text-violet-600",
    icon: <PartyPopper strokeWidth={1.75} />,
  },
  {
    kind: EventKind.BIRTHDAY_30,
    label: "Trzydziestka",
    href: "/events/new?kind=OTHER",
    bg: "bg-green-100",
    fg: "text-green-700",
    icon: <Wine strokeWidth={1.75} />,
  },
  {
    kind: EventKind.BIRTHDAY_50,
    label: "Pięćdziesiątka",
    href: "/events/new?kind=OTHER",
    bg: "bg-orange-100",
    fg: "text-orange-700",
    icon: <Cake strokeWidth={1.75} />,
  },
  {
    kind: EventKind.BABY_SHOWER,
    label: "Baby Shower",
    href: "/events/new?kind=OTHER",
    bg: "bg-amber-100",
    fg: "text-amber-700",
    icon: <Baby strokeWidth={1.75} />,
  },
  {
    kind: EventKind.HOLY_COMMUNION,
    label: "Pierwsza komunia święta",
    href: "/events/new?kind=OTHER",
    bg: "bg-gray-200",
    fg: "text-gray-700",
    icon: <HelpCircle strokeWidth={1.75} />,
  },
  {
    kind: EventKind.OTHER,
    label: "Inne",
    href: "/events/new?kind=OTHER",
    bg: "bg-gray-200",
    fg: "text-gray-700",
    icon: <HelpCircle strokeWidth={1.75} />,
  },
];

export default function WelcomePage() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Witaj w EventSpot!
        </h1>
        <p className="mt-2 max-w-prose text-gray-600">
          Zacznij planować swoje wydarzenie. Wybierz typ, by rozpocząć!
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">
          Wybierz typ wydarzenia:
        </h2>
        <EventTypeGrid items={items} />
      </div>
    </section>
  );
}
