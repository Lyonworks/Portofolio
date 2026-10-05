const TOKEN_URL = "https://accounts.spotify.com/api/token";
const SEARCH_URL = "https://api.spotify.com/v1/search";

const MAX_QUERY = 100;
const LIMIT = 20;
// Spotify access tokens live 1h; refresh early so a long-lived warm lambda
// never hands out a token that expires mid-request.
const TOKEN_TTL_MS = 50 * 60 * 1000;

let cachedToken = "";
let cachedAt = 0;

export function cleanQuery(raw) {
  const flattened = String(raw ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return flattened.slice(0, MAX_QUERY);
}

async function getToken() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!id || !secret) throw new Error("missing_credentials");
  if (cachedToken && Date.now() - cachedAt < TOKEN_TTL_MS) return cachedToken;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) throw new Error(`token_request_failed_${res.status}`);

  const data = await res.json();
  if (!data.access_token) throw new Error("token_missing");

  cachedToken = data.access_token;
  cachedAt = Date.now();
  return cachedToken;
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
    const token = await getToken();

    // Fixed upstream base plus URLSearchParams: user input can never redirect
    // this request anywhere but api.spotify.com.
    const params = new URLSearchParams({ q: query, type: "track", limit: String(LIMIT) });
    const upstream = await fetch(`${SEARCH_URL}?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!upstream.ok) {
      return res.status(502).json({ error: "search_failed", status: upstream.status });
    }

    const data = await upstream.json();
    return res.status(200).json({ results: data?.tracks?.items || [] });
  } catch (error) {
    if (error.message === "missing_credentials") {
      return res.status(500).json({ error: "missing_credentials" });
    }
    return res.status(502).json({ error: "upstream_failed", detail: error.message });
  }
}