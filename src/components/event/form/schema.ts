import { z } from "zod";
import { translate } from "@/locales";

// dd.MM.yyyy hh:mm  (np. 09.11.2025 18:30)
const DISPLAY_REGEX = /^\d{2}\.\d{2}\.\d{4}\s\d{2}:\d{2}$/;

function parseDisplayToDate(value: string): Date | null {
  if (!DISPLAY_REGEX.test(value)) return null;
  // dd.MM.yyyy hh:mm
  const [d, m, y, hh, mm] = [
    value.slice(0, 2),
    value.slice(3, 5),
    value.slice(6, 10),
    value.slice(11, 13),
    value.slice(14, 16),
  ];
  const year = Number(y);
  const monthIndex = Number(m) - 1; // 0-11
  const day = Number(d);
  const hour = Number(hh);
  const minute = Number(mm);
  const date = new Date(year, monthIndex, day, hour, minute, 0, 0);
  // prosta kontrola: czy komponenty się „nie rozlały” (np. 32 dzień)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== monthIndex ||
    date.getDate() !== day ||
    date.getHours() !== hour ||
    date.getMinutes() !== minute
  ) {
    return null;
  }
  return date;
}

export const eventFormSchema = z
  .object({
    title: z
      .string()
      .min(3, { message: translate("events.new.errors.title_min") }),
    description: z.string().optional(),

    // główna data wydarzenia - w formacie dd.MM.yyyy hh:mm
    datetime: z.string().regex(DISPLAY_REGEX, {
      message: translate("events.new.errors.date_format"), // dodaj tłumaczenie
    }),

    location: z.string().optional(),
    templateKey: z.string(),

    // 🆕
    dressCode: z.string().optional(),

    // 🆕
    rsvpDeadline: z
      .string()
      .regex(DISPLAY_REGEX, {
        message: translate("events.new.errors.date_format"),
      })
      .optional()
      .or(z.literal("").transform(() => undefined)), // pozwól przesłać pusty string z inputa
  })
  .superRefine((data, ctx) => {
    const now = new Date();

    // datetime >= now
    const dt = parseDisplayToDate(data.datetime);
    if (!dt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["datetime"],
        message: translate("events.new.errors.date_format"),
      });
    } else if (dt.getTime() < now.getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["datetime"],
        message: translate("events.new.errors.date_in_past"),
      });
    }

    // rsvpDeadline (opcjonalny)
    if (data.rsvpDeadline) {
      const rsvp = parseDisplayToDate(data.rsvpDeadline);
      if (!rsvp) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["rsvpDeadline"],
          message: translate("events.new.errors.date_format"),
        });
      } else {
        if (rsvp.getTime() < now.getTime()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["rsvpDeadline"],
            message: translate("events.new.errors.date_in_past"),
          });
        }
        if (dt && rsvp.getTime() > dt.getTime()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["rsvpDeadline"],
            message: translate("events.new.errors.rsvp_after_event"),
          });
        }
      }
    }
  });

export type EventFormValues = z.infer<typeof eventFormSchema>;

export const defaultEventFormValues: EventFormValues = {
  title: "",
  description: "",
  datetime: "",
  location: "",
  templateKey: "",
  // 🆕
  dressCode: "",
  rsvpDeadline: "",
};
