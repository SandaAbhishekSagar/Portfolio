-- Update existing blog posts with featured image paths.
-- Run this in your Railway Postgres SQL console if images aren't showing.
-- Paths must start with / (served from public/blog/ after deploy).

UPDATE blog_posts
SET featured_image = '/blog/rag-architecture.svg'
WHERE slug = 'building-production-ready-rag-systems-2026';

UPDATE blog_posts
SET featured_image = '/blog/llm-evaluation.svg'
WHERE slug = 'llm-evaluation-framework-2026';

UPDATE blog_posts
SET featured_image = '/blog/ai-agents-comparison.svg'
WHERE slug = 'ai-agent-frameworks-comparison-2026';

UPDATE blog_posts
SET featured_image = '/blog/vector-db-optimization.svg'
WHERE slug = 'vector-database-performance-optimization-guide';
