import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaAward, FaBitcoin } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import Particle from "../Particle";
import AnimationWrapper from "../AnimationWrapper";
import academicHonorsImg from "../../Assets/academic-honors-convocation.png";

const cardHover = {
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
    },
  },
};

function Recognition() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <AnimationWrapper direction="up" delay={0.1}>
          <h1 className="project-heading">
            <strong className="purple">Recognition</strong>
          </h1>
        </AnimationWrapper>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={6} className="project-card">
            <AnimationWrapper direction="up" delay={0.1}>
              <motion.div variants={cardHover} whileHover="hover">
                <Card className="project-card-view glassmorphism-card h-100">
                  <Card.Body>
                    <div className="mb-3">
                      <FaAward
                        aria-hidden
                        style={{ fontSize: "2rem", color: "#c770f0" }}
                      />
                    </div>
                    <Card.Title as="h2" style={{ color: "white" }}>
                      Outstanding Master&apos;s Student Award — Community Impact
                    </Card.Title>
                    <Card.Subtitle
                      className="mb-3 mt-2"
                      style={{ color: "rgb(200 180 215)", fontSize: "0.95rem" }}
                    >
                      Northeastern University · 2026 Academic Honors Convocation
                    </Card.Subtitle>
                    <Card.Text style={{ textAlign: "justify", color: "white" }}>
                      One of 4 recipients across Northeastern&apos;s global network,
                      recognized for building an AI chatbot that helps new students
                      navigate university resources.
                    </Card.Text>
                    <Button
                      variant="primary"
                      href="https://coe.northeastern.edu/news/information-systems-students-receive-2026-outstanding-masters-student-award-in-community-impact/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 me-2 mb-2"
                      as={motion.a}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      College of Engineering feature
                    </Button>
                    <Button
                      variant="primary"
                      href="https://news.northeastern.edu/2026/04/16/academic-honors-convocation-2026/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 mb-2"
                      as={motion.a}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Northeastern Global News
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </AnimationWrapper>
          </Col>
          <Col md={6} className="project-card">
            <AnimationWrapper direction="up" delay={0.2}>
              <motion.div variants={cardHover} whileHover="hover">
                <Card className="project-card-view glassmorphism-card h-100">
                  <Card.Body>
                    <div className="mb-3">
                      <FaBitcoin
                        aria-hidden
                        style={{ fontSize: "2rem", color: "#c770f0" }}
                      />
                    </div>
                    <Card.Title as="h2" style={{ color: "white" }}>
                      2nd Place — MIT Bitcoin Expo Hackathon
                    </Card.Title>
                    <Card.Subtitle
                      className="mb-3 mt-2"
                      style={{ color: "rgb(200 180 215)", fontSize: "0.95rem" }}
                    >
                      MIT · April 2026 · 36-hour in-person build
                    </Card.Subtitle>
                    <Card.Text style={{ textAlign: "justify", color: "white" }}>
                      Built a voice-first Lightning Network wallet combining Twilio,
                      voice AI, and Bitcoin&apos;s Lightning protocol to make crypto
                      payments as simple as a phone call.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </AnimationWrapper>
          </Col>
        </Row>

        <AnimationWrapper direction="up" delay={0.15}>
          <Row className="justify-content-center" style={{ paddingTop: "20px" }}>
            <Col xs={12} md={10} lg={8}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={academicHonorsImg}
                  alt="Abhishek Sagar Sanda with the president of Northeastern University at the Academic Honors Convocation, 2026"
                  className="img-fluid w-100"
                  style={{
                    borderRadius: "15px",
                    border: "1px solid rgba(200, 137, 230, 0.35)",
                    boxShadow: "0 4px 5px 3px rgba(119, 53, 136, 0.35)",
                  }}
                />
                <p
                  className="text-center mt-3 mb-0"
                  style={{ color: "rgb(200 180 215)", fontSize: "0.95rem" }}
                >
                  With the president of Northeastern University · Academic Honors
                  Convocation, 2026
                </p>
              </motion.div>
            </Col>
          </Row>
        </AnimationWrapper>

        <AnimationWrapper direction="up" delay={0.2}>
          <Row className="justify-content-center" style={{ paddingTop: "40px", paddingBottom: "10px" }}>
            <Col md={10} lg={8}>
              <motion.div variants={cardHover} whileHover="hover">
                <Card className="project-card-view glassmorphism-card">
                  <Card.Body>
                    <Card.Title as="h2" style={{ color: "white" }}>
                      BitVoice Pay
                    </Card.Title>
                    <Card.Subtitle
                      className="mb-3 mt-2"
                      style={{ color: "rgb(200 180 215)", fontSize: "0.95rem" }}
                    >
                      MIT Bitcoin Expo Hackathon · Voice-first Lightning wallet
                    </Card.Subtitle>
                    <Card.Text style={{ textAlign: "justify", color: "white" }}>
                      Open-source repo for the voice-first Lightning Network wallet
                      (Twilio, voice AI, Bitcoin Lightning).
                    </Card.Text>
                    <Button
                      variant="primary"
                      href="https://github.com/SandaAbhishekSagar/BitVoice_Pay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1"
                      as={motion.a}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BsGithub /> &nbsp; GitHub — BitVoice_Pay
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </AnimationWrapper>
      </Container>
    </Container>
  );
}

export default Recognition;
