"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Music4,
  Pause,
  Play,
  Search,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from "lucide-react";
import { loadPlayerApi, pickRandomIndex, searchTracks } from "../lib/youtube.mjs";
import { useLanguage } from "../LanguageContext";

const LABELS = {
  en: {
    music: "Music",
    idle: "Pick a song",
    search: "Search YouTube...",
    searching: "Searching...",
    failed: "Search failed",
    noKey: "Add VITE_YOUTUBE_API_KEY to enable search",
    badKey: "YouTube API key rejected",
    quota: "YouTube daily quota exhausted",
    empty: "No results",
    emptyQuery: "Type to search",
    clear: "Clear search",
    toggle: "Toggle search",
    listen: "Open on YouTube",
    play: "Play",
    pause: "Pause",
    previous: "Previous track",
    next: "Next track",
    volume: "Volume",
    seek: "Seek",
  },
  id: {
    music: "Musik",
    idle: "Pilih lagu",
    search: "Cari di YouTube...",
    searching: "Mencari...",
    failed: "Pencarian gagal",
    noKey: "Tambahkan VITE_YOUTUBE_API_KEY untuk mengaktifkan pencarian",
    badKey: "YouTube API key ditolak",
    quota: "Kuota harian YouTube habis",
    empty: "Tidak ada hasil",
    emptyQuery: "Ketik untuk mencari",
    clear: "Hapus pencarian",
    toggle: "Buka pencarian",
    listen: "Buka di YouTube",
    play: "Putar",
    pause: "Jeda",
    previous: "Lagu sebelumnya",
    next: "Lagu berikutnya",
    volume: "Volume",
    seek: "Geser",
  },
};

const panel =
  "border-2 border-[#0000FF] bg-black shadow-[0_0_12px_#0000FF] font-mono text-[#F5F5F5]";

