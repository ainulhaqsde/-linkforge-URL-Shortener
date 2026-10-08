import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
export default function App() {
  return <div className="app"><Navbar/><main><Routes><Route path="/" element={<Home/>}/><Route path="/analytics/:shortCode" element={<Analytics/>}/></Routes></main><footer className="site-footer"><span>© {new Date().getFullYear()} Ainul Haq · Original enhancements and UI. Third-party rights reserved.</span><span>Designed &amp; maintained by Ainul Haq</span></footer></div>;
}
