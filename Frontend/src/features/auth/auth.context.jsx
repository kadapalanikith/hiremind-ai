/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { getMe } from './services/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true until initial auth check done

    useEffect(() => {
        let isMounted = true;
        const initializeAuth = async () => {
            try {
                const data = await getMe();
                if (isMounted && data?.user) {
                    setUser(data.user);
                }
            } catch {
                // User is not authenticated — this is normal for public pages
                if (isMounted) setUser(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        initializeAuth();
        return () => { isMounted = false; };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
