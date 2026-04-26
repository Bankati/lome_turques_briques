"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://wa.me/22870837575"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg"
          >
            Discutons sur WhatsApp
            {/* Flèche */}
            <span className="absolute right-[-5px] top-1/2 h-0 w-0 -translate-y-1/2 border-b-4 border-l-4 border-t-4 border-transparent border-l-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton */}
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl"
        style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
      >
        {/* Halo pulsant */}
        <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-25" />

        {/* Icône WhatsApp officielle */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-8 w-8"
          fill="white"
        >
          <path d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17.2 43 20.5 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.4l-.6-.4-6.2 1.6 1.6-6-.4-.6C8.1 30.1 7.2 27.1 7.2 24c0-9.3 7.5-16.8 16.8-16.8S40.8 14.7 40.8 24 33.3 40 24 40zm9.2-12.6c-.5-.2-3-1.5-3.5-1.6-.5-.2-.8-.2-1.1.2-.3.5-1.2 1.6-1.5 2-.3.3-.5.3-1 .1-2.6-1.3-4.3-2.3-6-5.2-.4-.8.4-.7 1.2-2.4.1-.3.1-.5-.1-.7-.2-.2-1.1-2.6-1.5-3.6-.4-.9-.8-.8-1.1-.8H17c-.3 0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.8s1.7 4.4 1.9 4.7c.2.3 3.3 5 7.9 7C26.9 32 28 32 29 31.6c.6-.3 2-1.3 2.3-2.5.3-1.2.3-2.3.2-2.5-.1-.2-.4-.3-.9-.5z" />
        </svg>
      </motion.div>
    </a>
  );
}
