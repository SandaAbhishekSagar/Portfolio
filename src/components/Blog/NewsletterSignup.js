import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { AiOutlineMail, AiOutlineLoading3Quarters } from "react-icons/ai";
import { trackNewsletterSignup } from "../../utils/analytics";

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/.netlify/functions/newsletter-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "blog" }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setStatus("success");
      setMessage(
        "Thanks for subscribing! You'll receive AI insights and tutorials directly in your inbox."
      );

      // Track newsletter signup
      trackNewsletterSignup("blog");

      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (error) {
      setStatus("error");
      setMessage("Oops! Something went wrong. Please try again later.");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="newsletter-signup">
            <h3>
              <AiOutlineMail style={{ marginRight: "10px" }} />
              Stay Updated with AI Insights
            </h3>
            <p style={{ color: "rgba(255, 255, 255, 0.8)", marginBottom: "25px" }}>
              Get the latest tutorials, case studies, and AI engineering insights delivered weekly. 
              Join 1,000+ engineers already subscribed.
            </p>
            
            {message && (
              <Alert 
                variant={status === "success" ? "success" : "danger"}
                style={{ 
                  backgroundColor: status === "success" 
                    ? "rgba(40, 167, 69, 0.1)" 
                    : "rgba(220, 53, 69, 0.1)",
                  borderColor: status === "success" 
                    ? "rgba(40, 167, 69, 0.3)" 
                    : "rgba(220, 53, 69, 0.3)",
                  color: "white",
                  marginBottom: "20px"
                }}
              >
                {message}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                style={{
                  opacity: status === "loading" ? 0.7 : 1
                }}
              />
              <button 
                type="submit" 
                disabled={status === "loading"}
                style={{
                  opacity: status === "loading" ? 0.7 : 1,
                  cursor: status === "loading" ? "not-allowed" : "pointer"
                }}
              >
                {status === "loading" ? (
                  <>
                    <AiOutlineLoading3Quarters 
                      className="spinning" 
                      style={{ marginRight: "8px" }} 
                    />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
            
            <p style={{ 
              fontSize: "0.85rem", 
              color: "rgba(255, 255, 255, 0.6)", 
              marginTop: "15px" 
            }}>
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NewsletterSignup;