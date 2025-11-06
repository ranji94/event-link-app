import type { TemplateDef } from "./types";
export type { TemplateDef, PreviewProps } from "./types";

import { weddingBotanicalGold } from "./variants/wedding-botanical-gold";
import { birthdayPastelConfetti } from "./variants/birthday-pastel-confetti";
import { birthday30Elegant } from "./variants/birthday-30-elegant";
import { thirtyBlackGoldNeon } from "./variants/birthday-black-gold";
import { minimalistNavy } from "./variants/minimalist-navy";

export const templates: TemplateDef[] = [
  weddingBotanicalGold,
  birthdayPastelConfetti,
  birthday30Elegant,
  minimalistNavy,
  thirtyBlackGoldNeon,
];
