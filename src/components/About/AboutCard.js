import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Abhishek Sagar Sanda </span>
            from <span className="purple"> Hyderabad, India.</span>
            <br />
            I am currently pursuing my MS in Information Systems from Northeastern University, Boston, MA.
            <br />
            Prior tto embarking on my graduate journey, I had the privilege of serving as a .NET Full Stack Developer at HCL Technologies Limited in Chennai, India.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Dancing
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

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
