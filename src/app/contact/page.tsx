"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Send, CheckCircle2 } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";

const contactItems = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+228 70 83 75 75",
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
    <div className="min-h-screen bg-gray-50 pt-20 sm:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Titre centré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900">
            Contactez-nous
          </h1>
          <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
            Une question, une commande ou un projet ? Remplissez le formulaire et notre équipe vous répond rapidement.
          </p>
        </motion.div>

        {/* Grille principale */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* ── Colonne gauche — Formulaire ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-8 lg:p-10"
          >
            {!isSubmitted ? (
              <>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-1">
                  Envoyez-nous un message
                </h2>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  Vous avez une question ou besoin d'aide pour choisir le bon produit ? Contactez-nous, nous sommes là pour vous.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Ligne 1 — Prénom + Nom */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Prénom
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        placeholder="Entrez votre prénom"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nom
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        placeholder="Entrez votre nom"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Ligne 2 — Email + Téléphone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Entrez votre email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Entrez votre message"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/15 transition-all resize-none"
                    />
                  </div>

                  {/* Erreur */}
                  {submitError && (
                    <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      {submitError}
                    </p>
                  )}

                  {/* Bouton submit — aligné à droite comme dans l'image */}
                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-ltb-blue text-white text-sm font-semibold rounded-full hover:bg-[#055a8e] transition-all duration-300 hover:scale-105 shadow-lg shadow-ltb-blue/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  Message envoyé !
                </h3>
                <p className="text-gray-500 text-sm max-w-xs mb-8">
                  Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmitError(null);
                    setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
                  }}
                  className="px-6 py-3 bg-ltb-blue text-white text-sm font-semibold rounded-full hover:bg-ltb-blue/90 transition-all"
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
            className="lg:col-span-2 rounded-3xl p-8 text-white flex flex-col gap-6"
            style={{ background: "linear-gradient(160deg, #0a3d62 0%, #044d7a 50%, #032e4a 100%)" }}
          >
            {/* Accroche */}
            <div>
              <h3 className="font-heading text-2xl font-bold leading-snug mb-2">
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
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors">
                    <item.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-medium">{item.label}</p>
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  </div>
                </a>
              ))}

              {/* Adresse */}
              <a
                href="https://maps.google.com/?q=Adetikope+Lome+Togo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-white/25 transition-colors">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs font-medium">Adresse</p>
                  <p className="text-white font-semibold text-sm leading-snug">
                    Nationale N°1, sous le pont Tsikpo-Noukoudji, Adétikopé, Lomé
                  </p>
                </div>
              </a>
            </div>

            {/* Réseaux sociaux */}
            <div className="pt-2 border-t border-white/15">
              <p className="text-white/60 text-xs font-medium mb-4 uppercase tracking-widest">
                Retrouvez-nous sur
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/lome.turc.brique"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/lometurc?igsh=MTlqNmk4cnpldTQwbQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@lome.turc.brique?lang=fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/22870837575"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.123 1.533 5.858L.057 23.427a.75.75 0 0 0 .916.983l5.763-1.511A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.523-5.197-1.432l-.374-.224-3.878 1.017 1.034-3.772-.242-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
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
