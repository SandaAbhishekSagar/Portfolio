import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import AnimationWrapper from "../AnimationWrapper";
// import emotion from "../../Assets/Projects/emotion.png";
import online from "../../Assets/Projects/online_course.png";
import chatify from "../../Assets/Projects/chatify.png";
import food from "../../Assets/Projects/food.png";
import dispatch from "../../Assets/Projects/DispatchGenius.png";
import eat from "../../Assets/Projects/Eatwise.png";
import weapon from "../../Assets/Projects/Weapondetection.png";
import linguavision from "../../Assets/Projects/Output_1.png";
import wyckoff from "../../Assets/Projects/wyckoff.jpeg"
import translator from "../../Assets/Projects/translator.jpeg"


function Projects() {
  const scrollableCardStyle = {
    maxHeight: "300px",  // Set a fixed height for description container
    overflowY: "auto",   // Enable vertical scrolling
    padding: "0 5px",    // Add some padding for better readability
    marginBottom: "15px" // Add margin at bottom for spacing
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <AnimationWrapper direction="up" delay={0.1}>
          <h1 className="project-heading">
            My Recent <strong className="purple">Works </strong>
          </h1>
        </AnimationWrapper>
        <AnimationWrapper direction="up" delay={0.2}>
          <p style={{ color: "white" }}>
            Here are a few projects I've worked on recently.
          </p>
        </AnimationWrapper>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Col md={4} className="project-card">
            <AnimationWrapper direction="up" delay={0.1}>
              <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="RAG-Powered Northeastern University Chatbot"
              description="Developed an AI-powered chatbot system focused on Northeastern University, featuring automated web scraping, semantic search, and a modern web interface. The platform enables users to ask natural language questions and receive instant, relevant answers sourced from hundreds of university web pages."
              descriptionStyle={scrollableCardStyle}
              // ghLink="https://github.com/SandaAbhishekSagar/LinguaVision/"
              // demoLink="https://huggingface.co/spaces/abhisheksagar/english-learning-chatbot"
            />
            </AnimationWrapper>
          </Col>
        <Col md={4} className="project-card">
            <AnimationWrapper direction="up" delay={0.2}>
              <ProjectCard
              imgPath={translator}
              isBlog={false}
              title="English-to-Manipuri Neural Machine Translation System"
              description="This project implements a Transformer-based neural machine translation system that translates between English and Manipuri language written in the Meetei Mayek script. Built using PyTorch, the system features a complete encoder-decoder architecture with multi-head attention mechanisms, custom tokenization handling for both languages, and GPU acceleration for efficient training. The model was trained on a parallel corpus of English-Manipuri text pairs and demonstrates the challenges of working with low-resource languages and non-Latin writing systems. The interactive chat functionality allows users to type English text and receive Manipuri translations in real-time, though some post-processing is needed to handle proper character spacing in the Meetei Mayek script output."
              descriptionStyle={scrollableCardStyle}
              // ghLink="https://github.com/SandaAbhishekSagar/LinguaVision/"
              // demoLink="https://huggingface.co/spaces/abhisheksagar/english-learning-chatbot"
            />
            </AnimationWrapper>
          </Col>
          <Col md={4} className="project-card">
            <AnimationWrapper direction="up" delay={0.3}>
              <ProjectCard
              imgPath={wyckoff}
              isBlog={false}
              title="Richard Wyckoff Trading Assistant"
              description="A full-stack web application that combines artificial intelligence with financial analysis to assist traders using Wyckoff methodology principles. The system features a dual-component architecture: (1) an interactive Q&A chatbot trained on Wyckoff trading concepts to answer methodology questions, and (2) a reinforcement learning-powered trading strategy that uses Q-learning to identify optimal buy/sell signals.
Users can backtest trading strategies across any stock symbol, visualize performance metrics, and analyze trading signals through an intuitive dashboard with interactive price charts and technical indicators. The application seamlessly integrates PyTorch-based NLP models with Flask backend services and a responsive frontend, demonstrating practical applications of AI in financial technology.
Built with Python, Flask, PyTorch, JavaScript, and Chart.js, the project showcases advanced implementation of reinforcement learning for algorithmic trading while making complex financial concepts accessible through an AI-powered assistant."
              ghLink="https://github.com/SandaAbhishekSagar/Transformer-based-Richard-Wyckoff-Trading-Assistant"
              descriptionStyle={scrollableCardStyle}
              // demoLink="https://huggingface.co/spaces/abhisheksagar/english-learning-chatbot"
            />
            </AnimationWrapper>
          </Col>
        <Col md={4} className="project-card">
            <AnimationWrapper direction="up" delay={0.1}>
              <ProjectCard
              imgPath={linguavision}
              isBlog={false}
              title="LinguaVision - Multilingual Chatbot with Image Generation"
              description="LinguaVision is an innovative educational platform that revolutionizes language acquisition by seamlessly integrating neural machine translation with real-time image generation. This cutting-edge system transforms the traditional language learning experience by providing immediate visual representations of translated content, creating a powerful cognitive connection between verbal concepts and their visual counterparts.
The application leverages state-of-the-art AI technologies including Helsinki-NLP's multilingual translation model (opus-mt-mul-en) and Stability AI's diffusion-based image generation capabilities (stable-diffusion-2-1). Built with Gradio and Hugging Face libraries, LinguaVision offers an intuitive interface that makes advanced AI technology accessible to language learners across proficiency levels.
By bridging the gap between textual understanding and visual context, LinguaVision creates a more immersive, engaging, and effective language learning environment that accommodates diverse learning styles and accelerates comprehension of new linguistic concepts."
              ghLink="https://github.com/SandaAbhishekSagar/LinguaVision/"
              descriptionStyle={scrollableCardStyle}
              demoLink="https://huggingface.co/spaces/abhisheksagar/english-learning-chatbot"
            />
            </AnimationWrapper>
          </Col>

          <Col md={4} className="project-card">
            <AnimationWrapper direction="up" delay={0.2}>
              <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Abhishek Sagar's Dynamic Chatbot"
              description="Dynamic Chatbot represents an innovative approach to personalized AI interaction through adaptive customization. The system employs a three-question configuration process to establish user preferences, creating a tailored conversational experience within defined parameters.
Key features include:

Preference-based customization: The chatbot adapts its behavior, specialization area, and tone based on user responses to three fundamental questions
Boundary recognition: Once configured, the system maintains conversation within its established domains of expertise
Customer support integration: A dedicated assistance mode helps users navigate the application and address specific inquiries

This solution leverages the Roli.ai development environment in conjunction with JavaScript and the ChatGPT API, representing an elegant implementation of conversational AI that balances personalization with practical functionality. Developed as part of the Roli.ai hackathon, the project demonstrates effective application of contemporary AI technologies to create responsive, user-centric conversational experiences."
              ghLink="https://github.com/SandaAbhishekSagar/AI_dynamic-chatbot"
              descriptionStyle={scrollableCardStyle}
              demoLink="https://www.linkedin.com/posts/sandaabhisheksagar_ai-generativeai-chatbot-activity-7189346944568164352-p6VU?utm_source=share&utm_medium=member_desktop"
            />
            </AnimationWrapper>
          </Col>

          

          <Col md={4} className="project-card">
            <AnimationWrapper direction="up" delay={0.3}>
              <ProjectCard
              imgPath={dispatch}
              isBlog={false}
              title="DispatchGenius"
              description="DispatchGenius is a specialized logistics platform built on JavaFX framework, designed specifically for international students to manage deliveries and gift-sending services. The technical architecture comprises:

Frontend Development: Implemented using JavaFX for UI components with CSS for styling
Development Environment: Built using Eclipse IDE for Java development
Modular Architecture: Organized in functional modules for core operations, user management, and database interactions
Data Management: Incorporates database management systems for storing user data, delivery information, and scheduling details
Scheduling System: Features a scheduling algorithm for optimizing delivery timelines
Feedback Management: Technical infrastructure for collecting and processing user feedback

The application follows design patterns that prioritize scalability and efficiency while maintaining a lightweight footprint. The implementation strategy focused on creating a cost-effective solution with minimal technical overhead, with plans for future integration of real-time tracking capabilities through API connections."
              ghLink="https://github.com/SandaAbhishekSagar/DispatchGenius_deliveryapp"
              descriptionStyle={scrollableCardStyle}
              demoLink="https://youtu.be/WjvoS7NX-A8"              
            />
            </AnimationWrapper>
          </Col>

          <Col md={4} className="project-card">
            <AnimationWrapper direction="up" delay={0.1}>
              <ProjectCard
              imgPath={eat}
              isBlog={false}
              title="EatWise"
              description="EatWise is a dietary management system built on robust computer science principles, featuring an architecture optimized for efficient nutritional data processing. The technical implementation includes:

Data Structure Integration: Utilizes balanced search trees (BSTs), hash maps, and specialized graphs for O(log n) food item retrieval and relationship mapping
Object-Oriented Architecture: Implements modular design with inheritance and polymorphism to separate concerns between nutritional analysis, user data management, and recommendation systems
Specialized Algorithms: Features custom implementations of Nutri Match (utilizing similarity metrics and nearest-neighbor algorithms) and Nutri Sort (employing comparison-based sorting with multiple attribute weighting)
Performance Optimization: Incorporates caching mechanisms and efficient memory management to enable real-time nutritional calculations despite handling large nutritional databases
Testing Framework: Employs unit and integration testing methodologies with documented improvements in data retrieval speed and recommendation accuracy

The system architecture prioritizes extensibility, allowing for the planned integration of machine learning components while maintaining the performance characteristics necessary for responsive dietary management."
              ghLink="https://github.com/SandaAbhishekSagar/EatWise/tree/main"
              descriptionStyle={scrollableCardStyle}
              demoLink="https://youtu.be/KbH-XmQx7dw"
            />
            </AnimationWrapper>
          </Col>
          <Col md={4} className="project-card">
            <AnimationWrapper direction="up" delay={0.2}>
              <ProjectCard
              imgPath={food}
              isBlog={false}
              title="Cyber Cuisine Ordering Solution"
              description="Cyber Cuisine Ordering Solution is a full-stack web application built with modern JavaScript technologies for online food ordering and delivery management. The technical implementation features:

Frontend Framework: Developed using React.js with React Router for client-side routing and navigation between multiple pages
Authentication System: Implements user authentication with role-based access control to provide different interfaces for customers, administrators, and delivery partners
State Management: Utilizes React's context API or state management libraries to maintain user session information across the application
Backend Integration: Connects to MongoDB database for persistent storage of user data, orders, menu items, and delivery information
Responsive Design: Employs modern CSS frameworks or custom styling to ensure cross-device compatibility
Multi-Role Architecture: Features specialized dashboards with different functionality for administrators and delivery partners
RESTful API Communication: Likely implements API services to handle data exchange between the frontend and MongoDB backend

The application follows modern web development practices with component-based architecture for maintainability and scalability while providing specialized interfaces tailored to different user roles within the food delivery ecosystem."
              ghLink="https://github.com/yogitha-adapa13/Webdfinalproject"
              descriptionStyle={scrollableCardStyle}
              // demoLink="https://blogs.soumya-jit.tech/"
            />
            </AnimationWrapper>
          </Col>

          <Col md={4} className="project-card">
            <AnimationWrapper direction="up" delay={0.3}>
              <ProjectCard
              imgPath={online}
              isBlog={false}
              title="Acadamify"
              description="Led the creation of an intuitive Java-based education platform, focusing on object-oriented design for top-notch software quality. Boosted user satisfaction and registrations by enhancing UI and functionality. Introduced a secure authentication system, elevating user satisfaction by 20% and platform usability. The comprehensive platform attracted 40% more users, simplifying professor registration and course management for a 25% boost in administrative efficiency."
              ghLink="https://github.com/aed5100/final-project-team-achilles"
              descriptionStyle={scrollableCardStyle}
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
            </AnimationWrapper>
          </Col>

          <Col md={4} className="project-card">
            <AnimationWrapper direction="up" delay={0.1}>
              <ProjectCard
              imgPath={weapon}
              isBlog={false}
              title="Wepon Detection"
              description="The Weapon Detection Project is a computer vision-based security solution that leverages deep learning for real-time identification of weapons in video streams. The technical implementation includes:

Deep Learning Framework: Built using PyTorch for neural network implementation and training
Computer Vision Processing: Integrates OpenCV for video capture, preprocessing, and image manipulation
Object Detection Model: Implements YOLO (You Only Look Once) architecture for real-time object detection, providing both classification and localization of weapons
Real-time Processing Pipeline: Optimizes frame processing to enable immediate threat detection with minimal latency
Inference Optimization: Likely incorporates techniques like model quantization or hardware acceleration to improve processing efficiency
Python Backend: Developed with Python as the core programming language for both model development and application integration

The system employs a unified detection approach that enables single-pass analysis of video frames, allowing for prompt identification of potential weapons across diverse environmental conditions while maintaining processing efficiency. This architecture makes it suitable for integration with existing security infrastructure in public spaces, educational institutions, or commercial venues."
              // ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              descriptionStyle={scrollableCardStyle}
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
            </AnimationWrapper>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
