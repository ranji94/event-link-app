import { EventKind } from "@/common/enum";

export type EventTypeDef = {
  kind: EventKind;
  label: string;
  href: string;
  bg: string;
  fg: string;
  icon: React.ReactNode;
};

export type EventListItem = {
  id: string;
  title: string;
  description?: string | null;
  date?: string | null; // ISO string
  location?: string | null;
  slug: string;
  kind: EventKind;
  templateKey?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
