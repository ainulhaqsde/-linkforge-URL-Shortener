import { Link } from "react-router-dom";
import { useState } from "react";
export default function ResultCard({result}) {
 const [copied,setCopied]=useState(false);
 async function copy(){try{await navigator.clipboard.writeText(result.short_url);setCopied(true);setTimeout(()=>setCopied(false),2000);}catch{setCopied(false);}}
 return <section className="card result-card" aria-live="polite"><h2>✓ Your link is ready</h2><a className="result-url" href={result.short_url} target="_blank" rel="noopener noreferrer">{result.short_url}</a><div className="result-actions"><button className="button" onClick={copy}>{copied?"Copied!":"Copy link"}</button><Link className="analytics-link" to={`/analytics/${result.short_code}`}>View analytics →</Link></div><img className="qr" alt="QR code for short link" src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(result.short_url)}`}/><small>QR preview uses an external service; avoid sensitive URLs.</small></section>;
}
