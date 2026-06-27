import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import "./landing.scss";

/* ── Icon Components ── */
const BrainIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.99-3 2.5 2.5 0 0 1-1.45-4.5A2.5 2.5 0 0 1 4.5 7 2.5 2.5 0 0 1 7 4.5 2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.99-3 2.5 2.5 0 0 0 1.45-4.5A2.5 2.5 0 0 0 19.5 7 2.5 2.5 0 0 0 17 4.5 2.5 2.5 0 0 0 14.5 2z"/>
  </svg>
);

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const MessageSquareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ── Data ── */
const features = [
  {
    icon: <TargetIcon />,
    title: "Resume Match Scoring",
    description: "AI scores your resume against the job description on a 0–100 scale, revealing exactly how aligned you are before the interview.",
    color: "primary",
  },
  {
    icon: <MessageSquareIcon />,
    title: "Interview Q&A Generation",
    description: "Get role-specific technical and behavioral questions with detailed guidance on how to answer each one effectively.",
    color: "secondary",
  },
  {
    icon: <TrendingUpIcon />,
    title: "Skill Gap Analysis",
    description: "Discover exactly which skills you're missing and how critical each gap is, so you can focus your prep time where it matters.",
    color: "tertiary",
  },
  {
    icon: <CalendarIcon />,
    title: "Day-by-Day Prep Plan",
    description: "Receive a personalized study roadmap tailored to your specific gaps, with concrete daily tasks to build competence fast.",
    color: "primary",
  },
  {
    icon: <FileTextIcon />,
    title: "AI Resume Builder",
    description: "TalentMind AI rewrites and polishes your resume to match the target role, then generates a downloadable PDF.",
    color: "secondary",
  },
  {
    icon: <ZapIcon />,
    title: "Instant Analysis",
    description: "Upload your resume, paste the job description, and receive a complete interview readiness report in under 30 seconds.",
    color: "tertiary",
  },
];

const steps = [
  { num: "01", title: "Upload Your Resume", desc: "Drop your PDF resume into TalentMind AI. Our parser extracts every detail." },
  { num: "02", title: "Paste Job Description", desc: "Copy the target role's requirements. The more detail, the more precise your report." },
  { num: "03", title: "AI Analyzes Everything", desc: "Gemini AI cross-references your profile against the role across dozens of dimensions." },
  { num: "04", title: "Get Your Report", desc: "Receive a full dashboard: match score, interview questions, gaps, and a prep plan." },
];

const testimonials = [
  {
    quote: "I uploaded my resume and the job description at 11pm. By midnight I had a complete interview plan. Got the offer.",
    author: "Priya S.",
    role: "Software Engineer @ Stripe",
    score: 91,
  },
  {
    quote: "The behavioral questions it generated were exactly what I was asked in the interview. It's uncanny.",
    author: "Marcus W.",
    role: "Product Manager @ Google",
    score: 87,
  },
  {
    quote: "Finally a tool that doesn't give generic advice. Every question was specific to the company and role I applied for.",
    author: "Anika R.",
    role: "Data Scientist @ Anthropic",
    score: 94,
  },
];

const faqs = [
  {
    q: "What file types are supported for resume upload?",
    a: "TalentMind AI accepts PDF files. Make sure your resume is a text-based PDF (not a scanned image) for best results."
  },
  {
    q: "How accurate is the match score?",
    a: "The match score uses Google Gemini AI to analyze keyword alignment, skill overlap, experience requirements, and more. It's a strong indicator, not a guarantee — every company weighs factors differently."
  },
  {
    q: "How long does it take to generate a report?",
    a: "Most reports are ready in 15–30 seconds, depending on resume and job description length."
  },
  {
    q: "Can I generate reports for multiple roles?",
    a: "Yes! Every report is saved to your dashboard. You can generate as many as you need and compare them side by side."
  },
  {
    q: "Is my resume data kept private?",
    a: "Your resume text is processed by Google Gemini AI and stored securely in your account. We never share your data with third parties."
  },
  {
    q: "How is the AI resume PDF generated?",
    a: "Gemini AI rewrites your resume to better match the target role, then a headless browser renders it into a professional, ATS-optimized PDF."
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    period: "/month",
    description: "Get started and see the power of AI interview prep.",
    features: [
      "3 interview reports / month",
      "Match score analysis",
      "Technical & behavioral questions",
      "Skill gap detection",
    ],
    cta: "Start for free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "12",
    period: "/month",
    description: "Unlimited prep for serious candidates.",
    features: [
      "Unlimited interview reports",
      "AI resume PDF generation",
      "Day-by-day prep plans",
      "Report history & comparison",
      "Priority AI processing",
    ],
    cta: "Start Pro",
    highlight: true,
  },
];

