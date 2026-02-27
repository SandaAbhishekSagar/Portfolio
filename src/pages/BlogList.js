import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { blogPosts } from "../content/blog/blogData";
import { generateWebsiteSchema } from "../utils/seoUtils";
import NewsletterSignup from "../components/Blog/NewsletterSignup";
import { AiOutlineClock, AiOutlineCalendar, AiOutlineEye } from "react-icons/ai";

function BlogList() {
  const websiteSchema = generateWebsiteSchema();
  
  return (
    <>
      <Helmet>
        <title>AI & LLM Blog | Abhishek Sagar Sanda - Expert Insights & Tutorials</title>
        <meta name="description" content="Latest insights on AI, LLMs, RAG systems, computer vision, and machine learning. Expert tutorials, case studies, and industry trends from an AI Engineer at Northeastern University." />
        <meta name="keywords" content="AI blog, LLM tutorials, RAG systems, machine learning, computer vision, AI engineering, artificial intelligence, tech insights, Abhishek Sagar Sanda" />
        <meta property="og:title" content="AI & LLM Blog | Expert Insights & Tutorials" />
        <meta property="og:description" content="Expert insights on AI, machine learning, and LLM applications. Join 1,000+ engineers learning about cutting-edge AI technology." />
        <meta property="og:url" content="https://abhishek-sagar-sanda.netlify.app/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://abhishek-sagar-sanda.netlify.app/images/blog-hero.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI & LLM Blog | Expert Insights & Tutorials" />
        <meta name="twitter:description" content="Latest insights on AI, LLMs, and machine learning from an AI Engineer at Northeastern University." />
        <link rel="canonical" href="https://abhishek-sagar-sanda.netlify.app/blog" />
        <link rel="alternate" type="application/rss+xml" title="AI Engineering Blog RSS Feed" href="https://abhishek-sagar-sanda.netlify.app/rss.xml" />
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

      <Container fluid className="project-section">
        <Container>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={12} className="project-heading">
              <h1 className="project-heading-name">
                AI <strong className="purple">Engineering</strong> Blog
              </h1>
              <p style={{ color: "white", fontSize: "1.2rem", marginBottom: "10px" }}>
                Expert insights on AI, LLMs, and cutting-edge technology
              </p>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1rem" }}>
                Join 1,000+ engineers staying ahead of the AI curve with practical tutorials, 
                case studies, and industry insights from an AI Engineer at Northeastern University
              </p>
            </Col>
          </Row>
          
          <Row style={{ justifyContent: "center", paddingTop: "30px" }}>
            {blogPosts.map((post, index) => (
              <Col md={6} lg={4} className="project-card" key={index}>
                <Card className="project-card-view blog-card">
                  {post.featuredImage && (
                    <Card.Img 
                      variant="top" 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="blog-img"
                    />
                  )}
                  <Card.Body>
                    <Card.Title className="purple">{post.title}</Card.Title>
                    <Card.Text style={{ textAlign: "justify" }}>
                      {post.excerpt}
                    </Card.Text>
                    <div className="blog-meta" style={{ fontSize: "0.9rem", color: "#888", marginBottom: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "5px" }}>
                        <AiOutlineCalendar size={14} />
                        {post.date}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <AiOutlineClock size={14} />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="blog-tags" style={{ marginBottom: "15px" }}>
                      {post.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="badge"
                          style={{ 
                            backgroundColor: "var(--imp-text-color)", 
                            color: "white", 
                            marginRight: "5px",
                            fontSize: "0.8rem"
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="btn btn-primary blog-link"
                      style={{ textDecoration: "none" }}
                    >
                      Read Article
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Newsletter signup section */}
          <Row style={{ marginTop: "60px" }}>
            <Col>
              <NewsletterSignup />
            </Col>
          </Row>
          
          {/* Additional content for SEO */}
          <Row style={{ marginTop: "60px", marginBottom: "40px" }}>
            <Col md={8} className="mx-auto">
              <div style={{ 
                textAlign: "center", 
                padding: "40px 20px",
                background: "rgba(199, 112, 240, 0.05)",
                borderRadius: "15px",
                border: "1px solid rgba(199, 112, 240, 0.1)"
              }}>
                <h3 style={{ color: "var(--imp-text-color)", marginBottom: "20px" }}>
                  Why Follow This Blog?
                </h3>
                <div style={{ color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.6" }}>
                  <Row>
                    <Col md={4} style={{ marginBottom: "20px" }}>
                      <h5 style={{ color: "white", marginBottom: "10px" }}>🎯 Production-Ready</h5>
                      <p style={{ fontSize: "0.95rem" }}>
                        Real-world solutions from actual production systems serving millions of users
                      </p>
                    </Col>
                    <Col md={4} style={{ marginBottom: "20px" }}>
                      <h5 style={{ color: "white", marginBottom: "10px" }}>🧠 Expert Insights</h5>
                      <p style={{ fontSize: "0.95rem" }}>
                        Advanced techniques from a Teaching Assistant at Northeastern University
                      </p>
                    </Col>
                    <Col md={4} style={{ marginBottom: "20px" }}>
                      <h5 style={{ color: "white", marginBottom: "10px" }}>⚡ Latest Trends</h5>
                      <p style={{ fontSize: "0.95rem" }}>
                        Stay ahead with cutting-edge AI developments and emerging technologies
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default BlogList;