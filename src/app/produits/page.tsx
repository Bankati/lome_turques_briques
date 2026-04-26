"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronRight, X, Layers, Box, Grid3X3, Square, ArrowRight, Sparkles } from "lucide-react";
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
    description: "Briques pleines compactes et robustes, idéales pour les murs de soutènement et les fondations légères.",
    features: ["Haute densité", "Charge moyenne", "Économique"],
    image: "/images/produits/briques%20pleines/10%20pleines.png",
  },
  {
    id: 2,
    name: "Briques Pleines 15",
    category: "Briques pleines",
    description: "Briques pleines standard de qualité supérieure pour murs porteurs et structures résidentielles.",
    features: ["Résistance optimale", "Murs porteurs", "Finition lisse"],
    image: "/images/produits/briques%20pleines/15%20pleines.png",
  },
  {
    id: 3,
    name: "Briques Pleines 20",
    category: "Briques pleines",
    description: "Briques pleines haute densité pour les constructions les plus exigeantes : fondations, murs de charge lourde.",
    features: ["Charge lourde", "Durabilité extrême", "Fondations"],
    image: "/images/produits/briques%20pleines/20%20pleines.png",
  },
  {
    id: 4,
    name: "Briques Creuses 12",
    category: "Creuses",
    description: "Briques creuses légères et résistantes, parfaites pour les constructions modernes et l'isolation thermique.",
    features: ["Légère", "Isolation thermique", "Économique"],
    image: "/images/produits/creuses/12%20briques%20creuses.png",
  },
  {
    id: 5,
    name: "12 Creux Modèle Turque",
    category: "Creuses",
    description: "Le modèle turque authentique, combinant savoir-faire traditionnel et performance moderne pour vos constructions.",
    features: ["Design turque", "Haute résistance", "Tradition & modernité"],
    image: "/images/produits/creuses/12%20creu%20modele%20turque.png",
  },
  {
    id: 6,
    name: "Briques Creuses 15",
    category: "Creuses",
    description: "Briques creuses de format 15 pour une meilleure isolation phonique et thermique dans vos bâtiments.",
    features: ["Format large", "Isolation phonique", "Construction rapide"],
    image: "/images/produits/creuses/15%20briques%20creuses.png",
  },
  {
    id: 7,
    name: "Hourdie 12",
    category: "Hourdies",
    description: "Hourdis alvéolés pour planchers et dalles. Alliant légèreté structurelle et résistance mécanique.",
    features: ["Allège la structure", "Résistance mécanique", "Planchers"],
    image: "/images/produits/hourdie/Hourdie%2012.png",
  },
  {
    id: 8,
    name: "Hourdie 15",
    category: "Hourdies",
    description: "Hourdis format 15 pour grandes portées et dalles de plancher. Conception optimisée pour les projets ambitieux.",
    features: ["Grandes portées", "Haute capacité", "Dalles robustes"],
    image: "/images/produits/hourdie/Hourdie%2015.png",
  },
  {
    id: 9,
    name: "Pavé Goutte Antidérapant",
    category: "Pavés",
    description: "Pavés antidérapants pour zones humides, allées piétonnes et parkings. Sécurité maximale.",
    features: ["Antidérapant", "Zones humides", "Sécurité"],
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Antid%C3%A9rapant.png",
  },
  {
    id: 10,
    name: "Pavé Goutte Classique",
    category: "Pavés",
    description: "Le pavé classique polyvalent pour allées, terrasses et sols extérieurs. Élégance intemporelle.",
    features: ["Polyvalent", "Élégant", "Facile à poser"],
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Classique.png",
  },
  {
    id: 11,
    name: "Pavé Goutte Design",
    category: "Pavés",
    description: "Pavés au design contemporain pour aménagements paysagers modernes et espaces publics stylisés.",
    features: ["Design moderne", "Paysager", "Esthétique"],
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Design.png",
  },
  {
    id: 12,
    name: "Pavé Goutte Renforcé",
    category: "Pavés",
    description: "Pavés renforcés pour trafic intense, zones industrielles et parkings à fort passage. Résistance maximale.",
    features: ["Trafic intense", "Industriel", "Résistance extrême"],
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Renforc%C3%A9.png",
  },
];

