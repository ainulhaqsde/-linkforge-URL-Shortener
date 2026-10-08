import { Link } from "react-router-dom";
export default function Navbar() {
  return <header className="site-header"><div className="header-inner"><Link to="/" className="brand" aria-label="LinkForge home"><span className="brand-mark">↗</span><span>link<span className="brand-accent">forge</span><small>by Ainul Haq</small></span></Link><nav className="top-nav" aria-label="Main navigation"><Link to="/">Shorten URL</Link></nav></div></header>;
}
