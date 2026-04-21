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
        <title>Abhishek Sagar Sanda — AI Engineer | 2nd Place MIT Bitcoin Hackathon</title>
        <meta name="description" content="AI Engineer & Full-Stack Developer. 2nd Place, MIT Bitcoin Hackathon 2026. Northeastern Outstanding Master's Student Award 2026. Building voice AI, RAG systems, and Lightning apps." />
        <meta property="og:title" content="Abhishek Sagar Sanda — AI Engineer | 2nd Place MIT Bitcoin Hackathon" />
        <meta property="og:description" content="AI Engineer & Full-Stack Developer. 2nd Place, MIT Bitcoin Hackathon 2026. Northeastern Outstanding Master's Student Award 2026. Building voice AI, RAG systems, and Lightning apps." />
        <meta property="og:url" content="https://abhishek-sagar-sanda.netlify.app" />
        <meta property="og:type" content="website" />
        {/* TODO: Refresh og:image when you update portfolio visuals (LinkedIn/Twitter share preview). */}
        <meta name="twitter:title" content="Abhishek Sagar Sanda — AI Engineer | 2nd Place MIT Bitcoin Hackathon" />
        <meta name="twitter:description" content="AI Engineer & Full-Stack Developer. 2nd Place, MIT Bitcoin Hackathon 2026. Northeastern Outstanding Master's Student Award 2026. Building voice AI, RAG systems, and Lightning apps." />
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