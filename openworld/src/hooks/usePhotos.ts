import { useState, useEffect, useRef } from "react";
import {
  fetchRandomPhotos,
  fetchHeroPhotos,
  type UnsplashPhoto,
} from "../services/unsplashService";

// ── Simple in-memory cache keyed by "type:count" ───────────
const cache = new Map<string, UnsplashPhoto[]>();

interface UsePhotosResult {
  photos: UnsplashPhoto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetches `count` random photos for the post feed.
 * Results are cached for the lifetime of the browser tab.
 */
export function usePhotos(count: number): UsePhotosResult {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const cacheKey = `feed:${count}`;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Return cached result instantly
      if (cache.has(cacheKey)) {
        setPhotos(cache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchRandomPhotos(count);
        if (!cancelled) {
          cache.set(cacheKey, data);
          setPhotos(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch photos");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [cacheKey, tick]);

  const refetch = () => {
    cache.delete(cacheKey);
    setTick((t) => t + 1);
  };

  return { photos, loading, error, refetch };
}

/**
 * Fetches `count` landscape photos for the hero slider.
 * Cached separately from the feed photos.
 */
export function useHeroPhotos(count = 6): UsePhotosResult {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const hasFetched = useRef(false);

  const cacheKey = `hero:${count}`;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (cache.has(cacheKey)) {
        setPhotos(cache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchHeroPhotos(count);
        if (!cancelled) {
          cache.set(cacheKey, data);
          setPhotos(data);
          hasFetched.current = true;
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch hero photos");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [cacheKey, tick]);

  const refetch = () => {
    cache.delete(cacheKey);
    setTick((t) => t + 1);
  };

  return { photos, loading, error, refetch };
}
