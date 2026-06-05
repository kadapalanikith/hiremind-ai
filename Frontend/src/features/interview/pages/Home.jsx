import React, { useState, useRef, useEffect } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate, Link } from "react-router";

/* ── Icon helpers ── */
const BrainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.99-3 2.5 2.5 0 0 1-1.45-4.5A2.5 2.5 0 0 1 4.5 7 2.5 2.5 0 0 1 7 4.5 2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.99-3 2.5 2.5 0 0 0 1.45-4.5A2.5 2.5 0 0 0 19.5 7 2.5 2.5 0 0 0 17 4.5 2.5 2.5 0 0 0 14.5 2z"/>
  </svg>
);

const FileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const UploadIcon = () => (
  <svg className="upload-icon" width="30" height="30" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const SelfIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const SparkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const HistoryIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const Home = () => {
  const { loading, generateReport, getReports, reports } = useInterview();
  const { user, handleLogout } = useAuth();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [formError, setFormError] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  // Load previous reports on mount
  useEffect(() => {
    getReports();
  }, [getReports]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setFormError("Only PDF files are accepted.");
        e.target.value = "";
        setFileName("");
        return;
      }
      setFileName(file.name);
      setFormError("");
    } else {
      setFileName("");
    }
  };

  const handleGenerateReport = async () => {
    setFormError("");

    const resumeFile = resumeInputRef.current?.files[0];

    // Validate required fields
    if (!resumeFile) {
      setFormError("Please upload your resume PDF.");
      return;
    }
    if (!jobDescription.trim()) {
      setFormError("Please paste the job description.");
      return;
    }

    try {
      const data = await generateReport({ jobDescription, selfDescription, resumeFile });
      if (data?._id) {
        navigate(`/interview/${data._id}`);
      }
    } catch {
      // Error is already shown via toast in useInterview
    }
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loading-icon"><BrainIcon /></div>
        <h1>Crafting your report…</h1>
        <p>Our AI is analyzing your profile and the role</p>
        <div className="loading-bar" />
      </main>
    );
  }

  return (
    <div className="home">
      {/* ── Sticky Navbar ── */}
      <nav className="home-nav" role="navigation" aria-label="Main navigation">
        <Link to="/" className="nav-brand" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div className="nav-brand-icon"><BrainIcon /></div>
          <span className="nav-brand-name">HireMind AI</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="nav-label">Welcome, {user?.username}</span>
          <button
            id="logout-btn"
            className="nav-logout-btn"
            onClick={handleLogoutClick}
            aria-label="Logout"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="home-hero">
        <div className="hero-chip insight-chip">✦ Powered by Generative AI</div>
        <h1>
          Land the role you<br />
          <span className="hero-gradient">deserve.</span>
        </h1>
        <p className="hero-sub">
          Paste a job description, upload your résumé, and HireMind AI produces
          a hyper-personalized interview preparation report in seconds.
        </p>
      </header>

      {/* ── Input Section ── */}
      <section className="home-input-section" aria-label="Prepare your interview profile">
        {/* Form error */}
        {formError && (
          <div className="form-error-banner" role="alert">
            ⚠️ {formError}
          </div>
        )}

        <div className="interview-input-group">
          {/* Left — Job Description */}
          <div className="panel-card">
            <div className="panel-header">
              <h2>
                <span className="panel-icon"><FileIcon /></span>
                Job Description
              </h2>
              <p>Paste the target role's requirements below.</p>
            </div>
            <textarea
              id="jobDescription"
              name="jobDescription"
              className="panel-textarea"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here. Include required skills, responsibilities, and qualifications for the most accurate AI analysis…"
              aria-label="Job description input"
            />
          </div>

          {/* Right — Resume + Self Description + Submit */}
          <div className="right-panel">
            {/* Resume Upload */}
            <div className="right-card">
              <span className="right-card-label">
                Your Résumé <small>PDF only</small>
              </span>
              <label className="file-upload-label" htmlFor="resume" aria-label="Upload résumé file">
                <div className={`file-upload-zone ${fileName ? "has-file" : ""}`}>
                  <UploadIcon />
                  <span className={`upload-text ${fileName ? "active" : ""}`}>
                    {fileName || "Drag & drop or click to upload"}
                  </span>
                  {fileName && <span className="upload-subtext">PDF ready</span>}
                </div>
                <input
                  ref={resumeInputRef}
                  className="file-upload-input"
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Self Description */}
            <div className="right-card">
              <span className="right-card-label">
                <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <SelfIcon /> Self Description <small>(optional)</small>
                </span>
              </span>
              <textarea
                id="selfDescription"
                name="selfDescription"
                className="right-textarea"
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Key skills, achievements, or anything specific you'd like the AI to focus on…"
                aria-label="Self description input"
              />
            </div>

            {/* Submit */}
            <div className="submit-card">
              <p className="submit-hint">
                <strong>Ready?</strong> Your personalized report will be generated in under 30 seconds.
              </p>
              <button
                id="generate-report-btn"
                className="button primary btn-generate"
                onClick={handleGenerateReport}
                disabled={loading}
                aria-label="Generate interview profile report"
              >
                <SparkIcon />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* ── Past Reports ── */}
        {reports.length > 0 && (
          <div className="past-reports-section">
            <h2 className="past-reports-title">
              <HistoryIcon /> Past Reports
            </h2>
            <div className="past-reports-grid">
              {reports.map((r) => (
                <button
                  key={r._id}
                  className="past-report-card"
                  onClick={() => navigate(`/interview/${r._id}`)}
                  aria-label={`View report: ${r.title || "Untitled Position"}`}
                >
                  <div className="prc-title">{r.title || "Untitled Position"}</div>
                  <div className="prc-meta">{new Date(r.createdAt).toLocaleDateString()}</div>
                  <span className={`prc-score ${(r.matchScore >= 80) ? "high" : r.matchScore >= 60 ? "medium" : "low"}`}>
                    {r.matchScore}% match
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
