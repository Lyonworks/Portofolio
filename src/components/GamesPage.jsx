'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import fullscreenIcon from '../assets/svg/fullscreen.svg?url&no-inline';
import minimizeIcon from '../assets/svg/minimize.svg?url&no-inline';

const COPY = {
  en: {
    title: 'Game Playground',
    description: 'Choose a game to play it right here.',
    selected: 'Selected',
    select: 'Select',
    ready: 'Ready',
    prompt: 'Ready to Play?',
    instruction: 'Click a game card to start playing.',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
    fullscreenError: 'Fullscreen could not be opened. Please try again.',
  },
  id: {
    title: 'Ruang Game',
    description: 'Pilih game untuk memainkannya langsung di sini.',
    selected: 'Dipilih',
    select: 'Pilih',
    ready: 'Siap',
    prompt: 'Siap Bermain?',
    instruction: 'Klik kartu game untuk langsung memulai.',
    fullscreen: 'Layar penuh',
    exitFullscreen: 'Keluar layar penuh',
    fullscreenError: 'Mode layar penuh tidak dapat dibuka. Silakan coba lagi.',
  },
};

const GAMES = [
  {
    id: 'skystrike',
    name: 'SkyStrike',
    url: 'https://lyonworks.github.io/SkyStrike/',
  },
];

export default function GamesPage() {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;
  const [selectedGameId, setSelectedGameId] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState('');
  const gameFrameRef = useRef(null);
  const selectedGame = GAMES.find((game) => game.id === selectedGameId);

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(document.fullscreenElement === gameFrameRef.current);
    };

    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  const toggleFullscreen = async () => {
    setFullscreenError('');

    try {
      if (document.fullscreenElement === gameFrameRef.current) {
        await document.exitFullscreen();
      } else {
        if (!gameFrameRef.current?.requestFullscreen) {
          throw new Error('Fullscreen API is unavailable');
        }

        await gameFrameRef.current.requestFullscreen();
      }
    } catch {
      setFullscreenError(copy.fullscreenError);
    }
  };

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-24 pt-10 md:px-8">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-3xl font-mono font-bold uppercase text-white md:text-5xl">
          {copy.title}
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-mono text-white/65 md:text-base">
          {copy.description}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game) => {
            const isSelected = selectedGameId === game.id;

            return (
              <button
                key={game.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedGameId(game.id)}
                className={`group overflow-hidden rounded-[24px] border backdrop-blur-xl text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 ${
                  isSelected
                    ? 'border-[#7777ff]/60 bg-[#0000FF]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_28px_rgba(0,0,255,0.25)]'
                    : 'border-white/20 bg-white/[0.07] hover:border-white/35 hover:bg-white/[0.12]'
                }`}
              >
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <h2 className="font-mono text-xl font-bold uppercase text-white">
                      {game.name}
                    </h2>
                  </div>
                  <span className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] backdrop-blur-md ${
                    isSelected
                      ? 'border-[#7777ff]/50 bg-[#0000FF]/20 text-white/90'
                      : 'border-white/15 bg-white/[0.06] text-white/60'
                  }`}>
                    {isSelected ? copy.selected : copy.select}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={gameFrameRef}
        className="relative isolate aspect-video overflow-hidden rounded-[28px] border border-white/10 bg-black/60 shadow-[0_0_26px_rgba(0,0,0,0.5)] fullscreen:aspect-auto fullscreen:h-screen fullscreen:w-screen fullscreen:rounded-none"
      >
        {selectedGame ? (
          <>
            <iframe
              key={selectedGame.url}
              src={selectedGame.url}
              title={selectedGame.name}
              loading="lazy"
              allow="fullscreen; autoplay; clipboard-write; gamepad; camera; microphone"
              className="absolute inset-0 z-0 h-full w-full bg-black"
            />
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? copy.exitFullscreen : copy.fullscreen}
              className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center !border-0 !bg-transparent !p-0 !shadow-none !outline-none transition hover:!border-0 hover:!bg-transparent focus:!border-0 focus:!outline-none focus-visible:!border-0 focus-visible:!outline-none"
            >
              <img
                src={isFullscreen ? minimizeIcon : fullscreenIcon}
                alt=""
                aria-hidden="true"
                className="pointer-events-none block h-6 w-6 object-contain"
              />
            </button>
            {fullscreenError && (
              <p role="alert" className="absolute bottom-4 left-4 z-10 rounded-lg bg-black/75 px-3 py-2 font-mono text-xs text-red-300">
                {fullscreenError}
              </p>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(0,0,255,0.22),_rgba(0,0,0,0.95)_45%)] p-6 text-center">
            <div className="max-w-lg">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#0000FF]">
                {copy.ready}
              </p>
              <h2 className="mt-4 font-mono text-xl uppercase text-white md:text-2xl">
                {copy.prompt}
              </h2>
              <p className="mt-3 font-mono text-sm text-white/60">
                {copy.instruction}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
