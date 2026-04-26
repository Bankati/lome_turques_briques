"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/produits/", label: "Produits" },
  { href: "/apropos/", label: "À propos" },
  { href: "/contact/", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 py-3 shadow-lg backdrop-blur-md" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white">
                <Image src="/images/logo.jpg" alt="LTB Logo" fill className="object-contain" />
              </div>
              <span
                className={`hidden font-heading text-lg font-bold transition-colors duration-300 sm:block ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Lomé Turque Brique
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                    scrolled ? "text-black" : "text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-ltb-blue transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <Link
                href="/contact/"
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? "bg-ltb-blue text-white hover:bg-ltb-blue/90"
                    : "bg-white text-ltb-blue hover:bg-white/90"
                }`}
              >
                Devis gratuit
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-lg p-2 transition-colors md:hidden ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ltb-blue px-6 pt-24"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block border-b border-white/20 py-2 font-heading text-2xl font-semibold text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact/"
                onClick={() => setIsOpen(false)}
                className="mt-4 rounded-full bg-white px-6 py-3 text-center font-semibold text-ltb-blue"
              >
                Demander un devis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
