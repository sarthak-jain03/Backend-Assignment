import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Rehydrate from localStorage
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('jwt');
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('user');
                localStorage.removeItem('jwt');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const data = await authService.login(username, password);
        // data = { jwt, username, id }
        // Decode role from JWT payload
        let role = 'USER';
        try {
            const payload = JSON.parse(atob(data.jwt.split('.')[1]));
            role = payload.role || 'USER';
        } catch {
            // fallback
        }

        const userData = {
            id: data.id,
            username: data.username,
            role,
        };

        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return userData;
    };

    const signup = async (username, password, role) => {
        const data = await authService.signup(username, password, role);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
