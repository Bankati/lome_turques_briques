"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-navy px-4 pb-8 pt-10 sm:px-6 lg:px-8">
      {/* Fond décoratif briques */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <pattern
            id="footer-bricks"
            x="0"
            y="0"
            width="80"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect x="1" y="1" width="37" height="18" rx="3" fill="white" />
            <rect x="42" y="1" width="37" height="18" rx="3" fill="white" />
            <rect x="21" y="21" width="37" height="18" rx="3" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-bricks)" />
        </svg>
      </div>

      {/* Carte blanche */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Bande décorative bleue */}
        <div className="h-1 w-full bg-gradient-to-r from-primary-navy via-primary-light to-primary-dark" />

        {/* Grille */}
        <div className="grid grid-cols-1 gap-10 px-8 pb-8 pt-10 sm:px-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
                <Image
                  src="/images/logo.jpg"
                  alt="Lomé Turque Brique"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading text-base font-bold leading-tight text-gray-900">
                Lomé Turque Brique
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              Votre partenaire de confiance pour des matériaux de construction de qualité supérieure
              au Togo depuis plus de 7 ans.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/lome.turc.brique"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 transition-colors hover:text-primary-dark"
              >
                <Facebook size={20} strokeWidth={2} />
              </a>
              <a
                href="https://www.tiktok.com/@lome.turc.brique?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-400 transition-colors hover:text-gray-900"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/lometurc?igsh=MTlqNmk4cnpldTQwbQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 transition-colors hover:text-pink-500"
              >
                <Instagram size={20} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Col 2 — Liens rapides */}
          <div>
            <h4 className="mb-5 text-sm font-bold text-gray-900">Liens rapides</h4>
            <ul className="space-y-3.5">
              {[
                { href: "/", label: "Accueil" },
                { href: "/produits/", label: "Nos produits" },
                { href: "/apropos/", label: "À propos" },
                { href: "/contact/", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-primary-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Produits */}
          <div>
            <h4 className="mb-5 text-sm font-bold text-gray-900">Nos produits</h4>
            <ul className="space-y-3.5">
              {["Briques Creuses", "Briques Pleines", "Modèle Turque", "Hourdies", "Pavés"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/produits/"
                      className="text-sm text-gray-500 transition-colors hover:text-primary-dark"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="mb-5 text-sm font-bold text-gray-900">Nous contacter</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-lighter">
                  <MapPin size={14} className="text-primary-dark" />
                </div>
                <span className="text-sm leading-relaxed text-gray-500">
                  Nationale N°1, sous le pont Tsikpo-Noukoudji, Adétikopé, Lomé, Togo
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-lighter">
                  <Mail size={14} className="text-primary-dark" />
                </div>
                <a
                  href="mailto:lometurcbrique@gmail.com"
                  className="text-sm text-gray-500 transition-colors hover:text-primary-dark"
                >
                  lometurcbrique@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-lighter">
                  <Phone size={14} className="text-primary-dark" />
                </div>
                <a
                  href="tel:+22870837575"
                  className="text-sm text-gray-500 transition-colors hover:text-primary-dark"
                >
                  +228 70 83 75 75
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="mx-8 h-px bg-gray-100 sm:mx-12" />

        {/* Barre du bas */}
        <div className="flex flex-col items-center justify-between gap-3 px-8 py-5 sm:flex-row sm:px-12">
          <p className="text-xs text-gray-400">© 2025 Lomé Turque Brique. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {["Mentions légales", "Politique de confidentialité", "Plan du site"].map((label) => (
              <Link
                key={label}
                href="/contact/"
                className="text-xs text-gray-400 transition-colors hover:text-gray-700"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="h-4" />
    </footer>
  );
}
