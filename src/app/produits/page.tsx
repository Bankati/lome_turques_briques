"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronRight, X, Layers, Box, Grid3X3, Square } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const categories = ["Tous", "Briques pleines", "Creuses", "Hourdies", "Pavés"];

const categoryData = [
  {
    name: "Briques Pleines",
    count: 3,
    description: "Solidité maximale pour fondations et murs porteurs.",
    icon: Layers,
  },
  {
    name: "Briques Creuses",
    count: 3,
    description: "Légèreté et isolation pour constructions modernes.",
    icon: Box,
  },
  {
    name: "Hourdies",
    count: 2,
    description: "Planchers et dalles allégés, résistance optimale.",
    icon: Grid3X3,
  },
  {
    name: "Pavés",
    count: 4,
    description: "Sols extérieurs durables, élégants et antidérapants.",
    icon: Square,
  },
];

const products = [
  {
    id: 1,
    name: "Briques Pleines 10",
    category: "Briques pleines",
    description:
      "Briques pleines compactes et robustes, idéales pour les murs de soutènement et les fondations légères.",
    features: ["Haute densité", "Charge moyenne", "Économique"],
    image: "/images/produits/briques%20pleines/10%20pleines.png",
  },
  {
    id: 2,
    name: "Briques Pleines 15",
    category: "Briques pleines",
    description:
      "Briques pleines standard de qualité supérieure pour murs porteurs et structures résidentielles.",
    features: ["Résistance optimale", "Murs porteurs", "Finition lisse"],
    image: "/images/produits/briques%20pleines/15%20pleines.png",
  },
  {
    id: 3,
    name: "Briques Pleines 20",
    category: "Briques pleines",
    description:
      "Briques pleines haute densité pour les constructions les plus exigeantes : fondations, murs de charge lourde.",
    features: ["Charge lourde", "Durabilité extrême", "Fondations"],
    image: "/images/produits/briques%20pleines/20%20pleines.png",
  },
  {
    id: 4,
    name: "Briques Creuses 12",
    category: "Creuses",
    description:
      "Briques creuses légères et résistantes, parfaites pour les constructions modernes et l'isolation thermique.",
    features: ["Légère", "Isolation thermique", "Économique"],
    image: "/images/produits/creuses/12%20briques%20creuses.png",
  },
  {
    id: 5,
    name: "12 Creux Modèle Turque",
    category: "Creuses",
    description:
      "Le modèle turque authentique, combinant savoir-faire traditionnel et performance moderne pour vos constructions.",
    features: ["Design turque", "Haute résistance", "Tradition & modernité"],
    image: "/images/produits/creuses/12%20creu%20modele%20turque.png",
  },
  {
    id: 6,
    name: "Briques Creuses 15",
    category: "Creuses",
    description:
      "Briques creuses de format 15 pour une meilleure isolation phonique et thermique dans vos bâtiments.",
    features: ["Format large", "Isolation phonique", "Construction rapide"],
    image: "/images/produits/creuses/15%20briques%20creuses.png",
  },
  {
    id: 7,
    name: "Hourdie 12",
    category: "Hourdies",
    description:
      "Hourdis alvéolés pour planchers et dalles. Alliant légèreté structurelle et résistance mécanique.",
    features: ["Allège la structure", "Résistance mécanique", "Planchers"],
    image: "/images/produits/hourdie/Hourdie%2012.png",
  },
  {
    id: 8,
    name: "Hourdie 15",
    category: "Hourdies",
    description:
      "Hourdis format 15 pour grandes portées et dalles de plancher. Conception optimisée pour les projets ambitieux.",
    features: ["Grandes portées", "Haute capacité", "Dalles robustes"],
    image: "/images/produits/hourdie/Hourdie%2015.png",
  },
  {
    id: 9,
    name: "Pavé Goutte Antidérapant",
    category: "Pavés",
    description:
      "Pavés antidérapants pour zones humides, allées piétonnes et parkings. Sécurité maximale.",
    features: ["Antidérapant", "Zones humides", "Sécurité"],
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Antid%C3%A9rapant.png",
  },
  {
    id: 10,
    name: "Pavé Goutte Classique",
    category: "Pavés",
    description:
      "Le pavé classique polyvalent pour allées, terrasses et sols extérieurs. Élégance intemporelle.",
    features: ["Polyvalent", "Élégant", "Facile à poser"],
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Classique.png",
  },
  {
    id: 11,
    name: "Pavé Goutte Design",
    category: "Pavés",
    description:
      "Pavés au design contemporain pour aménagements paysagers modernes et espaces publics stylisés.",
    features: ["Design moderne", "Paysager", "Esthétique"],
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Design.png",
  },
  {
    id: 12,
    name: "Pavé Goutte Renforcé",
    category: "Pavés",
    description:
      "Pavés renforcés pour trafic intense, zones industrielles et parkings à fort passage. Résistance maximale.",
    features: ["Trafic intense", "Industriel", "Résistance extrême"],
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Renforc%C3%A9.png",
  },
];

