"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { countries, defaultCountry, type Country } from "@/data/countries";

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder = "Votre numéro",
}: PhoneInputProps) {
  const [selected, setSelected] = useState<Country>(defaultCountry);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = search.trim()
    ? countries.filter(
        (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.dialCode.includes(search)
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
    <div ref={containerRef} className="relative flex gap-2">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex flex-shrink-0 items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-100 focus:border-ltb-blue focus:outline-none focus:ring-2 focus:ring-ltb-blue/15"
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
        className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-ltb-blue focus:outline-none focus:ring-2 focus:ring-ltb-blue/15"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 flex w-72 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          {/* Search bar */}
          <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2.5">
            <Search size={14} className="flex-shrink-0 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un pays..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* List */}
          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-center text-sm text-gray-400">Aucun résultat</li>
            ) : (
              filtered.map((country) => (
                <li
                  key={country.code}
                  role="option"
                  aria-selected={selected.code === country.code}
                  onClick={() => select(country)}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    selected.code === country.code
                      ? "bg-ltb-blue/8 font-medium text-ltb-blue"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="w-6 text-center text-base leading-none">{country.flag}</span>
                  <span className="flex-1 truncate">{country.name}</span>
                  <span className="font-mono text-xs text-gray-400">{country.dialCode}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
