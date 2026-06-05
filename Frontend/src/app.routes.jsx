import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/interview";
import Landing from "./features/landing/Landing";

export const router = createBrowserRouter([
    // ── Public routes ──────────────────────────────────────────
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },

    // ── Protected routes ───────────────────────────────────────
    {
        path: "/dashboard",
        element: <Protected><Home /></Protected>,
    },
    {
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>,
    },

    // ── 404 fallback ───────────────────────────────────────────
    {
        path: "*",
        element: (
            <main className="loading-screen" style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "4rem", fontWeight: 800, color: "var(--primary)" }}>404</h1>
                <p>Page not found</p>
                <a href="/" className="button primary" style={{ marginTop: "1.5rem", textDecoration: "none" }}>
                    Go home
                </a>
            </main>
        ),
    },
]);

export default router;