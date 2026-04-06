import { createBrowserRouter } from "react-router";
import Login from "./features/ai/auth/pages/Login";
import Register from "./features/ai/auth/pages/Register";
import Protected from "./features/ai/auth/components/Protected";

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
        element: <Protected>HomePage</Protected>
    }
]);

export default router;