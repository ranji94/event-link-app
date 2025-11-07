"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema, type EventFormValues } from "./schema";

export function useEventForm(initial?: Partial<EventFormValues>) {
  return useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: { ...initial },
  });
}
