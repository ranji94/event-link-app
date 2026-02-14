import type { TemplateDef } from "./types";
export type { TemplateDef, PreviewProps } from "./types";

import { birthday30Elegant } from "./variants/birthday-30-elegant";
import { thirtyBlackGoldNeon } from "./variants/birthday-black-gold";
import { minimalistNavy } from "./variants/minimalist-navy";
import { babyShowerDreams } from "./variants/baby-shower-teddy";
import { newYearGlamour } from "./variants/new-year-glamour";
import { baptistGoldenPigeon } from "./variants/baptist-golden-pigeon";
import { baptismBlessing } from "./variants/baptism-blessing";
import { EventKind } from "@/common/enum";
import { babyShowerBunny } from "./variants/baby-shower-bunny";
import { birthday30Trendy } from "./variants/birthday-30-dirty";
import { weddingGenZTrendy } from "./variants/wedding-aesthetic";
import { wildWestUniversal } from "./variants/wild-west";
import { birthday18Golden } from "./variants/birthday-18-gold";
import { communionElegant } from "./variants/communion-elegant";

export const templates: TemplateDef[] = [
  birthday30Elegant,
  minimalistNavy,
  thirtyBlackGoldNeon,
  babyShowerDreams,
  newYearGlamour,
  baptistGoldenPigeon,
  baptismBlessing,
  babyShowerBunny,
  birthday30Trendy,
  weddingGenZTrendy,
  wildWestUniversal,
  birthday18Golden,
  communionElegant,
];

export const getTemplatesByEventKind = (
  eventKind: EventKind
): TemplateDef[] => {
  const tematic: TemplateDef[] =
    {
      [EventKind.BABY_SHOWER]: [babyShowerDreams, babyShowerBunny],
      [EventKind.BAPTISM]: [baptismBlessing, baptistGoldenPigeon],
      [EventKind.BIRTHDAY_18]: [birthday18Golden],
      [EventKind.BIRTHDAY_30]: [
        birthday30Elegant,
        thirtyBlackGoldNeon,
        birthday30Trendy,
      ],
      [EventKind.BIRTHDAY_50]: [],
      [EventKind.HOLY_COMMUNION]: [communionElegant],
      [EventKind.WEDDING]: [weddingGenZTrendy],
      [EventKind.OTHER]: [newYearGlamour],
    }[eventKind] || [];

  const universal = [minimalistNavy, wildWestUniversal];

  return [...tematic, ...universal];
  // return templates;
};
