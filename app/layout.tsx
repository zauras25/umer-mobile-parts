import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SITE_CONFIG } from "@/lib/constants/site";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
