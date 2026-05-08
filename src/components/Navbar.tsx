"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/",         label: "Accueil"  },
  { href: "/produits/", label: "Produits" },
  { href: "/apropos/",  label: "À propos" },
  { href: "/contact/",  label: "Contact"  },
];

function isLinkActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  const clean = href.replace(/\/$/, "");
  return pathname === href || pathname === clean || pathname.startsWith(clean + "/");
}

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/98 py-3 shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
                <Image src="/images/logo.jpg" alt="LTB Logo" fill className="object-contain" />
              </div>
              <div className="hidden sm:block">
                <span className={`block font-heading text-base font-bold leading-tight transition-colors duration-300 ${scrolled ? "text-gray-900" : "text-white"}`}>
                  Lomé Turque Brique
                </span>
                <span className={`block text-[11px] transition-colors duration-300 ${scrolled ? "text-gray-400" : "text-white/60"}`}>
                  Matériaux de construction
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href, pathname ?? "");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-lg px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
                      active
                        ? scrolled ? "text-primary-dark" : "text-white"
                        : scrolled
                          ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className={`absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                          scrolled ? "bg-primary-dark" : "bg-primary-light"
                        }`}
                      />
                    )}
                  </Link>
                );
              })}

              {/* CTA */}
              <div className="ml-2">
                <Link
                  href="/contact/"
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    scrolled
                      ? "bg-primary-dark text-white shadow-md shadow-primary-dark/25 hover:bg-primary-navy"
                      : "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  }`}
                >
                  Devis gratuit
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 md:hidden ${
                scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed bottom-0 right-0 top-0 z-40 flex w-[min(20rem,_calc(100vw_-_3rem))] flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-lg shadow-sm">
                  <Image src="/images/logo.jpg" alt="LTB" fill className="object-contain" />
                </div>
                <span className="font-heading text-sm font-bold text-gray-900">
                  Lomé Turque Brique
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-4 py-6">
              <div className="space-y-1">
                {navLinks.map((link, i) => {
                  const active = isLinkActive(link.href, pathname ?? "");
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-all ${
                          active
                            ? "bg-primary-lighter text-primary-dark"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {link.label}
                        <ChevronRight size={16} className={active ? "text-primary-dark" : "text-gray-300"} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* CTA */}
            <div className="pb-safe border-t border-gray-100 px-4 pt-4">
              <Link
                href="/contact/"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary-dark px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-dark/20 transition-all hover:bg-primary-navy"
              >
                Demander un devis gratuit
                <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
