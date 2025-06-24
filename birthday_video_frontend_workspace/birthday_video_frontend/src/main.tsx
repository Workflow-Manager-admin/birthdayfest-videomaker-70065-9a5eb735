// All browser-specific code inside a function that's called only in browser context.
/* eslint-disable no-undef */
function browserMain() {
  const React = require("react");
  const { createRoot } = require("react-dom/client");
  const { App } = require("./App");

  const cdnId = "twcdn";
  if (!document.getElementById(cdnId)) {
    const tag = document.createElement("link");
    tag.id = cdnId;
    tag.rel = "stylesheet";
    tag.href = "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css";
    document.head.appendChild(tag);
  }

  let container = document.getElementById("root");
  if (!container) {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
  }
  const root = createRoot(container);
  root.render(React.createElement(App));
}
/* eslint-enable no-undef */

browserMain();

export {};