export default function Produits() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);

  const filtered =
    activeCategory === "Tous" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pb-20 pt-24">
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero%20section/webaliser-_TPTXZd9mOo-unsplash.jpg"
            alt="Intérieur moderne construit avec nos briques"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-sm font-medium uppercase tracking-widest text-white/70"
            >
              Bienvenue chez Lomé Turque Brique
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 font-heading text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
            >
              DES BRIQUES
              <br />
              DE QUALITÉ
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
            >
              Découvrez notre gamme complète de briques turques haute résistance, alliant tradition,
              durabilité et design moderne pour vos projets de construction.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#produits"
                className="group inline-flex items-center justify-center gap-2 bg-[#b8860b] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#a07400]"
              >
                Explorer
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-gray-900 transition-all duration-300 hover:bg-gray-100"
              >
                Contactez-nous
              </a>
            </motion.div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                i === 0 ? "scale-110 bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* CATÉGORIES — Style goutte */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-ltb-blue">
                Notre catalogue
              </span>
              <h2 className="mb-4 mt-3 font-heading text-4xl font-bold sm:text-5xl">
                4 familles, 12 références
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-ltb-light">
                Chaque projet mérite la brique qui lui correspond. Explorez nos catégories conçues
                pour toutes les constructions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categoryData.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 0.1}>
                <motion.button
                  whileHover={{ y: -8 }}
                  onClick={() =>
                    setActiveCategory(
                      cat.name === "Briques Pleines"
                        ? "Briques pleines"
                        : cat.name === "Briques Creuses"
                          ? "Creuses"
                          : cat.name
                    )
                  }
                  className="group w-full rounded-3xl border border-ltb-gray/20 bg-white p-8 text-left shadow-lg shadow-black/5 transition-all duration-500 hover:shadow-2xl hover:shadow-ltb-blue/10"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-ltb-blue/5 text-ltb-blue transition-all duration-500 group-hover:bg-ltb-blue group-hover:text-white">
                    <cat.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-bold text-ltb-blue transition-colors group-hover:text-ltb-blue">
                    {cat.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-ltb-light">{cat.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-ltb-blue/70 transition-colors group-hover:text-ltb-blue">
                    {cat.count} produits{" "}
                    <ChevronRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </motion.button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FILTRES */}
      <section id="produits" className="border-y border-ltb-gray/20 bg-ltb-gray/10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <Filter size={20} className="text-ltb-blue" />
            <span className="text-sm font-semibold">Filtrer par catégorie</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-ltb-blue text-white shadow-lg shadow-ltb-blue/30"
                    : "border border-ltb-gray/30 bg-white text-black hover:bg-ltb-blue/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRILLE PRODUITS */}
      <section className="bg-ltb-gray/10 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10 flex items-center justify-between">
              <h2 className="font-heading text-3xl font-bold">
                {activeCategory === "Tous" ? "Tous nos produits" : activeCategory}
              </h2>
              <span className="text-sm text-ltb-light">
                {filtered.length} produit{filtered.length > 1 ? "s" : ""}
              </span>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 transition-all duration-500 hover:shadow-2xl hover:shadow-ltb-blue/15"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative h-64 overflow-hidden bg-ltb-gray/20">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-sm font-medium text-white">Cliquez pour détails</span>
                    </div>
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-ltb-blue/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-heading text-lg font-bold transition-colors group-hover:text-ltb-blue">
                      {product.name}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-ltb-light">
                      {product.description}
                    </p>
                    <button className="inline-flex items-center gap-1 text-sm font-medium text-ltb-blue transition-all duration-300 hover:gap-2">
                      Voir les détails <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex h-64 items-center justify-center bg-ltb-gray/10 sm:h-80">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain p-8"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-colors hover:bg-white"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-ltb-blue px-4 py-1.5 text-sm font-medium text-white">
                    {selectedProduct.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="mb-4 font-heading text-3xl font-bold">{selectedProduct.name}</h2>
                <p className="mb-8 leading-relaxed text-ltb-light">{selectedProduct.description}</p>
                <h3 className="mb-4 text-lg font-semibold">Caractéristiques</h3>
                <ul className="mb-8 grid gap-3 sm:grid-cols-3">
                  {selectedProduct.features.map((f) => (
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
