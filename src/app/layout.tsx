import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { GlobalOverlay } from "@/components/common/global-overlay";

export const metadata: Metadata = {
  title: "EventSpot",
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
