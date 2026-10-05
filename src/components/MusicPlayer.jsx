"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Music4,
  Search,
  X,
} from "lucide-react";
import { searchTracks } from "../lib/spotify.mjs";
import { useLanguage } from "../LanguageContext";

const LABELS = {
  en: {
    music: "Music",
    idle: "Pick a song",
    search: "Search Spotify...",
    searching: "Searching...",
    failed: "Search failed",
    noProxy: "Search API not configured",
    empty: "No results",
    clear: "Clear search",
    toggle: "Toggle search",
    listen: "Listen on Spotify",
    emptyQuery: "Type to search",
  },
  id: {
    music: "Musik",
    idle: "Pilih lagu",
    search: "Cari di Spotify...",
    searching: "Mencari...",
    failed: "Pencarian gagal",
    noProxy: "API pencarian belum dikonfigurasi",
    empty: "Tidak ada hasil",
    clear: "Hapus pencarian",
    toggle: "Buka pencarian",
    listen: "Dengarkan di Spotify",
    emptyQuery: "Ketik untuk mencari",
  },
};

const panel =
  "border-2 border-[#0000FF] bg-black shadow-[0_0_12px_#0000FF] font-mono text-[#F5F5F5]";

const iconButton =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-none border-0 bg-transparent p-0 text-[#F5F5F5] transition-colors duration-300 hover:border-0 hover:bg-transparent hover:text-[#0000FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-[#F5F5F5]";

const embedSrc = (id) =>
  `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

export default function MusicPlayer({ className = "" }) {
  const { language } = useLanguage();
  const t = LABELS[language] || LABELS.en;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!open) return undefined;

    const term = query.trim();
    if (!term) {
      setResults([]);
      setStatus("idle");
      return undefined;
    }

    setStatus("loading");
    const controller = new AbortController();
    const id = window.setTimeout(() => {
      searchTracks(term, { signal: controller.signal })
        .then((tracks) => {
          setResults(tracks);
          setStatus("idle");
        })
        .catch((error) => {
          if (error.name === "AbortError") return;
          setResults([]);
          // The proxy answers 500 when SPOTIFY_CLIENT_ID/SECRET are absent.
          setStatus(error.message.includes("(500)") ? "unconfigured" : "error");
        });
    }, 400);

    return () => {
      window.clearTimeout(id);
      controller.abort();
    };
  }, [query, open]);

  return (
    <div
      className={`fixed bottom-24 left-4 z-50 w-72 max-w-[calc(100vw-2rem)] sm:bottom-6 sm:left-6 ${className}`}
    >
      <div className={`p-3 ${panel}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border border-[#0000FF]">
            {current?.art ? (
              <img src={current.art} alt="" className="h-full w-full object-cover" />
            ) : (
              <Music4 className="h-4 w-4 opacity-70" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold uppercase tracking-[0.2em]">
              {current?.title || t.music}
            </p>
            <p className="truncate text-[11px] opacity-70">{current?.artist || t.idle}</p>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={t.toggle}
            className={iconButton}
          >
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {current && (
          <iframe
            key={current.id}
            title={`${current.title} - ${current.artist}`}
            src={embedSrc(current.id)}
            width="100%"
            height="152"
            loading="lazy"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="mt-3 border border-[#0000FF]"
          />
        )}

        {current?.page && (
          <a
            href={current.page}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-1 truncate text-[9px] uppercase tracking-[0.15em] opacity-60 transition-colors duration-300 hover:text-[#0000FF]"
          >
            <ExternalLink className="h-2.5 w-2.5 shrink-0" />
            {t.listen}
          </a>
        )}

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-3 border-t border-[#0000FF] pt-3">
                <div className="relative flex items-center">
                  <Search className="pointer-events-none absolute left-2 h-3.5 w-3.5 opacity-60" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t.search}
                    aria-label={t.search}
                    className="w-full rounded-none border border-[#0000FF] bg-black py-1.5 pl-7 pr-8 font-mono text-xs text-[#F5F5F5] outline-none transition-colors placeholder:opacity-50 focus:ring-2 focus:ring-[#0000FF]"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label={t.clear}
                      className={`${iconButton} absolute right-0.5 h-7 w-7`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {status === "loading" && (
                  <p className="mt-2 text-[11px] opacity-70">{t.searching}</p>
                )}
                {status === "error" && (
                  <p className="mt-2 text-[11px] text-red-400">{t.failed}</p>
                )}
                {status === "unconfigured" && (
                  <p className="mt-2 text-[11px] text-amber-400">{t.noProxy}</p>
                )}
                {status === "idle" && !query.trim() && (
                  <p className="mt-2 text-[11px] opacity-70">{t.emptyQuery}</p>
                )}
                {status === "idle" && query.trim() && results.length === 0 && (
                  <p className="mt-2 text-[11px] opacity-70">{t.empty}</p>
                )}

                {results.length > 0 && (
                  <ul className="mt-2 max-h-60 space-y-1 overflow-y-auto pr-1">
                    {results.map((track) => {
                      const active = current?.id === track.id;
                      return (
                        <li key={track.id}>
                          <button
                            type="button"
                            onClick={() => setCurrent(track)}
                            className={`flex w-full items-center gap-2 rounded-none border-0 bg-transparent p-1 text-left transition-colors duration-300 hover:border-0 hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF] ${
                              active ? "bg-[#0000FF]/20" : "hover:bg-white/5"
                            }`}
                          >
                            {track.art && (
                              <img
                                src={track.art}
                                alt=""
                                loading="lazy"
                                className="h-8 w-8 shrink-0 border border-[#0000FF] object-cover"
                              />
                            )}
                            <span className="min-w-0 flex-1">
                              <span
                                className={`block truncate text-xs ${
                                  active ? "font-bold text-[#0000FF]" : "font-semibold"
                                }`}
                              >
                                {track.title}
                              </span>
                              <span className="block truncate text-[10px] opacity-70">
                                {track.artist}
                              </span>
                            </span>
                            <span className="shrink-0 text-[10px] opacity-60 tabular-nums">
                              {formatTime(track.duration)}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}