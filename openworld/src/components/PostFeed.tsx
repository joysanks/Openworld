import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { usePhotos } from "../hooks/usePhotos";
import type { UnsplashPhoto } from "../services/unsplashService";

// ── Fallback images (used when API key is not set) ──────────
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1719937051230-8798ae2ebe86?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1747051741682-1c6c31d85e47?w=600&auto=format&fit=crop",
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

// ── Constants ──────────────────────────────────────────────
const POSTS_PER_PAGE = 6;
const TOTAL_POSTS = 30;

interface Post {
  id: string;
  username: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  time: string;
  photographer: string;
  profileUrl: string;
  color: string;
}

function buildFallbackPosts(): Post[] {
  return Array.from({ length: 24 }, (_, i) => ({
    id: `fallback-${i}`,
    username: ["joysanks", "explorer_", "wanderlust", "naturegram", "pixel_art", "skywatch"][i % 6],
    image: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
    caption: CAPTIONS[i % CAPTIONS.length],
    likes: Math.floor(Math.random() * 9000) + 100,
    comments: Math.floor(Math.random() * 300) + 5,
    time: `${Math.floor(Math.random() * 23) + 1}h ago`,
    photographer: "",
    profileUrl: "",
    color: "#1a1a2e",
  }));
}

function photoToPost(photo: UnsplashPhoto, index: number): Post {
  return {
    id: photo.id,
    username: photo.username,
    image: photo.thumb,
    caption: CAPTIONS[index % CAPTIONS.length],
    likes: Math.floor(Math.random() * 9000) + 100,
    comments: Math.floor(Math.random() * 300) + 5,
    time: `${Math.floor(Math.random() * 23) + 1}h ago`,
    photographer: photo.photographer,
    profileUrl: photo.profileUrl,
    color: photo.color,
  };
}

// ── Toast notification ─────────────────────────────────────
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="toast-popup" role="status" aria-live="polite">
      {message}
    </div>
  );
}

// ── Skeleton Card ──────────────────────────────────────────
function SkeletonCard() {
  return (
    <article className="post-card skeleton-card" aria-hidden="true">
      <div className="post-header">
        <div className="skeleton skeleton-avatar" />
        <div className="post-meta">
          <div className="skeleton skeleton-text" style={{ width: "80px" }} />
          <div className="skeleton skeleton-text" style={{ width: "50px", marginTop: 4 }} />
        </div>
      </div>
      <div className="post-image-wrap">
        <div className="skeleton" style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="post-actions" style={{ padding: "14px" }}>
        <div className="skeleton skeleton-text" style={{ width: "120px" }} />
      </div>
      <div style={{ padding: "4px 14px 14px" }}>
        <div className="skeleton skeleton-text" style={{ width: "70%" }} />
      </div>
    </article>
  );
}

// ── Post Card ──────────────────────────────────────────────
interface PostCardProps {
  post: Post;
  liked: boolean;
  bookmarked: boolean;
  userComments: string[];
  onLike: () => void;
  onBookmark: () => void;
  onShare: () => void;
  onAddComment: (text: string) => void;
}

function PostCard({ post, liked, bookmarked, userComments, onLike, onBookmark, onShare, onAddComment }: PostCardProps) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommentToggle = () => {
    setCommentOpen((v) => !v);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onAddComment(text);
    setDraft("");
  };

  const totalComments = post.comments + userComments.length;

  return (
    <article className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-avatar-wrap" style={{ background: post.color }}>
          <span className="post-avatar-initials">{post.username.slice(0, 2).toUpperCase()}</span>
        </div>
        <div className="post-meta">
          <a href={post.profileUrl || "#"} target="_blank" rel="noopener noreferrer" className="post-username">
            {post.username}
          </a>
          <span className="post-time">{post.time}</span>
        </div>
        <button className="post-more" aria-label="More options">⋯</button>
      </div>

      {/* Image */}
      <div className="post-image-wrap">
        <img src={post.image} alt={post.caption} className="post-image" loading="lazy" style={{ background: post.color }} />
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button className={`action-btn like-btn ${liked ? "liked" : ""}`} onClick={onLike} aria-label="Like">
          {liked ? "❤️" : "🤍"}
        </button>
        <button
          className={`action-btn ${commentOpen ? "action-btn-active" : ""}`}
          onClick={handleCommentToggle}
          aria-label="Comment"
          aria-expanded={commentOpen}
        >
          💬
        </button>
        <button className="action-btn" onClick={onShare} aria-label="Share">
          📤
        </button>
        <button
          className={`action-btn bookmark-btn ${bookmarked ? "bookmarked" : ""}`}
          onClick={onBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Save"}
        >
          {bookmarked ? "🔖" : "🔖"}
        </button>
      </div>

      {/* Likes */}
      <div className="post-likes">
        {(post.likes + (liked ? 1 : 0)).toLocaleString()} likes
        {bookmarked && <span className="saved-badge">✦ Saved</span>}
      </div>

      {/* Caption */}
      <div className="post-caption">
        <span className="post-username">{post.username}</span> {post.caption}
      </div>

      {/* Comments preview */}
      {userComments.length > 0 && (
        <div className="post-user-comments">
          {userComments.slice(-2).map((c, i) => (
            <div key={i} className="post-comment-row">
              <span className="post-username">you</span> {c}
            </div>
          ))}
        </div>
      )}

      {/* View all comments */}
      <button className="post-comments-btn" onClick={handleCommentToggle}>
        {commentOpen ? "Hide comments" : `View all ${totalComments} comments`}
      </button>

      {/* Inline comment box */}
      {commentOpen && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="comment-input"
            type="text"
            placeholder="Add a comment…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={200}
            aria-label="Write a comment"
          />
          <button type="submit" className="comment-submit" disabled={!draft.trim()} aria-label="Post comment">
            Post
          </button>
        </form>
      )}

      {/* Photographer credit */}
      {post.photographer && (
        <div className="post-photographer">
          📷{" "}
          <a href={post.profileUrl} target="_blank" rel="noopener noreferrer">
            {post.photographer}
          </a>{" "}
          on Unsplash
        </div>
      )}
    </article>
  );
}

