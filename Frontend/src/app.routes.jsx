import { createBrowserRouter } from "react-router";
import Login from "./features/ai/auth/pages/Login";
import Register from "./features/ai/auth/pages/Register";

export const router = createBrowserRouter([
    {
    path: "/login",
    element: <Login />,
    },
    {
    path: "/register",
    element: <Register />,
    }, {
        path: "/",
        element: <h1>Home Page</h1>
    }
]);

export default router;