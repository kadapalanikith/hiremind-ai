import React, { useEffect, useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { Navigate, useParams } from "react-router";
import { generateResumePdf } from "../services/interview.api";

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const { reports, getReportById, loading } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="loadind-screan">
        <h1>Loading you interviewplan...</h1>
      </main>
    );
  }

  return (
    <div className="interview-dashboard">
      <div className="dashboard-header-premium">
        <div className="header-text">
          <h1>AI Interview Analysis</h1>
          <p>
            Comprehensive breakdown of your performance, gaps, and next steps.
          </p>
        </div>
        <div className="score-container">
          <div className="circular-score">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${report.matchScore}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">
                {report.matchScore}%
              </text>
            </svg>
          </div>
          <div className="score-label">Match Score</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="side-panel">
          <div className="panel-card skill-gaps-card">
            <h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Identified Skill Gaps
            </h3>
            <div className="tags-container">
              {report.skillGaps.map((gap, i) => (
                <span key={i} className="gap-tag">
                  {gap}
                </span>
              ))}
            </div>
          </div>

          <div className="panel-card prep-plan-card">
            <h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
              Preparation Plan
            </h3>
            <div className="timeline">
              {report.preparationPlan.map((step, i) => (
                <div key={i} className="timeline-item">
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="main-panel">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "technical" ? "active" : ""}`}
              onClick={() => setActiveTab("technical")}
            >
              Technical Questions
            </button>
            <button
              className={`tab-btn ${activeTab === "behavioral" ? "active" : ""}`}
              onClick={() => setActiveTab("behavioral")}
            >
              Behavioral Questions
            </button>
          </div>

          <div className="questions-container">
            {(activeTab === "technical"
              ? report.technicalQuestions
              : report.behavioralQuestions
            ).map((item, index) => (
              <div
                key={item.id}
                className="question-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="q-header">
                  <h3>
                    <span className="q-number">Q{item.id}.</span>
                    {item.question}
                  </h3>
                  <span className={`rating ${item.rating.toLowerCase()}`}>
                    {item.rating} ({item.score}/100)
                  </span>
                </div>

                <div className="q-content">
                  <div className="content-block candidate">
                    <h4>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Your Answer
                    </h4>
                    <p>{item.candidateAnswer}</p>
                  </div>

                  <div className="content-block ideal">
                    <h4>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Ideal Answer
                    </h4>
                    <p>{item.idealAnswer}</p>
                  </div>
                </div>
                {/* Recent Reports List*/}
                {reports.length > 0 && (
                  <div className="recent-reports">
                    <h2>My Recent Reports</h2>
                    <ul className="reports-list">
                      {reports.map((report) => (
                        <li key={reports.id} className="" onClick={() => navigate(`/interview/${reports.id}`)}>
                          <h3>{reports.title || 'untitled Position'}</h3>
                          <p className="report-meta">Generated on{ new Date(reports.createdAt).toLocaleDateString()}</p>
                          <p className={`match-score ${report.matchScore >= 80 ? 'High' : 'Low'}`}>{`Match Score: ${report.matchScore}%`}</p>
                        </li>
                      ))}
                    </ul>
                  </div> 
                )
                }

                <div className="feedback-section">
                  <h4>AI Feedback & Improvements</h4>
                  <p>{item.feedback}</p>
                  <button className="button-primary button" onClick={()=>{getResumePdf(interviewId)}}>
                    Download AI Generated Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
