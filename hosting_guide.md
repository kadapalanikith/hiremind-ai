# 🚀 HireMind AI Hosting Guide

This guide provides step-by-step instructions to deploy **HireMind AI** (both Frontend and Backend) using **Vercel** for the client-side SPA, **Render** for the Express API, and **MongoDB Atlas** for the database.

---

## 🏗️ Architecture Overview

- **Frontend**: React 19 + Vite deployed to **Vercel** (static site hosting with client-side SPA routing).
- **Backend**: Express 5 + Node.js deployed to **Render** (as a Web Service).
- **Database**: **MongoDB Atlas** (cloud-hosted MongoDB).
- **AI Engine**: **Google Gemini** (via `@google/genai` SDK using a free API Key from Google AI Studio).

---

## 🗄️ Step 1: Database Setup (MongoDB Atlas)

1. Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new project (e.g., `HireMind-AI`) and deploy a **Free M0 Cluster**.
3. **Database Access**: Create a database user. Remember the username and password.
4. **Network Access**: Add an IP address. For hosting environments (like Render), select **Allow Access from Anywhere** (`0.0.0.0/0`) since Render servers use dynamic IP addresses.
5. **Get Connection URI**:
   - Click **Connect** on your cluster.
   - Select **Drivers** (Node.js).
   - Copy the connection string. It will look like:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     ```
   - Replace `<username>` and `<password>` with your database user credentials. Keep this URI safe.

---

## 🤖 Step 2: Google Gemini API Key Setup

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Log in with your Google account.
3. Click **Get API Key** and create a new key.
4. Copy the generated API Key. It will look like `AIzaSy...`. Keep this key safe.

---

## ⚙️ Step 3: Backend Deployment (Render)

Render runs the Express server as a Web Service.

### 1. Create Web Service
1. Go to [Render](https://render.com/) and log in.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository containing the project.
4. Set the following details in the creation form:
   - **Name**: `hiremind-ai-backend` (or similar)
   - **Environment**: `Node`
   - **Region**: Select a region close to your users (e.g., `Oregon (US West)` or `Frankfurt (EU Central)`)
   - **Branch**: `main` (or your primary branch)
   - **Root Directory**: `Backend` (⚠️ **CRITICAL**: This tells Render to only build and run inside the Backend folder)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (or a paid tier)

### 2. Configure Environment Variables
In the Render Web Service dashboard, go to the **Variables** (or **Environment**) tab and add:

| Key | Value | Description |
|---|---|---|
| `NODE_ENV` | `production` | Enables production configurations (like secure cookies) |
| `PORT` | `10000` | Render standard port (managed automatically, but good to declare) |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `GOOGLE_GENAI_API_KEY` | `AIzaSy...` | Your Google Gemini API Key |
| `JWT_SECRET` | `your_long_random_jwt_secret` | A secure random string for JWT signatures |
| `FRONTEND_URL` | `https://your-frontend-app.vercel.app` | **Your Vercel URL** (e.g., `https://hiremind-ai.vercel.app`). Update this after deploying to Vercel. |

### 3. Puppeteer Chrome Dependencies (⚠️ Render Specific)
Puppeteer launches a headless Chrome browser to print resumes into PDF format. Because Render’s default Node environment lacks the system libraries required by Chrome, you must configure Render to install them:

* **Method (Recommended - Native Buildpack)**:
  In your Render Web Service dashboard under **Settings**:
  - Locate **Buildpacks**.
  - Add the unofficial Puppeteer buildpack URL:
    `https://github.com/jontewks/puppeteer-heroku-buildpack`
  - Render will install all required Chromium dependencies automatically during the next build.

* **Method (Docker)**:
  Alternatively, you can write a custom `Dockerfile` in `Backend/` that installs Chromium and runs node, and deploy on Render as a **Docker** service instead of Web Service. (The buildpack method is usually simpler and works with Node runtime).

---

## 🖥️ Step 4: Frontend Deployment (Vercel)

Vercel is optimized for building and serving Vite/React SPAs.

### 1. Create Vercel Project
1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New** and select **Project**.
3. Import your GitHub repository.
4. Set the following details:
   - **Project Name**: `hiremind-ai`
   - **Framework Preset**: `Vite` (automatically detected)
   - **Root Directory**: Click *Edit* and select **Frontend** (⚠️ **CRITICAL**: This tells Vercel to build and run inside the Frontend folder)
   - **Build and Output Settings**: Leave as default (`npm run build` / `dist`)

### 2. Configure Environment Variables
Expand the **Environment Variables** section and add:

| Key | Value | Description |
|---|---|---|
| `VITE_API_URL` | `https://hiremind-ai-backend.onrender.com` | **Your Render Web Service URL**. Copy the URL provided in your Render backend dashboard (e.g. `https://xxx.onrender.com`). |

Click **Deploy**! Vercel will build the React client and serve it.

---

## 🔒 Session & Cookies (How Auth Works in Production)

Because the frontend (`vercel.app`) and backend (`onrender.com`) are hosted on different domains, the browser considers the cookies **cross-site (third-party)**. 

To ensure JWT authentication works securely in production:
1. The backend CORS middleware allows the exact frontend URL (via `FRONTEND_URL`) and enables `credentials: true`.
2. The backend sets the auth token cookie with:
   - `httpOnly: true` (prevents XSS access)
   - `secure: true` (ensures cookie is only transmitted over HTTPS)
   - `sameSite: "none"` (allows the cross-site Vercel-to-Render cookie exchange)
3. The frontend Axios client includes `withCredentials: true` on all requests (handled automatically by the API service setup).

---

## 🛠️ Troubleshooting & Tips

### 1. Cold Starts on Render (Free Tier)
If you are using Render's **Free Tier**, the backend service will automatically "spin down" after 15 minutes of inactivity. When a user visits the site after a period of inactivity, the first API request might take 50 seconds to respond as the server spins back up. 
* **Fix**: Upgrade the Render backend to a paid tier (e.g., $7/month Starter plan) to keep it warm 24/7.

### 2. CORS Errors
If you see CORS errors in the browser console:
- Ensure the `FRONTEND_URL` on Render matches your Vercel deployment URL exactly (including the `https://` prefix and excluding any trailing slashes `/`).
- Re-deploy the Render service after editing variables.

### 3. PDF Generator Errors
If clicking "Download PDF" throws a server error or times out:
- Double check if you added the Puppeteer buildpack on Render.
- Verify your `GOOGLE_GENAI_API_KEY` is active and correct.
