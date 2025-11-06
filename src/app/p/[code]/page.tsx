"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  publicInvitationsControllerGet,
  publicInvitationsControllerRsvp,
} from "@/entities/public-invitations";
import type {
  PublicInvitationGetResponseDto,
  PublicRsvpDto,
} from "@/entities/api.gen.schemas";
import { translate } from "@/locales";
import { Loader2 } from "lucide-react";
import { getTemplateById } from "@/components/templates/TemplatePicker";
import { templates } from "@/templates/registry";

export default function PublicInvitationPage() {
  const { code } = useParams<{ code: string }>();
  const [data, setData] = React.useState<PublicInvitationGetResponseDto | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);
  const [rsvpStatus, setRsvpStatus] = React.useState<
    "ACCEPTED" | "DECLINED" | null
  >(null);
  const [sending, setSending] = React.useState(false);

  React.useEffect(() => {
    async function load() {
      try {
        const res = await publicInvitationsControllerGet(code, {
          credentials: "include",
        });
        setData(res as any);
      } catch (e: any) {
        toast.error(e?.message ?? translate("invitation.errors.not_found"));
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [code]);

  async function handleRsvp(status: "ACCEPTED" | "DECLINED") {
    if (!data) return;
    try {
      setSending(true);
      const dto: PublicRsvpDto = { status };
      await publicInvitationsControllerRsvp(code, dto, {
        credentials: "include",
      });
      setRsvpStatus(status);
      toast.success(
        status === "ACCEPTED"
          ? translate("invitation.rsvp.accepted") ??
              "Dziękujemy za potwierdzenie!"
          : translate("invitation.rsvp.declined") ?? "Dziękujemy za informację."
      );
    } catch (e: any) {
      toast.error(e?.message ?? translate("invitation.errors.unknown"));
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        {translate("invitation.not_found") ?? "Nie znaleziono zaproszenia."}
      </div>
    );
  }

  const { event, invitee } = data;
  const SelectedPreview =
    getTemplateById(event.templateKey ?? templates[0]?.id)?.Preview ??
    templates[0].Preview;

  return (
    <main className="min-h-screen">
      <SelectedPreview
        title={event.title}
        description={event.description ?? undefined}
        date={event.date}
        location={event.location ?? undefined}
        program={event.program ?? []}
        inviteeName={invitee.fullName}
        rsvpStatus={rsvpStatus}
        sending={sending}
        onAccept={() => handleRsvp("ACCEPTED")}
        onDecline={() => handleRsvp("DECLINED")}
      />
    </main>
  );
}
