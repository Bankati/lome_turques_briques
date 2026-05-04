"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
    description: "Des finitions variées pour s'adapter à tous vos projets architecturaux.",
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
    answer:
      "Nous proposons trois gammes principales : les briques creuses (légères et économiques), les briques pleines (haute densité pour murs porteurs), et les pavés (antidérapants pour sols extérieurs et allées).",
  },
  {
    question: "Quel est le délai de livraison pour une commande ?",
    answer:
      "Pour les commandes standards dans la région de Lomé, la livraison se fait sous 24 à 48 heures ouvrables. Pour les grandes quantités ou les livraisons hors région, nous vous fournissons un devis personnalisé.",
  },
  {
    question: "Quels sont les avantages des briques turques ?",
    answer:
      "Les briques turques offrent une résistance thermique supérieure, une durabilité exceptionnelle face aux intempéries, un excellent rapport qualité-prix et une finition esthétique soignée adaptée à tous les styles architecturaux.",
  },
  {
    question: "Proposez-vous des conseils pour choisir mes briques ?",
    answer:
      "Oui, notre équipe commerciale et nos ingénieurs sont à votre disposition pour vous guider selon votre projet : fondations, murs de clôture, dallage extérieur, ou construction de maison. Nous effectuons même des visites sur chantier.",
  },
  {
    question: "Quels facteurs influencent le prix des briques ?",
    answer:
      "Le prix dépend du type de brique (creuse, pleine ou pavé), de la quantité commandée (tarifs dégressifs à partir de 5 000 unités), du lieu de livraison et des options de finition. Contactez-nous pour un devis sur mesure.",
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
  {
    id: "4",
    text: "Très satisfait de la qualité des pavés. L'équipe a été réactive et professionnelle du devis à la livraison.",
    name: "Kossi M.",
    role: "Entrepreneur BTP",
    rating: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    text: "Les briques turques sont vraiment d'une autre qualité. Mon chantier a pu avancer vite grâce à leur ponctualité de livraison.",
    name: "Afi D.",
    role: "Particulier",
    rating: 5,
    createdAt: new Date().toISOString(),
  },
];

