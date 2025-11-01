import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center bg-background text-foreground">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">EventSpot</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Zarządzanie wydarzeniami jeszcze nigdy nie było tak proste.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            href="/login"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Zaloguj
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-primary px-5 py-2 text-sm font-medium text-primary hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Zarejestruj
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EventSpot. Wszystkie prawa zastrzeżone.
      </footer>
    </main>
  );
}
