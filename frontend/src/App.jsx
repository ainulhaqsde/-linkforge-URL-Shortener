
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/analytics/:shortCode"
            element={<Analytics />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()} LinkForge. All rights reserved.
        </span>

        <span>
          Designed &amp; Developed by Ainul Haq
        </span>
      </footer>
    </div>
  );
}
