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
      <header className="sticky top-0 z-[800] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
        <Container className="flex items-center justify-between py-3">
          <Link
            href="/events"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-gray-900 hover:opacity-80"
          >
            <AppLogo />
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <Link href="/events" className="hover:text-gray-900">
              {translate("nav.my_events")}
            </Link>
            <Link href="/" className="hover:text-gray-900">
              {translate("nav.create_new")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ProfileMenu />
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
