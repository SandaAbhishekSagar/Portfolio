import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import AnimationWrapper from "../AnimationWrapper";
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
            <AnimationWrapper direction="up" delay={0.1}>
              <h1 style={{ fontSize: "2.6em" }}>
                LET ME <span className="purple"> INTRODUCE </span> MYSELF
              </h1>
            </AnimationWrapper>
            <AnimationWrapper direction="up" delay={0.2}>
              <h2>Building the Future Through <span className="purple">AI Innovation</span></h2>
            </AnimationWrapper>
            <AnimationWrapper direction="up" delay={0.3}>
              <p className="home-about-body">
            Welcome to my portfolio! I'm <span className="purple">Abhishek Sagar Sanda, a Graduate AI Engineer</span> specializing in LLM applications and computer vision, passionate about building intelligent systems that transform how we interact with technology.
              <br />
              <br />
              Currently, I'm pursuing my Master's in Information Systems at <span className="purple">Northeastern University (GPA: 3.85)</span> and serving as a <span className="purple">Teaching Assistant</span> for advanced generative AI coursework. My journey is marked by recognition as a <span className="purple">Top-10 Finalist in Murf.AI Coding Challenge</span> and as <span className="purple">Winner of Northeastern's Roli.AI Hackathon</span>.
              <br></br>
              <br></br>
              My expertise lies in fine-tuning state-of-the-art models like <span className="purple">YOLOv8 and GPT-4 for multimodal applications</span>, building production-ready RAG pipelines, and developing full-stack AI systems. I've engineered solutions that achieve 85% detection accuracy on 70,000+ images, reduce response latency by up to 50%, and process 80,000+ documents for real-time semantic search.
              <br></br>
              <br></br>
              What drives me is creating AI solutions that enhance human capabilities—from building voice-based interview coaching systems with intelligent feedback, to developing RAG-powered chatbots that understand context across massive knowledge bases, to implementing reinforcement learning trading systems that make complex financial strategies accessible. Each project balances cutting-edge research with practical, scalable implementation.
              <br></br>
              <br></br>
              With professional experience spanning research at Virtual Presenz, enterprise development at HCL Technologies, and now teaching at Northeastern, I've learned to transform complex AI concepts into intuitive, impactful products. I'm always excited to explore new challenges in generative AI, computer vision, and NLP.
              <br></br>
              <br></br>
              Explore my work below, and let's connect to discuss how AI can solve your next challenge!
              <br></br>
              <br></br>
              
              </p>
            </AnimationWrapper>
          </Col>
          <Col md={4} className="myAvtar">
            <AnimationWrapper direction="right" delay={0.4}>
              <Tilt>
                <motion.img
                  src={myImg}
                  className="img-fluid"
                  alt="avatar"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </Tilt>
            </AnimationWrapper>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <AnimationWrapper direction="up" delay={0.1}>
              <h1>FIND ME ON</h1>
            </AnimationWrapper>
            <AnimationWrapper direction="up" delay={0.2}>
              <p>
                Feel free to <span className="purple">connect </span>with me
              </p>
            </AnimationWrapper>
            <AnimationWrapper direction="up" delay={0.3}>
              <ul className="home-about-social-links">
                <motion.li
                  className="social-icons"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    href="https://github.com/SandaAbhishekSagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-colour  home-social-icons"
                  >
                    <AiFillGithub />
                  </a>
                </motion.li>
                
                <motion.li
                  className="social-icons"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    href="https://www.linkedin.com/in/sandaabhisheksagar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-colour  home-social-icons"
                  >
                    <FaLinkedinIn />
                  </a>
                </motion.li>
                <motion.li
                  className="social-icons"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    href="https://www.instagram.com/s.abhishek_sagar?igsh=MXNkbXZhOXQ2Z2h5cw%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <AiFillInstagram />
                  </a>
                </motion.li>
              </ul>
            </AnimationWrapper>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
