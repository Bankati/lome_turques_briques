"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Leaf,
  Palette,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  Star,
  Building2,
  HardHat,
  Warehouse,
  MessageSquarePlus,
  X,
  Send,
  User,
  Briefcase,
  CheckCircle2,
  Plus,
  Minus,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

const heroImages = [
  "/images/hero%20section/emilie-PCEYPtW3vN8-unsplash.jpg",
  "/images/hero%20section/webaliser-_TPTXZd9mOo-unsplash.jpg",
];

const stats = [
  { icon: Building2, value: 7, suffix: "+", label: "Années d'expérience" },
  { icon: Warehouse, value: 50000, suffix: "+", label: "Briques produites" },
  { icon: HardHat, value: 200, suffix: "+", label: "Chantiers livrés" },
  { icon: Shield, value: 3, suffix: "", label: "Types de briques" },
];

const qualities = [
  {
    icon: Shield,
    title: "Haute Résistance",
    description:
      "Nos briques offrent une durabilité exceptionnelle et une résistance aux intempéries.",
  },
  {
    icon: Leaf,
    title: "Écologiques",
    description:
      "Des matériaux naturels et des processus de fabrication respectueux de l'environnement.",
  },
  {
    icon: Palette,
    title: "Esthétique",
    description:
      "Des finitions variées pour s'adapter à tous vos projets architecturaux.",
  },
];

const products = [
  {
    name: "Briques Creuses 12",
    description: "Briques creuses légères et résistantes pour constructions modernes.",
    image: "/images/produits/creuses/12%20briques%20creuses.png",
    tag: "Populaire",
  },
  {
    name: "Pavés Goutte Classique",
    description: "Pavés antidérapants pour allées et sols extérieurs.",
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Classique.png",
    tag: "Nouveau",
  },
  {
    name: "Briques Pleines 20",
    description: "Briques pleines haute densité pour murs porteurs et fondations.",
    image: "/images/produits/briques%20pleines/20%20pleines.png",
    tag: "Classique",
  },
];

