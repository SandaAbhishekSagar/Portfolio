import React from "react";
import { Helmet } from "react-helmet-async";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Recognition from "../components/Recognition/Recognition";
import Projects from "../components/Projects/Projects";
import Resume from "../components/Resume/ResumeNew";
import { generatePersonSchema } from "../utils/seoUtils";

function PortfolioHome() {
  const personSchemaJson = JSON.stringify(generatePersonSchema());

  return (
    <>
      <Helmet>
        <title>{"Abhishek Sagar Sanda | AI Engineer & Full-Stack Developer"}</title>
        <meta name="description" content="AI Engineer & Full-Stack Developer. Northeastern Outstanding Master's Student Award 2026 (Community Impact). Building voice AI, RAG systems, and full-stack AI systems." />
        <meta name="keywords" content="Abhishek Sagar Sanda, AI Engineer, Full-Stack Developer, RAG systems, LLM, voice AI, machine learning, Northeastern University, computer vision, Python, React" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:title" content="Abhishek Sagar Sanda | AI Engineer & Full-Stack Developer" />
        <meta property="og:description" content="AI Engineer & Full-Stack Developer. Northeastern Outstanding Master's Student Award 2026 (Community Impact). Building voice AI, RAG systems, and full-stack AI systems." />
        <meta property="og:url" content="https://abhishek-sagar-sanda.netlify.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://raw.githubusercontent.com/SandaAbhishekSagar/Portfolio/main/Images/readme-img.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Abhishek Sagar Sanda | AI Engineer & Full-Stack Developer" />
        <meta name="twitter:description" content="AI Engineer & Full-Stack Developer. Northeastern Outstanding Master's Student Award 2026 (Community Impact). Building voice AI, RAG systems, and full-stack AI systems." />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/SandaAbhishekSagar/Portfolio/main/Images/readme-img.png" />
        <link rel="canonical" href="https://abhishek-sagar-sanda.netlify.app" />
        <script type="application/ld+json">{personSchemaJson}</script>
      </Helmet>
      
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="recognition">
        <Recognition />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="resume">
        <Resume />
      </section>
    </>
  );
}

export default PortfolioHome;