import React, { useState } from "react";

function App() {
  const [resume, setResume] = useState(null);
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => setResume(e.target.files[0]);
  const handleInterestsChange = (e) => setInterests(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("interests", interests);

    try {
      const res = await fetch("http://localhost:3001/api/counselor/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) setResult(data.result);
      else setError(data.error || "Something went wrong.");
    } catch (err) {
      setError("Failed to connect to backend.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: 32, maxWidth: 420, width: "100%" }}>
        <h1 style={{ fontSize: 28, color: "#2d3a4a", marginBottom: 8, textAlign: "center" }}>AI Career Counselor</h1>
        <p style={{ color: "#5a6b7b", marginBottom: 24, textAlign: "center" }}>
          Upload your resume and enter your interests to get personalized career guidance.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Resume (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Your Interests</label>
            <textarea
              value={interests}
              onChange={handleInterestsChange}
              rows={3}
              placeholder="e.g. Data Science, AI, Marketing..."
              required
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #d1d5db" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#4f46e5",
              color: "#fff",
              fontWeight: 600,
              padding: "10px 0",
              borderRadius: 6,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Analyzing..." : "Get Career Guidance"}
          </button>
        </form>
        {error && <div style={{ marginTop: 16, color: "#d32f2f", textAlign: "center" }}>{error}</div>}
        {result && (
          <div style={{ marginTop: 24, background: "#eef2ff", borderRadius: 8, padding: 16, color: "#2d3a4a" }}>
            <h2 style={{ fontWeight: 700, marginBottom: 8 }}>Your Personalized Guidance:</h2>
            <div style={{ whiteSpace: "pre-line" }}>{result}</div>
          </div>
        )}
      </div>
      <footer style={{ marginTop: 32, color: "#b0b8c1", fontSize: 14 }}>Powered by LLaMA3, Hugging Face &amp; LangChain</footer>
    </div>
  );
}

export default App;