"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  TrendingUp,
  ChevronRight,
  MapPin,
  Phone,
  CheckCircle2,
  Layers,
  Clock,
  Truck,
} from "lucide-react";
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
    description: "Création de Lomé Turque Brique à Adétikopé avec la vision de fournir des matériaux de qualité au Togo.",
    color: "#0666A2",
    isTop: false,
  },
  {
    year: "2019",
    title: "1ers Produits",
    description: "Lancement des gammes Briques Creuses et Pleines, premières livraisons sur chantier à Lomé.",
    color: "#C4622D",
    isTop: true,
  },
  {
    year: "2020",
    title: "Modèle Turque",
    description: "Introduction du modèle turque authentique, alliant savoir-faire traditionnel et performance moderne.",
    color: "#059669",
    isTop: false,
  },
  {
    year: "2022",
    title: "100+ Chantiers",
    description: "Cap des 100 chantiers livrés franchi. Modernisation complète des équipements de production.",
    color: "#7C3AED",
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
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <img
          src="/images/apropos.jpg"
          alt="Lomé Turque Brique"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-3">
              À propos
            </h1>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight size={14} />
              <span className="text-white/90">À propos</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 1 — Notre histoire ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* Gauche — Texte */}
            <ScrollReveal>
              <div>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
                  Fournir une gamme complète de{" "}
                  <span className="text-ltb-brick">matériaux de qualité</span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-4">
                  Fondée en 2018, Lomé Turque Brique est née de la vision de fournir des matériaux
                  de construction haut de gamme au Togo. Nous combinons les techniques de fabrication
                  turques avec les ressources locales pour produire des briques solides, durables et esthétiques.
                </p>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Au fil des années, nous avons modernisé nos installations tout en restant fidèles à
                  nos valeurs : qualité, respect de l'environnement et satisfaction client.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <Link
                    href="/contact/"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-ltb-brick text-white rounded-full font-semibold text-sm hover:bg-ltb-earth transition-all duration-300 hover:scale-105 shadow-lg shadow-ltb-brick/25"
                  >
                    Nous contacter
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="tel:+22870837575"
                    className="inline-flex items-center gap-3 text-gray-700 hover:text-ltb-blue transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-full bg-ltb-blue/10 flex items-center justify-center group-hover:bg-ltb-blue transition-colors duration-300">
                      <Phone size={18} className="text-ltb-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Appelez-nous</p>
                      <p className="font-semibold text-sm">+228 70 83 75 75</p>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Droite — Image avec badge */}
            <ScrollReveal delay={0.2}>
              <div className="relative">
                {/* Image principale */}
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10 aspect-[4/3]">
                  <img
                    src="/images/apropos.jpg"
                    alt="Usine Lomé Turque Brique"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Badge expérience */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute -bottom-6 left-4 sm:-left-6 bg-white rounded-2xl shadow-2xl p-4 sm:p-5 flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 border border-gray-100"
                >
                  <p className="font-heading text-5xl font-bold text-ltb-brick leading-none">7+</p>
                  <p className="text-gray-600 text-xs font-medium text-center mt-1 leading-tight">Années d'expérience</p>
                </motion.div>

                {/* Cadre décoratif derrière */}
                <div className="hidden sm:block absolute -top-4 -right-4 w-full h-full rounded-3xl border-2 border-ltb-blue/20 -z-10" />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-ltb-blue/10 rounded-full text-ltb-blue text-sm font-semibold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-ltb-blue" />
                Notre parcours
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 mt-2">
                Une histoire de{" "}
                <span className="text-ltb-brick">croissance</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* ── Desktop : timeline horizontale ── */}
          <div className="hidden lg:block relative">
            {/* Ligne centrale */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2 z-0" />

            <div className="relative flex items-stretch">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: item.isTop ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex-1 flex flex-col items-center"
                >
                  {/* Zone haute (h=180px) */}
                  <div className="flex flex-col items-center justify-end" style={{ height: 190 }}>
                    {item.isTop ? (
                      /* Texte en haut */
                      <div className="flex flex-col items-center w-full px-3">
                        <div className="text-center mb-2 px-1">
                          <div
                            className="w-10 h-0.5 mx-auto mb-2 rounded-full"
                            style={{ background: item.color }}
                          />
                          <p className="font-bold text-xs text-gray-800 uppercase tracking-wide mb-1">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        {/* Ligne vers cercle */}
                        <div className="flex flex-col items-center mt-2">
                          <div
                            className="w-px"
                            style={{ height: 36, background: item.color }}
                          />
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: item.color }}
                          />
                        </div>
                      </div>
                    ) : (
                      /* Année en haut */
                      <span
                        className="font-heading font-bold text-4xl mb-3 select-none"
                        style={{ color: item.color }}
                      >
                        {item.year}
                      </span>
                    )}
                  </div>

                  {/* Cercle concentrique — sur la ligne */}
                  <div className="relative z-10 flex items-center justify-center bg-gray-50 rounded-full">
                    <div className="w-16 h-16 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center">
                      <div
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: `${item.color}55` }}
                      >
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ background: item.color }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Zone basse (h=180px) */}
                  <div className="flex flex-col items-center justify-start" style={{ height: 190 }}>
                    {!item.isTop ? (
                      /* Texte en bas */
                      <div className="flex flex-col items-center w-full px-3">
                        {/* Ligne depuis cercle */}
                        <div className="flex flex-col items-center mb-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: item.color }}
                          />
                          <div
                            className="w-px"
                            style={{ height: 36, background: item.color }}
                          />
                        </div>
                        <div className="text-center px-1">
                          <div
                            className="w-10 h-0.5 mx-auto mb-2 rounded-full"
                            style={{ background: item.color }}
                          />
                          <p className="font-bold text-xs text-gray-800 uppercase tracking-wide mb-1">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Année en bas */
                      <span
                        className="font-heading font-bold text-4xl mt-3 select-none"
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
          <div className="lg:hidden relative pl-10">
            {/* Ligne verticale */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-200" />

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
                <div
                  className="absolute -left-10 top-3 w-8 h-8 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center"
                >
                  <div
                    className="w-5 h-5 rounded-full border flex items-center justify-center"
                    style={{ borderColor: `${item.color}55` }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>

                {/* Contenu */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <span
                    className="font-heading font-bold text-3xl leading-none"
                    style={{ color: item.color }}
                  >
                    {item.year}
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm mt-2 mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── FEATURES STRIP ─── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.12}>
                <div className="flex gap-5 items-start px-6 py-4 md:py-0 group">
                  <div className="w-12 h-12 rounded-xl bg-ltb-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ltb-blue transition-colors duration-300">
                    <f.icon size={22} className="text-ltb-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 text-base mb-1">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-gray-100">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center px-6 py-8">
                  <div className="font-heading text-5xl font-bold text-gray-900 mb-2 leading-none">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="w-8 h-0.5 bg-ltb-brick mx-auto mb-2 rounded-full" />
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 — Notre compétence ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* Gauche — Image */}
            <ScrollReveal>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                  <img
                    src="/images/klim-musalimov-rJPwYtWcMxw-unsplash.jpg"
                    alt="Production LTB"
                    className="w-full h-[260px] sm:h-[380px] lg:h-[460px] object-cover"
                  />
                </div>
                {/* Badge flottant */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -bottom-5 right-4 sm:right-6 bg-ltb-blue rounded-2xl shadow-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3"
                >
                  <Truck size={22} className="text-white flex-shrink-0" />
                  <div>
                    <p className="text-white font-bold text-sm">Livraison rapide</p>
                    <p className="text-white/70 text-xs">24 – 48h sur Lomé</p>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Droite — Texte */}
            <ScrollReveal delay={0.2}>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-ltb-blue/8 rounded-full text-ltb-blue text-sm font-semibold mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ltb-blue" />
                  Nos produits
                </span>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Notre{" "}
                  <span className="text-ltb-brick">compétence</span>{" "}
                  reconnue
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Lomé Turque Brique couvre l'ensemble des besoins en matériaux de construction, des fondations
                  aux finitions extérieures. Notre gamme répond aux projets résidentiels, commerciaux et publics.
                </p>

                {/* Liste en 2 colonnes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {competences.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-ltb-brick/15 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={12} className="text-ltb-brick" />
                      </div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/produits/"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-ltb-brick text-white rounded-full font-semibold text-sm hover:bg-ltb-earth transition-all duration-300 hover:scale-105 shadow-lg shadow-ltb-brick/20"
                >
                  Voir nos produits
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
                Notre équipe{" "}
                <span className="text-ltb-brick">d'experts</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-base">
                Une équipe passionnée et dévouée, au service de la qualité et de votre satisfaction.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100"
                >
                  {/* Photo */}
                  <div className="h-64 overflow-hidden bg-gray-100 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Overlay au hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ltb-blue/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Infos */}
                  <div className="px-5 py-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-ltb-brick uppercase tracking-wider mb-1">{member.role}</p>
                    <h3 className="font-heading font-bold text-gray-900 text-base">{member.name}</h3>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCALISATION ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Infos */}
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-ltb-blue/8 rounded-full text-ltb-blue text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-ltb-blue" />
                Où nous trouver
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Venez nous rendre visite
              </h2>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-ltb-brick/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={20} className="text-ltb-brick" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Adresse</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Nationale N°1, sous le pont Tsikpo-Noukoudji,<br />
                    Adétikopé, Lomé, Togo
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  "Facilement accessible depuis la route nationale",
                  "Parking disponible sur place",
                  "Livraison possible sur tout Lomé et environs",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-ltb-brick/15 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={12} className="text-ltb-brick" />
                    </div>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=Adetikope+Lome+Togo"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-ltb-blue text-white rounded-full font-semibold text-sm hover:bg-[#055a8e] transition-all duration-300 hover:scale-105 shadow-lg shadow-ltb-blue/20"
              >
                Voir sur Google Maps
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </ScrollReveal>

            {/* Carte Google Maps */}
            <ScrollReveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6!2d1.2!3d6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJOIDHCsDEyJzAwLjAiRQ!5e0!3m2!1sfr!2stg!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[320px]"
                />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

    </div>
  );
}
