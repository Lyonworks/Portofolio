// YouTube Data API keys are not secrets: Google expects them in browser code
// and restricts them by HTTP referrer. So search runs client-side, with no
// proxy and no server-side credential to leak.
const API_KEY = import.meta.env?.VITE_YOUTUBE_API_KEY;

const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

// YouTube escapes these in snippet titles. We decode only what it actually
// emits and render as text, so React still escapes it on the way out.
const decodeEntities = (value) =>
  String(value ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

export function hasApiKey() {
  return Boolean(API_KEY);
}

export function embedUrl(id) {
  return `https://www.youtube.com/embed/${encodeURIComponent(id)}`;
}

// contentDetails.duration arrives as ISO 8601, e.g. PT3M12S or PT1H2M3S.
export function parseDuration(iso) {
  const match = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/.exec(String(iso ?? ""));
  if (!match) return 0;

  const [, days, hours, minutes, seconds] = match;
  return (
    Number(days || 0) * 86400 +
    Number(hours || 0) * 3600 +
    Number(minutes || 0) * 60 +
    Number(seconds || 0)
  );
}

export function mapVideo(item) {
  const id = item?.id?.videoId;
  if (!id) return null;

  const snippet = item.snippet || {};
  const thumbs = snippet.thumbnails || {};

  return {
    id,
    title: decodeEntities(snippet.title) || "Unknown",
    artist: snippet.channelTitle || "Unknown",
    duration: parseDuration(item.contentDetails?.duration),
    art: thumbs.high?.url || thumbs.medium?.url || thumbs.default?.url || "",
    src: embedUrl(id),
    page: `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`,
  };
}

export function searchTracks(term, { signal } = {}) {
  const query = String(term ?? "").trim();
  if (!query) return Promise.resolve([]);
  if (!API_KEY) return Promise.reject(new Error("missing_api_key"));

  const params = new URLSearchParams({
    part: "snippet,contentDetails",
    type: "video",
    // Guarantees the video permits iframe embedding, so nothing in the list can
    // be unplayable once selected.
    videoEmbeddable: "true",
    q: query,
    maxResults: "20",
    key: API_KEY,
  });

  return fetch(`${SEARCH_URL}?${params}`, { signal })
    .then((res) => res.json().then((body) => ({ res, body })))
    .then(({ res, body }) => {
      if (!res.ok) {
        const reason = body?.error?.errors?.[0]?.reason || "";
        if (reason === "quotaExceeded" || reason === "dailyLimitExceeded") {
          throw new Error("quota_exceeded");
        }
        if (reason === "keyInvalid" || reason === "accessNotConfigured") {
          throw new Error("bad_api_key");
        }
        throw new Error(`Search failed (${res.status})`);
      }
      return (body?.items || []).map(mapVideo).filter(Boolean);
    });
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