// // import React, { useState, useEffect } from "react";
// // import { Container, Row } from "react-bootstrap";
// // import Button from "react-bootstrap/Button";
// // import Particle from "../Particle";
// // import pdf from "../../Assets/../Assets/Abhishek_Sagar_Sanda_FullStackResume.pdf";
// // import { AiOutlineDownload } from "react-icons/ai";
// // import { Document, Page, pdfjs } from "react-pdf";
// // import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // function ResumeNew() {
// //   const [width, setWidth] = useState(1200);

// //   useEffect(() => {
// //     setWidth(window.innerWidth);
// //   }, []);

// //   return (
// //     <div>
// //       <Container fluid className="resume-section">
// //         <Particle />
// //         <Row style={{ justifyContent: "center", position: "relative" }}>
// //           <Button
// //             variant="primary"
// //             href={pdf}
// //             target="_blank"
// //             style={{ maxWidth: "250px" }}
// //           >
// //             <AiOutlineDownload />
// //             &nbsp;Download CV
// //           </Button>
// //         </Row>

// //         <Row className="resume">
// //           <Document file={pdf} className="d-flex justify-content-center">
// //             <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
// //           </Document>
// //         </Row>

// //         <Row style={{ justifyContent: "center", position: "relative" }}>
// //           <Button
// //             variant="primary"
// //             href={pdf}
// //             target="_blank"
// //             style={{ maxWidth: "250px" }}
// //           >
// //             <AiOutlineDownload />
// //             &nbsp;Download CV
// //           </Button>
// //         </Row>
// //       </Container>
// //     </div>
// //   );
// // }

// // export default ResumeNew;
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import Particle from "../Particle";
// import pdf1 from "../../Assets/Abhishek_Sagar_Sanda_FullStack_Resume.pdf";
// import pdf2 from "../../Assets/Abhishek_Sagar_Sanda_AI_ML_Resume.pdf";
// import { AiOutlineDownload } from "react-icons/ai";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// function ResumeNew() {
//   const [width, setWidth] = useState(1200);
//   const [selectedResume, setSelectedResume] = useState(1);

//   useEffect(() => {
//     setWidth(window.innerWidth);
//   }, []);

//   const handleResumeSelect = (resumeNumber) => {
//     setSelectedResume(resumeNumber);
//   };

//   return (
//     <div>
//       <Container fluid className="resume-section">
//         <Particle />
//         <Row style={{ justifyContent: "center", position: "relative" }}>
//           <Col md={6}>
//             <Button
//               variant={selectedResume === 1 ? "primary" : "outline-primary"}
//               onClick={() => handleResumeSelect(1)}
//               style={{ maxWidth: "250px" }}
//             >
//               Full Stack Resume
//             </Button>
//           </Col>
//           <Col md={6}>
//             <Button
//               variant={selectedResume === 2 ? "primary" : "outline-primary"}
//               onClick={() => handleResumeSelect(2)}
//               style={{ maxWidth: "250px" }}
//             >
//               AI/ML Resume
//             </Button>
//           </Col>
//         </Row>

//         <Row className="resume">
//           <Document
//             file={selectedResume === 1 ? pdf1 : pdf2}
//             className="d-flex justify-content-center"
//           >
//             <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
//           </Document>
//         </Row>

//         <Row style={{ justifyContent: "center", position: "relative" }}>
//           <Button
//             variant="primary"
//             href={selectedResume === 1 ? pdf1 : pdf2}
//             target="_blank"
//             style={{ maxWidth: "250px" }}
//           >
//             <AiOutlineDownload />
//             &nbsp;Download CV
//           </Button>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default ResumeNew;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../Particle";
import pdf1 from "../../Assets/Abhishek_Sagar_Sanda_FullStack_Resume.pdf";
import pdf2 from "../../Assets/Abhishek_Sagar_Sanda_AI_ML_Resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [selectedResume, setSelectedResume] = useState(1);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const handleResumeSelect = (resumeNumber) => {
    setSelectedResume(resumeNumber);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          {/* <Col md={6}>
            <Button
              variant={selectedResume === 1 ? "primary" : "outline-primary"}
              onClick={() => handleResumeSelect(1)}
              style={{ maxWidth: "250px" }}
            >
              Full Stack Resume
            </Button>
          </Col> */}
          <Col md={3}>
            <Button
              variant={selectedResume === 2 ? "primary" : "outline-primary"}
              onClick={() => handleResumeSelect(2)}
              style={{ maxWidth: "250px" }}
            >
              AI/ML Resume
            </Button>
          </Col>
        </Row>

        <Row className="resume" style={{ maxHeight: "170vh", overflowY: "auto" }}>
          <Document
            file={selectedResume === 2 ? pdf1 : pdf2}
            onLoadSuccess={onDocumentLoadSuccess}
            className="d-flex justify-content-center flex-column align-items-center"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={width > 786 ? 1.7 : 0.6}
              />
            ))}
          </Document>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={selectedResume === 2 ? pdf1 : pdf2}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;

