const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.includes(origin) || 
                        origin.endsWith(".vercel.app") ||
                        origin.startsWith("http://localhost:") ||
                        origin.startsWith("http://127.0.0.1:");

      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/**
 * Require all the routes here
 */

const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes")

/**
 * using all the routes here
 */

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);


module.exports = app;
