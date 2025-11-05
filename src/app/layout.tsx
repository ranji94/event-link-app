import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { GlobalOverlay } from "@/components/common/global-overlay";
import { translate } from "@/locales";

export const metadata: Metadata = {
  title: `EventSpot | ${translate("meta.title")}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <GlobalOverlay />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
