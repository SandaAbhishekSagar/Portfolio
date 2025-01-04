import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
// import emotion from "../../Assets/Projects/emotion.png";
import online from "../../Assets/Projects/online_course.png";
import chatify from "../../Assets/Projects/chatify.png";
import food from "../../Assets/Projects/food.png";
import dispatch from "../../Assets/Projects/DispatchGenius.png";
import eat from "../../Assets/Projects/Eatwise.png";
import weapon from "../../Assets/Projects/Weapondetection.png";
import linguavision from "../../Assets/Projects/Output_1.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

        <Col md={4} className="project-card">
            <ProjectCard
              imgPath={linguavision}
              isBlog={false}
              title="LinguaVision - Multilingual Chatbot with Image Generation"
              description="LinguaVision, an innovative language learning system that combines neural machine translation with real-time image generation to create an immersive educational experience. Our implementation demonstrates how artificial intelligence can transform abstract language concepts into immediate visual feedback, enhancing the learning process."
              ghLink="https://github.com/SandaAbhishekSagar/LinguaVision/"
              demoLink="https://huggingface.co/spaces/abhisheksagar/english-learning-chatbot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Abhishek Sagar's Dynamic Chatbot"
              description="I utilized Roli's powerful tools to create Abhishek Sagar's Dynamic Chatbot with embedded customer care functionality. This innovative chatbot is tailored to individual preferences by asking three simple questions: how you want it to behave, what topic it should specialize in, and what tone it should use. Once customized, the chatbot is equipped to handle questions within its defined boundaries, providing a seamless and personalized experience."
              ghLink="https://github.com/SandaAbhishekSagar/AI_dynamic-chatbot"
              demoLink="https://www.linkedin.com/posts/sandaabhisheksagar_ai-generativeai-chatbot-activity-7189346944568164352-p6VU?utm_source=share&utm_medium=member_desktop"
            />
          </Col>

          

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dispatch}
              isBlog={false}
              title="DispatchGenius"
              description="DispatchGenius is a user-friendly platform for international students, simplifying deliveries and gift sending. Built with core design principles, it offers free services, scheduling, and feedback. Using JavaFX and Eclipse, it ensures scalability and efficiency. With modules for core functions and database management, DispatchGenius is cost-effective and time-saving. Future updates will include live tracking for better user experience."
              ghLink="https://github.com/SandaAbhishekSagar/DispatchGenius_deliveryapp"
              demoLink="https://youtu.be/WjvoS7NX-A8"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={eat}
              isBlog={false}
              title="EatWise"
              description="Eat Wise is a cutting-edge dietary management system utilizing advanced technologies and design principles. It employs data structures like lists, maps, BSTs, and graphs for efficient data handling and quick information retrieval. With a modular architecture based on object-oriented design principles, it offers features such as food logging, nutritional tracking, and personalized goal setting. Unique features like Nutri Match and Nutri Sort enhance user experience by finding similar foods and sorting them by nutrition values. User testing shows improved engagement and accuracy, with plans for future machine learning integration."
              ghLink="https://github.com/SandaAbhishekSagar/EatWise/tree/main"
              demoLink="https://youtu.be/KbH-XmQx7dw"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={food}
              isBlog={false}
              title="Cyber Cuisine Ordering Solution"
              description="This React application is a multi-page web application using React Router for navigation. It includes authentication handling, allowing different user experiences based on the login state. The application features various pages like Login, Register, Home, About, and more, including admin and delivery partner dashboards."
              ghLink="https://github.com/yogitha-adapa13/Webdfinalproject"
              // demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={online}
              isBlog={false}
              title="Acadamify"
              description="Led the creation of an intuitive Java-based education platform, focusing on object-oriented design for top-notch software quality. Boosted user satisfaction and registrations by enhancing UI and functionality. Introduced a secure authentication system, elevating user satisfaction by 20% and platform usability. The comprehensive platform attracted 40% more users, simplifying professor registration and course management for a 25% boost in administrative efficiency."
              ghLink="https://github.com/aed5100/final-project-team-achilles"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={weapon}
              isBlog={false}
              title="Wepon Detection"
              description="The Weapon Detection Project using OpenCV employs advanced computer vision to detect weapons in real-time video feeds. It offers high accuracy, scalability, and integration with existing security systems. Customizable and efficient, it enhances public safety by quickly identifying potential threats in diverse environments."
              // ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
