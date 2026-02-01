import React, { createContext, useContext, useState } from 'react';

// Simplified AuthContext - potentially removable if we don't need API Key input from UI
// For now keeping it to minimize breakage in other components until fully refactored
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Always true for now as we don't require user login for YouTube public search
    const [isAuthenticated] = useState<boolean>(true);

    const login = () => {
        // No-op
    };

    const logout = () => {
        // No-op
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
