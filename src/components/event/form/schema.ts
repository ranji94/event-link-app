import { z } from "zod";
import { translate } from "@/locales";

export const eventFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: translate("events.new.errors.title_min") }),
  description: z.string().optional(),
  datetime: z
    .string()
    .min(1, { message: translate("events.new.errors.date_required") }),
  location: z.string().optional(),
  templateKey: z.string(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

export const defaultEventFormValues: EventFormValues = {
  title: "",
  description: "",
  datetime: "",
  location: "",
  templateKey: "",
};
