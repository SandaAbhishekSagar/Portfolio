import React from "react";

/**
 * SupportCopilot AI Virtual Assistant widget.
 * Renders a fixed iframe; URL is configurable via REACT_APP_SUPPORTCOPILOT_URL.
 * Responsive: desktop 420×700 floating panel; mobile (<640px) full-screen.
 */
const DEFAULT_WIDGET_URL =
  "https://supportcopilot-web-production.up.railway.app/widget/e7cbf11e-6668-4fd4-a751-fba67b899bcc";

function SupportCopilotWidget() {
  const widgetUrl =
    process.env.REACT_APP_SUPPORTCOPILOT_URL?.trim() || DEFAULT_WIDGET_URL;

  return (
    <div
      className="supportcopilot-widget"
      id="supportcopilot-widget-container"
      aria-label="Virtual Assistant widget"
    >
      <iframe
        id="supportcopilot-widget"
        src={widgetUrl}
        title="Virtual Assistant"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}

export default SupportCopilotWidget;
