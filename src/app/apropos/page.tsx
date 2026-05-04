"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  ChevronRight,
  MapPin,
  Phone,
  CheckCircle2,
  Layers,
  Truck,
} from "lucide-react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

const features = [
  {
    icon: Award,
    title: "Expertise & Savoir-faire",
    description:
      "Plus de 7 ans d'expérience dans la fabrication de briques, alliant techniques turques et ressources locales togolaises.",
  },
  {
    icon: Layers,
    title: "Qualité Certifiée",
    description:
      "Chaque brique est soumise à des contrôles rigoureux pour garantir solidité, durabilité et conformité aux normes de construction.",
  },
  {
    icon: Users,
    title: "Service Client",
    description:
      "Notre équipe vous accompagne de la sélection des matériaux jusqu'à la livraison sur chantier, partout à Lomé et environs.",
  },
];

const stats = [
  { value: 7, suffix: "+", label: "Années d'expérience" },
  { value: 500, suffix: "+", label: "Projets réalisés" },
  { value: 50, suffix: "K+", label: "Briques produites" },
  { value: 100, suffix: "%", label: "Satisfaction client" },
];

const competences = [
  "Briques Creuses 12 & 15",
  "Briques Pleines 10, 15 & 20",
  "Modèle Turque Authentique",
  "Hourdies 12 & 15",
  "Pavés Antidérapants",
  "Livraison sur tout Lomé",
];

const timeline = [
  {
    year: "2018",
    title: "Fondation",
    description:
      "Création de Lomé Turque Brique à Adétikopé avec la vision de fournir des matériaux de qualité au Togo.",
    color: "#0666A2",
    isTop: false,
  },
  {
    year: "2019",
    title: "1ers Produits",
    description:
      "Lancement des gammes Briques Creuses et Pleines, premières livraisons sur chantier à Lomé.",
    color: "#C4622D",
    isTop: true,
  },
  {
    year: "2020",
    title: "Modèle Turque",
    description:
      "Introduction du modèle turque authentique, alliant savoir-faire traditionnel et performance moderne.",
    color: "#7A3B1E",
    isTop: false,
  },
  {
    year: "2022",
    title: "100+ Chantiers",
    description:
      "Cap des 100 chantiers livrés franchi. Modernisation complète des équipements de production.",
    color: "#044d7a",
    isTop: true,
  },
  {
    year: "2024",
    title: "Expansion",
    description: "Lancement de la gamme Pavés et extension des livraisons au-delà de Lomé.",
    color: "#0666A2",
    isTop: false,
  },
];

const team = [
  {
    name: "Directeur Général",
    role: "Direction & Stratégie",
    image: "/images/rh/Directeur%20G%C3%A9n%C3%A9ral.jpg",
  },
  {
    name: "Responsable Commercial",
    role: "Ventes & Relation client",
    image: "/images/rh/Responsable%20Commercial.jpg",
  },
  {
    name: "Responsable Production",
    role: "Fabrication & Qualité",
    image: "/images/rh/Responsable%20Production.jpg",
  },
  {
    name: "Secrétaire",
    role: "Administration & Accueil",
    image: "/images/rh/S%C3%A9cretaire.jpg",
  },
];

