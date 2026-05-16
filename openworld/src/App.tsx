import "./App.css";
import Navbar from "./components/Navbar";
import SliderSwiper from "./components/Swiper";
import PostFeed from "./components/PostFeed";

function App() {
  return (
    <>
      <Navbar />
      <section id="center">
        <div className="hero-tagline">
          <span className="tagline-badge">📸 For Photographers</span>
          <h1 className="tagline-heading">
            Share your world,
            <br />
            <span className="tagline-accent">one frame at a time.</span>
          </h1>
          <p className="tagline-sub">
            OpenWorld is where photographers discover, share, and connect — a
            visual community built for creators.
          </p>
        </div>
        <SliderSwiper />
      </section>

      <div className="ticks"></div>

      <PostFeed />

      <div className="ticks"></div>

      <section id="creator">
        <div className="creator-card">
          <div className="creator-glow" />
          <div className="creator-avatar">
            <svg viewBox="0 0 80 80" width="54" height="54" aria-hidden="true">
              <defs>
                <linearGradient id="ap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa"/>
                  <stop offset="100%" stopColor="#60a5fa"/>
                </linearGradient>
              </defs>
              {/* Outer ring */}
              <circle cx="40" cy="40" r="36" fill="none" stroke="url(#ap-grad)" strokeWidth="2" opacity="0.5"/>
              {/* Aperture blades */}
              <g fill="url(#ap-grad)" opacity="0.9">
                <ellipse cx="40" cy="20" rx="7" ry="18" transform="rotate(0 40 40)"/>
                <ellipse cx="40" cy="20" rx="7" ry="18" transform="rotate(60 40 40)"/>
                <ellipse cx="40" cy="20" rx="7" ry="18" transform="rotate(120 40 40)"/>
                <ellipse cx="40" cy="20" rx="7" ry="18" transform="rotate(180 40 40)"/>
                <ellipse cx="40" cy="20" rx="7" ry="18" transform="rotate(240 40 40)"/>
                <ellipse cx="40" cy="20" rx="7" ry="18" transform="rotate(300 40 40)"/>
              </g>
              {/* Center lens */}
              <circle cx="40" cy="40" r="10" fill="#0f0f13" opacity="0.95"/>
              <circle cx="40" cy="40" r="7" fill="none" stroke="url(#ap-grad)" strokeWidth="1.5"/>
              {/* Inner highlight */}
              <circle cx="36" cy="36" r="2" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <div className="creator-badge">✦ Creator</div>
          <h2 className="creator-name">Joy</h2>
          <p className="creator-tagline">
            Building <span className="creator-highlight">OpenWorld</span> — a
            visual community for photographers.
            <br />
            Full-stack developer · Open source enthusiast
          </p>
          <div className="creator-links">
            <a
              href="https://portfolio-joysanks-projects.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-btn creator-btn-primary"
            >
              🌐 Portfolio
            </a>
            <a
              href="https://github.com/joysanks"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-btn creator-btn-ghost"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/joysankar-saikia-7688ba209/"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-btn creator-btn-ghost"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
