// Spotify has no public audio URL, so this talks only to our own proxy. The
// client secret stays server-side and is never referenced here.
const SEARCH_ENDPOINT = "/api/spotify-search";

export function mapTrack(track) {
  if (!track?.id) return null;

  const images = track.album?.images || [];
  const art = images.find((image) => image?.width >= 300) || images[0];

  return {
    id: track.id,
    title: track.name || "Unknown",
    artist:
      (track.artists || []).map((one) => one?.name).filter(Boolean).join(", ") ||
      "Unknown artist",
    album: track.album?.name || "",
    art: art?.url || "",
    duration: Number.isFinite(track.duration_ms)
      ? Math.round(track.duration_ms / 1000)
      : 0,
    uri: track.uri || `spotify:track:${track.id}`,
    page: track.external_urls?.spotify || "",
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