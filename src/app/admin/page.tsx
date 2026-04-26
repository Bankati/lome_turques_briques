"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Star,
  LogOut,
  Trash2,
  CheckCircle2,
  Clock,
  Globe,
  GlobeLock,
  Loader2,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

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
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, published } : t)));
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
      <header className="sticky top-0 z-30 bg-[#0f172a] text-white shadow-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#0666A2]">
              <Image
                src="/images/logo.jpg"
                alt="LTB"
                width={24}
                height={24}
                className="rounded object-cover"
              />
            </div>
            <span className="text-lg font-bold tracking-tight">LTB Admin</span>
          </div>

          {/* Tabs */}
          <nav className="hidden items-center gap-1 rounded-xl bg-white/5 p-1 sm:flex">
            <button
              onClick={() => setTab("messages")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                tab === "messages"
                  ? "bg-[#0666A2] text-white shadow"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <MessageSquare size={15} />
              Messages
              {unreadCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setTab("testimonials")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                tab === "testimonials"
                  ? "bg-[#0666A2] text-white shadow"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
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
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10"
              title="Actualiser"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-all hover:bg-red-500/20 hover:text-red-400"
            >
              {logoutLoading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <LogOut size={15} />
              )}
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="flex border-t border-white/10 sm:hidden">
          <button
            onClick={() => setTab("messages")}
            className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
              tab === "messages" ? "border-b-2 border-[#0666A2] text-white" : "text-white/50"
            }`}
          >
            <MessageSquare size={15} />
            Messages {unreadCount > 0 && `(${unreadCount})`}
          </button>
          <button
            onClick={() => setTab("testimonials")}
            className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
              tab === "testimonials" ? "border-b-2 border-[#0666A2] text-white" : "text-white/50"
            }`}
          >
            <Star size={15} />
            Témoignages
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "Total messages",
              value: messages.length,
              icon: MessageSquare,
              color: "bg-blue-500",
            },
            { label: "Non lus", value: unreadCount, icon: Clock, color: "bg-orange-500" },
            { label: "Total avis", value: testimonials.length, icon: Star, color: "bg-purple-500" },
            { label: "Publiés", value: publishedCount, icon: Globe, color: "bg-green-500" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                <div
                  className={`h-8 w-8 ${stat.color} flex items-center justify-center rounded-lg`}
                >
                  <stat.icon size={15} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? (
                  <span className="inline-block h-7 w-8 animate-pulse rounded bg-gray-200" />
                ) : (
                  stat.value
                )}
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
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Messages de contact
                <span className="ml-2 text-sm font-normal text-gray-400">({messages.length})</span>
              </h2>
            </div>

            {messages.length === 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
                <MessageSquare size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">Aucun message reçu pour l&apos;instant.</p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 ${
                  msg.read ? "border-gray-100" : "border-[#0666A2]/30 shadow-[#0666A2]/10"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${msg.read ? "bg-gray-400" : "bg-[#0666A2]"}`}
                    >
                      {msg.firstName[0]}
                      {msg.lastName[0]}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {msg.firstName} {msg.lastName}
                        </span>
                        {!msg.read && (
                          <span className="rounded-full bg-[#0666A2] px-2 py-0.5 text-xs font-medium text-white">
                            Nouveau
                          </span>
                        )}
                        <span className="ml-auto text-xs text-gray-400">
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-4">
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
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{msg.message}</p>
                    </div>
                  </div>

                  {/* Expanded message */}
                  {expandedMsg === msg.id && (
                    <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                        {msg.message}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
                    <button
                      onClick={() => setExpandedMsg(expandedMsg === msg.id ? null : msg.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      {expandedMsg === msg.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {expandedMsg === msg.id ? "Réduire" : "Voir tout"}
                    </button>
                    <button
                      onClick={() => markMessageRead(msg.id, !msg.read)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        msg.read
                          ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      {msg.read ? "Marquer non lu" : "Marquer lu"}
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="ml-auto flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-100"
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
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Témoignages
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({testimonials.length})
                </span>
              </h2>
              <span className="text-sm text-gray-500">
                <span className="font-semibold text-green-600">{publishedCount}</span> publiés ·{" "}
                <span className="font-semibold text-gray-500">
                  {testimonials.length - publishedCount}
                </span>{" "}
                en attente
              </span>
            </div>

            {testimonials.length === 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
                <Star size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">Aucun témoignage pour l&apos;instant.</p>
              </div>
            )}

            {testimonials.map((t) => (
              <div
                key={t.id}
                className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 ${
                  t.published ? "border-green-200" : "border-gray-100"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${t.published ? "bg-green-500" : "bg-gray-400"}`}
                    >
                      {t.name[0]}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{t.name}</span>
                        <span className="text-xs text-gray-500">{t.role}</span>
                        <span
                          className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
                            t.published
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {t.published ? "Publié" : "En attente"}
                        </span>
                      </div>
                      {/* Stars */}
                      <div className="mt-1 flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={
                              i < t.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-400">
                          {formatDate(t.createdAt)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.text}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
                    <button
                      onClick={() => toggleTestimonial(t.id, !t.published)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        t.published
                          ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      {t.published ? <GlobeLock size={14} /> : <Globe size={14} />}
                      {t.published ? "Dépublier" : "Publier sur le site"}
                    </button>
                    <button
                      onClick={() => deleteTestimonial(t.id)}
                      className="ml-auto flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-100"
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
