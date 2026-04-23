<div align="center">

# 🧠 HireMind AI

### *AI-Powered Interview Intelligence Platform*

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Powered-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

**Stop guessing. Start preparing. HireMind AI analyzes your resume against any job description and generates a complete, AI-powered interview readiness report — in seconds.**

[🚀 Get Started](#-getting-started) • [📖 API Reference](#-api-reference) • [🏗️ Architecture](#%EF%B8%8F-architecture) • [🖥️ Screenshots](#%EF%B8%8F-screenshots)

---

</div>

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#%EF%B8%8F-architecture)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Variables](#%EF%B8%8F-environment-variables)
- [📖 API Reference](#-api-reference)
- [🗄️ Database Schema](#%EF%B8%8F-database-schema)
- [🔒 Authentication Flow](#-authentication-flow)
- [🤖 AI Pipeline](#-ai-pipeline)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Resume Match Scoring** | AI scores your resume against the job description (0–100) |
| 🧩 **Technical Q&A Generation** | Predicts role-specific technical interview questions with ideal answers |
| 💬 **Behavioral Q&A Generation** | Generates behavioral questions with STAR-method guided answers |
| 📊 **Skill Gap Analysis** | Identifies missing skills with severity ratings (Low / Medium / High) |
| 📅 **Preparation Plan** | Day-by-day study plan tailored to your specific gaps |
| 📄 **AI Resume PDF Generator** | Rebuilds and polishes your resume as a downloadable PDF using Puppeteer |
| 🔐 **Secure Auth** | JWT-based authentication with HTTP-only cookies & token blacklisting |
| 📜 **Report History** | Full dashboard of all past interview reports per user |
| 🛡️ **Protected Routes** | Auth-guarded pages on both frontend and backend |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                        │
│   React 19 + Vite  ·  React Router 7  ·  Axios  ·  SCSS    │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP / REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     EXPRESS 5 SERVER                         │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  Auth    │  │  Interview   │  │   File Upload         │ │
│  │  Router  │  │  Router      │  │   (Multer / PDF Parse)│ │
│  └────┬─────┘  └──────┬───────┘  └───────────────────────┘ │
│       │               │                                      │
│  ┌────▼───────────────▼──────────────────────────────────┐  │
│  │              Controllers + Middlewares                  │  │
│  │   JWT Auth Middleware  ·  Error Handler                │  │
│  └────────────────────────┬──────────────────────────────┘  │
│                           │                                   │
│              ┌────────────┴─────────────┐                    │
│              ▼                          ▼                     │
│  ┌─────────────────────┐  ┌────────────────────────────┐    │
│  │  MongoDB / Mongoose  │  │  Google Gemini AI Service  │    │
│  │  (User, Report,      │  │  (gemini-flash + Zod       │    │
│  │   Blacklist Models)  │  │   Structured Output)       │    │
│  └─────────────────────┘  └────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### 🖥️ Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.x | UI component library |
| **Vite** | 8.x | Lightning-fast build tool & dev server |
| **React Router** | 7.x | Client-side routing |
| **Axios** | 1.x | HTTP client for API requests |
| **SASS / SCSS** | 1.x | Modular, maintainable styling |

### ⚙️ Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | LTS | JavaScript runtime |
| **Express** | 5.x | HTTP server & routing framework |
| **Mongoose** | 9.x | MongoDB ODM & schema modeling |
| **MongoDB** | Atlas / Local | NoSQL document database |
| **Google GenAI SDK** | 1.x | Gemini AI prompt & structured output |
| **Zod** | 4.x | Schema validation & type safety |
| **zod-to-json-schema** | 3.x | Converts Zod schemas for Gemini response shaping |
| **Multer** | 2.x | Multipart file upload handling |
| **pdf-parse** | 2.x | Extract text from uploaded PDF resumes |
| **Puppeteer** | 24.x | Headless Chrome for PDF generation |
| **bcryptjs** | 3.x | Password hashing |
| **jsonwebtoken** | 9.x | JWT creation & verification |
| **cookie-parser** | 1.x | HTTP-only cookie parsing |
| **cors** | 2.x | Cross-origin resource sharing |
| **dotenv** | 17.x | Environment variable management |

---

## 📁 Project Structure

```
Gen AI ATS/
│
├── 📂 Backend/
│   ├── server.js                    # App entry point
│   ├── package.json
│   ├── .env                         # 🔐 Environment variables (never commit this!)
│   └── src/
│       ├── app.js                   # Express app setup, CORS, middleware registration
│       ├── 📂 config/               # Database connection & app config
│       ├── 📂 controllers/
│       │   ├── auth.controllers.js  # Register, Login, Logout, GetMe
│       │   └── interview.controllers.js  # Generate report, Get report(s), PDF export
│       ├── 📂 middlewares/
│       │   ├── auth.middleware.js   # JWT verification guard
│       │   └── file.middleware.js   # Multer configuration
│       ├── 📂 models/
│       │   ├── user.model.js        # User schema (username, email, password)
│       │   ├── blacklist.model.js   # Token blacklist for logout invalidation
│       │   └── interviewReport.model.js  # Full interview report schema
│       ├── 📂 routes/
│       │   ├── auth.routes.js       # /api/auth/* endpoints
│       │   └── interview.routes.js  # /api/interview/* endpoints
│       └── 📂 services/
│           └── ai.service.js        # Google Gemini AI integration + Puppeteer PDF
│
└── 📂 Frontend/
    ├── index.html                   # Vite HTML entry
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx                  # Root component
        ├── app.routes.jsx           # React Router route definitions
        ├── style.scss               # Global styles
        ├── 📂 style/                # Design tokens, utility styles
        └── 📂 features/
            ├── 📂 auth/
            │   ├── auth.context.jsx     # Auth state context provider
            │   ├── auth.form.scss       # Auth form styles
            │   ├── 📂 components/
            │   │   └── Protected.jsx    # Route guard HOC
            │   ├── 📂 hooks/            # useAuth, useLogin, useRegister
            │   ├── 📂 pages/
            │   │   ├── Login.jsx
            │   │   └── Register.jsx
            │   └── 📂 services/         # Auth API calls (axios)
            └── 📂 interview/
                ├── interview.context.jsx  # Interview state context provider
                ├── 📂 hooks/              # useInterview, useReport
                ├── 📂 pages/
                │   ├── Home.jsx           # Dashboard – report list + new report form
                │   └── interview.jsx      # Full interview report view
                ├── 📂 services/           # Interview API calls (axios)
                └── 📂 style/              # Interview-specific SCSS modules
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/) `>= 9.x`
- [MongoDB](https://www.mongodb.com/) — local instance **or** a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- A **Google Gemini API Key** — get one free at [Google AI Studio](https://aistudio.google.com/)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/hiremind-ai.git
cd "hiremind-ai"
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend/` directory (see [Environment Variables](#%EF%B8%8F-environment-variables) for the full list):

```bash
# Backend/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hiremind_ai
JWT_SECRET=your_super_secret_jwt_key_here
GOOGLE_GENAI_API_KEY=your_google_genai_api_key_here
```

Start the development server:

```bash
npm run dev
# Server starts on http://localhost:5000
```

---

### 3️⃣ Frontend Setup

Open a **new terminal** window:

```bash
cd Frontend
npm install
npm run dev
# App starts on http://localhost:5173
```

---

### 4️⃣ Open in Browser

Navigate to **[http://localhost:5173](http://localhost:5173)** and create your first account!

---

## ⚙️ Environment Variables

### Backend (`Backend/.env`)

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | ✅ | Port for the Express server | `5000` |
| `MONGO_URI` | ✅ | MongoDB connection string | `mongodb://localhost:27017/hiremind_ai` |
| `JWT_SECRET` | ✅ | Secret key for signing JWT tokens | `mySuperSecretKey123` |
| `GOOGLE_GENAI_API_KEY` | ✅ | Google Gemini API key | `AIza...` |

> ⚠️ **Never commit your `.env` file.** Both `Backend/.gitignore` and `Frontend/.gitignore` already exclude it.

---

## 📖 API Reference

Base URL: `http://localhost:5000`

### 🔐 Authentication Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and receive auth cookie |
| `GET` | `/api/auth/logout` | Public | Logout (clears cookie, blacklists token) |
| `GET` | `/api/auth/get-me` | 🔒 Private | Get the currently authenticated user |

#### `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response `201`:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "664abc...",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

#### `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response `200`:** Sets an HTTP-only cookie containing the JWT.

---

### 🎯 Interview Endpoints

> All interview endpoints require authentication (`authUser` middleware).

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/interview` | 🔒 Private | Generate a new interview report |
| `GET` | `/api/interview` | 🔒 Private | Get all reports for the logged-in user |
| `GET` | `/api/interview/:interviewId` | 🔒 Private | Get a specific report by ID |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | 🔒 Private | Generate & download an AI-polished resume PDF |

#### `POST /api/interview`

Accepts `multipart/form-data`:

| Field | Type | Description |
|---|---|---|
| `resume` | `File` (PDF) | Candidate's resume uploaded as a PDF |
| `selfDescription` | `string` | Brief personal summary / cover letter |
| `jobDescription` | `string` | The full job description to match against |

**Response `201`:**
```json
{
  "message": "Interview report generated successfully",
  "interviewReport": {
    "_id": "...",
    "title": "Senior Frontend Engineer @ Stripe",
    "matchScore": 82,
    "technicalQuestions": [...],
    "behavioralQuestions": [...],
    "skillGapAnalysis": [...],
    "preparationPlan": [...]
  }
}
```

---

#### `POST /api/interview/resume/pdf/:interviewReportId`

Returns a binary PDF stream (`Content-Type: application/pdf`) of the AI-generated, job-tailored resume.

---

## 🗄️ Database Schema

### `User`
```js
{
  username : String  (required, unique),
  email    : String  (required, unique),
  password : String  (hashed via bcryptjs),
  createdAt: Date,
  updatedAt: Date
}
```

### `Blacklist`
Stores invalidated JWT tokens to ensure logged-out tokens cannot be reused.
```js
{
  token    : String (required, unique),
  createdAt: Date
}
```

### `InterviewReport`
```js
{
  user              : ObjectId  → User,
  title             : String,
  resume            : String    (parsed PDF text),
  selfDescription   : String,
  jobDescription    : String,
  matchScore        : Number    (0–100),
  technicalQuestions: [{
    question  : String,
    intention : String,
    answer    : String
  }],
  behavioralQuestions: [{
    question  : String,
    intention : String,
    answer    : String
  }],
  skillGapAnalysis  : [{
    skill    : String,
    severity : "low" | "medium" | "high"
  }],
  preparationPlan   : [{
    day   : Number,
    focus : String,
    tasks : [String]
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Authentication Flow

```
User Registers/Logs In
        │
        ▼
  Backend validates credentials
        │
        ▼
  JWT signed with JWT_SECRET
        │
        ▼
  JWT stored in HTTP-only cookie  ◄──── Inaccessible to JavaScript (XSS-safe)
        │
        ▼
  Subsequent requests send cookie automatically
        │
        ▼
  authMiddleware.authUser():
    1. Reads token from cookie
    2. Checks Blacklist collection (logout invalidation)
    3. Verifies JWT signature
    4. Attaches req.user → controller
        │
        ▼
  Protected resource served ✅

  On Logout:
    1. Token added to Blacklist collection
    2. Cookie is cleared
    3. Future requests with the same token are rejected ✅
```

---

## 🤖 AI Pipeline

HireMind AI uses **Google Gemini** (`gemini-3-flash-preview`) with **structured JSON output** enforced via **Zod schemas** for deterministic, type-safe AI responses.

```
User submits form (PDF + selfDescription + jobDescription)
            │
            ▼
  Multer extracts file buffer
            │
            ▼
  pdf-parse converts PDF → plain text
            │
            ▼
  Prompt assembled:
    "Generate an interview report for a candidate based on:
     Resume: {text}
     Self Description: {text}
     Job Description: {text}"
            │
            ▼
  Gemini API called with Zod schema as responseSchema
  → Forces structured JSON response matching:
    { matchScore, technicalQuestions[], behavioralQuestions[],
      skillGapAnalysis[], preparationPlan[], title }
            │
            ▼
  JSON parsed & validated
            │
            ▼
  Saved to MongoDB InterviewReport collection
            │
            ▼
  Full report returned to client ✅


  PDF Resume Generation:
  ───────────────────────
  Gemini generates HTML (with inline CSS) for a polished resume
            │
            ▼
  Puppeteer (headless Chrome) renders HTML → PDF buffer
            │
            ▼
  PDF streamed to client as download ✅
```

---

## 📂 Frontend Routes

| Route | Component | Access | Description |
|---|---|---|---|
| `/login` | `Login.jsx` | Public | User authentication page |
| `/register` | `Register.jsx` | Public | New account creation page |
| `/` | `Home.jsx` | 🔒 Protected | Dashboard with report history & new report form |
| `/interview/:interviewId` | `interview.jsx` | 🔒 Protected | Full interview report details view |

> Protected routes are wrapped in the `<Protected>` HOC, which checks the auth context and redirects unauthenticated users to `/login`.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** your changes: `git commit -m 'feat: add AmazingFeature'`
4. **Push** to the branch: `git push origin feature/AmazingFeature`
5. **Open** a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📜 License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

<div align="center">

**Built with ❤️ by [Nikith Kadapala](https://github.com/kadapalanikith)**

*If this project helped you, please consider giving it a ⭐ on GitHub!*

</div>
