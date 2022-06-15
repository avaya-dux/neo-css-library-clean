import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Buttons, Select, Table } from "../components";

import "./App.css";
import "css-library/dist/neo.css";

export const App = () => {
  const [dir, setDir] = useState<"ltr" | "rtl" | "auto">("auto");

  return (
    <main className="app" dir={dir}>
      <h1>CSS Staging</h1>

      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/table">Table</Link>
        <Link to="/buttons">Buttons</Link>
        <Link to="/select">Select</Link>
      </nav>

      <section>
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
      </section>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="table" element={<Table />} />
          <Route path="buttons" element={<Buttons />} />
          <Route path="select" element={<Select />} />
        </Routes>
      </div>
    </main>
  );
};

const Home = () => {
  return (
    <div>
      <h2>Home</h2>

      <p>
        This repository is meant to facilitate local development work on the Neo
        CSS library, as well as provide a way to do visual diff testing when
        changes are made. It is a work in progress and is meant to be iterated
        on and improved.
      </p>
    </div>
  );
};
