import React, { use, useState, useRef } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import {useNavigate} from "react-router";


const Home = () => {
  const { loading, generateReport } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  const [fileName, setFileName] = useState("");

  const handleGenerateReport = async () => { 
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({ jobDescription, selfDescription, resumeFile });

    navigate(`/interview/${data._id}`)

  }

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>
          Loading your interview plan
        </h1>

      </main>
    )
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  return (
    <div className="home">
      <div className="interview-input-group">
        {/* Left Side: Job Description */}
        <div className="left glass-panel">
          <h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--accent-cyan)" }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Job Description
          </h2>
          <textarea
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
            name="jobDescription"
            id="jobDescription"
            placeholder="Paste the target job description here. Our AI will analyze the requirements to tailor your interview experience..."
          ></textarea>
        </div>

        {/* Right Side: Resume & Self Description */}
        <div className="right glass-panel">
          <div className="input-group">
            <p>
              Your Resume <small>PDF or DOCX</small>
            </p>
            <label className="file-upload-wrapper" htmlFor="resume">
              <input
                ref={resumeInputRef}
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
              />
              <div className="upload-content">
                <svg
                  className="upload-icon"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span>{fileName || "Drag & drop or Click to Upload"}</span>
              </div>
            </label>
          </div>

          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea
              onChange={(e) => {
                setSelfDescription(e.target.value);
              }}
              id="selfDescription"
              name="selfDescription"
              placeholder="Tell us about yourself. Add key skills, experience, or any specific areas you want the AI to focus on..."
            />
          </div>

          <div className="submit-section">
            <button onClick={handleGenerateReport} className="button primary">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                Generate Interview Profile
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
