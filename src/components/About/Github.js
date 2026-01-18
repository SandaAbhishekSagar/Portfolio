import React, { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import { Row, Col } from "react-bootstrap";

function Github() {
  const [contributions, setContributions] = useState(537); // Default to your current count
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contributions count from GitHub Contributions API
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/SandaAbhishekSagar?y=last`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.contributions) {
            // Calculate total contributions from all weeks
            const totalContributions = data.contributions.reduce((sum, week) => {
              return (
                sum +
                week.days.reduce((daySum, day) => {
                  return daySum + (day.count || 0);
                }, 0)
              );
            }, 0);
            setContributions(totalContributions);
          }
        }
      } catch (error) {
        console.log("Using default contribution count:", error);
        // Keep default 537 if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <Col md={12}>
        <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
          Days I <strong className="purple">Code</strong>
        </h1>
        {!loading && (
          <p
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "1.2em",
              paddingBottom: "25px",
              margin: 0,
            }}
          >
            <span className="purple" style={{ fontWeight: "bold" }}>
              {contributions}
            </span>{" "}
            contributions in the last year
          </p>
        )}
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <GitHubCalendar
            username="SandaAbhishekSagar"
            blockSize={15}
            blockMargin={5}
            color="#c084f5"
            fontSize={16}
          />
        </div>
      </Col>
    </Row>
  );
}

export default Github;
