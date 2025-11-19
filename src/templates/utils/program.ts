import * as Lucide from "lucide-react";

export type ProgramItem = {
  header: string;
  subheader?: string | null;
  time: string;
  position?: number | null;
  icon?: keyof typeof Lucide | null;
};

type NormalizedProgramItem = ProgramItem & {
  _pos: number;
};

export function normalizeProgram(
  program?: ProgramItem[] | null
): NormalizedProgramItem[] {
  if (!program || program.length === 0) return [];
  return program
    .map((it, idx) => ({
      ...it,
      _pos: typeof it.position === "number" ? it.position : idx,
    }))
    .sort((a, b) => a._pos - b._pos);
}
