import React, { useState } from "react";
import { MdSupportAgent } from "react-icons/md";

/**
 * SupportCopilot AI Virtual Assistant widget.
 * Shows a small launcher button; clicking opens the widget panel (no full-page black rectangle by default).
 */
const DEFAULT_WIDGET_URL =
  "https://supportcopilot-web-production.up.railway.app/widget/e7cbf11e-6668-4fd4-a751-fba67b899bcc";

function SupportCopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetUrl =
    process.env.REACT_APP_SUPPORTCOPILOT_URL?.trim() || DEFAULT_WIDGET_URL;

  return (
    <>
      <button
        type="button"
        className="supportcopilot-launcher"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close Virtual Assistant" : "Open Virtual Assistant"}
        aria-expanded={isOpen}
      >
        <MdSupportAgent size={24} />
        <span className="supportcopilot-launcher-label">Virtual Assistant</span>
      </button>

      {isOpen && (
        <div
          className="supportcopilot-widget supportcopilot-widget-panel"
          id="supportcopilot-widget-container"
          aria-label="Virtual Assistant widget"
        >
          <button
            type="button"
            className="supportcopilot-widget-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close widget"
          >
            ×
          </button>
          <iframe
            id="supportcopilot-widget"
            src={widgetUrl}
            title="Virtual Assistant"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              borderRadius: "inherit",
            }}
          />
        </div>
      )}
    </>
  );
}

export default SupportCopilotWidget;
