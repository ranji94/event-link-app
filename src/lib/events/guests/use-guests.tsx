"use client";

import * as React from "react";
import { toast } from "sonner";
import { translate } from "@/locales";
import { useConfirm } from "@/components/common/confirm/confirm-provider";

import {
  invitationsControllerCreateForInvitee,
  invitationsControllerSendEmail,
  invitationsControllerStats,
} from "@/entities/invitations";

import {
  inviteesControllerList,
  inviteesControllerBulk,
  inviteesControllerDelete,
} from "@/entities/invitees";

import type {
  CreateInviteeDto,
  InvitationsStatsDto,
} from "@/entities/api.gen.schemas";

export type Guest = CreateInviteeDto & {
  id?: string;
  invitationUrl?: string;
  status?: "PENDING" | "ACCEPTED" | "DECLINED" | "TENTATIVE";
  rsvpCount?: number;
};

export function useGuests(eventId: string) {
  const confirm = useConfirm();

  const [guests, setGuests] = React.useState<Guest[]>([]);
  const [stats, setStats] = React.useState<InvitationsStatsDto | null>(null);
  const [loading, setLoading] = React.useState(false);

  /** 🔹 Pobiera listę gości (z powiązanym statusem zaproszenia) */
  const listGuests = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await inviteesControllerList(eventId, {
        credentials: "include",
      });
      if (!res) throw new Error(translate("guests.errors.no_response"));

      console.log("RES DATA:", res);

      // Zakładamy, że backend zwraca: invitee + invitation { publicUrl, status, rsvpCount }
      const normalized = (res as any[]).map((g) => ({
        id: g.id,
        fullName: g.fullName,
        email: g.email ?? undefined,
        phone: g.phone ?? undefined,
        seats: g.seats ?? undefined,
        groupName: g.groupName ?? undefined,
        notes: g.notes ?? undefined,
        status: g.invitation?.status ?? "PENDING",
        invitationUrl: g.invitation?.publicUrl ?? undefined,
        rsvpCount: g.invitation?.rsvpCount ?? undefined,
      })) as Guest[];

      setGuests(normalized);
    } catch (e: any) {
      toast.error(e?.message ?? translate("guests.errors.unknown"));
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  /** 🔹 Dodaje wielu gości naraz */
  const bulkAddGuests = React.useCallback(
    async (items: CreateInviteeDto[]) => {
      if (!items.length) return;
      try {
        setLoading(true);
        await inviteesControllerBulk(
          eventId,
          { items },
          { credentials: "include" }
        );
        toast.success(
          translate("guests.toasts.added", { count: items.length })
        );
        await listGuests();
      } catch (e: any) {
        toast.error(e?.message ?? translate("guests.errors.unknown"));
      } finally {
        setLoading(false);
      }
    },
    [eventId, listGuests]
  );

  /** 🔹 Tworzy (lub zwraca istniejące) zaproszenie i kopiuje link */
  const createInvitation = React.useCallback(
    async (inviteeId: string) => {
      try {
        setLoading(true);
        const res = await invitationsControllerCreateForInvitee(
          eventId,
          inviteeId,
          { frontendBase: window.location.origin },
          { credentials: "include" }
        );

        const code = (res as any)?.code ?? "unknown";
        const url =
          (res as any)?.publicUrl ?? `${window.location.origin}/p/${code}`;

        await navigator.clipboard.writeText(url);
        toast.success(translate("guests.toasts.link_copied"));
        await listGuests();
        return { ok: true as const, url };
      } catch (e: any) {
        toast.error(e?.message ?? translate("guests.errors.unknown"));
        return { ok: false as const };
      } finally {
        setLoading(false);
      }
    },
    [eventId, listGuests]
  );

  /** 🔹 Wysyła e-mail z zaproszeniem */
  const sendInvitationEmail = React.useCallback(
    async (invitationId: string) => {
      try {
        setLoading(true);
        await invitationsControllerSendEmail(eventId, invitationId, {
          credentials: "include",
        });
        toast.success(translate("guests.toasts.email_sent"));
      } catch (e: any) {
        toast.error(e?.message ?? translate("guests.errors.unknown"));
      } finally {
        setLoading(false);
      }
    },
    [eventId]
  );

  /** 🔹 Statystyki RSVP */
  const loadStats = React.useCallback(async () => {
    try {
      const res = await invitationsControllerStats(eventId, {
        credentials: "include",
      });
      setStats((res as any) ?? null);
    } catch (e: any) {
      toast.error(e?.message ?? translate("guests.errors.unknown"));
    }
  }, [eventId]);

  /** 🔹 Usuwa gościa */
  const deleteGuest = React.useCallback(
    async (id: string, fullName: string) => {
      const yes = await confirm({
        title: translate("guests.confirm.delete.title"),
        description: translate("guests.confirm.delete.desc", {
          name: fullName,
        }),
        confirmText: translate("button.delete"),
        cancelText: translate("button.cancel"),
        danger: true,
      });
      if (!yes) return;

      try {
        setLoading(true);
        await inviteesControllerDelete(eventId, id, { credentials: "include" });
        setGuests((prev) => prev.filter((g) => g.id !== id));
        toast.success(translate("guests.toasts.deleted"));
      } catch (e: any) {
        toast.error(e?.message ?? translate("guests.errors.unknown"));
      } finally {
        setLoading(false);
      }
    },
    [confirm, eventId]
  );

  /** 🔹 Udostępnianie linku */
  const shareInvitation = React.useCallback(
    async (url: string, fullName: string) => {
      const shareText = translate("guests.share.text", { name: fullName, url });
      if (navigator.share) {
        try {
          await navigator.share({
            title: translate("guests.share.title"),
            text: shareText,
            url,
          });
          toast.success(translate("guests.toasts.shared"));
          return;
        } catch {
          /* anulowano */
        }
      }
      await navigator.clipboard.writeText(`${shareText}\n${url}`);
      toast.success(translate("guests.toasts.link_copied"));
    },
    []
  );

  return {
    guests,
    stats,
    loading,

    listGuests,
    bulkAddGuests,

    createInvitation,
    sendInvitationEmail,

    loadStats,
    deleteGuest,

    shareInvitation,
  };
}
