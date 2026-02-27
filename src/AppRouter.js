import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SupportCopilotWidget from "./components/Widget/SupportCopilotWidget";
import PortfolioHome from "./pages/PortfolioHome";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import { 
  initGA, 
  trackPageView, 
  setupEngagementTracking, 
  setupErrorTracking,
  trackPerformance 
} from "./utils/analytics";
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
                {/* Redirect old hash routes to main page */}
                <Route path="*" element={<PortfolioHome />} />
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