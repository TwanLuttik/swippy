import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { useSimple } from "simple-core-state";
import { core } from "./core";

function App() {
  const url = useSimple(core.url);

  return (
    <div className="container">
      <input
        onChange={(e) => core.url.set(e.currentTarget.value)}
        value={url}
      />
      <p>{url}</p>
    </div>
  );
}

export default App;
