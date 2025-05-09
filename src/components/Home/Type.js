import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "AI/ML Research Engineer",
          "NLP Engineer",
          "Generative AI Engineer",
          "Full Stack Developer",
          "Computer Vision Engineer"
          
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
