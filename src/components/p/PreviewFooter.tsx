import { translate } from "@/locales";
import Link from "next/link";

export const PreviewFooter = () => {
  return (
    <footer
      className="
         bottom-0 left-0 right-0 z-50
        border-t border-white/10
        backdrop-blur-md backdrop-saturate-150
          dark:bg-black/20
      "
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          {/* Copyright */}
          <Link
            href="/"
            className="text-center text-xs text-white/70 hover:text-white transition-colors"
          >
            © {new Date().getFullYear()} EventSpot.{" "}
            {translate("footer.copyright")}
          </Link>

          {/* Linki */}
          <nav
            className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/70"
            aria-label={translate("footer.nav_label")}
          >
            <Link href="/about" className="transition-colors hover:text-white">
              {translate("footer.links.about")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              {translate("footer.links.terms")}
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              {translate("footer.links.privacy")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
