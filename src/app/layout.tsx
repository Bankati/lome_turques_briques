import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const viewport: Viewport = {
  themeColor: "#065A96",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Lomé Turque Brique — Briques de qualité au Togo",
  description:
    "Lomé Turque Brique produit des briques solides et esthétiques pour vos constructions modernes. Alliant le savoir-faire turque et les ressources locales.",
  keywords:
    "briques Lomé, construction Togo, briques turques, matériaux construction, brique 12 creux, pavés Lomé",
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  openGraph: {
    title: "Lomé Turque Brique",
    description: "Briques de qualité au service du Togo",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col">
        {!isAdmin && <Navbar />}
        <main className={isAdmin ? "min-h-screen" : "flex-1"}>{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppButton />}
        <Analytics />
      </body>
    </html>
  );
}
