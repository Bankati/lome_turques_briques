"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { countries, defaultCountry, type Country } from "@/data/countries";

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string;
}

export default function PhoneInput({ value, onChange, placeholder = "Votre numéro" }: PhoneInputProps) {
  const [selected, setSelected] = useState<Country>(defaultCountry);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = search.trim()
    ? countries.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dialCode.includes(search)
      )
    : countries;

  const select = useCallback((country: Country) => {
    setSelected(country);
    setOpen(false);
    setSearch("");
  }, []);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="flex gap-2 relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 font-medium flex-shrink-0 hover:bg-gray-100 hover:border-gray-300 transition-all focus:outline-none focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/15"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="text-gray-600">{selected.dialCode}</span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Input */}
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-ltb-blue focus:ring-2 focus:ring-ltb-blue/15 transition-all"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full mt-1.5 z-50 bg-white rounded-2xl shadow-xl border border-gray-100 w-72 flex flex-col overflow-hidden">
          {/* Search bar */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un pays..."
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* List */}
          <ul
            role="listbox"
            className="overflow-y-auto max-h-56 py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">
                Aucun résultat
              </li>
            ) : (
              filtered.map((country) => (
                <li
                  key={country.code}
                  role="option"
                  aria-selected={selected.code === country.code}
                  onClick={() => select(country)}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                    selected.code === country.code
                      ? "bg-ltb-blue/8 text-ltb-blue font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base w-6 text-center leading-none">{country.flag}</span>
                  <span className="flex-1 truncate">{country.name}</span>
                  <span className="text-gray-400 text-xs font-mono">{country.dialCode}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
