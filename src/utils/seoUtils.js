// SEO utilities for dynamic meta tags and structured data

export const generateBlogPostSchema = (post) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage ? `https://abhishek-sagar-sanda.netlify.app${post.featuredImage}` : null,
    "author": {
      "@type": "Person",
      "name": "Abhishek Sagar Sanda",
      "url": "https://abhishek-sagar-sanda.netlify.app",
      "sameAs": [
        "https://github.com/SandaAbhishekSagar",
        "https://linkedin.com/in/abhishek-sagar-sanda"
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": "Abhishek Sagar Sanda",
      "logo": {
        "@type": "ImageObject",
        "url": "https://abhishek-sagar-sanda.netlify.app/favicon.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://abhishek-sagar-sanda.netlify.app/blog/${post.slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": "Technology",
    "articleBody": post.content.substring(0, 500) + "..."
  };
};

export const generatePersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abhishek Sagar Sanda",
    "jobTitle": "AI Engineer & Full-Stack Developer",
    "description": "Graduate AI Engineer specializing in LLM applications, computer vision, and RAG pipelines. Teaching Assistant @ Northeastern University.",
    "url": "https://abhishek-sagar-sanda.netlify.app",
    "sameAs": [
      "https://github.com/SandaAbhishekSagar",
      "https://linkedin.com/in/abhishek-sagar-sanda"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Northeastern University"
    },
    "alumniOf": {
      "@type": "Organization", 
      "name": "Northeastern University"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Large Language Models",
      "Machine Learning",
      "Computer Vision",
      "RAG Systems",
      "Full-Stack Development",
      "Python",
      "React",
      "Node.js"
    ],
    "award": [
      "Top-10 Finalist Murf.AI Hackathon",
      "Winner Roli.AI Hackathon"
    ]
  };
};

export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Website",
    "name": "Abhishek Sagar Sanda | AI Engineer & Full-Stack Developer",
    "description": "Portfolio and blog of Abhishek Sagar Sanda, featuring AI engineering projects, LLM applications, and technical insights.",
    "url": "https://abhishek-sagar-sanda.netlify.app",
    "author": {
      "@type": "Person",
      "name": "Abhishek Sagar Sanda"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://abhishek-sagar-sanda.netlify.app/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateSitemap = async () => {
  const { blogPosts } = await import('../content/blog/blogData');
  
  const baseUrl = 'https://abhishek-sagar-sanda.netlify.app';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' }
  ];
  
  const blogPages = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: new Date(post.date).toISOString().split('T')[0]
  }));
  
  const allPages = [...staticPages, ...blogPages];
  
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return sitemapXml;
};

export const generateRSSFeed = async () => {
  const { blogPosts } = await import('../content/blog/blogData');
  
  const baseUrl = 'https://abhishek-sagar-sanda.netlify.app';
  const currentDate = new Date().toISOString();
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Abhishek Sagar Sanda | AI Engineering Blog</title>
    <description>Expert insights on AI, LLMs, and cutting-edge technology</description>
    <link>${baseUrl}/blog</link>
    <language>en-US</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <managingEditor>abhisheksagar@northeastern.edu (Abhishek Sagar Sanda)</managingEditor>
    <webMaster>abhisheksagar@northeastern.edu (Abhishek Sagar Sanda)</webMaster>
    
    ${blogPosts.map(post => `<item>
      <title>${post.title}</title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>abhisheksagar@northeastern.edu (Abhishek Sagar Sanda)</author>
      <category>${post.tags.join(', ')}</category>
    </item>`).join('\n    ')}
  </channel>
</rss>`;
  
  return rssXml;
};