const iconButton =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-none border-0 bg-transparent p-0 text-[#F5F5F5] transition-colors duration-300 hover:border-0 hover:bg-transparent hover:text-[#0000FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-[#F5F5F5]";

const slider =
  "h-1 w-full cursor-pointer appearance-none rounded-none border-0 bg-transparent p-0 accent-[#0000FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF]";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return hours
    ? `${hours}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    : `${mins}:${String(secs).padStart(2, "0")}`;
};

const ERROR_LABEL = {
  missing_api_key: "noKey",
  bad_api_key: "badKey",
  quota_exceeded: "quota",
};

export default function MusicPlayer({ className = "" }) {
  const { language } = useLanguage();
  const t = LABELS[language] || LABELS.en;

  const wrapRef = useRef(null);
  const playerRef = useRef(null);
  const ytRef = useRef(null);
  const advanceRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(-1);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const current = index >= 0 ? queue[index] || null : null;
  const seekable = Number.isFinite(duration) && duration > 0;

  useEffect(() => {
    let alive = true;

    loadPlayerApi().then((YT) => {
      if (!alive || !YT || !wrapRef.current || playerRef.current) return;

      ytRef.current = YT;

      // YT.Player replaces the element you hand it with its own iframe. If that
      // element is one React rendered, React keeps reconciling a node that is no
      // longer there and throws NotFoundError on the next insertBefore. So the
      // wrapper below stays empty in JSX and the node given to YT is appended
      // imperatively, where React never touches its children.
      const host = document.createElement("div");
      wrapRef.current.appendChild(host);

      playerRef.current = new YT.Player(host, {
        width: 1,
        height: 1,
        playerVars: { playsinline: 1, controls: 0, disablekb: 1, rel: 0 },
        events: {
          onReady: () => setReady(true),
          onStateChange: (event) => {
            const YT = ytRef.current;
            if (!YT) return;
            setPlaying(event.data === YT.PlayerState.PLAYING);
            if (event.data === YT.PlayerState.ENDED) advanceRef.current?.();
          },
        },
      });

      if (!alive) host.remove();
    });

    return () => {
      alive = false;
      playerRef.current?.destroy?.();
      playerRef.current = null;
      wrapRef.current?.replaceChildren();
    };
  }, []);

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
          setStatus(ERROR_LABEL[error.message] || "error");
        });
    }, 400);

    return () => {
      window.clearTimeout(id);
      controller.abort();
    };
  }, [query, open]);

  // The Player API has no timeupdate event, so progress is polled.
  useEffect(() => {
    if (!ready) return undefined;

    const id = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      setCurrentTime(player.getCurrentTime() || 0);
      const total = player.getDuration();
      if (Number.isFinite(total) && total > 0) setDuration(total);
    }, 500);

    return () => window.clearInterval(id);
  }, [ready]);

  // The player is created once, so its ENDED handler would otherwise close over
  // the queue from the first render, which is still empty. Refreshing this ref
  // after every render is what makes shuffle-on-end actually advance.
  useEffect(() => {
    advanceRef.current = () => {
      const next = pickRandomIndex(queue.length, index);
      if (next >= 0) setIndex(next);
    };
  });

  useEffect(() => {
    playerRef.current?.setVolume(volume * 100);
  }, [volume, ready]);

  useEffect(() => {
    const player = playerRef.current;
    if (!ready || !player || !current) return;
    if (player.getVideoData?.()?.video_id === current.id) return;

    player.loadVideoById(current.id);
    player.playVideo();
    setCurrentTime(0);
  }, [current, ready]);

  const step = (delta) => {
    const at = index + delta;
    if (at < 0 || at >= queue.length) return;
    setIndex(at);
  };

  const toggle = () => {
    const player = playerRef.current;
    const YT = ytRef.current;
    if (!player || !YT || !current) return;
    if (player.getPlayerState() === YT.PlayerState.PLAYING) player.pauseVideo();
    else player.playVideo();
  };

  const seek = (value) => {
    const time = Number(value);
    if (!Number.isFinite(time)) return;
    playerRef.current?.seekTo(time, true);
    setCurrentTime(time);
  };

  const choose = (tracks, at) => {
    const track = tracks[at];
    if (!track) return;
    setQueue(tracks);
    setIndex(at);
    setOpen(false);
  };

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
            onClick={toggle}
            disabled={!current || !ready}
            aria-label={playing ? t.pause : t.play}
            className={iconButton}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

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

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={index <= 0}
            aria-label={t.previous}
            className={iconButton}
          >
            <SkipBack className="h-3.5 w-3.5" />
          </button>

          <input
            type="range"
            min={0}
            max={seekable ? duration : 0}
            step={0.5}
            value={seekable ? Math.min(currentTime, duration) : 0}
            disabled={!seekable}
            onChange={(event) => seek(event.target.value)}
            aria-label={t.seek}
            className={slider}
          />

          <span className="shrink-0 text-[10px] opacity-70 tabular-nums">
            {formatTime(currentTime)}
            <span className="opacity-50"> / {formatTime(duration)}</span>
          </span>

          <button
            type="button"
            onClick={() => step(1)}
            disabled={index < 0 || index >= queue.length - 1}
            aria-label={t.next}
            className={iconButton}
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Volume2 className="h-3.5 w-3.5 shrink-0 opacity-70" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            aria-label={t.volume}
            className={slider}
          />
        </div>

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

        <div
          ref={wrapRef}
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
        />

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
                {status === "noKey" && (
                  <p className="mt-2 text-[11px] text-amber-400">{t.noKey}</p>
                )}
                {status === "badKey" && (
                  <p className="mt-2 text-[11px] text-red-400">{t.badKey}</p>
                )}
                {status === "quota" && (
                  <p className="mt-2 text-[11px] text-red-400">{t.quota}</p>
                )}
                {status === "error" && (
                  <p className="mt-2 text-[11px] text-red-400">{t.failed}</p>
                )}
                {status === "idle" && !query.trim() && (
                  <p className="mt-2 text-[11px] opacity-70">{t.emptyQuery}</p>
                )}
                {status === "idle" && query.trim() && results.length === 0 && (
                  <p className="mt-2 text-[11px] opacity-70">{t.empty}</p>
                )}

                {results.length > 0 && (
                  <ul className="mt-2 max-h-60 space-y-1 overflow-y-auto pr-1">
                    {results.map((track, at) => {
                      const active = current?.id === track.id;
                      return (
                        <li key={track.id}>
                          <button
                            type="button"
                            onClick={() => choose(results, at)}
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