import React from "react";
import ReactDOM from "react-dom";

const WIDGET_SRC =
  process.env.REACT_APP_WIDGET_URL ||
  "http://localhost:3000/widget/349f80ab-a156-4de7-9141-2c6a1e373bcb";

const widgetContainerStyle = {
  position: "fixed",
  bottom: "24px",
  right: "24px",
      width="400"
      height="500"
      frameBorder="0"
  width: "420px",
  height: "700px",
  zIndex: 2147483647,
  visibility: "visible",
  pointerEvents: "auto",
  border: "3px solid #c770f0",
  borderRadius: "12px",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(199, 112, 240, 0.3)",
  overflow: "hidden",
};

const iframeStyle = {
  width: "100%",
  height: "100%",
  border: "none",
  display: "block",
  borderRadius: "9px",
};

function WidgetButton() {
  if (typeof document === "undefined") return null;
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const mountEl = document.getElementById("widget-root") || document.body;
  if (!mountEl) return null;

  return ReactDOM.createPortal(
    <div
      id="supportcopilot-widget-container"
      style={widgetContainerStyle}
      aria-label="Virtual Assistant widget"
    >
      <iframe
        id="supportcopilot-widget"
export default WidgetButton;

        src={WIDGET_SRC}
        title="Virtual Assistant"
        style={iframeStyle}
      />
    </div>,
    mountEl
  );
}

export default WidgetButton;
