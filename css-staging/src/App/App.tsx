import { useState } from "react";

import { Table } from "../components";

import "./App.css";
import "css-library/dist/neo.css";

export const App = () => {
  const [dir, setDir] = useState<"ltr" | "rtl" | "auto">("auto");

  return (
    <div className="app" dir={dir}>
      <h1>CSS Staging</h1>

      <div>
        <div>
          Current root <code>dir={dir}</code>
        </div>

        <button onClick={() => setDir("ltr")} disabled={dir === "ltr"}>
          ltr
        </button>
        <button onClick={() => setDir("rtl")} disabled={dir === "rtl"}>
          rtl
        </button>
        <button onClick={() => setDir("auto")} disabled={dir === "auto"}>
          auto
        </button>
      </div>

      <div>
        <h2>Table</h2>

        <Table />
      </div>
    </div>
  );
};
