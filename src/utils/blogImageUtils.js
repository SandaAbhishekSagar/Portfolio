/**
 * Resolve featured image URL for blog posts.
 * - API posts: featuredImage is a string path (e.g. "/blog/rag.svg" or "blog/rag.svg")
 * - Static posts: featuredImage may be a webpack asset (string path)
 * Ensures relative paths resolve correctly to absolute URLs.
 */
export function getFeaturedImageUrl(post) {
  const img = post?.featuredImage;
  if (!img) return null;
  if (typeof img !== "string") return img;
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  const path = img.startsWith("/") ? img : `/${img}`;
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${path}`;
  }
  return path;
}
