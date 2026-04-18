import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const BrainIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.99-3 2.5 2.5 0 0 1-1.45-4.5A2.5 2.5 0 0 1 4.5 7 2.5 2.5 0 0 1 7 4.5 2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.99-3 2.5 2.5 0 0 0 1.45-4.5A2.5 2.5 0 0 0 19.5 7 2.5 2.5 0 0 0 17 4.5 2.5 2.5 0 0 0 14.5 2z"/>
  </svg>
);

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loading-icon"><BrainIcon /></div>
        <h1>Creating your account…</h1>
        <p>Setting up your workspace</p>
        <div className="loading-bar" />
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
          <div className="brand-icon"><BrainIcon /></div>
          <span className="brand-name">HireMind AI</span>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h1>Create account</h1>
          <p>Join thousands of professionals landing their dream roles.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <div className="input-group">
            <label htmlFor="reg-username">Username</label>
            <input
              id="reg-username"
              type="text"
              name="username"
              placeholder="e.g. alex_chen"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-email">Email address</label>
            <input
              id="reg-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              name="password"
              placeholder="Minimum 8 characters"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button id="register-submit" type="submit" className="button primary auth-submit">
            Get started
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?&nbsp;<Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
