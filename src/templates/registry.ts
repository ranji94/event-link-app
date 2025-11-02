import type { TemplateDef } from "./types";
export type { TemplateDef, PreviewProps } from "./types";

import { classicRose } from "./variants/classic-rose";
import { minimalIndigo } from "./variants/minimal-indigo";
import { darkElegant } from "./variants/dark-elegant";

export const templates: TemplateDef[] = [
  classicRose,
  minimalIndigo,
  darkElegant,
];
