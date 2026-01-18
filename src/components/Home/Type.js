import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Graduate AI Engineer",
          "LLM Applications Specialist",
          "Computer Vision Engineer",
          "Teaching Assistant @ Northeastern",
          "RAG Pipeline Builder",
          "Full Stack AI Developer"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
