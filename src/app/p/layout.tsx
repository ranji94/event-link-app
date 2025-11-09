import "../globals.css";
import type { Metadata } from "next";
import Providers from "../providers";
import { translate } from "@/locales";
import { Inter } from "next/font/google";
import { Footer } from "@/components/common/Footer";
import { PreviewFooter } from "@/components/p/PreviewFooter";

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
        className={`${inter.className} min-h-screen flex flex-col bg-black text-white`}
      >
        <Providers>{children}</Providers>
        <PreviewFooter />
      </body>
    </html>
  );
}
