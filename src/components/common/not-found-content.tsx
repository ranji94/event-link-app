"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { translate } from "@/locales";
import { TriangleAlert } from "lucide-react";

export function NotFoundContent() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border bg-card p-10 text-center shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border">
          <TriangleAlert className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">
            {translate("not_found_title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {translate("not_found_description")}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => router.back()}>
            {translate("not_found_go_back")}
          </Button>
          <Button asChild variant="ghost">
            <Link href="/dashboard">{translate("not_found_go_home")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
