import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import AnimationWrapper from "../AnimationWrapper";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <AnimationWrapper direction="up" delay={0.1}>
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                Know Who <strong className="purple">I'M</strong>
              </h1>
            </AnimationWrapper>
            <AnimationWrapper direction="up" delay={0.2}>
              <Aboutcard />
            </AnimationWrapper>
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <AnimationWrapper direction="left" delay={0.3}>
              <motion.img
                src={laptopImg}
                alt="about"
                className="img-fluid"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </AnimationWrapper>
          </Col>
        </Row>
        <AnimationWrapper direction="up" delay={0.1}>
          <h1 className="project-heading">
            Professional <strong className="purple">Skillset </strong>
          </h1>
        </AnimationWrapper>

        <AnimationWrapper direction="up" delay={0.2}>
          <Techstack />
        </AnimationWrapper>

        <AnimationWrapper direction="up" delay={0.1}>
          <h1 className="project-heading">
            <strong className="purple">Tools</strong> I use
          </h1>
        </AnimationWrapper>
        <AnimationWrapper direction="up" delay={0.2}>
          <Toolstack />
        </AnimationWrapper>

        <AnimationWrapper direction="up" delay={0.3}>
          <Github />
        </AnimationWrapper>
        
      </Container>
    </Container>
  );
}

export default About;
