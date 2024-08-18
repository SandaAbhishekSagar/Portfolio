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
            <p className="home-about-body">
            I am a trailblazing Full Stack Developer whose technical prowess and innovative mindset have positioned me at the forefront of the industry. 
              <br />
              <br />I am fluent in classics like
              <i>
                <b className="purple"> .NET, JavaScript, React, databases, and AI/ML </b>
              </i>
              <br />
              <br />
              I have consistently delivered high-impact solutions that optimize performance, enhance user engagement, and fortify security measures.
             
              Hailing from a prestigious academic background, my educational journey has been marked by a relentless pursuit of knowledge and a thirst for practical application. 
              <br></br>
              <br></br>
              My technical expertise is complemented by exceptional &nbsp;
              <i> <b className="purple">problem-solving skills, analytical acumen, and critical thinking abilities, </b></i>
               enabling me to spearhead cross-functional initiatives and drive productivity gains.
              <br></br>
              <br></br>
              My field of Interest's are building new &nbsp;
              <i>
                <b className="purple">Web Technologies and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                  AI/ML.
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              with <b className="purple">Node.js</b> and
              <i>
                <b className="purple">
                  {" "}
                  Modern Javascript Library and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js and Next.js</b>
              </i>
              <br></br>
              <br></br>
              As I embark on the next chapter of my career, I am poised to make a transformative impact on the technology landscape. With a deep understanding of emerging trends and a relentless drive to push the boundaries of innovation, I am primed to be a driving force in shaping the future of the industry. My versatility, adaptability, and visionary mindset make me an invaluable asset to any organization seeking to stay ahead of the curve
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
