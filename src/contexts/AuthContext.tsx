import React, { createContext, useContext, useState, useCallback } from "react";
import { User, UserRole, mockCurrentUser } from "@/lib/mock-data";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((_email: string, _password: string, role: UserRole = "patient") => {
    setUser({
      ...mockCurrentUser,
      role,
      name: role === "doctor" ? "Dr. Sarah Chen" : role === "admin" ? "Admin User" : mockCurrentUser.name,
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const switchRole = useCallback((role: UserRole) => {
    if (user) {
      setUser({
        ...user,
        role,
        name: role === "doctor" ? "Dr. Sarah Chen" : role === "admin" ? "Admin User" : "Alex Johnson",
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
