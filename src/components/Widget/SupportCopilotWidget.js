import React, { useState, useEffect } from "react";
import { MdSupportAgent } from "react-icons/md";

/**
 * SupportCopilot AI Virtual Assistant — chat only (no built-in launcher).
 * Uses ?embed=1 so the iframe shows only the chat panel; our button toggles visibility.
 * Listens for postMessage "supportcopilot-close" to hide the panel when user closes inside the widget.
 */
const DEFAULT_WIDGET_URL =
  "https://supportcopilot-web-production.up.railway.app/widget/e7cbf11e-6668-4fd4-a751-fba67b899bcc";

function ensureEmbedUrl(url) {
  if (!url || typeof url !== "string") return `${DEFAULT_WIDGET_URL}?embed=1`;
  const base = url.trim().split("?")[0];
  const params = new URLSearchParams(url.trim().split("?")[1] || "");
  if (!params.has("embed") && !params.has("panelOnly")) params.set("embed", "1");
  const qs = params.toString();
  return qs ? `${base}?${qs}` : `${base}?embed=1`;
}

function SupportCopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const baseUrl =
    process.env.REACT_APP_SUPPORTCOPILOT_URL?.trim() || DEFAULT_WIDGET_URL;
  const widgetUrl = ensureEmbedUrl(baseUrl);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === "supportcopilot-close") setIsOpen(false);
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <button
        type="button"
        className="supportcopilot-launcher"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Chat with us"}
        aria-expanded={isOpen}
      >
        <MdSupportAgent size={24} />
        <span className="supportcopilot-launcher-label">Chat with us</span>
      </button>

      {isOpen && (
        <div
          className="supportcopilot-widget supportcopilot-widget-panel"
          id="supportcopilot-widget-container"
          aria-label="Virtual Assistant"
        >
          <button
            type="button"
            className="supportcopilot-widget-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            ×
          </button>
          <iframe
            id="supportcopilot-embed"
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
