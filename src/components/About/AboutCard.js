import React from "react";
import Card from "react-bootstrap/Card";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Abhishek Sagar Sanda </span>
            currently based in <span className="purple">Boston, MA</span>, pursuing my Master's at Northeastern University.
            <br />
            <br></br>
            I'm a <span className="purple">Graduate AI Engineer specializing in LLM applications and computer vision</span>, with hands-on experience fine-tuning YOLOv8 and GPT-4 for multimodal detection and building production-ready RAG pipelines. Currently serving as a <span className="purple">Teaching Assistant at Northeastern University</span>, where I facilitate advanced generative AI coursework and mentor 50+ graduate students on cutting-edge AI concepts.
            <br></br>
            <br></br>
            My journey in AI innovation is marked by significant achievements: I'm a <span className="purple">Top-10 Finalist in Murf.AI Coding Challenge</span> and <span className="purple">Winner of Northeastern's Roli.AI Hackathon</span>. My work spans from developing full-stack AI-powered systems like an Interview Coaching IVR platform with 40% reduced latency, to building RAG-powered chatbots that index and query over 80,000+ web pages in real-time.
            <br></br>
            <br></br>
            As a Research Software Engineer Intern at Virtual Presenz, I fine-tuned YOLOv8 and GPT-4 for multimodal applications, achieving <span className="purple">85% detection accuracy on 70,000+ training images</span> and reducing manual review time by 60% through automated labeling pipelines. I also built context-aware chatbot systems that reduced response latency by 50%, demonstrating my ability to deliver impactful, production-grade AI solutions.
            <br></br>
            <br></br>
            Previously at HCL Technologies, I delivered secure, scalable enterprise applications achieving 90%+ project efficiency while reducing support tickets by 10% and security vulnerabilities by 20%. My technical expertise spans Python, PyTorch, HuggingFace Transformers, LangChain, and modern web technologies, enabling me to build complete, end-to-end AI systems that solve real-world problems.
          </p>
          

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Abhishek Sagar</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
