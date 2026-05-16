// import Swiper core and required modules
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import images
// import heroImg from '../assets/hero.png';
// import reactLogo from '../assets/react.svg';
// import viteLogo from '../assets/vite.svg';

const slides = [
  {
    img: "https://images.unsplash.com/photo-1507187632231-5beb21a654a2?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Hero 2",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1778071258571-05a37e8c6271?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Hero 2",
  },
  {
    img: "https://images.unsplash.com/photo-1778400599089-af77d9a2c916?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dttps://cdn.wallpaperdirect.com/shared-assets/images/products/219368_1_orig.jpg?v=1728632451",
    label: "Hero 2",
  },
  {
    img: "https://images.unsplash.com/photo-1778525211398-83a1389ddda8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Hero 2",
  },
  {
    img: "https://images.unsplash.com/photo-1778063368772-45ba0cdbd794?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Hero 2",
  },
];

export default function SliderSwiper() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      {" "}
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
          <SwiperSlide
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                height: "100%",
              }}
            >
              <img
                src={slide.img}
                alt={slide.label}
                style={{
                  width: "100%",
                  height: "100%", // Increased image height
                  objectFit: "cover", // Forces uniform size without stretching (crops overflow)
                  borderRadius: "12px", // Added slightly rounded corners for a polished look
                  display: "block",
                }}
              />
              {/* <span style={{ fontSize: '14px', fontWeight: 500 }}>{slide.label}</span> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