/* ── Component ── */
const Landing = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="landing">
      {/* ── Nav ── */}
      <nav className={`landing-nav ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            <div className="brand-icon"><BrainIcon size={20} /></div>
            <span className="brand-name">TalentMind AI</span>
          </Link>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
          </div>
          <div className="nav-actions">
            <Link to="/login" className="btn-ghost">Sign in</Link>
            <Link to="/register" className="button primary btn-nav-cta">Get started free</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero-section" aria-label="Hero">
        <div className="hero-bg-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <ZapIcon />
            <span>Powered by Google Gemini AI</span>
          </div>
          <h1 className="hero-headline">
            Ace every interview.<br />
            <span className="hero-gradient-text">Land the role you deserve.</span>
          </h1>
          <p className="hero-subheadline">
            Upload your resume, paste a job description, and TalentMind AI generates a hyper-personalized interview report in seconds — including match score, interview questions, skill gaps, and a day-by-day prep plan.
          </p>
          <div className="hero-actions">
            <Link to="/register" id="hero-cta-primary" className="button primary hero-cta-btn">
              Start for free <ArrowRight />
            </Link>
            <a href="#how-it-works" className="hero-cta-link">
              See how it works ↓
            </a>
          </div>
          <div className="hero-social-proof">
            <div className="stars">
              {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
            </div>
            <p>Trusted by <strong>10,000+</strong> job seekers worldwide</p>
          </div>
        </div>

        {/* Floating score card preview */}
        <div className="hero-visual" aria-hidden="true">
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-dot" /><div className="preview-dot" /><div className="preview-dot" />
            </div>
            <div className="preview-score-row">
              <div className="preview-score-ring">
                <svg viewBox="0 0 36 36">
                  <path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path className="ring-fill" strokeDasharray="87, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <text x="18" y="19" className="ring-pct">87%</text>
                </svg>
                <span className="ring-label">Match</span>
              </div>
              <div className="preview-stats">
                <div className="preview-stat"><span>12</span> Questions</div>
                <div className="preview-stat"><span>5</span> Skill Gaps</div>
                <div className="preview-stat"><span>14</span> Day Plan</div>
              </div>
            </div>
            <div className="preview-question">
              <div className="pq-label">Technical Question</div>
              <p className="pq-text">"Describe your approach to designing a scalable REST API..."</p>
            </div>
            <div className="preview-tags">
              <span className="ptag high">React</span>
              <span className="ptag medium">TypeScript</span>
              <span className="ptag low">Docker</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Bar ── */}
      <section className="proof-bar" aria-label="Companies">
        <p className="proof-label">Candidates have used TalentMind AI to land roles at</p>
        <div className="proof-companies">
          {["Google", "Stripe", "Notion", "Anthropic", "Linear", "Vercel", "OpenAI", "Meta"].map(c => (
            <span key={c} className="proof-company">{c}</span>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="features-section" aria-labelledby="features-heading">
        <div className="section-inner">
          <div className="section-label">Features</div>
          <h2 id="features-heading" className="section-title">
            Everything you need to <span className="gradient-text">ace the interview</span>
          </h2>
          <p className="section-sub">
            TalentMind AI turns your resume and a job description into a complete, personalized interview preparation system.
          </p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className={`feature-card feature-card--${f.color}`} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={`feature-icon feature-icon--${f.color}`}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section id="how-it-works" className="steps-section" aria-labelledby="steps-heading">
        <div className="section-inner">
          <div className="section-label">How it works</div>
          <h2 id="steps-heading" className="section-title">
            From upload to offer-ready<br /><span className="gradient-text">in under a minute</span>
          </h2>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i < steps.length - 1 && <div className="step-arrow" aria-hidden="true"><ArrowRight /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section" aria-labelledby="testimonials-heading">
        <div className="section-inner">
          <div className="section-label">Success stories</div>
          <h2 id="testimonials-heading" className="section-title">
            Real candidates. <span className="gradient-text">Real results.</span>
          </h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="testimonial-stars">
                  {[1,2,3,4,5].map(s => <StarIcon key={s} />)}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-footer">
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.author[0]}</div>
                    <div>
                      <div className="author-name">{t.author}</div>
                      <div className="author-role">{t.role}</div>
                    </div>
                  </div>
                  <div className="testimonial-score">
                    <span>{t.score}%</span>
                    <span className="score-sub">match score</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="pricing-section" aria-labelledby="pricing-heading">
        <div className="section-inner">
          <div className="section-label">Pricing</div>
          <h2 id="pricing-heading" className="section-title">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="section-sub">Start free. Upgrade when you need unlimited reports.</p>
          <div className="pricing-grid">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`pricing-card ${plan.highlight ? "pricing-card--highlight" : ""}`}>
                {plan.highlight && <div className="pricing-badge">Most popular</div>}
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-price">
                  <span className="price-currency">$</span>
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
                <p className="pricing-desc">{plan.description}</p>
                <ul className="pricing-features">
                  {plan.features.map((f, j) => (
                    <li key={j} className="pricing-feature-item">
                      <CheckCircle />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  id={`pricing-cta-${plan.name.toLowerCase()}`}
                  className={`button ${plan.highlight ? "primary" : "secondary"} pricing-cta`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section" aria-labelledby="faq-heading">
        <div className="section-inner">
          <div className="section-label">FAQ</div>
          <h2 id="faq-heading" className="section-title">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? "open" : ""}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                id={`faq-item-${i}`}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-chevron" aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                </div>
                {openFaq === i && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="final-cta-section" aria-label="Call to action">
        <div className="cta-inner">
          <div className="cta-orb cta-orb-1" aria-hidden="true" />
          <div className="cta-orb cta-orb-2" aria-hidden="true" />
          <div className="section-label">Get started today</div>
          <h2 className="cta-title">
            Your next offer is<br />
            <span className="hero-gradient-text">one report away.</span>
          </h2>
          <p className="cta-sub">
            Join thousands of professionals who've used TalentMind AI to prepare with confidence and land roles they love.
          </p>
          <Link to="/register" id="final-cta-btn" className="button primary cta-btn">
            Start for free — no credit card required <ArrowRight />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="brand-icon brand-icon--sm"><BrainIcon size={18} /></div>
            <span className="brand-name">TalentMind AI</span>
          </div>
          <p className="footer-tagline">AI-powered interview preparation for ambitious professionals.</p>
          <div className="footer-links">
            <Link to="/login">Sign in</Link>
            <Link to="/register">Get started</Link>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} TalentMind AI. Built with Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
