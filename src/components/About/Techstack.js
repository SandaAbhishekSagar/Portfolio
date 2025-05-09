import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaC,FaBrain, 
  FaRobot, 
  FaCode, FaPython, FaDatabase, FaAngular,FaChartLine, 
  FaLanguage } from "react-icons/fa6";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiJava,
  DiDjango
} from "react-icons/di";
import { 
  GiBrainTentacle, 
  GiArtificialIntelligence, 
  GiRobotGolem 
} from "react-icons/gi";
import { MdTranslate, MdComputer } from "react-icons/md";
import { BsGraphUp, BsEye } from "react-icons/bs";
import { RiComputerLine } from "react-icons/ri";
import {SiNextdotjs,SiArduino,SiPytorch, SiRaspberrypi,SiTensorflow, 
  SiOpencv,SiCplusplus} from "react-icons/si";
// import{FaSharp} from "react-icons/fa"
import { TbBrandCSharp } from "react-icons/tb";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <GiArtificialIntelligence />
        <p style={{fontSize:'10px'}}>AI/ML</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaLanguage />
        <p style={{fontSize:'10px'}} >NLP</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <BsEye />
        <p style={{fontSize:'10px'}}>Computer Vision</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <GiRobotGolem  />
        <p style={{fontSize:'10px'}}>Reinforcement Learning</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaBrain  />
        <p style={{fontSize:'10px'}}>Transformer Models</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <GiBrainTentacle  />
        <p style={{fontSize:'10px'}}>LLMs</p>
      </Col>
            
            {/* Frameworks & Tools */}
      <Col xs={4} md={2} className="tech-icons">
        <SiPytorch  />
        <p style={{fontSize:'10px'}}>PyTorch</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTensorflow  />
        <p style={{fontSize:'10px'}}>TensorFlow</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiOpencv  />
        <p style={{fontSize:'10px'}}>OpenCV</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <RiComputerLine  />
        <p style={{fontSize:'10px'}}>YOLO</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <MdTranslate  />
        <p style={{fontSize:'10px'}}>Neural Translation</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <MdComputer  />
        <p style={{fontSize:'10px'}}>MediaPipe</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
      <FaC />
      <p style={{fontSize:'10px'}}>C</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiJavascript1 />
        <p style={{fontSize:'10px'}}>JavaScript</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaPython />
        <p style={{fontSize:'10px'}}>Python</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiNodejs />
        <p style={{fontSize:'10px'}}>node.js</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiReact />
        <p style={{fontSize:'10px'}}>JavaScript</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaDatabase />
        <p style={{fontSize:'10px'}}>SQL</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiMongodb />
        <p style={{fontSize:'10px'}}>MongoDB</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNextdotjs />
        <p style={{fontSize:'10px'}}>Next.js</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiDjango />
        <p style={{fontSize:'10px'}}>Django</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaAngular/>
        <p style={{fontSize:'10px'}}>Angular</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <TbBrandCSharp />
        <p style={{fontSize:'10px'}}>CSharp</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiArduino />
        <p style={{fontSize:'10px'}}>Arduino</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiRaspberrypi  />
        <p style={{fontSize:'10px'}}>Raspberry Pi</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <BsGraphUp  />
        <p style={{fontSize:'10px'}}>Data Visualization</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiPython />
        <p style={{fontSize:'10px'}}>Python</p>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiJava />
        <p style={{fontSize:'10px'}}>Java</p>
      </Col>
    </Row>
  );
}

export default Techstack;
