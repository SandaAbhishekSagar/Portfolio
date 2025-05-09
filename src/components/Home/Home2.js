import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <h2>Building the Future Through <span className="purple">AI Innovation</span></h2>
            <p className="home-about-body">
            Welcome to my portfolio! I'm <span className="purple">Abhishek Sagar Sanda, an AI engineer and researcher</span> dedicated to developing intelligent systems that solve real-world problems. 
              <br />
              <br />
              My journey in artificial intelligence spans the spectrum from <span className="purple"> natural language processing to computer vision and reinforcement learning.</span> As a graduate student in Information Systems at <span className="purple">Northeastern University</span>, I've focused on bridging theoretical AI concepts with practical applications that make a meaningful impact.
              <br></br>
              <br></br>
              My work is driven by a fascination with how machines can learn to understand language, recognize visual patterns, and make decisions through reinforcement. This has led me to develop projects like the Richard Wyckoff Trading Assistant, which uses Q-learning algorithms to identify optimal trading strategies, and LinguaVision, which combines neural machine translation with image generation to create immersive language learning experiences.
              <br></br>
              <br></br>
              I'm particularly interested in how AI can enhance human capabilities rather than replace them. Whether it's creating personalized chatbots that adapt to user preferences, developing translation systems for low-resource languages like Manipuri, or building real-time security systems that can detect potential threats, my goal is to make technology more accessible, intuitive, and beneficial.
              <br></br>
              <br></br>
              With professional experience at Virtual Presenz and HCL Technologies, I've learned to balance technical excellence with user needs, creating solutions that are not only technically sophisticated but also user-friendly and effective in real-world environments.
              <br></br>
              <br></br>
              I invite you to explore my projects and reach out if you're interested in collaborating on innovative AI solutions that push the boundaries of what's possible.
              <br></br>
              <br></br>
              
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/SandaAbhishekSagar"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/sandaabhisheksagar/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/s.abhishek_sagar?igsh=MXNkbXZhOXQ2Z2h5cw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
