import React from "react";
import Card from "react-bootstrap/Card";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Abhishek Sagar Sanda </span>
            from <span className="purple"> Hyderabad, India.</span>
            <br />
            <br></br>
            I'm an Information Systems graduate student at Northeastern University with specialized expertise in AI-driven technologies. My work spans neural machine translation, reinforcement learning systems, and real-time computer vision applications.
            <br></br>
            <br></br>
            My project portfolio demonstrates proficiency across the AI spectrum - from developing a Transformer-based English-to-Manipuri translation system to implementing YOLO-based weapon detection models with 85% accuracy. I've successfully integrated cutting-edge technologies through projects like the Richard Wyckoff Trading Assistant, which combines Q-learning reinforcement algorithms with financial analysis, and LinguaVision, which merges neural machine translation with image generation.
            <br></br>
            <br></br>
            As a Research Software Engineer Intern at Virtual Presenz, I've engineered high-accuracy object detection systems and applied advanced pose estimation techniques. Previously at HCL Technologies, I delivered enterprise applications with exceptional efficiency metrics while improving user engagement through Agile methodologies.
            <br></br>
            <br></br>
            I'm passionate about pushing the boundaries of AI innovation, as evidenced by my award-winning performance in the Roli.ai Generative AI Hackathon. My technical skillset includes proficiency in Python, PyTorch, TensorFlow, and various web development technologies, enabling me to build complete, end-to-end AI solutions.
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