// ── Main Feed Component ────────────────────────────────────
export default function PostFeed() {
  const { photos, loading, error } = usePhotos(TOTAL_POSTS);
  const [page, setPage] = useState(1);

  // Interaction state
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [postComments, setPostComments] = useState<Record<string, string[]>>({});
  const [toast, setToast] = useState<string | null>(null);

  const allPosts = useMemo<Post[]>(
    () => (photos.length > 0 ? photos.map((p, i) => photoToPost(p, i)) : buildFallbackPosts()),
    [photos]
  );

  const TOTAL_PAGES = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const visiblePosts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const goToPage = (p: number) => {
    setPage(p);
    document.getElementById("post-feed")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleLike = useCallback((id: string) => {
    setLikedIds((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds((prev) => {
      const s = new Set(prev);
      if (s.has(id)) { s.delete(id); setToast("Removed from saved"); }
      else { s.add(id); setToast("✦ Saved to collection"); }
      return s;
    });
  }, []);

  const handleShare = useCallback((post: Post) => {
    const shareUrl = post.profileUrl || window.location.href;
    const shareData = { title: "OpenWorld — " + post.username, text: post.caption, url: shareUrl };

    if (navigator.share && navigator.canShare?.(shareData)) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => setToast("🔗 Link copied to clipboard!"));
    }
  }, []);

  const addComment = useCallback((postId: string, text: string) => {
    setPostComments((prev) => ({ ...prev, [postId]: [...(prev[postId] ?? []), text] }));
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  const pageNumbers = (): (number | "…")[] => {
    if (TOTAL_PAGES <= 7) return Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", TOTAL_PAGES];
    if (page >= TOTAL_PAGES - 3)
      return [1, "…", TOTAL_PAGES - 4, TOTAL_PAGES - 3, TOTAL_PAGES - 2, TOTAL_PAGES - 1, TOTAL_PAGES];
    return [1, "…", page - 1, page, page + 1, "…", TOTAL_PAGES];
  };

  return (
    <section id="post-feed">
      {/* Toast */}
      {toast && <Toast message={toast} onDone={clearToast} />}

      <div className="feed-header">
        <h2 className="feed-title">Explore</h2>
        {photos.length > 0 && (
          <span className="feed-source-badge">
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="16" fill="#111" />
              <path d="M10 22 L16 10 L22 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16" cy="24" r="1.5" fill="white" />
            </svg>
            Powered by Unsplash
          </span>
        )}
      </div>

      {error && (
        <p className="feed-error">⚠️ Couldn't reach Unsplash — showing demo photos. Check your API key.</p>
      )}

      <div className="posts-grid">
        {loading
          ? Array.from({ length: POSTS_PER_PAGE }, (_, i) => <SkeletonCard key={i} />)
          : visiblePosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                liked={likedIds.has(post.id)}
                bookmarked={bookmarkedIds.has(post.id)}
                userComments={postComments[post.id] ?? []}
                onLike={() => toggleLike(post.id)}
                onBookmark={() => toggleBookmark(post.id)}
                onShare={() => handleShare(post)}
                onAddComment={(text) => addComment(post.id, text)}
              />
            ))}
      </div>

      {!loading && (
        <>
          <nav className="pagination" aria-label="Post feed pages">
            <button className="page-btn page-arrow" onClick={() => goToPage(page - 1)} disabled={page === 1} aria-label="Previous page">‹</button>
            {pageNumbers().map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="page-ellipsis">…</span>
              ) : (
                <button key={p} className={`page-btn ${page === p ? "page-active" : ""}`} onClick={() => goToPage(p as number)} aria-label={`Page ${p}`} aria-current={page === p ? "page" : undefined}>
                  {p}
                </button>
              )
            )}
            <button className="page-btn page-arrow" onClick={() => goToPage(page + 1)} disabled={page === TOTAL_PAGES} aria-label="Next page">›</button>
          </nav>
          <p className="page-info">Page {page} of {TOTAL_PAGES}</p>
        </>
      )}
    </section>
  );
}
