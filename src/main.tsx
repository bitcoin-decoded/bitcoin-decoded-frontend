import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { App } from "./App";
import { dropPrerenderedHead } from "./Seo";

// Before mounting: afterwards React's own metadata is indistinguishable from
// the prerendered copy and both would survive.
dropPrerenderedHead();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
