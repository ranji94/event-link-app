import { z } from "zod";
import { translate } from "@/locales";
import { DISPLAY_REGEX, parseDisplayToDate } from "@/common/utils";

export const eventFormSchema = z
  .object({
    title: z
      .string()
      .min(3, { message: translate("events.new.errors.title_min") }),
    description: z.string().optional(),

    // główna data wydarzenia - w formacie dd.MM.yyyy hh:mm
    datetime: z.string().regex(DISPLAY_REGEX, {
      message: translate("events.new.errors.date_format"),
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
