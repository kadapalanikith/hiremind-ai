import React, { useEffect, useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useParams, useNavigate } from "react-router";

/* ── Icon helpers ── */
const BrainIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.99-3 2.5 2.5 0 0 1-1.45-4.5A2.5 2.5 0 0 1 4.5 7 2.5 2.5 0 0 1 7 4.5 2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.99-3 2.5 2.5 0 0 0 1.45-4.5A2.5 2.5 0 0 0 19.5 7 2.5 2.5 0 0 0 17 4.5 2.5 2.5 0 0 0 14.5 2z"/>
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const GapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const PlanIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
    <polyline points="13 2 13 9 20 9"/>
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const SparkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const RecentIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────── */

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const { report, reports, getReportById, getReports, getResumePdf, loading } = useInterview();
  const { interviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  useEffect(() => {
    getReports();
  }, []);

  if (loading || !report) {
    return (
      <main className="loading-screen">
        <div className="loading-icon"><BrainIcon /></div>
        <h1>Loading your report…</h1>
        <p>Pulling together your interview analysis</p>
        <div className="loading-bar" />
      </main>
    );
  }

  const questions =
    activeTab === "technical"
      ? report.technicalQuestions ?? []
      : report.behavioralQuestions ?? [];

  const ratingClass = (rating = "") => rating.toLowerCase();

  /* Plan progress: show step X / total */
  const planTotal  = report.preparationPlan?.length ?? 1;
  const planFill   = `${Math.round((1 / planTotal) * 100)}%`;

  const handleDownload = () => getResumePdf(interviewId);

  return (
    <div className="interview-dashboard">
      {/* ── Navbar ── */}
      <nav className="dash-nav" role="navigation" aria-label="Dashboard navigation">
        <div className="nav-brand">
          <div className="nav-brand-icon"><BrainIcon /></div>
          <span className="nav-brand-name">HireMind AI</span>
        </div>
        <div className="nav-right">
          <button
            id="nav-back-btn"
            className="nav-back-btn"
            onClick={() => navigate("/")}
            aria-label="Return to home"
          >
            <ArrowLeft /> New analysis
          </button>
          <button
            id="nav-download-btn"
            className="button primary"
            style={{ padding: "0.625rem 1.375rem", fontSize: "0.9375rem" }}
            onClick={handleDownload}
            aria-label="Download AI generated resume"
          >
            <DownloadIcon /> Download Résumé
          </button>
        </div>
      </nav>

      <div className="dash-content">
        {/* ── Header ── */}
        <header className="dash-header">
          <div className="dash-header-text">
            <div className="dash-chip insight-chip">✦ AI Interview Analysis</div>
            <h1>Your Profile Report</h1>
            <p>
              Comprehensive breakdown of your fit, skill gaps, and a
              step-by-step preparation roadmap.
            </p>
          </div>

          {/* Floating glass score ring */}
          <div className="score-ring-wrapper" aria-label={`Match score: ${report.matchScore}%`}>
            <svg className="score-ring" viewBox="0 0 36 36">
              <path
                className="ring-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="ring-fill"
                strokeDasharray={`${report.matchScore}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="19" className="ring-pct">{report.matchScore}%</text>
            </svg>
            <span className="score-label">Match Score</span>
          </div>
        </header>

        {/* ── Dashboard Grid ── */}
        <div className="dash-grid">
          {/* ─ Side Panel ─ */}
          <aside className="side-panel" aria-label="Side panel">

            {/* Skill Gaps */}
            <div className="panel-card">
              <h3 className="panel-card-title">
                <span className="card-title-icon"><GapIcon /></span>
                Skill Gaps
              </h3>
              <div className="gap-tags" role="list" aria-label="Identified skill gaps">
                {(report.skillGaps ?? []).map((gap, i) => (
                  <span key={i} className="gap-tag" role="listitem">{gap}</span>
                ))}
              </div>
            </div>

            {/* Preparation Plan */}
            <div className="panel-card">
              <h3 className="panel-card-title">
                <span className="card-title-icon"><PlanIcon /></span>
                Preparation Plan
              </h3>

              {/* Single fluid progress track — no segments */}
              <div className="plan-progress-bar" aria-label="Plan progress track">
                <div
                  className="plan-progress-fill"
                  style={{ width: `${Math.min(report.matchScore, 100)}%` }}
                />
              </div>

              <div className="prep-timeline">
                {(report.preparationPlan ?? []).map((step, i) => (
                  <div
                    key={i}
                    className="timeline-item"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <div className="step-bubble">{step.step ?? i + 1}</div>
                    <div className="step-body">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            {reports.length > 1 && (
              <div className="panel-card recent-reports-card">
                <h3 className="panel-card-title">
                  <span className="card-title-icon"><RecentIcon /></span>
                  Recent Reports
                </h3>
                <ul className="report-list" aria-label="Recent interview reports">
                  {reports.map((r) => (
                    <li
                      key={r._id}
                      className="report-list-item"
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(`/interview/${r._id}`)}
                      onKeyDown={(e) => e.key === "Enter" && navigate(`/interview/${r._id}`)}
                      aria-label={`View report: ${r.title || "Untitled Position"}`}
                    >
                      <h4>{r.title || "Untitled Position"}</h4>
                      <p className="report-meta">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                      <span
                        className={`report-score ${
                          r.matchScore >= 80 ? "high" : "low"
                        }`}
                      >
                        {r.matchScore}% match
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* ─ Main Panel ─ */}
          <main className="main-panel" aria-label="Interview questions">
            {/* Tab Bar */}
            <div className="tab-bar" role="tablist" aria-label="Question categories">
              {["technical", "behavioral"].map((tab) => (
                <button
                  key={tab}
                  id={`tab-${tab}`}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "technical" ? "Technical Questions" : "Behavioral Questions"}
                </button>
              ))}
            </div>

            {/* Questions */}
            <div className="questions-list" role="tabpanel">
              {questions.map((item, index) => (
                <article
                  key={item.id ?? index}
                  id={`question-${index + 1}`}
                  className="question-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {/* Header */}
                  <div className="q-header">
                    <h3 className="q-title">
                      <span className="q-num">Q{item.id ?? index + 1}.</span>
                      {item.question}
                    </h3>
                    <span
                      className={`q-rating-chip ${ratingClass(item.rating)}`}
                      aria-label={`Rating: ${item.rating}, score ${item.score}/100`}
                    >
                      {item.rating} · {item.score}/100
                    </span>
                  </div>

                  {/* Answer blocks */}
                  <div className="q-body">
                    <div className="answer-block candidate">
                      <div className="block-label">
                        <UserIcon /> Your Answer
                      </div>
                      <p>{item.candidateAnswer}</p>
                    </div>
                    <div className="answer-block ideal">
                      <div className="block-label">
                        <CheckIcon /> Ideal Answer
                      </div>
                      <p>{item.idealAnswer}</p>
                    </div>
                  </div>

                  {/* AI Feedback — Insight chip style */}
                  <div className="feedback-block">
                    <div className="feedback-label">
                      <SparkIcon /> AI Feedback &amp; Improvements
                    </div>
                    <p>{item.feedback}</p>
                  </div>

                  {/* Per-card download */}
                  <div className="download-row">
                    <button
                      id={`download-resume-${index + 1}`}
                      className="button secondary"
                      style={{ padding: "0.625rem 1.375rem", fontSize: "0.9375rem", marginTop: "0.5rem" }}
                      onClick={handleDownload}
                      aria-label="Download AI generated resume"
                    >
                      <DownloadIcon /> Download AI Résumé
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Interview;
