import { Innertube } from "youtubei.js";

const MAX_QUERY = 100;

// Only songs and videos carry a watchable videoId. Albums, artists and
// playlists are browse pages and would not play in the iframe.
const PLAYABLE = new Set(["song", "video"]);

let client = null;

// Constructing Innertube is expensive, so one instance is reused across warm
// lambda invocations instead of per request.
async function getClient() {
  if (!client) client = await Innertube.create();
  return client;
}

export function cleanQuery(raw) {
  const flattened = String(raw ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return flattened.slice(0, MAX_QUERY);
}

const TYPE_LABEL = /^(song|video|album|artist|playlist|podcast|episode)$/i;
const VIEW_COUNT = /\d+(\.\d+)?[kmb]? views$/i;
const TIMESTAMP = /^\d+:\d{2}$/;
const YEAR = /^(19|20)\d{2}$/;

// Subtitle runs look like ["Song", " • ", "5:36"] or
// ["Video", " • ", "Artist", " & ", "Other", " • ", "79M views", " • ", "2:37"].
// Drop the type label, view count, timestamp and the bullet separators; whatever
// remains is the artist credit. " & " is kept so collaborations read correctly.
export function extractArtist(runs) {
  const kept = (runs || [])
    .map((run) => (typeof run === "string" ? run : run?.text))
    .filter((text) => typeof text === "string")
    .map((text) => text.trim())
    .filter(Boolean)
    .filter((text) => text !== "\u2022")
    .filter((text) => !TYPE_LABEL.test(text))
    .filter((text) => !VIEW_COUNT.test(text))
    .filter((text) => !TIMESTAMP.test(text))
    .filter((text) => !YEAR.test(text));

  return kept.join(" ").replace(/\s+/g, " ").trim();
}

export function mapItem(item) {
  const id = item?.id;
  if (!id || !item?.title) return null;
  if (!PLAYABLE.has(item?.item_type)) return null;

  const thumbs = item.thumbnails || [];

  return {
    id,
    title: item.title,
    artist: extractArtist(item?.flex_columns?.[1]?.title?.runs) || "Unknown",
    duration: Number.isFinite(item?.duration?.seconds)
      ? Math.round(item.duration.seconds)
      : 0,
    art: thumbs.length ? thumbs[thumbs.length - 1].url || "" : "",
  };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "public, max-age=60");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  const query = cleanQuery(new URL(req.url, "http://localhost").searchParams.get("q"));
  if (!query) return res.status(400).json({ error: "missing_query" });

  try {
    const yt = await getClient();
    const result = await yt.music.search(query);
    const items = (result?.contents || []).flatMap((shelf) =>
      Array.isArray(shelf?.contents) ? shelf.contents : [],
    );

    return res.status(200).json({ results: items.map(mapItem).filter(Boolean) });
  } catch (error) {
    console.error(`yt search failed: ${error?.message}`);
    return res.status(502).json({ error: "search_failed" });
  }
}