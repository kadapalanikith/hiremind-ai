const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

// ── Security: Helmet sets safe HTTP headers ──────────────────
app.use(helmet({
  crossOriginEmbedderPolicy: false, // Required for Puppeteer-generated PDFs served inline
}));

// ── Compression ───────────────────────────────────────────────
app.use(compression());

// ── CORS ─────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server or tools with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin) || origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// ── Body Parsing (with size limit to prevent large payload attacks) ──
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());

// ── Rate Limiters ─────────────────────────────────────────────
// Auth endpoints: 15 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { message: "Too many requests from this IP. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// AI endpoints: 10 requests per 10 minutes per IP (AI calls are expensive)
const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { message: "AI report generation limit reached. Please wait before generating another report." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Health Check ─────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Routes ────────────────────────────────────────────────────
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authLimiter, authRouter);
app.use("/api/interview", aiLimiter, interviewRouter);

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

// ── Global Error Handler (must be last) ──────────────────────
app.use(errorHandler);

module.exports = app;
