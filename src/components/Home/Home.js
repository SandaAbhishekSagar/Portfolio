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
import newImage from "../../Assets/home-main.jpg"; // Replace with your new image path
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { Link } from "react-router-dom"; // If you're using React Router

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> ABHISHEK SAGAR SANDA</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={newImage}
                alt="home pic"
                className="img-fluid circular-image"
                style={{ maxHeight: "450px", borderRadius: "80%" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      
      
      {/* Buttons Section Below Home */}
      <Container className="home-buttons">
        <Row className="justify-content-center">
          <Col md={3} className="text-center mb-4">
            <Link to="/about">
              <button className="home-btn home-btn-about">About Me</button>
            </Link>
          </Col>
          <Col md={3} className="text-center mb-4">
            <Link to="/project">
              <button className="home-btn home-btn-projects">Projects</button>
            </Link>
          </Col>
          <Col md={3} className="text-center mb-4">
            <Link to="/resume">
              <button className="home-btn home-btn-resume">Resume</button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;

