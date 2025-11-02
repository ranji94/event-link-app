import { Container } from "@/components/common/Container";
import Link from "next/link";
import { translate } from "@/locales";
import { AppLogo } from "@/components/common/AppLogo";
import { ProfileMenu } from "@/components/common/ProfileMenu";
import { AuthHydrator } from "@/components/common/AuthHydrator";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-gray-50">
      <header className="sticky top-0 z-11 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <Container className="flex items-center justify-between py-3">
          <Link href="/events" className="text-lg font-semibold tracking-tight">
            <AppLogo />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-gray-700 md:flex">
            <Link href="/events" className="hover:text-gray-900">
              {translate("nav.my_events")}
            </Link>
            <Link href="/events/new" className="hover:text-gray-900">
              {translate("nav.create_new")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Notifications - to be implemented in the future
            <button
              aria-label={translate("aria.notifications")}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
            </button> */}
            <ProfileMenu initials="A.P" />
          </div>
        </Container>
      </header>

      <AuthHydrator />

      <main>
        <Container className="py-8">{children}</Container>
      </main>
    </div>
  );
}
