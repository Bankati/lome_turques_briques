"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Star, Check } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const circles = [
  {
    name: "Briques Pleines",
    img: "/images/produits/briques%20pleines/15%20pleines.png",
    bg: "bg-emerald-100",
  },
  {
    name: "Briques Creuses",
    img: "/images/produits/creuses/12%20briques%20creuses.png",
    bg: "bg-rose-100",
  },
  { name: "Hourdies", img: "/images/produits/hourdie/Hourdie%2012.png", bg: "bg-sky-100" },
  {
    name: "Pavés",
    img: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Classique.png",
    bg: "bg-amber-100",
  },
];

const products = [
  {
    id: 1,
    name: "Briques Pleines 10",
    cat: "Briques pleines",
    tag: "Vedette",
    tagC: "bg-red-500",
    r: 5,
    desc: "Briques pleines compactes et robustes, idéales pour les murs de soutènement et les fondations légères.",
    feat: ["Haute densité", "Charge moyenne", "Économique"],
    img: "/images/produits/briques%20pleines/10%20pleines.png",
  },
  {
    id: 2,
    name: "Briques Pleines 15",
    cat: "Briques pleines",
    tag: "",
    tagC: "",
    r: 5,
    desc: "Briques pleines standard de qualité supérieure pour murs porteurs et structures résidentielles.",
    feat: ["Résistance optimale", "Murs porteurs", "Finition lisse"],
    img: "/images/produits/briques%20pleines/15%20pleines.png",
  },
  {
    id: 3,
    name: "Briques Pleines 20",
    cat: "Briques pleines",
    tag: "Nouveau",
    tagC: "bg-green-500",
    r: 4,
    desc: "Briques pleines haute densité pour les constructions les plus exigeantes.",
    feat: ["Charge lourde", "Durabilité extrême", "Fondations"],
    img: "/images/produits/briques%20pleines/20%20pleines.png",
  },
  {
    id: 4,
    name: "Briques Creuses 12",
    cat: "Creuses",
    tag: "",
    tagC: "",
    r: 5,
    desc: "Briques creuses légères et résistantes, parfaites pour les constructions modernes et l'isolation thermique.",
    feat: ["Légère", "Isolation thermique", "Économique"],
    img: "/images/produits/creuses/12%20briques%20creuses.png",
  },
  {
    id: 5,
    name: "12 Creux Modèle Turque",
    cat: "Creuses",
    tag: "Best-seller",
    tagC: "bg-ltb-blue",
    r: 5,
    desc: "Le modèle turque authentique, combinant savoir-faire traditionnel et performance moderne.",
    feat: ["Design turque", "Haute résistance", "Tradition"],
    img: "/images/produits/creuses/12%20creu%20modele%20turque.png",
  },
  {
    id: 6,
    name: "Briques Creuses 15",
    cat: "Creuses",
    tag: "",
    tagC: "",
    r: 4,
    desc: "Briques creuses de format 15 pour une meilleure isolation phonique et thermique.",
    feat: ["Format large", "Isolation phonique", "Construction rapide"],
    img: "/images/produits/creuses/15%20briques%20creuses.png",
  },
  {
    id: 7,
    name: "Hourdie 12",
    cat: "Hourdies",
    tag: "",
    tagC: "",
    r: 5,
    desc: "Hourdis alvéolés pour planchers et dalles. Alliant légèreté structurelle et résistance mécanique.",
    feat: ["Allège la structure", "Résistance mécanique", "Planchers"],
    img: "/images/produits/hourdie/Hourdie%2012.png",
  },
  {
    id: 8,
    name: "Hourdie 15",
    cat: "Hourdies",
    tag: "Nouveau",
    tagC: "bg-green-500",
    r: 4,
    desc: "Hourdis format 15 pour grandes portées et dalles de plancher. Conception optimisée.",
    feat: ["Grandes portées", "Haute capacité", "Dalles robustes"],
    img: "/images/produits/hourdie/Hourdie%2015.png",
  },
  {
    id: 9,
    name: "Pavé Goutte Antidérapant",
    cat: "Pavés",
    tag: "",
    tagC: "",
    r: 5,
    desc: "Pavés antidérapants pour zones humides, allées piétonnes et parkings. Sécurité maximale.",
    feat: ["Antidérapant", "Zones humides", "Sécurité"],
    img: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Antid%C3%A9rapant.png",
  },
  {
    id: 10,
    name: "Pavé Goutte Classique",
    cat: "Pavés",
    tag: "",
    tagC: "",
    r: 4,
    desc: "Le pavé classique polyvalent pour allées, terrasses et sols extérieurs. Élégance intemporelle.",
    feat: ["Polyvalent", "Élégant", "Facile à poser"],
    img: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Classique.png",
  },
  {
    id: 11,
    name: "Pavé Goutte Design",
    cat: "Pavés",
    tag: "Vedette",
    tagC: "bg-red-500",
    r: 5,
    desc: "Pavés au design contemporain pour aménagements paysagers modernes et espaces publics stylisés.",
    feat: ["Design moderne", "Paysager", "Esthétique"],
    img: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Design.png",
  },
  {
    id: 12,
    name: "Pavé Goutte Renforcé",
    cat: "Pavés",
    tag: "",
    tagC: "",
    r: 4,
    desc: "Pavés renforcés pour trafic intense, zones industrielles et parkings à fort passage.",
    feat: ["Trafic intense", "Industriel", "Résistance extrême"],
    img: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Renforc%C3%A9.png",
  },
];