export default function APropos() {
  return (
    <div>
      {/* ─── HERO avec image ─── */}
      <section className="relative flex h-72 items-end overflow-hidden sm:h-96">
        <Image src="/images/apropos.jpg" alt="Lomé Turque Brique" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-3 font-heading text-4xl font-bold text-white sm:text-5xl">
              À propos
            </h1>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="transition-colors hover:text-white">
                Accueil
              </Link>
              <ChevronRight size={14} />
              <span className="text-white/90">À propos</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 1 — Notre histoire ─── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 xl:gap-20">
            {/* Gauche — Texte */}
            <ScrollReveal>
              <div>
                <h2 className="mb-5 font-heading text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                  Fournir une gamme complète de{" "}
                  <span className="text-ltb-brick">matériaux de qualité</span>
                </h2>
                <p className="mb-4 text-base leading-relaxed text-gray-500">
                  Fondée en 2018, Lomé Turque Brique est née de la vision de fournir des matériaux
                  de construction haut de gamme au Togo. Nous combinons les techniques de
                  fabrication turques avec les ressources locales pour produire des briques solides,
                  durables et esthétiques.
                </p>
                <p className="mb-8 text-base leading-relaxed text-gray-500">
                  Au fil des années, nous avons modernisé nos installations tout en restant fidèles
                  à nos valeurs : qualité, respect de l&apos;environnement et satisfaction client.
                </p>

                {/* CTAs */}
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <Link
                    href="/contact/"
                    className="group inline-flex items-center gap-2 rounded-full bg-ltb-brick px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ltb-brick/25 transition-all duration-300 hover:scale-105 hover:bg-ltb-earth"
                  >
                    Nous contacter
                    <ChevronRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <a
                    href="tel:+22870837575"
                    className="group inline-flex items-center gap-3 text-gray-700 transition-colors hover:text-ltb-blue"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ltb-blue/10 transition-colors duration-300 group-hover:bg-ltb-blue">
                      <Phone
                        size={18}
                        className="text-ltb-blue transition-colors group-hover:text-white"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Appelez-nous</p>
                      <p className="text-sm font-semibold">+228 70 83 75 75</p>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Droite — Image avec badge */}
            <ScrollReveal delay={0.2}>
              <div className="relative">
                {/* Image principale */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-black/10">
                  <Image
                    src="/images/apropos.jpg"
                    alt="Usine Lomé Turque Brique"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Badge expérience */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute -bottom-6 left-4 flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl sm:-left-6 sm:h-36 sm:w-36 sm:p-5"
                >
                  <p className="font-heading text-5xl font-bold leading-none text-ltb-brick">7+</p>
                  <p className="mt-1 text-center text-xs font-medium leading-tight text-gray-600">
                    Années d&apos;expérience
                  </p>
                </motion.div>

                {/* Cadre décoratif derrière */}
                <div className="absolute -right-4 -top-4 -z-10 hidden h-full w-full rounded-3xl border-2 border-ltb-blue/20 sm:block" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="overflow-hidden bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-ltb-blue/10 px-4 py-1.5 text-sm font-semibold text-ltb-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-ltb-blue" />
                Notre parcours
              </span>
              <h2 className="mt-2 font-heading text-4xl font-bold text-gray-900 sm:text-5xl">
                Une histoire de <span className="text-ltb-brick">croissance</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* ── Desktop : timeline horizontale ── */}
          <div className="relative hidden lg:block">
            {/* Ligne centrale */}
            <div className="absolute left-0 right-0 top-1/2 z-0 h-px -translate-y-1/2 bg-gray-200" />

            <div className="relative flex items-stretch">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: item.isTop ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-1 flex-col items-center"
                >
                  {/* Zone haute (h=180px) */}
                  <div className="flex flex-col items-center justify-end" style={{ height: 190 }}>
                    {item.isTop ? (
                      /* Texte en haut */
                      <div className="flex w-full flex-col items-center px-3">
                        <div className="mb-2 px-1 text-center">
                          <div
                            className="mx-auto mb-2 h-0.5 w-10 rounded-full"
                            style={{ background: item.color }}
                          />
                          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-800">
                            {item.title}
                          </p>
                          <p className="text-xs leading-relaxed text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        {/* Ligne vers cercle */}
                        <div className="mt-2 flex flex-col items-center">
                          <div className="w-px" style={{ height: 36, background: item.color }} />
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ background: item.color }}
                          />
                        </div>
                      </div>
                    ) : (
                      /* Année en haut */
                      <span
                        className="mb-3 select-none font-heading text-4xl font-bold"
                        style={{ color: item.color }}
                      >
                        {item.year}
                      </span>
                    )}
                  </div>

                  {/* Cercle concentrique — sur la ligne */}
                  <div className="relative z-10 flex items-center justify-center rounded-full bg-gray-50">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2"
                        style={{ borderColor: `${item.color}55` }}
                      >
                        <div className="h-5 w-5 rounded-full" style={{ background: item.color }} />
                      </div>
                    </div>
                  </div>

                  {/* Zone basse (h=180px) */}
                  <div className="flex flex-col items-center justify-start" style={{ height: 190 }}>
                    {!item.isTop ? (
                      /* Texte en bas */
                      <div className="flex w-full flex-col items-center px-3">
                        {/* Ligne depuis cercle */}
                        <div className="mb-2 flex flex-col items-center">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ background: item.color }}
                          />
                          <div className="w-px" style={{ height: 36, background: item.color }} />
                        </div>
                        <div className="px-1 text-center">
                          <div
                            className="mx-auto mb-2 h-0.5 w-10 rounded-full"
                            style={{ background: item.color }}
                          />
                          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-800">
                            {item.title}
                          </p>
                          <p className="text-xs leading-relaxed text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Année en bas */
                      <span
                        className="mt-3 select-none font-heading text-4xl font-bold"
                        style={{ color: item.color }}
                      >
                        {item.year}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Mobile : timeline verticale ── */}
          <div className="relative pl-10 lg:hidden">
            {/* Ligne verticale */}
            <div className="absolute bottom-2 left-4 top-2 w-px bg-gray-200" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative mb-8 last:mb-0"
              >
                {/* Cercle sur la ligne */}
                <div className="absolute -left-10 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full border"
                    style={{ borderColor: `${item.color}55` }}
                  >
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                  </div>
                </div>

                {/* Contenu */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <span
                    className="font-heading text-3xl font-bold leading-none"
                    style={{ color: item.color }}
                  >
                    {item.year}
                  </span>
                  <h4 className="mb-1 mt-2 text-sm font-bold text-gray-900">{item.title}</h4>
                  <p className="text-xs leading-relaxed text-gray-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES STRIP ─── */}
      <section className="border-y border-gray-100 bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.12}>
                <div className="group flex items-start gap-5 px-6 py-4 md:py-0">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-ltb-blue/10 transition-colors duration-300 group-hover:bg-ltb-blue">
                    <f.icon
                      size={22}
                      className="text-ltb-blue transition-colors duration-300 group-hover:text-white"
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-base font-bold text-gray-900">
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500">{f.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="border-b border-gray-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-y-2 divide-gray-100 lg:grid-cols-4 lg:divide-x-2 lg:divide-y-0">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="px-6 py-8 text-center">
                  <div className="mb-2 font-heading text-5xl font-bold leading-none text-gray-900">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mx-auto mb-2 h-0.5 w-8 rounded-full bg-ltb-brick" />
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 — Notre compétence ─── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 xl:gap-20">
            {/* Gauche — Image */}
            <ScrollReveal>
              <div className="relative">
                <div className="relative h-[260px] overflow-hidden rounded-3xl shadow-2xl shadow-black/10 sm:h-[380px] lg:h-[460px]">
                  <Image
                    src="/images/klim-musalimov-rJPwYtWcMxw-unsplash.jpg"
                    alt="Production LTB"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Badge flottant */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl bg-ltb-blue px-4 py-3 shadow-xl sm:right-6 sm:px-5 sm:py-4"
                >
                  <Truck size={22} className="flex-shrink-0 text-white" />
                  <div>
                    <p className="text-sm font-bold text-white">Livraison rapide</p>
                    <p className="text-xs text-white/70">24 – 48h sur Lomé</p>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Droite — Texte */}
            <ScrollReveal delay={0.2}>
              <div>
                <span className="bg-ltb-blue/8 mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-ltb-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-ltb-blue" />
                  Nos produits
                </span>
                <h2 className="mb-4 font-heading text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                  Notre <span className="text-ltb-brick">compétence</span> reconnue
                </h2>
                <p className="mb-8 text-base leading-relaxed text-gray-500">
                  Lomé Turque Brique couvre l&apos;ensemble des besoins en matériaux de
                  construction, des fondations aux finitions extérieures. Notre gamme répond aux
                  projets résidentiels, commerciaux et publics.
                </p>

                {/* Liste en 2 colonnes */}
                <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {competences.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      className="flex items-center gap-2.5"
                    >
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-ltb-brick/15">
                        <CheckCircle2 size={12} className="text-ltb-brick" />
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/produits/"
                  className="group inline-flex items-center gap-2 rounded-full bg-ltb-brick px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-ltb-brick/20 transition-all duration-300 hover:scale-105 hover:bg-ltb-earth"
                >
                  Voir nos produits
                  <ChevronRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <h2 className="mb-3 font-heading text-4xl font-bold text-gray-900 sm:text-5xl">
                Notre équipe <span className="text-ltb-brick">d&apos;experts</span>
              </h2>
              <p className="mx-auto max-w-xl text-base text-gray-400">
                Une équipe passionnée et dévouée, au service de la qualité et de votre satisfaction.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  {/* Photo */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay au hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ltb-blue/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Infos */}
                  <div className="border-t border-gray-100 px-5 py-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ltb-brick">
                      {member.role}
                    </p>
                    <h3 className="font-heading text-base font-bold text-gray-900">
                      {member.name}
                    </h3>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCALISATION ─── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Infos */}
            <ScrollReveal>
              <span className="bg-ltb-blue/8 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-ltb-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-ltb-blue" />
                Où nous trouver
              </span>
              <h2 className="mb-6 font-heading text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                Venez nous rendre visite
              </h2>

              <div className="mb-6 flex items-start gap-4">
                <div className="mt-0.5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-ltb-brick/10">
                  <MapPin size={20} className="text-ltb-brick" />
                </div>
                <div>
                  <p className="mb-1 font-semibold text-gray-900">Adresse</p>
                  <p className="text-sm leading-relaxed text-gray-500">
                    Nationale N°1, sous le pont Tsikpo-Noukoudji,
                    <br />
                    Adétikopé, Lomé, Togo
                  </p>
                </div>
              </div>

              <div className="mb-8 space-y-3">
                {[
                  "Facilement accessible depuis la route nationale",
                  "Parking disponible sur place",
                  "Livraison possible sur tout Lomé et environs",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-ltb-brick/15">
                      <CheckCircle2 size={12} className="text-ltb-brick" />
                    </div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=Adetikope+Lome+Togo"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-ltb-blue px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ltb-blue/20 transition-all duration-300 hover:scale-105 hover:bg-ltb-blue-hover"
              >
                Voir sur Google Maps
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </ScrollReveal>

            {/* Carte Google Maps */}
            <ScrollReveal delay={0.2}>
              <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-gray-100 shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6!2d1.2!3d6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJOIDHCsDEyJzAwLjAiRQ!5e0!3m2!1sfr!2stg!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[320px] w-full"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
