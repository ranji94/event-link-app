import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";
import Link from "next/link";

export function EmptyState() {
  return (
    <Card className="text-center">
      <CardContent className="py-12">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <PartyPopper className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold">
          Nie masz jeszcze żadnych wydarzeń
        </h3>
        <p className="text-muted-foreground mt-1">
          Utwórz pierwsze wydarzenie, aby rozpocząć planowanie.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Stwórz nowe</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
