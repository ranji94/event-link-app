"use client";
import { Card } from "@/components/ui/card";

export function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {children}
      </Card>
    </div>
  );
}
