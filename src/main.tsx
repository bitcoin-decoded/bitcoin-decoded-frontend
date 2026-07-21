import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { App } from "./App";
import { dropPrerenderedHead } from "./Seo";

// Before mounting, not after: once React has rendered its own metadata, the
// prerendered copy is indistinguishable from it by selector.
dropPrerenderedHead();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