export default function Produits() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filtered =
    activeCategory === "Tous"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-24 pb-20">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero%20section/webaliser-_TPTXZd9mOo-unsplash.jpg"
            alt="Intérieur moderne construit avec nos briques"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 pt-20 sm:pb-24 sm:pt-40">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/70 text-sm uppercase tracking-widest mb-4 font-medium"
            >
              Bienvenue chez Lomé Turque Brique
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              DES BRIQUES<br />
              DE QUALITÉ
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-base sm:text-lg mb-10 leading-relaxed max-w-lg"
            >
              Découvrez notre gamme complète de briques turques haute résistance, alliant tradition, durabilité et design moderne pour vos projets de construction.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#produits"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#b8860b] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#a07400] transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Explorer
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-300"
              >
                Contactez-nous
              </a>
            </motion.div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === 0 ? "bg-white scale-110" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* CATÉGORIES — Style goutte */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-ltb-blue font-semibold text-sm uppercase tracking-widest">Notre catalogue</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-3 mb-4">
                4 familles, 12 références
              </h2>
              <p className="text-ltb-light max-w-2xl mx-auto text-lg">
                Chaque projet mérite la brique qui lui correspond. Explorez nos catégories conçues pour toutes les constructions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryData.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 0.1}>
                <motion.button
                  whileHover={{ y: -8 }}
                  onClick={() => setActiveCategory(cat.name === "Briques Pleines" ? "Briques pleines" : cat.name === "Briques Creuses" ? "Creuses" : cat.name)}
                  className="w-full text-left bg-white rounded-3xl p-8 shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-ltb-blue/10 transition-all duration-500 border border-ltb-gray/20 group"
                >
                  <div className="w-16 h-16 mb-6 flex items-center justify-center bg-ltb-blue/5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] group-hover:bg-ltb-blue group-hover:text-white transition-all duration-500 text-ltb-blue">
                    <cat.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2 text-ltb-blue group-hover:text-ltb-blue transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-ltb-light text-sm leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-ltb-blue/70 group-hover:text-ltb-blue transition-colors">
                    {cat.count} produits <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FILTRES */}
      <section id="produits" className="py-10 bg-ltb-gray/10 border-y border-ltb-gray/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter size={20} className="text-ltb-blue" />
            <span className="font-semibold text-sm">Filtrer par catégorie</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-ltb-blue text-white shadow-lg shadow-ltb-blue/30"
                    : "bg-white text-black hover:bg-ltb-blue/10 border border-ltb-gray/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRILLE PRODUITS */}
      <section className="py-16 bg-ltb-gray/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-heading text-3xl font-bold">
                {activeCategory === "Tous" ? "Tous nos produits" : activeCategory}
              </h2>
              <span className="text-sm text-ltb-light">{filtered.length} produit{filtered.length > 1 ? "s" : ""}</span>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-ltb-blue/15 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative h-64 overflow-hidden bg-ltb-gray/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-4"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium">Cliquez pour détails</span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-ltb-blue/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-ltb-blue transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-ltb-light text-sm mb-4 line-clamp-2">{product.description}</p>
                    <button className="inline-flex items-center gap-1 text-ltb-blue font-medium text-sm hover:gap-2 transition-all duration-300">
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-80 bg-ltb-gray/10 flex items-center justify-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain p-8"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-1.5 bg-ltb-blue text-white text-sm font-medium rounded-full">
                    {selectedProduct.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="font-heading text-3xl font-bold mb-4">{selectedProduct.name}</h2>
                <p className="text-ltb-light leading-relaxed mb-8">{selectedProduct.description}</p>
                <h3 className="font-semibold text-lg mb-4">Caractéristiques</h3>
                <ul className="grid sm:grid-cols-3 gap-3 mb-8">
                  {selectedProduct.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 px-4 py-3 bg-ltb-blue/5 rounded-xl text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-ltb-blue" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-ltb-blue text-white rounded-full font-semibold hover:bg-ltb-blue/90 transition-all duration-300 hover:scale-105 shadow-lg"
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
