import { translate } from "@/locales";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} EventSpot.{" "}
            {translate("footer.copyright")}
          </p>

          {/* Linki */}
          <nav
            className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground"
            aria-label={translate("footer.nav_label")}
          >
            <Link
              href="/about"
              className="transition-colors hover:text-foreground"
            >
              {translate("footer.links.about")}
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              {translate("footer.links.terms")}
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              {translate("footer.links.privacy")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
