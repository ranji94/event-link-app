import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { GlobalOverlay } from "@/components/common/global-overlay";
import { translate } from "@/locales";
import { Inter } from "next/font/google";
import { Footer } from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `EventSpot | ${translate("meta.title")}`,
    template: "%s | EventSpot",
  },
  description: translate("meta.description"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="h-full scroll-smooth">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-background text-foreground`}
      >
        <GlobalOverlay />
        <main className="flex-1">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
