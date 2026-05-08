"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Leaf,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  Star,
  Building2,
  HardHat,
  Warehouse,
  CheckCircle2,
  Plus,
  Minus,
  Clock,
  Truck,
  PhoneCall,
  Package,
  Flame,
  Zap,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

// ─── DONNÉES ──────────────────────────────────────────────────────────────────

const heroImages = [
  "/images/hero%20section/emilie-PCEYPtW3vN8-unsplash.jpg",
  "/images/hero%20section/webaliser-_TPTXZd9mOo-unsplash.jpg",
];

const stats = [
  { icon: Building2,  value: 7,   suffix: "+",  label: "Années d'expérience" },
  { icon: Warehouse,  value: 50,  suffix: "K+", label: "Briques produites"   },
  { icon: HardHat,    value: 200, suffix: "+",  label: "Chantiers livrés"    },
  { icon: Shield,     value: 100, suffix: "%",  label: "Clients satisfaits"  },
];

const features = [
  {
    icon: Shield,
    title: "Qualité Supérieure",
    description:
      "Briques certifiées, conçues pour résister aux conditions climatiques du Togo et aux aléas saisonniers.",
  },
  {
    icon: Flame,
    title: "Savoir-faire Turc",
    description:
      "Une technologie de fabrication éprouvée, importée directement de Turquie pour des résultats durables.",
  },
  {
    icon: Leaf,
    title: "Ressources Locales",
    description:
      "Nous valorisons les matières premières locales pour une construction durable et respectueuse.",
  },
  {
    icon: Zap,
    title: "Service Rapide",
    description:
      "Livraison sous 24 à 48h dans la région de Lomé. Nos experts vous accompagnent sur chantier.",
  },
];

const categories = ["Tous", "Creuses", "Pleines", "Turque", "Pavés", "Hourdies"];

const products = [
  {
    name: "Briques Creuses 12",
    description: "Légères et résistantes, idéales pour les constructions modernes.",
    image: "/images/produits/creuses/12%20briques%20creuses.png",
    tag: "Populaire",
    category: "Creuses",
  },
  {
    name: "Briques Creuses 15",
    description: "Excellente isolation thermique pour les murs intérieurs.",
    image: "/images/produits/creuses/15%20briques%20creuses.png",
    tag: "Best-seller",
    category: "Creuses",
  },
  {
    name: "Modèle Turque 12",
    description: "Le savoir-faire turc adapté aux standards africains.",
    image: "/images/produits/creuses/12%20creu%20modele%20turque.png",
    tag: "Premium",
    category: "Turque",
  },
  {
    name: "Briques Pleines 10",
    description: "Robustesse maximale pour fondations et murs porteurs.",
    image: "/images/produits/briques%20pleines/10%20pleines.png",
    tag: "Classique",
    category: "Pleines",
  },
  {
    name: "Briques Pleines 15",
    description: "Haute densité pour une résistance structurelle optimale.",
    image: "/images/produits/briques%20pleines/15%20pleines.png",
    tag: "Classique",
    category: "Pleines",
  },
  {
    name: "Briques Pleines 20",
    description: "La référence pour les murs porteurs et les gros œuvres.",
    image: "/images/produits/briques%20pleines/20%20pleines.png",
    tag: "Classique",
    category: "Pleines",
  },
  {
    name: "Pavé Goutte Classique",
    description: "Antidérapant et esthétique pour allées et sols extérieurs.",
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Classique.png",
    tag: "Nouveau",
    category: "Pavés",
  },
  {
    name: "Pavé Goutte Design",
    description: "Finition soignée pour vos espaces extérieurs modernes.",
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Design.png",
    tag: "Design",
    category: "Pavés",
  },
  {
    name: "Pavé Antidérapant",
    description: "Sécurité maximale pour zones humides et passages fréquentés.",
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Antid%C3%A9rapant.png",
    tag: "Sécurité",
    category: "Pavés",
  },
  {
    name: "Pavé Goutte Renforcé",
    description: "Résistance renforcée pour charges lourdes et trafic intense.",
    image: "/images/produits/pav%C3%A9s/Pav%C3%A9%20Goutte%20Renforc%C3%A9.png",
    tag: "Pro",
    category: "Pavés",
  },
  {
    name: "Hourdie 12",
    description: "Hourdis léger pour dalles et planchers en béton armé.",
    image: "/images/produits/hourdie/Hourdie%2012.png",
    tag: "Technique",
    category: "Hourdies",
  },
  {
    name: "Hourdie 15",
    description: "Hourdis renforcé pour grandes portées et charges lourdes.",
    image: "/images/produits/hourdie/Hourdie%2015.png",
    tag: "Technique",
    category: "Hourdies",
  },
];

