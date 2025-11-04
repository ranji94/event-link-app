import {
  Baby,
  Cake,
  HelpCircle,
  PartyPopper,
  Wine,
  Heart,
  Church,
} from "lucide-react";
import { EventKind } from "@/common/enum";

export const KIND_MAP = {
  [EventKind.WEDDING]: {
    label: "Ślub/Wesele",
    Icon: Heart,
    bg: "bg-rose-100",
    fg: "text-rose-600",
  },
  [EventKind.BAPTISM]: {
    label: "Chrzciny",
    Icon: Baby,
    bg: "bg-sky-100",
    fg: "text-sky-600",
  },
  [EventKind.BIRTHDAY_18]: {
    label: "Osiemnastka",
    Icon: PartyPopper,
    bg: "bg-violet-100",
    fg: "text-violet-600",
  },
  [EventKind.BIRTHDAY_30]: {
    label: "Trzydziestka",
    Icon: Wine,
    bg: "bg-green-100",
    fg: "text-green-700",
  },
  [EventKind.BIRTHDAY_50]: {
    label: "Pięćdziesiątka",
    Icon: Cake,
    bg: "bg-orange-100",
    fg: "text-orange-700",
  },
  [EventKind.BABY_SHOWER]: {
    label: "Baby Shower",
    Icon: Baby,
    bg: "bg-lime-100",
    fg: "text-lime-700",
  },
  [EventKind.HOLY_COMMUNION]: {
    label: "Pierwsza komunia święta",
    Icon: Church,
    bg: "bg-amber-100",
    fg: "text-amber-700",
  },
  [EventKind.OTHER]: {
    label: "Inne",
    Icon: HelpCircle,
    bg: "bg-gray-200",
    fg: "text-gray-700",
  },
} as const;
