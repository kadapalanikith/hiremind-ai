import React from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const BrainIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.99-3 2.5 2.5 0 0 1-1.45-4.5A2.5 2.5 0 0 1 4.5 7 2.5 2.5 0 0 1 7 4.5 2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.99-3 2.5 2.5 0 0 0 1.45-4.5A2.5 2.5 0 0 0 19.5 7 2.5 2.5 0 0 0 17 4.5 2.5 2.5 0 0 0 14.5 2z"/>
  </svg>
);

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loading-icon"><BrainIcon /></div>
        <h1>Signing you in…</h1>
        <p>Preparing your workspace</p>
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
          <h1>Welcome back</h1>
          <p>Sign in to continue your interview preparation.</p>
        </div>

        {/* Form — push down with 2rem whitespace instead of a divider */}
        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <div className="input-group">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button id="login-submit" type="submit" className="button primary auth-submit">
            Sign in
          </button>
        </form>

        <p className="auth-footer">
          No account yet?&nbsp;<Link to="/register">Create one</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
