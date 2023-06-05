import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles.css";
import { ModalWrapper } from "./components";
import { initialAppRun } from "./core";

initialAppRun();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ModalWrapper>
      <App />
    </ModalWrapper>
  </React.StrictMode>
);
