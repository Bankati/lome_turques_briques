"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Send, CheckCircle2 } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";

const contactItems = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+228 70 393924",
    href: "tel:+22870837575",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+228 70 83 75 75",
    href: "https://wa.me/22870837575",
  },
  {
    icon: Mail,
    label: "Email",
    value: "lometurcbrique@gmail.com",
    href: "mailto:lometurcbrique@gmail.com",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi");
      setIsSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-20 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Titre centré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="font-heading text-4xl font-bold text-gray-900 sm:text-5xl">
            Contactez-nous
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-500">
            Une question, une commande ou un projet ? Remplissez le formulaire et notre équipe vous
            répond rapidement.
          </p>
        </motion.div>

        {/* Grille principale */}
        <div className="grid items-start gap-6 lg:grid-cols-5">
          {/* ── Colonne gauche — Formulaire ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8 lg:col-span-3 lg:p-10"
          >
            {!isSubmitted ? (
              <>
                <h2 className="mb-1 font-heading text-2xl font-bold text-gray-900">
                  Envoyez-nous un message
                </h2>
                <p className="mb-8 text-sm leading-relaxed text-gray-500">
                  Vous avez une question ou besoin d&apos;aide pour choisir le bon produit ?
                  Contactez-nous, nous sommes là pour vous.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Ligne 1 — Prénom + Nom */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Prénom
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        placeholder="Entrez votre prénom"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-ltb-blue focus:outline-none focus:ring-2 focus:ring-ltb-blue/15"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Nom</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        placeholder="Entrez votre nom"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-ltb-blue focus:outline-none focus:ring-2 focus:ring-ltb-blue/15"
                      />
                    </div>
                  </div>

                  {/* Ligne 2 — Email + Téléphone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Entrez votre email"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-ltb-blue focus:outline-none focus:ring-2 focus:ring-ltb-blue/15"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Téléphone
                      </label>
                      <PhoneInput
                        value={formData.phone}
                        onChange={(v) => handleChange("phone", v)}
                      />
                    </div>
                  </div>

                  {/* Ligne 3 — Message */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Entrez votre message"
                      className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-ltb-blue focus:outline-none focus:ring-2 focus:ring-ltb-blue/15"
                    />
                  </div>

                  {/* Erreur */}
                  {submitError && (
                    <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500">
                      {submitError}
                    </p>
                  )}

                  {/* Bouton submit — aligné à droite comme dans l'image */}
                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-full bg-ltb-blue px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ltb-blue/25 transition-all duration-300 hover:scale-105 hover:bg-ltb-blue-hover disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <Send size={16} />
                      )}
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* État succès */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="mb-3 font-heading text-2xl font-bold text-gray-900">
                  Message envoyé !
                </h3>
                <p className="mb-8 max-w-xs text-sm text-gray-500">
                  Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmitError(null);
                    setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
                  }}
                  className="rounded-full bg-ltb-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-ltb-blue/90"
                >
                  Nouveau message
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* ── Colonne droite — Carte sombre ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6 rounded-3xl p-8 text-white lg:col-span-2"
            style={{ background: "linear-gradient(160deg, #0a3d62 0%, #044d7a 50%, #032e4a 100%)" }}
          >
            {/* Accroche */}
            <div>
              <h3 className="mb-2 font-heading text-2xl font-bold leading-snug">
                Bonjour ! Nous sommes toujours disponibles pour vous aider.
              </h3>
            </div>

            {/* Infos de contact */}
            <div className="flex flex-col gap-3">
              {contactItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition-all duration-300 hover:bg-white/15"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
                    <item.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                </a>
              ))}

              {/* Adresse */}
              <a
                href="https://maps.google.com/?q=Adetikope+Lome+Togo"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl bg-white/10 p-4 transition-all duration-300 hover:bg-white/15"
              >
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60">Adresse</p>
                  <p className="text-sm font-semibold leading-snug text-white">
                    Nationale N°1, sous le pont Tsikpo-Noukoudji, Adétikopé, Lomé
                  </p>
                </div>
              </a>
            </div>

            {/* Réseaux sociaux */}
            <div className="border-t border-white/15 pt-2">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/60">
                Retrouvez-nous sur
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/lome.turc.brique"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/lometurc?igsh=MTlqNmk4cnpldTQwbQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@lome.turc.brique?lang=fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/22870837575"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.123 1.533 5.858L.057 23.427a.75.75 0 0 0 .916.983l5.763-1.511A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.523-5.197-1.432l-.374-.224-3.878 1.017 1.034-3.772-.242-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
