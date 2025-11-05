"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
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
        toast.error(e?.message ?? translate("errors.not_found"));
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
      toast.error(e?.message ?? translate("errors.unknown"));
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* 🔥 Wybrany szablon z programem */}
        <Card className="ring-1 ring-black/5">
          <CardContent className="p-0">
            <SelectedPreview
              title={event.title}
              description={event.description ?? undefined}
              date={event.date}
              location={event.location ?? undefined}
              program={event.program ?? []}
              inviteeName={invitee.fullName}
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Akcje RSVP */}
        {rsvpStatus ? (
          <Card className="ring-1 ring-black/5">
            <CardContent className="p-6 text-center">
              {rsvpStatus === "ACCEPTED" ? (
                <div className="flex flex-col items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="h-8 w-8" />
                  <p>
                    {translate("invitation.thanks_accept") ??
                      "Cieszymy się, że będziesz!"}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-red-600">
                  <XCircle className="h-8 w-8" />
                  <p>
                    {translate("invitation.thanks_decline") ??
                      "Szkoda, że się nie zobaczymy."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={sending}
              onClick={() => handleRsvp("ACCEPTED")}
            >
              {translate("invitation.buttons.accept") ?? "Wezmę udział"}
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
              disabled={sending}
              onClick={() => handleRsvp("DECLINED")}
            >
              {translate("invitation.buttons.decline") ??
                "Nie mogę uczestniczyć"}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
