import React from 'react';
import '../style/interview.scss';

const theReport = [
  {
    id: 1,
    question: "How would you design a scalable architecture for a real-time messaging application?",
    candidateAnswer: "I would use a microservices approach with a load balancer in front. For real-time functionality, I'd implement WebSockets. Messages would be queued using something like RabbitMQ or Kafka, and stored in a NoSQL database like MongoDB for fast retrieval.",
    idealAnswer: "A scalable messaging architecture requires WebSockets for bi-directional communication, a Pub/Sub system (like Redis or Kafka) for reliable message broadcasting across instances, and a robust data store (Cassandra or DynamoDB are great for writes). Connection management and stateless backend nodes are critical.",
    feedback: "Good baseline understanding. Mentioning WebSockets and message queues is excellent. To improve, discuss how to manage active connections across multiple regional servers and why a wide-column store might be better than document storage for message logs.",
    rating: "Medium",
    score: 75
  },
  {
    id: 2,
    question: "Can you explain the event loop in JavaScript and how it handles asynchronous operations?",
    candidateAnswer: "The event loop checks the call stack and the callback queue. When the stack is empty, it pushes the first callback from the queue onto the stack. Asynchronous operations like setTimeout run in the background and their callbacks go to the queue when finished.",
    idealAnswer: "The event loop continually monitors the Call Stack and the Task Queue. It also involves the Microtask Queue (Promises), which has higher priority than the Macrotask Queue (setTimeout). Web APIs handle the async work off-thread and push callbacks to the respective queues upon completion.",
    feedback: "Strong core understanding. You hit the main points nicely. To achieve a perfect score, distinguish between the Macro and Micro task queues, specifically mentioning how Promises are handled before the next tick.",
    rating: "High",
    score: 88
  },
  {
    id: 3,
    question: "What are the core principles of an award-winning UI/UX design?",
    candidateAnswer: "It should look good and be easy to use. Animations help.",
    idealAnswer: "Award-winning UI/UX relies on usability, accessibility, visual hierarchy, consistency, and delight. It uses harmonious color palettes (like deep space with neon accents), refined typography, glassmorphic elements for depth, and micro-interactions/fluid animations that provide immediate feedback without overwhelming the user.",
    feedback: "Too brief. While true, an impressive answer dives into specific concepts like visual hierarchy, accessibility, or specific modern aesthetic trends that drive user engagement.",
    rating: "Low",
    score: 40
  }
];

const Interview = () => {
  const averageScore = Math.round(theReport.reduce((acc, curr) => acc + curr.score, 0) / theReport.length);

  return (
    <div className="interview-dashboard">
      <div className="dashboard-header">
        <h1>Interview Report</h1>
        <p>Your performance breakdown and AI-driven insights.</p>
        <div className="score-badge">
          Overall Score: {averageScore}%
        </div>
      </div>

      <div className="report-grid">
        {theReport.map((item, index) => (
          <div key={item.id} className="question-card animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="q-header">
              <h3>
                <span className="q-number">Q{index + 1}.</span>
                {item.question}
              </h3>
              <span className={`rating ${item.rating.toLowerCase()}`}>
                {item.rating} ({item.score}/100)
              </span>
            </div>

            <div className="q-content">
              <div className="content-block candidate">
                <h4>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Your Answer
                </h4>
                <p>{item.candidateAnswer}</p>
              </div>

              <div className="content-block ideal">
                <h4>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Ideal Answer
                </h4>
                <p>{item.idealAnswer}</p>
              </div>
            </div>

            <div className="feedback-section">
              <h4>AI Feedback & Improvements</h4>
              <p>{item.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interview;
