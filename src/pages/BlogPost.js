import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { blogPosts as localBlogPosts } from "../content/blog/blogData";
import { generateBlogPostSchema, generateBreadcrumbSchema } from "../utils/seoUtils";
import { trackBlogEngagement } from "../utils/analytics";
import SocialShare from "../components/Blog/SocialShare";
import NewsletterSignup from "../components/Blog/NewsletterSignup";
import { AiOutlineArrowLeft, AiOutlineCalendar } from "react-icons/ai";
import { BsClock } from "react-icons/bs";

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setNotFound(false);
        setError(null);

        const res = await fetch(`/.netlify/functions/blog-post?slug=${encodeURIComponent(slug)}`);
        if (res.status === 404) {
          setNotFound(true);
          // Fallback to local static posts if available
          const fallback = localBlogPosts.find((p) => p.slug === slug);
          if (fallback) {
            setPost(fallback);
            setNotFound(false);
          }
          return;
        }
        if (!res.ok) {
          throw new Error("Failed to load post");
        }
        const data = await res.json();
        setPost(data.post);
      } catch (err) {
        console.error("Failed to fetch blog post, falling back to local data", err);
        const fallback = localBlogPosts.find((p) => p.slug === slug);
        if (fallback) {
          setPost(fallback);
        } else {
          setError("Unable to load this article.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      trackBlogEngagement(post.slug, 'view');
    }
  }, [post]);

  if (loading && !post) {
    return (
      <Container fluid className="project-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "50px" }}>
            <Col md={8}>
              <h1 style={{ color: "white", textAlign: "center" }}>Loading article...</h1>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }

  if ((!post || notFound) && !error) {
    return (
      <Container fluid className="project-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "50px" }}>
            <Col md={8}>
              <h1 style={{ color: "white", textAlign: "center" }}>Post Not Found</h1>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Link to="/blog" className="btn btn-primary">
                  Back to Blog
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }

  if (error && !post) {
    return (
      <Container fluid className="project-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "50px" }}>
            <Col md={8}>
              <h1 style={{ color: "white", textAlign: "center" }}>Error loading article</h1>
              <p style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", marginTop: "15px" }}>
                {error}
              </p>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Link to="/blog" className="btn btn-primary">
                  Back to Blog
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }

  const currentUrl = window.location.href;
  const schema = generateBlogPostSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://abhishek-sagar-sanda.netlify.app" },
    { name: "Blog", url: "https://abhishek-sagar-sanda.netlify.app/blog" },
    { name: post.title, url: currentUrl }
  ]);

  return (
    <>
      <Helmet>
        <title>{post.title} | Abhishek Sagar Sanda</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://abhishek-sagar-sanda.netlify.app/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        {post.featuredImage && (
          <meta property="og:image" content={post.featuredImage} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.featuredImage && (
          <meta name="twitter:image" content={post.featuredImage} />
        )}
        <link rel="canonical" href={`https://abhishek-sagar-sanda.netlify.app/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Container fluid className="project-section">
        <Container>
          <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
            <Col md={10} lg={8}>
              <div style={{ marginBottom: "30px" }}>
                <Link to="/blog" className="btn btn-outline-light" style={{ marginRight: "15px" }}>
                  <AiOutlineArrowLeft /> Back to Blog
                </Link>
              </div>

              <div className="blog-post-header" style={{ marginBottom: "40px" }}>
                <h1 className="project-heading-name" style={{ marginBottom: "20px" }}>
                  <span className="purple">{post.title}</span>
                </h1>
                
                <div className="blog-meta" style={{ color: "#ccc", marginBottom: "20px", fontSize: "1rem" }}>
                  <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <AiOutlineCalendar />
                      <strong>Published:</strong> {post.date}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <BsClock />
                      <strong>Read time:</strong> {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="blog-tags" style={{ marginBottom: "30px" }}>
                  {post.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="badge"
                      style={{ 
                        backgroundColor: "var(--imp-text-color)", 
                        color: "white", 
                        marginRight: "8px",
                        fontSize: "0.9rem",
                        padding: "6px 12px"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {post.featuredImage && (
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    style={{ 
                      width: "100%", 
                      maxHeight: "400px", 
                      objectFit: "cover", 
                      borderRadius: "10px",
                      marginBottom: "30px"
                    }}
                  />
                )}
              </div>

              <div 
                className="blog-content"
                style={{ 
                  color: "white", 
                  lineHeight: "1.8",
                  fontSize: "1.1rem"
                }}
              >
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, children, ...props}) => <h1 style={{color: "var(--imp-text-color)", marginTop: "40px", marginBottom: "20px"}} {...props}>{children}</h1>,
                    h2: ({node, children, ...props}) => <h2 style={{color: "var(--imp-text-color)", marginTop: "35px", marginBottom: "15px"}} {...props}>{children}</h2>,
                    h3: ({node, children, ...props}) => <h3 style={{color: "var(--imp-text-color)", marginTop: "30px", marginBottom: "10px"}} {...props}>{children}</h3>,
                    code: ({node, children, ...props}) => <code style={{backgroundColor: "rgba(199, 112, 240, 0.1)", padding: "2px 6px", borderRadius: "4px"}} {...props}>{children}</code>,
                    pre: ({node, children, ...props}) => <pre style={{backgroundColor: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "8px", overflow: "auto"}} {...props}>{children}</pre>,
                    blockquote: ({node, children, ...props}) => <blockquote style={{borderLeft: "4px solid var(--imp-text-color)", paddingLeft: "20px", marginLeft: "0", fontStyle: "italic"}} {...props}>{children}</blockquote>,
                    a: ({node, children, ...props}) => <a style={{color: "var(--imp-text-color)"}} {...props}>{children}</a>
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Social sharing */}
              <div style={{ marginTop: "50px", marginBottom: "40px" }}>
                <SocialShare 
                  url={currentUrl}
                  title={post.title}
                  description={post.excerpt}
                />
              </div>

              <div style={{ marginTop: "60px", padding: "30px", backgroundColor: "rgba(199, 112, 240, 0.1)", borderRadius: "10px" }}>
                <h4 style={{ color: "var(--imp-text-color)", marginBottom: "15px" }}>About the Author</h4>
                <p style={{ color: "white", marginBottom: "20px" }}>
                  Abhishek Sagar Sanda is a Graduate AI Engineer specializing in LLM applications, computer vision, and RAG pipelines. 
                  Currently serving as a Teaching Assistant at Northeastern University. Winner of multiple AI hackathons.
                </p>
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                  <Link to="/#about" className="btn btn-primary">
                    Learn More About Me
                  </Link>
                  <Link to="/blog" className="btn btn-outline-light">
                    Read More Articles
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          
          {/* Newsletter signup */}
          <Row style={{ marginTop: "60px" }}>
            <Col>
              <NewsletterSignup />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default BlogPost;