// Search goes through our own function because InnerTube has no public API and
// the client credentials path needs no secret: nothing here is confidential.
const SEARCH_ENDPOINT = "/api/yt-search";

export function embedUrl(id) {
  return `https://www.youtube.com/embed/${encodeURIComponent(id)}`;
}

// Picks the next track at random, never the one that just finished so a queue
// never stalls on a repeat. Returns -1 when there is nothing to advance to.
// Steps by a random offset within the other tracks rather than resampling until
// a different one comes up, so it always terminates in a single step.
export function pickRandomIndex(length, current, random = Math.random) {
  if (!Number.isFinite(length) || length < 2) return -1;

  if (!Number.isInteger(current) || current < 0 || current >= length) {
    return Math.floor(random() * length);
  }

  return (current + 1 + Math.floor(random() * (length - 1))) % length;
}

export function mapTrack(track) {
  if (!track?.id) return null;

  return {
    id: track.id,
    title: track.title || "Unknown",
    artist: track.artist || "Unknown",
    duration: Number.isFinite(track.duration)
      ? Math.max(0, Math.round(track.duration))
      : 0,
    art: track.art || "",
    src: embedUrl(track.id),
    page: `https://www.youtube.com/watch?v=${encodeURIComponent(track.id)}`,
  };
}

export function searchTracks(term, { signal } = {}) {
  const query = String(term ?? "").trim();
  if (!query) return Promise.resolve([]);

  return fetch(`${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}`, {
    signal,
    headers: { Accept: "application/json" },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Search failed (${res.status})`);
      return res.json();
    })
    .then((data) => (data?.results || []).map(mapTrack).filter(Boolean));
}

let apiPromise = null;

// Loads the IFrame Player API once per page. onYouTubeIframeAPIReady has to be
// in place before the tag is appended or the callback is never invoked.
export function loadPlayerApi() {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(null);
    if (window.YT?.Player) return resolve(window.YT);

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") previous();
      resolve(window.YT);
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });

  return apiPromise;
}