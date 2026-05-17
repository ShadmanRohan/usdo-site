import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import USDOHomepage from "./USDOHomepage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <USDOHomepage />
  </StrictMode>
);
