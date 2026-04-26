"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Star,
  LogOut,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Globe,
  GlobeLock,
  Loader2,
  Phone,
  Mail,
  User,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";

interface Message {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  createdAt: string;
  published: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"messages" | "testimonials">("messages");
  const [messages, setMessages] = useState<Message[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMsg, setExpandedMsg] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [msgRes, testRes] = await Promise.all([
        fetch("/api/admin/messages"),
        fetch("/api/admin/testimonials"),
      ]);
      if (msgRes.status === 401 || testRes.status === 401) {
        router.push("/admin/login");
        return;
      }
      const [msgs, tests] = await Promise.all([msgRes.json(), testRes.json()]);
      if (Array.isArray(msgs)) setMessages(msgs);
      if (Array.isArray(tests)) setTestimonials(tests);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleLogout() {
    setLogoutLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function markMessageRead(id: string, read: boolean) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
  }

  async function deleteMessage(id: string) {
    if (!confirm("Supprimer ce message ?")) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
  }

  async function toggleTestimonial(id: string, published: boolean) {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, published } : t))
    );
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published }),
    });
  }

  async function deleteTestimonial(id: string) {
    if (!confirm("Supprimer ce témoignage ?")) return;
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
  }

  const unreadCount = messages.filter((m) => !m.read).length;
  const publishedCount = testimonials.filter((t) => t.published).length;

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Top bar */}
      <header className="bg-[#0f172a] text-white sticky top-0 z-30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0666A2] rounded-lg flex items-center justify-center flex-shrink-0">
              <img src="/images/logo.jpg" alt="LTB" className="w-6 h-6 rounded object-cover" />
            </div>
            <span className="font-bold text-lg tracking-tight">LTB Admin</span>
          </div>

          {/* Tabs */}
          <nav className="hidden sm:flex items-center gap-1 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setTab("messages")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === "messages"
                  ? "bg-[#0666A2] text-white shadow"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <MessageSquare size={15} />
              Messages
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setTab("testimonials")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === "testimonials"
                  ? "bg-[#0666A2] text-white shadow"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Star size={15} />
              Témoignages
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              title="Actualiser"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 rounded-lg text-sm font-medium transition-all"
            >
              {logoutLoading ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />}
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="sm:hidden flex border-t border-white/10">
          <button
            onClick={() => setTab("messages")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
              tab === "messages" ? "text-white border-b-2 border-[#0666A2]" : "text-white/50"
            }`}
          >
            <MessageSquare size={15} />
            Messages {unreadCount > 0 && `(${unreadCount})`}
          </button>
          <button
            onClick={() => setTab("testimonials")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
              tab === "testimonials" ? "text-white border-b-2 border-[#0666A2]" : "text-white/50"
            }`}
          >
            <Star size={15} />
            Témoignages
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total messages", value: messages.length, icon: MessageSquare, color: "bg-blue-500" },
            { label: "Non lus", value: unreadCount, icon: Clock, color: "bg-orange-500" },
            { label: "Total avis", value: testimonials.length, icon: Star, color: "bg-purple-500" },
            { label: "Publiés", value: publishedCount, icon: Globe, color: "bg-green-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon size={15} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? <span className="inline-block w-8 h-7 bg-gray-200 rounded animate-pulse" /> : stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[#0666A2]" />
          </div>
        )}

        {/* MESSAGES TAB */}
        {!loading && tab === "messages" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Messages de contact
                <span className="ml-2 text-sm font-normal text-gray-400">({messages.length})</span>
              </h2>
            </div>

            {messages.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <MessageSquare size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Aucun message reçu pour l&apos;instant.</p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-white rounded-2xl border shadow-sm transition-all duration-200 ${
                  msg.read ? "border-gray-100" : "border-[#0666A2]/30 shadow-[#0666A2]/10"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white text-sm ${msg.read ? "bg-gray-400" : "bg-[#0666A2]"}`}>
                      {msg.firstName[0]}{msg.lastName[0]}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 text-sm">
                          {msg.firstName} {msg.lastName}
                        </span>
                        {!msg.read && (
                          <span className="px-2 py-0.5 bg-[#0666A2] text-white text-xs rounded-full font-medium">
                            Nouveau
                          </span>
                        )}
                        <span className="text-xs text-gray-400 ml-auto">{formatDate(msg.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Mail size={12} /> {msg.email}
                        </span>
                        {msg.phone && (
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Phone size={12} /> {msg.phone}
                          </span>
                        )}
                      </div>
                      {/* Message preview */}
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {msg.message}
                      </p>
                    </div>
                  </div>

                  {/* Expanded message */}
                  {expandedMsg === msg.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setExpandedMsg(expandedMsg === msg.id ? null : msg.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors"
                    >
                      {expandedMsg === msg.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {expandedMsg === msg.id ? "Réduire" : "Voir tout"}
                    </button>
                    <button
                      onClick={() => markMessageRead(msg.id, !msg.read)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        msg.read
                          ? "bg-orange-50 hover:bg-orange-100 text-orange-600"
                          : "bg-green-50 hover:bg-green-100 text-green-600"
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      {msg.read ? "Marquer non lu" : "Marquer lu"}
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {!loading && tab === "testimonials" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Témoignages
                <span className="ml-2 text-sm font-normal text-gray-400">({testimonials.length})</span>
              </h2>
              <span className="text-sm text-gray-500">
                <span className="text-green-600 font-semibold">{publishedCount}</span> publiés ·{" "}
                <span className="text-gray-500 font-semibold">{testimonials.length - publishedCount}</span> en attente
              </span>
            </div>

            {testimonials.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <Star size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Aucun témoignage pour l&apos;instant.</p>
              </div>
            )}

            {testimonials.map((t) => (
              <div
                key={t.id}
                className={`bg-white rounded-2xl border shadow-sm transition-all duration-200 ${
                  t.published ? "border-green-200" : "border-gray-100"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white text-sm ${t.published ? "bg-green-500" : "bg-gray-400"}`}>
                      {t.name[0]}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 text-sm">{t.name}</span>
                        <span className="text-xs text-gray-500">{t.role}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ml-auto ${
                          t.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {t.published ? "Publié" : "En attente"}
                        </span>
                      </div>
                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">{formatDate(t.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{t.text}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => toggleTestimonial(t.id, !t.published)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        t.published
                          ? "bg-orange-50 hover:bg-orange-100 text-orange-600"
                          : "bg-green-50 hover:bg-green-100 text-green-600"
                      }`}
                    >
                      {t.published ? <GlobeLock size={14} /> : <Globe size={14} />}
                      {t.published ? "Dépublier" : "Publier sur le site"}
                    </button>
                    <button
                      onClick={() => deleteTestimonial(t.id)}
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-medium rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
