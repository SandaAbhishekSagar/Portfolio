// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import homeLogo from "../../Assets/home-main.jpg";
// import Particle from "../Particle";
// import Home2 from "./Home2";
// import Type from "./Type";

// function Home() {
//   return (
//     <section>
//       <Container fluid className="home-section" id="home">
//         <Particle />
//         <Container className="home-content">
//           <Row>
//             <Col md={7} className="home-header">
//               <h1 style={{ paddingBottom: 15 }} className="heading">
//                 Hi There!{" "}
//                 <span className="wave" role="img" aria-labelledby="wave">
//                   👋🏻
//                 </span>
//               </h1>

//               <h1 className="heading-name">
//                 I'M
//                 <strong className="main-name"> ABHISHEK SAGAR SANDA</strong>
//               </h1>

//               <div style={{ padding: 50, textAlign: "left" }}>
//                 <Type />
//               </div>
//             </Col>

//             <Col md={5} style={{ paddingBottom: 20 }}>
//               <img
//                 src={homeLogo}
//                 alt="home pic"
//                 className="img-fluid"
//                 style={{ maxHeight: "350px" }}
//               />
//             </Col>
//           </Row>
//         </Container>
//       </Container>
//       <Home2 />
//     </section>
//   );
// }

// export default Home;

// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import newImage from "../../Assets/home-main.jpg"; // Replace with your new image path
// import Particle from "../Particle";
// import Home2 from "./Home2";
// import Type from "./Type";

// function Home() {
//   return (
//     <section>
//       <Container fluid className="home-section" id="home">
//         <Particle />
//         <Container className="home-content">
//           <Row>
//             <Col md={7} className="home-header">
//               <h1 style={{ paddingBottom: 15 }} className="heading">
//                 Hi There!{" "}
//                 <span className="wave" role="img" aria-labelledby="wave">
//                   👋🏻
//                 </span>
//               </h1>

//               <h1 className="heading-name">
//                 I'M
//                 <strong className="main-name"> ABHISHEK SAGAR SANDA</strong>
//               </h1>

//               <div style={{ padding: 50, textAlign: "left" }}>
//                 <Type />
//               </div>
//             </Col>

//             <Col md={5} style={{ paddingBottom: 20 }}>
//               <img
//                 src={newImage}
//                 alt="home pic"
//                 className="img-fluid circular-image"
//                 style={{ maxHeight: "450px", borderRadius: "80%" }}
//               />
//             </Col>
//           </Row>
//         </Container>
//       </Container>
//       <Home2 />
//     </section>
//   );
// }

// export default Home;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import newImage from "../../Assets/home-main.jpg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Row>
              <Col md={7} className="home-header">
                <motion.h1
                  style={{ paddingBottom: 15 }}
                  className="heading"
                  variants={itemVariants}
                >
                  Hi There!{" "}
                  <span className="wave" role="img" aria-labelledby="wave">
                    👋🏻
                  </span>
                </motion.h1>

                <motion.h1
                  className="heading-name"
                  variants={itemVariants}
                >
                  I'M
                  <strong className="main-name"> ABHISHEK SAGAR SANDA</strong>
                </motion.h1>

                <motion.div
                  style={{ padding: 50, textAlign: "left" }}
                  variants={itemVariants}
                >
                  <Type />
                </motion.div>
              </Col>

              <Col md={5} style={{ paddingBottom: 20 }}>
                <motion.img
                  src={newImage}
                  alt="home pic"
                  className="img-fluid circular-image"
                  style={{ maxHeight: "450px", borderRadius: "80%" }}
                  variants={imageVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </Col>
            </Row>
          </motion.div>
        </Container>
      </Container>
      
      
      {/* Buttons Section Below Home */}
      <Container className="home-buttons">
        <Row className="justify-content-center">
          <Col md={3} className="text-center mb-4">
            <button 
              className="home-btn home-btn-about"
              onClick={() => {
                const element = document.getElementById("about");
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
            >
              About Me
            </button>
          </Col>
          <Col md={3} className="text-center mb-4">
            <button 
              className="home-btn home-btn-projects"
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
            >
              Projects
            </button>
          </Col>
          <Col md={3} className="text-center mb-4">
            <button 
              className="home-btn home-btn-resume"
              onClick={() => {
                const element = document.getElementById("resume");
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
            >
              Resume
            </button>
          </Col>
        </Row>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;