function TestimonialCard({ t }: { t: TestimonialData }) {
  return (
    <div className="w-[340px] flex-shrink-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={13}
            className={i < t.rating ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-100"}
          />
        ))}
        <span className="ml-1.5 text-xs font-semibold text-gray-400">{t.rating}.0</span>
      </div>
      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ltb-blue text-sm font-bold text-white">
          {t.name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{t.name}</p>
          <p className="text-xs text-gray-400">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials/");
        if (!res.ok) throw new Error("Erreur de chargement");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch {
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
  const prevHero = () =>
    setCurrentHero((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  const displayTestimonials =
    testimonialsLoading || testimonials.length === 0
      ? fallbackTestimonials
      : testimonials;
  const duplicated = [
    ...displayTestimonials,
    ...displayTestimonials,
    ...displayTestimonials,
    ...displayTestimonials,
  ];

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
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
              <Image
                src={heroImages[currentHero]}
                alt="Construction en briques"
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-br from-ltb-blue/80 via-ltb-blue-dark/70 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Brick pattern overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <pattern
              id="bricks-chevron"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect x="0" y="0" width="36" height="36" fill="white" />
              <rect x="40" y="40" width="36" height="36" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#bricks-chevron)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Text block — centered on mobile, left-aligned on desktop */}
          <div className="text-center lg:max-w-[58%] lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                🇹🇬 La qualité turque au service du Togo
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl"
            >
              Bienvenue chez
              <br />
              <span className="text-white/90">Lomé Turque Brique</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-lg lg:mx-0 lg:text-xl"
            >
              Nous produisons des briques solides et esthétiques pour vos constructions modernes.
              Alliant le savoir-faire turque et les ressources locales.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Link
                href="/contact/"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-ltb-blue shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-xl"
              >
                Contactez-nous
                <ChevronRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/produits/"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/40 bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                Découvrir nos produits
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-10 flex items-center justify-center gap-4 lg:justify-start"
            >
              <div className="flex -space-x-2">
                {[
                  { initial: "K", color: "bg-ltb-blue" },
                  { initial: "A", color: "bg-ltb-brick" },
                  { initial: "S", color: "bg-emerald-500" },
                  { initial: "E", color: "bg-amber-500" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/20 text-xs font-bold text-white ${item.color}`}
                  >
                    {item.initial}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/70">
                <span className="font-semibold text-white">200+</span> clients satisfaits
              </p>
            </motion.div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="pointer-events-none absolute left-4 right-4 top-1/2 z-20 flex -translate-y-1/2 justify-between">
          <button
            onClick={prevHero}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextHero}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHero(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentHero ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
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

      {/* ─── STATS ─── */}
      <section className="border-y border-gray-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-y-2 divide-gray-100 lg:grid-cols-4 lg:divide-x-2 lg:divide-y-0">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="group flex flex-col items-center px-6 py-8 text-center transition-all duration-300"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-ltb-blue/[0.08] transition-colors duration-300 group-hover:bg-ltb-blue">
                    <stat.icon
                      size={24}
                      strokeWidth={1.8}
                      className="text-ltb-blue transition-colors duration-300 group-hover:text-white"
                    />
                  </div>
                  <div className="mb-2 font-heading text-5xl font-bold leading-none tracking-tight text-gray-900 sm:text-6xl">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mb-3 h-0.5 w-8 rounded-full bg-ltb-blue transition-all duration-300 group-hover:w-12" />
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURE — Image + avantages ─── */}
      <section className="overflow-hidden bg-ltb-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-20">
            <ScrollReveal>
              <div>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-ltb-blue/10 px-4 py-1.5 text-sm font-semibold text-ltb-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-ltb-blue" />
                  Notre engagement
                </span>
                <h2 className="mb-4 font-heading text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                  Votre projet mérite{" "}
                  <span className="relative">
                    <span className="text-ltb-blue">ce qu&apos;il y a</span>
                    <br />
                    <span className="text-ltb-blue">de mieux.</span>
                  </span>
                </h2>
                <p className="mb-10 max-w-md text-base leading-relaxed text-gray-500">
                  Depuis plus de 7 ans, nous accompagnons architectes, entrepreneurs et particuliers
                  avec des matériaux fiables et un service à la hauteur de leurs ambitions.
                </p>
                <div className="mb-10 space-y-4">
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
                      className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:border-ltb-blue/20 hover:shadow-md"
                    >
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ltb-blue/10">
                        <CheckCircle2 size={16} className="text-ltb-blue" />
                      </div>
                      <p className="text-sm leading-relaxed text-gray-700">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
                <Link
                  href="/contact/"
                  className="group inline-flex items-center gap-2 rounded-full bg-ltb-blue px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-ltb-blue/25 transition-all duration-300 hover:scale-105 hover:bg-ltb-blue-hover"
                >
                  Demander un devis gratuit
                  <ChevronRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="absolute -bottom-5 -right-5 -z-10 hidden h-full w-full rounded-3xl bg-ltb-blue/10 sm:block" />
                <div className="absolute -left-5 -top-5 -z-10 hidden h-24 w-24 rounded-2xl bg-ltb-brick/15 sm:block" />
                <div className="relative h-[480px] overflow-hidden rounded-3xl shadow-2xl shadow-black/15">
                  <Image
                    src="/images/klim-musalimov-rJPwYtWcMxw-unsplash.jpg"
                    alt="Production de briques Lomé Turque Brique"
                    fill
                    className="object-cover"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute -bottom-5 left-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-ltb-blue">
                    <HardHat size={22} className="text-white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-heading text-xl font-bold leading-none text-gray-900">200+</p>
                    <p className="mt-0.5 text-xs text-gray-500">Chantiers livrés</p>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── QUALITIES — Genesis editorial ─── */}
      <section className="bg-gray-950 py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="mb-5 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-ltb-blue">
                  <span className="h-px w-8 bg-ltb-blue" />
                  Nos engagements
                </span>
                <h2 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Ce qui rend nos briques
                  <br />
                  <span className="font-normal italic text-white/30">
                    véritablement uniques.
                  </span>
                </h2>
              </div>
              <Link
                href="/produits/"
                className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/60 transition-all hover:border-white/30 hover:text-white"
              >
                Voir nos produits
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </ScrollReveal>

          {/* Editorial grid */}
          <div className="grid divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {qualities.map((quality, i) => {
              const accent = [
                {
                  iconBg: "group-hover:bg-ltb-blue",
                  iconBorder: "border-ltb-blue/20 group-hover:border-ltb-blue",
                  iconText: "text-ltb-blue group-hover:text-white",
                  line: "from-ltb-blue",
                },
                {
                  iconBg: "group-hover:bg-emerald-500",
                  iconBorder: "border-emerald-500/20 group-hover:border-emerald-500",
                  iconText: "text-emerald-400 group-hover:text-white",
                  line: "from-emerald-500",
                },
                {
                  iconBg: "group-hover:bg-ltb-brick",
                  iconBorder: "border-ltb-brick/20 group-hover:border-ltb-brick",
                  iconText: "text-ltb-brick group-hover:text-white",
                  line: "from-ltb-brick",
                },
              ][i];
              return (
                <ScrollReveal key={quality.title} delay={i * 0.12}>
                  <motion.div
                    className="group relative overflow-hidden px-8 py-12 transition-colors duration-500 hover:bg-white/[0.03]"
                  >
                    {/* Decorative large number */}
                    <span className="pointer-events-none absolute -right-3 -top-3 select-none font-heading text-[120px] font-bold leading-none text-white/[0.04]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div
                      className={`mb-8 flex h-12 w-12 items-center justify-center rounded-xl border bg-white/5 transition-all duration-300 ${accent.iconBg} ${accent.iconBorder}`}
                    >
                      <quality.icon
                        size={22}
                        strokeWidth={1.8}
                        className={`transition-colors duration-300 ${accent.iconText}`}
                      />
                    </div>

                    <h3 className="mb-4 font-heading text-2xl font-bold text-white">
                      {quality.title}
                    </h3>
                    <p className="mb-8 text-sm leading-relaxed text-white/50">
                      {quality.description}
                    </p>

                    {/* Hover reveal line */}
                    <div
                      className={`h-px w-0 bg-gradient-to-r to-transparent transition-all duration-500 group-hover:w-full ${accent.line}`}
                    />
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-ltb-blue">
                  Catalogue
                </span>
                <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
                  Nos Produits Populaires
                </h2>
              </div>
              <Link
                href="/produits/"
                className="group inline-flex items-center gap-2 font-semibold text-ltb-blue transition-all duration-300 hover:gap-3"
              >
                Voir tous les produits
                <ChevronRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {products.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 transition-all duration-500 hover:shadow-2xl hover:shadow-ltb-blue/20"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-ltb-blue px-3 py-1 text-xs font-semibold text-white">
                        {product.tag}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-heading text-xl font-bold transition-colors group-hover:text-ltb-blue">
                      {product.name}
                    </h3>
                    <p className="mb-4 text-sm text-gray-500">{product.description}</p>
                    <Link
                      href="/produits/"
                      className="inline-flex items-center gap-1 text-sm font-medium text-ltb-blue transition-all duration-300 hover:gap-2"
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

      {/* ─── TESTIMONIALS — Marquee ─── */}
      <section className="overflow-hidden bg-ltb-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="mb-5 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-ltb-blue">
                <span className="h-px w-8 bg-ltb-blue" />
                Témoignages
                <span className="h-px w-8 bg-ltb-blue" />
              </span>
              <h2 className="mt-3 font-heading text-4xl font-bold text-gray-900 sm:text-5xl">
                Ce que nos{" "}
                <span className="font-normal italic text-gray-400">clients</span> disent de nous
              </h2>
            </div>
          </ScrollReveal>
        </div>

        {/* Row 1 — left scroll */}
        <div className="relative mb-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-ltb-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-ltb-cream to-transparent" />
          <div className="overflow-hidden">
            <div className="marquee-track flex w-max animate-marquee gap-5 pb-1">
              {duplicated.map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 — right scroll */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-ltb-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-ltb-cream to-transparent" />
          <div className="overflow-hidden">
            <div className="marquee-track flex w-max animate-marquee-reverse gap-5 pb-1">
              {duplicated.map((t, i) => (
                <TestimonialCard key={`r-${i}`} t={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Add testimonial button */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            <button
              onClick={() => {
                setShowTestimonialModal(true);
                setTestimonialSubmitted(false);
                setTestimonialForm({ name: "", role: "", rating: 5, text: "" });
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-gray-900 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-50"
            >
              <MessageSquarePlus size={20} className="text-ltb-blue" />
              <span className="text-ltb-blue">Ajouter votre témoignage</span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-0.5 w-8 bg-ltb-blue" />
                <span className="text-sm font-semibold uppercase tracking-widest text-ltb-blue">
                  FAQs
                </span>
              </div>
              <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
                Des <span className="text-gray-900">questions ?</span>{" "}
                <span className="font-normal italic text-gray-400">Consultez ici.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <motion.div
                key={i}
                initial={false}
                className={`overflow-hidden rounded-xl transition-colors duration-300 ${
                  openFaq === i ? "bg-ltb-blue" : "bg-gray-50"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span
                    className={`pr-4 text-sm font-medium ${
                      openFaq === i ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  {openFaq === i ? (
                    <Minus size={20} className="flex-shrink-0 text-white" />
                  ) : (
                    <Plus size={20} className="flex-shrink-0 text-gray-400" />
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
                      <p className="px-5 pb-5 text-sm leading-relaxed text-white/90">
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

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-black py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-ltb-blue/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <pattern
              id="cta-bricks"
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
            <rect width="100%" height="100%" fill="url(#cta-bricks)" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-6 font-heading text-4xl font-bold text-white sm:text-5xl">
              Prêt à commencer votre projet ?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
              Contactez-nous dès aujourd&apos;hui pour obtenir un devis gratuit et découvrir comment
              nos briques de qualité peuvent améliorer votre construction.
            </p>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-full bg-ltb-blue px-10 py-5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-ltb-blue/90 hover:shadow-2xl"
            >
              Demander un devis
              <ChevronRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── MODAL TÉMOIGNAGE ─── */}
      <AnimatePresence>
        {showTestimonialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowTestimonialModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between bg-gradient-to-br from-ltb-blue to-ltb-blue-dark p-6">
                <h3 className="font-heading text-xl font-bold text-white">
                  {testimonialSubmitted ? "Merci !" : "Votre témoignage"}
                </h3>
                <button
                  onClick={() => setShowTestimonialModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8">
                {testimonialSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-8 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h4 className="mb-2 font-heading text-2xl font-bold text-gray-900">
                      Commentaire envoyé !
                    </h4>
                    <p className="text-gray-500">
                      Merci pour votre témoignage. Il sera examiné et publié prochainement.
                    </p>
                    <button
                      onClick={() => setShowTestimonialModal(false)}
                      className="mt-6 rounded-full bg-ltb-blue px-8 py-3 font-medium text-white transition-colors hover:bg-ltb-blue/90"
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
                      } catch (err: unknown) {
                        setSubmitError(
                          err instanceof Error ? err.message : "Une erreur est survenue"
                        );
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
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
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/20"
                          placeholder="Ex: Jean K."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
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
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/20"
                          placeholder="Ex: Architecte / Construction Moderne SA"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Note</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setTestimonialForm({ ...testimonialForm, rating: star })}
                            className="transition-transform hover:scale-110 focus:outline-none"
                          >
                            <Star
                              size={24}
                              className={
                                star <= testimonialForm.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Votre commentaire
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={testimonialForm.text}
                        onChange={(e) =>
                          setTestimonialForm({ ...testimonialForm, text: e.target.value })
                        }
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/20"
                        placeholder="Partagez votre expérience avec nos produits..."
                      />
                    </div>

                    {submitError && (
                      <p className="text-center text-sm text-red-500">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-ltb-blue px-6 py-4 font-semibold text-white shadow-lg shadow-ltb-blue/20 transition-all duration-300 hover:scale-[1.02] hover:bg-ltb-blue-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? (
                        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