const processSteps = [
  { icon: PhoneCall, step: "01", title: "Demande de Devis",  description: "Contactez-nous par téléphone, WhatsApp ou formulaire. Réponse sous 2h."                         },
  { icon: Package,   step: "02", title: "Consultation",       description: "Nos experts analysent votre projet et vous recommandent les matériaux adaptés."                   },
  { icon: Flame,     step: "03", title: "Production",         description: "Fabrication sur mesure selon vos spécifications et normes de qualité."                             },
  { icon: Truck,     step: "04", title: "Livraison",          description: "Livraison rapide sous 24-48h dans la région de Lomé et ses environs."                             },
];

const faqData = [
  {
    question: "Quels types de briques proposez-vous ?",
    answer: "Nous proposons cinq gammes : briques creuses (légères et économiques), briques pleines (haute densité), le modèle turque (technologie premium), les hourdies (pour planchers) et les pavés (sols extérieurs antidérapants).",
  },
  {
    question: "Quel est le délai de livraison pour une commande ?",
    answer: "Pour les commandes standards dans la région de Lomé, la livraison se fait sous 24 à 48 heures ouvrables. Pour les grandes quantités ou hors région, nous vous fournissons un devis personnalisé.",
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
    answer: "Le prix dépend du type de brique, de la quantité commandée (tarifs dégressifs à partir de 5 000 unités), du lieu de livraison et des options de finition. Contactez-nous pour un devis sur mesure.",
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
  { id: "1", text: "J'ai construit ma maison avec les briques de Lomé Turque Brique et je suis plus que satisfait. La qualité est exceptionnelle et le service client impeccable.", name: "Koffi A.",   role: "Lomé",                  rating: 5, createdAt: new Date().toISOString() },
  { id: "2", text: "Entreprise sérieuse et professionnelle. Les briques livrées étaient exactement comme sur les échantillons. Je recommande vivement !",                          name: "Amah E.",   role: "Architecte",            rating: 5, createdAt: new Date().toISOString() },
  { id: "3", text: "La résistance de ces briques est remarquable. Même après la saison des pluies, aucun problème à signaler. Un investissement durable.",                        name: "Séna G.",   role: "Promoteur immobilier",  rating: 5, createdAt: new Date().toISOString() },
  { id: "4", text: "Très satisfait de la qualité des pavés. L'équipe a été réactive et professionnelle du devis à la livraison.",                                                 name: "Kossi M.",  role: "Entrepreneur BTP",      rating: 5, createdAt: new Date().toISOString() },
  { id: "5", text: "Les briques turques sont vraiment d'une autre qualité. Mon chantier a pu avancer vite grâce à leur ponctualité de livraison.",                                name: "Afi D.",    role: "Particulier",           rating: 5, createdAt: new Date().toISOString() },
];

// ─── SOUS-COMPOSANTS ──────────────────────────────────────────────────────────

const tagStyles: Record<string, string> = {
  Populaire:    "bg-blue-50 text-blue-700",
  "Best-seller":"bg-green-50 text-green-700",
  Premium:      "bg-primary-lighter text-primary-dark",
  Classique:    "bg-gray-100 text-gray-600",
  Nouveau:      "bg-primary-light/10 text-primary-dark",
  Design:       "bg-purple-50 text-purple-700",
  Technique:    "bg-orange-50 text-orange-700",
  "Sécurité":   "bg-red-50 text-red-700",
  Pro:          "bg-primary-dark text-white",
};

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:border-primary-light/40 hover:shadow-xl"
    >
      <div className="relative h-52 overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${tagStyles[product.tag] ?? "bg-gray-100 text-gray-600"}`}>
          {product.tag}
        </span>
      </div>
      <div className="p-5">
        <h3 className="mb-1.5 font-heading text-base font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="mb-4 text-xs leading-relaxed text-gray-500">{product.description}</p>
        <Link
          href="/produits/"
          className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-primary-dark transition-colors hover:text-primary-light"
        >
          Voir les détails
          <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ t }: { t: TestimonialData }) {
  return (
    <div className="w-[320px] flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} className={i < t.rating ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-100"} />
        ))}
        <span className="ml-1.5 text-xs font-semibold text-gray-400">{t.rating}.0</span>
      </div>
      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm font-bold text-white">
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [currentHero,     setCurrentHero]     = useState(0);
  const [activeCategory,  setActiveCategory]  = useState("Tous");
  const [testimonials,    setTestimonials]    = useState<TestimonialData[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res  = await fetch("/api/testimonials/");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setTestimonials(Array.isArray(data) && data.length > 0 ? data : fallbackTestimonials);
      } catch {
        setTestimonials(fallbackTestimonials);
      } finally {
        setTestimonialsLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrentHero((p) => (p + 1) % heroImages.length), 6000);
    return () => clearInterval(t);
  }, []);

  const nextHero = () => setCurrentHero((p) => (p + 1) % heroImages.length);
  const prevHero = () => setCurrentHero((p) => (p - 1 + heroImages.length) % heroImages.length);

  const filteredProducts =
    activeCategory === "Tous" ? products : products.filter((p) => p.category === activeCategory);

  const display   = testimonialsLoading || testimonials.length === 0 ? fallbackTestimonials : testimonials;
  const duplicated = [...display, ...display, ...display, ...display];

  return (
    <div>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Slideshow background */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHero}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{   opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <Image src={heroImages[currentHero]} alt="Construction en briques" fill className="object-cover" priority />
            </motion.div>
          </AnimatePresence>
          {/* Overlay bleu marine officiel */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/85 via-primary-dark/75 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Motif briques */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <pattern id="hero-bricks" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
              <rect x="1"  y="1"  width="37" height="18" rx="3" fill="white" />
              <rect x="42" y="1"  width="37" height="18" rx="3" fill="white" />
              <rect x="21" y="21" width="37" height="18" rx="3" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-bricks)" />
          </svg>
        </div>

        {/* Contenu */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:max-w-[60%] lg:text-left">

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-light/30 bg-primary-light/15 px-4 py-2 text-sm font-semibold text-primary-light backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light" />
                🇹🇬 La qualité turque au service du Togo
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Briques de<br />
              <span className="text-primary-light">Qualité Supérieure</span><br />
              <span className="text-white/90">pour le Togo</span>
            </motion.h1>

            {/* Texte */}
            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0"
            >
              Nous produisons des briques solides et esthétiques pour vos constructions modernes.
              Alliant le savoir-faire turc et les ressources locales depuis 7 ans.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Link
                href="/contact/"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-light px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary-light/30 transition-all duration-300 hover:scale-105 hover:bg-primary-600 hover:shadow-xl"
              >
                Obtenir un Devis
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/produits/"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
              >
                Voir nos Produits
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-10 flex items-center justify-center gap-4 lg:justify-start"
            >
              <div className="flex -space-x-2">
                {[
                  { initial: "K", bg: "bg-primary-dark"  },
                  { initial: "A", bg: "bg-primary-light"  },
                  { initial: "S", bg: "bg-emerald-500"    },
                  { initial: "E", bg: "bg-amber-500"      },
                ].map((item, i) => (
                  <div key={i} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/20 text-xs font-bold text-white ${item.bg}`}>
                    {item.initial}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-xs text-white/70">
                  <span className="font-semibold text-white">200+</span> clients satisfaits
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Flèches navigation */}
        <div className="pointer-events-none absolute left-4 right-4 top-1/2 z-20 flex -translate-y-1/2 justify-between">
          <button onClick={prevHero} className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextHero} className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicateurs dots */}
        <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setCurrentHero(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentHero ? "w-8 bg-primary-light" : "w-2 bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════════ */}
      <section className="border-y border-gray-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px bg-gray-200 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-gray-200 lg:bg-transparent">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="group flex flex-col items-center bg-white px-3 py-10 text-center transition-all duration-300 sm:px-6"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-lighter transition-colors duration-300 group-hover:bg-primary-dark">
                    <stat.icon size={24} strokeWidth={1.8} className="text-primary-dark transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div className="mb-2 font-heading text-4xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mb-3 h-0.5 w-8 rounded-full bg-primary-dark transition-all duration-300 group-hover:w-14" />
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-lighter px-4 py-1.5 text-sm font-semibold text-primary-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-dark" />
                Notre engagement
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                Pourquoi choisir{" "}
                <span className="text-primary-dark">Lomé Turque Brique</span> ?
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                Depuis plus de 7 ans, nous accompagnons architectes, entrepreneurs et particuliers
                avec des matériaux fiables et un service à la hauteur de leurs ambitions.
              </p>
            </div>
          </ScrollReveal>

          {/* 2-col layout */}
          <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-20">
            {/* Feature cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feat, i) => (
                <ScrollReveal key={feat.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-light/40 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-lighter">
                      <feat.icon size={22} className="text-primary-dark" />
                    </div>
                    <h3 className="mb-2 font-heading text-base font-semibold text-gray-900">
                      {feat.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500">{feat.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* Image */}
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="absolute -bottom-6 -right-6 -z-10 hidden h-full w-full rounded-3xl bg-primary-lighter sm:block" />
                <div className="relative h-[460px] overflow-hidden rounded-3xl shadow-2xl shadow-black/15">
                  <Image src="/images/klim-musalimov-rJPwYtWcMxw-unsplash.jpg" alt="Production Lomé Turque Brique" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/30 to-transparent" />
                </div>
                {/* Badge flottant */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute -bottom-5 left-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-dark">
                    <HardHat size={22} className="text-white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-bold leading-none text-gray-900">200+</p>
                    <p className="mt-0.5 text-xs text-gray-500">Chantiers livrés</p>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {[{ text: "✓ Briques certifiées" }, { text: "✓ Livraison 24-48h" }, { text: "✓ Conseil sur chantier" }].map((item) => (
                <span key={item.text} className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm">
                  {item.text}
                </span>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/contact/"
                className="group inline-flex items-center gap-2 rounded-full bg-primary-dark px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-dark/25 transition-all duration-300 hover:scale-105 hover:bg-primary-navy"
              >
                Demander un devis gratuit
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRODUITS
      ══════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-lighter px-4 py-1.5 text-sm font-semibold text-primary-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-dark" />
                Catalogue
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                Nos Produits
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                Une gamme complète de briques et matériaux pour tous vos projets de construction.
              </p>
            </div>
          </ScrollReveal>

          {/* Filtres */}
          <ScrollReveal delay={0.1}>
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary-dark text-white shadow-md shadow-primary-dark/25"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-primary-dark/40 hover:text-primary-dark"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grille */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 0.05}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </motion.div>

          {/* Voir tous */}
          <div className="mt-12 text-center">
            <Link
              href="/produits/"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-primary-dark px-8 py-3.5 text-sm font-semibold text-primary-dark transition-all duration-300 hover:bg-primary-dark hover:text-white"
            >
              Voir tous nos produits
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TÉMOIGNAGES
      ══════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-lighter px-4 py-1.5 text-sm font-semibold text-primary-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-dark" />
                Avis clients
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                Ce que disent{" "}
                <span className="text-primary-dark">nos clients</span>
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                Des dizaines de clients satisfaits nous font confiance pour leurs projets de
                construction au Togo.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Marquee 1 */}
        <div className="relative flex gap-5 overflow-x-hidden">
          <div className="flex animate-marquee gap-5">
            {duplicated.slice(0, Math.ceil(duplicated.length / 2)).map((t, i) => <TestimonialCard key={`a-${i}`} t={t} />)}
          </div>
          <div className="flex animate-marquee gap-5" aria-hidden>
            {duplicated.slice(0, Math.ceil(duplicated.length / 2)).map((t, i) => <TestimonialCard key={`b-${i}`} t={t} />)}
          </div>
        </div>

        {/* Marquee 2 (inverse) */}
        <div className="relative mt-5 flex gap-5 overflow-x-hidden">
          <div className="flex animate-marquee-reverse gap-5">
            {duplicated.slice(Math.ceil(duplicated.length / 2)).map((t, i) => <TestimonialCard key={`c-${i}`} t={t} />)}
          </div>
          <div className="flex animate-marquee-reverse gap-5" aria-hidden>
            {duplicated.slice(Math.ceil(duplicated.length / 2)).map((t, i) => <TestimonialCard key={`d-${i}`} t={t} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESSUS
      ══════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-lighter px-4 py-1.5 text-sm font-semibold text-primary-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-dark" />
                Comment ça marche
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                Votre commande{" "}
                <span className="text-primary-dark">en 4 étapes</span>
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                Un processus simple et transparent, du devis à la livraison sur chantier.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Ligne connectrice desktop */}
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary-dark/20 to-transparent lg:block" />

            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:border-primary-light/40 hover:shadow-md"
                >
                  <div className="relative mb-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-lighter">
                      <step.icon size={26} className="text-primary-dark" strokeWidth={1.8} />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark text-xs font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mb-2 font-heading text-base font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{step.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24">
        {/* Background bleu marine officiel */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #001F4D 0%, #003D7A 60%, #002B5C 100%)" }}
        />
        {/* Motif briques */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <pattern id="cta-bricks" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
              <rect x="1"  y="1"  width="37" height="18" rx="3" fill="white" />
              <rect x="42" y="1"  width="37" height="18" rx="3" fill="white" />
              <rect x="21" y="21" width="37" height="18" rx="3" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-bricks)" />
          </svg>
        </div>
        {/* Glow */}
        <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-light/15 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-dark/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="mb-6 inline-block rounded-full border border-primary-light/30 bg-primary-light/15 px-4 py-1.5 text-sm font-semibold text-primary-light">
              Prêt à démarrer votre projet ?
            </span>
            <h2 className="mb-6 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Transformez vos projets<br />
              <span className="text-primary-light">avec nos briques</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/60">
              Contactez-nous dès aujourd&apos;hui pour obtenir un devis personnalisé. Notre équipe
              vous répond sous 2 heures.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact/"
                className="group inline-flex items-center gap-2 rounded-full bg-primary-light px-10 py-4 text-base font-semibold text-white shadow-lg shadow-primary-light/30 transition-all duration-300 hover:scale-105 hover:bg-primary-600 hover:shadow-xl"
              >
                Obtenir un Devis Gratuit
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="tel:+22870837575"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                <PhoneCall size={18} />
                +228 70 83 75 75
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-lighter px-4 py-1.5 text-sm font-semibold text-primary-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-dark" />
                FAQ
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                Questions fréquentes
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                Tout ce que vous devez savoir avant de commander.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-primary-light/40">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-heading text-sm font-semibold text-gray-900 sm:text-base">
                      {faq.question}
                    </span>
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${openFaq === i ? "bg-primary-dark text-white" : "bg-gray-100 text-gray-500"}`}>
                      {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      >
                        <div className="border-t border-gray-100 px-6 pb-5 pt-4">
                          <p className="text-sm leading-relaxed text-gray-500">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA contact */}
          <ScrollReveal delay={0.3}>
            <div className="mt-10 rounded-2xl bg-gray-50 p-8 text-center">
              <Clock size={32} className="mx-auto mb-3 text-primary-dark" />
              <h3 className="mb-2 font-heading text-lg font-semibold text-gray-900">
                Vous avez d&apos;autres questions ?
              </h3>
              <p className="mb-5 text-sm text-gray-500">
                Notre équipe est disponible du lundi au samedi de 8h à 18h.
              </p>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 rounded-full bg-primary-dark px-7 py-3 text-sm font-semibold text-white shadow-md shadow-primary-dark/20 transition-all hover:bg-primary-navy"
              >
                Contactez-nous
                <ChevronRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
