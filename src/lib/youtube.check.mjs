import { embedUrl, mapVideo, parseDuration, searchTracks } from "./youtube.mjs";

const failures = [];
const check = (name, pass) => {
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}`);
  if (!pass) failures.push(name);
};

const item = {
  id: { videoId: "dQw4w9WgXcQ" },
  snippet: {
    title: "Rick Astley &#39;Never Gonna Give You Up&#39; &amp; more",
    channelTitle: "Rick Astley",
    thumbnails: { default: { url: "d" }, medium: { url: "m" }, high: { url: "h" } },
  },
  contentDetails: { duration: "PT3M33S" },
};

const mapped = mapVideo(item);

check("maps video id", mapped?.id === "dQw4w9WgXcQ");
check("decodes html entities in title", mapped.title === "Rick Astley 'Never Gonna Give You Up' & more");
check("maps channel to artist", mapped.artist === "Rick Astley");
check("prefers the high thumbnail", mapped.art === "h");
check("parses PT3M33S to seconds", mapped.duration === 213);
check("builds an embed url", mapped.src === "https://www.youtube.com/embed/dQw4w9WgXcQ");
check("builds a watch url", mapped.page === "https://www.youtube.com/watch?v=dQw4w9WgXcQ");

check("drops items without videoId", mapVideo({ id: { channelId: "x" }, snippet: {} }) === null);
check("drops null items", mapVideo(null) === null);
check("missing title becomes Unknown", mapVideo({ id: { videoId: "a" } }).title === "Unknown");
check("missing channel becomes Unknown", mapVideo({ id: { videoId: "a" } }).artist === "Unknown");
check("missing thumbnails become empty", mapVideo({ id: { videoId: "a" } }).art === "");
check("missing contentDetails becomes 0", mapVideo({ id: { videoId: "a" } }).duration === 0);
check("malformed duration becomes 0", parseDuration("not-a-duration") === 0);
check("null duration becomes 0", parseDuration(null) === 0);

check("parses PT1H2M3S", parseDuration("PT1H2M3S") === 3723);
check("parses PT45S", parseDuration("PT45S") === 45);
check("parses PT2H with no minutes", parseDuration("PT2H") === 7200);
check("parses P1DT1H", parseDuration("P1DT1H") === 90000);
check("parses bare P as zero", parseDuration("P") === 0);

check("empty query resolves to [] without calling the API", (await searchTracks("   ")).length === 0);

const keyless = await searchTracks("jazz").then((v) => ({ v }), (e) => ({ e }));
if (keyless.e) {
  check("no API key fails loudly instead of silently", keyless.e.message === "missing_api_key");
} else {
  check("live search returns playable videos", keyless.v.length > 0 && keyless.v.every((t) => t.id));
}

// oEmbed is keyless, so the id -> real video mapping can be verified for real.
const oembed = await fetch(
  "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ&format=json"
);
check("mapped video id resolves to a real YouTube video", oembed.ok);
const meta = await oembed.json();
check("oEmbed confirms the video exists", Boolean(meta.title && meta.author_name));
check("embed url is well formed", embedUrl("dQw4w9WgXcQ").endsWith("/embed/dQw4w9WgXcQ"));

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed`);
  process.exitCode = 1;
} else {
  console.log("\nall checks passed");
}