const aboutList = [
  "Haute résistance mécanique",
  "Isolation thermique optimale",
  "Rapide à mettre en oeuvre",
  "Design turque authentique",
  "Durabilité garantie",
  "Produits écologiques",
  "Livraison sur chantier",
  "Service client dédié",
];

export default function Produits() {
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [selProduct, setSelProduct] = useState<(typeof products)[0] | null>(null);

  const filtered = activeCat
    ? products.filter((p) =>
        p.cat.toLowerCase().includes(activeCat.replace("Briques ", "").toLowerCase())
      )
    : products;

  return (
    <div className="bg-white">
      {/* HERO — Image 1 style split */}
      <section className="relative flex min-h-[90vh] flex-col lg:flex-row">
        <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-white via-ltb-cream/40 to-ltb-blue/5 px-6 py-20 lg:px-16 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-lg text-center lg:text-left"
          >
            <span className="mb-4 inline-flex items-center rounded-full bg-ltb-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-ltb-blue">
              Nos Briques de Qualité
            </span>
            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-ltb-blue-dark sm:text-5xl lg:text-6xl">
              Bâtissez avec LTB,
              <br />
              Bâtissez l&apos;Avenir
            </h1>
            <p className="mb-10 text-base leading-relaxed text-gray-500 sm:text-lg">
              Découvrez notre gamme complète de briques turques haute résistance, alliant tradition,
              durabilité et design moderne pour vos projets de construction au Togo.
            </p>
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ltb-blue px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ltb-blue/25 transition-all duration-300 hover:scale-105 hover:bg-ltb-blue-hover"
            >
              Explorer
            </a>
          </motion.div>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0"
          >
            <Image
              src="/images/image%203.png"
              alt="Construction moderne avec briques LTB"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-ltb-blue-dark/20" />
          </motion.div>
        </div>
      </section>

      {/* PROMOS — 2 cartes style image */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ltb-blue to-ltb-blue-dark p-6 text-white shadow-xl sm:p-10"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
              <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                <div className="relative h-52 w-52 flex-shrink-0 sm:h-64 sm:w-64">
                  <div className="absolute inset-2 rounded-full bg-white/90" />
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src="/images/image%202.png"
                      alt="Promotion Builder"
                      fill
                      className="object-contain p-2 drop-shadow-2xl"
                    />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <span className="mb-3 inline-block rounded bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    Nouveauté
                  </span>
                  <h3 className="font-heading text-2xl font-bold leading-tight sm:text-3xl">
                    Hourdie 15
                  </h3>
                  <p className="mt-2 text-sm text-white/80">Grandes portées & haute capacité</p>
                  <button
                    onClick={() => setActiveCat("Hourdies")}
                    className="mt-5 inline-flex items-center gap-1 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-ltb-blue transition hover:scale-105"
                  >
                    Découvrir <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ltb-cream to-amber-50 p-6 text-gray-900 shadow-xl sm:p-10"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ltb-blue/5" />
              <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                <div className="relative h-44 w-44 flex-shrink-0 sm:h-52 sm:w-52">
                  <div className="absolute inset-2 rounded-full bg-ltb-blue/10" />
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src="/images/image%201.png"
                      alt="Promotion Pavé"
                      fill
                      className="object-contain p-2 drop-shadow-xl"
                    />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <span className="mb-3 inline-block rounded bg-ltb-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ltb-blue">
                    Best-seller
                  </span>
                  <h3 className="font-heading text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                    Pavé Goutte Design
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">Design moderne pour espaces publics</p>
                  <button
                    onClick={() => setActiveCat("Pavés")}
                    className="mt-5 inline-flex items-center gap-1 rounded-full bg-ltb-blue px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-ltb-blue-hover"
                  >
                    Explorer <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BANNIÈRE CTA pleine largeur */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-ltb-cream via-white to-ltb-blue/5" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ltb-blue/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-ltb-blue/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              La qualité qui construit <span className="text-ltb-blue">votre avenir</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              Des briques turques de haute résistance pour tous vos projets, fabriquées au Togo avec
              un savoir-faire reconnu.
            </p>
            <a
              href="#categories"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ltb-blue px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ltb-blue/25 transition-all hover:scale-105 hover:bg-ltb-blue-hover"
            >
              Voir tous les produits <ChevronRight size={18} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* CATEGORIES — Image 2 style circles */}
      <section id="categories" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Explorer par type
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                Nos Catégories
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 bg-ltb-blue" />
            </div>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-8 overflow-x-auto pb-6 pt-2">
            {circles.map((c, i) => (
              <ScrollReveal key={c.name} delay={i * 0.08}>
                <motion.button
                  whileHover={{ y: -6 }}
                  onClick={() => setActiveCat(activeCat === c.name ? null : c.name)}
                  className="flex min-w-[180px] flex-col items-center gap-5"
                >
                  <div
                    className={`relative h-40 w-40 overflow-hidden rounded-full shadow-lg transition-all duration-300 ${c.bg} ${activeCat === c.name ? "ring-4 ring-ltb-blue" : "hover:shadow-xl"}`}
                  >
                    <Image src={c.img} alt={c.name} fill className="object-contain p-5" />
                  </div>
                  <span
                    className={`text-base font-semibold ${activeCat === c.name ? "text-ltb-blue" : "text-gray-700"}`}
                  >
                    {c.name}
                  </span>
                </motion.button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID — Image 2 style */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Le catalogue
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                Nos Produits Populaires
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 bg-ltb-blue" />
            </div>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl"
                  onClick={() => setSelProduct(p)}
                >
                  <div className="relative h-72 overflow-hidden bg-white">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                    />
                    {p.tag && (
                      <div className="absolute left-4 top-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${p.tagC}`}
                        >
                          {p.tag}
                        </span>
                      </div>
                    )}
                    {p.r >= 4 && (
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                          NEUF
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={12}
                          className={s < p.r ? "fill-amber-400 text-amber-400" : "text-gray-200"}
                        />
                      ))}
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-gray-900 transition-colors group-hover:text-ltb-blue">
                      {p.name}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-500">{p.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-ltb-blue transition-all group-hover:gap-2">
                      Voir les détails <ChevronRight size={14} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {filtered.length === 0 && (
            <div className="py-20 text-center text-gray-400">
              Aucun produit dans cette catégorie.
            </div>
          )}
        </div>
      </section>

      {/* ABOUT — Image 2 style */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal direction="left">
              <div className="relative h-[400px] overflow-hidden rounded-2xl bg-ltb-cream sm:h-[500px]">
                <Image src="/images/1729.jpg" alt="Usine LTB" fill className="object-cover" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Notre entreprise
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                  Tout sur LTB
                </h2>
                <div className="mb-6 mt-4 h-1 w-16 bg-ltb-blue" />
                <p className="mb-6 leading-relaxed text-gray-500">
                  Lomé Turque Brique allie le savoir-faire turc traditionnel et les ressources
                  locales pour produire des briques de qualité supérieure au Togo. Notre usine
                  moderne garantit solidité, esthétique et durabilité.
                </p>
                <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                  {aboutList.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ltb-blue text-white">
                        <Check size={10} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact/"
                  className="inline-flex items-center gap-2 rounded-md bg-ltb-blue px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-ltb-blue-hover"
                >
                  Contactez-nous <ChevronRight size={16} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex h-64 items-center justify-center bg-gray-50 sm:h-80">
                <Image
                  src={selProduct.img}
                  alt={selProduct.name}
                  fill
                  className="object-contain p-8"
                />
                <button
                  onClick={() => setSelProduct(null)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-colors hover:bg-white"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-ltb-blue px-4 py-1.5 text-sm font-medium text-white">
                    {selProduct.cat}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="mb-4 font-heading text-3xl font-bold">{selProduct.name}</h2>
                <p className="mb-8 leading-relaxed text-gray-500">{selProduct.desc}</p>
                <h3 className="mb-4 text-lg font-semibold">Caractéristiques</h3>
                <ul className="mb-8 grid gap-3 sm:grid-cols-3">
                  {selProduct.feat.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 rounded-xl bg-ltb-blue/5 px-4 py-3 text-sm font-medium"
                    >
                      <span className="h-2 w-2 rounded-full bg-ltb-blue" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact/"
                  className="inline-flex items-center gap-2 rounded-full bg-ltb-blue px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-ltb-blue/90"
                >
                  Demander un devis <ChevronRight size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
