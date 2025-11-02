import { EventKind } from "@/common/enum";
import { translate } from "@/locales";

export function getNewEventTexts(kind?: EventKind): {
  pageTitle: string;
  titlePlaceholder: string;
} {
  const k: EventKind = kind ?? EventKind.OTHER;
  return {
    pageTitle: translate(`events.new.header.${k}`),
    titlePlaceholder: translate(`events.new.placeholders.title_by_kind.${k}`),
  };
}
