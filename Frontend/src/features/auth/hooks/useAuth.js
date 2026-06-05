import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    /**
     * Attempt login. Returns { success, error } so the caller can show UI feedback.
     */
    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.userMessage || 'Login failed. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Attempt registration. Returns { success, error }.
     */
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.userMessage || 'Registration failed. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout the current user.
     */
    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
        } catch {
            // Ignore logout errors — still clear local state
        } finally {
            setUser(null);
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
    };
};