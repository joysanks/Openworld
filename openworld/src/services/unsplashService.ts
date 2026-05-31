// ── Unsplash Photo Service ──────────────────────────────────
// Fetches high-quality professional photos from the Unsplash API.
// Requires VITE_UNSPLASH_ACCESS_KEY in your .env file.
// Sign up at: https://unsplash.com/developers

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string | undefined;
const BASE_URL = "https://api.unsplash.com";

export interface UnsplashPhoto {
  id: string;
  /** Full-resolution image URL (use for hero/swiper) */
  src: string;
  /** Smaller optimised URL (use for post feed grid) */
  thumb: string;
  /** Photographer display name */
  photographer: string;
  /** Photographer username (for avatar fallback) */
  username: string;
  /** Photographer profile URL */
  profileUrl: string;
  /** Accessible alt text */
  alt: string;
  /** Blur hash colour for skeleton placeholder */
  color: string;
}

/** Map a raw Unsplash API response item to our clean interface */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPhoto(raw: any): UnsplashPhoto {
  return {
    id: raw.id,
    src: raw.urls?.regular ?? raw.urls?.full,
    thumb: raw.urls?.small ?? raw.urls?.regular,
    photographer: raw.user?.name ?? "Photographer",
    username: raw.user?.username ?? "unsplash",
    profileUrl: raw.user?.links?.html ?? "https://unsplash.com",
    alt: raw.alt_description ?? raw.description ?? "Photo",
    color: raw.color ?? "#1a1a2e",
  };
}

/**
 * Fetch `count` random photos from Unsplash.
 * Topics are biased toward nature, travel, and architecture for a
 * visually rich photography feed.
 *
 * @throws if the API returns a non-ok response
 */
export async function fetchRandomPhotos(count: number): Promise<UnsplashPhoto[]> {
  if (!ACCESS_KEY) {
    console.warn(
      "[OpenWorld] VITE_UNSPLASH_ACCESS_KEY is not set. " +
        "Add it to your .env file. Using fallback images."
    );
    return [];
  }

  // Unsplash random endpoint caps at 30 per request — batch if needed
  const batchSize = 30;
  const batches = Math.ceil(count / batchSize);

  const requests = Array.from({ length: batches }, (_, i) => {
    const n = i === batches - 1 ? count - i * batchSize : batchSize;
    const params = new URLSearchParams({
      count: String(n),
      topics: "nature,travel,architecture,people,technology",
      client_id: ACCESS_KEY!,
    });
    return fetch(`${BASE_URL}/photos/random?${params}`).then((r) => {
      if (!r.ok) throw new Error(`Unsplash API error: ${r.status} ${r.statusText}`);
      return r.json();
    });
  });

  const results = await Promise.all(requests);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flat: any[] = results.flat();
  return flat.map(mapPhoto);
}

/**
 * Fetch photos for the hero slider — landscape-oriented, high impact.
 */
export async function fetchHeroPhotos(count = 6): Promise<UnsplashPhoto[]> {
  if (!ACCESS_KEY) return [];

  const params = new URLSearchParams({
    count: String(count),
    topics: "nature,travel,architecture",
    orientation: "landscape",
    client_id: ACCESS_KEY,
  });

  const r = await fetch(`${BASE_URL}/photos/random?${params}`);
  if (!r.ok) throw new Error(`Unsplash API error: ${r.status} ${r.statusText}`);
  const data = await r.json();
  return data.map(mapPhoto);
}
