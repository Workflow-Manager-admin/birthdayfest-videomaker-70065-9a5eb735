// Entrypoint for both Remotion renderer and SPA web preview

import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

// In Remotion Studio, register composition.
registerRoot(RemotionRoot);

// Remotion Studio entry always runs this file.
// Dynamically load browser SPA code only if running in the browser root page.
// Delay all browser-only imports to inside a function invoked ONLY in browser
import { isBrowser } from "./isBrowser";

function loadIfBrowser() {
  if (
    isBrowser &&
    typeof location !== "undefined" &&
    location.pathname === "/"
  ) {
    import("./main");
  }
}

loadIfBrowser();
