import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SupportCopilotWidget from "./components/Widget/SupportCopilotWidget";
import PortfolioHome from "./pages/PortfolioHome";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import { Helmet } from "react-helmet-async";
import { 
  initGA, 
  trackPageView, 
  setupEngagementTracking, 
  setupErrorTracking,
  trackPerformance 
} from "./utils/analytics";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Abhishek Sagar Sanda</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", padding: "40px" }}>
        <h1 style={{ fontSize: "4rem", color: "var(--imp-text-color)", marginBottom: "20px" }}>404</h1>
        <h2 style={{ marginBottom: "20px" }}>Page Not Found</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "40px" }}>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </>
  );
}
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Analytics wrapper component
function AnalyticsWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route changes
    trackPageView(location.pathname + location.search);
  }, [location]);

  return children;
}

function AppRouter() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Initialize analytics
  useEffect(() => {
    // Initialize Google Analytics (gtag already loaded via HTML)
    initGA('G-B6H259W4M9');
    setupEngagementTracking();
    setupErrorTracking();
    trackPerformance();
  }, []);

  // Smooth scroll behavior
  useEffect(() => {
    if (!load) {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, [load]);

  return (
    <HelmetProvider>
      <Router>
        <AnalyticsWrapper>
          <div className="App" id={load ? "no-scroll" : "scroll"}>
            <Preloader load={load} />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<PortfolioHome />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <SupportCopilotWidget />
          </div>
        </AnalyticsWrapper>
      </Router>
    </HelmetProvider>
  );
}

export default AppRouter;