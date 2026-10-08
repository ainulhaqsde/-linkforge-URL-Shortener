import { useState } from "react";
import api from "../api";
import UrlForm from "../components/UrlForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import ResultCard from "../components/ResultCard";
export default function Home(){
 const [loading,setLoading]=useState(false),[error,setError]=useState(""),[result,setResult]=useState(null);
 async function handleShorten(payload){try{setLoading(true);setError("");setResult(null);const response=await api.post("/api/shorten",payload);setResult(response.data);}catch(err){setError(err.response?.data?.message||"Failed to shorten URL. Please try again.");}finally{setLoading(false)}}
 return <div className="container"><section className="hero"><div className="eyebrow"><span className="status-dot"/> DISTRIBUTED LINK MANAGEMENT</div><h1>Make every link <span>count.</span></h1><p>Turn long URLs into memorable short links. Customize, share, and measure every click with a modern distributed platform.</p><div className="hero-pills"><span>✦ Custom aliases</span><span>◷ Expiring links</span><span>▥ QR codes</span><span>↗ Click analytics</span></div></section><div className="workspace"><div className="workspace-title"><span className="section-icon">↗</span><div><h2>Create a short link</h2><p>Paste a destination and personalize your link in seconds.</p></div></div><UrlForm onSubmit={handleShorten} loading={loading}/>{loading&&<Loader/>}{error&&<ErrorMessage message={error}/ >}{result&&<ResultCard result={result}/>}</div><div className="feature-strip"><div><strong>01</strong><b>Create</b><span>Generate a memorable short link</span></div><div><strong>02</strong><b>Share</b><span>Copy your URL or use its QR code</span></div><div><strong>03</strong><b>Measure</b><span>Explore visits with link analytics</span></div></div><p className="creator-line">Designed & enhanced by <strong>Ainul Haq</strong> <span>✦</span> Powered by React, Node.js, Redis & PostgreSQL</p></div>
}
