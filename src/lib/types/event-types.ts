import { EventKind } from "@/common/enum";

export type EventTypeDef = {
  kind: EventKind;
  label: string;
  href: string;
  bg: string;
  fg: string;
  icon: React.ReactNode;
};
