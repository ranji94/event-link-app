"use client";

import * as React from "react";

import {
  Heart,
  Baby,
  PartyPopper,
  GlassWater,
  Cake,
  BabyIcon,
  Church,
  HelpCircle,
} from "lucide-react";
import { EventKind } from "@/common/enum";

export const KIND_MAP: Record<
  EventKind,
  { label: string; Icon: React.ComponentType<any>; badge: string }
> = {
  [EventKind.WEDDING]: { label: "Ślub/Wesele", Icon: Heart, badge: "love" },
  [EventKind.BAPTISM]: { label: "Chrzest", Icon: Baby, badge: "baby" },
  [EventKind.BIRTHDAY_18]: {
    label: "Osiemnastka",
    Icon: PartyPopper,
    badge: "b-day",
  },
  [EventKind.BIRTHDAY_30]: {
    label: "Trzydziestka",
    Icon: GlassWater,
    badge: "30",
  },
  [EventKind.BIRTHDAY_50]: { label: "Pięćdziesiątka", Icon: Cake, badge: "50" },
  [EventKind.BABY_SHOWER]: {
    label: "Baby Shower",
    Icon: BabyIcon,
    badge: "baby",
  },
  [EventKind.HOLY_COMMUNION]: {
    label: "Pierwsza Komunia",
    Icon: Church,
    badge: "komunia",
  },
  [EventKind.OTHER]: { label: "Inne", Icon: HelpCircle, badge: "inne" },
};
