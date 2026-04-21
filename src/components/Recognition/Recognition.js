import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaAward, FaBitcoin } from "react-icons/fa";
import Particle from "../Particle";
import AnimationWrapper from "../AnimationWrapper";

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
      </Container>
    </Container>
  );
}

export default Recognition;