const faqData = [
  {
    question: "Quels types de briques proposez-vous ?",
    answer: "Nous proposons trois gammes principales : les briques creuses (légères et économiques), les briques pleines (haute densité pour murs porteurs), et les pavés (antidérapants pour sols extérieurs et allées).",
  },
  {
    question: "Quel est le délai de livraison pour une commande ?",
    answer: "Pour les commandes standards dans la région de Lomé, la livraison se fait sous 24 à 48 heures ouvrables. Pour les grandes quantités ou les livraisons hors région, nous vous fournissons un devis personnalisé.",
  },
  {
    question: "Quels sont les avantages des briques turques ?",
    answer: "Les briques turques offrent une résistance thermique supérieure, une durabilité exceptionnelle face aux intempéries, un excellent rapport qualité-prix et une finition esthétique soignée adaptée à tous les styles architecturaux.",
  },
  {
    question: "Proposez-vous des conseils pour choisir mes briques ?",
    answer: "Oui, notre équipe commerciale et nos ingénieurs sont à votre disposition pour vous guider selon votre projet : fondations, murs de clôture, dallage extérieur, ou construction de maison. Nous effectuons même des visites sur chantier.",
  },
  {
    question: "Quels facteurs influencent le prix des briques ?",
    answer: "Le prix dépend du type de brique (creuse, pleine ou pavé), de la quantité commandée (tarifs dégressifs à partir de 5 000 unités), du lieu de livraison et des options de finition. Contactez-nous pour un devis sur mesure.",
  },
];

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  createdAt: string;
}

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    rating: 5,
    text: "",
  });
  const [testimonialSubmitted, setTestimonialSubmitted] = useState(false);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fallbackTestimonials: TestimonialData[] = [
    {
      id: "1",
      text: "J'ai construit ma maison avec les briques de Lomé Turque Brique et je suis plus que satisfait. La qualité est exceptionnelle et le service client impeccable.",
      name: "Koffi A.",
      role: "Lomé",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      text: "Entreprise sérieuse et professionnelle. Les briques livrées étaient exactement comme sur les échantillons. Je recommande vivement !",
      name: "Amah E.",
      role: "Architecte",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      text: "La résistance de ces briques est remarquable. Même après la saison des pluies, aucun problème à signaler. Un investissement durable.",
      name: "Séna G.",
      role: "Promoteur immobilier",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
  ];

  // Load testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials/");
        if (!res.ok) throw new Error("Erreur de chargement");
        const data = await res.json();
        // Use fallback if API returns empty or invalid data
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (err) {
        setTestimonialsError("Impossible de charger les témoignages");
        setTestimonials(fallbackTestimonials);
      } finally {
        setTestimonialsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextHero = () => setCurrentHero((prev) => (prev + 1) % heroImages.length);
  const prevHero = () => setCurrentHero((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background slideshow */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHero}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img
                src={heroImages[currentHero]}
                alt="Construction en briques"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-ltb-blue/80 via-[#044d7a]/70 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Diagonal brick pattern overlay inspired by reference image */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="bricks-chevron" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect x="0" y="0" width="36" height="36" fill="white" />
              <rect x="40" y="40" width="36" height="36" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#bricks-chevron)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
              🇹🇬 La qualité turque au service du Togo
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Bienvenue chez
            <br />
            <span className="text-white/90">Lomé Turque Brique</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Nous produisons des briques solides et esthétiques pour vos constructions modernes.
            Alliant le savoir-faire turque et les ressources locales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact/"
              className="group px-8 py-4 bg-white text-ltb-blue rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg inline-flex items-center justify-center gap-2"
            >
              Contactez-nous
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/produits/"
              className="px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
            >
              Découvrir nos produits
            </Link>
          </motion.div>
        </div>

        {/* Hero navigation arrows */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
          <button
            onClick={prevHero}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto border border-white/20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextHero}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto border border-white/20"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Hero dots indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHero(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentHero ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-gray-100">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="group flex flex-col items-center text-center px-6 py-8 transition-all duration-300"
                >
                  {/* Icône */}
                  <div className="w-14 h-14 rounded-2xl bg-ltb-blue/8 flex items-center justify-center mb-5 group-hover:bg-ltb-blue transition-colors duration-300">
                    <stat.icon
                      size={24}
                      strokeWidth={1.8}
                      className="text-ltb-blue group-hover:text-white transition-colors duration-300"
                    />
                  </div>

                  {/* Nombre */}
                  <div className="font-heading text-5xl sm:text-6xl font-bold text-gray-900 leading-none mb-2 tracking-tight">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Trait accent */}
                  <div className="w-8 h-0.5 rounded-full bg-ltb-blue mb-3 group-hover:w-12 transition-all duration-300" />

                  {/* Label */}
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE — Klim image + benefits */}
      <section className="py-24 bg-ltb-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Colonne gauche — Texte */}
            <ScrollReveal>
              <div>
                {/* Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-ltb-blue/10 rounded-full text-ltb-blue text-sm font-semibold mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-ltb-blue" />
                  Notre engagement
                </span>

                {/* Titre */}
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Votre projet mérite{" "}
                  <span className="relative">
                    <span className="text-ltb-blue">ce qu'il y a</span>
                    <br />
                    <span className="text-ltb-blue">de mieux.</span>
                  </span>
                </h2>

                <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-md">
                  Depuis plus de 7 ans, nous accompagnons architectes, entrepreneurs et particuliers avec des matériaux fiables et un service à la hauteur de leurs ambitions.
                </p>

                {/* Feature items — style pill cards */}
                <div className="space-y-4 mb-10">
                  {[
                    {
                      text: "Des briques certifiées, conçues pour résister aux conditions climatiques du Togo.",
                    },
                    {
                      text: "Livraison rapide sous 24 à 48h dans la région de Lomé et ses environs.",
                    },
                    {
                      text: "Nos experts vous conseillent sur chantier pour choisir les bons matériaux.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.12 }}
                      className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-ltb-blue/20 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-ltb-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={16} className="text-ltb-blue" />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/contact/"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-ltb-blue text-white rounded-full font-semibold text-sm hover:bg-[#055a8e] transition-all duration-300 hover:scale-105 shadow-lg shadow-ltb-blue/25"
                >
                  Demander un devis gratuit
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Colonne droite — Image klim */}
            <ScrollReveal delay={0.2}>
              <div className="relative">
                {/* Cadre décoratif derrière l'image */}
                <div className="hidden sm:block absolute -bottom-5 -right-5 w-full h-full rounded-3xl bg-ltb-blue/10 -z-10" />
                <div className="hidden sm:block absolute -top-5 -left-5 w-24 h-24 rounded-2xl bg-ltb-brick/15 -z-10" />

                {/* Image principale */}
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/15">
                  <img
                    src="/images/klim-musalimov-rJPwYtWcMxw-unsplash.jpg"
                    alt="Production de briques Lomé Turque Brique"
                    className="w-full h-[480px] object-cover"
                  />
                </div>

                {/* Badge flottant */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4 border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-ltb-blue flex items-center justify-center flex-shrink-0">
                    <HardHat size={22} className="text-white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-gray-900 text-xl leading-none">200+</p>
                    <p className="text-gray-500 text-xs mt-0.5">Chantiers livrés</p>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* QUALITIES */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-ltb-blue/8 rounded-full text-ltb-blue text-sm font-semibold mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-ltb-blue" />
                Nos atouts
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 mt-2 mb-4">
                Ce qui rend nos briques{" "}
                <span className="relative inline-block">
                  <span className="text-ltb-blue">uniques</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
                    <path d="M0 5 Q25 0 50 5 Q75 0 100 5" stroke="#C4622D" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
                Des matériaux de construction conçus pour durer et embellir vos projets.
              </p>
            </div>
          </ScrollReveal>

          {/* Cards split-top */}
          <div className="grid md:grid-cols-3 gap-6">
            {qualities.map((quality, i) => {
              const themes = [
                {
                  gradient: "linear-gradient(135deg, #0666A2 0%, #044d7a 100%)",
                  soft: "#EFF6FF",
                  accent: "#0666A2",
                },
                {
                  gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  soft: "#F0FDF4",
                  accent: "#059669",
                },
                {
                  gradient: "linear-gradient(135deg, #f59e0b 0%, #C4622D 100%)",
                  soft: "#FFFBEB",
                  accent: "#C4622D",
                },
              ];
              const theme = themes[i];
              return (
                <ScrollReveal key={quality.title} delay={i * 0.15}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-black/12 transition-all duration-500"
                  >
                    {/* Zone colorée haute */}
                    <div
                      className="relative h-52 flex items-center justify-center overflow-hidden"
                      style={{ background: theme.gradient }}
                    >
                      {/* Cercles décoratifs */}
                      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
                      <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/10" />
                      <div className="absolute top-4 left-5 w-8 h-8 rounded-full bg-white/10" />

                      {/* Numéro décoratif en fond */}
                      <span className="absolute bottom-3 right-5 font-heading font-bold text-7xl leading-none text-white/10 select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Icône centrale avec effet verre */}
                      <motion.div
                        className="relative z-10 w-22 h-22 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg ring-1 ring-white/30">
                          <quality.icon size={38} strokeWidth={1.5} className="text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Zone blanche basse */}
                    <div className="bg-white px-7 py-6 border-x border-b border-gray-100 rounded-b-3xl">
                      <div
                        className="inline-block w-8 h-1 rounded-full mb-4"
                        style={{ background: theme.gradient }}
                      />
                      <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                        {quality.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {quality.description}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <span className="text-ltb-blue font-semibold text-sm uppercase tracking-widest">Catalogue</span>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-3">
                  Nos Produits Populaires
                </h2>
              </div>
              <Link
                href="/produits/"
                className="group inline-flex items-center gap-2 text-ltb-blue font-semibold hover:gap-3 transition-all duration-300"
              >
                Voir tous les produits
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-ltb-blue/20 transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-ltb-blue text-white text-xs font-semibold rounded-full">
                        {product.tag}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-ltb-blue transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-ltb-light text-sm mb-4">{product.description}</p>
                    <Link
                      href="/produits/"
                      className="inline-flex items-center gap-1 text-ltb-blue font-medium text-sm hover:gap-2 transition-all duration-300"
                    >
                      En savoir plus <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-ltb-blue" />
                <span className="text-ltb-blue font-semibold text-sm uppercase tracking-widest">Témoignages</span>
                <div className="w-8 h-0.5 bg-ltb-blue" />
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-3 text-white">
                Ce que nos <span className="text-white/50 font-normal italic">clients</span> disent de nous
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsLoading
              ? [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg animate-pulse">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-24" />
                        <div className="h-3 bg-gray-200 rounded w-16" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                      <div className="h-3 bg-gray-200 rounded w-4/6" />
                    </div>
                  </div>
                ))
              : testimonials.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-ltb-blue/10 flex items-center justify-center text-ltb-blue font-bold text-lg flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                      />
                    ))}
                    <span className="text-gray-900 font-semibold text-xs ml-1">{t.rating}.0</span>
                  </div>
                  <div className="text-ltb-blue text-3xl leading-none font-serif ml-1">&ldquo;</div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">{t.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Pagination bars */}
          <div className="flex justify-center gap-2 mt-10">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === 0 ? "w-8 bg-ltb-blue" : "w-4 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Bouton ajouter témoignage */}
          <ScrollReveal>
            <div className="text-center mt-12">
              <button
                onClick={() => {
                  setShowTestimonialModal(true);
                  setTestimonialSubmitted(false);
                  setTestimonialForm({ name: "", role: "", rating: 5, text: "" });
                }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <MessageSquarePlus size={20} className="text-ltb-blue" />
                <span className="text-ltb-blue">Ajouter votre témoignage</span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-ltb-blue" />
                <span className="text-ltb-blue font-semibold text-sm uppercase tracking-widest">FAQs</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-3">
                Des <span className="text-gray-900">questions ?</span>{" "}
                <span className="text-gray-400 font-normal italic">Consultez ici.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <motion.div
                key={i}
                initial={false}
                className={`rounded-xl overflow-hidden transition-colors duration-300 ${
                  openFaq === i ? "bg-ltb-blue" : "bg-gray-50"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span
                    className={`font-medium text-sm pr-4 ${
                      openFaq === i ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  {openFaq === i ? (
                    <Minus size={20} className="text-white flex-shrink-0" />
                  ) : (
                    <Plus size={20} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-5 text-white/90 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ltb-blue/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
              Prêt à commencer votre projet ?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Contactez-nous dès aujourd&apos;hui pour obtenir un devis gratuit et découvrir comment
              nos briques de qualité peuvent améliorer votre construction.
            </p>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 px-10 py-5 bg-ltb-blue text-white rounded-full font-semibold text-lg hover:bg-ltb-blue/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              Demander un devis
              <ChevronRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
      {/* MODAL TÉMOIGNAGE */}
      <AnimatePresence>
        {showTestimonialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowTestimonialModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-ltb-blue to-[#044d7a] p-6 flex items-center justify-between">
                <h3 className="font-heading text-xl font-bold text-white">
                  {testimonialSubmitted ? "Merci !" : "Votre témoignage"}
                </h3>
                <button
                  onClick={() => setShowTestimonialModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8">
                {testimonialSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h4 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                      Commentaire envoyé !
                    </h4>
                    <p className="text-gray-500">
                      Merci pour votre témoignage. Il sera examiné et publié prochainement.
                    </p>
                    <button
                      onClick={() => setShowTestimonialModal(false)}
                      className="mt-6 px-8 py-3 bg-ltb-blue text-white rounded-full font-medium hover:bg-ltb-blue/90 transition-colors"
                    >
                      Fermer
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setSubmitting(true);
                      setSubmitError(null);
                      try {
                        const res = await fetch("/api/testimonials/", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name: testimonialForm.name,
                            role: testimonialForm.role,
                            rating: testimonialForm.rating,
                            text: testimonialForm.text,
                          }),
                        });
                        if (!res.ok) {
                          const data = await res.json();
                          throw new Error(data.error || "Erreur lors de l'envoi");
                        }
                        setTestimonialSubmitted(true);
                      } catch (err: any) {
                        setSubmitError(err.message || "Une erreur est survenue");
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Votre nom
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={testimonialForm.name}
                          onChange={(e) =>
                            setTestimonialForm({ ...testimonialForm, name: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/20 outline-none transition-all text-sm"
                          placeholder="Ex: Jean K."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Entreprise / Rôle
                      </label>
                      <div className="relative">
                        <Briefcase size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={testimonialForm.role}
                          onChange={(e) =>
                            setTestimonialForm({ ...testimonialForm, role: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/20 outline-none transition-all text-sm"
                          placeholder="Ex: Architecte / Construction Moderne SA"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Note
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setTestimonialForm({ ...testimonialForm, rating: star })
                            }
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              size={24}
                              className={
                                star <= testimonialForm.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-200 fill-gray-200"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Votre commentaire
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={testimonialForm.text}
                        onChange={(e) =>
                          setTestimonialForm({ ...testimonialForm, text: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/20 outline-none transition-all text-sm resize-none"
                        placeholder="Partagez votre expérience avec nos produits..."
                      />
                    </div>

                    {submitError && (
                      <p className="text-red-500 text-sm text-center">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-ltb-blue text-white rounded-xl font-semibold hover:bg-[#055a8e] transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-ltb-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send size={18} />
                      )}
                      {submitting ? "Envoi en cours..." : "Envoyer mon témoignage"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
