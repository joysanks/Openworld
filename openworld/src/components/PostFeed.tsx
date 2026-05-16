import { useState, useRef } from "react";

interface Post {
  id: number;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  time: string;
  liked: boolean;
}

// ── Constants ──────────────────────────────────────────────
const POSTS_PER_PAGE = 6;
const TOTAL_POSTS = 48; // 8 pages worth

const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1719937051230-8798ae2ebe86?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1747051741682-1c6c31d85e47?w=600&auto=format&fit=crop",
];
const AVATARS = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
  "https://i.pravatar.cc/40?img=5",
  "https://i.pravatar.cc/40?img=7",
  "https://i.pravatar.cc/40?img=9",
];
const USERNAMES = [
  "joysanks",
  "explorer_",
  "wanderlust",
  "naturegram",
  "pixel_art",
  "skywatch",
];
const CAPTIONS = [
  "The world is a book 📖",
  "Into the wild 🌿",
  "Lost in the mountains ⛰️",
  "Golden hour vibes 🌅",
  "Nature never gets old 🍃",
  "Adventure awaits 🌊",
  "Finding peace in nature 🧘",
  "Chasing sunsets 🌄",
];

// ── Pre-generate all posts once (module-level, never re-runs) ──
const ALL_POSTS: Post[] = Array.from({ length: TOTAL_POSTS }, (_, i) => {
  const id = i + 1;
  return {
    id,
    username: USERNAMES[id % USERNAMES.length],
    avatar: AVATARS[id % AVATARS.length],
    image: UNSPLASH_IMAGES[id % UNSPLASH_IMAGES.length],
    caption: CAPTIONS[id % CAPTIONS.length],
    likes: Math.floor(Math.random() * 9000) + 100,
    comments: Math.floor(Math.random() * 300) + 5,
    time: `${Math.floor(Math.random() * 23) + 1}h ago`,
    liked: false,
  };
});

const TOTAL_PAGES = Math.ceil(TOTAL_POSTS / POSTS_PER_PAGE);

// ── Component ──────────────────────────────────────────────
export default function PostFeed() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>(ALL_POSTS);
  const feedRef = useRef<HTMLElement>(null);

  // Slice for current page
  const start = (page - 1) * POSTS_PER_PAGE;
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE);

  const goToPage = (p: number) => {
    setPage(p);
    // Smooth-scroll back to the top of the feed section
    feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );
  };

  // Build page number array with ellipsis
  const pageNumbers = (): (number | "…")[] => {
    if (TOTAL_PAGES <= 7)
      return Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", TOTAL_PAGES];
    if (page >= TOTAL_PAGES - 3)
      return [
        1,
        "…",
        TOTAL_PAGES - 4,
        TOTAL_PAGES - 3,
        TOTAL_PAGES - 2,
        TOTAL_PAGES - 1,
        TOTAL_PAGES,
      ];
    return [1, "…", page - 1, page, page + 1, "…", TOTAL_PAGES];
  };

  return (
    <section id="post-feed" ref={feedRef}>
      <h2 className="feed-title">Explore</h2>

      {/* Posts grid */}
      <div className="posts-grid">
        {visiblePosts.map((post) => (
          <article className="post-card" key={post.id}>
            {/* Header */}
            <div className="post-header">
              <img
                src={post.avatar}
                alt={post.username}
                className="post-avatar"
              />
              <div className="post-meta">
                <span className="post-username">{post.username}</span>
                <span className="post-time">{post.time}</span>
              </div>
              <button className="post-more" aria-label="More options">
                ⋯
              </button>
            </div>

            {/* Image */}
            <div className="post-image-wrap">
              <img
                src={post.image}
                alt={post.caption}
                className="post-image"
                loading="lazy"
              />
            </div>

            {/* Actions */}
            <div className="post-actions">
              <button
                className={`action-btn like-btn ${post.liked ? "liked" : ""}`}
                onClick={() => toggleLike(post.id)}
                aria-label="Like"
              >
                {post.liked ? "❤️" : "🤍"}
              </button>
              <button className="action-btn" aria-label="Comment">
                💬
              </button>
              <button className="action-btn" aria-label="Share">
                📤
              </button>
              <button className="action-btn bookmark-btn" aria-label="Save">
                🔖
              </button>
            </div>

            <div className="post-likes">
              {post.likes.toLocaleString()} likes
            </div>
            <div className="post-caption">
              <span className="post-username">{post.username}</span>{" "}
              {post.caption}
            </div>
            <div className="post-comments">
              View all {post.comments} comments
            </div>
          </article>
        ))}
      </div>

      {/* Pagination controls */}
      <nav className="pagination" aria-label="Post feed pages">
        {/* Prev */}
        <button
          className="page-btn page-arrow"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          ‹
        </button>

        {/* Page numbers */}
        {pageNumbers().map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="page-ellipsis">
              …
            </span>
          ) : (
            <button
              key={p}
              className={`page-btn ${page === p ? "page-active" : ""}`}
              onClick={() => goToPage(p as number)}
              aria-label={`Page ${p}`}
              aria-current={page === p ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          className="page-btn page-arrow"
          onClick={() => goToPage(page + 1)}
          disabled={page === TOTAL_PAGES}
          aria-label="Next page"
        >
          ›
        </button>
      </nav>

      {/* Page info */}
      <p className="page-info">
        Page {page} of {TOTAL_PAGES}
      </p>
    </section>
  );
}
