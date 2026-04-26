"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-8">
      {/* Fond décoratif briques — conservé */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="footer-bricks" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
            <rect x="1" y="1" width="37" height="18" rx="3" fill="white" />
            <rect x="42" y="1" width="37" height="18" rx="3" fill="white" />
            <rect x="21" y="21" width="37" height="18" rx="3" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-bricks)" />
        </svg>
      </div>

      {/* Carte blanche */}
      <div className="relative max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-8 sm:px-12 pt-10 pb-8">

          {/* Colonne 1 — Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                <img
                  src="/images/logo.jpg"
                  alt="Lomé Turque Brique"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-bold text-gray-900 text-base leading-tight">
                Lomé Turque Brique
              </span>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Votre partenaire de confiance pour des matériaux de construction de qualité supérieure au Togo depuis plus de 7 ans.
            </p>

            {/* Réseaux sociaux — style minimaliste comme l'image */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/lome.turc.brique"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-700 hover:text-ltb-blue transition-colors"
              >
                <Facebook size={20} strokeWidth={2} />
              </a>
              <a
                href="https://www.tiktok.com/@lome.turc.brique?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/lometurc?igsh=MTlqNmk4cnpldTQwbQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                <Instagram size={20} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Colonne 2 — Liens rapides */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-5">Liens rapides</h4>
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
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Nos produits */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-5">Nos produits</h4>
            <ul className="space-y-3.5">
              {[
                "Briques Creuses",
                "Briques Pleines",
                "Modèle Turque",
                "Hourdies",
                "Pavés",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/produits/"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-5">Nous contacter</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-ltb-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-ltb-blue" />
                </div>
                <span className="text-gray-500 text-sm leading-relaxed">
                  Nationale N°1, sous le pont Tsikpo-Noukoudji, Adétikopé, Lomé, Togo
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ltb-blue/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-ltb-blue" />
                </div>
                <a
                  href="mailto:lometurcbrique@gmail.com"
                  className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                >
                  lometurcbrique@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ltb-blue/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-ltb-blue" />
                </div>
                <a
                  href="tel:+22870837575"
                  className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                >
                  +228 70 83 75 75
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="h-px bg-gray-100 mx-8 sm:mx-12" />

        {/* Barre du bas */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-8 sm:px-12 py-5">
          <p className="text-gray-400 text-xs">
            © 2025 Lomé Turque Brique. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/contact/" className="text-gray-400 hover:text-gray-700 text-xs transition-colors">
              Mentions légales
            </Link>
            <Link href="/contact/" className="text-gray-400 hover:text-gray-700 text-xs transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/contact/" className="text-gray-400 hover:text-gray-700 text-xs transition-colors">
              Plan du site
            </Link>
          </div>
        </div>

      </div>

      {/* Espace sous la carte */}
      <div className="h-4" />
    </footer>
  );
}
