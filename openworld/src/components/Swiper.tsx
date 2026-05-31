import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useHeroPhotos } from "../hooks/usePhotos";

// ── Fallback slides (shown when API key is absent) ──────────
const FALLBACK_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1507187632231-5beb21a654a2?q=80&w=1201&auto=format&fit=crop",
    label: "Mountain Landscape",
    credit: "",
    creditUrl: "",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1778071258571-05a37e8c6271?q=80&w=1200&auto=format&fit=crop",
    label: "Ocean Horizon",
    credit: "",
    creditUrl: "",
  },
  {
    img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1170&auto=format&fit=crop",
    label: "Forest Path",
    credit: "",
    creditUrl: "",
  },
  {
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1170&auto=format&fit=crop",
    label: "Misty Valley",
    credit: "",
    creditUrl: "",
  },
  {
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170&auto=format&fit=crop",
    label: "Alpine Lake",
    credit: "",
    creditUrl: "",
  },
];

export default function SliderSwiper() {
  const { photos, loading } = useHeroPhotos(6);

  const slides =
    photos.length > 0
      ? photos.map((p) => ({
          img: p.src,
          label: p.alt,
          credit: p.photographer,
          creditUrl: p.profileUrl,
          color: p.color,
        }))
      : FALLBACK_SLIDES.map((s) => ({ ...s, color: "#1a1a2e" }));

  if (loading) {
    return (
      <div className="swiper-skeleton">
        <div className="swiper-skeleton-inner">
          <div className="swiper-skeleton-spinner" />
          <p className="swiper-skeleton-text">Loading photos…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "420px", position: "relative" }}>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <img
                src={slide.img}
                alt={slide.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                  display: "block",
                  background: slide.color,
                }}
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />
              {/* Photographer credit */}
              {slide.credit && (
                <a
                  href={slide.creditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    right: "18px",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    background: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(4px)",
                    padding: "3px 9px",
                    borderRadius: "999px",
                    transition: "color 0.2s",
                  }}
                >
                  📷 {slide.credit} · Unsplash
                </a>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
