import React from "react";
import { motion } from "framer-motion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  const cardVariants = {
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "https:" || urlObj.protocol === "http:";
    } catch {
      return false;
    }
  };

  const secureUrl = (url) => {
    if (!isValidUrl(url)) return "#";
    return url.startsWith("https://") ? url : url.replace(/^http:/, "https:");
  };

  return (
    <motion.div variants={cardVariants} whileHover="hover">
      <Card className="project-card-view glassmorphism-card">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Card.Img variant="top" src={props.imgPath} alt="card-img" />
        </motion.div>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <div style={props.descriptionStyle || {}}>
            <Card.Text style={{ textAlign: "justify" }}>
              {props.description}
            </Card.Text>
          </div>
          {props.ghLink && (
            <Button
              variant="primary"
              href={secureUrl(props.ghLink)}
              target="_blank"
              rel="noopener noreferrer"
              as={motion.a}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BsGithub /> &nbsp;
              {props.isBlog ? "Blog" : "GitHub"}
            </Button>
          )}
          {"\n"} 
          {"\n"}

          {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

          {!props.isBlog && props.demoLink && (
            <Button
              variant="primary"
              href={secureUrl(props.demoLink)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "10px" }}
              as={motion.a}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CgWebsite /> &nbsp;
              {"Demo"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
}
export default ProjectCards;
