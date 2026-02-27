import React from "react";
import { Helmet } from "react-helmet-async";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Projects from "../components/Projects/Projects";
import Resume from "../components/Resume/ResumeNew";

function PortfolioHome() {
  return (
    <>
      <Helmet>
        <title>Abhishek Sagar Sanda | AI Engineer & Full-Stack Developer</title>
        <meta name="description" content="Graduate AI Engineer specializing in LLM applications, computer vision, and RAG pipelines. Teaching Assistant @ Northeastern University. Top-10 Finalist Murf.AI, Winner Roli.AI Hackathon." />
        <meta property="og:title" content="Abhishek Sagar Sanda | Portfolio" />
        <meta property="og:description" content="Graduate AI Engineer specializing in LLM applications and computer vision. Building production-ready AI systems with measurable impact." />
        <meta property="og:url" content="https://abhishek-sagar-sanda.netlify.app" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://abhishek-sagar-sanda.netlify.app" />
      </Helmet>
      
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
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